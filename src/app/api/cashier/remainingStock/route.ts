import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../utils/database";
import { QueryResult } from "pg";
import { NextApiRequest } from 'next';

export const dynamic = 'force-dynamic';

// Getting the remaining stock for all ingredients
/**
 * Gets the remaining stock for all ingredients
 *
 * @returns a JSON containing the supply and remaining stock for all inventory
 */
export async function GET(request: NextRequest) {
    try {
        const sqlQuery = "SELECT supply, stock_remaining FROM inventory";
        const result = await query(sqlQuery);
        
        return NextResponse.json({ message: result.rows}, {status: 200});
        
    } catch (error: any) {
        return NextResponse.json({ error: error.toString()}, {status: 500});
    }
}

