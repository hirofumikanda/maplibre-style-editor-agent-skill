# MapLibre Style Editor Agent Skill

MapLibre のスタイル JSON を編集する際に、ローカルの MapLibre Style Specification を常に参照しながら作業できる、エージェントスキルキットです。

## リファレンスファイルの生成

最新の [MapLibre スタイルスペック](https://maplibre.org/maplibre-style-spec/) を取得し、ローカルのリファレンスファイルを生成します。

```bash
npm run fetch-spec
npm run extract-spec
```

## 使い方

`skills/maplibre-style-editor/SKILL.md` をエージェントスキルとして登録してください。スキルがエージェントに対して、スタイルプロパティを変更する前に `skills/maplibre-style-editor/reference/maplibre-style-spec/` 配下のファイルを参照するよう指示します。

## ファイル構成

```text
skills/maplibre-style-editor/
├── SKILL.md
├── reference/
└── scripts/
    ├── validate-style.mjs
    └── lookup-style-spec.mjs
scripts/
├── fetch-style-spec.mjs
└── extract-style-spec.mjs
vendor/
└── maplibre-style-spec/
    └── v8.json
package.json
```

`skills/maplibre-style-editor/reference/maplibre-style-spec/` 配下のリファレンスファイルは `vendor/maplibre-style-spec/v8.json` から生成されます。リファレンスファイルを更新したい場合は `npm run fetch-spec && npm run extract-spec` を再実行してください。
