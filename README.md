# 新闻联播文稿分析工具

一个自动抓取新闻联播文稿并通过 AI 进行智能分析的工具。

## 功能特性

- 自动抓取每日新闻联播文稿
- 使用 deepseek API 进行智能分析
- 生成新闻重点内容摘要
- 提供关键词提取和主题分类

## 安装

1. 克隆项目
```bash
git clone [项目地址]
cd newsBroadcast
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
```bash
cp .env.example .env
# 编辑 .env 文件，填入你的 deepseek API key
```

## 使用方法

启动程序：
```bash
npm run start
```

## 配置说明

在 `.env` 文件中配置以下参数：
- `DEEPSEEK_API_KEY`: 你的 deepseek API 密钥
- `NEWS_SOURCE_URL`: deepseek 地址

## 输出结果

分析结果将保存在 `output` 目录下，包含：
- 文稿原文
- AI 分析报告
- 关键词统计
- 主题分类结果

## License

MIT