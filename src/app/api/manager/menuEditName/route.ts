import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../utils/database";

//edit the name of a menu item
export async function POST(request: NextRequest) {
    try{
        const data = await request.json();
        const {drink,newdrink} = data;

        //check if valid
        const dupeQuery = "SELECT * FROM products WHERE drink_name = $1;";
        const dupe = await query(dupeQuery,[drink]);
        if(dupe.rows.length == 0){
            return NextResponse.json({error:"Item does not exist on Menu!"},{status: 500});
        }


        const sql = "UPDATE products SET drink_name = $1 WHERE drink_name = $2";
        const result = await query(sql,[newdrink,drink]);
        return NextResponse.json({ message: "Name of "+drink+" changed successfully" }, { status: 200 });
    }
    catch(error:any){
       console.log("ASDF");
        return NextResponse.json({error: error.toString()},{status: 500});
    }
}