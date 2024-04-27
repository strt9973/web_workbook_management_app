// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use tauri_plugin_sql::{Migration, MigrationKind};
mod import;

fn main() {
    let migrations = vec![
        Migration {
            version: 1,
            description: "create_initial_problem_tables",
            sql: include_str!("../migrations/0001_create_problems.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "create_initial_histories_tables",
            sql: include_str!("../migrations/0002_create_histories.sql"),
            kind: MigrationKind::Up,
        },
    ];

    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:web-workbook-management-app.db", migrations)
                .build(),
        ).plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            import::import_problems,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
