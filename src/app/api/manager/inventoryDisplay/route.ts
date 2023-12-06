// you can reach this endpoint at ourwebsite.com/api/example (you need the file to be named route.ts for this framework)
import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../utils/database";

export const dynamic = 'force-dynamic';

//returns all items in the inventory database
/**
 * Returns all items in the inventory database
 *
 * @returns a JSON containing all elements from inventory database
 */
export async function GET(request: NextRequest) {
   
    const queryMsg = await query("SELECT * FROM inventory");
    return NextResponse.json({ message: queryMsg.rows }, { status: 200 });
}

