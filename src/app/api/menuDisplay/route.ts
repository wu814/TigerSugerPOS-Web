// you can reach this endpoint at ourwebsite.com/api/example (you need the file to be named route.ts for this framework)
import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../utils/database";

// this would be used for RETRIEVING things from the API or another one (such as getting rows from a database)
export async function GET(request: NextRequest) {
   
    const queryMsg = await query("SELECT * FROM products");
    return NextResponse.json({ message: queryMsg.rows }, { status: 200 });
}

// this would be used for CREATING things in the API (such as adding a row to a database)
export async function POST(request: NextRequest) {
    const reqMsg = request.json();

    return NextResponse.json({ message: reqMsg }, { status: 200 });
}