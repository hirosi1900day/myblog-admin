#!/bin/bash
# スクリプトを実行するシェルをbashとして指定

# エラーが発生した場合にスクリプトをすぐに停止させる
set -e

# Railsが生成するserver.pidファイルがあれば削除する
rm -f /app/tmp/pids/server.pid

rails db:create
rails db:migrate
rails assets:precompile

# RailsのDockerfileのCMDで渡されたコマンドを実行
exec "$@"