import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../utils/database";

// excess report:
// given a timestamp, display the list of inventory items that only sold less than 10% of their inventory between the timestamp and now
export async function GET(request: NextRequest) {
    //initialize variables and input
    const input = await request.json();
    const {start} = input; //start date
    const end = new Date(); //end date
    let map = new Map<string,number>();

    const excessQuery = "SELECT * FROM inventory_history WHERE order_timestamp BETWEEN $1 AND $2;";
    const excessData = await query(excessQuery,[start,end]);

    //process data from query
    for(const current of excessData.rows){
        const currItem:string = current.inventory_item;
        const currQuantity:number = current.quantity;
        if(map.has(currItem)){ //key already in map
            const updateQuantity:number = currQuantity + (map.get(currItem) ?? 0);
            map.set(currItem,updateQuantity);
        }
        else{ //key not in map
            map.set(currItem,currQuantity);
        }
    } 

    //iterate through map and determine if there is excess
    const currQuery = "SELECT supply, stock_remaining FROM inventory";
    const currData = await query(currQuery,[]);
    let table: string[][] = [];

    for(const current of currData.rows){
        const currItem = current.supply;
        const currStock:number = current.stock_remaining;
        const stockUsed:number = (map.get(currItem) ?? 0);
        const totalStock:number = stockUsed + currStock;
        if(stockUsed < (totalStock * 0.1)){
            const row : string[] = [currItem,stockUsed.toString(),totalStock.toString()];
            table.push(row);
        }
    }




    return NextResponse.json({ message: excessData.rows }, { status: 200 });
}

