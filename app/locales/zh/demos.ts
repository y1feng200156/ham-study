export default {
  subtitle: "天线理论可视化 (Antenna Theory Visualization)",
  loading: "加载 3D 场景中...",
  aboutTitle: "关于此演示",
  polarizationMatch: "极化匹配与损耗 (Polarization Match & Loss)",
  polarizationTitle: "极化特性与应用",
  physicsValidation: "物理原理验证 (Physics Validation)",

  circularPolarization: {
    metaTitle: "圆极化 (Circular Polarization) | 业余无线电可视化",
    metaDescription: "3D演示圆极化电波的传播特性，包括右旋(RHCP)和左旋(LHCP)。",
    metaKeywords:
      "圆极化, circular polarization, RHCP, LHCP, 螺旋天线, helical antenna, 卫星通信, satellite communication",
    title: "圆极化 (Circular Polarization)",
    about:
      "本可视化演示了<b>圆极化 (Circular Polarization)</b> 的电磁波传播。在这种极化方式中，电场矢量随着波的传播而不断旋转，描绘出一个螺旋形状。",
    rhcp: "<strong>右旋圆极化 (RHCP):</strong> 电场矢量沿传播方向顺时针旋转（符合右手法则）。",
    lhcp: "<strong>左旋圆极化 (LHCP):</strong> 电场矢量沿传播方向逆时针旋转。",
    application:
      "<strong>应用:</strong> 圆极化广泛用于<b>卫星通信</b>，因为它可以抵抗法拉第旋转（信号穿过电离层时极化面的改变），并且不要求接收天线与发射天线的极化角度精确对齐（不需要像线极化那样严格水平或垂直对齐）。",
    matchRhcpToRhcp: "<strong>RHCP 发射 -> RHCP 接收:</strong>",
    matchRhcpToLhcp: "<strong>RHCP 发射 -> LHCP 接收 (交叉极化):</strong>",
    matchCircularToLinear:
      "<strong>圆极化发射 -> 线性极化接收 (Vertical/Horizontal):</strong>",
    bestMatch: "最佳匹配",
    highLoss: "极高损耗 (High Loss)",
    loss3db: "3dB 损耗",
    rhcpToLhcpNote: "理论上有无限大损耗，实际通常 >20dB。",
    reflectionNote:
      "注意：当圆极化信号从表面反射时，其旋转方向通常会翻转 (例如 RHCP 变成 LHCP)。",
    circularToLinearNote:
      "这是打卫星时的常用策略（如果不想制作复杂的追踪圆极化天线），但会损失一半信号。",
    physicsContent:
      "对于螺旋天线 (Helical Antenna)，当螺旋周长接近一个波长时，天线工作在<strong>轴向模式 (Axial Mode)</strong>。此时，天线沿螺旋轴向辐射最强，形成特定的方向性波束 (Directional Beam)，且产生近似完美的圆极化波。本演示中的辐射方向图正是基于此模式绘制，而非侧向模式 (Normal Mode) 的全向辐射。",
    physicsQuote:
      '"The axial mode of radiation... maximum radiation is along the helix axis... The polarization is circularly polarized."',
  },

  ellipticalPolarization: {
    metaTitle: "椭圆极化 (Elliptical Polarization) | 业余无线电可视化",
    metaDescription: "3D演示极化的一般形式——椭圆极化，介于线极化和圆极化之间。",
    metaKeywords:
      "椭圆极化, elliptical polarization, 极化, polarization, 无线电传播, radio propagation",
    title: "椭圆极化 (Elliptical Polarization)",
    about:
      "本可视化演示了<b>椭圆极化 (Elliptical Polarization)</b>。这是极化的一般形式。当垂直和水平分量的幅度不同，或者相位差不是 <M>0^\\circ</M>、<M>90^\\circ</M>、<M>180^\\circ</M> 时，就会产生椭圆极化。",
    sliderNote: "通过调整下方的滑块，你可以观察不同参数对极化形状的影响：",
    linear:
      "<strong>线极化 (Linear):</strong> 相位差为 <M>0^\\circ</M> 或 <M>180^\\circ</M>。",
    circular:
      "<strong>圆极化 (Circular):</strong> 垂直与水平幅度相等且相位差为 <M>90^\\circ</M>。",
    elliptical: "<strong>椭圆极化 (Elliptical):</strong> 其他所有情况。",
    generalRulesTitle: "关于极化匹配的一般规则",
    generalRules:
      "实际上，大多数无线电信号在传播过程中都会变成某种程度的椭圆极化（由于反射、折射等）。极化失配损耗 (Polarization Mismatch Loss) 取决于两个椭圆极化波的<strong>轴比 (Axial Ratio)</strong> 和 <strong>倾角 (Tilt Angle)</strong> 的差异。",
    physicsContent:
      "椭圆极化是电磁波极化的一般形式，线极化和圆极化只是其特例。从数学上讲，它是两个正交线极化分量的叠加，且这两个分量具有任意的幅度比和相位差。<strong>轴比 (Axial Ratio, AR)</strong> 是衡量椭圆扁平程度的关键指标：<M>AR=1 (0\\text{dB})</M> 为圆极化，<M>AR=\\infty</M> 为线极化。",
    physicsQuote:
      '"In the general case, the trace of the tip of the electric field vector... forms an ellipse... The ratio of the major axis to the minor axis is called the Axial Ratio."',
  },

  verticalPolarization: {
    metaTitle: "垂直极化 (Vertical Polarization) | 业余无线电可视化",
    metaDescription: "3D演示垂直极化偶极子天线的电场传播与极化匹配原理。",
    metaKeywords:
      "垂直极化, vertical polarization, 偶极子, dipole, 垂直天线, vertical antenna, 极化损耗",
    title: "垂直极化 (Vertical Polarization)",
    about:
      "本可视化演示了来自垂直极化偶极子天线 (Dipole Antenna) 的电磁波传播。观察电场 (E-field) 矢量如何在波向外传播时上下（垂直）振荡。",
    polarization:
      "<strong>极化 (Polarization):</strong> 由电场 (E-field) 矢量的方向定义。",
    verticalDipole:
      "<strong>垂直偶极子 (Vertical Dipole):</strong> 产生垂直极化的波。",
    propagation:
      "<strong>传播 (Propagation):</strong> 在水平面 (Azimuth) 上是全向的 (Omnidirectional)。",
    vToV: "<strong>垂直发射 -> 垂直接收 (Vertical to Vertical):</strong>",
    vToVNote: "信号强度最大，无额外极化损耗。",
    vToH: "<strong>垂直发射 -> 水平接收 (Vertical to Horizontal):</strong>",
    crossPolarization: "极化隔离 (Cross-polarization)",
    vToHNote:
      "理论上接收不到任何信号 (无限大损耗)。实际上由于反射和多径效应，通常会有 <strong>-20dB 到 -30dB</strong> 的巨大损耗。",
    crossPolNote:
      "这也是为什么这两种极化方式可以复用同一频率而不容易互相干扰。",
    vToC: "<strong>垂直发射 -> 圆极化接收 (Vertical to Circular):</strong>",
    vToCNote:
      "线性极化波可以分解为两个相反旋转的圆极化波，接收天线只能接收其中一个分量，因此损失一半能量 (3dB)。尽管有损耗，但考虑到极化失配的风险，这种组合在特定情况下（如移动通信）是可以接受的。",
    physicsContent:
      "根据天线理论，垂直偶极子 (Vertical Dipole) 产生的电场只有垂直分量。其在水平面上的辐射强度是均匀的，形成全向方向图。这意味着'电场矢量'(Vertical) 与 '主辐射波瓣方向'(Horizontal Plane) 在几何上确实是正交的。",
    physicsQuote:
      '"The radiation pattern of a vertical dipole is omnidirectional in the horizontal plane... The E-field lines are vertical, parallel to the dipole axis."',
  },

  horizontalPolarization: {
    metaTitle: "水平极化 (Horizontal Polarization) | 业余无线电可视化",
    metaDescription: "3D演示水平极化偶极子天线的电场传播与极化匹配原理。",
    metaKeywords:
      "水平极化, horizontal polarization, 偶极子, dipole, 水平天线, horizontal antenna, 极化损耗",
    title: "水平极化 (Horizontal Polarization)",
    about:
      "本可视化演示了来自水平极化偶极子天线 (Horizontal Dipole Antenna) 的电磁波传播。观察电场 (E-field) 矢量如何在波向外传播时左右（水平）振荡。",
    polarization:
      "<strong>极化 (Polarization):</strong> 由电场 (E-field) 矢量的方向定义。",
    horizontalDipole:
      "<strong>水平偶极子 (Horizontal Dipole):</strong> 产生水平极化的波。",
    propagation:
      "<strong>传播 (Propagation):</strong> 虽然在垂直于导线的方向最强，但通常我们关注其相对于地面的水平特性。",
    hToH: "<strong>水平发射 -> 水平接收 (Horizontal to Horizontal):</strong>",
    hToHNote: "信号强度最大。",
    hToV: "<strong>水平发射 -> 垂直接收 (Horizontal to Vertical):</strong>",
    hToVNote:
      "巨大的信号损耗 (约 <strong>-20dB 到 -30dB</strong>)。在短波 DX (远距离通信) 中，由于电离层反射经常改变极化方向，这种影响可能不如视距通信(VHF/UHF)那么显著，但在视距通信中是致命的。",
    physicsContent:
      "水平极化偶极子天线 (Horizontal Dipole) 产生的电场矢量平行于地面。其辐射方向图在自由空间中是围绕导线的圆环 (doughnut)，但受地面反射影响，实际辐射图通常呈现为从地面向上翘起的瓣状。水平极化在HF波段 DX 通信中非常流行，部分原因是它比垂直极化受地面噪声干扰更小。",
    physicsQuote:
      '"Horizontally polarized antennas are less susceptible to man-made noise... The ground reflection factor reinforces the signal at certain takeoff angles."',
  },

  dipoleAntenna: {
    metaTitle: "偶极子天线 (Dipole Antenna) | 业余无线电可视化",
    metaDescription: "3D演示偶极子天线结构、驻波原理及辐射方向图。",
    metaKeywords:
      "偶极子天线, dipole antenna, 半波偶极子, half-wave dipole, 驻波, standing wave, 倒V天线",
    title: "偶极子天线 (Dipole Antenna)",
    overviewTitle: "关于此演示 (About this Demo)",
    overview:
      "本页面提供了<strong>偶极子天线</strong>的交互式 3D 仿真。你可以通过调整天线长度（0.5λ, 1.0λ, 1.5λ）来观察驻波分布的变化，也可以在“倒V”模式下直观地看到天线变形对辐射特性的影响。绿色网格球体显示了理想状态下的辐射方向图。",
    structure:
      "<strong>结构仿真</strong>：场景中红蓝两色的振子代表偶极子的两臂，中间白色为馈电点。黄色线条动态展示了电流驻波的分布。",
    halfWave:
      "<strong>实验建议</strong>：尝试将长度设为 standard <strong>0.5λ</strong>，观察其经典的半波偶极子特性。然后切换到 <strong>1.5λ</strong>，观察方向图的分裂。",
    principleTitle: "工作原理：驻波 (Standing Wave)",
    principle:
      "仿真中的黄色曲线展示了电流驻波的分布。注意观察电流波腹（最大值）和波节（零点）的位置变化。",
    principleDetails: {
      ends: "<strong>两端</strong>：始终是电流波节 (0)，符合物理边界条件。",
      center:
        "<strong>馈电点</strong>：在半波长时为电流波腹（最大），对应低阻抗（73Ω）；在全波长时为波节（0），对应高阻抗。",
      impedance:
        "<strong>阻抗暗示</strong>：通过观察馈电点的电流大小，可以直观推断阻抗的高低（电流大则阻抗低，电流小则阻抗高）。",
    },
    patternTitle: "辐射方向图 (Mathematical Model)",
    patternIntro:
      "绿色的 3D 网格可视化了由以下公式计算出的远场辐射强度 <M>F(\\theta)</M>。注意它是如何随着天线长度 <M>L</M> 的变化而“呼吸”的。",
    halfWaveSpecialCase:
      "半波偶极子特例 (<M>L=\\lambda/2 \\Rightarrow kL/2 = \\pi/2</M>)",
    fullWaveTitle: "为什么不用全波长偶极子？",
    fullWaveIntro: "如果你在模拟器中将长度设为 <M>1.0\\lambda</M>，你会发现：",
    fullWavePoints: {
      pattern:
        "<strong>方向图</strong>：虽然变窄了一点，但依然是 8 字形，增益略有提升。",
      impedance:
        "<strong>阻抗灾难</strong>：在中心点，全波长天线的电流为 0（波节），电压极高。这意味着输入阻抗 <strong>Z 趋近于无穷大</strong>（数千欧姆）。",
      conclusion:
        "<strong>结论</strong>：50Ω 的电台无法直接驱动全波长偶极子。如果非要用全波长，通常使用<strong>端馈</strong>（即 EFHW 的原理）或特殊的匹配网络。",
    },
    impedanceTitle: "阻抗特性",
    impedance73: "<strong>73Ω</strong>：理想自由空间中的半波偶极子。",
    impedance50:
      "<strong>50Ω</strong>：当偶极子被做成“倒V”形状（夹角 90-120度）时，阻抗会降低到 50Ω 左右，这正是倒V天线流行的原因——省去了巴伦的阻抗变换功能，只需要 1:1 巴伦做平衡-不平衡转换即可。",
    physicsContent:
      "细偶极子天线上的电流分布近似为正弦分布，两端为零点。这种驻波分布产生了向外辐射的电磁场。",
    physicsQuote:
      '"The current distribution on the antenna... is assumed to be sinusoidal... This approximation is quite accurate for thin dipoles."',
  },

  gpAntenna: {
    metaTitle: "GP天线 (Ground Plane Antenna) | 业余无线电可视化",
    metaDescription:
      "3D演示GP天线（Ground Plane）的垂直单极子结构、地网作用及辐射图。",
    metaKeywords:
      "GP天线, Ground Plane antenna, 垂直单极子, vertical monopole, 地网, radials, 1/4波长",
    title: "GP天线 (Ground Plane Antenna)",
    about:
      "GP 天线（Ground Plane，地网天线）是最基础、最常见的垂直天线。它由一根垂直的 1/4 波长振子和数根（通常 3-4 根）水平或下倾的地网（Radials）组成。",
    theoryAnalysis: "理论分析",
    theoryContent:
      "GP天线（Ground Plane）利用<strong>镜像原理</strong>，通过地网在地下产生一个虚拟的镜像振子，从而构成完整的垂直偶极子。实体的 1/4 波长振子与虚拟的下半部分相结合，实现了全尺寸天线的效率。通过调整地网下垂角度至约 135°，可以提高输入阻抗至 <strong>50Ω</strong>，完美匹配同轴电缆。其低仰角辐射特性使其成为 DX 通信的利器。",
    formulaRadiation: "辐射方向图 (理想单极子)",
    formulaImpedance: "输入阻抗匹配 (地网下垂 135°)",
    comparisonTable: {
      title: "对比表：GP天线 (垂直) vs 偶极子 (水平)",
      headers: ["特性", "GP天线 (垂直极化)", "偶极子 (水平极化)"],
      rows: [
        {
          feature: "辐射方向",
          gp: "全向 (360° 无死角)",
          dipole: "双向 (8字形)",
        },
        {
          feature: "发射仰角",
          gp: "低仰角 (DX 利器)",
          dipole: "高仰角 (适合 NVIS)",
        },
        {
          feature: "抗噪能力",
          gp: "差 (易受干扰)",
          dipole: "好 (较安静)",
        },
        {
          feature: "架设难度",
          gp: "需地网，占地小",
          dipole: "需两点支撑，占地大",
        },
      ],
    },
    physicsContent:
      "GP天线的工作依赖于镜像原理 (Image Theory)。理想导电地平面就像一面电磁镜子，在地下产生一个与地上振子电流方向相同（相位相同）的镜像。这使得 1/4 波长的单极子在远场表现得像一个 1/2 波长的偶极子。地网的作用就是模拟这个导电平面。",
    physicsQuote:
      '"The monopole above a ground plane creates an image current... The combination of the actual source and the image current produces the same fields as a dipole in the upper hemisphere."',
  },

  invertedVAntenna: {
    metaTitle: "倒V天线 (Inverted V Antenna) | 业余无线电可视化",
    metaDescription:
      "3D演示倒V天线（Inverted-V）的结构与辐射特性，解释其阻抗特性与架设优势。",
    metaKeywords:
      "倒V天线, Inverted V antenna, 偶极子, dipole, 阻抗匹配, impedance matching, 便携天线",
    title: "倒V天线 (Inverted V Antenna)",
    about:
      "倒V天线实际上就是中间架高、两端下垂的偶极子天线 (Dipole)。由于其架设简单（只需一根支撑杆），是业余无线电爱好者最常用的短波天线之一。",
    theoryAnalysis: "理论分析",
    theoryContent:
      "倒V天线（Inverted V）是“穷人的法拉利”。它的核心优势在于<strong>架设极简</strong>和<strong>天然阻抗匹配</strong>。只需一根中心支撑杆，利用重力自然下垂。当两臂夹角在 90° 到 120° 之间时，输入阻抗会从平拉偶极子的 73Ω 自然降低到约 <strong>50Ω</strong>，无需任何阻抗变换器即可直接连接同轴电缆。此外，其垂直极化分量增强了全向辐射特性，非常适合近距离 NVIS 通信。",
    formulaImpedance: "输入阻抗 (夹角 90°-120°)",
    comparisonTable: {
      title: "对比表：正V vs 倒V",
      headers: ["特性", "正V天线 (Rigid V)", "倒V天线 (Inverted V)"],
      rows: [
        {
          feature: "材质结构",
          rigid: "铝管 (硬/重)",
          inverted: "电线 (软/轻)",
        },
        {
          feature: "支撑方式",
          rigid: "旋转器 + 底座",
          inverted: "单根桅杆 (Mast)",
        },
        {
          feature: "典型用途",
          rigid: "DX (远距离)",
          inverted: "NVIS (中近) / 野外",
        },
        {
          feature: "架设成本",
          rigid: "高",
          inverted: "极低",
        },
      ],
    },
    physicsContent:
      "倒V天线 (Inverted-V) 的两臂下垂会影响其辐射阻抗和方向图。随着夹角小于 180°，输入阻抗会降低（通常降至 50Ω 附近），使其能直接匹配同轴电缆。此外，垂直辐射分量会有所增加，填充了水平偶极子两侧的零点，使方向图在全方位上更均匀。",
    physicsQuote:
      '"Dropping the ends of the dipole to form an Inverted-V lowers the resonant frequency and the feed-point impedance... somewhat more omnidirectional than a horizontal dipole."',
  },

  moxonAntenna: {
    metaTitle: "莫克森天线 (Moxon Antenna) | 业余无线电可视化",
    metaDescription:
      "3D演示莫克森天线（Moxon Rectangle）的紧凑结构，展示其高前后比和卓越的指向性。",
    metaKeywords:
      "莫克森天线, Moxon antenna, 长方形天线, 矩形天线, 高前后比, high F/B ratio",
    title: "莫克森天线 (Moxon Antenna)",
    about:
      "Moxon 矩形天线由 Les Moxon (G6XN) 推广。它是一个两单元的导线天线，元件末端向内弯曲形成矩形。",
    fbRatio:
      "<strong>卓越的前后比 (F/B):</strong> Moxon 的最大特点是其极高的前后比，能极其有效地抑制来自背后的干扰信号。",
    compact:
      "<strong>紧凑尺寸:</strong> 其跨度仅为同频段全尺寸八木的 70% 左右，非常适合空间受限的场合。",
    bandwidth:
      "<strong>宽带宽:</strong> 可以在很宽的频率范围内保持良好的驻波比。",
    applicationTitle: "应用",
    foxHunting:
      "<strong>手持测向:</strong> 由于其极好的方向性和前后比，常用于无线电测向 (Fox Hunting)。",
    limitedSpace:
      "<strong>受限空间 DX:</strong> 在阳台或屋顶空间不足以架设八木时，Moxon 是极佳的替代品。",
    physicsContent:
      "Moxon 矩形天线利用了'临界耦合'原理。通过将元件末端向内弯曲并保持特定的间距，使得有源振子与反射器之间的互感耦合增强。这种特定的几何结构产生了近乎完美的心形 (Cardioid) 辐射方向图，在保持前向增益的同时，极大程度地消除了后向辐射 (极高的 F/B 比)。",
    physicsQuote:
      '"The Moxon Rectangle is a 2-element beam with the element tips folded towards each other... maximizing the front-to-back ratio."',
    theoryAnalysis: "理论分析",
    theoryContent:
      "虽然精确的 Moxon 辐射场需要复杂的数值分析（如 NEC 建模），但其标志性的<strong>心形方向图 (Cardioid Pattern)</strong> 可以用以下简化函数近似描述：",
    formulaRadiation: "辐射方向图公式 (Mathematical Model)",
    formulaAngle:
      "其中 <M>\\theta</M> 是方位角（<M>0^\\circ</M> 为天线前方）。",
    formulaShapeFactor: "<M>A</M> 是形状因子（通常 <M>A \\approx 1.3</M>）。",
    theorySummaryTable: {
      title: "Moxon vs 八木 (2单元)",
      headers: ["特性", "Moxon 矩形天线", "2单元八木天线"],
      rows: [
        {
          feature: "尺寸",
          moxon: "小 (紧凑矩形)",
          yagi: "大 (长条形)",
        },
        {
          feature: "前后比",
          moxon: "<strong>极高 (>20dB)</strong>",
          yagi: "一般 (10-15dB)",
        },
        {
          feature: "增益",
          moxon: "中等 (~5.5 dBi)",
          yagi: "略高 (~6.0 dBi)",
        },
        {
          feature: "匹配",
          moxon: "<strong>直连 50Ω</strong>",
          yagi: "通常需要匹配网络",
        },
        {
          feature: "带宽",
          moxon: "极宽",
          yagi: "较窄",
        },
      ],
    },
  },

  positiveVAntenna: {
    metaTitle: "正V天线 (Positive V Antenna) | 业余无线电可视化",
    metaDescription:
      "3D演示正V天线（Positive V）的结构特点，展示为何它是受限空间下理想的楼顶天线。",
    metaKeywords:
      "正V天线, Positive V antenna, 偶极子, dipole, 楼顶天线, balcony antenna, 紧凑型天线",
    title: "正V天线 (Positive V Antenna)",
    about:
      '正V天线 (Positive V) 是一种两臂向上翘起的偶极子天线，形状像一个 "V" 字。这与中心高、两端低的"倒V天线" (Inverted V) 正好相反。',
    structure:
      "<strong>结构优势:</strong> 由于两端翘起，天线末端（电压波腹点）远离地面和周围物体，减少了介质损耗，也提高了安全性。",
    rotatable:
      '<strong>旋转偶极子:</strong> 在短波波段，正V结构常用于制作"旋转偶极子" (Rotatable Dipole)。V形结构减小了回转半径，使得天线更紧凑，转动惯量更小。',
    polarizationTitle: "极化与方向图",
    physicsContent:
      "正V天线 (Positive-V) 将高电压点（天线末端）抬高并远离地面或屋顶结构。这显著减少了由周围物体引起的电容效应和介质损耗，从而保持了较高的辐射效率。同时，V形结构会轻微改变远场辐射方向图，使'8字形'凹陷变浅。",
    physicsQuote:
      '"Raising the ends of the dipole in a V-shape keeps the high-voltage points away from lossy structures... minimizing ground losses."',

    // New Content
    theoryAnalysis: "理论分析",
    theoryContent:
      "正V天线本质上是一个<strong>变形的半波偶极子</strong>。通过将两臂向上折起呈 V 形（通常为 90°~120°），改变了天线的阻抗特性。直立偶极子的阻抗约为 73Ω，而正V形状利用振子间的互阻抗将辐射电阻降低至 <strong>50Ω</strong> 附近，从而实现了与常用同轴电缆的<strong>自然匹配</strong>（无需天调）。此外，V 形结构还改善了方向性，填充了原本位于天线两端的辐射盲区。",
    impedanceMathLabel: "120° 夹角时的阻抗特性",
    comparisonTable: {
      title: "对比表",
      headers: ["特性", "正V天线 (Positive V)", "倒V天线 (Inverted V)"],
      rows: [
        {
          feature: "形状",
          posV: "V (中间低，两头高)",
          invV: "∧ (中间高，两头低)",
        },
        {
          feature: "阻抗",
          posV: "~50Ω (自然匹配)",
          invV: "< 50Ω (通常需巴伦匹配)",
        },
        {
          feature: "发射角",
          posV: "低 (适合 DX 远距离)",
          invV: "高 (适合 NVIS 近距离)",
        },
        {
          feature: "架设",
          posV: "需旋转器/铝管 (刚性)",
          invV: "单支撑杆/软线 (简易)",
        },
      ],
    },
  },

  quadAntenna: {
    metaTitle: "方框天线 (Quad Antenna) | 业余无线电可视化",
    metaDescription:
      "3D演示方框天线（Quad Antenna）的回路结构，展示其高增益和低辐射仰角的特性。",
    metaKeywords:
      "方框天线, Quad antenna, 定向天线, directional antenna, DX利器, 高增益, high gain",
    title: "方框天线 (Quad Antenna)",
    about:
      "方框天线（通常指 Cubical Quad）由两个或多个方形回路元件组成。由 Clarence Moore (W9LZX) 在 1940 年代为解决高海拔电晕放电问题而发明。",
    highGain:
      "<strong>高增益:</strong> 2 单元的 Quad 天线通常相当于 3 单元的八木天线增益。",
    lowNoise:
      "<strong>低噪音:</strong> 闭合回路结构有助于减少接收时的静电噪音，听感通常比八木更安静。",
    theoryAnalysis: "理论分析",
    theoryContent:
      "全波谐振环（Full-Wave Loop）本质上是一个<strong>变形的双偶极子阵列</strong>。当环周长约为 1 个波长 (<M>\\lambda</M>) 时，环上的电流分布形成驻波，最大辐射方向垂直于框面（Broadside）。这种闭合回路结构不仅提供了比半波偶极子更高的增益（约 3.3 dBi），还因为它是直流接地的，能有效抑制降水静电噪音，使接收背景更安静。",
    formulaLoopLength: "环周长 (Loop Perimeter)",
    formulaImpedance: "输入阻抗 (单环)",
    comparisonTable: {
      title: "对比表",
      headers: ["特性", "电小环 (Small Loop)", "全波环 (Full-Wave Loop)"],
      rows: [
        {
          feature: "尺寸 (周长)",
          small: "< 0.1λ",
          full: "≈ 1.0λ",
        },
        {
          feature: "物理模型",
          small: "磁偶极子",
          full: "双偶极子阵列",
        },
        {
          feature: "辐射方向",
          small: "沿着框面 (In Plane)",
          full: "垂直框面 (Broadside)",
        },
        {
          feature: "典型应用",
          small: "接收 (磁棒天线)",
          full: "发射/DX (Quad)",
        },
      ],
    },
    physicsContent:
      "四方框天线 (Quad) 是一个全波长闭合回路，相比于半波长偶极子，它具有更有效的辐射孔径。标准的 2 单元 Quad (有源振子 + 反射器) 通过临界耦合可提供约 7dBi 的增益，相当于 3 单元八木。由于它是直流接地的闭合回路，能有效泄放雨雪静电 (Precipitation Static)，因此接收背景噪音通常比八木更低。",
    physicsQuote:
      '"The closed-loop configuration of the Quad antenna results in a lower Q and wider bandwidth... and is less susceptible to static noise."',
  },

  yagiAntenna: {
    metaTitle: "八木-宇田天线 (Yagi-Uda Antenna) | 业余无线电可视化",
    metaDescription:
      "3D演示八木天线的工作原理，展示引向器、有源振子和反射器的作用及辐射方向图。",
    metaKeywords:
      "八木天线, Yagi-Uda antenna, 定向天线, directional antenna, 引向器, director, 反射器, reflector",
    title: "八木-宇田天线 (Yagi-Uda Antenna)",
    about:
      "八木天线是由日本的八木秀次和宇田新太郎发明的。它是一种<strong>高增益、强方向性</strong>的天线，广泛用于短波通信、电视接收和雷达。",
    theoryAnalysis: "理论分析",
    principle:
      "<strong>工作原理:</strong> 通过寄生振子（反射器和引向器）与有源振子之间的互感耦合，改变电流相位，从而在单一方向叠加增强信号，在反方向抵消信号。",
    gain: "<strong>增益 (Gain):</strong> 单元越多，引向器越长，增益越高，波束越窄。",
    application:
      "<strong>应用:</strong> 最常见的 DX (远距离) 通信天线。将你的信号集中发射给远方的特定电台。",
    polarizationTitle: "极化匹配",
    polarizationMatch:
      "<strong>极化匹配:</strong> 大多数短波八木是水平安装，产生水平极化。",
    polarizationNote:
      "注意：对于本地 VHF/UHF FM 通信，通常垂直安装以匹配手台和车载台的垂直极化。",
    physicsContent:
      "八木天线的定向性源于寄生单元（反射器和引向器）上的感应电流与有源振子电流之间的<strong>相位差 (Phase Difference)</strong>。反射器通常比谐振长度略长 (呈感性)，电流滞后；引向器略短 (呈容性)，电流超前。这种相位关系导致信号在前方叠加增强，在后方抵消。本演示正是通过在各单元上设置相应的相位偏移来模拟这一物理现象。",
    physicsQuote:
      '"The phase of the current in the parasitic element depends on its length... By proper spacing and length, the radiation from the parasitic element reinforces the radiation from the driven element in the forward direction."',
    theoryTitle: "1. 概述",
    theoryContent:
      "八木天线是一个<strong>端射阵列</strong>。其核心原理是利用<strong>互感耦合</strong>在无源振子（反射器和引向器）上感应出电流。<strong>反射器</strong>略长于 1/2 波长（呈感性），电流相位滞后，从而抵消后瓣。<strong>引向器</strong>略短于 1/2 波长（呈容性），电流相位超前，从而增强前向波束。这种精妙的相位差实现了无需复杂馈电网络的高增益定向辐射。",
    formulaDriven: "有源振子长度",
    formulaReflector: "反射器长度 (通常长 5%)",
    formulaDirector: "引向器长度 (通常短 5%)",
    theorySummaryTable: {
      title: "总结表",
      headers: ["振子类型", "长度特征", "电抗性质", "电流相位", "作用"],
      rows: [
        {
          type: "<strong>反射器</strong>",
          length: "<M>\\gt \\lambda/2</M>",
          reactance: "感性 (+jX)",
          phase: "滞后",
          function: "消除后向辐射，充当“反射镜”",
        },
        {
          type: "<strong>有源振子</strong>",
          length: "<M>\\approx \\lambda/2</M>",
          reactance: "谐振 (0)",
          phase: "基准",
          function: "能量馈入点",
        },
        {
          type: "<strong>引向器</strong>",
          length: "<M>\\lt \\lambda/2</M>",
          reactance: "容性 (-jX)",
          phase: "超前",
          function: "引导波束前行，充当“透镜”",
        },
      ],
    },
  },

  endFedAntenna: {
    metaTitle: "端馈半波天线 (End-Fed Half Wave) | 业余无线电可视化",
    metaDescription:
      "3D演示端馈天线（EFHW）的便携性与多波段谐振特性，展示49:1阻抗变换器原理。",
    metaKeywords:
      "端馈天线, EFHW, End-Fed Half Wave, 49:1 balun, 便携天线, portable antenna, 多波段天线",
    title: "端馈半波天线 (End-Fed Half Wave)",
    about:
      "端馈半波天线 (EFHW) 是一种非常流行的多波段天线，特别适合野外便携架设。它本质上是一根长度为工作的一半波长的导线，一端馈电。",
    impedance:
      "<strong>阻抗变换:</strong> 由于在半波长末端馈电，阻抗极高（约 2000-4000 欧姆），因此需要一个 49:1 或 64:1 的阻抗变换器 (Unun) 将其匹配到 50 欧姆。",
    structure:
      "<strong>结构:</strong> 主要由一个 Unun 盒子、一根长振子线（Radiator）和一段同轴电缆组成。同轴电缆的屏蔽层通常充当反向地（Counterpoise）。",
    multiband:
      "<strong>多波段:</strong> 在基频的谐波频率上也能自然谐振，无需天调即可工作在多个波段（如 40m, 20m, 15m, 10m）。",
    polarizationTitle: "极化与应用",
    physicsContent:
      "端馈半波天线 (EFHW) 在谐振时，馈电点位于电压波腹（电压最大）和电流波节（电流最小）处。根据 Z=V/I，这意味着其输入阻抗极高（理论上无穷大，实际上约 2500-5000Ω）。因此必须使用高变比（如 49:1 或 64:1）的宽带阻抗变换器将其降至 50Ω。",
    physicsQuote:
      '"An end-fed half-wave antenna presents a very high impedance at the feed point... requiring a matching network (unun) to transform the high impedance down to 50 ohms."',
    theoryAnalysis: "理论分析",
    theoryVoltageFeed:
      "<strong>电压馈电 (Voltage Feed):</strong> 在导线末端馈电（高电压、低电流）会导致极高的阻抗 (<M>2000\\Omega \\sim 4000\\Omega</M>)。必须使用高变比变压器 (49:1 或 64:1) 进行匹配。",
    harmonics:
      "<strong>多波段谐振 (Harmonic Resonance):</strong> 切谐在基频 (<M>f_0</M>) 的半波长导线，在整数倍频率 (<M>2f_0, 3f_0...</M>) 上也会表现为高阻抗谐振。这使得一根线可以在多个波段 (如 40m/20m/10m) 工作而无需天调。",
    formulaRadiation: "辐射方向图公式 (谐波工作)",
    oddHarmonics: "当谐波次数 <M>n</M> 为奇数 (1, 3, 5...)：",
    evenHarmonics: "当谐波次数 <M>n</M> 为偶数 (2, 4, 6...)：",
    patternDesc:
      "随着谐波次数 <M>n</M> 的增加，原本单一的波瓣会分裂成多个花瓣，且最大辐射方向会越来越贴近导线轴线。",
    commonMode:
      "<strong>共模电流风险:</strong> 同轴电缆的屏蔽层通常充当了地网 (Counterpoise)。强烈建议加装共模扼流圈 (Choke) 以防止射频干扰 (RFI) 回流到电台。",
  },

  longWireAntenna: {
    metaTitle: "长线天线 (Long Wire Antenna) | 业余无线电可视化",
    metaDescription: "3D演示长线天线的多瓣辐射特性，展示长度与方向性的关系。",
    metaKeywords:
      "长线天线, Long Wire Antenna, 随机线天线, random wire, 多瓣方向图, multi-lobed pattern, 驻波",
    title: "长线天线 (Long Wire Antenna)",
    about:
      "长线天线是指长度至少为一个波长（通常更长）的天线。它不同于半波偶极子，其辐射方向图会随着长度的增加而变得复杂。",
    gain: "<strong>增益与方向性:</strong> 随着天线长度的增加（以波长为单位），主波束会越来越贴近导线方向，且增益会增加。",
    lobes:
      "<strong>多瓣特性:</strong> 长线天线会产生多个辐射瓣。长度越长，瓣数越多。",
    ground:
      "<strong>接地系统:</strong> 对于非谐振的长线（如 Random Wire），良好的接地是必不可少的，它是天线系统的一部分。",
    physicsContent:
      "长线天线上的电流分布通常被视为驻波（若末端开路）或行波（若末端终止）。对于末端开路的长线，其辐射方向图是典型的多瓣状。",
    physicsQuote:
      '"As the wire is made longer, the major lobes of radiation align more closely with the wire... creating a directional effect along the wire axis."',
    theoryTitle: "理论分析 (Theoretical Analysis)",
    theoryDesc:
      "长线天线，特别是在多个波长下工作时，会表现出由沿导线的驻波分布决定的复杂辐射图。",
    theoryFormulaIntro:
      "对于长度为 L 且包含奇数个半波长（<M>n</M> 为奇数）的驻波长线天线，归一化的电场辐射方向图 <M>E(\\theta)</M> 由下式给出：",
    theoryFormulaExpl:
      "其中 <M>\\theta</M> 是相对于导线轴的夹角。在我们的仿真中，导线长度模型为 <M>L = 2.5\\lambda</M>，对应于：",
    theoryResult:
      "由于 <M>n=5</M> 是奇数，当 <M>\\theta = 90^\\circ</M> 时，项 <M>\\cos(\\frac{5\\pi}{2} \\cos \\theta)</M> 变为 <M>\\cos(0) = 1</M>。这解释了为什么会存在垂直于导线的宽边波瓣，这是奇次谐波驻波天线的一个显著特征。",
  },

  windomAntenna: {
    metaTitle: "温顿天线 (Windom Antenna) | 业余无线电可视化",
    metaDescription:
      "3D演示温顿天线(OCFD)的偏馈结构、匹配原理及多波段工作特性。",
    metaKeywords:
      "温顿天线, Windom antenna, OCFD, 偏馈偶极子, Off-Center Fed Dipole, 4:1 balun, 多波段天线",
    title: "温顿天线 (Windom / OCFD)",
    overviewTitle: "关于此演示 (About this Demo)",
    overview:
      "本页面演示了<strong>温顿天线 (Windom)</strong>，也称为<strong>偏馈偶极子 (OCFD)</strong>。通过将馈电点从中心移开，我们在不损失太多效率的情况下获得了多波段工作的能力。场景中的不对称结构正是其核心特征。",
    structure:
      "<strong>结构仿真</strong>：馈电点（白色盒子）位于天线总长度的约 <strong>33%</strong> 处。这种“偏心”设计彻底改变了天线的阻抗分布。",
    principleTitle: "为什么是 33% 处？ (The Magic Point)",
    principleIntro:
      "如果我们观察不同频率下的电流驻波分布（黄色曲线），会发现 1/3 处是一个神奇的位置：",
    principlePoints: {
      fundamental: "<strong>基频 (n=1)</strong>：电流适中，阻抗约 200-300Ω。",
      harmonics2:
        "<strong>二次谐波 (n=2)</strong>：中心是电流波节（阻抗无穷大），但在 1/3 处电流依然适中（阻抗约 200-300Ω）。",
      harmonics4:
        "<strong>四次谐波 (n=4)</strong>：1/3 处依然保持适中的电流和阻抗。",
    },
    principleConclusion:
      "<strong>结论</strong>：仅需一个馈电点，就能在 40m, 20m, 10m 等偶数倍频波段获得相似的阻抗。",
    matchingTitle: "匹配系统：4:1 巴伦",
    matchingIntro:
      "由于馈电点阻抗（~200-300Ω）远高于 50Ω 同轴电缆，我们需要进行阻抗变换：",
    matchingConclusion:
      "因此，温顿天线必须搭配一个 <strong>4:1 电流型巴伦</strong>。这与 EFHW 使用的 49:1 变压器完全不同。",
    patternTitle: "辐射方向图",
    patternIntro:
      "辐射方向图（绿色网格）主要由天线的<strong>物理总长度</strong>决定。在基频下，它与普通偶极子非常相似（呈8字形）。在高次谐波下，它会分裂成多个花瓣。",
    patternPoints: {
      fundamental: "<strong>基频</strong>：变形的“8”字，与偶极子类似。",
      harmonic: "<strong>谐波</strong>：呈多瓣状，指向性增强。",
    },
    comparisonTitle: "温顿 vs EFHW vs 偶极子",
    tableHead: {
      feature: "特性",
      dipole: "偶极子 (Dipole)",
      windom: "温顿 (OCFD)",
      efhw: "端馈 (EFHW)",
    },
    tableRow: {
      feedPos: "馈电位置",
      multiBand: "多波段能力",
      match: "匹配设备",
      ground: "接地需求",
      cons: "缺点",
    },
    tableCell: {
      dipoleFeed: "中心 (50%)",
      windomFeed: "偏心 (33%)",
      efhwFeed: "端点 (0%)",
      dipoleBand: "差 (仅基频+3倍频)",
      windomBand: "良 (基频+偶次谐波)",
      efhwBand: "优 (基频+所有谐波)",
      dipoleMatch: "1:1 巴伦 (可选)",
      windomMatch: "4:1 巴伦 (必须)",
      efhwMatch: "49:1 变压器 (必须)",
      dipoleGround: "不需要",
      windomGround: "推荐 (防共模)",
      efhwGround: "必须 (依赖电缆地网)",
      dipoleCons: "单波段",
      windomCons: "谐波有缺口",
      efhwCons: "变压器损耗大",
    },
    comparisonSummary:
      "<strong>总结</strong>：温顿天线是效率与便利性的折中。它的效率通常高于 EFHW，但对防共模干扰的要求更高。",
    misconceptionTitle: "常见误区",
    misconceptionIntro:
      "很多初学者误以为移动馈电点会让方向图“歪向一边”，这是<strong>错误</strong>的。",
    misconceptionPhysicsTitle: "物理定式 (Physics Rules)",
    misconceptionPhysics:
      "驻波形状由<strong>导线总长度</strong>和<strong>频率</strong>决定。无论从哪里馈电，电流在两端都必须为零。因此，驻波形状不变，辐射方向图也不变。",
    misconceptionFeedTitle: "馈电点的作用",
    misconceptionFeed: "移动馈电点只是在<strong>选择阻抗</strong>：",
    misconceptionFeedLow: "波腹馈电 = 低阻抗 (偶极子)",
    misconceptionFeedHigh: "波节馈电 = 高阻抗 (端馈)",
    misconceptionFeedMid: "中间馈电 = 中等阻抗 (温顿)",
    misconceptionConclusion: "馈电点决定 SWR，不决定方向图。",
    misconceptionExTitle: "现实中的例外",
    misconceptionEx:
      "如果巴伦性能不佳导致共模电流，馈线会参与辐射，这<strong>确实</strong>会导致方向图畸变。",
    polarizationTitle: "极化特性 (Polarization)",
    polarizationIntro:
      "温顿天线是<strong>线极化 (Linear Polarization)</strong> 天线，通常表现为水平线极化。它<strong>不是</strong>椭圆极化或圆极化。",
    polarizationReason1Title: "1. 物理结构决定",
    polarizationReason1:
      "椭圆极化需要两个垂直且有相位差的电场分量（如螺旋天线）。温顿本质上是一根单导线，电场矢量始终平行于导线振动。",
    polarizationReason2Title: "2. 架设方式影响",
    polarizationReason2List: {
      horizontal: "<strong>水平架设</strong>：产生纯粹的水平极化。",
      invertedV:
        "<strong>倒V架设</strong>：依然是线极化。但倾斜的振子引入了垂直分量，填补了原本的轴向盲区（填充因子 δ ≈ 0.2），使方向图更接近全向（胖花生形）。",
      sloper:
        "<strong>倾斜架设 (Sloper)</strong>：产生斜线极化，电场矢量沿斜线振动，而非旋转。",
    },
    polarizationExceptionTitle: "3. 唯一的例外 (干扰)",
    polarizationException:
      "只有在<strong>共模干扰</strong>严重时（巴伦失效，馈线辐射），垂直的馈线波与水平的天线波混合，才可能导致极化状态混乱。但这属于<strong>信号畸变</strong>，而非设计特性。",
    physicsContent:
      "温顿天线利用了导线上特定位置（约离中心17%处，即全长33%处）在多个谐波频率下阻抗近似相等的特性。这使得单一馈电点配合4:1巴伦即可实现多波段工作。",
    physicsQuote:
      '"By moving the feed point to an off-center position... the antenna impedance at the feed point can be made manageable on multiple harmonic bands."',
  },
  hb9cvAntenna: {
    title: "HB9CV 天线",
    metaTitle: "HB9CV 天线 3D 可视化 - 相控阵列原理",
    metaDescription:
      "HB9CV 天线交互式 3D 可视化。探索其独特的相位原理、心形辐射方向图以及高前后比特性。",
    metaKeywords: "HB9CV 天线, 相控阵列, 定向天线, 业余无线电, 3D 仿真",
    about:
      "HB9CV 天线是由瑞士无线电爱好者 Rudolf Baumgartner (HB9CV) 在 1950 年代设计的经典 2 单元相控阵列天线。不同于只有一个有源振子的八木天线，HB9CV 的两个单元都是有源驱动的。它们以相等的幅度但特定的相位差进行馈电，从而在非常短的动臂长度下实现了卓越的增益和惊人的前后比。",
    structureTitle: "结构",
    structureContent:
      "该天线由两个有源振子组成，间距约为 1/8 波长。一条相位线（通常为 Z 形）连接两个元件，引入特定的相移。这种配置确保了辐射在后方相互抵消，而在前方相互增强。",
    phaseTitle: "相位原理",
    phaseContent: "HB9CV 性能的关键在于相位关系：",
    phaseFront: "空间相移（由于距离） + 传输线相移",
    phaseRear: "总相位差导致后方辐射抵消。",
    formulaTitle: "辐射方向图公式",
    formulaIntro: "HB9CV 的阵列因子可以通过两个具有相位差的源的叠加来近似：",
    afDef: "其中 k 是波数，d 是间距，θ 是角度，δ 是相位差。",
    paramK: "k = 2π/λ",
    paramD: "d ≈ λ/8 (45°)",
    paramDelta: "δ ≈ 225° (5π/4)",
    patternTitle: "辐射方向图",
    patternContent:
      "45° 的空间分离和 225° 的电相位偏移相结合，产生了心形方向图，在背面有一个深深的零点。",
    comparisonTitle: "对比：HB9CV vs 八木 (2单元)",
    comparisonTable: {
      headers: { feature: "特性", hb9cv: "HB9CV", yagi: "八木 (2单元)" },
      rows: {
        gain: {
          feature: "增益",
          hb9cv: "更高的 (~4-5 dBd)",
          yagi: "较低 (~3-4 dBd)",
        },
        fbRatio: {
          feature: "前后比",
          hb9cv: "优秀 (20-30 dB)",
          yagi: "一般 (10-15 dB)",
        },
        bandwidth: { feature: "带宽", hb9cv: "较宽", yagi: "较窄" },
        feed: {
          feature: "馈电系统",
          hb9cv: "需要相位线",
          yagi: "简单偶极子馈电",
        },
      },
    },
    physicsContent:
      "HB9CV 展示了相控阵列的原理：通过控制每个单元的相位来实现波束赋形，而无需无源寄生元件。",
    physicsQuote: "相控阵列是现代雷达和波束赋形系统的基础。",
  },
  magneticLoopAntenna: {
    metaTitle: "磁环天线 (Magnetic Loop) | 业余无线电可视化",
    metaDescription:
      "磁环天线（小环天线）3D交互演示。探索其高Q值、窄带宽及独特的抗干扰深零点特性。",
    metaKeywords:
      "磁环天线, 小环天线, magnetic loop, small loop, 高Q值, 抗干扰, 窄带天线",
    title: "磁环天线 (Magnetic Loop)",
    overviewTitle: "关于此演示",
    overview:
      "本页面展示了<strong>磁环天线 (Magnetic Loop)</strong>，也称为小环天线。它是一种电尺寸极小（周长 <M>C \\lt \\lambda/10</M>）的天线。",
    structure:
      "<strong>结构:</strong> 通常是一个垂直架设的单匝或多匝线圈，顶部或底部串联一个可变电容进行调谐。常用的馈电方式是使用一个更小的耦合环。",
    features:
      "<strong>特点:</strong> 效率较低，但具有极高的 Q 值和极窄的带宽。最著名的特点是其卓越的抗干扰能力。",
    physicsModelTitle: "物理模型：磁偶极子",
    physicsModel:
      "小环天线在物理上等效于一个<strong>磁偶极子</strong>。由于尺寸远小于波长，假设环上的电流 <M>I</M> 是均匀分布的（这与偶极子天线不同）。",
    fieldFormulaTitle: "远场电场公式",
    fieldFormulaDesc: "球坐标系下的远场电场分量 <M>E_\\phi</M> 为：",
    paramEta: "<M>\\eta \\approx 377\\Omega</M> (波阻抗)",
    paramK: "<M>k = 2\\pi/\\lambda</M> (波数)",
    paramI: "<M>I</M> 为环电流",
    paramA: "<M>A</M> 为环面积",
    paramTheta: "<M>\\theta</M> 为相对于环轴线 (Z轴) 的夹角",
    patternTitle: "辐射方向图",
    patternDesc: "方向性函数为 <M>F(\\theta) = \\sin\\theta</M>。",
    patternNull:
      "<strong>零点 (Nulls):</strong> 沿环轴线方向（垂直于环面），辐射为零。",
    patternMax:
      "<strong>最大值 (Max):</strong> 在环面方向（侧面看环是一条线），辐射最大。",
    advantageTitle: "深零点抗干扰",
    advantageDesc:
      "磁环天线最值钱的特性是其拥有极深的零点。通过旋转天线，将干扰源置于轴线方向（零点），通常可将噪音降低 20-30dB。",
    physicsContent:
      "磁环天线在近场主要辐射磁场分量。在远场，其电场分量是水平的（<M>\\phi</M> 方向），其辐射方向图呈甜甜圈状，零点位于轴线上。",
    physicsQuote:
      '"The small loop antenna is equivalent to a magnetic dipole... it has a null along its axis and maximum radiation in the plane of the loop."',
  },
  electromagneticPropagation: {
    metaTitle: "电磁波传播 (Electromagnetic Propagation) | 业余无线电可视化",
    metaDescription:
      "3D演示电磁波在不同频段（HF/UV）的传播特性，展示地波、天波及电离层反射原理。",
    metaKeywords:
      "电磁波传播, electromagnetic propagation, 地波, ground wave, 天波, sky wave, 电离层反射, ionosphere hop",
    title: "电磁波传播 (Electromagnetic Propagation)",
    hudTitle: "无线电仿真系统",
    systemStatus: {
      online: "系统：在线",
      ionosphereStable: "电离层：稳定",
      transmissionActive: "传输状态：活跃",
    },
    geoInfo: {
      latitude: "纬度",
      longitude: "经度",
      altitude: "海拔",
    },
    controls: {
      title: "主控制台",
      mode: {
        hf: "HF 短波",
        uv: "UV 视距",
      },
      frequency: "发射频率",
      elevation: "发射仰角",
      ionosphereHeight: "电离层高度",
    },
    metrics: {
      snr: "信噪比",
      ber: "误码率",
    },
    legend: {
      title: "信号诊断",
      groundWave: "地波 (表面波)",
      skyWave: "天波 (反射)",
      scatter: "次级散射",
    },
  },
} satisfies Record<string, unknown>;
