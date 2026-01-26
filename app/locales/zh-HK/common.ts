export default {
  title: "業餘無線電可視化",
  description:
    "歡迎來到業餘無線電可視化實驗室。這裏匯集了各種經典天線和電磁波極化的 3D 仿真演示。通過交互式的 3D 場景，您可以直觀地探索天線原理與電波傳播特性，深入理解無線電通信背後的物理機制。",
  nav: {
    home: "首頁",
    back: "返回",
  },
  actions: {
    viewDemo: "查看演示",
    openTool: "打開工具",
    github: "GitHub 倉庫",
  },
  sections: {
    tools: "實用工具",
  },
  demoCards: {
    vertical: {
      title: "垂直極化 (Vertical Polarization)",
      description:
        "可視化垂直極化天線的電場傳播 (Electric Field Propagation)。",
      keywords:
        "垂直極化, 電場傳播, 偶極子, 天線原理, vertical polarization, electric field",
    },
    horizontal: {
      title: "水平極化 (Horizontal Polarization)",
      description:
        "可視化水平極化天線的電場傳播 (Electric Field Propagation)。",
      keywords:
        "水平極化, 電場傳播, 偶極子, 天線原理, horizontal polarization, electric field",
    },
    circular: {
      title: "圓極化 (Circular Polarization)",
      description: "可視化電場矢量旋轉的圓極化傳播 (Circular Polarization)。",
      keywords:
        "圓極化, 旋轉矢量, 衛星通信, circular polarization, rotating vector",
    },
    elliptical: {
      title: "橢圓極化 (Elliptical Polarization)",
      description: "極化的一般形式，介於線極化和圓極化之間。",
      keywords: "橢圓極化, 極化形式, elliptical polarization",
    },
    dipoleAntenna: {
      title: "偶極子天線 (Dipole Antenna)",
      description: "最基礎的天線類型。直觀展示駐波原理與輻射方向圖。",
      keywords: "偶極子天線, 半波偶極子, 駐波",
    },
    yagi: {
      title: "八木-宇田天線 (Yagi-Uda Antenna)",
      description: "著名的定向天線，由引向器、有源振子和反射器組成。",
      keywords:
        "八木天線, 定向天線, 引向器, 反射器, yagi-uda antenna, directional antenna",
    },
    invertedV: {
      title: "倒V天線 (Inverted V Antenna)",
      description: "架設簡便的偶極子變種，中間高兩端低。",
      keywords: "倒V天線, 偶極子變種, inverted v antenna, dipole variant",
    },
    gp: {
      title: "GP天線 (Ground Plane Antenna)",
      description: "垂直單極天線，帶有水平或下傾的地網 (Radials)。",
      keywords: "GP天線, 垂直單極, 地網, ground plane antenna, monopole",
    },
    positiveV: {
      title: "正V天線 (Positive V Antenna)",
      description: "兩臂向上翹起的偶極子，適合樓頂架設，更加安全緊湊。",
      keywords: "正V天線, 偶極子, 樓頂天線, positive v antenna",
    },
    quad: {
      title: "方框天線 (Quad Antenna)",
      description: "方形迴路構成的定向天線，具有高增益和低底噪的特點。",
      keywords: "方框天線, 環形天線, 高增益, quad antenna, loop antenna",
    },
    moxon: {
      title: "莫克森天線 (Moxon Antenna)",
      description: "矩形緊湊型定向天線，擁有卓越的前後比和寬帶寬。",
      keywords: "莫克森天線, 矩形天線, moxon antenna, rectangular antenna",
    },
    endFed: {
      title: "端饋半波天線 (End-Fed Half Wave)",
      description: "多波段便攜天線，使用49:1阻抗變換器，一端饋電。",
      keywords: "端饋天線, 半波天線, EFHW, end-fed half wave",
    },
    longWireAntenna: {
      title: "長線天線 (Long Wire Antenna)",
      description: "3D演示長線天線的多瓣輻射特性，展示長度與方向性的關係。",
      keywords:
        "長線天線, Long Wire Antenna, 隨機線天線, random wire, 多瓣方向圖",
    },
    windomAntenna: {
      title: "溫頓天線 (Windom Antenna)",
      description: "3D演示溫頓天線(OCFD)的偏饋結構與多波段特性。",
      keywords: "溫頓天線, Windom antenna, OCFD, 偏饋偶極子",
    },
    hb9cv: {
      title: "HB9CV 天線",
      description:
        "HB9CV 設計的一種 2 單元相控陣列天線，具有高增益和高前後比。",
      keywords: "HB9CV 天線, 相控陣列, 定向天線, 業餘無線電",
    },
    magneticLoopAntenna: {
      title: "磁環天線 (Magnetic Loop)",
      description:
        "小環天線（磁偶極子）3D演示。直觀展示其深零點抗干擾和高Q特性。",
      keywords: "磁環天線, 小環天線, 磁偶極子, 天線可視化",
    },
    electromagneticPropagation: {
      title: "電磁波傳播 (Electromagnetic Propagation)",
      description:
        "3D演示電磁波在不同頻段（HF/UV）的傳播特性，展示地波、天波及電離層反射原理。",
      keywords:
        "電磁波傳播, 地波, 天波, 電離層反射, electromagnetic propagation",
    },
  },
  tools: {
    yagiCalculator: {
      title: "八木天線計算器 (Yagi Calculator)",
      description:
        "基於 DL6WU 長動臂設計模型 & VK5DJ 修正算法的八木天線設計工具。",
      keywords:
        "八木計算器, 天線設計, DL6WU, VK5DJ, yagi calculator, antenna design",
      ui: {
        title: "八木天線計算器",
        subtitle: "DL6WU 工程工具",
        quickMode: "快速模式",
        proMode: "專業工程模式",
        blueprintPreview: "設計藍圖預覽 (Blueprint Preview)",
        imgDownload: "保存圖紙+表格",
        downloadError: "無法獲取圖紙數據，請刷新頁面重試。",
        downloading: "正在下載...",
        downloadFail: "圖片生成失敗，請稍後重試",
        downloadUnknownError: "下載過程中發生未知錯誤，詳情請查看控制台。",
        copySuccess: "數據已複製到剪貼板！",
        boomCorrectionApplied: "物理修正已應用",
        boomCorrectionDetails:
          "基於 B/d={{ratio}} 和 k={{kFactor}}. 所有振子已延長",
      },
      specs: {
        title: "基礎規格 (Basic Specs)",
        frequency: "中心頻率 (Frequency)",
        elements: "單元數量 (Elements)",
      },
      quick: {
        title: "場景預設",
        label: "動臂材質類型",
        presets: {
          metal_bonded: "金屬管 - 振子穿過並接觸 (最常見)",
          metal_insulated: "金屬管 - 振子絕緣安裝",
          pvc: "PVC/PPR管 - 非金屬",
        },
        note: "* 默認設置: 4mm 振子, 20mm 動臂, 折疊振子, DL6WU 間距。",
      },
      pro: {
        title: "工程參數設置",
        section1: "1. 動臂修正 (Boom Correction)",
        section2: "2. 主振子 (Driven Element)",
        section3: "3. 間距策略 (Spacing)",
        boomShape: "動臂截面",
        shapes: {
          round: "圓管 (Round)",
          square: "方管 (Square)",
        },
        elementDia: "振子直徑 (d)",
        elementDiaTooltip: {
          title: "直徑效應 (K Factor)",
          content: "振子越粗，等效電氣長度越長。物理切割時需縮短以補償。",
        },
        boomDia: "動臂直徑 (B)",
        boomDiaTooltip: {
          title: "動臂短路效應",
          content: "金屬動臂相當於寄生電感，會「縮短」穿過它的振子的電氣長度。",
        },
        mount: "安裝結構",
        mountTooltip: {
          title: "修正係數參考 (k)",
          item1: "非金屬: k ≈ 0",
          item2: "上方架設: k ≈ 0.05 (影響小)",
          item3: "穿孔接觸: k = 動態計算 (0.6~0.8)",
        },
        mountMethods: {
          bonded: "Bonded (穿過金屬管且接觸)",
          insulated: "Insulated (穿過金屬管但絕緣)",
          above: "Above (架在金屬管上方)",
          none: "None (非金屬動臂)",
        },
        bcFactor: "計算修正係數 (BC Factor)",
        bcFactorTooltip: {
          title: "修正係數 k",
          content: "DL6WU 曲線依據 B/d 比值動態計算。最終物理增加長度 = B × k",
        },
        autoCalcNote:
          "* 系統根據 DL6WU 曲線自動計算 k 值，您也可手動修改右側數值。",
        deType: "類型",
        deTypeTooltip: {
          title: "阻抗特性",
          item1: "Folded: ~288Ω (需4:1巴倫)",
          item2: "Straight: ~72Ω (可直接饋電)",
        },
        deTypes: {
          folded: "折疊振子 (Folded)",
          straight: "直立振子 (Straight)",
        },
        feedGap: "饋電間隙 (Gap)",
        feedGapTooltip: {
          title: "物理切割",
          content: "直立偶極子的切割長度需減去此間隙。CutLen = TotalLen - Gap",
        },
        algo: "算法選擇",
        algoTooltip: {
          title: "DL6WU Tapering",
          content:
            "引向器間距從 0.075λ 逐漸增大到 0.30λ，以在保證帶寬的同時最大化前方增益。",
        },
        algos: {
          dl6wu: "DL6WU 標準漸變 (推薦)",
          uniform: "Uniform 等間距 (自定義)",
        },
        fixedSpacing: "固定間距值 (λ)",
      },
      results: {
        title: "切割尺寸表 (Cut List)",
        tolerance: "公差 ±0.5mm",
        copy: "複製數據",
        headers: {
          element: "單元 (Element)",
          pos: "位置 (Pos)",
          space: "間距 (Space)",
          half: "半長 (Half)",
          cut: "切割長 (Cut)",
          note: "備註 (Note)",
        },
        notes: {
          folded: "折疊振子",
          gap: "間隙: {{val}}mm",
          foldedLoop: "Folded Loop",
          gapEn: "Gap: {{val}}mm",
        },
        totalBoom: "總臂長: {{val}} mm",
        estGain: "預估增益",
        estGainTooltip: "預估公式: (單元數 × 1.2) + 2.15 dBi",
        generatedBy: "Generated by Yagi Calc Pro | {{date}}",
        downloadFileName: "yagi_design_{{freq}}MHz.png",
      },
    },
    moxonCalculator: {
      title: "莫克森天線計算器 (Moxon Calculator)",
      description: "基於 AC6LA / MoxGen 算法的 3D 莫克森天線設計工具。",
      keywords: "莫克森計算器, Moxon, MoxGen, 天線設計, AC6LA",
      algorithm: "AC6LA / MoxGen 算法",
      specs: {
        title: "基礎參數",
        subtitle: "Frequency & Wire",
        freqLabel: "中心頻率 (MHz)",
        diaLabel: "線材直徑 (mm)",
        typicalFreq: "典型值: 144.100, 435.000, 28.500",
        typicalDia: "典型值: 2mm ~ 6mm",
        introTitle: "什麼是 Moxon 天線?",
        introDesc:
          "Moxon Rectangle 是由 Les Moxon (G6XN) 推廣的雙單元線束天線。它是一個折疊的八木天線，具有矩形形狀。優點包括出色的前後比 (F/B ratio) 和緊湊的尺寸（約為全尺寸八木的 70%）。它通常具有 50Ω 的直接饋電阻抗，無需複雜的匹配網絡。",
      },
      results: {
        title: "尺寸數據表 (Dimensions List)",
        copy: "複製數據",
        copied: "數據已複製到剪貼板！",
        headers: {
          id: "代號 (ID)",
          desc: "說明 (Description)",
          len: "長度 (mm)",
          wl: "波長係數 (λ)",
        },
        rows: {
          A: "驅動單元寬度 (Driven Width)",
          B: "驅動單元折彎 (Driven Tail)",
          C: "單元間隙 (Gap)",
          D: "反射單元折彎 (Reflector Tail)",
          E: "總深度 (Total Depth)",
          wireDriven: "驅動單元總線長",
          wireRef: "反射單元總線長",
        },
      },
      blueprint: {
        title: "設計藍圖預覽 (Blueprint Preview)",
        download: "保存圖紙",
        feed: "饋電點",
      },
    },
  },
  footer: {
    feedback: {
      title: "有想法或建議？",
      subtitle: "歡迎隨時反饋，幫助改進這個項目",
      emailTitle: "發送郵件給 ham@charlesify.com",
      githubTitle: "View on GitHub",
    },
    copyright: "© {{year}} BG8ROM. All rights reserved.",
    credits: "特別感謝",
  },
  meta: {
    siteName: "業餘無線電可視化",
    keywords:
      "業餘無線電, 天線演示, 3D可視化, 垂直極化, 水平極化, 圓極化, 八木天線, GP天線, 倒V天線, 正V天線, 方框天線, 莫克森天線, ham radio demos, antenna visualization",
    home: {
      title: "業餘無線電可視化",
      description:
        "業餘無線電天線可視化合集：包含垂直/水平/圓極化、八木、倒V、GP、正V、方框、莫克森、端饋半波、長線、溫頓、HB9CV、磁環等經典天線的3D極化與輻射演示。",
      keywords:
        "業餘無線電, 天線演示, 3D可視化, 垂直極化, 水平極化, 圓極化, 八木天線, GP天線, 倒V天線, 正V天線, 方框天線, 莫克森天線, 端饋天線, 長線天線, 溫頓天線, HB9CV, 磁環天線, ham radio demos, antenna visualization",
    },
  },
} satisfies typeof import("~/locales/zh/common").default;
