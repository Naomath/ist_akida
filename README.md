# タイピング道場

ローマ字タイピングゲーム（PixiJS + Next.js）

## 起動手順

```bash
npm install
npm run dev
```

ブラウザで http://localhost:3000 を開く。

## ゲームの遊び方

1. START ボタンをクリック
2. カウントダウン後、画面中央に単語が表示される
3. ローマ字でキー入力（Backspace で1文字削除可）
4. 正解すると次の単語へ、60秒で終了

## スコア計算

- 基本点 = 文字数 × 10
- コンボ倍率 = 1.0 + min(コンボ数 × 0.05, 1.0)
- 正解時: score += 基本点 × コンボ倍率

## ビルド

```bash
npm run build
npm start
```
