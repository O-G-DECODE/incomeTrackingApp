import * as SQLite from "expo-sqlite";

export async function getDatabase() {
  return await SQLite.openDatabaseAsync("billing_v2.db");
}