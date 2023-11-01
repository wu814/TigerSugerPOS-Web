// you can reach this endpoint at ourwebsite.com/api/example (you need the file to be named route.ts for this framework)
import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../utils/database";

//Contacts the database and calculates a sales report
//Returns a matrix
/*
    DRINK   UNITS   SALES
    D1      U1       S1
    D2      U2       S2
    ...
    
    to get d1, table[0][0]
    to get u1, table[1][0]
    to get s1, table[2][0]


*/
export async function GET(request: NextRequest) {
    // you will want a more descriptive name than queryMsg in your API (this is for example's sake)
    const queryMsg = await query("SELECT * FROM orders");
    const drink: string[] = [];
    const units: string[] = [];
    const sales: string[] = [];
    const table: string[][] = [drink,units,sales];


    
    return NextResponse.json({ message: queryMsg.rows[0] }, { status: 200 });
}

// this would be used for CREATING things in the API (such as adding a row to a database)
export async function POST(request: NextRequest) {
    const reqMsg = request.json();

    return NextResponse.json({ message: reqMsg }, { status: 200 });
}