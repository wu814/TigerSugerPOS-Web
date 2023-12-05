import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../utils/database";

//Remove a menu item by ID
export async function POST(request: NextRequest) {
    try{
        const data = await request.json();
        const {drink_name} = data;
        
        //check if valid
        const dupeQuery = "SELECT * FROM products WHERE drink_name = $1;";
        const dupe = await query(dupeQuery,[drink_name]);
        if(dupe.rows.length == 0){
            return NextResponse.json({error:"Item does not exist on menu!"},{status: 500});
        }

        const sql = "DELETE FROM products WHERE drink_name = $1;";
        const result = await query(sql,[drink_name]);
        return NextResponse.json({ message: "Menu item removed: "+drink_name }, { status: 200 });
    }
    catch(error:any){
        console.log("ASDF");
        return NextResponse.json({error: error.toString()},{status: 500});
    }

}