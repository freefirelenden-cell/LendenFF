import mongoose from "mongoose";
const url = process.env.BASE_URLMONGO_URL
export async function databaseConnection() {
    console.log(url)
    return mongoose.connect(url)
    .then(()=> console.log("Database Connected Successfully"))
    .catch(err => console.log("Database Connection err", err))
}