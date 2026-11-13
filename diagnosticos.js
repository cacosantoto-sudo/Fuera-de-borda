/* =====================================================================
   DIAGNÓSTICO POR SÍNTOMA – Scotto Mecánica Náutica
   ---------------------------------------------------------------------
   Este archivo reemplaza DATOS.DIAGNOSTICOS_BASE de datos-motores.js.
   Se carga DESPUÉS de datos-motores.js.

   PARA QUIÉN ESCRIBIMOS (pedido de Juan, 11/11/2026):
   Una persona en el agua, nerviosa, que no sabe de mecánica.
   - Frases cortas, una acción por renglón, en orden.
   - Nada de palabras técnicas. Si no hay otra, se explica entre paréntesis.
   - Máximo 4 renglones por paso.
   - Lo que se puede hacer en el agua va primero.
   - Lo técnico (causas posibles) va solo en el paso final "mecánico",
     que es lo que el dueño le lee o le pasa al taller.

   Cada síntoma:
     id, titulo, descripcion, grupo
     icono:   nombre de un dibujo (lo dibuja index.html; ver lista en el hilo de diseño)
     urgente: true -> la lista lo marca "Apague el motor"
     alerta:  aviso rojo en el primer paso
   Cada paso puede limitarse a un tipo de motor:
     tiempos: "2T" | "4T"      alimentacion: "carburador" | "inyeccion"
   Niveles: "simple" (cualquiera), "intermedio" (con herramientas),
   "mecanico" (STOP: llevar al taller; "como" = causas posibles).
   ===================================================================== */

window.DATOS = window.DATOS || {};

/* Aviso que se muestra arriba de la lista de síntomas */
window.DATOS.AVISO_EMERGENCIA = {
  titulo: "¿Está en el agua y con problemas?",
  pasos: [
    "Primero, todos con chaleco salvavidas.",
    "Si la lancha va a la deriva hacia piedras o la costa, tire el ancla.",
    "Si hay peligro, llame a Prefectura: 106 (o por radio, canal 16).",
    "Con la lancha segura, elija abajo qué le pasa al motor."
  ]
};

