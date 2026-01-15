#!/bin/bash

echo "正在上傳檔案到 GitHub..."
echo ""

# 確保在正確的目錄
cd /Users/openrice/Desktop/123

# 檢查是否有變更
git add .

# 提交變更
git commit -m "更新檔案" 2>/dev/null || echo "沒有新變更"

# 上傳到 GitHub
echo "正在連接 GitHub..."
echo "如果需要輸入帳號密碼，請輸入："
echo "  Username: wuyongting"
echo "  Password: 你的 GitHub Personal Access Token"
echo ""
echo "如果沒有 Token，請前往：https://github.com/settings/tokens"
echo "點擊 'Generate new token (classic)'，勾選 'repo' 權限"
echo ""

git push -u origin main

echo ""
echo "完成！"

