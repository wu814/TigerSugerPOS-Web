import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../utils/database";

//adding a new item to the database
export async function POST(request: NextRequest) {
    try{
        const data = await request.json();
        const {drink_name, price, ingredients, drink_type} = data;
        
        for (const i of ingredients){
            //If ingredient is not in inventory, add to inventory
            const checkQuery = "SELECT * FROM inventory WHERE supply = $1";
            const check = await query(checkQuery,[i]);
            if(check.rowCount == 0){
                const newItem = "INSERT INTO inventory (inventory_id, supply, stock_remaining,minimum_stock) VALUES (DEFAULT, $1, 100, 100);";
                await query(newItem,[i]);
            }
        }

        //add new item
        const sql = "INSERT INTO products (product_id, drink_name, price, ingredients, drink_type) VALUES (DEFAULT, $1, $2, $3, $4);";
        const result = await query(sql,[drink_name, price, ingredients, drink_type]);
        return NextResponse.json({ message: "Menu item added" }, { status: 200 });
    }
    catch(error:any){
        return NextResponse.json({error: error.toString()},{status: 500});
    }
}