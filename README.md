# 守護神占い - Guardian Deity Fortune

あなたの生年月日と出生時刻から、80柱以上の守護神を導き出し、本質・恋愛・仕事・運命を占うWebアプリケーションです。

## 技術スタック

- **Frontend**: React, TypeScript, Tailwind CSS
- **AI**: Google Gemini API (@google/genai)
- **Build Tool**: Vite

## セットアップ手順

### 1. リポジトリのクローン
```bash
git clone <repository-url>
cd guardian-deity-fortune
```

### 2. 依存関係のインストール
```bash
npm install
```

### 3. 環境変数の設定
プロジェクトルートに `.env` ファイルを作成し、Google Gemini APIキーを設定してください。
※ `.env` ファイルはGitにアップロードしないでください。

```env
API_KEY=あなたのAPI_KEY_をここに貼り付け
```

### 4. アプリケーションの起動
```bash
npm run dev
```
ブラウザで `http://localhost:3000` にアクセスしてください。

## 注意事項

- APIキーは非常に重要です。GitHub等の公開リポジトリに誤ってアップロードしないよう注意してください（`.gitignore`で設定済みです）。
- Google GenAI SDKを使用しています。APIの利用量に応じて課金が発生する場合があるため、Google Cloud Consoleで割り当てを確認してください。
