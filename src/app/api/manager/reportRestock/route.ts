import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../utils/database";

//Contacts the database and calculates a restock report
//Returns a matrix with columns supply, stock_remaining, and minimum_stock
export async function GET(request: NextRequest) {
    try{
        //Query
        let table: string[][] = [];
        const data = await query("SELECT supply, stock_remaining, minimum_stock FROM inventory\r\n" +
                "WHERE stock_remaining < minimum_stock;");

        //load values into matrix
        for(const current of data.rows){
            const row : string[] = [current.supply,current.stock_remaining,current.minimum_stock];
            table.push(row);
        }
    
        return NextResponse.json({ message: table }, { status: 200 });
    }catch(error:any){
        return NextResponse.json({error: error.toString()},{status: 500});
    }
}