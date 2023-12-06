import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../utils/database";

//add a new item to the inventory
/**
 * Adds a new item to the inventory
 *
 * @param request contains data needed for SQL query: supply, stock_remaining, minimum_stock
 * @returns a message indicating whether the query was successful or not
 */
export async function POST(request: NextRequest) {
    try{
        const data = await request.json();
        const {supply, stock_remaining,minimum_stock} = data;

        ///////INPUT VALIDATION///////
        //supply
        //check that item is not already in inventory
        const dupeQuery = "SELECT * FROM inventory WHERE supply = $1;";
        const dupe = await query(dupeQuery,[supply]);
        if(dupe.rows.length > 0){
            console.log("Dupe Inventory");
            return NextResponse.json({error:"Item already exists in inventory!"},{status: 500});
        }

        //stock_remaining
        if(!Number.isInteger(Number.parseInt(stock_remaining)))
            return NextResponse.json({error: "Invalid Stock Amount. Please enter an integer."},{status: 500});

        //min stock
        if(!Number.isInteger(Number.parseInt(minimum_stock)))
            return NextResponse.json({error: "Invalid Min Stock. Please enter an integer."},{status: 500});
        ///////////////////////////////

        const sql = "INSERT INTO inventory (inventory_id, supply, stock_remaining,minimum_stock) VALUES (DEFAULT, $1, $2, $3);";
        const result = await query(sql,[supply,stock_remaining,minimum_stock]);
        return NextResponse.json({ message: "Inventory item added" }, { status: 200 });
    }
    catch(error:any){
        return NextResponse.json({error: error.toString()},{status: 500});
    }
}

