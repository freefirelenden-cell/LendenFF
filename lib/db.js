import mongoose from "mongoose";

export async function databaseConnection() {
    return mongoose.connect(process.env.BASE_URLMONGO_URL)
    .then(()=> console.log("Database Connected Successfully"))
    .catch(err => console.log("Database Connection err", err))
}