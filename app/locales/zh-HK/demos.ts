export default {
  subtitle: "天線理論可視化 (Antenna Theory Visualization)",
  loading: "載入 3D 場景中...",
  aboutTitle: "關於此演示",
  polarizationMatch: "極化匹配與損耗 (Polarization Match & Loss)",
  polarizationTitle: "極化特性與應用",
  physicsValidation: "物理原理驗證 (Physics Validation)",

  circularPolarization: {
    metaTitle: "圓極化 (Circular Polarization) | 業餘無線電可視化",
    metaDescription: "3D演示圓極化電波的傳播特性，包括右旋(RHCP)和左旋(LHCP)。",
    metaKeywords:
      "圓極化, circular polarization, RHCP, LHCP, 螺旋天線, helical antenna, 衞星通訊, satellite communication",
    title: "圓極化 (Circular Polarization)",
    about:
      "本可視化演示了<b>圓極化 (Circular Polarization)</b> 的電磁波傳播。在這種極化方式中，電場向量隨著波的傳播而不斷旋轉，描繪出一個螺旋形狀。",
    rhcp: "<strong>右旋圓極化 (RHCP):</strong> 電場向量沿傳播方向順時針旋轉（符合右手法則）。",
    lhcp: "<strong>左旋圓極化 (LHCP):</strong> 電場向量沿傳播方向逆時針旋轉。",
    application:
      "<strong>應用:</strong> 圓極化廣泛用於<b>衞星通訊</b>，因為它可以抵抗法拉第旋轉（訊號穿過電離層時極化面的改變），並且不要求接收天線與發射天線的極化角度精確對齊。",
    matchRhcpToRhcp: "<strong>RHCP 發射 -> RHCP 接收:</strong>",
    matchRhcpToLhcp: "<strong>RHCP 發射 -> LHCP 接收 (交叉極化):</strong>",
    matchCircularToLinear:
      "<strong>圓極化發射 -> 線性極化接收 (Vertical/Horizontal):</strong>",
    bestMatch: "最佳匹配",
    highLoss: "極高損耗 (High Loss)",
    loss3db: "3dB 損耗",
    rhcpToLhcpNote: "理論上有無限大損耗，實際通常 >20dB。",
    reflectionNote:
      "注意：當圓極化訊號從表面反射時，其旋轉方向通常會翻轉 (例如 RHCP 變成 LHCP)。",
    circularToLinearNote:
      "這是打衛星時的常用策略（如果不想製作複雜的追蹤圓極化天線），但會損失一半訊號。",
    physicsContent:
      "對於螺旋天線 (Helical Antenna)，當螺旋周長接近一個波長時，天線工作在<strong>軸向模式 (Axial Mode)</strong>。此時，天線沿螺旋軸向輻射最強，形成特定的方向性波束 (Directional Beam)，且產生近似完美的圓極化波。",
    physicsQuote:
      '"The axial mode of radiation... maximum radiation is along the helix axis... The polarization is circularly polarized."',
  },

  ellipticalPolarization: {
    metaTitle: "橢圓極化 (Elliptical Polarization) | 業餘無線電可視化",
    metaDescription: "3D演示極化的一般形式——橢圓極化，介於線極化和圓極化之間。",
    metaKeywords:
      "橢圓極化, elliptical polarization, 極化, polarization, 無線電傳播, radio propagation",
    title: "橢圓極化 (Elliptical Polarization)",
    about:
      "本可視化演示了<b>橢圓極化 (Elliptical Polarization)</b>。這是極化的一般形式。當垂直和水平分量的幅度不同，或者相位差不是 <M>0^\\circ</M>、<M>90^\\circ</M>、<M>180^\\circ</M> 時，就會產生橢圓極化。",
    sliderNote: "通過調整下方的滑塊，你可以觀察不同參數對極化形狀的影響：",
    linear:
      "<strong>線極化 (Linear):</strong> 相位差為 <M>0^\\circ</M> 或 <M>180^\\circ</M>。",
    circular:
      "<strong>圓極化 (Circular):</strong> 垂直與水平幅度相等且相位差為 <M>90^\\circ</M>。",
    elliptical: "<strong>橢圓極化 (Elliptical):</strong> 其他所有情況。",
    generalRulesTitle: "關於極化匹配的一般規則",
    generalRules:
      "實際上，大多數無線電訊號在傳播過程中都會變成某種程度的橢圓極化（由於反射、折射等）。極化失配損耗 (Polarization Mismatch Loss) 取決於兩個橢圓極化波的<strong>軸比 (Axial Ratio)</strong> 和 <strong>傾角 (Tilt Angle)</strong> 的差異。",
    physicsContent:
      "橢圓極化是電磁波極化的一般形式，線極化和圓極化只是其特例。從數學上講，它是兩個正交線極化分量的疊加，且這兩個分量具有任意的幅度比和相位差。<strong>軸比 (Axial Ratio, AR)</strong> 是衡量橢圓扁平程度的關鍵指標：<M>AR=1 (0\\text{dB})</M> 為圓極化，<M>AR=\\infty</M> 為線極化。",
    physicsQuote:
      '"In the general case, the trace of the tip of the electric field vector... forms an ellipse... The ratio of the major axis to the minor axis is called the Axial Ratio."',
  },

  verticalPolarization: {
    metaTitle: "垂直極化 (Vertical Polarization) | 業餘無線電可視化",
    metaDescription: "3D演示垂直極化偶極子天線的電場傳播與極化匹配原理。",
    metaKeywords:
      "垂直極化, vertical polarization, 偶極子, dipole, 垂直天線, vertical antenna, 極化損耗",
    title: "垂直極化 (Vertical Polarization)",
    about:
      "本可視化演示了來自垂直極化偶極子天線 (Dipole Antenna) 的電磁波傳播。觀察電場 (E-field) 向量如何在波向外傳播時上下（垂直）振盪。",
    polarization:
      "<strong>極化 (Polarization):</strong> 由電場 (E-field) 向量的方向定義。",
    verticalDipole:
      "<strong>垂直偶極子 (Vertical Dipole):</strong> 產生垂直極化的波。",
    propagation:
      "<strong>傳播 (Propagation):</strong> 在水平面 (Azimuth) 上是全向的 (Omnidirectional)。",
    vToV: "<strong>垂直發射 -> 垂直接收 (Vertical to Vertical):</strong>",
    vToVNote: "訊號強度最大，無額外極化損耗。",
    vToH: "<strong>垂直發射 -> 水平接收 (Vertical to Horizontal):</strong>",
    crossPolarization: "極化隔離 (Cross-polarization)",
    vToHNote:
      "理論上接收不到任何訊號 (無限大損耗)。實際上由於反射和多徑效應，通常會有 <strong>-20dB 到 -30dB</strong> 的巨大損耗。",
    crossPolNote:
      "這也是為什麼這兩種極化方式可以複用同一頻率而不容易互相干擾。",
    vToC: "<strong>垂直發射 -> 圓極化接收 (Vertical to Circular):</strong>",
    vToCNote:
      "線性極化波可以分解為兩個相反旋轉的圓極化波，接收天線只能接收其中一個分量，因此損失一半能量 (3dB)。儘管有損耗，但考慮到極化失配的風險，這種組合在特定情況下（如流動通訊）是可以接受的。",
    physicsContent:
      "根據天線理論，垂直偶極子 (Vertical Dipole) 產生的電場只有垂直分量。其在水平面上的輻射強度是均勻的，形成全向方向圖。",

    physicsQuote:
      '"The radiation pattern of a vertical dipole is omnidirectional in the horizontal plane... The E-field lines are vertical, parallel to the dipole axis."',
  },

  horizontalPolarization: {
    metaTitle: "水平極化 (Horizontal Polarization) | 業餘無線電可視化",
    metaDescription: "3D演示水平極化偶極子天線的電場傳播與極化匹配原理。",
    metaKeywords:
      "水平極化, horizontal polarization, 偶極子, dipole, 水平天線, horizontal antenna, 極化損耗",
    title: "水平極化 (Horizontal Polarization)",
    about:
      "本可視化演示了來自水平極化偶極子天線 (Horizontal Dipole Antenna) 的電磁波傳播。觀察電場 (E-field) 向量如何在波向外傳播時左右（水平）振盪。",
    polarization:
      "<strong>極化 (Polarization):</strong> 由電場 (E-field) 向量的方向定義。",
    horizontalDipole:
      "<strong>水平偶極子 (Horizontal Dipole):</strong> 產生水平極化的波。",
    propagation:
      "<strong>傳播 (Propagation):</strong> 雖然在垂直於導線的方向最強，但通常我們關注其相對於地面的水平特性。",
    hToH: "<strong>水平發射 -> 水平接收 (Horizontal to Horizontal):</strong>",
    hToHNote: "訊號強度最大。",
    hToV: "<strong>水平發射 -> 垂直接收 (Horizontal to Vertical):</strong>",
    hToVNote:
      "巨大的訊號損耗 (約 <strong>-20dB 到 -30dB</strong>)。在短波 DX (遠距離通訊) 中，由於電離層反射經常改變極化方向，這種影響可能不如視距通訊(VHF/UHF)那麼顯著，但在視距通訊中是致命的。",
    physicsContent:
      "水平極化偶極子天線 (Horizontal Dipole) 產生的電場向量平行於地面。其輻射方向圖在自由空間中是圍繞導線的圓環 (doughnut)，但受地面反射影響，實際輻射圖通常呈現為從地面向上翹起的瓣狀。水平極化在HF波段 DX 通訊中非常流行，部分原因是它比垂直極化受地面噪聲干擾更小。",
    physicsQuote:
      '"Horizontally polarized antennas are less susceptible to man-made noise... The ground reflection factor reinforces the signal at certain takeoff angles."',
  },

  dipoleAntenna: {
    metaTitle: "偶極子天線 (Dipole Antenna) | 業餘無線電可視化",
    metaDescription: "3D演示偶極子天線結構、駐波原理及輻射方向圖。",
    metaKeywords:
      "偶極子天線, dipole antenna, 半波偶極子, half-wave dipole, 駐波, standing wave, 倒V天線",
    title: "偶極子天線 (Dipole Antenna)",
    overviewTitle: "關於此演示 (About this Demo)",
    overview:
      "本頁面提供了<strong>偶極子天線</strong>的互動式 3D 模擬。你可以通過調整天線長度（0.5λ, 1.0λ, 1.5λ）來觀察駐波分佈的變化，也可以在「倒V」模式下直觀地看到天線變形對輻射特性的影響。綠色網格球體顯示了理想狀態下的輻射方向圖。",
    structure:
      "<strong>結構模擬</strong>：場景中紅白兩色的振子代表偶極子的兩臂，中間白色為饋電點。黃色線條動態展示了電流駐波的分佈。",
    halfWave:
      "<strong>實驗建議</strong>：嘗試將長度設為 standard <strong>0.5λ</strong>，觀察其經典的半波偶極子特性。然後切換到 <strong>1.5λ</strong>，觀察方向圖的分裂。",
    principleTitle: "工作原理：駐波 (Standing Wave)",
    principle:
      "模擬中的黃色曲線展示了電流駐波的分佈。注意觀察電流波腹（最大值）和波節（零點）的位置變化。",
    principleDetails: {
      ends: "<strong>兩端</strong>：始終是電流波節 (0)，符合物理邊界條件。",
      center:
        "<strong>饋電點</strong>：在半波長時為電流波腹（最大），對應低阻抗（73Ω）；在全波長時為波節（0），對應高阻抗。",
      impedance:
        "<strong>阻抗暗示</strong>：通過觀察饋電點的電流大小，可以直觀推斷阻抗的高低（電流大則阻抗低，電流小則阻抗高）。",
    },
    patternTitle: "輻射方向圖 (Mathematical Model)",
    patternIntro:
      "綠色的 3D 網格可視化了由以下公式計算出的遠場輻射強度 <M>F(\\theta)</M>。注意它是如何隨著天線長度 <M>L</M> 的變化而“呼吸”的。",
    halfWaveSpecialCase:
      "半波偶極子特例 (<M>L=\\lambda/2 \\Rightarrow kL/2 = \\pi/2</M>)",
    fullWaveTitle: "為什麼不用全波長偶極子？",
    fullWaveIntro: "如果你在模擬器中將長度設為 <M>1.0\\lambda</M>，你會發現：",
    fullWavePoints: {
      pattern:
        "<strong>方向圖</strong>：雖然變窄了一點，但依然是 8 字形，增益略有提升。",
      impedance:
        "<strong>阻抗災難</strong>：在中心點，全波長天線的電流為 0（波節），電壓極高。這意味著輸入阻抗 <strong>Z 趨近於無窮大</strong>（數千歐姆）。",
      conclusion:
        "<strong>結論</strong>：50Ω 的電台無法直接驅動全波長偶極子。如果非要用全波長，通常使用<strong>端饋</strong>（即 EFHW 的原理）或特殊的匹配網絡。",
    },
    impedanceTitle: "阻抗特性",
    impedance73: "<strong>73Ω</strong>：理想自由空間中的半波偶極子。",
    impedance50:
      "<strong>50Ω</strong>：當偶極子被做成「倒V」形狀（夾角 90-120度）時，阻抗會降低到 50Ω 左右，這正是倒V天線流行的原因——省去了巴倫的阻抗變換功能，只需要 1:1 巴倫做平衡-不平衡轉換即可。",
    physicsContent:
      "細偶極子天線上的電流分佈近似為正弦分佈，兩端為零點。這種駐波分佈產生了向外輻射的電磁場。",
    physicsQuote:
      '"The current distribution on the antenna... is assumed to be sinusoidal... This approximation is quite accurate for thin dipoles."',
  },

  gpAntenna: {
    metaTitle: "GP天線 (Ground Plane Antenna) | 業餘無線電可視化",
    metaDescription:
      "3D演示GP天線（Ground Plane）的垂直單極子結構、地網作用及輻射圖。",
    metaKeywords:
      "GP天線, Ground Plane antenna, 垂直單極子, vertical monopole, 地網, radials, 1/4波長",
    title: "GP天線 (Ground Plane Antenna)",
    about:
      "GP 天線（Ground Plane，地網天線）是最基礎、最常見的垂直天線。它由一根垂直的 1/4 波長振子和數根（通常 3-4 根）水平或下傾的地網（Radials）組成。",
    theoryAnalysis: "理論分析",
    theoryContent:
      "GP天線（Ground Plane）利用<strong>鏡像原理</strong>，通過地網在地下產生一個虛擬的鏡像振子，從而構成完整的垂直偶極子。實體的 1/4 波長振子與虛擬的下半部分相結合，實現了全尺寸天線的效率。通過調整地網下垂角度至約 135°，可以提高輸入阻抗至 <strong>50Ω</strong>，完美匹配同軸電纜。其低仰角輻射特性使其成為 DX 通訊的利器。",
    formulaRadiation: "輻射方向圖 (理想單極子)",
    formulaImpedance: "輸入阻抗匹配 (地網下垂 135°)",
    comparisonTable: {
      title: "對比表：GP天線 (垂直) vs 偶極子 (水平)",
      headers: ["特性", "GP天線 (垂直極化)", "偶極子 (水平極化)"],
      rows: [
        {
          feature: "輻射方向",
          gp: "全向 (360° 無死角)",
          dipole: "雙向 (8字形)",
        },
        {
          feature: "發射仰角",
          gp: "低仰角 (DX 利器)",
          dipole: "高仰角 (適合 NVIS)",
        },
        {
          feature: "抗噪能力",
          gp: "差 (易受干擾)",
          dipole: "好 (較安靜)",
        },
        {
          feature: "架設難度",
          gp: "需地網，佔地小",
          dipole: "需兩點支撐，佔地大",
        },
      ],
    },
    physicsContent:
      "GP天線的工作依賴於鏡像原理 (Image Theory)。理想導電地平面就像一面電磁鏡子，在地下產生一個與地上振子電流方向相同（相位相同）的鏡像。這使得 1/4 波長的單極子在遠場表現得像一個 1/2 波長的偶極子。地網的作用就是模擬這個導電平面。",
    physicsQuote:
      '"The monopole above a ground plane creates an image current... The combination of the actual source and the image current produces the same fields as a dipole in the upper hemisphere."',
  },

  invertedVAntenna: {
    metaTitle: "倒V天線 (Inverted V Antenna) | 業餘無線電可視化",
    metaDescription:
      "3D演示倒V天線（Inverted-V）的結構與輻射特性，解釋其阻抗特性與架設優勢。",
    metaKeywords:
      "倒V天線, Inverted V antenna, 偶極子, dipole, 阻抗匹配, impedance matching, 便攜天線",
    title: "倒V天線 (Inverted V Antenna)",
    about:
      "倒V天線實際上就是中間架高、兩端下垂的偶極子天線 (Dipole)。由於其架設簡單（只需一根支撐桿），是業餘無線電愛好者最常用的短波天線之一。",
    theoryAnalysis: "理論分析",
    theoryContent:
      "倒V天線（Inverted V）是「窮人的法拉利」。它的核心優勢在於<strong>架設極簡</strong>和<strong>天然阻抗匹配</strong>。只需一根中心支撐桿，利用重力自然下垂。當兩臂夾角在 90° 到 120° 之間時，輸入阻抗會從平拉偶極子的 73Ω 自然降低到約 <strong>50Ω</strong>，無需任何阻抗變換器即可直接連接同軸電纜。此外，其垂直極化分量增強了全向輻射特性，非常適合近距離 NVIS 通訊。",
    formulaImpedance: "輸入阻抗 (夾角 90°-120°)",
    comparisonTable: {
      title: "對比表：正V vs 倒V",
      headers: ["特性", "正V天線 (Rigid V)", "倒V天線 (Inverted V)"],
      rows: [
        {
          feature: "材質結構",
          rigid: "鋁管 (硬/重)",
          inverted: "電線 (軟/輕)",
        },
        {
          feature: "支撐方式",
          rigid: "旋轉器 + 底座",
          inverted: "單根桅桿 (Mast)",
        },
        {
          feature: "典型用途",
          rigid: "DX (遠距離)",
          inverted: "NVIS (中近) / 野外",
        },
        {
          feature: "架設成本",
          rigid: "高",
          inverted: "極低",
        },
      ],
    },
    physicsContent:
      "倒V天線 (Inverted-V) 的兩臂下垂會影響其輻射阻抗和方向圖。隨著夾角小於 180°，輸入阻抗會降低（通常降至 50Ω 附近），使其能直接匹配同軸電纜。此外，垂直輻射分量會有所增加，填充了水平偶極子兩側的零點，使方向圖在全方位上更均勻。",
    physicsQuote:
      '"Dropping the ends of the dipole to form an Inverted-V lowers the resonant frequency and the feed-point impedance... somewhat more omnidirectional than a horizontal dipole."',
  },

  moxonAntenna: {
    metaTitle: "莫克森天線 (Moxon Antenna) | 業餘無線電可視化",
    metaDescription:
      "3D演示莫克森天線（Moxon Rectangle）的緊湊結構，展示其高前後比和卓越的指向性。",
    metaKeywords:
      "莫克森天線, Moxon antenna, 長方形天線, 矩形天線, 高前後比, high F/B ratio",
    title: "莫克森天線 (Moxon Antenna)",
    about:
      "Moxon 矩形天線由 Les Moxon (G6XN) 推廣。它是一個兩單元的導線天線，元件末端向內彎曲形成矩形。",
    fbRatio:
      "<strong>卓越的前後比 (F/B):</strong> Moxon 的最大特點是其極高的前後比，能極其有效地抑制來自背後的干擾訊號。",
    compact:
      "<strong>緊湊尺寸:</strong> 其跨度僅為同頻段全尺寸八木的 70% 左右，非常適合空間受限的場合。",
    bandwidth:
      "<strong>寬頻寬:</strong> 可以在很寬的頻率範圍內保持良好的駐波比。",
    applicationTitle: "應用",
    foxHunting:
      "<strong>手提測向:</strong> 由於其極好的方向性和前後比，常用於無線電測向 (Fox Hunting)。",
    limitedSpace:
      "<strong>受限空間 DX:</strong> 在陽台或屋頂空間不足以架設八木時，Moxon 是極佳的替代品。",
    physicsContent:
      "Moxon 矩形天線利用了'臨界耦合'原理。通過將元件末端向內彎曲並保持特定的間距，使得有源振子與反射器之間的互感耦合增強。",
    physicsQuote:
      '"The Moxon Rectangle is a 2-element beam with the element tips folded towards each other... maximizing the front-to-back ratio."',
    theoryAnalysis: "理論分析",
    theoryContent:
      "雖然精確的 Moxon 輻射場需要複雜的數值分析（如 NEC 建模），但其標誌性的<strong>心形方向圖 (Cardioid Pattern)</strong> 可以用以下簡化函數近似描述：",
    formulaRadiation: "輻射方向圖公式 (Mathematical Model)",
    formulaAngle:
      "其中 <M>\\theta</M> 是方位角（<M>0^\\circ</M> 為天線前方）。",
    formulaShapeFactor: "<M>A</M> 是形狀因子（通常 <M>A \\approx 1.3</M>）。",
    theorySummaryTable: {
      title: "Moxon vs 八木 (2單元)",
      headers: ["特性", "Moxon 矩形天線", "2單元八木天線"],
      rows: [
        {
          feature: "尺寸",
          moxon: "小 (緊湊矩形)",
          yagi: "大 (長條形)",
        },
        {
          feature: "前後比",
          moxon: "<strong>極高 (>20dB)</strong>",
          yagi: "一般 (10-15dB)",
        },
        {
          feature: "增益",
          moxon: "中等 (~5.5 dBi)",
          yagi: "略高 (~6.0 dBi)",
        },
        {
          feature: "匹配",
          moxon: "<strong>直連 50Ω</strong>",
          yagi: "通常需要匹配網絡",
        },
        {
          feature: "頻寬",
          moxon: "極寬",
          yagi: "較窄",
        },
      ],
    },
  },

  positiveVAntenna: {
    metaTitle: "正V天線 (Positive V Antenna) | 業餘無線電可視化",
    metaDescription:
      "3D演示正V天線（Positive V）的結構特點，展示為何它是受限空間下理想的樓頂天線。",
    metaKeywords:
      "正V天線, Positive V antenna, 偶極子, dipole, 樓頂天線, balcony antenna, 緊湊型天線",
    title: "正V天線 (Positive V Antenna)",
    about:
      '正V天線 (Positive V) 是一種兩臂向上翹起的偶極子天線，形狀像一個 "V" 字。這與中心高、兩端低的"倒V天線" (Inverted V) 正好相反。',
    structure:
      "<strong>結構優勢:</strong> 由於兩端翹起，天線末端（電壓波腹點）遠離地面和周圍物體，減少了介質損耗，也提高了安全性。",
    rotatable:
      '<strong>旋轉偶極子:</strong> 在短波波段，正V結構常用於製作"旋轉偶極子" (Rotatable Dipole)。V形結構減小了回轉半徑。',
    polarizationTitle: "極化與方向圖",
    physicsContent:
      "正V天線 (Positive-V) 將高電壓點（天線末端）抬高並遠離地面或屋頂結構。這顯著減少了由周圍物體引起的電容效應和介質損耗。",
    physicsQuote:
      '"Raising the ends of the dipole in a V-shape keeps the high-voltage points away from lossy structures... minimizing ground losses."',

    // New Content
    theoryAnalysis: "理論分析",
    theoryContent:
      "正V天線本質上是一個<strong>變形的半波偶極子</strong>。通過將兩臂向上折起呈 V 形（通常為 90°~120°），改變了天線的阻抗特性。直立偶極子的阻抗約為 73Ω，而正V形狀利用振子間的互阻抗將輻射電阻降低至 <strong>50Ω</strong> 附近，從而實現了與常用同軸電纜的<strong>自然匹配</strong>（無需天調）。此外，V 形結構還改善了方向性，填充了原本位於天線兩端的輻射盲區。",
    impedanceMathLabel: "120° 夾角時的阻抗特性",
    comparisonTable: {
      title: "對比表",
      headers: ["特性", "正V天線 (Positive V)", "倒V天線 (Inverted V)"],
      rows: [
        {
          feature: "形狀",
          posV: "V (中間低，兩頭高)",
          invV: "∧ (中間高，兩頭低)",
        },
        {
          feature: "阻抗",
          posV: "~50Ω (自然匹配)",
          invV: "< 50Ω (通常需巴倫匹配)",
        },
        {
          feature: "發射角",
          posV: "低 (適合 DX 遠距離)",
          invV: "高 (適合 NVIS 近距離)",
        },
        {
          feature: "架設",
          posV: "需旋轉器/鋁管 (剛性)",
          invV: "單支撐桿/軟線 (簡易)",
        },
      ],
    },
  },

  quadAntenna: {
    metaTitle: "方框天線 (Quad Antenna) | 業餘無線電可視化",
    metaDescription:
      "3D演示方框天線（Quad Antenna）的回路結構，展示其高增益和低輻射仰角的特性。",
    metaKeywords:
      "方框天線, Quad antenna, 定向天線, directional antenna, DX利器, 高增益, high gain",
    title: "方框天線 (Quad Antenna)",
    about:
      "方框天線（通常指 Cubical Quad）由兩個或多個方形回路元件組成。由 Clarence Moore (W9LZX) 在 1940 年代為解決高海拔電暈放電問題而發明。",
    highGain:
      "<strong>高增益:</strong> 2 單元的 Quad 天線通常相當於 3 單元的八木天線增益。",
    lowNoise:
      "<strong>低雜訊:</strong> 閉合回路結構有助於減少接收時的靜電雜訊，聽感通常比八木更安靜。",
    theoryAnalysis: "理論分析",
    theoryContent:
      "全波諧振環（Full-Wave Loop）本質上是一個<strong>變形的雙偶極子陣列</strong>。當環周長約為 1 個波長 (<M>\\lambda</M>) 時，環上的電流分佈形成駐波，最大輻射方向垂直於框面（Broadside）。這種閉合回路結構不僅提供了比半波偶極子更高的增益（約 3.3 dBi），還因為它是直流接地的，能有效抑制降水靜電雜訊，使接收背景更安靜。",
    formulaLoopLength: "環周長 (Loop Perimeter)",
    formulaImpedance: "輸入阻抗 (單環)",
    comparisonTable: {
      title: "對比表",
      headers: ["特性", "電小環 (Small Loop)", "全波環 (Full-Wave Loop)"],
      rows: [
        {
          feature: "尺寸 (周長)",
          small: "< 0.1λ",
          full: "≈ 1.0λ",
        },
        {
          feature: "物理模型",
          small: "磁偶極子",
          full: "雙偶極子陣列",
        },
        {
          feature: "輻射方向",
          small: "沿著框面 (In Plane)",
          full: "垂直框面 (Broadside)",
        },
        {
          feature: "典型應用",
          small: "接收 (磁棒天線)",
          full: "發射/DX (Quad)",
        },
      ],
    },
    physicsContent:
      "四方框天線 (Quad) 是一個全波長閉合回路，相比於半波長偶極子，它具有更有效的輻射孔徑。標準的 2 單元 Quad (有源振子 + 反射器) 通過臨界耦合可提供約 7dBi 的增益，相當於 3 單元八木。由於它是直流接地的閉合回路，能有效洩放雨雪靜電 (Precipitation Static)，因此接收背景雜訊通常比八木更低。",
    physicsQuote:
      '"The closed-loop configuration of the Quad antenna results in a lower Q and wider bandwidth... and is less susceptible to static noise."',
  },

  yagiAntenna: {
    metaTitle: "八木-宇田天線 (Yagi-Uda Antenna) | 業餘無線電可視化",
    metaDescription:
      "3D演示八木天線的工作原理，展示引向器、有源振子和反射器的作用及輻射方向圖。",
    metaKeywords:
      "八木天線, Yagi-Uda antenna, 定向天線, directional antenna, 引向器, director, 反射器, reflector",
    title: "八木-宇田天線 (Yagi-Uda Antenna)",
    about:
      "八木天線是由日本的八木秀次和宇田新太郎發明的。它是一種<strong>高增益、強方向性</strong>的天線，廣泛用於短波通訊、電視接收和雷達。",
    theoryAnalysis: "理論分析",
    principle:
      "<strong>工作原理:</strong> 通過寄生元件（反射器和引向器）與驅動元件之間的互感耦合，改變電流相位，從而在單一方向疊加增強訊號，在反方向抵消訊號。",
    gain: "<strong>增益 (Gain):</strong> 單元越多，引向器越長，增益越高，波束越窄。",
    application:
      "<strong>應用:</strong> 最常見的 DX (遠距離) 通訊天線。將你的訊號集中發射給遠方的特定電台。",
    polarizationTitle: "極化匹配",
    polarizationMatch:
      "<strong>極化匹配:</strong> 大多數短波八木是水平安裝，產生水平極化。",
    polarizationNote:
      "注意：對於本地 VHF/UHF FM 通訊，通常垂直安裝以匹配手提機和車機的垂直極化。",
    physicsContent:
      "八木天線的定向性源於寄生單元（反射器和引向器）上的感應電流與驅動元件電流之間的<strong>相位差 (Phase Difference)</strong>。",
    physicsQuote:
      '"The phase of the current in the parasitic element depends on its length... By proper spacing and length, the radiation from the parasitic element reinforces the radiation from the driven element in the forward direction."',
    theoryTitle: "1. 概述",
    theoryContent:
      "八木天線是一個<strong>端射陣列</strong>。其核心原理是利用<strong>互感耦合</strong>在無源振子（反射器和引向器）上感應出電流。<strong>反射器</strong>略長於 1/2 波長（呈感性），電流相位滯後，從而抵消後瓣。<strong>引向器</strong>略短於 1/2 波長（呈容性），電流相位超前，從而增強前向波束。這種精妙的相位差實現了無需複雜饋電網絡的高增益定向輻射。",
    formulaDriven: "驅動元件長度",
    formulaReflector: "反射器長度 (通常長 5%)",
    formulaDirector: "引向器長度 (通常短 5%)",
    theorySummaryTable: {
      title: "總結表",
      headers: ["元件類型", "長度特徵", "電抗性質", "電流相位", "作用"],
      rows: [
        {
          type: "<strong>反射器</strong>",
          length: "<M>\\gt \\lambda/2</M>",
          reactance: "感性 (+jX)",
          phase: "滯後",
          function: "消除後向輻射，充當“反射鏡”",
        },
        {
          type: "<strong>驅動元件</strong>",
          length: "<M>\\approx \\lambda/2</M>",
          reactance: "諧振 (0)",
          phase: "基準",
          function: "能量饋入點",
        },
        {
          type: "<strong>引向器</strong>",
          length: "<M>\\lt \\lambda/2</M>",
          reactance: "容性 (-jX)",
          phase: "超前",
          function: "引導波束前行，充當“透鏡”",
        },
      ],
    },
  },

  endFedAntenna: {
    metaTitle: "端饋半波天線 (End-Fed Half Wave) | 業餘無線電可視化",
    metaDescription:
      "3D演示端饋天線（EFHW）的便攜性與多波段諧振特性，展示49:1阻抗變換器原理。",
    metaKeywords:
      "端饋天線, EFHW, End-Fed Half Wave, 49:1 balun, 便攜天線, portable antenna, 多波段天線",
    title: "端饋半波天線 (End-Fed Half Wave)",
    about:
      "端饋半波天線 (EFHW) 是一種非常流行的多波段天線，特別適合野外便攜架設。它本質上是一根長度為工作的一半波長的導線，一端饋電。",
    impedance:
      "<strong>阻抗變換:</strong> 由於在半波長末端饋電，阻抗極高（約 2000-4000 歐姆），因此需要一個 49:1 或 64:1 的阻抗變換器 (Unun) 將其匹配到 50 歐姆。",
    structure:
      "<strong>結構:</strong> 主要由一個 Unun 盒子、一根長振子線（Radiator）和一段同軸電纜組成。",
    multiband:
      "<strong>多波段:</strong> 在基頻的諧波頻率上也能自然諧振，無需天調即可工作在多個波段（如 40m, 20m, 15m, 10m）。",
    polarizationTitle: "極化與應用",
    physicsContent:
      "端饋半波天線 (EFHW) 在諧振時，饋電點位於電壓波腹（電壓最大）和電流波節（電流最小）處。根據 Z=V/I，這意味著其輸入阻抗極高。",
    physicsQuote:
      '"An end-fed half-wave antenna presents a very high impedance at the feed point... requiring a matching network (unun) to transform the high impedance down to 50 ohms."',
    theoryAnalysis: "理論分析",
    theoryVoltageFeed:
      "<strong>電壓饋電 (Voltage Feed):</strong> 在導線末端饋電（高電壓、低電流）會導致極高的阻抗 (<M>2000\\Omega \\sim 4000\\Omega</M>)。必須使用高變比變壓器 (49:1 或 64:1) 進行匹配。",
    harmonics:
      "<strong>多波段諧振 (Harmonic Resonance):</strong> 切諧在基頻 (<M>f_0</M>) 的半波長導線，在整數倍頻率 (<M>2f_0, 3f_0...</M>) 上也會表現為高阻抗諧振。這使得一根線可以在多個波段 (如 40m/20m/10m) 工作而無需天調。",
    formulaRadiation: "輻射方向圖公式 (諧波工作)",
    oddHarmonics: "當諧波次數 <M>n</M> 為奇數 (1, 3, 5...)：",
    evenHarmonics: "當諧波次數 <M>n</M> 為偶數 (2, 4, 6...)：",
    patternDesc:
      "隨著諧波次數 <M>n</M> 的增加，原本單一的波瓣會分裂成多個花瓣，且最大輻射方向會越來越貼近導線軸線。",
    commonMode:
      "<strong>共模電流風險:</strong> 同軸電纜的屏蔽層通常充當了地網 (Counterpoise)。強烈建議加裝共模扼流圈 (Choke) 以防止射頻干擾 (RFI) 回流到電台。",
  },

  longWireAntenna: {
    metaTitle: "長線天線 (Long Wire Antenna) | 業餘無線電可視化",
    metaDescription: "3D演示長線天線的多瓣輻射特性，展示長度與方向性的關係。",
    metaKeywords:
      "長線天線, Long Wire Antenna, 隨機線天線, random wire, 多瓣方向圖, multi-lobed pattern, 駐波",
    title: "長線天線 (Long Wire Antenna)",
    about:
      "長線天線是指長度至少為一個波長（通常更長）的天線。它不同於半波偶極子，其輻射方向圖會隨著長度的增加而變得複雜。",
    gain: "<strong>增益與方向性:</strong> 隨著天線長度的增加（以波長為單位），主波束會越來越貼近導線方向，且增益會增加。",
    lobes:
      "<strong>多瓣特性:</strong> 長線天線會產生多個輻射瓣。長度越長，瓣數越多。",
    ground:
      "<strong>接地系統:</strong> 對於非諧振的長線（如 Random Wire），良好的接地是必不可少的，它是天線系統的一部分。",
    physicsContent:
      "長線天線上的電流分佈通常被視為駐波（若末端開路）或行波（若末端終止）。對於末端開路的長線，其輻射方向圖是典型的多瓣狀。",
    physicsQuote:
      '"As the wire is made longer, the major lobes of radiation align more closely with the wire... creating a directional effect along the wire axis."',
    theoryTitle: "理論分析 (Theoretical Analysis)",
    theoryDesc:
      "長線天線，特別是在多個波長下工作時，會表現出由沿導線的駐波分佈決定的複雜輻射圖。",
    theoryFormulaIntro:
      "對於長度為 L 且包含奇數個半波長（<M>n</M> 為奇數）的駐波長線天線，歸一化的電場輻射方向圖 <M>E(\\theta)</M> 由下式給出：",
    theoryFormulaExpl:
      "其中 <M>\\theta</M> 是相對於導線軸的夾角。在我們的仿真中，導線長度模型為 <M>L = 2.5\\lambda</M>，對應於：",
    theoryResult:
      "由於 <M>n=5</M> 是奇數，當 <M>\\theta = 90^\\circ</M> 時，項 <M>\\cos(\\frac{5\\pi}{2} \\cos \\theta)</M> 變為 <M>\\cos(0) = 1</M>。這解釋了為什麼會存在垂直於導線的寬邊波瓣，這是奇次諧波駐波天線的一個顯著特徵。",
  },

  windomAntenna: {
    metaTitle: "溫頓天線 (Windom Antenna) | 業餘無線電可視化",
    metaDescription:
      "3D演示溫頓天線(OCFD)的偏饋結構、匹配原理及多頻段工作特性。",
    metaKeywords:
      "溫頓天線, Windom antenna, OCFD, 偏饋偶極子, Off-Center Fed Dipole, 4:1 balun, 多頻段天線",
    title: "溫頓天線 (Windom / OCFD)",
    overviewTitle: "關於此演示 (About this Demo)",
    overview:
      "本頁面演示了<strong>溫頓天線 (Windom)</strong>，也稱為<strong>偏饋偶極子 (OCFD)</strong>。通過將饋電點從中心移開，我們在不損失太多效率的情況下獲得了多頻段工作的能力。場景中的不對稱結構正是其核心特徵。",
    structure:
      "<strong>結構模擬</strong>：饋電點（白色盒子）位於天線總長度的約 <strong>33%</strong> 處。這種「偏心」設計徹底改變了天線的阻抗分佈。",
    principleTitle: "為什麼是 33% 處？ (The Magic Point)",
    principleIntro:
      "如果我們觀察不同頻率下的電流駐波分佈（黃色曲線），會發現 1/3 處是一個神奇的位置：",
    principlePoints: {
      fundamental: "<strong>基頻 (n=1)</strong>：電流適中，阻抗約 200-300Ω。",
      harmonics2:
        "<strong>二次諧波 (n=2)</strong>：中心是電流波節（阻抗無窮大），但在 1/3 處電流依然適中（阻抗約 200-300Ω）。",
      harmonics4:
        "<strong>四次諧波 (n=4)</strong>：1/3 處依然保持適中的電流和阻抗。",
    },
    principleConclusion:
      "<strong>結論</strong>：僅需一個饋電點，就能在 40m, 20m, 10m 等偶數倍頻頻段獲得相似的阻抗。",
    matchingTitle: "匹配系統：4:1 巴倫",
    matchingIntro:
      "由於饋電點阻抗（~200-300Ω）遠高於 50Ω 同軸電纜，我們需要進行阻抗變換：",
    matchingConclusion:
      "因此，溫頓天線必須搭配一個 <strong>4:1 電流型巴倫</strong>。這與 EFHW 使用的 49:1 變壓器完全不同。",
    patternTitle: "輻射方向圖",
    patternIntro:
      "輻射方向圖（綠色網格）主要由天線的<strong>物理總長度</strong>決定。在基頻下，它與普通偶極子非常相似（呈8字形）。在高次諧波下，它會分裂成多個花瓣。",
    patternPoints: {
      fundamental: "<strong>基頻</strong>：變形的「8」字，與偶極子類似。",
      harmonic: "<strong>諧波</strong>：呈多瓣狀，指向性增強。",
    },
    comparisonTitle: "溫頓 vs EFHW vs 偶極子",
    tableHead: {
      feature: "特性",
      dipole: "偶極子 (Dipole)",
      windom: "溫頓 (OCFD)",
      efhw: "端饋 (EFHW)",
    },
    tableRow: {
      feedPos: "饋電位置",
      multiBand: "多頻段能力",
      match: "匹配設備",
      ground: "接地需求",
      cons: "缺點",
    },
    tableCell: {
      dipoleFeed: "中心 (50%)",
      windomFeed: "偏心 (33%)",
      efhwFeed: "端點 (0%)",
      dipoleBand: "差 (僅基頻+3倍頻)",
      windomBand: "良 (基頻+偶次諧波)",
      efhwBand: "優 (基頻+所有諧波)",
      dipoleMatch: "1:1 巴倫 (可選)",
      windomMatch: "4:1 巴倫 (必須)",
      efhwMatch: "49:1 變壓器 (必須)",
      dipoleGround: "不需要",
      windomGround: "推薦 (防共模)",
      efhwGround: "必須 (依賴電纜地網)",
      dipoleCons: "單頻段",
      windomCons: "諧波有缺口",
      efhwCons: "變壓器損耗大",
    },
    comparisonSummary:
      "<strong>總結</strong>：溫頓天線是效率與便利性的折中。它的效率通常高於 EFHW，但對防共模干擾的要求更高。",
    misconceptionTitle: "常見誤區",
    misconceptionIntro:
      "很多初學者誤以為移動饋電點會讓方向圖「歪向一邊」，這是<strong>錯誤</strong>的。",
    misconceptionPhysicsTitle: "物理定式 (Physics Rules)",
    misconceptionPhysics:
      "駐波形狀由<strong>導線總長度</strong>和<strong>頻率</strong>決定。無論從哪裏饋電，電流在兩端都必須為零。因此，駐波形狀不變，輻射方向圖也不變。",
    misconceptionFeedTitle: "饋電點的作用",
    misconceptionFeed: "移動饋電點只是在<strong>選擇阻抗</strong>：",
    misconceptionFeedLow: "波腹饋電 = 低阻抗 (偶極子)",
    misconceptionFeedHigh: "波節饋電 = 高阻抗 (端饋)",
    misconceptionFeedMid: "中間饋電 = 中等阻抗 (溫頓)",
    misconceptionConclusion: "饋電點決定 SWR，不決定方向圖。",
    misconceptionExTitle: "現實中的例外",
    misconceptionEx:
      "如果巴倫性能不佳導致共模電流，饋線會參與輻射，這<strong>確實</strong>會導致方向圖畸變。",
    polarizationTitle: "極化特性 (Polarization)",
    polarizationIntro:
      "溫頓天線是<strong>線極化 (Linear Polarization)</strong> 天線，通常表現為水平線極化。它<strong>不是</strong>橢圓極化或圓極化。",
    polarizationReason1Title: "1. 物理結構決定",
    polarizationReason1:
      "橢圓極化需要兩個垂直且有相位差的電場分量（如螺旋天線）。溫頓本質上是一根單導線，電場矢量始終平行於導線振動。",
    polarizationReason2Title: "2. 架設方式影響",
    polarizationReason2List: {
      horizontal: "<strong>水平架設</strong>：產生純粹的水平極化。",
      invertedV:
        "<strong>倒V架設</strong>：依然是線極化。但傾斜的振子引入了垂直分量，填補了原本的軸向盲區（填充因子 δ ≈ 0.2），使方向圖更接近全向（胖花生形）。",
      sloper:
        "<strong>傾斜架設 (Sloper)</strong>：產生斜線極化，電場矢量沿斜線振動，而非旋轉。",
    },
    polarizationExceptionTitle: "3. 唯一的例外 (干擾)",
    polarizationException:
      "只有在<strong>共模干擾</strong>嚴重時（巴倫失效，饋線輻射），垂直的饋線波與水平的天線波混合，才可能導致極化狀態混亂。這屬於<strong>信號畸變</strong>，而非設計特性。",
    physicsContent:
      "溫頓天線利用了導線上特定位置（約離中心17%處，即全長33%處）在多個諧波頻率下阻抗近似相等的特性。這使得單一饋電點配合4:1巴倫即可實現多頻段工作。",
    physicsQuote:
      '"By moving the feed point to an off-center position... the antenna impedance at the feed point can be made manageable on multiple harmonic bands."',
  },
  hb9cvAntenna: {
    title: "HB9CV 天線",
    metaTitle: "HB9CV 天線 3D 可視化 - 相控陣列原理",
    metaDescription:
      "HB9CV 天線交互式 3D 可視化。探索其獨特的相位原理、心形輻射方向圖以及高前後比特性。",
    metaKeywords: "HB9CV 天線, 相控陣列, 定向天線, 業餘無線電, 3D 仿真",
    about:
      "HB9CV 天線是由瑞士無線電愛好者 Rudolf Baumgartner (HB9CV) 在 1950 年代設計的經典 2 單元相控陣列天線。不同於只有一個有源振子的八木天線，HB9CV 的兩個單元都是有源驅動的。它們以相等的幅度但特定的相位差進行饋電，從而在非常短的動臂長度下實現了卓越的增益和驚人的前後比。",
    structureTitle: "結構",
    structureContent:
      "該天線由兩個有源振子組成，間距約為 1/8 波長。一條相位線（通常為 Z 形）連接兩個元件，引入特定的相移。這種配置確保了輻射在後方相互抵消，而在前方相互增強。",
    phaseTitle: "相位原理",
    phaseContent: "HB9CV 性能的關鍵在於相位關係：",
    phaseFront: "空間相移（由於距離） + 傳輸線相移",
    phaseRear: "總相位差導致後方輻射抵消。",
    formulaTitle: "輻射方向圖公式",
    formulaIntro: "HB9CV 的陣列因子可以通過兩個具有相位差的源的疊加來近似：",
    afDef: "其中 k 是波數，d 是間距，θ 是角度，δ 是相位差。",
    paramK: "k = 2π/λ",
    paramD: "d ≈ λ/8 (45°)",
    paramDelta: "δ ≈ 225° (5π/4)",
    patternTitle: "輻射方向圖",
    patternContent:
      "45° 的空間分離和 225° 的電相位偏移相結合，產生了心形方向圖，在背面有一個深深的零點。",
    comparisonTitle: "對比：HB9CV vs 八木 (2單元)",
    comparisonTable: {
      headers: { feature: "特性", hb9cv: "HB9CV", yagi: "八木 (2單元)" },
      rows: {
        gain: {
          feature: "增益",
          hb9cv: "更高的 (~4-5 dBd)",
          yagi: "較低 (~3-4 dBd)",
        },
        fbRatio: {
          feature: "前後比",
          hb9cv: "優秀 (20-30 dB)",
          yagi: "一般 (10-15 dB)",
        },
        bandwidth: { feature: "頻寬", hb9cv: "較寬", yagi: "較窄" },
        feed: {
          feature: "饋電系統",
          hb9cv: "需要相位線",
          yagi: "簡單偶極子饋電",
        },
      },
    },
    physicsContent:
      "HB9CV 展示了相控陣列的原理：通過控制每個單元的相位來實現波束賦形，而無需無源寄生元件。",
    physicsQuote: "相控陣列是現代雷達和波束賦形系統的基礎。",
  },
  magneticLoopAntenna: {
    metaTitle: "磁環天線 (Magnetic Loop) | 業餘無線電可視化",
    metaDescription:
      "磁環天線（小環天線）3D交互演示。探索其高Q值、窄帶寬及獨特的抗干擾深零點特性。",
    metaKeywords:
      "磁環天線, 小環天線, magnetic loop, small loop, 高Q值, 抗干擾, 窄帶天線",
    title: "磁環天線 (Magnetic Loop)",
    overviewTitle: "關於此演示",
    overview:
      "本頁面展示了<strong>磁環天線 (Magnetic Loop)</strong>，也稱為小環天線。它是一種電尺寸極小（周長 <M>C \\lt \\lambda/10</M>）的天線。",
    structure:
      "<strong>結構:</strong> 通常是一個垂直架設的單匝或多匝線圈，頂部或底部串聯一個可變電容進行調諧。常用的饋電方式是使用一個更小的耦合環。",
    features:
      "<strong>特點:</strong> 效率較低，但具有極高的 Q 值和極窄的頻寬。最著名的特點是其卓越的抗干擾能力。",
    physicsModelTitle: "物理模型：磁偶極子",
    physicsModel:
      "小環天線在物理上等效於一個<strong>磁偶極子</strong>。由於尺寸遠小於波長，假設環上的電流 <M>I</M> 是均勻分佈的（這與偶極子天線不同）。",
    fieldFormulaTitle: "遠場電場公式",
    fieldFormulaDesc: "球坐標系下的遠場電場分量 <M>E_\\phi</M> 為：",
    paramEta: "<M>\\eta \\approx 377\\Omega</M> (波阻抗)",
    paramK: "<M>k = 2\\pi/\\lambda</M> (波數)",
    paramI: "<M>I</M> 為環電流",
    paramA: "<M>A</M> 為環面積",
    paramTheta: "<M>\\theta</M> 為相對於環軸線 (Z軸) 的夾角",
    patternTitle: "輻射方向圖",
    patternDesc: "方向性函數為 <M>F(\\theta) = \\sin\\theta</M>。",
    patternNull:
      "<strong>零點 (Nulls):</strong> 沿環軸線方向（垂直於環面），輻射為零。",
    patternMax:
      "<strong>最大值 (Max):</strong> 在環面方向（側面看環是一條線），輻射最大。",
    advantageTitle: "深零點抗干擾",
    advantageDesc:
      "磁環天線最值錢的特性是其擁有極深的零點。通過旋轉天線，將干擾源置於軸線方向（零點），通常可將噪音降低 20-30dB。",
    physicsContent:
      "磁環天線在近場主要輻射磁場分量。在遠場，其電場分量是水平的（<M>\\phi</M> 方向），其輻射方向圖呈甜甜圈狀，零點位於軸線上。",
    physicsQuote:
      '"The small loop antenna is equivalent to a magnetic dipole... it has a null along its axis and maximum radiation in the plane of the loop."',
  },
  electromagneticPropagation: {
    metaTitle: "電磁波傳播 (Electromagnetic Propagation) | 業餘無線電可視化",
    metaDescription:
      "3D演示電磁波在不同頻段（HF/UV）的傳播特性，展示地波、天波及電離層反射原理。",
    metaKeywords:
      "電磁波傳播, electromagnetic propagation, 地波, ground wave, 天波, sky wave, 電離層反射, ionosphere hop",
    title: "電磁波傳播 (Electromagnetic Propagation)",
    hudTitle: "無線電仿真系統",
    systemStatus: {
      online: "系統：在線",
      ionosphereStable: "電離層：穩定",
      transmissionActive: "傳輸狀態：活躍",
    },
    geoInfo: {
      latitude: "緯度",
      longitude: "經度",
      altitude: "海拔",
    },
    controls: {
      title: "主控制台",
      mode: {
        hf: "HF 短波",
        uv: "UV 視距",
      },
      frequency: "發射頻率",
      elevation: "發射仰角",
      ionosphereHeight: "電離層高度",
    },
    metrics: {
      snr: "信噪比",
      ber: "誤碼率",
    },
    legend: {
      title: "信號診斷",
      groundWave: "地波 (表面波)",
      skyWave: "天波 (反射)",
      scatter: "次級散射",
    },
  },
} satisfies typeof import("~/locales/zh/demos").default;
