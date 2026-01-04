export default {
  title: "業餘無線電可視化",
  description:
    "歡迎來到業餘無線電可視化實驗室。這裡匯集了各種經典天線和電磁波極化的 3D 仿真演示。通過交互式的 3D 場景，您可以直觀地探索天線原理與電波傳播特性，深入理解無線電通信背後的物理機制。",

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

  demos: {
    vertical: {
      title: "垂直極化 (Vertical Polarization)",
      description:
        "可視化垂直極化天線的電場傳播 (Electric Field Propagation)。",
    },
    horizontal: {
      title: "水平極化 (Horizontal Polarization)",
      description:
        "可視化水平極化天線的電場傳播 (Electric Field Propagation)。",
    },
    circular: {
      title: "圓極化 (Circular Polarization)",
      description: "可視化電場矢量旋轉的圓極化傳播 (Circular Polarization)。",
    },
    elliptical: {
      title: "橢圓極化 (Elliptical Polarization)",
      description: "極化的一般形式，介於線極化和圓極化之間。",
    },
    yagi: {
      title: "八木-宇田天線 (Yagi-Uda Antenna)",
      description: "著名的定向天線，由引向器、有源振子和反射器組成。",
    },
    invertedV: {
      title: "倒V天線 (Inverted V Antenna)",
      description: "架設簡便的偶極子變種，中間高兩端低。",
    },
    gp: {
      title: "GP天線 (Ground Plane Antenna)",
      description: "垂直單極天線，帶有水平或下傾的地網 (Radials)。",
    },
    positiveV: {
      title: "正V天線 (Positive V Antenna)",
      description: "兩臂向上翹起的偶極子，適合樓頂架設，更加安全緊湊。",
    },
    quad: {
      title: "方框天線 (Quad Antenna)",
      description: "方形迴路構成的定向天線，具有高增益和低底噪的特點。",
    },
    moxon: {
      title: "莫克森天線 (Moxon Antenna)",
      description: "矩形緊湊型定向天線，擁有卓越的前後比和寬帶寬。",
    },
    endFed: {
      title: "端饋半波天線 (End-Fed Half Wave)",
      description: "多波段便攜天線，使用49:1阻抗變換器，一端饋電。",
    },
  },

  tools: {
    yagiCalculator: {
      title: "八木天線計算器 (Yagi Calculator)",
      description:
        "基於 DL6WU 長動臂設計模型 & VK5DJ 修正算法的八木天線設計工具。",
    },
  },

  meta: {
    siteName: "業餘無線電可視化",
    keywords:
      "業餘無線電, 天線演示, 3D可視化, 垂直極化, 水平極化, 圓極化, 八木天線, GP天線, 倒V天線, 正V天線, 方框天線, 莫克森天線, ham radio demos, antenna visualization",
  },
} satisfies typeof import("~/locales/zh/common").default;
