import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../utils/database";

// this would be used for CREATING things in the API (such as adding a row to a database)
export async function POST(request: NextRequest) {
    try {
        const reqData = await request.json();
        console.log(reqData);
        // Extract order details from the request data
        const { order_timestamp, employee_id, customer_id, order_items, order_total, drink_attributes, drink_addons } = reqData;
        // Construct the SQL query to insert a new order
        const insertQuery = "INSERT INTO orders (order_timestamp, employee_id, customer_id, order_items, order_total, drink_attributes, drink_addons) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING order_id";

        // Execute the query with parameters
        const result = await query(insertQuery, [order_timestamp, employee_id, customer_id, order_items, order_total, drink_attributes, drink_addons]);

        // Retrieve the newly generated order_id
        const { order_id } = result.rows[0];

        return NextResponse.json({ message: "Order added successfully", order_id }, { status: 200 });
    } catch (error:any) {
        return NextResponse.json({ error: error.toString() }, { status: 500 });
    }
}

