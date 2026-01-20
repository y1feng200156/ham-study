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
  // 如果任务已经在队列中，不用重复添加
  if (!jobQueue.includes(filePath)) {
    jobQueue.push(filePath);
  }

  // 防抖：重置计时器
  if (debounceTimer) clearTimeout(debounceTimer);

  // 延迟 500ms 后开始处理队列
  debounceTimer = setTimeout(() => {
    processQueue();
  }, 500);
}

// 3. 队列处理逻辑
async function processQueue() {
  if (isProcessing) return; // 如果正在处理，等它处理完会自动调用 processQueue
  if (jobQueue.length === 0) return; // 队列空了

  isProcessing = true;
  const currentFile = jobQueue.shift(); // 取出第一个任务

  try {
    await executeTranslation(currentFile);
  } catch (err) {
    console.error(`❌ Error processing ${currentFile}:`, err);
  } finally {
    isProcessing = false;
    // 继续处理下一个
    processQueue();
  }
}

// 4. 单个文件执行逻辑
async function executeTranslation(srcPath) {
  // 计算目标路径: app/locales/zh/xxx.ts -> app/locales/zh-HK/xxx.ts
  const destPath = srcPath.replace("/zh/", "/zh-HK/");
  const basename = path.basename(srcPath, path.extname(srcPath));

  console.log(`🚀 Translating: ${srcPath} -> ${destPath}`);

  try {
    const content = fs.readFileSync(srcPath, "utf-8");

    // 提取 export default { ... } 中的对象部分
    // 假设文件格式比较规范，包含 export default { ... }
    const startIndex = content.indexOf("export default");
    if (startIndex === -1) {
      throw new Error("Could not find 'export default' in source file");
    }

    // 找到 default 后的第一个 {
    const openBraceIndex = content.indexOf("{", startIndex);
    // 找到最后一个 }
    const closeBraceIndex = content.lastIndexOf("}");

    if (
      openBraceIndex === -1 ||
      closeBraceIndex === -1 ||
      closeBraceIndex <= openBraceIndex
    ) {
      throw new Error("Could not parse object literal from source file");
    }

    const objectLiteral = content.substring(
      openBraceIndex,
      closeBraceIndex + 1,
    );

    // --- 调用 API ---
    // 只翻译对象部分，保持代码结构纯净
    const convertedObject = await convertWithFanhuaji(objectLiteral);
    // ---------------

    // 构造新的文件内容 (对应用户的要求: satisfies typeof import(...))
    // 注意：这里我们假设不需要额外的头部 import，因为 typeof import(...) 是动态引入
    // 如果原文件有头部 import 且被对象内部引用了（比较少见），这里可能会有问题，但在当前 locales 场景下通常是纯数据
    const newContent = `export default ${convertedObject} satisfies typeof import("~/locales/zh/${basename}").default;\n`;

    // 确保目标目录存在
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    fs.writeFileSync(destPath, newContent);
    console.log(`✅ Saved: ${destPath}`);
  } catch (err) {
    throw err; // 抛出给 processQueue 处理
  }
}

// API 请求函数
async function convertWithFanhuaji(content) {
  // 生成 "视频号=影音號\n智能手机=智慧型手機" 这样的字符串
  const replaceStr = buildReplaceString(CUSTOM_DICT);

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

// 辅助函数
function buildReplaceString(dict) {
  return Object.entries(dict)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");
}
