import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../utils/database";

export const dynamic = 'force-dynamic';

//returns the contents of the products table (our menu)
export async function GET(request: NextRequest) {
   
    const queryMsg = await query("SELECT * FROM products");
    return NextResponse.json({ message: queryMsg.rows }, { status: 200 });
}

