// scripts/start-release.js
import { execSync } from "node:child_process";
import { createInterface } from "node:readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter release version (e.g., 1.2.0): ", (version) => {
  if (!version) {
    console.error("Version is required!");
    process.exit(1);
  }

  // 去掉可能输入的 'v' 前缀
  const cleanVersion = version.replace(/^v/, "");

  try {
    console.log(`\n🚀 Starting Git Flow Release v${cleanVersion}...`);

    // 1. 执行 git flow
    execSync(`git flow release start v${cleanVersion}`, { stdio: "inherit" });

    console.log(`\n📦 Updating package.json to ${cleanVersion}...`);

    // 2. 执行 npm version
    execSync(`npm version ${cleanVersion} --no-git-tag-version`, {
      stdio: "inherit",
    });

    console.log("\n✅ Release branch started and version updated!");
    console.log("Don't forget to commit the package.json change:");
    console.log(`git commit -am "chore: bump version to ${cleanVersion}"`);
  } catch (_error) {
    console.error("Failed to start release.");
  } finally {
    rl.close();
  }
});
