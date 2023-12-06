import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../utils/database";

// generate popular pairs
// input:  two dates in format 'yyyy-mm-dd'
// output: a matrix where each row consists of drink1, drink2, and the frequency
/**
 * Gets Items that sell well together
 *
 * @param request contains data needed for SQL query: start date, end date
 * @returns a JSON containing the popular pairs report
 */
export async function POST(request: NextRequest) {
    try{
        let table: string[][] = [];
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

        const pairsQuery = "WITH OrderItems AS (\n" +
        "   SELECT DISTINCT\n" +
        "       unnest(order_items) AS item,\n" +
        "       order_timestamp\n" +
        "   FROM orders WHERE order_timestamp BETWEEN $1 AND $2\n" +
        ")\n" +
        "SELECT\n" +
        "   a.item AS item1,\n" +
        "   b.item AS item2,\n" +
        "   COUNT(*) AS frequency\n" +
        "FROM\n" +
        "   OrderItems a\n" +
        "JOIN\n" +
        "   OrderItems b ON a.order_timestamp = b.order_timestamp AND a.item < b.item\n" +
        "GROUP BY\n" +
        "   item1, item2\n" +
        "ORDER BY\n" +
        "   frequency DESC\n";

        const pairsData = await query(pairsQuery,[start,end]);

        for(const current of pairsData.rows){
            const row : string[] = [current.item1,current.item2,current.frequency];
            table.push(row);
       }

        return NextResponse.json({ message: table }, { status: 200 });
    }catch(error:any){
        return NextResponse.json({error: error.toString()},{status: 500});
    }
}


