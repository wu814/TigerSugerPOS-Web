// you can reach this endpoint at ourwebsite.com/api/example (you need the file to be named route.ts for this framework)
import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../utils/database";

// this would be used for RETRIEVING things from the API or another one (such as getting rows from a database)
export async function GET(request: NextRequest) {
    // you will want a more descriptive name than queryMsg in your API (this is for example's sake)
    const queryMsg = await query("SELECT * FROM orders");
    return NextResponse.json({ message: queryMsg.rows[0] }, { status: 200 });
}

//ADDING A NEW ITEM TO THE MENU
export async function POST(request: NextRequest) {
    try{
        const data = await request.json();
        const {drink_name, price, ingredients, drink_type} = data;
        for (const i of ingredients){
            const checkQuery = "SELECT * FROM inventory WHERE supply = $1";
            const check = await query(checkQuery,[i]);
            if(check.rowCount == 0){
                const newItem = "INSERT INTO inventory (inventory_id, supply, stock_remaining,minimum_stock) VALUES (DEFAULT, $1, 100, 100);";
                await query(newItem,[i]);
            }
        }

        const sql = "INSERT INTO products (product_id, drink_name, price, ingredients, drink_type) VALUES (DEFAULT, $1, $2, $3, $4);";
        const result = await query(sql,[drink_name, price, ingredients, drink_type]);
        return NextResponse.json({ message: "Menu item added" }, { status: 200 });
    }
    catch(error:any){
        return NextResponse.json({error: error.toString()},{status: 500});
    }
}