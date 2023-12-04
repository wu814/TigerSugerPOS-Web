import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../utils/database";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        // Assuming you have a user_id in the query parameters, adjust it based on your actual setup
        const {email} = Object.fromEntries(request.nextUrl.searchParams);

        // Retrieve is_manager and is_cashier from users table
        const userQuery = "SELECT is_cashier, is_manager FROM users WHERE email = $1;";
        const userResult = await query(userQuery, [email]);

        if (userResult.rows.length === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const { is_cashier, is_manager } = userResult.rows[0];

        return NextResponse.json({ is_cashier, is_manager }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.toString() }, { status: 500 });
    }
}
