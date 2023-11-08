// you can reach this endpoint at ourwebsite.com/api/example (you need the file to be named route.ts for this framework)
import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../utils/database";

//Contacts the database and calculates a sales report
//Returns a matrix
//input: 'yyyy-mm-dd' 'yyyy-mm-dd'
export async function POST(request: NextRequest) {
    try{ 
        const input = await request.json();
        const {start, end} = input;  
        const dateFormatPattern = /^\d{4}-\d{2}-\d{2}$/;
        
        //input validation
        if (!dateFormatPattern.test(start) || isNaN(Date.parse(start)) )
            return NextResponse.json({ error: "Please enter a valid start date with format 'yyyy-mm-dd'" }, { status: 500 });
        if (!dateFormatPattern.test(end) || isNaN(Date.parse(end)) )
            return NextResponse.json({ error: "Please enter a valid end date with format 'yyyy-mm-dd'" }, { status: 500 });
        if(!(Date.parse(start) < Date.parse(end))) //ensure start is before end
            return NextResponse.json({ error: "Start Date must be before end date'" }, { status: 500 });



        const data = await query("SELECT drink_name, price FROM products;");

        let table: string[][] = [];
        let totalUnits: number= 0;
        let totalSales: number = 0;
        for(const current of data.rows){
            const drinkName = current.drink_name;
            const price = current.price;

            //get series of dates to check
            const rangeQuery = "SELECT generate_series($1::date, $2::date, '1 day'::interval) AS SeriesDate;";
            const range = await query(rangeQuery,[start,end]);

            let units: number = 0;
            //Get Number of Units for current drink
            for (const d of range.rows){
                let date = d.seriesdate.toISOString();
                const currDate = date.substring(0,10);
                const unitsQuery= "SELECT COUNT(*) AS total FROM orders WHERE $1 = ANY (order_items) AND DATE(order_timestamp) = $2; ";
                const resultUnits = await query(unitsQuery,[drinkName,date]);
                units += parseInt(resultUnits.rows[0].total);
            }
            totalUnits += units;

            //Calculate Sales
            const sales: number = price * units;
            totalSales += sales;

            //Add to table
            const row : string[] = [drinkName,units.toString(),sales.toString()];
            table.push(row);
        }
        const total: string[] = ["Total",totalUnits.toString(),totalSales.toString()];
        table.push(total);


    return NextResponse.json({ message: table }, { status: 200 });
    } catch(error:any){
        return NextResponse.json({error: error.toString()},{status: 500});
    }
}