#!/bin/bash

# 检查是否提供了自定义的提交信息
if [ -z "$1" ]; then
    echo "错误：请提供一个提交信息作为参数。"
    echo "用法: $0 \"您的提交信息\""
    exit 1
fi

# 自定义的提交信息
COMMIT_MESSAGE="$1"

# 将当前目录下的所有文件添加到Git的暂存区
git add .

# 使用提供的提交信息提交更改
git commit -m "$COMMIT_MESSAGE"

# 推送到远程仓库的master分支
# 请确保您的远程仓库的master分支存在，并且您的本地分支已经设置了正确的上游分支
git push origin main

# 提示成功信息
echo "提交并推送成功，提交信息为: $COMMIT_MESSAGE"