window.DATOS.DIAGNOSTICOS_BASE = [

  /* =================================================================
     ARRANQUE
     ================================================================= */
  {
    id: "no-arranca",
    icono: "llave",
    grupo: "Arranque",
    titulo: "No arranca",
    descripcion: "El motor gira, pero no prende.",
    pasos: [
      {
        titulo: "La llave roja de seguridad",
        nivel: "simple",
        como: [
          "Busque la llave roja con el cordón (la del \"hombre al agua\").",
          "Tiene que estar puesta en su lugar, bien calzada.",
          "Sin ella el motor gira pero no prende."
        ],
        solucion: "Con la llave roja puesta, intente arrancar."
      },
      {
        titulo: "Palanca en punto muerto",
        nivel: "simple",
        como: [
          "Ponga la palanca de marcha en el medio (punto muerto).",
          "Con la marcha puesta, el motor no arranca."
        ],
        solucion: "En punto muerto, intente arrancar."
      },
      {
        titulo: "Nafta y tanque",
        nivel: "simple",
        como: [
          "Fíjese que el tanque tenga nafta.",
          "Afloje el tornillito de la tapa del tanque (deja entrar aire).",
          "Empuje la manguera contra el motor hasta que haga clic."
        ],
        solucion: "Con nafta y la manguera bien puesta, intente arrancar."
      },
      {
        titulo: "La pera de goma",
        nivel: "simple",
        como: [
          "En la manguera de nafta hay una pera de goma.",
          "Apriétela varias veces hasta que quede dura.",
          "Si nunca se pone dura, entra aire: ajuste la manguera en los dos extremos."
        ],
        solucion: "Con la pera dura, la nafta llega al motor."
      },
      {
        titulo: "Cebador",
        nivel: "simple",
        alimentacion: "carburador",
        como: [
          "Con el motor frío: tire de la perilla del cebador (o empuje la llave, según su motor).",
          "Dé arranque. Cuando prenda, vuelva el cebador de a poco.",
          "Con el motor caliente, no use el cebador."
        ],
        solucion: "Si prendió, déjelo en marcha unos minutos antes de salir."
      },
      {
        titulo: "Arranque sin acelerar",
        nivel: "simple",
        alimentacion: "inyeccion",
        como: [
          "Gire la llave sin arrancar y espere 5 segundos: debe sonar un zumbido corto.",
          "Después dé arranque sin tocar el acelerador.",
          "No dé arranque más de 5 segundos seguidos. Espere 10 entre intentos."
        ],
        solucion: "Si prendió, no había falla."
      },
      {
        titulo: "Si huele mucho a nafta",
        nivel: "simple",
        como: [
          "Está ahogado: le entró nafta de más.",
          "Espere 5 minutos sin tocar nada.",
          "Saque el cebador, acelere a fondo en punto muerto y dé 5 o 6 arranques cortos."
        ],
        solucion: "Si prendió, la próxima vez cebe menos."
      },
      {
        titulo: "Batería",
        nivel: "simple",
        alimentacion: "inyeccion",
        como: [
          "Si el motor gira lento, la batería está baja.",
          "Este motor necesita batería fuerte para prender, aunque gire.",
          "Revise que los cables de la batería estén firmes."
        ],
        solucion: "Con la batería cargada, intente otra vez."
      },
      {
        titulo: "Bujías (en tierra)",
        nivel: "intermedio",
        como: [
          "Con el motor frío, saque las bujías con la llave de bujías.",
          "Si están mojadas de nafta, séquelas y vuelva a colocarlas.",
          "Si están negras o gastadas, cámbielas por nuevas."
        ],
        solucion: "Con bujías nuevas, muchos motores vuelven a arrancar.",
        alto: "No pruebe chispa con la mano ni cerca de nafta."
      },
      {
        titulo: "Nafta vieja",
        nivel: "intermedio",
        como: [
          "La nafta de más de un mes se echa a perder.",
          "Conecte un bidón chico con nafta nueva y pruebe."
        ],
        solucion: "Si arrancó con nafta nueva, tire la vieja."
      },
      {
        titulo: "Bomba de nafta",
        nivel: "intermedio",
        alimentacion: "carburador",
        como: [
          "Si apretando la pera arranca y al soltarla se para, falla la bomba de nafta.",
          "Revise que sus mangueritas no estén rotas ni sueltas.",
          "Si están bien, la bomba se repara en el taller."
        ],
        solucion: "Si una manguerita estaba suelta y la ajustó, la nafta vuelve a llegar."
      },
      {
        titulo: "Llevar al mecánico",
        nivel: "mecanico",
        como: [
          "Sin chispa con bujías nuevas: interruptor de corte, cableado, bobinas, CDI o estator.",
          "Con chispa y nafta: carburador sucio, membranas de la bomba de nafta o baja compresión.",
          "4T EFI: bomba de baja, bomba de alta (en el separador de vapor), su relé o regulador de presión.",
          "Inyección: inyectores, sensores o ECU. Leer códigos con el escáner de la marca."
        ]
      }
    ]
  },

  {
    id: "no-gira",
    icono: "bateria",
    grupo: "Arranque",
    titulo: "Doy arranque y no gira",
    descripcion: "No pasa nada, o solo se escucha un clic.",
    pasos: [
      {
        titulo: "Palanca en punto muerto",
        nivel: "simple",
        como: [
          "El motor solo arranca con la palanca en el medio (punto muerto).",
          "Muévala firme al medio y pruebe otra vez."
        ],
        solucion: "Si arrancó, era la palanca."
      },
      {
        titulo: "Cables de la batería",
        nivel: "simple",
        como: [
          "Si tiene llave de corte de batería, fíjese que esté encendida.",
          "Apriete los cables en la batería: no deben moverse.",
          "Si tienen polvo blanco o verde, límpielos."
        ],
        solucion: "Con los cables firmes, intente arrancar."
      },
      {
        titulo: "Arranque a mano",
        nivel: "simple",
        como: [
          "Si su motor tiene piola de arranque, úsela para volver.",
          "Algunos motores tienen una piola de emergencia bajo la tapa (vea el manual)."
        ],
        solucion: "Si prendió a mano, el problema es eléctrico: llévelo al taller al volver."
      },
      {
        titulo: "Batería (en tierra)",
        nivel: "intermedio",
        como: [
          "Cargue la batería o pruebe con otra.",
          "Si se descarga sola de una semana a otra, puede estar vencida.",
          "Revise el fusible del motor (vea dónde está en el manual)."
        ],
        solucion: "Con batería cargada, el motor gira con fuerza.",
        alto: "No haga puentes con un destornillador: el motor puede arrancar con la marcha puesta."
      },
      {
        titulo: "Llevar al mecánico",
        nivel: "mecanico",
        como: [
          "Burro de arranque gastado (carbones, bendix) o relé de arranque.",
          "Interruptor de neutro, llave de contacto o mazo de cables.",
          "Si el motor está trabado: agua en el cilindro, pistón engranado o cola trabada."
        ]
      }
    ]
  },

  {
    id: "piola",
    icono: "piola",
    grupo: "Arranque",
    titulo: "La piola se traba o no vuelve",
    descripcion: "No puedo tirar de la piola, o queda afuera.",
    pasos: [
      {
        titulo: "Palanca en punto muerto",
        nivel: "simple",
        como: [
          "Muchos motores traban la piola si la marcha está puesta.",
          "Ponga la palanca en el medio (punto muerto) y vuelva a tirar."
        ],
        solucion: "En punto muerto, la piola se libera."
      },
      {
        titulo: "Cómo tirar",
        nivel: "simple",
        como: [
          "Tire despacio hasta sentir que engancha.",
          "Ahí dé un tirón firme y largo.",
          "No la suelte de golpe: acompáñela con la mano."
        ],
        solucion: "Así engancha y vuelve sola."
      },
      {
        titulo: "Si sigue trabada",
        nivel: "simple",
        como: [
          "No la fuerce: puede romper el motor.",
          "Vuelva a remo, a vela o pida remolque."
        ],
        solucion: "Llévelo al taller."
      },
      {
        titulo: "Llevar al mecánico",
        nivel: "mecanico",
        como: [
          "Piola que no vuelve: resorte del arrancador cortado o desenganchado.",
          "No engancha: trinquetes del arrancador gastados.",
          "Trabada en neutro: posible agua en el cilindro (hidrobloqueo), pistón engranado o cola trabada."
        ]
      }
    ]
  },

  {
    id: "llave-roja",
    grupo: "Arranque",
    icono: "llave",
    titulo: "Perdí la llave roja",
    descripcion: "Se perdió la llave de seguridad con el cordón y el motor no arranca.",
    pasos: [
      {
        titulo: "Busque la de repuesto",
        nivel: "simple",
        como: [
          "Muchos motores traen una llave roja de repuesto.",
          "Busque bajo la tapa del motor, en la guantera o en el kit de herramientas.",
          "Colóquela bien calzada y arranque."
        ],
        solucion: "Con la llave de repuesto, el motor arranca."
      },
      {
        titulo: "Si no tiene repuesto",
        nivel: "simple",
        como: [
          "Sin la llave roja el motor no arranca: es por seguridad.",
          "No intente puentear el interruptor.",
          "Vuelva a remo o pida remolque. Si hay peligro, llame a Prefectura (106)."
        ],
        solucion: "Pida una llave nueva en el taller."
      },
      {
        titulo: "Para la próxima",
        nivel: "simple",
        como: [
          "Ate siempre el cordón a la muñeca o al chaleco.",
          "Lleve una llave de repuesto a bordo."
        ],
        solucion: "Así no vuelve a quedarse sin arrancar."
      },
      {
        titulo: "Llevar al mecánico",
        nivel: "mecanico",
        como: [
          "Reponer la llave (clip) del interruptor de corte, del modelo que corresponda a la marca.",
          "Revisar el interruptor de corte si la llave nueva no hace contacto."
        ]
      }
    ]
  },

  {
    id: "piola-cortada",
    grupo: "Arranque",
    icono: "piola",
    titulo: "Se cortó la piola de arranque",
    descripcion: "La piola se rompió y el motor no tiene arranque eléctrico.",
    pasos: [
      {
        titulo: "Soga de emergencia",
        nivel: "simple",
        como: [
          "Muchos motores traen una soga de arranque de emergencia en el kit de herramientas.",
          "Fíjese en el manual si su motor la trae y cómo se usa."
        ],
        solucion: "Si la tiene, siga el paso siguiente."
      },
      {
        titulo: "Arrancar con la soga de emergencia",
        nivel: "intermedio",
        como: [
          "Saque la tapa del motor y el arrancador de piola (suelen ser 3 tornillos; vea el manual).",
          "Ponga la palanca en punto muerto.",
          "Enrolle la soga en la polea de arriba del motor, en el sentido que indica el manual.",
          "Tire fuerte, como con la piola."
        ],
        solucion: "Si prendió, vuelva despacio y sin poner la tapa.",
        alto: "Así el motor arranca aunque tenga la marcha puesta: verifique el punto muerto. No toque las piezas que giran ni los cables de las bujías."
      },
      {
        titulo: "Si no puede",
        nivel: "simple",
        como: [
          "Vuelva a remo o pida remolque.",
          "Si hay peligro, llame a Prefectura (106)."
        ],
        solucion: "Llévelo al taller."
      },
      {
        titulo: "Llevar al mecánico",
        nivel: "mecanico",
        como: [
          "Cambiar la piola y revisar el arrancador (resorte, trinquetes y polea).",
          "Si la piola se cortó por roce, revisar la guía de salida."
        ]
      }
    ]
  },

  /* =================================================================
     EN MARCHA
     ================================================================= */
  {
    id: "se-apaga",
    icono: "apagado",
    grupo: "En marcha",
    titulo: "Arranca y se apaga",
    descripcion: "Prende pero se para al rato o al poner la marcha.",
    pasos: [
      {
        titulo: "Tapa del tanque",
        nivel: "simple",
        como: [
          "Afloje el tornillito de la tapa del tanque.",
          "Si la pera de goma está aplastada, era eso: le faltaba aire al tanque."
        ],
        solucion: "Con la tapa aflojada, la nafta pasa bien."
      },
      {
        titulo: "La pera de goma",
        nivel: "simple",
        como: [
          "Con el motor en marcha, apriete la pera.",
          "Si anda mejor, le falta nafta.",
          "Revise que la manguera no esté doblada ni pisada."
        ],
        solucion: "Si apretando la pera anda, siga con los pasos de nafta."
      },
      {
        titulo: "Motor frío",
        nivel: "simple",
        alimentacion: "carburador",
        como: [
          "Si está frío, déjelo 3 a 5 minutos en punto muerto.",
          "Vuelva el cebador de a poco, no de golpe."
        ],
        solucion: "Si caliente anda bien, no hay falla."
      },
      {
        titulo: "Al poner la marcha",
        nivel: "simple",
        como: [
          "Ponga la marcha sin acelerar, con un movimiento firme y rápido.",
          "Fíjese que no haya soga o bolsas en la hélice (con el motor apagado)."
        ],
        solucion: "Si así no se apaga, no hay falla."
      },
      {
        titulo: "Luz o pitido",
        nivel: "simple",
        como: [
          "Si sonó un pitido o se prendió una luz, elija el síntoma \"Suena un pitido o se prende una luz\"."
        ],
        solucion: "Siga ese síntoma."
      },
      {
        titulo: "Nafta vieja o con agua",
        nivel: "intermedio",
        como: [
          "Pruebe con un bidón chico de nafta nueva.",
          "Si el filtro de nafta (el vasito) tiene agua, vacíelo."
        ],
        solucion: "Si anda con nafta nueva, era la nafta."
      },
      {
        titulo: "Bomba de nafta",
        nivel: "intermedio",
        alimentacion: "carburador",
        como: [
          "Si solo anda apretando la pera, falla la bomba de nafta.",
          "Revise que sus mangueritas no estén rotas ni sueltas."
        ],
        solucion: "Si una manguerita estaba suelta y la ajustó, se soluciona."
      },
      {
        titulo: "Bombas de nafta",
        nivel: "intermedio",
        alimentacion: "inyeccion",
        como: [
          "Gire la llave sin arrancar: debe sonar un zumbido corto.",
          "Si no suena, revise la batería y el fusible de la bomba (ver manual)."
        ],
        solucion: "Si el fusible estaba cortado y el nuevo dura, era eso.",
        alto: "No afloje mangueras de nafta en este motor: la nafta sale con presión."
      },
      {
        titulo: "Llevar al mecánico",
        nivel: "mecanico",
        como: [
          "Carburador: membranas de la bomba de nafta (muy común en 2T), chicler de baja tapado o flotante trabado.",
          "4T EFI: bomba de baja, bomba de alta (en el separador de vapor), filtro de alta, válvula IAC o sensor. Leer códigos.",
          "2T con autolube: si se apagó por falta de aceite, revisar la bomba de aceite antes de usarlo."
        ]
      }
    ]
  },

  {
    id: "ralenti",
    icono: "saltos",
    grupo: "En marcha",
    titulo: "En baja anda a los saltos",
    descripcion: "Sin acelerar, el motor tironea, se acelera solo o vibra.",
    pasos: [
      {
        titulo: "Déjelo calentar",
        nivel: "simple",
        como: [
          "En frío es normal que ande irregular.",
          "Espere 5 minutos. Si tiene cebador, vuélvalo del todo."
        ],
        solucion: "Si caliente anda parejo, no hay falla."
      },
      {
        titulo: "Dele una pasada",
        nivel: "simple",
        tiempos: "2T",
        como: [
          "Si anduvo mucho rato despacio, se ensucia.",
          "Acelere a media marcha 1 o 2 minutos."
        ],
        solucion: "Si después anda parejo, era suciedad."
      },
      {
        titulo: "La pera de goma",
        nivel: "simple",
        como: [
          "Apriete la pera con el motor en marcha.",
          "Si mejora, revise que la manguera esté bien ajustada."
        ],
        solucion: "Con la manguera firme, anda parejo."
      },
      {
        titulo: "Bujías (en tierra)",
        nivel: "intermedio",
        como: [
          "Revise que los capuchones de las bujías estén bien puestos.",
          "Cambie las bujías por nuevas (las que dice la ficha de su motor)."
        ],
        solucion: "Si con bujías nuevas anda parejo, eran las bujías."
      },
      {
        titulo: "Llevar al mecánico",
        nivel: "mecanico",
        como: [
          "Carburador: chiclers de baja tapados, carburadores desincronizados o mezcla mal regulada.",
          "2T: entradas de aire por juntas de admisión o retenes de cigüeñal.",
          "Inyección: válvula IAC, inyector o sensor. Requiere escáner.",
          "4T: luz de válvulas. En general: baja compresión de un cilindro."
        ]
      }
    ]
  },

  {
    id: "pierde-potencia",
    icono: "fuerza",
    grupo: "En marcha",
    titulo: "No tiene fuerza o no planea",
    descripcion: "Va más lento que antes o no levanta.",
    pasos: [
      {
        titulo: "Mire la hélice",
        nivel: "simple",
        como: [
          "Apague el motor y saque la llave roja.",
          "Levante el motor y mire la hélice.",
          "Saque soga, tanza, bolsas o algas enredadas."
        ],
        solucion: "Con la hélice limpia, recupera velocidad."
      },
      {
        titulo: "Peso y posición del motor",
        nivel: "simple",
        como: [
          "Reparta el peso: no todo atrás.",
          "Para salir, baje el motor del todo (inclinado hacia la lancha).",
          "Ya andando rápido, súbalo un poco."
        ],
        solucion: "Muchas veces solo era eso."
      },
      {
        titulo: "Luz o pitido",
        nivel: "simple",
        como: [
          "Muchos motores bajan la fuerza solos cuando algo anda mal.",
          "Si hubo pitido o luz, elija el síntoma \"Suena un pitido o se prende una luz\"."
        ],
        solucion: "Siga ese síntoma."
      },
      {
        titulo: "La pera de goma",
        nivel: "simple",
        como: [
          "Acelere y apriete la pera.",
          "Si recupera fuerza, le falta nafta.",
          "Afloje la tapa del tanque y revise que la manguera no esté doblada."
        ],
        solucion: "Con buena nafta, vuelve a tirar."
      },
      {
        titulo: "Bomba de nafta",
        nivel: "intermedio",
        alimentacion: "carburador",
        como: [
          "Si anda bien despacio y se corta a fondo, suele ser la bomba de nafta.",
          "Revise que sus mangueritas no estén rotas ni sueltas.",
          "Si están bien, la bomba se repara en el taller."
        ],
        solucion: "Si una manguerita estaba suelta y la ajustó, vuelve la fuerza."
      },
      {
        titulo: "Filtro de nafta",
        nivel: "intermedio",
        alimentacion: "inyeccion",
        como: [
          "Si anda bien despacio y se corta a fondo, revise el filtro de nafta.",
          "Si tiene agua o mugre, cámbielo."
        ],
        solucion: "Con el filtro limpio, recupera la fuerza.",
        alto: "No afloje mangueras de nafta en este motor: la nafta sale con presión."
      },
      {
        titulo: "Bujías (en tierra)",
        nivel: "intermedio",
        como: [
          "Cambie las bujías por nuevas (las que dice la ficha de su motor)."
        ],
        solucion: "Si con bujías nuevas tiene fuerza, eran las bujías."
      },
      {
        titulo: "Llevar al mecánico",
        nivel: "mecanico",
        como: [
          "Carburador: bomba de nafta de membrana débil (muy común en 2T) o chiclers de alta sucios.",
          "4T EFI: bomba de baja o de alta presión, filtro de alta, inyectores o sensores.",
          "Buje de goma de la hélice patinando. Baja compresión.",
          "Si un cilindro no trabaja, seguir usándolo puede romper el motor."
        ]
      }
    ]
  },

  {
    id: "falla-alta",
    icono: "acelerador",
    grupo: "En marcha",
    titulo: "Tose o se corta al acelerar",
    descripcion: "Al acelerar se ahoga o pega tirones.",
    pasos: [
      {
        titulo: "Tapa del tanque y pera",
        nivel: "simple",
        como: [
          "Afloje el tornillito de la tapa del tanque.",
          "Acelere y apriete la pera: si deja de toser, le falta nafta."
        ],
        solucion: "Con la nafta pasando bien, acelera limpio."
      },
      {
        titulo: "Cebador",
        nivel: "simple",
        alimentacion: "carburador",
        como: [
          "Fíjese que el cebador esté guardado del todo.",
          "Acelere de a poco, no de golpe."
        ],
        solucion: "Si acelerando suave no falla, está sano."
      },
      {
        titulo: "Bomba de nafta",
        nivel: "intermedio",
        alimentacion: "carburador",
        como: [
          "Si solo anda bien apretando la pera, falla la bomba de nafta.",
          "Revise que sus mangueritas no estén rotas ni sueltas."
        ],
        solucion: "Si una manguerita estaba suelta y la ajustó, se soluciona."
      },
      {
        titulo: "Filtro de nafta",
        nivel: "intermedio",
        como: [
          "Si el filtro de nafta tiene agua o mugre, cámbielo.",
          "Pruebe con nafta nueva en un bidón aparte."
        ],
        solucion: "Con nafta limpia, deja de toser."
      },
      {
        titulo: "Bujías (en tierra)",
        nivel: "intermedio",
        como: [
          "Cambie las bujías por nuevas.",
          "Fíjese que los capuchones estén bien puestos."
        ],
        solucion: "Con bujías nuevas, acelera limpio."
      },
      {
        titulo: "Llevar al mecánico",
        nivel: "mecanico",
        como: [
          "Carburador: membranas de la bomba de nafta, bomba de aceleración o chiclers de transición.",
          "Encendido: bobinas, cables, CDI o avance.",
          "4T EFI: bomba de baja o de alta, TPS, MAP o inyectores. Requiere escáner."
        ]
      }
    ]
  },

  {
    id: "ruido",
    icono: "ruido",
    grupo: "En marcha",
    titulo: "Hace un ruido raro",
    descripcion: "Golpes, ruido a metal o un sonido nuevo.",
    alerta: "Si es un golpeteo de metal, saque el acelerador y apague. Puede romperse el motor.",
    pasos: [
      {
        titulo: "¿De dónde viene?",
        nivel: "simple",
        como: [
          "Ponga punto muerto.",
          "Si el ruido sigue, viene del motor. Si se va, viene de abajo (hélice o cola).",
          "Anótelo: ayuda al mecánico."
        ],
        solucion: "Anote lo que notó."
      },
      {
        titulo: "Algo suelto",
        nivel: "simple",
        como: [
          "Fíjese que la tapa del motor esté bien cerrada.",
          "Revise que el motor esté firme en la popa.",
          "Busque cosas sueltas cerca: tanque, batería, herramientas."
        ],
        solucion: "Ajustado lo suelto, se va el ruido."
      },
      {
        titulo: "Hélice",
        nivel: "simple",
        como: [
          "Con el motor apagado, mire la hélice.",
          "Saque lo que tenga enredado. Fíjese si tiene golpes."
        ],
        solucion: "Si la hélice está golpeada, se repara o cambia."
      },
      {
        titulo: "Aceite del motor",
        nivel: "simple",
        tiempos: "4T",
        como: [
          "Con el motor apagado, mire el nivel con la varilla.",
          "Si falta, complete con el aceite de su motor."
        ],
        solucion: "Un tic-tic suave puede ser normal. Coméntelo en el próximo service."
      },
      {
        titulo: "Llevar al mecánico",
        nivel: "mecanico",
        como: [
          "Golpeteo metálico: bielas, pistones o rodamientos. No usarlo.",
          "Ruido en cambio: engranajes o rodamientos de la cola. Revisar aceite de cola.",
          "Chillido: rodamientos, correa de distribución (4T) o burro de arranque.",
          "Cascabeleo al exigirlo: nafta de bajo octanaje, carbón o encendido adelantado."
        ]
      }
    ]
  },

  {
    id: "vibra",
    icono: "vibracion",
    grupo: "En marcha",
    titulo: "Vibra",
    descripcion: "Vibra más que antes.",
    alerta: "Si empezó a vibrar después de un golpe, vuelva despacio.",
    pasos: [
      {
        titulo: "Hélice",
        nivel: "simple",
        como: [
          "Apague el motor y mire la hélice.",
          "Saque lo que tenga enredado.",
          "Una pala torcida, aunque sea poco, hace vibrar."
        ],
        solucion: "Si la hélice está golpeada, se repara o cambia."
      },
      {
        titulo: "Motor flojo",
        nivel: "simple",
        como: [
          "Apriete las dos manijas que sujetan el motor a la popa.",
          "Fíjese que el motor no se mueva."
        ],
        solucion: "Con el motor firme, vibra menos."
      },
      {
        titulo: "Bujías (en tierra)",
        nivel: "intermedio",
        como: [
          "Si vibra más en baja y anda a los saltos, cambie las bujías."
        ],
        solucion: "Si con bujías nuevas anda parejo, eran las bujías."
      },
      {
        titulo: "Llevar al mecánico",
        nivel: "mecanico",
        como: [
          "Soportes de goma del motor gastados.",
          "Eje de hélice doblado después de un golpe.",
          "Un cilindro que no trabaja."
        ]
      }
    ]
  },

  {
    id: "humo",
    icono: "humo",
    grupo: "En marcha",
    titulo: "Echa mucho humo",
    descripcion: "Más humo que antes, o de otro color.",
    pasos: [
      {
        titulo: "¿Es normal?",
        nivel: "simple",
        tiempos: "2T",
        como: [
          "Un motor 2T siempre echa algo de humo, más en frío.",
          "Preocupa si aumentó de golpe o cambió de color."
        ],
        solucion: "Si es poco y se va al calentar, es normal."
      },
      {
        titulo: "¿Es normal?",
        nivel: "simple",
        tiempos: "4T",
        como: [
          "Un 4T caliente casi no echa humo.",
          "Mire el aceite con la varilla: si hay de más, echa humo azul."
        ],
        solucion: "Con el aceite en su nivel, no debería echar humo."
      },
      {
        titulo: "La mezcla",
        nivel: "simple",
        tiempos: "2T",
        alimentacion: "carburador",
        como: [
          "Si pone aceite en la nafta: use la medida del manual. Aceite de más da humo azul.",
          "Use aceite para motores náuticos de 2 tiempos.",
          "Si su motor tiene tanque de aceite aparte, no ponga aceite en la nafta."
        ],
        solucion: "Con la mezcla correcta, baja el humo."
      },
      {
        titulo: "Humo negro",
        nivel: "simple",
        como: [
          "Humo negro es nafta de más.",
          "Fíjese que el cebador esté guardado."
        ],
        solucion: "Sin cebador, se va el humo negro."
      },
      {
        titulo: "Llevar al mecánico",
        nivel: "mecanico",
        como: [
          "Humo blanco espeso con el motor caliente: agua en el cilindro (junta de tapa). No usarlo.",
          "Humo azul en 4T con consumo de aceite: desgaste de aros o guías de válvula.",
          "2T con autolube: bomba de aceite desregulada."
        ]
      }
    ]
  },

  /* =================================================================
     TEMPERATURA Y ALARMAS
     ================================================================= */
  {
    id: "testigo",
    icono: "chorro-agua",
    grupo: "Temperatura y alarmas",
    titulo: "No sale el chorro testigo",
    descripcion: "El chorro de agua del costado del motor sale débil o no sale.",
    urgente: true,
    alerta: "Apague el motor ya. Sin agua, el motor se rompe en pocos minutos.",
    pasos: [
      {
        titulo: "Mire las rejillas de abajo",
        nivel: "simple",
        como: [
          "Levante el motor.",
          "Mire las rejillas de abajo, cerca de la hélice.",
          "Saque bolsas, algas o barro."
        ],
        solucion: "Arranque: el chorro testigo debería volver."
      },
      {
        titulo: "Destape el chorro testigo",
        nivel: "simple",
        como: [
          "Con el motor apagado, meta un alambre fino o una tanza en el orificio del chorro testigo.",
          "Arranque y mire si sale fuerte."
        ],
        solucion: "Si sale fuerte, era mugre. Puede seguir."
      },
      {
        titulo: "Si sigue sin salir",
        nivel: "simple",
        como: [
          "No use el motor.",
          "Vuelva a remo o pida remolque.",
          "Fíjese en Mantenimiento cuándo cambió el rotor de la bomba de agua."
        ],
        solucion: "Llévelo al taller."
      },
      {
        titulo: "Llevar al mecánico",
        nivel: "mecanico",
        como: [
          "Rotor (impulsor) de la bomba de agua gastado o roto. Se cambia bajando la cola.",
          "Termostato o conductos tapados con sal o arena.",
          "Si recalentó: medir compresión antes de seguir usándolo."
        ]
      }
    ]
  },

  {
    id: "recalienta",
    icono: "temperatura",
    grupo: "Temperatura y alarmas",
    titulo: "Se recalienta",
    descripcion: "Pitido de temperatura, pierde fuerza solo o quema la tapa.",
    urgente: true,
    alerta: "Saque el acelerador y apague. Si sigue andando caliente, se funde.",
    pasos: [
      {
        titulo: "Mire las rejillas de abajo",
        nivel: "simple",
        como: [
          "Levante el motor.",
          "Mire las rejillas de abajo, cerca de la hélice.",
          "Saque bolsas, algas o barro."
        ],
        solucion: "Una bolsa pegada es lo más común."
      },
      {
        titulo: "Pruebe despacio",
        nivel: "simple",
        como: [
          "Espere 5 minutos con el motor apagado.",
          "Arranque sin acelerar y mire el chorro testigo del costado.",
          "Si sale fuerte y apenas tibio, vuelva despacio."
        ],
        solucion: "Si no vuelve a sonar, era algo que tapaba la toma."
      },
      {
        titulo: "Motor muy levantado",
        nivel: "simple",
        como: [
          "Si el motor está muy levantado, chupa aire en vez de agua.",
          "Bájelo del todo y pruebe."
        ],
        solucion: "Con el motor bien abajo, toma agua."
      },
      {
        titulo: "Aceite",
        nivel: "simple",
        tiempos: "4T",
        como: [
          "Con el motor apagado, mire el aceite con la varilla.",
          "Si falta, complete con el aceite de su motor."
        ],
        solucion: "Con el aceite completo, trabaja bien."
      },
      {
        titulo: "Aceite",
        nivel: "simple",
        tiempos: "2T",
        como: [
          "Si su motor tiene tanque de aceite aparte, fíjese que tenga aceite.",
          "Si pone aceite en la nafta, fíjese que la medida sea la del manual."
        ],
        solucion: "Con el aceite correcto, trabaja bien."
      },
      {
        titulo: "Llevar al mecánico",
        nivel: "mecanico",
        como: [
          "Rotor (impulsor) de la bomba de agua gastado (lo más común).",
          "Termostato trabado o válvula de presión (poppet) del 2T pegada.",
          "Conductos tapados con sal, arena o sarro. Sensor de temperatura con falla.",
          "Si recalentó fuerte: medir compresión antes de usarlo."
        ]
      }
    ]
  },

  {
    id: "alarma",
    icono: "alarma",
    grupo: "Temperatura y alarmas",
    titulo: "Suena un pitido o se prende una luz",
    descripcion: "Pitido seguido, luz en el tablero o perdió fuerza solo.",
    urgente: true,
    alerta: "Saque el acelerador. Si el pitido sigue, apague el motor.",
    pasos: [
      {
        titulo: "¿Fue solo al dar la llave?",
        nivel: "simple",
        como: [
          "Un pitido de 1 o 2 segundos al girar la llave es normal.",
          "Si se calla enseguida, no pasa nada."
        ],
        solucion: "Es una prueba normal."
      },
      {
        titulo: "Mire el chorro testigo",
        nivel: "simple",
        como: [
          "Lo más común es el aviso de temperatura.",
          "Si el chorro testigo no sale, elija el síntoma \"Se recalienta\"."
        ],
        solucion: "Siga ese síntoma."
      },
      {
        titulo: "Tanque de aceite",
        nivel: "simple",
        tiempos: "2T",
        como: [
          "Si su motor tiene tanque de aceite aparte, fíjese que tenga aceite.",
          "Complete con aceite náutico de 2 tiempos."
        ],
        solucion: "Con el tanque lleno, el pitido se corta.",
        alto: "Si sigue sonando con el tanque lleno, no use el motor: se puede fundir."
      },
      {
        titulo: "Aceite del motor",
        nivel: "simple",
        tiempos: "4T",
        como: [
          "Apague y espere 5 minutos.",
          "Mire el aceite con la varilla. Si falta, complete.",
          "Si el aceite está blanco como leche, no arranque."
        ],
        solucion: "Si faltaba aceite y la luz se apaga, mírelo en cada salida.",
        alto: "Si la luz de aceite sigue prendida con el aceite completo, no use el motor."
      },
      {
        titulo: "Luz de falla",
        nivel: "simple",
        alimentacion: "inyeccion",
        como: [
          "Anote qué luz se prendió y cuándo (en frío, acelerando, al arrancar).",
          "Si el motor anda bien, vuelva despacio y llévelo al taller."
        ],
        solucion: "Coméntelo al mecánico."
      },
      {
        titulo: "Llevar al mecánico",
        nivel: "mecanico",
        como: [
          "Sensor de temperatura, nivel o presión de aceite con falla.",
          "2T: bomba de aceite del autolube sin entregar.",
          "4T: bomba de aceite o filtro tapado.",
          "Inyección: falla registrada en la ECU. Leer con escáner."
        ]
      }
    ]
  },

  /* =================================================================
     GOLPES Y CAÍDAS AL AGUA
     ================================================================= */
  {
    id: "motor-al-agua",
    grupo: "Golpes y caídas al agua",
    icono: "motor-mojado",
    titulo: "El motor se cayó al agua",
    descripcion: "El motor quedó bajo el agua o se mojó entero.",
    alerta: "No intente arrancarlo: se puede romper por dentro. Lo que cuenta es actuar rápido.",
    pasos: [
      {
        titulo: "Sáquelo y no lo arranque",
        nivel: "simple",
        como: [
          "Saque el motor del agua lo antes posible.",
          "No dé arranque ni tire de la piola.",
          "Si se cayó en agua salada o con barro, enjuáguelo con agua dulce."
        ],
        solucion: "Siga el paso siguiente, o llévelo directo al taller."
      },
      {
        titulo: "Sacar el agua (en tierra)",
        nivel: "intermedio",
        como: [
          "Saque las bujías.",
          "Con el motor acostado o boca abajo, gire el motor despacio con la piola para que salga el agua por los agujeros de las bujías.",
          "Si se traba, no fuerce.",
          "Ponga un poco de aceite de motor en cada agujero y gire otra vez."
        ],
        solucion: "Así el motor se protege del óxido hasta llegar al taller."
      },
      {
        titulo: "Al taller en pocas horas",
        nivel: "simple",
        como: [
          "Llévelo al taller el mismo día, mejor dentro de las 3 horas.",
          "Cuanto más tarda, más se oxida por dentro."
        ],
        solucion: "Llévelo al taller."
      },
      {
        titulo: "Llevar al mecánico",
        nivel: "mecanico",
        como: [
          "Motor sumergido: sacar agua de cilindros, cárter y sistema de nafta.",
          "Cambiar aceites (motor 4T y cola), limpiar carburador o revisar inyección.",
          "Secar y revisar la parte eléctrica (encendido, ECU, conectores, burro de arranque).",
          "Si hubo arena o barro, o se trabó al girarlo: desarme."
        ]
      }
    ]
  },

  {
    id: "golpe",
    grupo: "Golpes y caídas al agua",
    icono: "golpe",
    titulo: "Pegué contra algo",
    descripcion: "Golpe contra una piedra, un tronco o el fondo.",
    alerta: "Saque el acelerador y apague el motor. Revise antes de seguir.",
    pasos: [
      {
        titulo: "Primero, las personas",
        nivel: "simple",
        como: [
          "Fíjese que nadie esté lastimado.",
          "Mire si entra agua en la lancha.",
          "Si entra agua o hay heridos, llame a Prefectura (106)."
        ],
        solucion: "Si todos están bien y no entra agua, siga."
      },
      {
        titulo: "Mire el motor",
        nivel: "simple",
        como: [
          "Levante el motor y mire la hélice: palas dobladas o rotas.",
          "Mire la parte de abajo del motor: rajaduras o pérdida de aceite.",
          "Fíjese que el motor no haya quedado torcido o flojo en la popa."
        ],
        solucion: "Si no ve daños, pruebe con cuidado."
      },
      {
        titulo: "Pruebe despacio",
        nivel: "simple",
        como: [
          "Arranque y mire que salga el chorro testigo.",
          "Ponga la marcha y avance despacio.",
          "Si vibra mucho o hace ruido, apague y pida remolque."
        ],
        solucion: "Si anda bien, vuelva despacio y hágalo revisar."
      },
      {
        titulo: "Llevar al mecánico",
        nivel: "mecanico",
        como: [
          "Hélice dañada o buje patinando. Eje de hélice doblado.",
          "Cola rajada o con agua en el aceite: revisar aceite de cola.",
          "Soportes, cilindros del trim o fijación al espejo dañados.",
          "Si tomó arena o barro: revisar la bomba de agua."
        ]
      }
    ]
  },

  /* =================================================================
     HÉLICE Y MARCHAS
     ================================================================= */
  {
    id: "no-empuja",
    icono: "helice",
    grupo: "Hélice y marchas",
    titulo: "Acelero y la lancha no avanza",
    descripcion: "El motor sube de vueltas pero no avanza.",
    pasos: [
      {
        titulo: "Mire la hélice",
        nivel: "simple",
        como: [
          "Apague el motor y saque la llave roja.",
          "Levante el motor y mire la hélice.",
          "Saque soga, red o bolsas. Fíjese que no falte una pala."
        ],
        solucion: "Con la hélice libre, vuelve a empujar."
      },
      {
        titulo: "La marcha",
        nivel: "simple",
        como: [
          "Fíjese que la palanca esté bien adelante, no a mitad de camino."
        ],
        solucion: "Con la marcha bien puesta, empuja."
      },
      {
        titulo: "Perno de la hélice (motores chicos)",
        nivel: "intermedio",
        como: [
          "En motores chicos, la hélice tiene un perno que se corta si pega con algo.",
          "Saque la hélice y cambie el perno por uno nuevo.",
          "Lleve siempre uno de repuesto."
        ],
        solucion: "Con el perno nuevo, vuelve a empujar."
      },
      {
        titulo: "Llevar al mecánico",
        nivel: "mecanico",
        como: [
          "Buje de goma de la hélice patinando.",
          "Cable de cambio desregulado o cortado.",
          "Embrague o engranajes de la cola gastados."
        ]
      }
    ]
  },

  {
    id: "cambio",
    icono: "palanca",
    grupo: "Hélice y marchas",
    titulo: "No entra la marcha o golpea",
    descripcion: "Cuesta poner la marcha, se sale o da un golpe fuerte.",
    pasos: [
      {
        titulo: "Cambie sin acelerar",
        nivel: "simple",
        como: [
          "Saque el acelerador del todo y espere.",
          "Ponga la marcha con un movimiento firme y rápido.",
          "De adelante a atrás, pare un momento en el medio."
        ],
        solucion: "Si así entra suave, no hay falla."
      },
      {
        titulo: "Motor frío",
        nivel: "simple",
        como: [
          "En frío el motor anda más acelerado y la marcha golpea.",
          "Déjelo calentar unos minutos."
        ],
        solucion: "Caliente, la marcha entra sin golpe."
      },
      {
        titulo: "Llevar al mecánico",
        nivel: "mecanico",
        como: [
          "Cable de cambio desregulado o vencido.",
          "Embrague (clutch dog) o engranajes de la cola gastados.",
          "Varillaje del cambio desajustado. Revisar aceite de cola."
        ]
      }
    ]
  },

  {
    id: "aceite-cola",
    icono: "aceite-cola",
    grupo: "Hélice y marchas",
    titulo: "El aceite de abajo salió blanco",
    descripcion: "Al cambiar el aceite de la cola salió lechoso o con pedacitos.",
    pasos: [
      {
        titulo: "Cómo debe salir",
        nivel: "simple",
        como: [
          "Bien: color miel o marrón, transparente.",
          "Blanco o café con leche: le entra agua.",
          "Con pedacitos de metal: hay piezas rotas."
        ],
        solucion: "Si salió color miel, está bien."
      },
      {
        titulo: "Tanza en la hélice",
        nivel: "intermedio",
        como: [
          "Saque la hélice y mire detrás.",
          "La tanza de pesca se enrolla ahí y deja entrar agua.",
          "Si hay, sáquela toda."
        ],
        solucion: "Igual conviene revisarlo en el taller."
      },
      {
        titulo: "Llevar al mecánico",
        nivel: "mecanico",
        como: [
          "Retenes del eje de hélice o del eje de mando: cambio y prueba de presión de la cola.",
          "Con limaduras: revisar engranajes y rodamientos.",
          "Con agua, los engranajes se oxidan rápido: no esperar."
        ]
      }
    ]
  },

  /* =================================================================
     BATERÍA Y TRIM
     ================================================================= */
  {
    id: "bateria",
    icono: "bateria",
    grupo: "Batería y trim",
    titulo: "Se descarga la batería",
    descripcion: "La batería se queda sin carga aunque navego.",
    pasos: [
      {
        titulo: "¿Su motor carga batería?",
        nivel: "simple",
        como: [
          "Muchos motores chicos de arranque a piola no cargan batería.",
          "Los que cargan, cargan poco: no alcanza para muchas luces y aparatos."
        ],
        solucion: "Si su motor no carga, cargue la batería en tierra."
      },
      {
        titulo: "Cables de la batería",
        nivel: "simple",
        como: [
          "Apriete los cables en la batería.",
          "Si tienen polvo blanco o verde, límpielos."
        ],
        solucion: "Con buenos contactos, la carga llega."
      },
      {
        titulo: "Aparatos prendidos",
        nivel: "simple",
        como: [
          "Fíjese que no quede nada prendido con la lancha amarrada: luces, bomba de achique, sonda."
        ],
        solucion: "Sin consumos, deja de descargarse."
      },
      {
        titulo: "Batería vieja (en tierra)",
        nivel: "intermedio",
        como: [
          "Si tiene más de 3 o 4 años, puede estar vencida.",
          "Hágala probar en una casa de baterías."
        ],
        solucion: "Con batería nueva, se soluciona."
      },
      {
        titulo: "Llevar al mecánico",
        nivel: "mecanico",
        como: [
          "Medir carga: en marcha a 1.500 rpm debe dar 13,5 a 14,5 V.",
          "Regulador-rectificador o estator con falla.",
          "Fusible del circuito de carga o mazo de cables."
        ]
      }
    ]
  },

  {
    id: "trim",
    icono: "trim",
    grupo: "Batería y trim",
    titulo: "No puedo subir o bajar el motor",
    descripcion: "El botón para levantar el motor no funciona, o el motor baja solo.",
    pasos: [
      {
        titulo: "Tornillo para subirlo a mano",
        nivel: "simple",
        como: [
          "El motor tiene un tornillo para subirlo a mano (vea dónde en el manual).",
          "Si quedó abierto, el motor baja solo.",
          "Ciérrelo girando a la derecha, sin forzar."
        ],
        solucion: "Cerrado, el botón vuelve a funcionar."
      },
      {
        titulo: "Batería y botones",
        nivel: "simple",
        como: [
          "Con la batería baja, el motor sube lento o no sube.",
          "Pruebe el botón de la palanca y el de la tapa del motor."
        ],
        solucion: "Si un botón anda y el otro no, falla ese botón."
      },
      {
        titulo: "Para volver",
        nivel: "simple",
        como: [
          "Si necesita subirlo o bajarlo, abra el tornillo y muévalo a mano.",
          "Ciérrelo de nuevo para que quede firme."
        ],
        solucion: "Llévelo al taller al volver.",
        alto: "No se ponga debajo del motor levantado."
      },
      {
        titulo: "Llevar al mecánico",
        nivel: "mecanico",
        como: [
          "Falta de aceite en el trim o pérdida por los retenes de los cilindros.",
          "Relés, motor eléctrico de la bomba del trim o cableado.",
          "Bomba hidráulica gastada."
        ]
      }
    ]
  },

  /* =================================================================
     NAFTA Y ACEITE
     ================================================================= */
  {
    id: "sin-nafta",
    grupo: "Nafta y aceite",
    icono: "nafta",
    titulo: "Me quedé sin nafta o cargué mal",
    descripcion: "Se acabó la nafta, o cargué la nafta o la mezcla equivocada.",
    pasos: [
      {
        titulo: "Si se acabó la nafta",
        nivel: "simple",
        como: [
          "Cargue nafta o cambie al tanque de reserva.",
          "Afloje el tornillito de la tapa del tanque.",
          "Apriete la pera de goma hasta que quede dura."
        ],
        solucion: "Arranque: puede tardar un poco más de lo normal."
      },
      {
        titulo: "Volver a cebar",
        nivel: "simple",
        alimentacion: "inyeccion",
        como: [
          "Gire la llave sin arrancar y espere el zumbido.",
          "Apague la llave y repita 3 o 4 veces.",
          "Recién ahí dé arranque, sin acelerar."
        ],
        solucion: "Así la nafta vuelve a llegar al motor."
      },
      {
        titulo: "Si cargó nafta sin aceite",
        nivel: "simple",
        tiempos: "2T",
        alimentacion: "carburador",
        como: [
          "Si su motor lleva mezcla y cargó nafta sola: no lo use, se funde.",
          "Vacíe el tanque y cargue la mezcla correcta.",
          "Si ya anduvo con nafta sola, llévelo al taller antes de usarlo."
        ],
        solucion: "Con la mezcla correcta, puede usarlo si no llegó a andar sin aceite."
      },
      {
        titulo: "Si cargó mezcla con aceite",
        nivel: "simple",
        tiempos: "4T",
        como: [
          "Si cargó mezcla de 2 tiempos en este motor, puede volver despacio.",
          "Va a echar humo. Cambie la nafta apenas llegue."
        ],
        solucion: "Con nafta sola, el humo se va."
      },
      {
        titulo: "Si cargó gasoil u otro combustible",
        nivel: "simple",
        como: [
          "No arranque el motor.",
          "Vuelva a remo o pida remolque, y llévelo al taller."
        ],
        solucion: "Llévelo al taller."
      },
      {
        titulo: "Llevar al mecánico",
        nivel: "mecanico",
        como: [
          "Combustible equivocado: vaciar tanque, mangueras, filtro y carburador o sistema de inyección.",
          "2T que anduvo sin aceite: medir compresión y revisar cilindros.",
          "Inyección que no vuelve a arrancar: purgar el separador de vapor y revisar bombas."
        ]
      }
    ]
  },

  {
    id: "olor-nafta",
    icono: "nafta",
    grupo: "Nafta y aceite",
    titulo: "Pierde nafta o hay olor a nafta",
    descripcion: "Gotea nafta o hay olor fuerte.",
    urgente: true,
    alerta: "Apague el motor. No fume. No arranque hasta que se vaya el olor.",
    pasos: [
      {
        titulo: "Manguera y pera",
        nivel: "simple",
        como: [
          "Mire las puntas de la manguera, en el tanque y en el motor.",
          "Mire la pera de goma: si está rajada, pierde.",
          "Si encuentra la pérdida, desenchufe la manguera del motor."
        ],
        solucion: "Cambie la pieza rota antes de volver a usarlo."
      },
      {
        titulo: "Tanque",
        nivel: "simple",
        como: [
          "Con el tanque muy lleno y al sol, la nafta puede salir por la tapa.",
          "Revise que la tapa cierre bien."
        ],
        solucion: "Si perdía el tanque, el motor está bien."
      },
      {
        titulo: "Llevar al mecánico",
        nivel: "mecanico",
        como: [
          "Válvula de aguja o flotante del carburador que no cierra.",
          "Inyección: pérdida en el circuito de alta presión. No tocar.",
          "Bomba de nafta, separador de vapor o filtro con pérdida.",
          "No usar el motor con pérdidas: riesgo de incendio."
        ]
      }
    ]
  },

  {
    id: "aceite-motor",
    icono: "aceite",
    grupo: "Nafta y aceite",
    titulo: "El aceite del motor sube o huele a nafta",
    descripcion: "La varilla marca más aceite que antes o huele a nafta.",
    tiempos: "4T",
    pasos: [
      {
        titulo: "Mida bien",
        nivel: "simple",
        como: [
          "Motor derecho y apagado hace 5 minutos.",
          "Saque la varilla, límpiela, métala hasta el fondo y vuelva a sacarla."
        ],
        solucion: "Si así está bien, no hay falla."
      },
      {
        titulo: "Si huele a nafta",
        nivel: "simple",
        como: [
          "No use el motor hasta cambiar el aceite.",
          "Al terminar cada salida, desenchufe la manguera de nafta."
        ],
        solucion: "Si con aceite nuevo no vuelve a subir, era por uso."
      },
      {
        titulo: "Llevar al mecánico",
        nivel: "mecanico",
        como: [
          "Aceite blanco: agua en el aceite (junta de tapa o fisura). No usarlo.",
          "Nafta en el aceite que vuelve: flotante del carburador, inyector o bomba de nafta con pérdida."
        ]
      }
    ]
  },

  {
    id: "consumo",
    icono: "consumo",
    grupo: "Nafta y aceite",
    titulo: "Gasta más nafta que antes",
    descripcion: "Para el mismo viaje, gasta más.",
    pasos: [
      {
        titulo: "Casco y hélice",
        nivel: "simple",
        como: [
          "Un casco sucio (verdín, mejillón) gasta mucho más.",
          "Revise que la hélice no esté golpeada.",
          "Más peso a bordo también gasta más."
        ],
        solucion: "Con el casco limpio, baja el consumo."
      },
      {
        titulo: "Pérdidas y cebador",
        nivel: "simple",
        como: [
          "Busque pérdidas en la manguera y la pera.",
          "Fíjese que el cebador esté guardado."
        ],
        solucion: "Sin pérdidas, baja el consumo."
      },
      {
        titulo: "Llevar al mecánico",
        nivel: "mecanico",
        como: [
          "Carburador: flotante alto o chiclers gastados.",
          "Inyección: sensores o inyectores.",
          "Baja compresión."
        ]
      }
    ]
  }
];

/* Orden en que se muestran los grupos en la lista de síntomas */
window.DATOS.GRUPOS_DIAGNOSTICO = [
  "Temperatura y alarmas",
  "Arranque",            // Juan (13/11/2026): "No arranca" justo debajo de las 3 primeras, es la falla más común
  "Golpes y caídas al agua",
  "En marcha",
  "Hélice y marchas",
  "Nafta y aceite",
  "Batería y trim"
];
