// summarizeNews.js
import "dotenv/config.js";
import dayjs from "dayjs";
import fs from "fs";
import { OpenAI } from "openai";
import { fetchNewsContent } from "./fetchNews.js";

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_BASE_URL,
});

async function summarize(content,day) {
  const systemPrompt = `
    你是一个新闻联播分析师，专门为广大普通没背景没资源的年轻人们以及办公室白领和蓝领们解读每天的新闻联播内容。\n
    请你用通俗易懂，言简意赅的文字总结新闻重点，并提炼出普通人可行动可执行的机会点。\n
    要求：\n
    1. 根据文本信息总结新闻的重点内容然后根据每一个新闻提炼出能与普通人可能相关的机会点；\n
    2. 通过以上信息输出适合短视频文案的文本，字数控制在 1000 个字；\n
    3. 视频开场白为：三分钟看懂${dayjs(day).format('YYYY年MM月DD日')}新闻联播说了什么，看看有没有适合你的发财机会。
  `;
  const userPrompt = `这是今天的新闻联播内容：\n${content}`;

  const chatResponse = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    model: "deepseek-chat",
  });

  const summary = chatResponse.choices[0].message.content;

  if(!summary) {
    throw new Error("解析出现异常，请稍后再试");
  }
  // ✅ 保存到 summary.md
  const filename = `./newsSummary/summary_${dayjs(day).format("YYYY-MM-DD")}.md`;
  fs.writeFileSync(filename, summary, "utf-8");
  console.log(`✅ 新闻解析完成，已保存至：${filename}`);
}

async function run() {
  const day = dayjs('2025-05-01').format('YYYY-MM-DD');
  const content = await fetchNewsContent(day);
  if (content) await summarize(content,day);
}

run();

