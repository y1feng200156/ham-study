import fs from "node:fs";
import path from "node:path";
import chokidar from "chokidar";

const FILES_TO_WATCH = [
  "./app/locales/zh/common.ts",
  "./app/locales/zh/demos.ts",
  "./app/locales/zh/scene.ts",
];

// 1. 定义你的自定义词典 (简体 -> 香港繁体)
const CUSTOM_DICT = {
  视频号: "影音號",
};

// 状态标志
let isProcessing = false; // 是否正在转换中
const jobQueue = []; // 任务队列 [filePath1, filePath2, ...]
let debounceTimer = null; // 防抖计时器

console.log(`👁️  Watching files for Fanhuaji translation:`);
for (const f of FILES_TO_WATCH) {
  console.log(`  - ${f}`);
}

// 1. 初始化监听器
chokidar
  .watch(FILES_TO_WATCH, {
    persistent: true,
    ignoreInitial: true, // 启动时不立刻执行，只监听后续变化
    awaitWriteFinish: {
      stabilityThreshold: 500, // 等待文件写入稳定
      pollInterval: 100,
    },
  })
  .on("all", (event, filePath) => {
    console.log(`📝 File changed: ${filePath}`);
    triggerTranslation(filePath);
  });

// 2. 调度逻辑 (带防抖的队列)
function triggerTranslation(filePath) {
  if (!jobQueue.includes(filePath)) {
    jobQueue.push(filePath);
  }
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    processQueue();
  }, 500);
}

// 3. 队列处理逻辑
async function processQueue() {
  if (isProcessing) return;
  if (jobQueue.length === 0) return;

  isProcessing = true;
  const currentFile = jobQueue.shift();

  try {
    await executeTranslation(currentFile);
  } catch (err) {
    console.error(`❌ Error processing ${currentFile}:`, err);
  } finally {
    isProcessing = false;
    processQueue();
  }
}

// 4. 单个文件执行逻辑
async function executeTranslation(srcPath) {
  const destPath = srcPath.replace("/zh/", "/zh-HK/");
  const basename = path.basename(srcPath, path.extname(srcPath));

  console.log(`🚀 Translating: ${srcPath} -> ${destPath}`);

  try {
    const content = fs.readFileSync(srcPath, "utf-8");

    // 动态构建替换字典
    const fileSpecificDict = { ...CUSTOM_DICT };

    // 1. 针对 common.ts 的 import 移除
    // 如果文件中包含该 import，则替换为空
    const importStr = 'import type { ResourceLanguage } from "i18next";';
    if (content.includes(importStr)) {
      fileSpecificDict[importStr] = "";
    }

    // 2. 针对 satisfies 的处理
    // 能够处理常见的几种 satisfies 结尾
    // 注意：如果有其他形式，需要在这里添加
    const knownSatisfies = [
      `} satisfies ResourceLanguage["common"];`,
      `} satisfies Record<string, unknown>;`,
    ];

    for (const s of knownSatisfies) {
      if (content.includes(s)) {
        // 关键点：将原始的 satisfies 替换为带动态 basename 的格式
        fileSpecificDict[s] =
          `} satisfies typeof import("~/locales/zh/${basename}").default;`;
      }
    }

    // 调用 API，传入特定字典
    // 这里使用 PreReplace，意味着这些替换会在繁化姬处理“转换”之前就执行
    // 这样 'import ...' 就会被删掉，'satisfies ...' 会变成最终的代码
    // 繁化姬通常不会去翻译看起来像代码的英文，所以这样是安全的
    const convertedText = await convertWithFanhuaji(content, fileSpecificDict);

    // 简单清理多余空行（Fanhuaji 有时会因为移除内容留下空行）
    const finalContent = convertedText.replace(/^\s*[\r\n]/gm, "");

    // 确保目录存在并写入
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    fs.writeFileSync(destPath, finalContent);
    console.log(`✅ Saved: ${destPath}`);
  } catch (err) {
    throw err;
  }
}

// API 请求函数
async function convertWithFanhuaji(content, replaceDict) {
  if (!content) return "";

  // 构建替换字符串 "A=B\nC=D"
  const replaceStr = Object.entries(replaceDict)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  const response = await fetch("https://api.zhconvert.org/convert", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: content,
      converter: "Hongkong",
      userPreReplace: replaceStr,
    }),
  });
  if (!response.ok) throw new Error(`API ${response.status}`);
  const data = await response.json();
  if (data.code !== 0) throw new Error(data.msg);
  return data.data.text;
}
