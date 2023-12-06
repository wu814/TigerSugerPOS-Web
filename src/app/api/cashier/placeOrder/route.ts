import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../utils/database";

// Writing new order to the database
/**
 * Places an order, alters the database
 *
 * @param request contains data needed for SQL query: orderTimestamp, employeeId, customerId, orderItems, orderTotal, drinkAttributes, drinkAddOns
 * @returns a message indicating whether the query was successful or not
 */
export async function POST(request: NextRequest) {
    try {
        const reqData = await request.json();
        // Extract order details from the request data
        const { orderTimestamp, employeeId, customerId, orderItems, orderTotal, drinkAttributes, drinkAddOns } = reqData;
        // Construct the SQL query to insert a new order
        const insertQuery = "INSERT INTO orders (order_timestamp, employee_id, customer_id, order_items, order_total, drink_attributes, drink_addons) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING order_id";

        // Execute the query with parameters
        const result = await query(insertQuery, [orderTimestamp, employeeId, customerId, orderItems, orderTotal, drinkAttributes, drinkAddOns]);

        // Retrieve the newly generated order_id
        const { order_id } = result.rows[0];

        return NextResponse.json({ message: "Order added successfully", order_id }, { status: 200 });
    } catch (error:any) {
        return NextResponse.json({ error: error.toString() }, { status: 500 });
    }
}

