import { Provider, Logger } from "@nestjs/common";
import { MongoClient, Db } from "mongodb";

export const MONGO_DB_PROVIDER = "MONGO_DB_PROVIDER";

export const mongoDbProvider: Provider = {
  provide: MONGO_DB_PROVIDER,
  useFactory: async (): Promise<Db> => {
    const logger = new Logger("MongoProvider");
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("MONGODB_URI environment variable is not set");
    }

    try {
      const client = new MongoClient(uri);
      await client.connect();
      logger.log("MongoDB connected successfully");

      const dbName = process.env.MONGO_DATABASE || "backend_events";
      const db = client.db(dbName);

      // Handle connection errors
      client.on("error", (error) => {
        logger.error("MongoDB connection error", error);
      });

      client.on("close", () => {
        logger.warn("MongoDB connection closed");
      });

      return db;
    } catch (error) {
      logger.error("Failed to connect to MongoDB", error);
      throw error;
    }
  },
};
