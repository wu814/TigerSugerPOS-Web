import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../utils/database";


// Executing the query to subtract from inventory
/**
 * Executing the query to subtract from inventory
 *
 * @param request contains data needed for SQL query: supply
 * @returns a message indicating whether the query was successful or not
 */
export async function POST(request: NextRequest) {
    try {
        const subtractFromInventoryQuery = await request.text();
        // Execute the query with parameters
        const result = await query(subtractFromInventoryQuery);


        return NextResponse.json({ message: "supply removed successfully"}, { status: 200 });
    } catch (error:any) {
        return NextResponse.json({ error: error.toString() }, { status: 500 });
    }
}
