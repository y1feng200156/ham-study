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
      keywords:
        "垂直极化, 电场传播, 偶极子, 天线原理, vertical polarization, electric field",
    },
    horizontal: {
      title: "水平极化 (Horizontal Polarization)",
      description:
        "可视化水平极化天线的电场传播 (Electric Field Propagation)。",
      keywords:
        "水平极化, 电场传播, 偶极子, 天线原理, horizontal polarization, electric field",
    },
    circular: {
      title: "圆极化 (Circular Polarization)",
      description: "可视化电场矢量旋转的圆极化传播 (Circular Polarization)。",
      keywords:
        "圆极化, 旋转矢量, 卫星通信, circular polarization, rotating vector",
    },
    elliptical: {
      title: "椭圆极化 (Elliptical Polarization)",
      description: "极化的一般形式，介于线极化和圆极化之间。",
      keywords: "椭圆极化, 极化形式, elliptical polarization",
    },
    yagi: {
      title: "八木-宇田天线 (Yagi-Uda Antenna)",
      description: "著名的定向天线，由引向器、有源振子和反射器组成。",
      keywords:
        "八木天线, 定向天线, 引向器, 反射器, yagi-uda antenna, directional antenna",
    },
    invertedV: {
      title: "倒V天线 (Inverted V Antenna)",
      description: "架设简便的偶极子变种，中间高两端低。",
      keywords: "倒V天线, 偶极子变种, inverted v antenna, dipole variant",
    },
    gp: {
      title: "GP天线 (Ground Plane Antenna)",
      description: "垂直单极天线，带有水平或下倾的地网 (Radials)。",
      keywords: "GP天线, 垂直单极, 地网, ground plane antenna, monopole",
    },
    positiveV: {
      title: "正V天线 (Positive V Antenna)",
      description: "两臂向上翘起的偶极子，适合楼顶架设，更加安全紧凑。",
      keywords: "正V天线, 偶极子, 楼顶天线, positive v antenna",
    },
    quad: {
      title: "方框天线 (Quad Antenna)",
      description: "方形回路构成的定向天线，具有高增益和低底噪的特点。",
      keywords: "方框天线, 环形天线, 高增益, quad antenna, loop antenna",
    },
    moxon: {
      title: "莫克森天线 (Moxon Antenna)",
      description: "矩形紧凑型定向天线，拥有卓越的前后比和宽带宽。",
      keywords: "莫克森天线, 矩形天线, moxon antenna, rectangular antenna",
    },
    endFed: {
      title: "端馈半波天线 (End-Fed Half Wave)",
      description: "多波段便携天线，使用49:1阻抗变换器，一端馈电。",
      keywords: "端馈天线, 半波天线, EFHW, end-fed half wave",
    },
  },

  tools: {
    yagiCalculator: {
      title: "八木天线计算器 (Yagi Calculator)",
      description:
        "基于 DL6WU 长动臂设计模型 & VK5DJ 修正算法的八木天线设计工具。",
      keywords:
        "八木计算器, 天线设计, DL6WU, VK5DJ, yagi calculator, antenna design",
    },
  },

  footer: {
    feedback: {
      title: "有想法或建议？",
      subtitle: "欢迎随时反馈，帮助改进这个项目",
      emailTitle: "发送邮件给 ham@charlesify.com",
      githubTitle: "View on GitHub",
    },
    copyright: "© {{year}} BG8ROM. All rights reserved.",
    credits: "特别感谢",
  },

  meta: {
    siteName: "业余无线电可视化",
    keywords:
      "业余无线电, 天线演示, 3D可视化, 垂直极化, 水平极化, 圆极化, 八木天线, GP天线, 倒V天线, 正V天线, 方框天线, 莫克森天线, ham radio demos, antenna visualization",
    home: {
      title: "业余无线电可视化",
      description:
        "业余无线电天线可视化合集：包含垂直/水平/圆极化、八木、倒V、GP、正V、方框、莫克森等经典天线的3D极化与辐射演示。",
      keywords:
        "业余无线电, 天线演示, 3D可视化, 垂直极化, 水平极化, 圆极化, 八木天线, GP天线, 倒V天线, 正V天线, 方框天线, 莫克森天线, ham radio demos, antenna visualization",
    },
  },
} satisfies ResourceLanguage["common"];
