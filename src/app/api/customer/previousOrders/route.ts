import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../utils/database";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const {email} = Object.fromEntries(request.nextUrl.searchParams);
        const user = await query(`SELECT id FROM users WHERE email = $1`, [email]);

        if (user.rows.length === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const { id } = user.rows[0];

        const orders = await query(`SELECT * FROM orders WHERE customer_id = $1 LIMIT 5`, [id]);

        return NextResponse.json({ message: orders.rows }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.toString() }, { status: 500 });
    }
}
