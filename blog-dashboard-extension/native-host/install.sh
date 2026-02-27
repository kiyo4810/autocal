#!/bin/bash
# ============================================================
#  Blog Dashboard Launcher — Native Messaging Host インストーラ
# ============================================================
set -e

EXTENSION_ID="$1"

if [ -z "$EXTENSION_ID" ]; then
  echo ""
  echo "使い方:"
  echo "  ./install.sh <拡張機能ID>"
  echo ""
  echo "拡張機能IDの確認手順:"
  echo "  1. Chrome で chrome://extensions を開く"
  echo "  2. 右上の「デベロッパーモード」をONにする"
  echo "  3. 「パッケージ化されていない拡張機能を読み込む」をクリック"
  echo "     → blog-dashboard-extension フォルダを選択"
  echo "  4. 表示された ID（例: abcdefghijklmnopqrstuvwxyz123456）をコピー"
  echo "  5. ./install.sh そのID を再実行"
  echo ""
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
HOST_SCRIPT="$SCRIPT_DIR/blog_dashboard_launcher.py"

# Python3 の実行パスを取得してシェバンを更新
PYTHON3=$(command -v python3 2>/dev/null || echo "/usr/bin/python3")
echo "▶ Python3: $PYTHON3"

# シェバンを絶対パスに書き換え（Chrome はフルパスが必要な場合がある）
sed -i '' "1s|.*|#!$PYTHON3|" "$HOST_SCRIPT"
chmod +x "$HOST_SCRIPT"

# Native Messaging Host マニフェストを配置
HOSTS_DIR="$HOME/Library/Application Support/Google/Chrome/NativeMessagingHosts"
mkdir -p "$HOSTS_DIR"

cat > "$HOSTS_DIR/com.blogdashboard.launcher.json" << EOF
{
  "name": "com.blogdashboard.launcher",
  "description": "Blog Dashboard Launcher",
  "path": "$HOST_SCRIPT",
  "type": "stdio",
  "allowed_origins": [
    "chrome-extension://$EXTENSION_ID/"
  ]
}
EOF

echo ""
echo "✅ インストール完了！"
echo "   マニフェスト: $HOSTS_DIR/com.blogdashboard.launcher.json"
echo "   スクリプト  : $HOST_SCRIPT"
echo "   許可した拡張機能ID: $EXTENSION_ID"
echo ""
echo "→ Chrome を再起動して、拡張機能アイコンをクリックしてください 🚀"
echo ""
