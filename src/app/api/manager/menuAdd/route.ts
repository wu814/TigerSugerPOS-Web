import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../utils/database";

//adding a new item to the database
/**
 * Adding a new item to the database
 *
 * @param request contains data needed for SQL query: drink_name, price, ingredients, drink_type, description, image
 * @returns a message indicating whether the query was successful or not
 */
export async function POST(request: NextRequest) {
    try{
        const data = await request.json();
        let {drink_name, price, ingredients, drink_type,description,image} = data;

        console.log(data);

        ///////INPUT VALIDATION///////
        //Drink Name
        //check that item is not already in menu
        const dupeQuery = "SELECT * FROM products WHERE drink_name = $1;";
        const dupe = await query(dupeQuery,[drink_name]);
        if(dupe.rows.length > 0){
            console.log("Dupe Menu");
            return NextResponse.json({error:"Item already exists on menu!"},{status: 500});
        }

        //Price
        const pricePattern = /^\d{1,3}(\.\d{0,2})?$/;
        if(isNaN(parseFloat(price)) || !pricePattern.test(price))
            return NextResponse.json({error:"Invalid Price. Please enter a number with at most two decimals"},{status: 500});
        price = parseFloat(price);
        console.log(price);
    
        //Ingredients
        for (const i of ingredients){
            //If ingredient is not in inventory, add to inventory
            const checkQuery = "SELECT * FROM inventory WHERE supply = $1;";
            const check = await query(checkQuery,[i]);
            if(check.rowCount == 0){
                const newItem = "INSERT INTO inventory (inventory_id, supply, stock_remaining,minimum_stock) VALUES (DEFAULT, $1, 100, 100);";
                await query(newItem,[i]);
            }
        }

        //drink type doesn't need validation because there are buttons
        //////////////////////////////
        //add new item
        const sql = "INSERT INTO products (product_id, drink_name, price, ingredients, drink_type, description, image_url) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6);";
        const result = await query(sql,[drink_name, price, ingredients, drink_type,description,image]);
        return NextResponse.json({ message: "Menu item added" }, { status: 200 });
    }
    catch(error:any){
        return NextResponse.json({error: error.toString()},{status: 500});
    }
}