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
        boomCorrectionDetails: "基于 B/d={{ratio}} 和 k={{k}}，所有振子已延长",
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
          content:
            "线径变化会按各振子的长度分别估算切割修正；组装后仍需实测调谐。",
        },
        boomDia: "动臂直径 (B)",
        boomDiaTooltip: {
          title: "动臂短路效应",
          content: "金属动臂相当于寄生电感，会“缩短”穿过它的振子的电气长度。",
        },
        mount: "安装结构",
        material: "动臂材质",
        materialTooltip: {
          title: "动臂材质与修正",
          content:
            "此项只描述动臂，不是辐射振子材质。玻璃钢动臂不使用金属动臂修正。",
        },
        materials: {
          aluminum: "铝 (Aluminum) - 标准",
          copper: "铜 (Copper) - 高导电",
          stainless_steel: "不锈钢 (Stainless) - 高阻",
          fiberglass: "玻璃钢 (Fiberglass) - 绝缘",
        },
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
        nonMetalBoomNote: "玻璃钢动臂不使用金属动臂修正，k 固定为 0。",
        deType: "类型",
        deTypeTooltip: {
          title: "馈电与匹配",
          item1: "折合振子通常需要根据实测馈点阻抗选择变换方式。",
          item2: "直立振子也不能保证直接匹配 50 Ω 馈线。",
        },
        matching: {
          title: "馈电匹配提示",
          folded:
            "折合振子的馈点阻抗通常高于同尺寸开口偶极子；接 50 Ω 同轴前可能需要阻抗变换与平衡馈电。",
          straight:
            "开口偶极子在八木阵列中不保证匹配 50 Ω 同轴；可能需要匹配网络与共模抑制。",
          measure:
            "本工具未计算馈点阻抗或驻波比。请组装后用天线分析仪实测，再确定匹配方式。",
        },
        deTypes: {
          folded: "折合振子 (Folded)",
          straight: "直立振子 (Straight)",
        },
        feedGap: "馈电间隙 (Gap)",
        feedGapTooltip: {
          title: "物理切割",
          content:
            "此输入仅调整直立振子的切割长度；折合振子的馈电结构需单独设计并实测。",
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
        tolerance: "切割尺寸为起点，组装后请实测调谐。",
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
        estGainTooltip:
          "按单元数给出的粗估值；未仿真方向图，也未计算匹配或馈线损耗。",
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
    cw: {
      title: "CW 练习器 (CW Trainer)",
      description:
        "基于 Web Audio API 的莫尔斯电码练习器，支持即时解码与可视化。",
      keywords: "CW, 莫尔斯电码, 练习器, Morse Code, Trainer, 业余无线电",
      panel: {
        letters: "字母 (LETTERS)",
        numbers: "数字 (NUMBERS)",
        symbols: "符号 (SYMBOLS)",
        rx_log: "接收记录 (RX LOG)",
        speed: "速度",
        clear: "清空",
        morse_code_reference: "莫尔斯电码参考表",
        ref: "参考",
        training_mode: "训练模式",
        free_play: "自由练习",
        edit: "编辑",
        next: "下一个",
        custom_text: "自定义文本",
        custom_text_placeholder: "输入文本 (A-Z 0-9)...",
        cancel: "取消",
        confirm: "确认",
      },
      circuit_board_visualization: "莫尔斯电码电路板可视化",
      input_aria_label: "莫尔斯电码输入",
      control: {
        dit: "点 DIT [J / ←]",
        dah: "划 DAH [K / →]",
        backspace: "删除 [BS]",
        reset: "重置 [ESC]",
      },
      status: {
        ready: "就绪 (READY)",
      },
      speed: {
        slow: "慢速",
        med: "中速",
        fast: "快速",
        beginner: "初级",
        intermediate: "中级",
        advanced: "高级",
      },
      instructions: {
        title: "操作说明与指南",
        operation: {
          title: "如何操作",
          keyboard: "键盘控制",
          keyboard_desc:
            "使用 '.' / 'J' / '左箭头' 输入点 (DIT)。使用 '-' / 'K' / '右箭头' 输入划 (DAH)。空格键输入词间隔。退格键删除。",
          buttons: "屏幕按钮",
          buttons_desc:
            "点击底部的两个大按钮分别输入点 (DIT) 和划 (DAH)。顶部按钮可清空记录，底部小按钮用于删除和重置。",
        },
        speed_guide: {
          title: "速度设置说明",
          beginner:
            "初级 (Beginner): 较慢的速度，字符间距较大。非常适合初学者听辨点划节奏，建立肌肉记忆。",
          intermediate:
            "中级 (Intermediate): 中等速度。减少了夸张的字符间距，接近正常的发报节奏，适合进阶练习。",
          advanced:
            "高级 (Advanced): 快速模式。极短的间距，模拟真实的高速通信或竞赛环境，适合老手挑战。",
        },
        training_desc:
          "切换到训练模式后，您可以跟随屏幕上的文本进行练习。系统会实时判断您的输入是否正确，并统计您的抄收速度 (WPM)。您也可以输入自定义文本进行针对性练习。",
      },
      game: {
        title: "CW 防御战",
        subtitle: "用摩尔斯电码保卫城墙",
        ready: "准备好了吗？",
        instructions:
          "按 J 键输入 ·（点），按 K 键输入 −（划）。在字符掉落到城墙前输入正确的摩尔斯电码来消灭它们！",
        start: "开始游戏",
        resume: "继续",
        paused: "已暂停",
        score: "分数",
        highScore: "最高分",
        combo: "连击",
        wall: "防御城墙",
        yourInput: "你的输入",
        waiting: "等待输入...",
        clear: "清空",
        dit: "点",
        dah: "划",
        controls: "J = ·（点） | K = −（划） | 退格 = 删除 | ESC = 暂停",
        gameOver: "游戏结束",
        wallBreached: "城墙已被攻破！",
        finalScore: "最终得分",
        maxCombo: "最高连击",
        newRecord: "新纪录！",
        mainMenu: "主菜单",
        playAgain: "再玩一次",
      },
    },
    cwGame: {
      title: "CW 防御战 (CW Defense)",
      description:
        "用摩尔斯电码保卫城墙！下落式打字游戏，锻炼你的 CW 反应速度。",
      keywords: "CW, 摩尔斯电码, 游戏, 打字游戏, 业余无线电",
    },
    cwRxGame: {
      title: "CW 听力训练 (RX Trainer)",
      description: "摩尔斯电码接收练习工具，模拟真实短波底噪。",
      keywords: "CW, 听力练习, 抄收, 摩尔斯电码, 业余无线电",
      ui: {
        title: "听力训练",
        subtitle: "摩尔斯电码接收模拟",
        instructions: "聆听摩尔斯电码序列。输入你听到的内容。按回车键提交。",
        start: "开始监听",
        score: "得分",
        highScore: "最高分",
        speed: "速度 (WPM)",
        spacing: "间距 (Spacing)",
        noise: "底噪 (Noise)",
        qsb: "信号衰落 (QSB)",
        chineseCallsigns: "仅中国呼号 (CN Call)",
        qsoMode: "模拟 QSO (Simulate QSO)",
        status: {
          transmitting: "正在发送...",
          waiting: "等待输入",
          correct: "正确!",
          miss: "错误!",
          was: "正确答案:",
        },
        input: {
          placeholder: {
            playing: "...",
            waiting: "在此输入",
          },
          hint: "按 [空格] 重听 • [回车] 提交",
        },
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
    acknowledgements: "鸣谢",
    authorKJ7LNW: "NEC2 仿真引擎基于 KJ7LNW/nec2c",
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
