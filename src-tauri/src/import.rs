use serde::Deserialize;
use dirs_next::config_dir;
use sqlx::sqlite::SqlitePool;

#[derive(Deserialize)]
pub struct ImportData {
    category: String,
    problem_name: String,
    problem_url: String,
    genre: String,
    difficulty_level: String,
}

#[tauri::command]
pub async fn import_problems(data: Vec<ImportData>) -> Result<(), String> {
    let mut db_path = config_dir().ok_or("設定ディレクトリが見つかりませんでした。")?;
        db_path.push("com.web-workbook-management-app.dev");
        db_path.push("web-workbook-management-app.db");
        let pool = SqlitePool::connect(&format!("sqlite:{}", db_path.display())).await.map_err(|_| "データベースの接続に失敗しました。")?;
        let mut values = Vec::new();
        for d in data {
            values.push((d.category, d.problem_name, d.problem_url, d.genre, d.difficulty_level));
        }
        let mut query = "INSERT INTO problems (category, problem_name, problem_url, genre, difficulty_level) VALUES ".to_string();
        for (index, _) in values.iter().enumerate() {
            query.push_str(&format!("(${}, ${}, ${}, ${}, ${})", 5*index+1, 5*index+2, 5*index+3, 5*index+4, 5*index+5));
            if index < values.len() - 1 {
                query.push_str(", ");
            }
        }
        let mut sqlx_query = sqlx::query(&query);
        for (_, value) in values.iter().enumerate() {
            sqlx_query = sqlx_query.bind(&value.0)
                                    .bind(&value.1)
                                    .bind(&value.2)
                                    .bind(&value.3)
                                    .bind(&value.4);
        }

    sqlx_query.execute(&pool).await.map_err(|_| "データの投入に失敗しました。")?;
        
    Ok(())
}