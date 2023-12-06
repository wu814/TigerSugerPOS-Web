import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../utils/database";

export const dynamic = 'force-dynamic';

// Getting the most recent 100 orders
/**
 * Gets the recent orders
 *
 * @returns a JSON containing the 100 most recent orders
 */
export async function GET(request: NextRequest) {
    try {
        const orders = await query(
            `
            SELECT *
            FROM orders
            ORDER BY order_timestamp DESC
            LIMIT 100
            `
        );
    return NextResponse.json({ message: orders.rows }, { status: 200 });
    } catch (error:any) {
            return NextResponse.json({ error: error.toString() }, { status: 500 });
    }
}

