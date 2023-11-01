// you can reach this endpoint at ourwebsite.com/api/example (you need the file to be named route.ts for this framework)
import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../utils/database";

// this would be used for RETRIEVING things from the API or another one (such as getting rows from a database)
export async function GET(request: NextRequest) {
    // you will want a more descriptive name than queryMsg in your API (this is for example's sake)
    const queryMsg = await query("SELECT * FROM orders");
    return NextResponse.json({ message: queryMsg.rows[0] }, { status: 200 });
}

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