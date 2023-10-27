import mongoose from "mongoose";

type DBOptions = {
  base_uri: string;
  db_name: string;
};

const DBOptions: DBOptions = {
  base_uri: process.env.MONGODB_URI as string,
  db_name: process.env.DB_NAME as string,
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
