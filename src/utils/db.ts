import { notifications } from "@mantine/notifications";
import Database, { QueryResult } from "@tauri-apps/plugin-sql";

export async function select<T>(
  sql: string,
  bindValues?: (string | number)[]
): Promise<T[]> {
  let db: Database | null = null;
  let result: any | null = null;
  try {
    db = await Database.load("sqlite:leetcode-management-db.db");
    if (bindValues) {
      result = await db.select(sql, bindValues);
    } else {
      result = await db.select(sql);
    }
  } catch (error) {
    notifications.show({
      title: "Error",
      message: "データベースからの情報取得に失敗しました。",
      color: "red",
    });
  } finally {
    if (db) {
      db.close();
    }
    return result;
  }
}

export const execute = async (
  sql: string,
  bindValues?: (string | number)[]
) => {
  let db: Database | null = null;
  let result: QueryResult | null = null;
  try {
    db = await Database.load("sqlite:leetcode-management-db.db");
    if (bindValues) {
      result = await db.execute(sql, bindValues);
    } else {
      result = await db.execute(sql);
    }
  } catch (error) {
    notifications.show({
      title: "Error",
      message: "データベースへの操作に失敗しました。",
      color: "red",
    });
  } finally {
    if (db) {
      db.close();
    }
    return result;
  }
};
