# Web 問題集管理用デスクトップアプリ

![メイン](https://github.com/strt9973/web_workbook_management_app/assets/129295225/fe723da8-b2cd-4be1-baf4-d091aafdb6c7)
Web 問題集管理用デスクトップアプリは、LeetCode のような、Web でできる問題集の進捗管理が可能なデスクトップアプリケーションです。

ダウンロードは[リリースページ](https://github.com/strt9973/web_workbook_management_app/releases)から可能です。

## 主な機能

### 問題管理

![問題管理](https://github.com/strt9973/web_workbook_management_app/assets/129295225/1ce4fbe4-79fa-4144-9369-9d0460cf5d5a)

問題の自力解答回数・最後に解いた日付などから、今やるべき問題を整理してリンクとともに表示します。
また、解答の記録（所要時間やどういったアプローチで解答したかなど）の記録も可能です

### 問題一覧

![一覧](https://github.com/strt9973/web_workbook_management_app/assets/129295225/8bce1869-af35-4a69-ac94-ad1525b0ec47)

問題の解答回数や、最終解答日などを確認することができます。
また、問題の追加も可能です。

### 記録した解答の確認機能

![解答履歴](https://github.com/strt9973/web_workbook_management_app/assets/129295225/7f4a0ff7-88ae-462f-b93f-02ca083c8f91)

過去の解答内容が確認可能です。

### 問題のインポート

![インポート](https://github.com/strt9973/web_workbook_management_app/assets/129295225/5c4b1266-987e-4a88-8593-be63ca070260)

以下の形式の CSV ファイルから、問題を一括でインポート可能です。

| カテゴリ     | 問題名       | 問題 URL | ジャンル     | 難易度                        |
| ------------ | ------------ | -------- | ------------ | ----------------------------- |
| 任意の文字列 | 任意の文字列 | URL      | 任意の文字列 | Easy, Medium, Hard のいずれか |

## 特徴

- ローカルで完結します
  - お使いの PC 内にデータベース(SQLite)を構築し、各種データを記録します。

## 動作確認済の環境

- MacOS Ventura 13.2.1
- Windows 11 Pro 22H2
