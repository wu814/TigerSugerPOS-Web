import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../utils/database";

/**
 * Edit the name of a inventory item
 *
 * @param request contains data needed for SQL query: name, new name
 * @returns a message indicating whether the query was successful or not
 */
export async function POST(request: NextRequest) {
    try{
        const data = await request.json();
        const {supply,newsupply} = data;

        //check if valid
        const dupeQuery = "SELECT * FROM inventory WHERE supply = $1;";
        const dupe = await query(dupeQuery,[supply]);
        if(dupe.rows.length == 0){
            return NextResponse.json({error:"Item does not exist in inventory!"},{status: 500});
        }


        const sql = "UPDATE inventory SET supply = $1 WHERE supply = $2";
        const result = await query(sql,[newsupply,supply]);
        return NextResponse.json({ message: "Name of "+supply+" changed successfully" }, { status: 200 });
    }
    catch(error:any){
       console.log("ASDF");
        return NextResponse.json({error: error.toString()},{status: 500});
    }
}