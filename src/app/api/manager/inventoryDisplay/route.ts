// you can reach this endpoint at ourwebsite.com/api/example (you need the file to be named route.ts for this framework)
import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../utils/database";

//returns all items in the inventory database
export async function GET(request: NextRequest) {
   
    const queryMsg = await query("SELECT * FROM inventory");
    return NextResponse.json({ message: queryMsg.rows }, { status: 200 });
}

