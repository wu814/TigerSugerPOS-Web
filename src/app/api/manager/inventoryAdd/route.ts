import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../utils/database";

//add a new item to the inventory
export async function POST(request: NextRequest) {
    try{
        const data = await request.json();
        const {supply, stock_remaining} = data;
        const sql = "INSERT INTO inventory (inventory_id, supply, stock_remaining,minimum_stock) VALUES (DEFAULT, $1, $2, 100);";
        const result = await query(sql,[supply,stock_remaining]);
        return NextResponse.json({ message: "Inventory item added" }, { status: 200 });
    }
    catch(error:any){
        return NextResponse.json({error: error.toString()},{status: 500});
    }
}

