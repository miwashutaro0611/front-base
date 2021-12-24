# フロントエンド環境構築テスト

![このプロジェクトのissuesの数](https://img.shields.io/github/issues/miwashutaro0611/front-base)
![このプロジェクトのコードサイズ](https://img.shields.io/github/languages/code-size/miwashutaro0611/front-base)

## このプロジェクトについて

- [pug](https://pugjs.org/api/getting-started.html) + [scss(dart-sass)](https://sass-lang.com/dart-sass) + [TypeScript](https://www.typescriptlang.org/)を使用した非SPAを考慮したページのボイラープレート。
- 各種パッケージのアップデート + 新規ライブラリの検証用

## 環境構築

| アプリケーション名 | バージョン | 補足 |
| --- | --- | --- |
| [Node.js](https://nodejs.org/ja/) | 16.13.1 | |
| [Visual Studio Code](https://code.visualstudio.com/) | | [webstorm](https://www.jetbrains.com/ja-jp/webstorm/)などの他のエディタでも可 |
| [yarn](https://classic.yarnpkg.com/lang/en/) | 1.22.11 | npmでのインストールは非対応 |
| [Docker Compose](https://docs.docker.com/compose/install/) | | 現在(21/12/25時点)作成中 |

## scriptsについて

| script名 | description |
| --- | --- |
| build | ビルドの実行 |
| create:webp | png画像などをwebp画像でも作成(現在(21/12/25時点)作成中)|
| deploy | デプロイの実行 |
| dev | 開発モードでの実行 |
| lint | コードのlintチェック |
| test | jestを実行してTypeScriptの一部のコードの検証 |

## 過去に対応したことの記事一覧

- 2019-03-22 : [pug + stylus + gulp + webpack技術選定・行っていること](https://jackswim3411.hatenablog.com/entry/2019/03/22/045610)
- 2019-04-22 : [stylus + jsの整形ルール](https://jackswim3411.hatenablog.com/entry/2019/04/22/213248)
- 2019-05-06 : [stylusのlintを導入](https://jackswim3411.hatenablog.com/entry/2019/05/06/023037)
- 2019-06-14 : [自分のgulpv4 + webpackの設定](https://jackswim3411.hatenablog.com/entry/2019/06/14/045254)
- 2019-12-12 : [tslintから@typescript-eslintに変更する](https://jackswim3411.hatenablog.com/entry/2019/12/12/105247)
- 2020-01-13 : [gulpfile.jsからgulpfile.tsに変更する](https://jackswim3411.hatenablog.com/entry/2020/01/13/232218)
- 2020-02-09 : [npmアップデート手順・アップデートを行ってみて](https://jackswim3411.hatenablog.com/entry/2020/02/09/155530)
- 2020-02-28 : [pug-lintを触ってみる](https://jackswim3411.hatenablog.com/entry/2020/02/28/110000)
- 2020-05-24 : [Gulpで動いている既存のプロジェクトをWebpackのみに変更する](https://jackswim3411.hatenablog.com/entry/2020/05/24/074447)
- 2020-07-19 : [webpackでjsのオプション・配置場所をカスタマイズする](https://jackswim3411.hatenablog.com/entry/2020/07/19/023725)
- 2020-08-30 : [pugを使用して、imageを管理する](https://jackswim3411.hatenablog.com/entry/2020/08/30/003725)
- 2021-08-07 : [stylesからdart-sassに変更した時に行なったこと・コード](https://jackswim3411.hatenablog.com/entry/2021/08/07/172638)
- 2021-12-24 : [dart-sassの@importの記載を@use, @forwordに置き換えをした時に行ったこと](https://jackswim3411.hatenablog.com/entry/2021/12/24/081645)

## 開発時によく使うサイト

- [html: HTMLタグの入れ子検証](https://caninclude.glitch.me/)
- [html: ダミー画像の生成](https://placehold.jp/)
- [css: flexboxチートシート](https://www.webcreatorbox.com/tech/css-flexbox-cheat-sheet)
- [css: イージングチートシート](https://easings.net/ja)
- [css: CSS三角形作成ツール](http://apps.eky.hk/css-triangle-generator/ja)
- [scss: Playground](https://www.sassmeister.com/)
- [js: JavaScriptのスマートな配列操作テクニック](https://ics.media/entry/200825/)
- [ts: TypeScirpt Playground](https://www.typescriptlang.org/play)