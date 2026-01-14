import mongoose from "mongoose";

let cachedConnection: typeof mongoose | null = null;

export async function connectToDatabase() {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  const uri = process.env.URI;

  if (!uri) {
    throw new Error("MongoDB URI is not configured. Please set the URI environment variable.");
  }

  try {
    const connection = await mongoose.connect(uri, {
      bufferCommands: false,
      maxPoolSize: 10,
    });

    cachedConnection = connection;
    return connection;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error connecting to database:", errorMessage);
    throw error;
  }
}
