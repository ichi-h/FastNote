# Fast Note

![FastNote](./img/FastNote.jpg)

## Fast Note とは？

Fast Note とは、**マークダウン形式で取ったメモをクラウド上に保存し管理できるメモアプリ** です。  
保存したメモはログインしたどの端末からでもアクセス・更新ができます。  
また、オフライン時でも作業可能です。

## 主な機能

- アカウント管理
  - 新規作成
  - ログイン
  - ログアウト
  - 削除
- メモ
  - マークダウン形式
  - オプション
    - タイトル、カテゴリ、タグ、作成・更新日時、お気に入り
  - メモの削除
- 自動保存機能
- カテゴリー別閲覧機能
- PWA
- レスポンシブ対応

## 実装予定

- メモの検索
- ユーザー指定のテーマ
- 画像投稿機能
- メモ閲覧時にメモをスタイリングする
- 削除したメモの復元
- localStorage から indexedDB への移行
- デスクトップ版の作成

## 使用技術

- フロントエンド
  - Next.js (React)
  - TypeScript
  - Recoil
  - styled-jsx
  - CodeMirror
  - crypto-js
- バックエンド
  - Firebase
    - Authentication
    - Realtime Database
