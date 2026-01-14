export default {
  title: "業餘無線電可視化",
  description:
    "歡迎來到業餘無線電可視化實驗室。這裏彙集了各種經典天線和電磁波極化的 3D 模擬演示。通過互動式的 3D 場景，您可以直觀地探索天線原理與電波傳播特性，深入理解無線電通訊背後的物理機制。",

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
      description: "可視化電場向量旋轉的圓極化傳播 (Circular Polarization)。",
      keywords:
        "圓極化, 旋轉向量, 衞星通訊, circular polarization, rotating vector",
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
      description: "著名的定向天線，由引向器、驅動元件和反射器組成。",
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
      description: "方形迴路構成的定向天線，具有高增益和低雜訊的特點。",
      keywords: "方框天線, 環形天線, 高增益, quad antenna, loop antenna",
    },
    moxon: {
      title: "莫克森天線 (Moxon Antenna)",
      description: "矩形緊湊型定向天線，擁有卓越的前後比和寬頻寬。",
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
      description: "3D演示溫頓天線(OCFD)的偏饋結構與多寬頻特性。",
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
  },

  tools: {
    yagiCalculator: {
      title: "八木天線計算器 (Yagi Calculator)",
      description:
        "基於 DL6WU 長動臂設計模型 & VK5DJ 修正演算法的八木天線設計工具。",
      keywords:
        "八木計算器, 天線設計, DL6WU, VK5DJ, yagi calculator, antenna design",
    },
  },

  footer: {
    feedback: {
      title: "有想法或建議？",
      subtitle: "歡迎隨時反饋，幫助改進這個項目",
      emailTitle: "發送電郵給 ham@charlesify.com",
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
