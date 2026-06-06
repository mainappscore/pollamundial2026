// Estructura de datos completa para el torneo (Mundial de 48 equipos, 12 grupos)
const torneoData = {
  grupos: {
    A: {
      equipos: ["México", "Sudáfrica", "Corea", "Chequia"],
      partidos: [
        { local: "México", visitante: "Sudáfrica", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Corea", visitante: "Chequia", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "México", visitante: "Corea", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Sudáfrica", visitante: "Chequia", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "México", visitante: "Chequia", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Sudáfrica", visitante: "Corea", golesLocal: 0, golesVisitante: 0, jugado: true }
      ]
    },
    B: {
      equipos: ["Canadá", "Bosnia", "Qatar", "Suiza"],
      partidos: [
        { local: "Canadá", visitante: "Bosnia", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Qatar", visitante: "Suiza", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Canadá", visitante: "Qatar", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Bosnia", visitante: "Suiza", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Canadá", visitante: "Suiza", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Bosnia", visitante: "Qatar", golesLocal: 0, golesVisitante: 0, jugado: true }
      ]
    },
    C: {
      equipos: ["Brasil", "Marruecos", "Haití", "Escocia"],
      partidos: [
        { local: "Brasil", visitante: "Marruecos", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Haití", visitante: "Escocia", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Brasil", visitante: "Haití", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Marruecos", visitante: "Escocia", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Brasil", visitante: "Escocia", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Marruecos", visitante: "Haití", golesLocal: 0, golesVisitante: 0, jugado: true }
      ]
    },
    D: {
      equipos: ["EE.UU.", "Paraguay", "Australia", "Turquía"],
      partidos: [
        { local: "EE.UU.", visitante: "Paraguay", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Australia", visitante: "Turquía", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "EE.UU.", visitante: "Australia", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Paraguay", visitante: "Turquía", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "EE.UU.", visitante: "Turquía", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Paraguay", visitante: "Australia", golesLocal: 0, golesVisitante: 0, jugado: true }
      ]
    },
    E: {
      equipos: ["Alemania", "Curazao", "C. de Marfil", "Ecuador"],
      partidos: [
        { local: "Alemania", visitante: "Curazao", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "C. de Marfil", visitante: "Ecuador", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Alemania", visitante: "C. de Marfil", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Curazao", visitante: "Ecuador", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Alemania", visitante: "Ecuador", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Curazao", visitante: "C. de Marfil", golesLocal: 0, golesVisitante: 0, jugado: true }
      ]
    },
    F: {
      equipos: ["Países Bajos", "Japón", "Suecia", "Túnez"],
      partidos: [
        { local: "Países Bajos", visitante: "Japón", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Suecia", visitante: "Túnez", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Países Bajos", visitante: "Suecia", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Japón", visitante: "Túnez", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Países Bajos", visitante: "Túnez", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Japón", visitante: "Suecia", golesLocal: 0, golesVisitante: 0, jugado: true }
      ]
    },
    G: {
      equipos: ["Bélgica", "Egipto", "Irán", "N. Zelanda"],
      partidos: [
        { local: "Bélgica", visitante: "Egipto", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Irán", visitante: "N. Zelanda", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Bélgica", visitante: "Irán", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Egipto", visitante: "N. Zelanda", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Bélgica", visitante: "N. Zelanda", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Egipto", visitante: "Irán", golesLocal: 0, golesVisitante: 0, jugado: true }
      ]
    },
    H: {
      equipos: ["España", "Cabo Verde", "Arabia S.", "Uruguay"],
      partidos: [
        { local: "España", visitante: "Cabo Verde", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Arabia S.", visitante: "Uruguay", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "España", visitante: "Arabia S.", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Cabo Verde", visitante: "Uruguay", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "España", visitante: "Uruguay", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Cabo Verde", visitante: "Arabia S.", golesLocal: 0, golesVisitante: 0, jugado: true }
      ]
    },
    I: {
      equipos: ["Francia", "Senegal", "Irak", "Noruega"],
      partidos: [
        { local: "Francia", visitante: "Senegal", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Irak", visitante: "Noruega", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Francia", visitante: "Irak", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Senegal", visitante: "Noruega", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Francia", visitante: "Noruega", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Senegal", visitante: "Irak", golesLocal: 0, golesVisitante: 0, jugado: true }      
      ]
    },
    J: {
      equipos: ["Argentina", "Argelia", "Austria", "Jordania"],
      partidos: [
        { local: "Argentina", visitante: "Argelia", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Austria", visitante: "Jordania", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Argentina", visitante: "Austria", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Argelia", visitante: "Jordania", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Argentina", visitante: "Jordania", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Argelia", visitante: "Austria", golesLocal: 0, golesVisitante: 0, jugado: true }      
      ]
    },
    K: {
      equipos: ["Portugal", "R. D. Congo", "Uzbekistán", "Colombia"],
      partidos: [
        { local: "Portugal", visitante: "R. D. Congo", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Uzbekistán", visitante: "Colombia", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Portugal", visitante: "Uzbekistán", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "R. D. Congo", visitante: "Colombia", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Portugal", visitante: "Colombia", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "R. D. Congo", visitante: "Uzbekistán", golesLocal: 0, golesVisitante: 0, jugado: true }
      ]
    },
    L: {
      equipos: ["Inglaterra", "Croacia", "Ghana", "Panamá"],
      partidos: [
        { local: "Inglaterra", visitante: "Croacia", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Ghana", visitante: "Panamá", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Inglaterra", visitante: "Ghana", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Croacia", visitante: "Panamá", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Inglaterra", visitante: "Panamá", golesLocal: 0, golesVisitante: 0, jugado: true },
        { local: "Croacia", visitante: "Ghana", golesLocal: 0, golesVisitante: 0, jugado: true }
      ]
    }
  },

  llaves: {
    clasificacion: {
      firstPlace: {
        A: "slot-16avos-P1-top", B: "slot-16avos-P2-top", C: "slot-16avos-P3-top",
        D: "slot-16avos-P4-top", E: "slot-16avos-P5-top", F: "slot-16avos-P6-top",
        G: "slot-16avos-P7-top", H: "slot-16avos-P8-top", I: "slot-16avos-P9-top",
        J: "slot-16avos-P10-top", K: "slot-16avos-P11-top", L: "slot-16avos-P12-top"
      },
      secondPlace: {
        A: "slot-16avos-P9-bottom", B: "slot-16avos-P10-bottom", C: "slot-16avos-P11-bottom",
        D: "slot-16avos-P12-bottom", E: "slot-16avos-P13-top", F: "slot-16avos-P13-bottom",
        G: "slot-16avos-P14-top", H: "slot-16avos-P14-bottom", I: "slot-16avos-P15-top",
        J: "slot-16avos-P15-bottom", K: "slot-16avos-P16-top", L: "slot-16avos-P16-bottom"
      },
      thirdPlaceSlots: [
        "slot-16avos-P1-bottom", "slot-16avos-P2-bottom", "slot-16avos-P3-bottom",
        "slot-16avos-P4-bottom", "slot-16avos-P5-bottom", "slot-16avos-P6-bottom",
        "slot-16avos-P7-bottom", "slot-16avos-P8-bottom"
      ]
    },

    rondas: [
      {
        id: "16avos",
        etiquetaBoton: "16avos",
        titulo: "Dieciseisavos de Final",
        partidos: [
          { id: "P1", top: "1A", bottom: "3C/D/E" },
          { id: "P2", top: "1B", bottom: "3A/F/G" },
          { id: "P3", top: "1C", bottom: "3B/H/I" },
          { id: "P4", top: "1D", bottom: "3J/K/L" },
          { id: "P5", top: "1E", bottom: "3A/B/C" },
          { id: "P6", top: "1F", bottom: "3D/E/F" },
          { id: "P7", top: "1G", bottom: "3G/H/I" },
          { id: "P8", top: "1H", bottom: "3J/K/L" },
          { id: "P9", top: "1I", bottom: "2A" },
          { id: "P10", top: "1J", bottom: "2B" },
          { id: "P11", top: "1K", bottom: "2C" },
          { id: "P12", top: "1L", bottom: "2D" },
          { id: "P13", top: "2E", bottom: "2F" },
          { id: "P14", top: "2G", bottom: "2H" },
          { id: "P15", top: "2I", bottom: "2J" },
          { id: "P16", top: "2K", bottom: "2L" }
        ]
      },
      {
        id: "8avos",
        etiquetaBoton: "Octavos",
        titulo: "Octavos de Final",
        partidos: [
          { id: "P1", top: "Gan. 16-P1", bottom: "Gan. 16-P2" },
          { id: "P2", top: "Gan. 16-P3", bottom: "Gan. 16-P4" },
          { id: "P3", top: "Gan. 16-P5", bottom: "Gan. 16-P6" },
          { id: "P4", top: "Gan. 16-P7", bottom: "Gan. 16-P8" },
          { id: "P5", top: "Gan. 16-P9", bottom: "Gan. 16-P10" },
          { id: "P6", top: "Gan. 16-P11", bottom: "Gan. 16-P12" },
          { id: "P7", top: "Gan. 16-P13", bottom: "Gan. 16-P14" },
          { id: "P8", top: "Gan. 16-P15", bottom: "Gan. 16-P16" }
        ]
      },
      {
        id: "cuartos",
        etiquetaBoton: "Cuartos",
        titulo: "Cuartos de Final",
        partidos: [
          { id: "P1", top: "Gan. 8-P1", bottom: "Gan. 8-P2" },
          { id: "P2", top: "Gan. 8-P3", bottom: "Gan. 8-P4" },
          { id: "P3", top: "Gan. 8-P5", bottom: "Gan. 8-P6" },
          { id: "P4", top: "Gan. 8-P7", bottom: "Gan. 8-P8" }
        ]
      },
      {
        id: "semis",
        etiquetaBoton: "Semis",
        titulo: "Semifinales",
        partidos: [
          { id: "P1", top: "Gan. C-P1", bottom: "Gan. C-P2" },
          { id: "P2", top: "Gan. C-P3", bottom: "Gan. C-P4" }
        ]
      },
      {
        id: "final",
        etiquetaBoton: "Final",
        titulo: "Gran Final",
        partidos: [
          { top: "Gan. S-P1", bottom: "Gan. S-P2" }
        ]
      }
    ],

    progresion: [
      { ronda: "8avos", targetMatch: "P1", targetPos: "top", sourceRonda: "16avos", sourceMatch: "P1" },
      { ronda: "8avos", targetMatch: "P1", targetPos: "bottom", sourceRonda: "16avos", sourceMatch: "P2" },
      { ronda: "8avos", targetMatch: "P2", targetPos: "top", sourceRonda: "16avos", sourceMatch: "P3" },
      { ronda: "8avos", targetMatch: "P2", targetPos: "bottom", sourceRonda: "16avos", sourceMatch: "P4" },
      { ronda: "8avos", targetMatch: "P3", targetPos: "top", sourceRonda: "16avos", sourceMatch: "P5" },
      { ronda: "8avos", targetMatch: "P3", targetPos: "bottom", sourceRonda: "16avos", sourceMatch: "P6" },
      { ronda: "8avos", targetMatch: "P4", targetPos: "top", sourceRonda: "16avos", sourceMatch: "P7" },
      { ronda: "8avos", targetMatch: "P4", targetPos: "bottom", sourceRonda: "16avos", sourceMatch: "P8" },
      { ronda: "8avos", targetMatch: "P5", targetPos: "top", sourceRonda: "16avos", sourceMatch: "P9" },
      { ronda: "8avos", targetMatch: "P5", targetPos: "bottom", sourceRonda: "16avos", sourceMatch: "P10" },
      { ronda: "8avos", targetMatch: "P6", targetPos: "top", sourceRonda: "16avos", sourceMatch: "P11" },
      { ronda: "8avos", targetMatch: "P6", targetPos: "bottom", sourceRonda: "16avos", sourceMatch: "P12" },
      { ronda: "8avos", targetMatch: "P7", targetPos: "top", sourceRonda: "16avos", sourceMatch: "P13" },
      { ronda: "8avos", targetMatch: "P7", targetPos: "bottom", sourceRonda: "16avos", sourceMatch: "P14" },
      { ronda: "8avos", targetMatch: "P8", targetPos: "top", sourceRonda: "16avos", sourceMatch: "P15" },
      { ronda: "8avos", targetMatch: "P8", targetPos: "bottom", sourceRonda: "16avos", sourceMatch: "P16" },
      { ronda: "cuartos", targetMatch: "P1", targetPos: "top", sourceRonda: "8avos", sourceMatch: "P1" },
      { ronda: "cuartos", targetMatch: "P1", targetPos: "bottom", sourceRonda: "8avos", sourceMatch: "P2" },
      { ronda: "cuartos", targetMatch: "P2", targetPos: "top", sourceRonda: "8avos", sourceMatch: "P3" },
      { ronda: "cuartos", targetMatch: "P2", targetPos: "bottom", sourceRonda: "8avos", sourceMatch: "P4" },
      { ronda: "cuartos", targetMatch: "P3", targetPos: "top", sourceRonda: "8avos", sourceMatch: "P5" },
      { ronda: "cuartos", targetMatch: "P3", targetPos: "bottom", sourceRonda: "8avos", sourceMatch: "P6" },
      { ronda: "cuartos", targetMatch: "P4", targetPos: "top", sourceRonda: "8avos", sourceMatch: "P7" },
      { ronda: "cuartos", targetMatch: "P4", targetPos: "bottom", sourceRonda: "8avos", sourceMatch: "P8" },
      { ronda: "semis", targetMatch: "P1", targetPos: "top", sourceRonda: "cuartos", sourceMatch: "P1" },
      { ronda: "semis", targetMatch: "P1", targetPos: "bottom", sourceRonda: "cuartos", sourceMatch: "P2" },
      { ronda: "semis", targetMatch: "P2", targetPos: "top", sourceRonda: "cuartos", sourceMatch: "P3" },
      { ronda: "semis", targetMatch: "P2", targetPos: "bottom", sourceRonda: "cuartos", sourceMatch: "P4" },
      { ronda: "final", targetPos: "top", sourceRonda: "semis", sourceMatch: "P1" },
      { ronda: "final", targetPos: "bottom", sourceRonda: "semis", sourceMatch: "P2" }
    ]
  }
};