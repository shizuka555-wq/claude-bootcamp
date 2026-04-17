# claude-bootcamp

「私の分身を育てる ClaudeCodeブートキャンプ」ランディングページ。

## ファイル構成

```
lp/
├── index.html      ← LP 本体
├── style.css       ← スタイル
├── script.js       ← スクロール時のアニメーション
├── images/
│   └── shizuka.jpg ← プロフィール写真
└── README.md
```

## デプロイ

Netlify に GitHub 連携でデプロイ。`main` ブランチに push されると自動で公開される。

- Build command: (なし)
- Publish directory: `.`(ルートをそのまま公開)

## ローカルで確認する

`index.html` をブラウザでダブルクリックで開くだけ。

## 更新の流れ

```bash
git add .
git commit -m "〇〇を更新"
git push
```

push すると Netlify が自動で再デプロイします。
