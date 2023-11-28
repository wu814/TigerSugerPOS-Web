import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../utils/database";

//edit the min stock of a inventory item
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


        const sql = "UPDATE inventory SET minimum_stock = $1 WHERE supply = $2";
        const result = await query(sql,[stock,supply]);
        return NextResponse.json({ message: "Min amount of "+supply+" changed successfully" }, { status: 200 });
    }
    catch(error:any){
       console.log("ASDF");
        return NextResponse.json({error: error.toString()},{status: 500});
    }
}