---
name: MapLibre Style Editor
description: MapLibre Style JSON を公式 Style Specification に従って安全に編集・レビューするためのスキル
---

# MapLibre Style Editor

このスキルは MapLibre Style JSON を編集・レビューする際に使用します。

目的は、**必ず公式 MapLibre Style Specification に従って編集を行い、仕様に存在しないプロパティや誤った値を生成しないこと**です。

---

# 基本方針

MapLibre Style Specification を唯一の正しい仕様とします。

以下を推測で生成してはいけません。

- プロパティ名
- enum の値
- Expression
- Paint プロパティ
- Layout プロパティ
- Source の設定項目

仕様に記載されていないものは使用しないでください。

---

# 仕様の参照

スタイルを編集する前に、必ず対象となる仕様を確認してください。

仕様ファイルは `reference/maplibre-style-spec/` ディレクトリ配下に格納されています。
編集前に `reference/maplibre-style-spec/` ディレクトリの構成を確認し、該当するファイルを特定してください。

- `reference/maplibre-style-spec/` 直下のファイルは Style 全体・Sources・Expressions などの共通仕様です。
- `reference/maplibre-style-spec/layers/` 配下のファイルは Layer Type 別の仕様です。

不要な仕様書は読み込まず、編集対象に必要なものだけを参照してください。

特定のプロパティを検索する場合は `scripts/lookup-style-spec.mjs` を利用してください。

```bash
node scripts/lookup-style-spec.mjs <property-name>
```

---

# 編集手順

編集前に次の手順を実施してください。

1. 編集対象を確認する
2. 対象 Layer の type を確認する
3. 該当する仕様を参照する
4. 利用可能なプロパティを確認する
5. 必要最小限の変更のみ行う

編集後は次の確認を行ってください。

- 存在しないプロパティを使用していないか
- 型が正しいか
- Expression が正しいか
- Source 名・Layer 名が一致しているか
- Style Validation が通るか

---

# 既存スタイルの扱い

既存の Style はできるだけ維持してください。

特に以下は、明示的な指示がない限り変更しません。

- Layer の順番
- Layer ID
- Source ID
- source-layer
- Filter
- Metadata

既存の設定を削除するより、必要最小限の修正を優先してください。

---

# Layer の追加

新しい Layer を追加する場合は、

- 適切な Layer Type を選択する
- 対応する Paint/Layout のみ使用する
- 描画順を考慮する
- 必要以上のプロパティは追加しない

---

# Expressions

Expression を編集する場合は、

- 既存ロジックを維持する
- 必要以上に複雑にしない
- 仕様に存在する Operator のみ利用する

Expression を推測で生成してはいけません。

---

# Sources

Source を編集する場合は、

以下は指示がない限り変更しません。

- type
- tiles
- url
- attribution
- bounds
- scheme

---

# バリデーション

編集完了後は必ず Style Validation を行います。

バリデーションスクリプトの実行には `maplibre-gl-style-spec` パッケージが必要です。
未インストールの場合は、先にインストールしてください。

```bash
npm install
```

実行例

```bash
node scripts/validate-style.mjs style.json
```

Validation Error がある場合は、修正してから完了としてください。

---

# 不明な場合

仕様に記載がない場合は、

**「サポートされていない」と判断してください。**

インターネット上のサンプルコードよりも、MapLibre Style Specification を優先してください。

---

# 回答方針

回答時は次の内容を含めてください。

- 変更内容
- 変更理由
- 影響範囲
- 必要であれば注意点

コードだけを提示せず、何を変更したかを簡潔に説明してください。