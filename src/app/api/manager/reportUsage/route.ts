import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../utils/database";

export async function POST(request: NextRequest) {
    try{
        const input = await request.json();
        const {start,end} = input; //start date
        const dateFormatPattern = /^\d{4}-\d{2}-\d{2}$/;
        
        //input validation
        if (!dateFormatPattern.test(start) || isNaN(Date.parse(start)) )
            return NextResponse.json({ error: "Please enter a valid start date with format 'yyyy-mm-dd'" }, { status: 500 });
        if (!dateFormatPattern.test(end) || isNaN(Date.parse(end)) )
            return NextResponse.json({ error: "Please enter a valid end date with format 'yyyy-mm-dd'" }, { status: 500 });
        if(!(Date.parse(start) < Date.parse(end))) //ensure start is before end
            return NextResponse.json({ error: "Start Date must be before end date'" }, { status: 500 });


        let map = new Map<string,number>();

        const excessQuery = "SELECT * FROM inventory_history WHERE order_timestamp BETWEEN $1 AND $2;";
        const excessData = await query(excessQuery,[start,end]);

        //process data from query in a map
        for(const current of excessData.rows){
            const currItem:string = current.inventory_item;
            const currQuantity:number = current.quantity;
            if(map.has(currItem)){ //key already in map
                const updateQuantity:number = currQuantity + (map.get(currItem) ?? 0);
                map.set(currItem,updateQuantity);
            }
            else{ //key not in map
                map.set(currItem,currQuantity);
            }
        } 

        //translate map to table
        let table: string[][] = [];
        map.forEach((value, key) => {
            const row : string[] = [key,value.toString()];
            table.push(row);
        });

        return NextResponse.json({ message: table }, { status: 200 });
    } catch(error:any){
        return NextResponse.json({error: error.toString()},{status: 500});
    }
}

