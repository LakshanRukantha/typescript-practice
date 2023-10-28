import mongoose from "mongoose";

// Types for DBOptions
type DBOptions = {
  base_uri: string;
  db_name: string;
};

const DBOptions: DBOptions = {
  base_uri: process.env.MONGODB_URI as string, // DB connection string
  db_name: process.env.DB_NAME as string, // DB name
};

const connectDB = async (): Promise<void> => {
  try {
    const connectionString = `${DBOptions.base_uri}${DBOptions.db_name}`;
    await mongoose.connect(connectionString);
    // console.log("✅ Connected to Database!");
  } catch (error) {
    console.log(`❌ Error connecting to Database: ${error}`);
  }
};

export default connectDB;
