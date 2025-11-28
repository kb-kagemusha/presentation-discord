# プレゼン用アクセスサイト

Discord応募フォームのシンプルなWebアプリケーション

## 📋 概要

スマートフォン向けの応募フォームと管理画面を持つシンプルなWebアプリです。

## 🚀 ローカル環境でのセットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. サーバーの起動

```bash
npm start
```

開発モード（自動再起動）:
```bash
npm run dev
```

## 🌐 アクセス

サーバー起動後、以下のURLにアクセスできます：

- **応募フォーム**: http://localhost:3001/
- **管理画面**: http://localhost:3001/admin.html

## ☁️ Render.comへのデプロイ

### 前提条件
- GitHubアカウント
- Render.comアカウント（無料）

### デプロイ手順

#### 1. GitHubにプッシュ

```bash
# Gitリポジトリの初期化（まだの場合）
git init

# ファイルをステージング
git add .

# コミット
git commit -m "Initial commit"

# GitHubリポジトリを作成後、リモートを追加
git remote add origin https://github.com/YOUR_USERNAME/presentation-discord.git

# プッシュ
git push -u origin main
```

#### 2. Render.comでデプロイ

1. [Render.com](https://render.com) にログイン
2. 「New +」→「Web Service」をクリック
3. GitHubリポジトリを選択
4. 以下の設定を入力：

   | 項目 | 値 |
   |------|-----|
   | Name | `presentation-discord`（任意） |
   | Environment | `Node` |
   | Build Command | `npm install` |
   | Start Command | `npm start` |
   | Instance Type | `Free` |

5. 「Create Web Service」をクリック

#### 3. デプロイ完了

5〜10分でデプロイが完了し、公開URLが発行されます。

例: `https://presentation-discord.onrender.com`

### 注意事項

- 無料プランでは、15分間アクセスがないとスリープします
- 初回アクセス時は起動に30秒〜1分かかる場合があります
- データは `data/submissions.json` に保存されます

## 🔐 管理画面

### ログイン情報

- **パスワード**: `admin123`

※ `server.js` の `ADMIN_PASSWORD` を変更してカスタマイズできます

## 📁 プロジェクト構成

```
presentation-discord/
├── index.html              # 応募フォーム（スマホ向け）
├── admin.html              # 管理画面（パスワード保護）
├── server.js               # Express サーバー
├── package.json            # 依存関係
├── .gitignore              # Git除外ファイル
├── data/
│   └── submissions.json    # 応募データ（JSON形式）
└── README.md               # このファイル
```

## 🎨 機能

### 応募フォーム（index.html）
- スマートフォン最適化
- オレンジ系のスタイリッシュなデザイン
- リアルタイムバリデーション
- 送信完了ポップアップ
- 応募済み表示

### 管理画面（admin.html）
- パスワード保護
- 応募データの一覧表示
- 日時順でソート（新しい順）
- 自動更新機能（30秒ごと）
- シンプルで見やすいデザイン

## 📊 データ形式

応募データは以下の形式で保存されます：

```json
[
  {
    "id": 1735372800000,
    "name": "山田 太郎",
    "age": 25,
    "discordId": "username#1234",
    "timestamp": "2025-01-28T12:00:00.000Z",
    "submittedAt": "2025/01/28 21:00:00"
  }
]
```

## ⚙️ カスタマイズ

### ポート番号の変更

`server.js` を編集：

```javascript
const PORT = process.env.PORT || 3001;  // 任意のポート番号に変更
```

または環境変数で指定：

```bash
PORT=8080 npm start
```

### 管理者パスワードの変更

`server.js` を編集：

```javascript
const ADMIN_PASSWORD = 'your_secure_password';
```

## 🛠️ 技術スタック

- **サーバー**: Node.js + Express
- **データ保存**: JSON ファイル
- **フロントエンド**: HTML + CSS + Vanilla JavaScript
- **デザイン**: モダン・レスポンシブ
- **ホスティング**: Render.com（推奨）

## 📝 注意事項

- 本番環境では、より強固なパスワード認証を推奨
- データベースの使用を検討（大量データの場合）
- HTTPS化を推奨（Render.comは自動）
- セキュリティ対策（CORS、Rate Limiting等）の実装を検討

## 📄 ライセンス

ISC
