import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../utils/database";

//Remove a menu item by ID
export async function POST(request: NextRequest) {
    try{
        const data = await request.json();
        const {product_id} = data;
        const sql = "DELETE FROM products WHERE product_id = $1;";
        const result = await query(sql,[product_id]);
        return NextResponse.json({ message: "Menu item removed: "+product_id }, { status: 200 });
    }
    catch(error:any){
       console.log("ASDF");
        return NextResponse.json({error: error.toString()},{status: 500});
    }

}