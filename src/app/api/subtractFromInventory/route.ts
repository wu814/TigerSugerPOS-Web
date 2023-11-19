import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../utils/database";


export async function POST(request: NextRequest) {
    try {
        const subtractFromInventoryQuery = await request.text();
        // Extract order details from the request data
        console.log(subtractFromInventoryQuery);
        // Execute the query with parameters
        const result = await query(subtractFromInventoryQuery);


        return NextResponse.json({ message: "supply removed successfully"}, { status: 200 });
    } catch (error:any) {
        return NextResponse.json({ error: error.toString() }, { status: 500 });
    }
}
