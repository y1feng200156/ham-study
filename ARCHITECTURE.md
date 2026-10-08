# 架构索引

本项目采用分层的 React 前端与 Rust/WASM 计算结构。八木计算器的输入由 `app/routes/tools/yagi-calculator.tsx` 组装，`app/lib/yagi-calc.ts` 调用 WASM，失败时使用同文件的 JS 后备计算；结果组件只呈现设计数据。

八木长度计算先按自由空间基线处理振子直径，再独立加入动臂修正。Rust/WASM 与 JS 后备路径必须保持相同的输入语义和公式。界面提示从 `app/locales/` 读取，不参与尺寸计算；当前模型不计算馈点阻抗、驻波比或实际增益。
