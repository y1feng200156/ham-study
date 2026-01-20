import { type ComponentType, type LazyExoticComponent, lazy } from "react";

// biome-ignore lint/suspicious/noExplicitAny: React requires ComponentType<any> for lazy loading compatibility
type AnyComponent = ComponentType<any>;

/**
 * 带有重试机制的 lazy 函数
 * @param importer - import() 函数
 * @param name - 组件名称（用于调试日志）
 */
export function lazyWithRetry<T extends AnyComponent>(
  importer: () => Promise<{ default: T }>,
  name = "Component",
): LazyExoticComponent<T> {
  return lazy(async () => {
    const retries = 3; // 重试 3 次
    const interval = 1500; // 间隔 1.5 秒

    for (let i = 0; i < retries; i++) {
      try {
        return await importer();
      } catch (error) {
        console.warn(
          `[${name}] Load failed, retrying... (${i + 1}/${retries})`,
        );
        // 最后一次失败，则抛出错误，交给第三道防线（ErrorBoundary）处理
        if (i === retries - 1) throw error;
        // 等待一段时间后重试
        await new Promise((resolve) => setTimeout(resolve, interval));
      }
    }
    // 理论上不会走到这里，但为了 TS 类型安全
    throw new Error(`Failed to load ${name} after retries`);
  });
}
