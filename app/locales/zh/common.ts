import type { ResourceLanguage } from "i18next";

export default {
  title: "业余无线电可视化",
  description:
    "欢迎来到业余无线电可视化实验室。这里汇集了各种经典天线和电磁波极化的 3D 仿真演示。通过交互式的 3D 场景，您可以直观地探索天线原理与电波传播特性，深入理解无线电通信背后的物理机制。",

  nav: {
    home: "首页",
    back: "返回",
  },

  actions: {
    viewDemo: "查看演示",
    openTool: "打开工具",
    github: "GitHub 仓库",
  },

  sections: {
    tools: "实用工具",
  },

  demos: {
    vertical: {
      title: "垂直极化 (Vertical Polarization)",
      description:
        "可视化垂直极化天线的电场传播 (Electric Field Propagation)。",
    },
    horizontal: {
      title: "水平极化 (Horizontal Polarization)",
      description:
        "可视化水平极化天线的电场传播 (Electric Field Propagation)。",
    },
    circular: {
      title: "圆极化 (Circular Polarization)",
      description: "可视化电场矢量旋转的圆极化传播 (Circular Polarization)。",
    },
    elliptical: {
      title: "椭圆极化 (Elliptical Polarization)",
      description: "极化的一般形式，介于线极化和圆极化之间。",
    },
    yagi: {
      title: "八木-宇田天线 (Yagi-Uda Antenna)",
      description: "著名的定向天线，由引向器、有源振子和反射器组成。",
    },
    invertedV: {
      title: "倒V天线 (Inverted V Antenna)",
      description: "架设简便的偶极子变种，中间高两端低。",
    },
    gp: {
      title: "GP天线 (Ground Plane Antenna)",
      description: "垂直单极天线，带有水平或下倾的地网 (Radials)。",
    },
    positiveV: {
      title: "正V天线 (Positive V Antenna)",
      description: "两臂向上翘起的偶极子，适合楼顶架设，更加安全紧凑。",
    },
    quad: {
      title: "方框天线 (Quad Antenna)",
      description: "方形回路构成的定向天线，具有高增益和低底噪的特点。",
    },
    moxon: {
      title: "莫克森天线 (Moxon Antenna)",
      description: "矩形紧凑型定向天线，拥有卓越的前后比和宽带宽。",
    },
    endFed: {
      title: "端馈半波天线 (End-Fed Half Wave)",
      description: "多波段便携天线，使用49:1阻抗变换器，一端馈电。",
    },
  },

  tools: {
    yagiCalculator: {
      title: "八木天线计算器 (Yagi Calculator)",
      description:
        "基于 DL6WU 长动臂设计模型 & VK5DJ 修正算法的八木天线设计工具。",
    },
  },

  meta: {
    siteName: "业余无线电可视化",
    keywords:
      "业余无线电, 天线演示, 3D可视化, 垂直极化, 水平极化, 圆极化, 八木天线, GP天线, 倒V天线, 正V天线, 方框天线, 莫克森天线, ham radio demos, antenna visualization",
  },
} satisfies ResourceLanguage["common"];
