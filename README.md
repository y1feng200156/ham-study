<div align="center">

# Ham Radio Study & Visualization
# 无线电学习与可视化

**Interactive 3D visualization platform for Amateur Radio (Ham) antenna patterns and physics.**
<br>
**业余无线电天线辐射图与物理原理的交互式 3D 可视化平台。**

[English](#-english) | [简体中文](#-简体中文)

</div>

<br>

<div id="english"></div>

## 📖 English

### Overview

An interactive, modern web application designed to help amateur radio (Ham Radio) enthusiasts visualize and understand antenna radiation patterns, wave propagation, and electromagnetic concepts through real-time 3D rendering.

### 🌟 Features

#### 📡 3D Antenna Visualizations
Explore accurate, interactive models of various antenna configurations:
- **Yagi-Uda**: Visualize beamforming and directional gain.
- **Quad Antenna**: Analyze the loop element structure and radiation.
- **Moxon Rectangle**: Study the compact directional wire antenna.
- **Inverted V & Positive V**: Compare dipole variations.
- **Ground Plane (GP)**: Understand vertical omnidirectional patterns.
- **End-Fed Half Wave (EFHW)**: Multi-band wire antenna visualization.
- **Long Wire**: Simple random length wire antenna analysis.
- **Windom (OCFD)**: Off-Center Fed Dipole pattern visualization.
- **HB9CV**: Two-element phased array with high gain.
- **Magnetic Loop**: Compact high-Q loop antenna.

#### 🧰 Tools
- **Yagi Calculator**: Design and optimize DL6WU style Yagi-Uda antennas.

#### 🌊 Wave Propagation & Physics
- **Polarization Demos**: Interactive scenes for Vertical, Horizontal, Circular, and Elliptical polarization.
- **Traveling Pulse**: Visualize how radio waves propagate through space.
- **Standing Waves**: Demonstrations of voltage and current distribution.

#### 🛠️ Technical Highlights
- **Real-time Rendering**: Powered by **Three.js** and **React Three Fiber** for smooth 60fps 3D visuals.
- **Responsive Design**: Mobile-first layout with optimized touch controls for 3D scenes.
- **Internationalization**: Full support for English and Chinese (Simplified).
- **SEO Optimized**: Server-Side Rendering (SSR) with dynamic Open Graph tags for rich social sharing.

### 🚀 Tech Stack

- **Framework**: [React Router v7](https://reactrouter.com/) (formerly Remix)
- **Runtime**: [Bun](https://bun.sh/)
- **Core**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui, Phosphor Icons
- **3D Engine**: Three.js, @react-three/fiber, @react-three/drei
- **Tooling**: Biome, Vite

### 📦 Getting Started

#### Prerequisites
- [Bun](https://bun.sh/) runtime installed.

#### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/ham-study.git

# Enter directory
cd ham-study

# Install dependencies
bun install
```

#### Development

```bash
# Start the dev server
bun dev
```

Visit `http://localhost:5173` to view the application.

### 🚢 Deployment

#### Docker

The project includes a Dockerfile for containerized deployment:

```bash
# Build the image
docker build -t ham-study .

# Run the container
docker run -p 3000:3000 ham-study
```

#### Direct-to-Node

Build for production and run the server:

```bash
bun run build
bun start
```

### 📄 License

MIT License

<div align="right">
    <a href="#ham-radio-study--visualization">⬆️ Back to Top</a>
</div>

---

<div id="chinese"></div>

## 📖 简体中文

### 项目简介 (Overview)

这是一个现代化的交互式 Web 应用程序，专为业余无线电 (Ham Radio) 爱好者设计。通过实时 3D 渲染，帮助用户直观地理解天线辐射图、电波传播以及电磁学相关的物理概念。

### 🌟 功能特性 (Features)

#### 📡 3D 天线可视化
探索各种常见天线的精确交互式模型：
- **八木天线 (Yagi-Uda)**: 可视化波束成形和定向增益。
- **方框天线 (Quad)**: 分析环形振子结构及其辐射特性。
- **Moxon 天线 (Moxon Rectangle)**: 学习这种紧凑型定向线天线。
- **倒 V 与 正 V 天线 (Inverted V & Positive V)**: 比较偶极天线的不同变体。
- **地网天线 (GP)**: 理解垂直极化的全向辐射图。
- **端馈半波天线 (EFHW)**: 多波段线天线可视化。
- **长线天线 (Long Wire)**: 随机长度线天线分析。
- **温顿天线 (Windom)**: 偏馈偶极天线辐射图可视化。
- **HB9CV 天线**: 高增益双振子相控阵。
- **磁环天线 (Magnetic Loop)**: 紧凑型高 Q 值环形天线。

#### 🧰 实用工具
- **八木天线计算器**: 设计和优化 DL6WU 风格的八木天线。

#### 🌊 电波传播与物理原理
- **极化演示**: 包含垂直、水平、圆极化和椭圆极化的交互场景。
- **行进脉冲**: 可视化无线电波在空间中的传播方式。
- **驻波演示**: 电压与电流分布的动态演示。

#### 🛠️ 技术亮点
- **实时渲染**: 基于 **Three.js** 和 **React Three Fiber**，提供流畅的 60fps 3D 视觉体验。
- **响应式设计**: 移动端优先的布局，针对触屏优化的 3D 场景控制。
- **国际化支持**: 完整支持英文和简体中文。
- **SEO 优化**: 服务端渲染 (SSR) 配合动态 Open Graph 标签，利于社交分享。

### 🚀 技术栈 (Tech Stack)

- **框架**: [React Router v7](https://reactrouter.com/) (前身是 Remix)
- **运行时**: [Bun](https://bun.sh/)
- **核心**: React 19, TypeScript
- **样式**: Tailwind CSS v4, shadcn/ui, Phosphor Icons
- **3D 引擎**: Three.js, @react-three/fiber, @react-three/drei
- **工具链**: Biome, Vite

### 📦 快速开始 (Getting Started)

#### 前置要求
- 已安装 [Bun](https://bun.sh/) 运行时。

#### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/your-username/ham-study.git

# 进入目录
cd ham-study

# 安装依赖
bun install
```

#### 开发模式

```bash
# 启动开发服务器
bun dev
```

访问 `http://localhost:5173` 查看应用。

### 🚢 部署 (Deployment)

#### Docker 部署

项目包含 Dockerfile，支持容器化部署：

```bash
# 构建镜像
docker build -t ham-study .

# 运行容器
docker run -p 3000:3000 ham-study
```

#### 直接 Node 运行

构建生产版本并运行服务器：

```bash
bun run build
bun start
```

### 📄 许可证 (License)

MIT License

<div align="right">
    <a href="#ham-radio-study--visualization">⬆️ 回到顶部</a>
</div>
