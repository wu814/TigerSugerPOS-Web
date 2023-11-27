// you can reach this endpoint at ourwebsite.com/api/example (you need the file to be named route.ts for this framework)
import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../utils/database";

//Contacts the database and calculates a sales report
//Returns a matrix
//input: 'yyyy-mm-dd' 'yyyy-mm-dd'
export async function POST(request: NextRequest) {
    try{ 
        const input = await request.json();
        const {start, end, drink} = input;  
        
        

        const q = "SELECT * FROM orders WHERE $1 = ANY(order_items) AND  order_timestamp BETWEEN $2 AND $3";
        const data = await query(q,[drink,start,end]);

        


    return NextResponse.json({ message: data.rows }, { status: 200 });
    } catch(error:any){
        return NextResponse.json({error: error.toString()},{status: 500});
    }
}