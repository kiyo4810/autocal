#!/usr/bin/python3
"""
Native Messaging Host: Blog Dashboard Launcher
Chrome拡張からのメッセージを受け取り、ダッシュボードサーバーを起動する
"""

import sys
import json
import struct
import subprocess
import os

DASHBOARD_DIR = os.path.expanduser('~/100day_coding/autocal/dashboard')


def read_message():
    """Chrome Native Messaging プロトコル: 4バイト長 + JSON"""
    raw = sys.stdin.buffer.read(4)
    if len(raw) < 4:
        sys.exit(0)
    length = struct.unpack('<I', raw)[0]
    data = sys.stdin.buffer.read(length)
    return json.loads(data.decode('utf-8'))


def write_message(msg):
    """Chrome Native Messaging プロトコル: 4バイト長 + JSON"""
    encoded = json.dumps(msg).encode('utf-8')
    sys.stdout.buffer.write(struct.pack('<I', len(encoded)))
    sys.stdout.buffer.write(encoded)
    sys.stdout.buffer.flush()


def find_node():
    """node の実行パスを検索"""
    candidates = [
        '/opt/homebrew/bin/node',   # Apple Silicon Mac (Homebrew)
        '/usr/local/bin/node',       # Intel Mac (Homebrew)
        '/usr/bin/node',
    ]
    for p in candidates:
        if os.path.isfile(p):
            return p
    # PATH から探す
    try:
        result = subprocess.run(['which', 'node'], capture_output=True, text=True)
        if result.returncode == 0:
            return result.stdout.strip()
    except Exception:
        pass
    return 'node'  # フォールバック


def main():
    try:
        msg = read_message()

        if msg.get('action') == 'start':
            node = find_node()
            dashboard = os.path.expanduser(DASHBOARD_DIR)

            if not os.path.isdir(dashboard):
                write_message({'success': False, 'error': f'ディレクトリが見つかりません: {dashboard}'})
                return

            proc = subprocess.Popen(
                [node, 'server.js'],
                cwd=dashboard,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
                start_new_session=True,  # 拡張終了後もサーバーを継続
            )
            write_message({'success': True, 'pid': proc.pid})

        elif msg.get('action') == 'ping':
            write_message({'success': True, 'message': 'pong'})

        else:
            write_message({'success': False, 'error': f"不明なアクション: {msg.get('action')}"})

    except Exception as e:
        write_message({'success': False, 'error': str(e)})


if __name__ == '__main__':
    main()
