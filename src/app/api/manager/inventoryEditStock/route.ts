import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../utils/database";

//edit the stock of a inventory item
/**
 * Edit the current stock of a inventory item
 *
 * @param request contains data needed for SQL query: supply, stock
 * @returns a message indicating whether the query was successful or not
 */
export async function POST(request: NextRequest) {
    try{
        const data = await request.json();
        const {supply,stock} = data;

        //check if valid
        console.log(supply);
        const dupeQuery = "SELECT * FROM inventory WHERE supply = $1;";
        const dupe = await query(dupeQuery,[supply]);
        if(dupe.rows.length == 0){
            return NextResponse.json({error:"Item does not exist in inventory!"},{status: 500});
        }


        const sql = "UPDATE inventory SET stock_remaining = $1 WHERE supply = $2";
        const result = await query(sql,[stock,supply]);
        return NextResponse.json({ message: "Amount of "+supply+" changed successfully" }, { status: 200 });
    }
    catch(error:any){
       console.log("ASDF");
        return NextResponse.json({error: error.toString()},{status: 500});
    }
}