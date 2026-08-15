export default {
  title: "Visualización de Radioafición",
  description:
    "Bienvenido al Laboratorio de Visualización de Radioafición. Explora simulaciones 3D interactivas de tipos clásicos de antenas y de la polarización de ondas electromagnéticas. A través de estas demostraciones podrás comprender de forma intuitiva los principios de las antenas y las características de propagación de las ondas de radio.",

  nav: {
    home: "Inicio",
    back: "Volver",
  },

  actions: {
    viewDemo: "Ver demo",
    openTool: "Abrir herramienta",
    github: "Repositorio en GitHub",
  },

  sections: {
    tools: "Herramientas",
  },

  demoCards: {
    vertical: {
      title: "Polarización vertical",
      description:
        "Visualiza la propagación del campo eléctrico de una antena con polarización vertical.",
      keywords:
        "polarización vertical, campo eléctrico, dipolo, teoría de antenas",
    },
    horizontal: {
      title: "Polarización horizontal",
      description:
        "Visualiza la propagación del campo eléctrico de una antena con polarización horizontal.",
      keywords:
        "polarización horizontal, campo eléctrico, dipolo, teoría de antenas",
    },
    circular: {
      title: "Polarización circular",
      description:
        "Visualiza el vector de campo eléctrico rotatorio en la polarización circular.",
      keywords:
        "polarización circular, vector rotatorio, comunicación por satélite",
    },
    elliptical: {
      title: "Polarización elíptica",
      description:
        "La forma general de polarización, entre la lineal y la circular.",
      keywords: "polarización elíptica, tipos de polarización",
    },
    dipoleAntenna: {
      title: "Antena dipolo",
      description:
        "El tipo de antena más fundamental. Visualiza ondas estacionarias y diagramas de radiación.",
      keywords: "antena dipolo, media onda, onda estacionaria",
    },
    yagi: {
      title: "Antena Yagi-Uda",
      description:
        "Una famosa antena direccional compuesta por directores, elemento activo y reflector.",
      keywords: "antena yagi-uda, antena direccional, directores, reflector",
    },
    invertedV: {
      title: "Antena V invertida",
      description:
        "Una variante del dipolo fácil de instalar, más alta en el centro y más baja en los extremos.",
      keywords: "antena v invertida, variante de dipolo, antena de hilo",
    },
    gp: {
      title: "Antena de plano de tierra",
      description:
        "Una antena monopolo vertical con radiales horizontales o inclinados hacia abajo.",
      keywords:
        "antena de plano de tierra, monopolo, radiales, antena vertical",
    },
    positiveV: {
      title: "Antena V positiva",
      description:
        "Un dipolo con brazos inclinados hacia arriba, adecuado para instalación en azoteas.",
      keywords: "antena v positiva, dipolo, antena de azotea, dipolo en V",
    },
    quad: {
      title: "Antena Quad",
      description:
        "Una antena direccional formada por espiras cuadradas, con alta ganancia y bajo ruido.",
      keywords: "antena quad, antena de lazo, alta ganancia, bajo ruido",
    },
    moxon: {
      title: "Antena Moxon",
      description:
        "Una antena direccional rectangular compacta con una excelente relación frente-espalda.",
      keywords:
        "antena moxon, antena rectangular, direccional, relación frente-espalda",
    },
    endFed: {
      title: "Media onda alimentada en el extremo",
      description:
        "Una antena portátil multibanda que usa un transformador de impedancia 49:1, alimentada por un extremo.",
      keywords:
        "media onda alimentada en el extremo, EFHW, antena portátil, transformador de impedancia",
    },
    longWireAntenna: {
      title: "Antena de hilo largo",
      description:
        "Demostración 3D de las características de radiación multilobular de la antena de hilo largo.",
      keywords: "antena de hilo largo, hilo aleatorio, diagrama multilobular",
    },
    windomAntenna: {
      title: "Antena Windom (OCFD)",
      description:
        "Demostración 3D de la estructura de la antena Windom (OCFD) y su funcionamiento multibanda.",
      keywords: "antena Windom, OCFD, dipolo de alimentación descentrada",
    },
    hb9cv: {
      title: "Antena HB9CV",
      description:
        "Un arreglo en fase de 2 elementos con alta ganancia y relación F/B, diseñado por HB9CV.",
      keywords:
        "antena HB9CV, arreglo en fase, antena direccional, radioafición",
    },
    magneticLoopAntenna: {
      title: "Antena de lazo magnético",
      description:
        "Demo 3D de la antena de lazo pequeño (dipolo magnético). Visualiza sus nulos profundos y su alto Q.",
      keywords:
        "lazo magnético, lazo pequeño, dipolo magnético, visualización de antenas",
    },
    electromagneticPropagation: {
      title: "Propagación electromagnética",
      description:
        "Visualización 3D de la propagación de ondas electromagnéticas en distintas bandas (HF/UV), demostrando los principios de onda de superficie, onda ionosférica y reflexión ionosférica.",
      keywords:
        "propagación electromagnética, onda de superficie, onda ionosférica, salto ionosférico, hf, uv",
    },
  },

  tools: {
    yagiCalculator: {
      title: "Calculadora Yagi",
      description:
        "Herramienta de diseño de antenas Yagi basada en el modelo de boom largo DL6WU y el algoritmo de corrección VK5DJ.",
      keywords: "calculadora yagi, diseño de antenas, DL6WU, VK5DJ",
      ui: {
        title: "Calculadora Yagi",
        subtitle: "Herramienta de ingeniería DL6WU",
        quickMode: "Modo rápido",
        proMode: "Modo pro",
        blueprintPreview: "Vista previa del plano",
        imgDownload: "Guardar diagrama + tabla",
        downloadError:
          "No se pudieron obtener los datos del plano; actualiza la página e inténtalo de nuevo.",
        downloading: "Descargando...",
        downloadFail:
          "Falló la generación de la imagen; inténtalo de nuevo más tarde",
        downloadUnknownError:
          "Error desconocido durante la descarga; consulta la consola para más detalles.",
        copySuccess: "¡Datos copiados al portapapeles!",
        boomCorrectionApplied: "Corrección de boom aplicada",
        boomCorrectionDetails:
          "Basada en B/d={{ratio}} y k={{kFactor}}. Todos los elementos alargados en",
      },
      specs: {
        title: "Especificaciones básicas",
        frequency: "Frecuencia central",
        elements: "Número de elementos",
      },
      quick: {
        title: "Ajustes rápidos",
        label: "Tipo de material del boom",
        presets: {
          metal_bonded: "Boom metálico - Con contacto (pasante y en contacto)",
          metal_insulated: "Boom metálico - Aislado (pasante y aislado)",
          pvc: "Boom de PVC/PPR - No metálico",
        },
        note: "* Predeterminado: elemento de 4mm, boom de 20mm, dipolo plegado, espaciado DL6WU.",
      },
      pro: {
        title: "Parámetros de ingeniería",
        section1: "1. Corrección de boom",
        section2: "2. Elemento activo",
        section3: "3. Estrategia de espaciado",
        boomShape: "Forma del boom",
        shapes: {
          round: "Tubo redondo",
          square: "Tubo cuadrado",
        },
        elementDia: "Diámetro del elemento (d)",
        elementDiaTooltip: {
          title: "Efecto del diámetro (factor K)",
          content:
            "Los elementos más gruesos parecen eléctricamente más largos. Hay que cortarlos físicamente más cortos.",
        },
        boomDia: "Diámetro del boom (B)",
        boomDiaTooltip: {
          title: "Efecto de acortamiento del boom",
          content:
            "Un boom metálico actúa como inductancia y acorta la longitud eléctrica de los elementos que lo atraviesan.",
        },
        mount: "Montaje",
        mountTooltip: {
          title: "Factor de corrección (k)",
          item1: "No metálico: k ≈ 0",
          item2: "Sobre el boom: k ≈ 0.05 (mínimo)",
          item3: "Pasante/en contacto: k = dinámico (0.6~0.8)",
        },
        mountMethods: {
          bonded: "En contacto (atraviesa el metal)",
          insulated: "Aislado (atraviesa el metal)",
          above: "Encima (aislado del boom)",
          none: "Ninguno (boom no metálico)",
        },
        bcFactor: "Factor de corrección (BC)",
        bcFactorTooltip: {
          title: "Factor de corrección k",
          content:
            "Curva DL6WU basada en la relación B/d. Longitud física añadida = B × k",
        },
        autoCalcNote:
          "* El sistema calcula k mediante la curva DL6WU. Puedes ajustarlo manualmente.",
        deType: "Tipo",
        deTypeTooltip: {
          title: "Impedancia",
          item1: "Plegado: ~288Ω (requiere balun 4:1)",
          item2: "Recto: ~72Ω (alimentación directa)",
        },
        deTypes: {
          folded: "Dipolo plegado",
          straight: "Dipolo recto",
        },
        feedGap: "Separación de alimentación",
        feedGapTooltip: {
          title: "Corte físico",
          content:
            "A la longitud de corte del dipolo hay que restarle esta separación. LongCorte = LongTotal - Separación",
        },
        algo: "Algoritmo",
        algoTooltip: {
          title: "Escalonado DL6WU",
          content:
            "El espaciado de los directores aumenta de 0.075λ a 0.30λ para máxima ganancia frontal con buen ancho de banda.",
        },
        algos: {
          dl6wu: "Escalonado DL6WU (recomendado)",
          uniform: "Espaciado uniforme (personalizado)",
        },
        fixedSpacing: "Espaciado fijo (λ)",
        material: "Material",
        materialTooltip: {
          title: "Material del boom",
          content:
            "La conductividad del material seleccionado afecta ligeramente al diseño de los elementos.",
        },
        materials: {
          aluminum: "Aluminio - Estándar",
          copper: "Cobre - Alta conductividad",
          stainless_steel: "Acero inoxidable - Alta resistencia",
          fiberglass: "Fibra de vidrio - Aislante",
        },
      },
      results: {
        title: "Lista de cortes",
        tolerance: "Tolerancia ±0.5mm",
        copy: "Copiar datos",
        headers: {
          element: "Elemento",
          pos: "Pos",
          space: "Espacio",
          half: "Mitad",
          cut: "Corte",
          note: "Nota",
        },
        notes: {
          folded: "Plegado",
          gap: "Separación: {{val}}mm",
          foldedLoop: "Lazo plegado",
          gapEn: "Separación: {{val}}mm",
        },
        totalBoom: "Boom total: {{val}} mm",
        estGain: "Ganancia est.",
        estGainTooltip: "Fórmula est.: (Elementos × 1.2) + 2.15 dBi",
        generatedBy: "Generado por Yagi Calc Pro | {{date}}",
        downloadFileName: "yagi_design_{{freq}}MHz.png",
      },
    },
    moxonCalculator: {
      title: "Calculadora Moxon",
      description:
        "Diseñador de antenas Moxon rectangulares basado en el algoritmo AC6LA / MoxGen.",
      keywords: "calculadora moxon, Moxon, MoxGen, diseño de antenas, AC6LA",
      algorithm: "Algoritmo AC6LA / MoxGen",
      specs: {
        title: "Configuración",
        subtitle: "Frecuencia e hilo",
        freqLabel: "Frecuencia central (MHz)",
        diaLabel: "Diámetro del hilo (mm)",
        typicalFreq: "Típ.: 144.100, 435.000, 28.500",
        typicalDia: "Típ.: 2mm ~ 6mm",
        introTitle: "¿Qué es una Moxon?",
        introDesc:
          "La Moxon rectangular es una antena directiva de hilo de 2 elementos mejorada por Les Moxon (G6XN). Ofrece una excelente relación frente-espalda y un gran ancho de banda en una forma rectangular compacta (aprox. el 70% de una Yagi de tamaño completo). Normalmente proporciona una impedancia de alimentación directa de 50Ω.",
      },
      results: {
        title: "Lista de dimensiones",
        copy: "Copiar datos",
        copied: "¡Copiado al portapapeles!",
        headers: {
          id: "ID",
          desc: "Descripción",
          len: "Longitud (mm)",
          wl: "Longitud de onda (λ)",
        },
        rows: {
          A: "Ancho del elemento activo",
          B: "Cola del elemento activo",
          C: "Separación",
          D: "Cola del reflector",
          E: "Profundidad total",
          wireDriven: "Hilo total del elemento activo",
          wireRef: "Hilo total del reflector",
        },
      },
      blueprint: {
        title: "Vista previa del plano",
        download: "Guardar plano",
        feed: "Punto de alimentación",
      },
    },
    cw: {
      title: "Entrenador de CW",
      description:
        "Entrenador de código Morse basado en Web Audio API, con decodificación y visualización en tiempo real.",
      keywords: "CW, código Morse, entrenador, Web Audio API",
      panel: {
        letters: "LETRAS",
        numbers: "NÚMEROS",
        symbols: "SÍMBOLOS",
        rx_log: "REGISTRO RX",
        speed: "VELOCIDAD",
        clear: "BORRAR",
        morse_code_reference: "Referencia de código Morse",
        ref: "REF",
        training_mode: "MODO ENTRENAMIENTO",
        free_play: "MODO LIBRE",
        edit: "EDITAR",
        next: "SIGUIENTE",
        custom_text: "TEXTO PERSONALIZADO",
        custom_text_placeholder: "ESCRIBE TEXTO (A-Z 0-9)...",
        cancel: "CANCELAR",
        confirm: "CONFIRMAR",
      },
      circuit_board_visualization:
        "Visualización de código Morse en placa de circuito",
      input_aria_label: "Entrada de código Morse",
      control: {
        dit: "DIT [J / ←]",
        dah: "DAH [K / →]",
        backspace: "BORRAR [BS]",
        reset: "REINICIAR [ESC]",
      },
      status: {
        ready: "LISTO",
      },
      speed: {
        slow: "LENTO",
        med: "MEDIO",
        fast: "RÁPIDO",
        beginner: "Principiante",
        intermediate: "Intermedio",
        advanced: "Avanzado",
      },
      instructions: {
        title: "Instrucciones",
        operation: {
          title: "Cómo operar",
          keyboard: "Control por teclado",
          keyboard_desc:
            "Usa '.' / 'J' / 'flecha izquierda' para DIT. Usa '-' / 'K' / 'flecha derecha' para DAH. Espacio para separar palabras. Retroceso para borrar.",
          buttons: "Botones en pantalla",
          buttons_desc:
            "Pulsa los botones grandes de la parte inferior para DIT y DAH. Usa los botones pequeños para Borrar, Eliminar y Reiniciar.",
        },
        speed_guide: {
          title: "Ajustes de velocidad",
          beginner:
            "Principiante: velocidad lenta (menos WPM) con mayor separación entre caracteres. Ideal para quienes aprenden por primera vez a distinguir puntos y rayas.",
          intermediate:
            "Intermedio: velocidad moderada. Reduce la separación exagerada. Ideal para practicar el ritmo y la formación estándar de caracteres.",
          advanced:
            "Avanzado: velocidad rápida. Separación mínima. Simula la operación real de CW a alta velocidad o condiciones de concurso.",
        },
        training_desc:
          "Cambia al modo entrenamiento para practicar con texto en pantalla. El sistema valida tu entrada en tiempo real y calcula tus WPM. También puedes introducir texto personalizado para una práctica dirigida.",
      },
      game: {
        title: "CW Defense",
        subtitle: "Teclea código Morse para defender el muro",
        ready: "¿Listo para jugar?",
        instructions:
          "Pulsa J para · (dit) y K para − (dah). ¡Teclea el código Morse para eliminar los caracteres que caen antes de que lleguen al muro!",
        start: "Iniciar juego",
        resume: "Reanudar",
        paused: "En pausa",
        score: "Puntuación",
        highScore: "Récord",
        combo: "Combo",
        wall: "Muro de defensa",
        yourInput: "Tu entrada",
        waiting: "Esperando...",
        clear: "Borrar",
        dit: "Dit",
        dah: "Dah",
        controls:
          "J = · (dit) | K = − (dah) | RETROCESO = Borrar | ESC = Pausa",
        gameOver: "Fin del juego",
        wallBreached: "¡El muro ha sido derribado!",
        finalScore: "Puntuación final",
        maxCombo: "Combo máximo",
        newRecord: "¡Nuevo récord!",
        mainMenu: "Menú",
        playAgain: "Jugar de nuevo",
      },
    },
    cwGame: {
      title: "CW Defense",
      description:
        "¡Defiende el muro con código Morse! Un juego de mecanografía con caracteres que caen para entrenar tu velocidad de reacción en CW.",
      keywords: "CW, código Morse, juego, juego de mecanografía, radioafición",
    },
    cwRxGame: {
      title: "Entrenador de RX de CW",
      description:
        "Entrenador de recepción de código Morse con ruido de fondo de HF realista.",
      keywords: "CW, RX, recepción, código Morse, radioafición",
      ui: {
        title: "ENTRENADOR RX",
        subtitle: "Simulador de recepción de código Morse",
        instructions:
          "Escucha la secuencia. Escribe lo que oigas. Pulsa ENTER para enviar.",
        start: "EMPEZAR A ESCUCHAR",
        score: "Puntuación",
        highScore: "Récord",
        speed: "Velocidad (WPM)",
        spacing: "Espaciado",
        noise: "Ruido",
        qsb: "QSB (desvanecimiento)",
        chineseCallsigns: "Solo indicativos CN",
        qsoMode: "Simular QSO",
        status: {
          transmitting: "TRANSMITIENDO...",
          waiting: "ESPERANDO ENTRADA",
          correct: "¡CORRECTO!",
          miss: "¡FALLO!",
          was: "ERA:",
        },
        input: {
          placeholder: {
            playing: "...",
            waiting: "ESCRIBE AQUÍ",
          },
          hint: "PULSA [ESPACIO] PARA REPETIR • [ENTER] PARA ENVIAR",
        },
      },
    },
  },

  footer: {
    feedback: {
      title: "¿Tienes ideas o sugerencias?",
      subtitle:
        "Los comentarios son bienvenidos para ayudar a mejorar este proyecto",
      emailTitle: "Enviar correo a ham@charlesify.com",
      githubTitle: "Ver en GitHub",
    },
    copyright: "© {{year}} BG8ROM. Todos los derechos reservados.",
    credits: "Agradecimientos especiales",
    acknowledgements: "Agradecimientos",
    authorKJ7LNW: "Motor NEC2 impulsado por KJ7LNW/nec2c",
  },

  meta: {
    siteName: "Visualización de Radioafición",
    keywords:
      "radioafición, demos de antenas, visualización 3D, polarización vertical, polarización horizontal, polarización circular, antena Yagi, antena GP, antena V invertida, antena V positiva, antena quad, antena Moxon",
    home: {
      title: "Visualización de Radioafición",
      description:
        "Una colección de visualizaciones de antenas de radioafición: incluye demos 3D de polarización y radiación de antenas clásicas como polarización vertical/horizontal/circular, Yagi, V invertida, GP, V positiva, Quad, Moxon, media onda alimentada en el extremo (EFHW), hilo largo, Windom, HB9CV, lazo magnético, etc.",
      keywords:
        "radioafición, ham radio, demos de antenas, visualización 3D, polarización vertical, polarización horizontal, polarización circular, antena Yagi, antena GP, antena V invertida, antena V positiva, antena Quad, antena Moxon, EFHW, hilo largo, antena Windom, HB9CV, lazo magnético, demos de radioafición, visualización de antenas",
    },
  },
} satisfies typeof import("~/locales/zh/common").default;
