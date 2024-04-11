# ベースイメージとしてrubyのバージョン3.1.2を使用
FROM ruby:3.1.2

# nodejs、npm、vimをインストールし、必要ない一時ファイルを削除、yarnをグローバルにインストール
RUN apt-get update -qq \
  && apt-get install -y nodejs npm vim\
  && rm -rf /var/lib/apt/lists/* \
  && npm install --global yarn

# コンテナ内で作業するディレクトリ（フォルダ）を指定
WORKDIR /app

# ローカルのGemfileとGemfile.lockをコンテナ内の指定ディレクトリにコピー
COPY Gemfile /app/Gemfile
# ローカルのGemfile.lockをコンテナにコピーして、依存関係の一貫性を保証
COPY Gemfile.lock /app/Gemfile.lock

# Gemfileに記載された依存関係をインストール
RUN bundle install

# コンテナ起動時に実行するスクリプトをコンテナ内の/usr/bin/にコピー
COPY entrypoint.sh /usr/bin/
# コンテナ内のentrypoint.shスクリプトに実行権限を付与
RUN chmod +x /usr/bin/entrypoint.sh

# コンテナ起動時にentrypoint.shスクリプトを実行
ENTRYPOINT ["entrypoint.sh"]

# コンテナが起動するときに実行するデフォルトコマンドを設定（Railsサーバーを起動）
CMD ["rails", "server", "-b", "0.0.0.0"]