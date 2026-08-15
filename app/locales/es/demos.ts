export default {
  subtitle: "Visualización de teoría de antenas",
  loading: "Cargando escena 3D...",
  aboutTitle: "Acerca de esta demostración",
  polarizationMatch: "Coincidencia de polarización y pérdidas",
  polarizationTitle: "Características y aplicaciones de la polarización",
  physicsValidation: "Validación física",

  circularPolarization: {
    metaTitle: "Polarización circular | Visualización de radioafición",
    metaDescription:
      "Demostración 3D de la propagación de ondas con polarización circular, incluyendo RHCP y LHCP.",
    metaKeywords:
      "polarización circular, RHCP, LHCP, antena helicoidal, comunicación por satélite",
    title: "Polarización circular",
    about:
      "Esta visualización demuestra la propagación de ondas electromagnéticas con <b>polarización circular</b>. En este modo de polarización, el vector de campo eléctrico gira a medida que la onda se propaga, trazando una forma helicoidal.",
    rhcp: "<strong>Polarización circular a derechas (RHCP):</strong> El vector de campo eléctrico gira en sentido horario a lo largo de la dirección de propagación (siguiendo la regla de la mano derecha).",
    lhcp: "<strong>Polarización circular a izquierdas (LHCP):</strong> El vector de campo eléctrico gira en sentido antihorario a lo largo de la dirección de propagación.",
    application:
      "<strong>Aplicación:</strong> La polarización circular se utiliza ampliamente en las <b>comunicaciones por satélite</b> porque resiste la rotación de Faraday (el cambio del plano de polarización cuando las señales atraviesan la ionosfera) y no requiere una alineación precisa entre las antenas transmisora y receptora.",
    matchRhcpToRhcp: "<strong>Transmisión RHCP -> Recepción RHCP:</strong>",
    matchRhcpToLhcp:
      "<strong>Transmisión RHCP -> Recepción LHCP (polarización cruzada):</strong>",
    matchCircularToLinear:
      "<strong>Transmisión circular -> Recepción lineal (V/H):</strong>",
    bestMatch: "Coincidencia óptima",
    highLoss: "Pérdida alta",
    loss3db: "Pérdida de 3dB",
    rhcpToLhcpNote:
      "Pérdida teóricamente infinita; en la práctica, normalmente >20dB.",
    reflectionNote:
      "Nota: Cuando las señales con polarización circular se reflejan en una superficie, su sentido de giro suele invertirse (p. ej., RHCP se convierte en LHCP).",
    circularToLinearNote:
      "Esta es una estrategia habitual para trabajar satélites (si no se desea construir complejas antenas de polarización circular con seguimiento), pero se pierde la mitad de la señal.",
    physicsContent:
      "En las antenas helicoidales, cuando la circunferencia de la hélice se aproxima a una longitud de onda, la antena opera en <strong>modo axial</strong>. La antena radia intensamente a lo largo del eje de la hélice, formando un haz direccional con una polarización circular casi perfecta.",
    physicsQuote:
      '"El modo axial de radiación... la radiación máxima se produce a lo largo del eje de la hélice... La polarización es circular."',
  },

  ellipticalPolarization: {
    metaTitle: "Polarización elíptica | Visualización de radioafición",
    metaDescription:
      "Demostración 3D de la forma general de polarización: la polarización elíptica, entre la lineal y la circular.",
    metaKeywords: "polarización elíptica, polarización, propagación de radio",
    title: "Polarización elíptica",
    about:
      "Esta visualización demuestra la <b>polarización elíptica</b>. Es la forma general de polarización. Cuando las componentes vertical y horizontal tienen amplitudes diferentes, o la diferencia de fase no es <M>0^\\circ</M>, <M>90^\\circ</M> ni <M>180^\\circ</M>, el resultado es una polarización elíptica.",
    sliderNote:
      "Ajusta los controles deslizantes de abajo para observar cómo los distintos parámetros afectan a la forma de la polarización:",
    linear:
      "<strong>Polarización lineal:</strong> La diferencia de fase es <M>0^\\circ</M> o <M>180^\\circ</M>.",
    circular:
      "<strong>Polarización circular:</strong> Amplitudes V/H iguales con una diferencia de fase de <M>90^\\circ</M>.",
    elliptical:
      "<strong>Polarización elíptica:</strong> Todos los demás casos.",
    generalRulesTitle: "Reglas generales para la coincidencia de polarización",
    generalRules:
      "En la práctica, la mayoría de las señales de radio adquieren cierta polarización elíptica durante la propagación (debido a reflexiones, refracción, etc.). La pérdida por desadaptación de polarización depende de las diferencias de <strong>relación axial</strong> y <strong>ángulo de inclinación</strong> entre las dos ondas con polarización elíptica.",
    physicsContent:
      "La polarización elíptica es la forma general de polarización de las ondas electromagnéticas; la lineal y la circular son casos particulares. Matemáticamente, es la superposición de dos componentes ortogonales con polarización lineal, con una relación de amplitudes y una diferencia de fase arbitrarias. La <strong>relación axial (AR)</strong> mide el achatamiento de la elipse: <M>AR=1 (0\\text{dB})</M> es circular, <M>AR=\\infty</M> es lineal.",
    physicsQuote:
      '"En el caso general, la traza de la punta del vector de campo eléctrico... forma una elipse... La relación entre el eje mayor y el eje menor se denomina relación axial."',
  },

  verticalPolarization: {
    metaTitle: "Polarización vertical | Visualización de radioafición",
    metaDescription:
      "Demostración 3D de la propagación del campo eléctrico de una antena dipolo con polarización vertical y de los principios de coincidencia de polarización.",
    metaKeywords:
      "polarización vertical, dipolo, antena vertical, pérdida de polarización",
    title: "Polarización vertical",
    about:
      "Esta visualización demuestra la propagación de ondas electromagnéticas desde una antena dipolo con polarización vertical. Observa cómo el vector de campo E oscila hacia arriba y hacia abajo (verticalmente) a medida que la onda se propaga hacia afuera.",
    polarization:
      "<strong>Polarización:</strong> Definida por la dirección del vector de campo E.",
    verticalDipole:
      "<strong>Dipolo vertical:</strong> Produce ondas con polarización vertical.",
    propagation:
      "<strong>Propagación:</strong> Omnidireccional en el plano horizontal (acimut).",
    vToV: "<strong>TX vertical -> RX vertical:</strong>",
    vToVNote: "Máxima intensidad de señal, sin pérdida de polarización.",
    vToH: "<strong>TX vertical -> RX horizontal:</strong>",
    crossPolarization: "Aislamiento de polarización cruzada",
    vToHNote:
      "Teóricamente no se recibe señal (pérdida infinita). En la práctica, la pérdida suele ser de <strong>-20dB a -30dB</strong> debido a las reflexiones y al multitrayecto.",
    crossPolNote:
      "Por eso estas dos polarizaciones pueden compartir la misma frecuencia sin interferencias significativas.",
    vToC: "<strong>TX vertical -> RX circular:</strong>",
    vToCNote:
      "Una onda lineal puede descomponerse en dos ondas circulares que giran en sentidos opuestos; la antena receptora solo capta una componente y pierde la mitad de la potencia (3dB). A pesar de la pérdida, esta combinación es aceptable en ciertos escenarios (p. ej., comunicaciones móviles).",
    physicsContent:
      'Según la teoría de antenas, un dipolo vertical produce un campo E con únicamente componente vertical. Su intensidad de radiación es uniforme en el plano horizontal, formando un diagrama omnidireccional. Esto significa que el "vector de campo E" (vertical) es geométricamente ortogonal a la "dirección del lóbulo principal de radiación" (plano horizontal).',
    physicsQuote:
      '"El diagrama de radiación de un dipolo vertical es omnidireccional en el plano horizontal... Las líneas de campo E son verticales, paralelas al eje del dipolo."',
  },

  horizontalPolarization: {
    metaTitle: "Polarización horizontal | Visualización de radioafición",
    metaDescription:
      "Demostración 3D de la propagación del campo eléctrico de una antena dipolo con polarización horizontal y de los principios de coincidencia de polarización.",
    metaKeywords:
      "polarización horizontal, dipolo, antena horizontal, pérdida de polarización",
    title: "Polarización horizontal",
    about:
      "Esta visualización demuestra la propagación de ondas electromagnéticas desde una antena dipolo con polarización horizontal. Observa cómo el vector de campo E oscila de izquierda a derecha (horizontalmente) a medida que la onda se propaga.",
    polarization:
      "<strong>Polarización:</strong> Definida por la dirección del vector de campo E.",
    horizontalDipole:
      "<strong>Dipolo horizontal:</strong> Produce ondas con polarización horizontal.",
    propagation:
      "<strong>Propagación:</strong> Más intensa en la dirección perpendicular al hilo, pero normalmente nos centramos en sus características horizontales respecto al suelo.",
    hToH: "<strong>TX horizontal -> RX horizontal:</strong>",
    hToHNote: "Máxima intensidad de señal.",
    hToV: "<strong>TX horizontal -> RX vertical:</strong>",
    hToVNote:
      "Enorme pérdida de señal (aproximadamente <strong>-20dB a -30dB</strong>). En DX de HF, la reflexión ionosférica suele cambiar la polarización, por lo que este efecto es menos severo que en los enlaces de línea de vista de VHF/UHF, donde resulta crítico.",
    physicsContent:
      "Una antena dipolo horizontal produce un vector de campo E paralelo al suelo. Su diagrama de radiación en el espacio libre es un toroide alrededor del hilo, pero la reflexión en el suelo suele crear lóbulos inclinados hacia arriba. La polarización horizontal es popular para DX en HF porque es menos susceptible al ruido del suelo que la polarización vertical.",
    physicsQuote:
      '"Las antenas con polarización horizontal son menos susceptibles al ruido artificial... El factor de reflexión del suelo refuerza la señal en ciertos ángulos de despegue."',
  },

  dipoleAntenna: {
    metaTitle: "Antena dipolo | Visualización de radioafición",
    metaDescription:
      "Visualización 3D de la estructura de la antena dipolo, el principio de la onda estacionaria y el diagrama de radiación.",
    metaKeywords:
      "antena dipolo, media onda, onda estacionaria, diagrama de radiación, V invertida",
    title: "Antena dipolo",
    overviewTitle: "Acerca de esta demostración",
    overview:
      "Esta página ofrece una simulación 3D interactiva de una <strong>antena dipolo</strong>. Puedes ajustar la longitud de la antena (0.5λ, 1.0λ, 1.5λ) para observar los cambios en la distribución de la onda estacionaria, o activar el modo 'V invertida' para ver cómo la deformación afecta a la radiación.",
    structure:
      "<strong>Simulación de la estructura</strong>: Los cilindros rojo y azul representan los brazos del dipolo, con un punto de alimentación blanco en el centro. La línea amarilla visualiza dinámicamente la onda estacionaria de corriente.",
    halfWave:
      "<strong>Prueba esto</strong>: Ajusta la longitud al valor estándar de <strong>0.5λ</strong> para ver las características clásicas del dipolo de media onda. Después cambia a <strong>1.5λ</strong> para observar la división del diagrama.",
    principleTitle: "Principio de funcionamiento: la onda estacionaria",
    principle:
      "La curva amarilla de la simulación muestra la distribución de la onda estacionaria de corriente. Observa la posición de los vientres (máximos) y los nodos (ceros) de corriente.",
    principleDetails: {
      ends: "<strong>Extremos:</strong> Siempre son nodos de corriente (0), cumpliendo las condiciones físicas de contorno.",
      center:
        "<strong>Punto de alimentación:</strong> Vientre de corriente (máximo) en media onda, lo que corresponde a una impedancia baja (73Ω); nodo (0) en onda completa, lo que significa una impedancia alta.",
      impedance:
        "<strong>Pista sobre la impedancia:</strong> Observando la magnitud de la corriente en el punto de alimentación puedes inferir intuitivamente la impedancia (corriente alta = Z baja, corriente baja = Z alta).",
    },
    patternTitle: "Fórmula del diagrama de radiación (modelo matemático)",
    patternIntro:
      "La malla 3D verde visualiza la intensidad de radiación en campo lejano <M>F(\\theta)</M> calculada con la fórmula de abajo. Fíjate en cómo 'respira' al cambiar la longitud <M>L</M>.",
    halfWaveSpecialCase:
      "Caso particular del dipolo de media onda (<M>L=\\lambda/2 \\Rightarrow kL/2 = \\pi/2</M>)",
    fullWaveTitle: "¿Por qué no un dipolo de onda completa?",
    fullWaveIntro:
      "Si ajustas la longitud a <M>1.0\\lambda</M> en el simulador:",
    fullWavePoints: {
      pattern:
        "<strong>Diagrama:</strong> Más estrecho pero todavía en forma de 8, con una ganancia ligeramente mayor.",
      impedance:
        "<strong>Desastre de impedancia:</strong> En el centro, la corriente es 0 (nodo). Esto implica que la impedancia de entrada <strong>Z tiende a infinito</strong> (miles de ohmios).",
      conclusion:
        "<strong>Conclusión:</strong> Un equipo de 50Ω no puede alimentar directamente un dipolo de onda completa. Requiere alimentación por el extremo (EFHW) o una adaptación especial.",
    },
    impedanceTitle: "Características de impedancia",
    impedance73:
      "<strong>73Ω:</strong> Dipolo de media onda en el espacio libre.",
    impedance50:
      "<strong>50Ω:</strong> Al montarlo en 'V invertida' (ángulo de 90-120°), la impedancia baja a ~50Ω, lo que permite la conexión directa del coaxial sin transformador balun (aun así se recomienda un balun 1:1 por equilibrio).",
    physicsContent:
      "La distribución de corriente en una antena dipolo delgada es aproximadamente sinusoidal, con nulos en los extremos. Esta distribución de onda estacionaria genera la radiación del campo electromagnético.",
    physicsQuote:
      '"Se supone que la distribución de corriente en la antena... es sinusoidal... Esta aproximación es bastante precisa para dipolos delgados."',
  },

  gpAntenna: {
    metaTitle: "Antena de plano de tierra | Visualización de radioafición",
    metaDescription:
      "Demostración 3D de la estructura de monopolo vertical de la antena GP, la función de los radiales y el diagrama de radiación.",
    metaKeywords:
      "antena GP, antena Ground Plane, monopolo vertical, radiales, cuarto de longitud de onda",
    title: "Antena de plano de tierra",
    about:
      "La antena GP (Ground Plane) es la antena vertical más básica y común. Consta de un radiador vertical de un cuarto de longitud de onda y varios radiales (normalmente 3-4) horizontales o inclinados hacia abajo.",
    theoryAnalysis: "Análisis teórico",
    theoryContent:
      "La antena GP (Ground Plane) se basa en la <strong>teoría de imágenes</strong>. El plano de tierra (los radiales) actúa como un espejo electromagnético, creando una imagen virtual del radiador bajo tierra para formar un dipolo vertical completo. La combinación del radiador físico de 1/4 de onda y la imagen virtual logra la eficiencia de una antena de tamaño completo. Inclinar los radiales hacia abajo hasta ~135° eleva la impedancia del punto de alimentación a <strong>50Ω</strong> para una adaptación perfecta con el cable coaxial. Su bajo ángulo de despegue la convierte en una herramienta formidable para la comunicación DX.",
    formulaRadiation: "Diagrama de radiación (monopolo ideal)",
    formulaImpedance: "Adaptación de impedancia (radiales a 135°)",
    comparisonTable: {
      title: "Comparación: GP (vertical) vs dipolo (horizontal)",
      headers: [
        "Característica",
        "Antena GP (vertical)",
        "Dipolo (horizontal)",
      ],
      rows: [
        {
          feature: "Direccionalidad",
          gp: "Omnidireccional (360°)",
          dipole: "Bidireccional (en forma de 8)",
        },
        {
          feature: "Ángulo de despegue",
          gp: "Bajo (bueno para DX)",
          dipole: "Alto (bueno para NVIS)",
        },
        {
          feature: "Nivel de ruido",
          gp: "Alto (propensa al ruido)",
          dipole: "Bajo (más silenciosa)",
        },
        {
          feature: "Instalación",
          gp: "Huella reducida",
          dipole: "Requiere un gran vano",
        },
      ],
    },
    physicsContent:
      "El funcionamiento de una antena GP depende de la teoría de imágenes. Un plano de tierra perfectamente conductor actúa como un espejo electromagnético, creando bajo tierra una imagen con la misma dirección de corriente (en fase) que el radiador vertical superior. Esto hace que un monopolo de 1/4 de onda sea equivalente en campo lejano a un dipolo de 1/2 onda. Los radiales simulan este plano conductor.",
    physicsQuote:
      '"El monopolo sobre un plano de tierra crea una corriente imagen... La combinación de la fuente real y la corriente imagen produce los mismos campos que un dipolo en el hemisferio superior."',
  },

  invertedVAntenna: {
    metaTitle: "Antena V invertida | Visualización de radioafición",
    metaDescription:
      "Demostración 3D de la estructura y las características de radiación de la antena V invertida, explicando su impedancia y sus ventajas de instalación.",
    metaKeywords:
      "antena V invertida, dipolo, adaptación de impedancia, antena portable",
    title: "Antena V invertida",
    about:
      "La V invertida es esencialmente un dipolo con el centro elevado y los extremos caídos. Su instalación sencilla (solo necesita un mástil de apoyo) la convierte en una de las antenas de HF más populares entre los radioaficionados.",
    theoryAnalysis: "Análisis teórico",
    theoryContent:
      'La V invertida es el "Ferrari de los pobres". Sus ventajas principales son su <strong>extrema sencillez</strong> y su <strong>adaptación natural de impedancia</strong>. Al requerir un solo mástil central, los hilos descienden de forma natural. Cuando el ángulo del vértice está entre 90° y 120°, la impedancia del punto de alimentación baja de los 73Ω del dipolo a aproximadamente <strong>50Ω</strong>, lo que permite la conexión directa al cable coaxial sin unidades de adaptación. Además, su componente de polarización vertical refuerza la radiación omnidireccional, haciéndola excelente para NVIS.',
    formulaImpedance: "Impedancia de entrada (ángulo de 90°-120°)",
    comparisonTable: {
      title: "Comparación: V rígida vs V invertida",
      headers: [
        "Característica",
        "V positiva (rígida)",
        "V invertida (de hilo)",
      ],
      rows: [
        {
          feature: "Material",
          rigid: "Tubo de aluminio",
          inverted: "Hilo",
        },
        {
          feature: "Soporte",
          rigid: "Rotor + soporte",
          inverted: "Un solo mástil",
        },
        {
          feature: "Aplicación",
          rigid: "DX (larga distancia)",
          inverted: "NVIS (regional) / portable",
        },
        {
          feature: "Coste",
          rigid: "Alto",
          inverted: "Muy bajo",
        },
      ],
    },
    physicsContent:
      "Dejar caer los extremos del dipolo para formar una V invertida afecta tanto a su impedancia como a su diagrama de radiación. A medida que el ángulo comprendido se hace menor de 180°, la impedancia de entrada disminuye (típicamente hasta cerca de 50Ω), proporcionando una mejor adaptación al coaxial. La radiación con polarización vertical aumenta, rellenando los nulos en los extremos del dipolo y haciendo el diagrama más omnidireccional.",
    physicsQuote:
      '"Dejar caer los extremos del dipolo para formar una V invertida reduce la frecuencia de resonancia y la impedancia del punto de alimentación... algo más omnidireccional que un dipolo horizontal."',
  },

  moxonAntenna: {
    metaTitle: "Antena Moxon | Visualización de radioafición",
    metaDescription:
      "Demostración 3D de la estructura compacta del rectángulo Moxon, mostrando su alta relación frente-espalda y su excelente directividad.",
    metaKeywords: "antena Moxon, antena rectangular, alta relación F/B",
    title: "Antena Moxon",
    about:
      "El rectángulo Moxon fue popularizado por Les Moxon (G6XN). Es una antena de hilo de dos elementos con las puntas de los elementos dobladas hacia adentro para formar un rectángulo.",
    fbRatio:
      "<strong>Excelente relación F/B:</strong> La característica principal de la Moxon es su altísima relación frente-espalda, que suprime eficazmente las interferencias procedentes de la parte trasera.",
    compact:
      "<strong>Tamaño compacto:</strong> Su envergadura es de aproximadamente el 70% de la de una Yagi de tamaño completo para la misma frecuencia, ideal para ubicaciones con espacio limitado.",
    bandwidth:
      "<strong>Gran ancho de banda:</strong> Mantiene una buena ROE en un amplio rango de frecuencias.",
    applicationTitle: "Aplicaciones",
    foxHunting:
      "<strong>Radiogoniometría:</strong> Su excelente directividad y relación F/B la hacen popular para la caza del zorro.",
    limitedSpace:
      "<strong>DX con espacio limitado:</strong> Cuando el espacio del balcón o de la azotea no basta para una Yagi, la Moxon es una excelente alternativa.",
    physicsContent:
      'El rectángulo Moxon utiliza principios de "acoplamiento crítico". Al doblar las puntas de los elementos hacia adentro con una separación específica, se refuerza el acoplamiento mutuo entre el elemento activo y el reflector. Esta geometría produce un diagrama cardioide casi perfecto, que mantiene la ganancia frontal mientras elimina en gran medida la radiación trasera (alta relación F/B).',
    physicsQuote:
      '"El rectángulo Moxon es una direccional de 2 elementos con las puntas de los elementos plegadas una hacia la otra... maximizando la relación frente-espalda."',
    theoryAnalysis: "Análisis teórico",
    theoryContent:
      "Aunque el campo de radiación preciso de una antena Moxon requiere un análisis numérico complejo (como el modelado NEC), su característico <strong>diagrama cardioide</strong> puede aproximarse con la siguiente función simplificada:",
    formulaRadiation: "Fórmula del diagrama de radiación (modelo matemático)",
    formulaAngle:
      "Donde <M>\\theta</M> es el ángulo de acimut (<M>0^\\circ</M> es el frente).",
    formulaShapeFactor:
      "<M>A</M> es el factor de forma (típicamente <M>A \\approx 1.3</M>).",
    theorySummaryTable: {
      title: "Moxon vs Yagi de 2 elementos",
      headers: ["Característica", "Rectángulo Moxon", "Yagi de 2 elementos"],
      rows: [
        {
          feature: "Tamaño",
          moxon: "Pequeño (rectángulo compacto)",
          yagi: "Grande (lineal)",
        },
        {
          feature: "Relación F/B",
          moxon: "<strong>Muy alta (>20dB)</strong>",
          yagi: "Media (10-15dB)",
        },
        {
          feature: "Ganancia",
          moxon: "Moderada (~5.5 dBi)",
          yagi: "Ligeramente mayor (~6.0 dBi)",
        },
        {
          feature: "Adaptación",
          moxon: "<strong>Directa a 50Ω</strong>",
          yagi: "Requiere red de adaptación",
        },
        {
          feature: "Ancho de banda",
          moxon: "Muy amplio",
          yagi: "Más estrecho",
        },
      ],
    },
  },

  positiveVAntenna: {
    metaTitle: "Antena V positiva | Visualización de radioafición",
    metaDescription:
      "Demostración 3D de la estructura de la antena V positiva, mostrando por qué es ideal para instalaciones en azoteas con espacio limitado.",
    metaKeywords:
      "antena V positiva, dipolo, antena de azotea, antena compacta",
    title: "Antena V positiva",
    about:
      'La V positiva es un dipolo con los brazos inclinados hacia arriba, con forma de "V". Es lo contrario de la V invertida, que tiene el centro alto y los extremos bajos.',
    structure:
      "<strong>Ventaja estructural:</strong> Con los extremos elevados, los puntos de alta tensión (las puntas de la antena) quedan lejos del suelo y de los objetos cercanos, reduciendo las pérdidas dieléctricas y mejorando la seguridad.",
    rotatable:
      "<strong>Dipolo giratorio:</strong> En las bandas de HF, la V positiva se usa a menudo en dipolos giratorios. La forma en V reduce el radio de giro, haciendo la antena más compacta y con menor inercia de rotación.",
    polarizationTitle: "Polarización y diagrama",
    physicsContent:
      "La V positiva aleja los puntos de alta tensión (las puntas de la antena) del suelo o de las estructuras de la azotea. Esto reduce significativamente los efectos capacitivos y las pérdidas dieléctricas causadas por los objetos cercanos, manteniendo una alta eficiencia de radiación. La forma en V modifica ligeramente el diagrama de campo lejano, rellenando los nulos del diagrama en forma de 8.",
    physicsQuote:
      '"Elevar los extremos del dipolo en forma de V mantiene los puntos de alta tensión alejados de estructuras con pérdidas... minimizando las pérdidas a tierra."',

    // New Content
    theoryAnalysis: "Análisis teórico",
    theoryContent:
      "La antena V positiva es esencialmente un <strong>dipolo de media onda doblado</strong>. Al plegar los elementos hacia arriba en forma de V (típicamente 90°~120°), se alteran las características de impedancia de la antena. Mientras que un dipolo recto tiene una impedancia de unos 73Ω, la forma en V aprovecha la impedancia mutua entre los elementos para reducir la resistencia de radiación hasta cerca de <strong>50Ω</strong>, logrando una <strong>adaptación natural</strong> con los cables coaxiales comunes (sin necesidad de acoplador). Además, la forma en V mejora la direccionalidad al rellenar los nulos en los extremos de la antena.",
    impedanceMathLabel: "Impedancia con un ángulo de 120°",
    comparisonTable: {
      title: "Tabla comparativa",
      headers: ["Característica", "V positiva (V rígida)", "V invertida"],
      rows: [
        {
          feature: "Forma",
          posV: "V (centro bajo, extremos altos)",
          invV: "∧ (centro alto, extremos bajos)",
        },
        {
          feature: "Impedancia",
          posV: "~50Ω (adaptación natural)",
          invV: "< 50Ω (suele necesitar balun)",
        },
        {
          feature: "Ángulo de despegue",
          posV: "Bajo (bueno para DX)",
          invV: "Alto (bueno para NVIS)",
        },
        {
          feature: "Instalación",
          posV: "Rotor/tubo de aluminio (rígida)",
          invV: "Un solo mástil/hilo (sencilla)",
        },
      ],
    },
  },

  quadAntenna: {
    metaTitle: "Antena Quad | Visualización de radioafición",
    metaDescription:
      "Demostración 3D de la estructura de lazo de la antena Quad, mostrando sus características de alta ganancia y bajo ángulo de radiación.",
    metaKeywords: "antena Quad, antena direccional, DX, alta ganancia",
    title: "Antena Quad",
    about:
      "La antena Quad (típicamente Cubical Quad) consta de dos o más elementos de lazo cuadrados. Fue inventada por Clarence Moore (W9LZX) en los años 40 para resolver los problemas de descarga por efecto corona a gran altitud.",
    highGain:
      "<strong>Alta ganancia:</strong> Una Quad de 2 elementos suele igualar la ganancia de una Yagi de 3 elementos.",
    lowNoise:
      "<strong>Bajo ruido:</strong> La estructura de lazo cerrado ayuda a reducir el ruido estático durante la recepción; normalmente suena más silenciosa que una Yagi.",
    theoryAnalysis: "Análisis teórico",
    theoryContent:
      "El lazo de onda completa (Quad) es esencialmente un <strong>conjunto de dos dipolos plegados</strong>. Cuando el perímetro es de aproximadamente 1 longitud de onda (<M>\\lambda</M>), la distribución de corriente forma una onda estacionaria, con radiación máxima perpendicular al plano del lazo (broadside). Esta estructura de lazo cerrado proporciona mayor ganancia (aprox. 3.3 dBi) que un dipolo de media onda y está puesta a tierra en CC, lo que reduce eficazmente el ruido estático por precipitación para una recepción más silenciosa.",
    formulaLoopLength: "Perímetro del lazo",
    formulaImpedance: "Impedancia de entrada (lazo único)",
    comparisonTable: {
      title: "Tabla comparativa",
      headers: ["Característica", "Lazo pequeño", "Lazo de onda completa"],
      rows: [
        {
          feature: "Tamaño (perímetro)",
          small: "< 0.1λ",
          full: "≈ 1.0λ",
        },
        {
          feature: "Modelo físico",
          small: "Dipolo magnético",
          full: "Conjunto de dos dipolos",
        },
        {
          feature: "Dirección de radiación",
          small: "En el plano",
          full: "Perpendicular al plano (broadside)",
        },
        {
          feature: "Aplicación",
          small: "Recepción (barra de ferrita AM)",
          full: "Transmisión/DX (Quad)",
        },
      ],
    },
    physicsContent:
      "La antena Quad es un lazo cerrado de una longitud de onda completa con una apertura de radiación más eficaz que la de un dipolo de media onda. Una Quad estándar de 2 elementos (activo + reflector) proporciona unos 7dBi de ganancia mediante acoplamiento crítico, equivalente a una Yagi de 3 elementos. Al ser un lazo cerrado puesto a tierra en CC, disipa eficazmente la estática por precipitación, lo que se traduce en un ruido de fondo menor que el de las Yagi.",
    physicsQuote:
      '"La configuración de lazo cerrado de la antena Quad da como resultado un Q más bajo y un mayor ancho de banda... y es menos susceptible al ruido estático."',
  },

  yagiAntenna: {
    metaTitle: "Antena Yagi-Uda | Visualización de radioafición",
    metaDescription:
      "Demostración 3D del funcionamiento de la antena Yagi, mostrando las funciones de los directores, el elemento activo y el reflector, y su diagrama de radiación.",
    metaKeywords:
      "antena Yagi, antena Yagi-Uda, antena direccional, director, reflector",
    title: "Antena Yagi-Uda",
    about:
      "La antena Yagi fue inventada por los japoneses Hidetsugu Yagi y Shintaro Uda. Es una antena de <strong>alta ganancia y gran directividad</strong>, ampliamente utilizada en comunicaciones de onda corta, recepción de TV y radar.",
    theoryAnalysis: "Análisis teórico",
    principle:
      "<strong>Principio de funcionamiento:</strong> Mediante el acoplamiento mutuo entre los elementos parásitos (reflector y directores) y el elemento activo, se modifican las fases de las corrientes para combinar constructivamente las señales en una dirección mientras se cancelan en la opuesta.",
    gain: "<strong>Ganancia:</strong> Más elementos y directores más largos significan mayor ganancia y un haz más estrecho.",
    application:
      "<strong>Aplicación:</strong> La antena de comunicación DX (larga distancia) más común. Concentra tu señal hacia una estación distante concreta.",
    polarizationTitle: "Coincidencia de polarización",
    polarizationMatch:
      "<strong>Coincidencia de polarización:</strong> La mayoría de las Yagi de HF se montan horizontalmente, produciendo polarización horizontal.",
    polarizationNote:
      "Nota: Para la comunicación local en FM de VHF/UHF, lo habitual es el montaje vertical para coincidir con la polarización vertical de los equipos portátiles y móviles.",
    physicsContent:
      "La directividad de la antena Yagi proviene de la <strong>diferencia de fase</strong> entre las corrientes inducidas en los elementos parásitos (reflector y directores) y la corriente del elemento activo. El reflector suele ser algo más largo que la resonancia (inductivo), con corriente retrasada; los directores son algo más cortos (capacitivos), con corriente adelantada. Esta relación de fases provoca una interferencia constructiva hacia adelante y destructiva hacia atrás.",
    physicsQuote:
      '"La fase de la corriente en el elemento parásito depende de su longitud... Con la separación y la longitud adecuadas, la radiación del elemento parásito refuerza la del elemento activo en la dirección frontal."',
    theoryTitle: "1. Descripción general",
    theoryContent:
      "La antena Yagi es un <strong>conjunto de radiación longitudinal (end-fire)</strong>. Funciona induciendo corrientes en los elementos parásitos (reflectores/directores) mediante <strong>acoplamiento mutuo</strong>. El <strong>reflector</strong> es ligeramente más largo que 1/2 longitud de onda (inductivo), lo que provoca un retraso de corriente que cancela el lóbulo trasero. Los <strong>directores</strong> son más cortos (capacitivos), lo que provoca un adelanto de corriente que refuerza el haz frontal. Este control preciso de la fase logra una alta ganancia sin una red de alimentación compleja.",
    formulaDriven: "Longitud del elemento activo",
    formulaReflector: "Longitud del reflector (normalmente un 5% más largo)",
    formulaDirector: "Longitud del director (normalmente un 5% más corto)",
    theorySummaryTable: {
      title: "Tabla resumen",
      headers: [
        "Tipo de elemento",
        "Longitud",
        "Reactancia",
        "Fase",
        "Función",
      ],
      rows: [
        {
          type: "<strong>Reflector</strong>",
          length: "<M>\\gt \\lambda/2</M>",
          reactance: "Inductiva (+jX)",
          phase: "Retraso",
          function: 'Elimina la radiación trasera, actúa como "espejo"',
        },
        {
          type: "<strong>Elemento activo</strong>",
          length: "<M>\\approx \\lambda/2</M>",
          reactance: "Resonante (0)",
          phase: "Referencia",
          function: "Punto de alimentación de energía",
        },
        {
          type: "<strong>Director</strong>",
          length: "<M>\\lt \\lambda/2</M>",
          reactance: "Capacitiva (-jX)",
          phase: "Adelanto",
          function: 'Guía el haz hacia adelante, actúa como "lente"',
        },
      ],
    },
  },

  endFedAntenna: {
    metaTitle:
      "Antena de media onda alimentada por el extremo | Visualización de radioafición",
    metaDescription:
      "Demostración 3D de la portabilidad de la EFHW y de sus características de resonancia multibanda, mostrando el principio del transformador de impedancia 49:1.",
    metaKeywords:
      "EFHW, End-Fed Half Wave, balun 49:1, antena portable, antena multibanda",
    title: "Antena de media onda alimentada por el extremo",
    about:
      "La antena de media onda alimentada por el extremo (EFHW) es una antena multibanda muy popular, especialmente adecuada para la operación portable en el campo. Es esencialmente un hilo de longitud igual a la mitad de la longitud de onda de trabajo, alimentado por un extremo.",
    impedance:
      "<strong>Transformación de impedancia:</strong> Alimentar por el extremo de media onda presenta una impedancia extremadamente alta (~2000-4000 ohmios), lo que requiere un unun 49:1 o 64:1 para adaptarla a 50 ohmios.",
    structure:
      "<strong>Estructura:</strong> Consta principalmente de una caja de unun, un hilo radiador largo y cable coaxial. La malla del coaxial suele servir de contrapeso.",
    multiband:
      "<strong>Multibanda:</strong> Resuena de forma natural en las frecuencias armónicas, funcionando en varias bandas (p. ej., 40m, 20m, 15m, 10m) sin acoplador.",
    polarizationTitle: "Polarización y aplicaciones",
    physicsContent:
      "En resonancia, el punto de alimentación de la EFHW se encuentra en un vientre de tensión (tensión máxima) y un nodo de corriente (corriente mínima). Según Z=V/I, esto significa una impedancia de entrada extremadamente alta (teóricamente infinita, en la práctica ~2500-5000Ω). Se requiere un unun de banda ancha de alta relación (49:1 o 64:1) para transformarla a 50Ω.",
    physicsQuote:
      '"Una antena de media onda alimentada por el extremo presenta una impedancia muy alta en el punto de alimentación... y requiere una red de adaptación (unun) para transformar esa impedancia alta a 50 ohmios."',
    theoryAnalysis: "Análisis teórico",
    theoryVoltageFeed:
      "<strong>Alimentación en tensión:</strong> Alimentar por el extremo del hilo (tensión alta, corriente baja) da como resultado una impedancia muy alta (<M>2000\\Omega \\sim 4000\\Omega</M>). Un transformador con una alta relación de espiras (49:1 o 64:1) es esencial para una transferencia de potencia eficiente.",
    harmonics:
      "<strong>Resonancia armónica:</strong> Un hilo de media onda para la frecuencia fundamental (<M>f_0</M>) también resuena en los múltiplos enteros (<M>2f_0, 3f_0...</M>). Esto permite la operación multibanda (p. ej., 40m/20m/10m) con un solo hilo y sin acoplador.",
    formulaRadiation: "Fórmula del diagrama de radiación (armónicos)",
    oddHarmonics: "Para armónicos impares (<M>n=1, 3, 5...</M>):",
    evenHarmonics: "Para armónicos pares (<M>n=2, 4, 6...</M>):",
    patternDesc:
      "A medida que aumenta el orden del armónico <M>n</M>, el lóbulo único se divide en múltiples lóbulos y la dirección del haz principal se desplaza acercándose al eje del hilo.",
    commonMode:
      "<strong>Corriente de modo común:</strong> La malla del coaxial suele actuar como contrapeso. Se recomienda encarecidamente un choque de modo común para prevenir la RFI.",
  },

  longWireAntenna: {
    metaTitle: "Antena de hilo largo | Visualización de radioafición",
    metaDescription:
      "Demostración 3D de las características de radiación multilobulada de la antena de hilo largo y de cómo la longitud afecta a la direccionalidad.",
    metaKeywords:
      "antena de hilo largo, hilo aleatorio, diagrama multilobulado, onda estacionaria",
    title: "Antena de hilo largo",
    about:
      "Una antena de hilo largo es aquella que mide al menos una longitud de onda (normalmente mucho más). A diferencia de un dipolo de media onda, su diagrama de radiación se vuelve complejo a medida que aumenta la longitud.",
    gain: "<strong>Ganancia y directividad:</strong> A medida que aumenta la longitud de la antena (en longitudes de onda), los lóbulos principales se alinean más con el eje del hilo y la ganancia aumenta.",
    lobes:
      "<strong>Multilobulada:</strong> Las antenas de hilo largo producen múltiples lóbulos de radiación. Cuanto más largo es el hilo, más lóbulos aparecen.",
    ground:
      "<strong>Sistema de tierra:</strong> Para los hilos largos no resonantes (como el hilo aleatorio o Random Wire), un buen sistema de tierra es esencial, ya que forma parte del sistema de antena.",
    physicsContent:
      "La distribución de corriente en un hilo largo se trata normalmente como una onda estacionaria (si está abierto en el extremo) o como una onda viajera (si está terminado con una carga). Para un hilo largo abierto en el extremo, el diagrama de radiación es característicamente multilobulado.",
    physicsQuote:
      '"A medida que el hilo se hace más largo, los lóbulos principales de radiación se alinean más estrechamente con el hilo... creando un efecto direccional a lo largo del eje del hilo."',
    theoryTitle: "Análisis teórico",
    theoryDesc:
      "La antena de hilo largo, sobre todo cuando opera con varias longitudes de onda, presenta un diagrama de radiación complejo gobernado por la distribución de la onda estacionaria a lo largo del hilo.",
    theoryFormulaIntro:
      "Para una antena de hilo largo de onda estacionaria de longitud L con un número impar de semilongitudes de onda (<M>n</M> impar), el diagrama de radiación del campo eléctrico normalizado <M>E(\\theta)</M> viene dado por:",
    theoryFormulaExpl:
      "Donde <M>\\theta</M> es el ángulo respecto al eje del hilo. En nuestra simulación modelamos un hilo de longitud <M>L = 2.5\\lambda</M>, lo que corresponde a:",
    theoryResult:
      "Como <M>n=5</M> es un número impar, el término <M>\\cos(\\frac{5\\pi}{2} \\cos \\theta)</M> se convierte en <M>\\cos(0) = 1</M> cuando <M>\\theta = 90^\\circ</M>. Esto explica la presencia de un lóbulo transversal perpendicular al hilo, que es una característica distintiva de las antenas de onda estacionaria con armónicos impares.",
  },

  windomAntenna: {
    metaTitle: "Antena Windom (OCFD) | Visualización de radioafición",
    metaDescription:
      "Visualización 3D de la estructura de alimentación descentrada de la antena Windom (OCFD), sus principios de adaptación y su operación multibanda.",
    metaKeywords:
      "antena Windom, OCFD, dipolo alimentado fuera del centro, balun 4:1, antena multibanda",
    title: "Antena Windom (Windom / OCFD)",
    overviewTitle: "Acerca de esta demostración",
    overview:
      "Esta página demuestra la <strong>antena Windom</strong>, también conocida como <strong>dipolo alimentado fuera del centro (OCFD)</strong>. Al desplazar el punto de alimentación fuera del centro, obtenemos capacidad multibanda sin una pérdida de eficiencia significativa. Su estructura asimétrica es su rasgo distintivo.",
    structure:
      "<strong>Simulación de la estructura</strong>: El punto de alimentación (caja blanca) se sitúa aproximadamente al <strong>33%</strong> de la longitud total. Este diseño descentrado cambia fundamentalmente la distribución de la impedancia.",
    principleTitle: "¿Por qué el 33%? (El punto mágico)",
    principleIntro:
      "Si observamos la distribución de la onda estacionaria de corriente (curva amarilla) en diferentes frecuencias, descubrimos que el punto a 1/3 es una ubicación mágica:",
    principlePoints: {
      fundamental:
        "<strong>Fundamental (n=1)</strong>: Corriente moderada, impedancia de aprox. 200-300Ω.",
      harmonics2:
        "<strong>2.º armónico (n=2)</strong>: El centro es un nodo de corriente (impedancia infinita), pero a 1/3 la corriente sigue siendo moderada (impedancia ~200-300Ω).",
      harmonics4:
        "<strong>4.º armónico (n=4)</strong>: El punto a 1/3 mantiene una corriente y una impedancia moderadas.",
    },
    principleConclusion:
      "<strong>Conclusión</strong>: Con un solo punto de alimentación podemos lograr impedancias similares en bandas de armónicos pares como 40m, 20m y 10m.",
    matchingTitle: "Sistema de adaptación: balun 4:1",
    matchingIntro:
      "Dado que la impedancia del punto de alimentación (~200-300Ω) es mucho mayor que la del cable coaxial de 50Ω, necesitamos una transformación de impedancia:",
    matchingConclusion:
      "Por lo tanto, la antena Windom debe usarse con un <strong>balun de corriente 4:1</strong>. Esto es distinto del transformador 49:1 utilizado en la EFHW.",
    patternTitle: "Diagrama de radiación",
    patternIntro:
      "El diagrama de radiación (malla verde) está determinado principalmente por la <strong>longitud física total</strong> de la antena. En la frecuencia fundamental es similar al de un dipolo (en forma de 8). En los armónicos superiores se divide en múltiples lóbulos.",
    patternPoints: {
      fundamental:
        "<strong>Fundamental</strong>: Un 8 distorsionado, similar a un dipolo.",
      harmonic:
        "<strong>Armónicos</strong>: Multilobulado, con mayor directividad.",
    },
    comparisonTitle: "Windom vs EFHW vs dipolo",
    tableHead: {
      feature: "Característica",
      dipole: "Dipolo",
      windom: "Windom (OCFD)",
      efhw: "Alimentada por el extremo (EFHW)",
    },
    tableRow: {
      feedPos: "Punto de alimentación",
      multiBand: "Multibanda",
      match: "Adaptación",
      ground: "Puesta a tierra",
      cons: "Inconvenientes",
    },
    tableCell: {
      dipoleFeed: "Centro (50%)",
      windomFeed: "Descentrado (33%)",
      efhwFeed: "Extremo (0%)",
      dipoleBand: "Pobre (fundamental + armónicos impares)",
      windomBand: "Buena (fundamental + armónicos pares)",
      efhwBand: "Excelente (fundamental + todos los armónicos)",
      dipoleMatch: "Balun 1:1 (opcional)",
      windomMatch: "Balun 4:1 (obligatorio)",
      efhwMatch: "Transformador 49:1 (obligatorio)",
      dipoleGround: "No necesaria",
      windomGround: "Recomendada (contra el modo común)",
      efhwGround: "Necesaria (contrapeso)",
      dipoleCons: "Monobanda",
      windomCons: "Huecos en los armónicos",
      efhwCons: "Altas pérdidas en el transformador",
    },
    comparisonSummary:
      "<strong>Resumen</strong>: La antena Windom es un compromiso entre eficiencia y comodidad. En general es más eficiente que la EFHW, pero requiere una mejor supresión del ruido de modo común.",
    misconceptionTitle: "Conceptos erróneos comunes",
    misconceptionIntro:
      "Muchos principiantes creen erróneamente que desplazar el punto de alimentación hace que el diagrama se 'incline hacia un lado'. Esto es <strong>incorrecto</strong>.",
    misconceptionPhysicsTitle: "Reglas físicas",
    misconceptionPhysics:
      "La forma de la onda estacionaria está determinada por la <strong>longitud total del hilo</strong> y la <strong>frecuencia</strong>. La corriente debe ser cero en los extremos independientemente del punto de alimentación. Por lo tanto, la forma de la onda estacionaria y el diagrama de radiación permanecen sin cambios.",
    misconceptionFeedTitle: "Papel del punto de alimentación",
    misconceptionFeed:
      "Desplazar el punto de alimentación solo selecciona la <strong>impedancia</strong>:",
    misconceptionFeedLow: "Alimentar en el vientre = impedancia baja (dipolo)",
    misconceptionFeedHigh:
      "Alimentar en el nodo = impedancia alta (alimentada por el extremo)",
    misconceptionFeedMid:
      "Alimentar en la pendiente media = impedancia media (Windom)",
    misconceptionConclusion:
      "El punto de alimentación determina la ROE, no la direccionalidad.",
    misconceptionExTitle: "Excepción práctica",
    misconceptionEx:
      "Si el balun es deficiente y permite corriente de modo común, la línea de alimentación se convierte en parte del radiador, lo que <strong>sí</strong> distorsiona el diagrama.",
    polarizationTitle: "Características de polarización",
    polarizationIntro:
      "La antena Windom tiene **polarización lineal** (normalmente horizontal). **NO** es de polarización elíptica ni circular.",
    polarizationReason1Title: "1. Física",
    polarizationReason1:
      "La polarización elíptica requiere dos componentes ortogonales de campo E con un desfase (p. ej., una antena helicoidal). Una Windom es esencialmente un solo hilo. El vector de campo eléctrico siempre vibra en paralelo al hilo.",
    polarizationReason2Title: "2. Efectos del montaje",
    polarizationReason2List: {
      horizontal:
        "<strong>Montaje horizontal</strong>: Produce polarización lineal horizontal pura.",
      invertedV:
        "<strong>Montaje en V invertida</strong>: Sigue siendo lineal. Sin embargo, los elementos inclinados introducen una componente vertical que rellena los nulos axiales (factor de relleno δ ≈ 0.2), haciendo el diagrama más omnidireccional (en forma de cacahuete).",
      sloper:
        "<strong>Montaje en sloper (inclinado)</strong>: Produce polarización lineal inclinada (vibra a lo largo de una línea diagonal, sin rotar).",
    },
    polarizationExceptionTitle: "3. La única excepción (interferencia)",
    polarizationException:
      "Solo una **corriente de modo común** severa (un balun deficiente que hace radiar la línea de alimentación) puede mezclar las ondas verticales de la línea con las ondas horizontales del hilo, dando lugar a una polarización desordenada. Pero esto se considera **distorsión de señal/RFI**, no una característica de diseño.",
    physicsContent:
      "La antena Windom aprovecha la propiedad de que la impedancia es similar aproximadamente al 33% de la longitud para varias frecuencias armónicas. Esto permite la operación multibanda con un solo punto de alimentación y un balun 4:1.",
    physicsQuote:
      '"Al desplazar el punto de alimentación a una posición descentrada... la impedancia de la antena en el punto de alimentación puede hacerse manejable en varias bandas armónicas."',
  },
  magneticLoopAntenna: {
    metaTitle: "Antena de lazo magnético | Visualización de radioafición",
    metaDescription:
      "Visualización 3D de la antena de lazo magnético (lazo pequeño). Explora su alto Q, su ancho de banda estrecho y sus nulos profundos para el rechazo del ruido.",
    metaKeywords:
      "lazo magnético, Magnetic Loop, lazo pequeño, dipolo magnético, alto Q, antirruido, antena de lazo",
    title: "Antena de lazo magnético",
    overviewTitle: "Acerca de esta demostración",
    overview:
      "Esta página demuestra la <strong>antena de lazo magnético</strong>, también conocida como antena de lazo pequeño. Es una antena eléctricamente pequeña (<M>C \\lt \\lambda/10</M>).",
    structure:
      "<strong>Estructura:</strong> Normalmente una bobina de una o varias espiras montada verticalmente, sintonizada mediante un condensador variable en serie en la parte superior o inferior. Un método de alimentación habitual utiliza un lazo de acoplamiento más pequeño.",
    features:
      "<strong>Características:</strong> Menor eficiencia, pero un factor Q extremadamente alto y un ancho de banda estrecho. Su rasgo más famoso es su excelente capacidad de rechazo del ruido.",
    physicsModelTitle: "Modelo físico: el dipolo magnético",
    physicsModel:
      "La antena de lazo pequeño es físicamente equivalente a un <strong>dipolo magnético</strong>. Como sus dimensiones son mucho menores que la longitud de onda, se supone que la corriente <M>I</M> en el lazo es uniforme (a diferencia de una antena dipolo).",
    fieldFormulaTitle: "Fórmula del campo eléctrico en campo lejano",
    fieldFormulaDesc:
      "La componente del campo eléctrico en campo lejano <M>E_\\phi</M> en coordenadas esféricas es:",
    paramEta: "<M>\\eta \\approx 377\\Omega</M> (impedancia de onda)",
    paramK: "<M>k = 2\\pi/\\lambda</M> (número de onda)",
    paramI: "<M>I</M> es la corriente del lazo",
    paramA: "<M>A</M> es el área del lazo",
    paramTheta: "<M>\\theta</M> es el ángulo respecto al eje del lazo (eje Z)",
    patternTitle: "Diagrama de radiación",
    patternDesc:
      "La función de directividad es <M>F(\\theta) = \\sin\\theta</M>.",
    patternNull:
      "<strong>Nulos:</strong> La radiación es nula a lo largo del eje del lazo (perpendicular al plano del lazo).",
    patternMax:
      "<strong>Máximo:</strong> La radiación es máxima en el plano del lazo (mirando el lazo de canto).",
    advantageTitle: "Rechazo del ruido mediante nulos profundos",
    advantageDesc:
      "La característica más valiosa del lazo magnético son sus nulos profundos. Girando la antena para situar una fuente de interferencia en el nulo (a lo largo del eje), el ruido puede reducirse en 20-30dB.",
    physicsContent:
      "La antena de lazo magnético radia principalmente componentes de campo magnético en el campo cercano. En el campo lejano, su componente de campo eléctrico es horizontal (dirección <M>\\phi</M>) y su diagrama de radiación tiene forma de toroide con nulos a lo largo del eje.",
    physicsQuote:
      '"La antena de lazo pequeño es equivalente a un dipolo magnético... tiene un nulo a lo largo de su eje y radiación máxima en el plano del lazo."',
  },
  hb9cvAntenna: {
    title: "Antena HB9CV",
    metaTitle:
      "Visualización 3D de la antena HB9CV - Principio del conjunto en fase",
    metaDescription:
      "Visualización 3D interactiva de la antena HB9CV. Explora su singular principio de desfase, su diagrama de radiación cardioide y su alta relación frente-espalda.",
    metaKeywords:
      "antena HB9CV, conjunto en fase, antena direccional, radioafición, simulación 3D",
    about:
      "La antena HB9CV es un clásico conjunto en fase de 2 elementos diseñado por el radioaficionado suizo Rudolf Baumgartner (HB9CV) en los años 50. A diferencia de una antena Yagi-Uda, en la que solo se alimenta un elemento, los dos elementos de la HB9CV son activos. Se alimentan con igual amplitud pero con una diferencia de fase específica, lo que da como resultado una ganancia superior y una notable relación frente-espalda para una longitud de boom tan corta.",
    structureTitle: "Estructura",
    structureContent:
      "Dos elementos activos conectados por una línea de desfase.",
    phaseTitle: "Desfase",
    phaseContent:
      "Utiliza un desfase de 225 grados para obtener un diagrama cardioide.",
    phaseFront: "Fase espacial + fase de línea",
    phaseRear: "Cancelación en la parte trasera",
    formulaTitle: "Fórmula del diagrama",
    formulaIntro: "Aproximación del factor de conjunto:",
    afDef: "k=número de onda, d=separación, theta=ángulo",
    paramK: "k = 2pi/lambda",
    paramD: "d ~ lambda/8",
    paramDelta: "delta ~ 225 deg",
    patternTitle: "Diagrama de radiación",
    patternContent:
      "Diagrama cardioide con un nulo profundo en la parte trasera.",
    comparisonTitle: "HB9CV vs Yagi",
    comparisonTable: {
      headers: {
        feature: "Característica",
        hb9cv: "HB9CV",
        yagi: "Yagi (2 el.)",
      },
      rows: {
        gain: { feature: "Ganancia", hb9cv: "Mayor", yagi: "Menor" },
        fbRatio: { feature: "Relación F/B", hb9cv: "Alta", yagi: "Moderada" },
        bandwidth: {
          feature: "Ancho de banda",
          hb9cv: "Amplio",
          yagi: "Estrecho",
        },
        feed: { feature: "Alimentación", hb9cv: "En fase", yagi: "Sencilla" },
      },
    },
    physicsContent:
      "La HB9CV demuestra el principio del conjunto en fase, en el que controlar la fase de cada elemento permite conformar el haz sin necesidad de elementos parásitos pasivos.",
    physicsQuote:
      "Los conjuntos en fase son la base de los sistemas modernos de radar y de conformación de haz.",
  },
  electromagneticPropagation: {
    metaTitle: "Propagación electromagnética | Visualización de radioafición",
    metaDescription:
      "Visualización 3D de la propagación de ondas electromagnéticas en distintas bandas (HF/UV), demostrando los principios de la onda terrestre, la onda ionosférica y la reflexión ionosférica.",
    metaKeywords:
      "propagación electromagnética, onda terrestre, onda ionosférica, salto ionosférico, HF, UV",
    title: "Propagación electromagnética",
    hudTitle: "SISTEMA DE SIMULACIÓN DE RADIO",
    systemStatus: {
      online: "SISTEMA: EN LÍNEA",
      ionosphereStable: "IONOSFERA: ESTABLE",
      transmissionActive: "ESTADO TX: ACTIVO",
    },
    geoInfo: {
      latitude: "LAT",
      longitude: "LON",
      altitude: "ALT",
    },
    controls: {
      title: "CONSOLA PRINCIPAL",
      mode: {
        hf: "HF (onda corta)",
        uv: "UV (línea de vista)",
      },
      frequency: "FRECUENCIA TX",
      elevation: "ELEVACIÓN TX",
      ionosphereHeight: "ALTURA IONO",
    },
    metrics: {
      snr: "SNR",
      ber: "BER",
    },
    legend: {
      title: "DIAGNÓSTICO DE SEÑAL",
      groundWave: "Onda terrestre (superficie)",
      skyWave: "Onda ionosférica (reflexión)",
      scatter: "Dispersión secundaria",
    },
  },
} satisfies typeof import("~/locales/zh/demos").default;
