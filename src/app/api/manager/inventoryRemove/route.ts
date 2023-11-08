import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../utils/database";

//remove an item from inventory by id
export async function POST(request: NextRequest) {
    try{
        const data = await request.json();
        const {supply} = data;

        //check if valid
        const dupeQuery = "SELECT * FROM inventory WHERE supply = $1;";
        const dupe = await query(dupeQuery,[supply]);
        if(dupe.rows.length == 0){
            return NextResponse.json({error:"Item does not exist in inventory!"},{status: 500});
        }


        const sql = "DELETE FROM inventory WHERE supply = $1;";
        const result = await query(sql,[supply]);
        return NextResponse.json({ message: "Inventory item removed: "+supply }, { status: 200 });
    }
    catch(error:any){
       console.log("ASDF");
        return NextResponse.json({error: error.toString()},{status: 500});
    }
}