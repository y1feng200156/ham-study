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

  demoCards: {
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
    dipoleAntenna: {
      title: "偶极子天线 (Dipole Antenna)",
      description: "最基础的天线类型。直观展示驻波原理与辐射方向图。",
      keywords: "偶极子天线, 半波偶极子, 驻波",
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
    longWireAntenna: {
      title: "长线天线 (Long Wire Antenna)",
      description: "3D演示长线天线的多瓣辐射特性，展示长度与方向性的关系。",
      keywords:
        "长线天线, Long Wire Antenna, 随机线天线, random wire, 多瓣方向图",
    },
    windomAntenna: {
      title: "温顿天线 (Windom Antenna)",
      description: "3D演示温顿天线(OCFD)的偏馈结构与多波段特性。",
      keywords: "温顿天线, Windom antenna, OCFD, 偏馈偶极子",
    },
    hb9cv: {
      title: "HB9CV 天线",
      description:
        "HB9CV 设计的一种 2 单元相控阵列天线，具有高增益和高前后比。",
      keywords: "HB9CV 天线, 相控阵列, 定向天线, 业余无线电",
    },
    magneticLoopAntenna: {
      title: "磁环天线 (Magnetic Loop)",
      description:
        "小环天线（磁偶极子）3D演示。直观展示其深零点抗干扰和高Q特性。",
      keywords: "磁环天线, 小环天线, 磁偶极子, 天线可视化",
    },
    electromagneticPropagation: {
      title: "电磁波传播 (Electromagnetic Propagation)",
      description:
        "3D演示电磁波在不同频段（HF/UV）的传播特性，展示地波、天波及电离层反射原理。",
      keywords:
        "电磁波传播, 地波, 天波, 电离层反射, electromagnetic propagation",
    },
  },

  tools: {
    yagiCalculator: {
      title: "八木天线计算器 (Yagi Calculator)",
      description:
        "基于 DL6WU 长动臂设计模型 & VK5DJ 修正算法的八木天线设计工具。",
      keywords:
        "八木计算器, 天线设计, DL6WU, VK5DJ, yagi calculator, antenna design",
      ui: {
        title: "八木天线计算器",
        subtitle: "DL6WU 工程工具",
        quickMode: "快速模式",
        proMode: "专业工程模式",
        blueprintPreview: "设计蓝图预览 (Blueprint Preview)",
        imgDownload: "保存图纸+表格",
        downloadError: "无法获取图纸数据，请刷新页面重试。",
        downloading: "正在下载...",
        downloadFail: "图片生成失败，请稍后重试",
        downloadUnknownError: "下载过程中发生未知错误，详情请查看控制台。",
        copySuccess: "数据已复制到剪贴板！",
        boomCorrectionApplied: "物理修正已应用",
        boomCorrectionDetails:
          "基于 B/d={{ratio}} 和 k={{kFactor}}. 所有振子已延长",
      },
      specs: {
        title: "基础规格 (Basic Specs)",
        frequency: "中心频率 (Frequency)",
        elements: "单元数量 (Elements)",
      },
      quick: {
        title: "场景预设",
        label: "动臂材质类型",
        presets: {
          metal_bonded: "金属管 - 振子穿过并接触 (最常见)",
          metal_insulated: "金属管 - 振子绝缘安装",
          pvc: "PVC/PPR管 - 非金属",
        },
        note: "* 默认设置: 4mm 振子, 20mm 动臂, 折合振子, DL6WU 间距。",
      },
      pro: {
        title: "工程参数设置",
        section1: "1. 动臂修正 (Boom Correction)",
        section2: "2. 主振子 (Driven Element)",
        section3: "3. 间距策略 (Spacing)",
        boomShape: "动臂截面",
        shapes: {
          round: "圆管 (Round)",
          square: "方管 (Square)",
        },
        elementDia: "振子直径 (d)",
        elementDiaTooltip: {
          title: "直径效应 (K Factor)",
          content: "振子越粗，等效电气长度越长。物理切割时需缩短以补偿。",
        },
        boomDia: "动臂直径 (B)",
        boomDiaTooltip: {
          title: "动臂短路效应",
          content: "金属动臂相当于寄生电感，会“缩短”穿过它的振子的电气长度。",
        },
        mount: "安装结构",
        mountTooltip: {
          title: "修正系数参考 (k)",
          item1: "非金属: k ≈ 0",
          item2: "上方架设: k ≈ 0.05 (影响小)",
          item3: "穿孔接触: k = 动态计算 (0.6~0.8)",
        },
        mountMethods: {
          bonded: "Bonded (穿过金属管且接触)",
          insulated: "Insulated (穿过金属管但绝缘)",
          above: "Above (架在金属管上方)",
          none: "None (非金属动臂)",
        },
        bcFactor: "计算修正系数 (BC Factor)",
        bcFactorTooltip: {
          title: "修正系数 k",
          content: "DL6WU 曲线依据 B/d 比值动态计算。最终物理增加长度 = B × k",
        },
        autoCalcNote:
          "* 系统根据 DL6WU 曲线自动计算 k 值，您也可手动修改右侧数值。",
        deType: "类型",
        deTypeTooltip: {
          title: "阻抗特性",
          item1: "Folded: ~288Ω (需4:1巴伦)",
          item2: "Straight: ~72Ω (可直接馈电)",
        },
        deTypes: {
          folded: "折合振子 (Folded)",
          straight: "直立振子 (Straight)",
        },
        feedGap: "馈电间隙 (Gap)",
        feedGapTooltip: {
          title: "物理切割",
          content: "直立偶极子的切割长度需减去此间隙。CutLen = TotalLen - Gap",
        },
        algo: "算法选择",
        algoTooltip: {
          title: "DL6WU Tapering",
          content:
            "引向器间距从 0.075λ 逐渐增大到 0.30λ，以在保证带宽的同时最大化前方增益。",
        },
        algos: {
          dl6wu: "DL6WU 标准渐变 (推荐)",
          uniform: "Uniform 等间距 (自定义)",
        },
        fixedSpacing: "固定间距值 (λ)",
      },
      results: {
        title: "切割尺寸表 (Cut List)",
        tolerance: "公差 ±0.5mm",
        copy: "复制数据",
        headers: {
          element: "单元 (Element)",
          pos: "位置 (Pos)",
          space: "间距 (Space)",
          half: "半长 (Half)",
          cut: "切割长 (Cut)",
          note: "备注 (Note)",
        },
        notes: {
          folded: "折合振子",
          gap: "间隙: {{val}}mm",
          foldedLoop: "Folded Loop",
          gapEn: "Gap: {{val}}mm",
        },
        totalBoom: "总臂长: {{val}} mm",
        estGain: "预估增益",
        estGainTooltip: "预估公式: (单元数 × 1.2) + 2.15 dBi",
        generatedBy: "Generated by Yagi Calc Pro | {{date}}",
        downloadFileName: "yagi_design_{{freq}}MHz.png",
      },
    },
    moxonCalculator: {
      title: "莫克森天线计算器 (Moxon Calculator)",
      description: "基于 AC6LA / MoxGen 算法的 3D 莫克森天线设计工具。",
      keywords: "莫克森计算器, Moxon, MoxGen, 天线设计, AC6LA",
      algorithm: "AC6LA / MoxGen 算法",
      specs: {
        title: "基础参数",
        subtitle: "Frequency & Wire",
        freqLabel: "中心频率 (MHz)",
        diaLabel: "线材直径 (mm)",
        typicalFreq: "典型值: 144.100, 435.000, 28.500",
        typicalDia: "典型值: 2mm ~ 6mm",
        introTitle: "什么是 Moxon 天线?",
        introDesc:
          "Moxon Rectangle 是由 Les Moxon (G6XN) 推广的双单元线束天线。它是一个折叠的八木天线，具有矩形形状。优点包括出色的前后比 (F/B ratio) 和紧凑的尺寸（约为全尺寸八木的 70%）。它通常具有 50Ω 的直接馈电阻抗，无需复杂的匹配网络。",
      },
      results: {
        title: "尺寸数据表 (Dimensions List)",
        copy: "复制数据",
        copied: "数据已复制到剪贴板！",
        headers: {
          id: "代号 (ID)",
          desc: "说明 (Description)",
          len: "长度 (mm)",
          wl: "波长系数 (λ)",
        },
        rows: {
          A: "驱动单元宽度 (Driven Width)",
          B: "驱动单元折弯 (Driven Tail)",
          C: "单元间隙 (Gap)",
          D: "反射单元折弯 (Reflector Tail)",
          E: "总深度 (Total Depth)",
          wireDriven: "驱动单元总线长",
          wireRef: "反射单元总线长",
        },
      },
      blueprint: {
        title: "设计蓝图预览 (Blueprint Preview)",
        download: "保存图纸",
        feed: "馈电点",
      },
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
        "业余无线电天线可视化合集：包含垂直/水平/圆极化、八木、倒V、GP、正V、方框、莫克森、端馈半波、长线、温顿、HB9CV、磁环等经典天线的3D极化与辐射演示。",
      keywords:
        "业余无线电, 天线演示, 3D可视化, 垂直极化, 水平极化, 圆极化, 八木天线, GP天线, 倒V天线, 正V天线, 方框天线, 莫克森天线, 端馈天线, 长线天线, 温顿天线, HB9CV, 磁环天线, ham radio demos, antenna visualization",
    },
  },
} satisfies ResourceLanguage["common"];
