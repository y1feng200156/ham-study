# PROJECT_STATUS.md

## ⚙️ Project Governance

### Governance Mode

**Current Mode**: `Hybrid` ✅

**Mode Definitions**:

- **Frozen**: 严格保持现有依赖版本,不做任何升级
- **Hybrid** ✅ (当前): 新文件使用现代标准,修改旧文件时保持原有风格
- **Aggressive**: 主动提议现代化重构和依赖升级

**Selection Date**: 2026-02-09  
**Selected By**: User (Manual Selection)

---

## 📋 Architectural Decision Records (ADR)

### ADR-003: 八木计算器分离线径与动臂修正

- **Date**: 2026-10-08
- **Status**: Accepted
- **Decision**: 在现有分层结构内，先按逐元自由空间长度计算振子线径影响，再加入独立的动臂修正；Rust/WASM 与 JS 后备路径使用相同规则，界面只展示计算结果与匹配提示。
- **Rationale**: 保持默认 4 mm 切割尺寸兼容，避免把玻璃钢动臂当成辐射振子，也避免界面给出未经计算的固定馈点阻抗。

### ADR-001: 初始化治理模式为 Hybrid

- **Date**: 2026-02-09
- **Status**: Accepted
- **Context**: 项目首次初始化,需要选择治理模式
- **Decision**: 选择 Hybrid 模式作为默认治理策略
- **Rationale**:
  - 平衡稳定性和创新性
  - 新代码使用现代最佳实践
  - 修改现有代码时保持原有风格
  - 适合大多数项目场景
- **Consequences**:
  - AI 在创建新文件时会使用现代标准
  - AI 在修改现有文件时会保持原有代码风格
  - 仅在明显有问题时才会建议重构

### ADR-002: 实现治理模式选择机制

- **Date**: 2026-02-09
- **Status**: Completed
- **Context**: README 承诺首次运行时会提示用户选择治理模式,但 setup 脚本未实现此功能
- **Decision**:
  1. 增强 setup.bat 和 setup.sh,添加交互式治理模式选择
  2. 默认推荐 Hybrid 模式,但必须让用户主动选择
  3. ResetAG 脚本已引导用户运行 setup 脚本
- **Implementation**:
  - setup.sh: 修复了函数定义顺序问题,确保 create_status 在调用前定义
  - setup.bat: 子程序定义顺序正确,无需修改
  - 两者都支持三种治理模式选择 (Frozen/Hybrid/Aggressive)
- **Rationale**:
  - 提升用户体验,避免用户困惑
  - 确保文档与实现一致
  - 给用户明确的选择权
- **Consequences**:
  - 首次运行 setup 脚本时会提示用户选择模式
  - ResetAG 后会引导用户重新运行 setup
  - 用户可以随时通过编辑此文件或重新运行 setup 来更改模式

---

## 📝 Last Task Summary

**Task**: 八木计算器线径、匹配提示与玻璃钢动臂修复
**Date**: 2026-10-08
**Status**: 本地验证通过，待部署
**Summary**:

- ✅ 反射器及各引向器随振子直径改变，并保持默认 4 mm 切割基线
- ✅ 玻璃钢动臂不再产生负增益或金属动臂修正
- ✅ 折合与直立振子显示实测匹配提示，折合模式禁用不参与计算的馈电间隙输入
- ✅ Rust、编译后 WASM、JS 后备计算、TypeScript、生产构建及 Chromium 页面回归均通过
