use serde::Deserialize;

#[derive(Deserialize)]
pub struct ImportData {
    category: String,
    problem_name: String,
    problem_url: String,
    genre: String,
    difficulty_level: String,
}

#[tauri::command]
pub async fn import_problems(data: Vec<ImportData>) -> Result<(), ()> {
    for d in data {
        println!("{} {} {} {} {}", d.category, d.problem_name, d.problem_url, d.genre, d.difficulty_level);
    }
   Ok(())
}