import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../utils/database";
import { QueryResult } from "pg";
import { NextApiRequest } from 'next';




export async function GET(request: NextRequest) {
    try {
        const sqlQuery = "SELECT supply, stock_remaining FROM inventory";
        const result = await query(sqlQuery);
        
        return NextResponse.json({ message: result.rows}, {status: 200});
        
    } catch (error: any) {
        return NextResponse.json({ error: error.toString()}, {status: 500});
    }
}

