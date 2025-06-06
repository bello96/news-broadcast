// fetchNews.js
import axios from "axios";
import * as cheerio from "cheerio";
import dayjs from "dayjs";
import fs from "fs";
import { fileURLToPath } from "url";

async function fetchNewsContent(day) {
  try {
    const date = dayjs(day);
    const url = `http://mrxwlb.com/${date.format("YYYY/MM/DD")}/${date.format(
      "YYYY年MM月DD日"
    )}新闻联播文字版`;
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);
    const header = $(".entry-header")
      .text()
      .replace(/\n\s*\n/g, "\n")
      .trim();
    const content = $(".entry-content")
      .text()
      .replace(/\n\s*\n/g, "\n")
      .trim();
    const message = `${header} \n ${content}`;
    if (!message) {
      throw new Error("没有抓取到内容，请检查页面结构是否变动。");
    }
    const filename = `./newsContent/content_${date.format("YYYY-MM-DD")}.txt`;
    fs.writeFileSync(filename, message, "utf-8");
    console.log(`✅ 新闻抓取完成，已保存至：${filename}`);
    return message;
  } catch (err) {
    console.error("❌ 抓取失败:", err.message);
  }
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  const day = dayjs().subtract(1, "day").format("YYYY-MM-DD");
  fetchNewsContent(day); // 仅在直接运行该文件时执行
}

export { fetchNewsContent };
