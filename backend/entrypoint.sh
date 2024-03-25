#!/bin/bash
# スクリプトを実行するシェルをbashとして指定

# エラーが発生した場合にスクリプトをすぐに停止させる
set -e

# Railsが生成するserver.pidファイルがあれば削除する
rm -f /app/tmp/pids/server.pid

# RailsのDockerfileのCMDで渡されたコマンドを実行
exec "$@"