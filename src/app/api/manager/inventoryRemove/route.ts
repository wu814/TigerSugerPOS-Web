import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../utils/database";

//remove an item from inventory by id
export async function POST(request: NextRequest) {
    try{
        const data = await request.json();
        const {inventory_id} = data;
        const sql = "DELETE FROM inventory WHERE inventory_id = $1;";
        const result = await query(sql,[inventory_id]);
        return NextResponse.json({ message: "Inventory item removed: "+inventory_id }, { status: 200 });
    }
    catch(error:any){
       console.log("ASDF");
        return NextResponse.json({error: error.toString()},{status: 500});
    }
}