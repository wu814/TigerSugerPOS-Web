import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../utils/database";


export async function POST(request: NextRequest) {
    try {
        const reqData = await request.json();
        // Extract order details from the request data
        const {amount, supply} = reqData;
        // Construct the SQL query to insert a new order
        const insertQuery = "UPDATE inventory SET stock_remaining = stock_remaining - $1 WHERE supply = $2 RETURNING supply;";

        // Execute the query with parameters
        const result = await query(insertQuery, [amount, supply]);


        return NextResponse.json({ message: "supply removed successfully: "+ supply}, { status: 200 });
    } catch (error:any) {
        return NextResponse.json({ error: error.toString() }, { status: 500 });
    }
}
