/* =====================================================================
   HAGA EL SERVICE USTED MISMO + COMPRAR LOS REPUESTOS
   Pedido de Juan (15/11/2026): guía paso a paso de todo el service preventivo
   que puede hacer el dueño, en 2T y en 4T. El límite es la limpieza del
   carburador: se explica, pero antes se avisa que es la tarea más arriesgada
   y que siempre conviene llevarlo al mecánico.

   - Los DATOS de cada motor (aceite, cantidades, bujía, luz, ajustes) NO se
     escriben acá: la app los toma de la ficha de cada motor (datos-motores.js,
     sacados del manual de cada marca). En "datos" se pone el nombre del dato.
   - "tarea": id de la tarea de mantenimiento. Si el motor no tiene esa tarea
     (por ejemplo, carburador en un motor a inyección), el ítem no aparece.
   - "tiempos" / "alimentacion": igual que en el resto de la app (filtran).
   - Cada paso es UNA pantalla, con 4 renglones como máximo.
   ===================================================================== */
window.SERVICE_PROPIO = {

  items: [
    {
      id: "preparar", titulo: "Antes de empezar", nivel: "facil",
      resumen: "Lugar, repuestos y seguridad.",
      materiales: ["Trapos", "Recipiente para el aceite viejo", "Guantes", "Las herramientas de cada tarea"],
      pasos: [
        { titulo: "Elija el lugar", como: [
          "Trabaje con el motor en tierra firme: en su caballete o colgado de la lancha, en la guardería.",
          "El motor tiene que quedar bien derecho (vertical).",
          "Lugar con aire, sin fuego ni cigarrillos cerca: va a manejar nafta y aceite."
        ] },
        { titulo: "Junte todo lo que necesita", como: [
          "Cada tarea le muestra la lista \"Lo que necesita\", con los datos de su motor.",
          "Tenga todo a mano antes de desarmar nada.",
          "Si le falta algo, puede pedirlo desde \"Comprar los repuestos\"."
        ], boton: "repuestos" },
        { titulo: "Que el motor no pueda arrancar", como: [
          "Saque la llave de contacto y la llave de corte (la del cordón de hombre al agua).",
          "Saque los capuchones de las bujías, tirando del capuchón y no del cable.",
          "Si tiene arranque eléctrico, desconecte el cable negro (−) de la batería."
        ], alto: "Nunca meta las manos cerca de la hélice con los capuchones puestos: el motor puede arrancar." }
      ]
    },

    {
      id: "aceite-motor", tarea: "aceite-motor", tiempos: "4T", titulo: "Aceite y filtro de motor", nivel: "medio",
      resumen: "Drenar el aceite viejo, cambiar el filtro y cargar el nuevo.",
      datos: ["Aceite de motor", "Cantidad de aceite", "Filtro de aceite", "Tapón de aceite / filtro", "Ajuste tapón de aceite"],
      materiales: ["Aceite 4T náutico (el de su motor)", "Filtro de aceite (si su motor lleva)", "Arandela nueva del tornillo de drenaje", "Llave de filtro", "Llaves fijas o de tubo", "Recipiente de 5 litros", "Embudo"],
      pasos: [
        { titulo: "Entibie el aceite (recomendado)", como: [
          "Vuelva a poner los capuchones y la llave de corte, solo para este paso.",
          "Ponga las orejeras, abra el agua y haga andar el motor 5 minutos en neutro. Mire el chorro testigo.",
          "Apague el motor, cierre el agua y saque otra vez los capuchones y la llave de corte."
        ], alto: "El aceite tibio sale mejor, pero el motor quema: use guantes." },
        { titulo: "Saque el aceite viejo", como: [
          "Con el motor derecho, saque la tapa de carga de aceite (arriba) y la varilla.",
          "Ponga el recipiente y saque el tornillo de drenaje (abajo, en la base del motor).",
          "Deje que gotee unos 10 minutos."
        ] },
        { titulo: "Cambie el filtro de aceite", como: [
          "Si su motor no tiene filtro, salte este paso.",
          "Ponga un trapo debajo y afloje el filtro viejo con la llave de filtro.",
          "Pase un poco de aceite nuevo por la goma del filtro nuevo.",
          "Enrósquelo a mano hasta que toque y ajústelo según el dato de su motor."
        ] },
        { titulo: "Cierre el drenaje", como: [
          "Limpie el tornillo de drenaje y póngale una arandela nueva.",
          "Enrósquelo a mano y ajústelo firme, sin forzar (vea el dato de su motor)."
        ] },
        { titulo: "Cargue el aceite nuevo", como: [
          "Cargue de a poco por la tapa de arriba, sin pasarse de la cantidad de su motor.",
          "Espere 2 minutos y mire la varilla: el nivel tiene que quedar entre las dos marcas.",
          "Cierre bien la tapa de carga."
        ] },
        { titulo: "El aceite viejo", como: [
          "Guárdelo en una botella cerrada.",
          "Llévelo al taller o a una estación de servicio.",
          "Nunca lo tire al agua ni a la tierra."
        ] }
      ]
    },

    {
      id: "helice", tarea: "helice", titulo: "Hélice y eje", nivel: "facil",
      resumen: "Sacar la hélice, limpiar tanzas y engrasar el eje.",
      datos: ["Ajuste tuerca de hélice"],
      materiales: ["Chaveta (pasador) nueva", "Grasa náutica", "Taco de madera", "Pinza", "Llave de tubo para la tuerca"],
      pasos: [
        { titulo: "Prepare", como: [
          "Ponga el cambio en neutro.",
          "Confirme que los capuchones de las bujías estén sacados."
        ] },
        { titulo: "Saque la hélice", como: [
          "Ponga el taco de madera entre una pala y la placa de arriba de la hélice, para que no gire.",
          "Enderece y saque la chaveta con la pinza.",
          "Afloje la tuerca y saque las arandelas y la hélice. Fíjese en qué orden salen."
        ] },
        { titulo: "Revise el eje y la hélice", como: [
          "Saque toda tanza, hilo de pesca o cabo enredado en el eje.",
          "Mire la goma donde entra el eje (retén): si está cortada, el motor tiene que ir al taller.",
          "Palas dobladas, partidas o con muchos golpes: hay que reparar o cambiar la hélice."
        ] },
        { titulo: "Engrase y arme", como: [
          "Limpie el eje y póngale grasa náutica en las estrías.",
          "Arme todo en el mismo orden en que salió.",
          "Ajuste la tuerca (vea el dato de su motor) y coloque una chaveta NUEVA, con las puntas dobladas."
        ], alto: "Nunca vuelva a usar la chaveta vieja." }
      ]
    },

    {
      id: "aceite-cola", tarea: "aceite-cola", titulo: "Aceite de cola", nivel: "facil",
      resumen: "Cambiar el aceite de la pata y ver si entra agua.",
      datos: ["Aceite de cola"],
      materiales: ["Aceite de cola (el de su motor)", "Pomo o bombín para aceite de cola", "Arandelas nuevas para los 2 tapones", "Destornillador ancho", "Recipiente"],
      pasos: [
        { titulo: "Ubique los dos tapones", como: [
          "Motor bien derecho y el recipiente debajo de la cola.",
          "Al costado de la cola hay 2 tapones: uno abajo (drenaje) y uno más arriba (nivel)."
        ] },
        { titulo: "Saque el aceite viejo", como: [
          "Saque primero el tapón de ABAJO.",
          "Después saque el de ARRIBA: así baja todo el aceite.",
          "Deje que gotee hasta que no salga más."
        ] },
        { titulo: "Mire el aceite que salió", como: [
          "Color miel oscuro: normal.",
          "Blanco, lechoso o gris: está entrando agua. Llévelo al taller.",
          "Con pedacitos de metal: llévelo al taller. Una pasta muy fina en el imán del tapón es normal."
        ] },
        { titulo: "Cargue el aceite nuevo desde abajo", como: [
          "Enrosque el pomo en el agujero de ABAJO y apriete hasta que el aceite salga por el de arriba, sin burbujas.",
          "Ponga el tapón de arriba, con arandela nueva.",
          "Saque el pomo y ponga enseguida el tapón de abajo, con arandela nueva."
        ], alto: "Nunca cargue por el agujero de arriba: queda aire adentro y la cola queda con poco aceite." }
      ]
    },

    {
      id: "anodos", tarea: "anodos", titulo: "Ánodos", nivel: "facil",
      resumen: "Revisar las piezas que se gastan para proteger el motor.",
      materiales: ["Ánodos de su motor (si hay que cambiarlos)", "Cepillo de alambre suave", "Llaves o destornillador"],
      pasos: [
        { titulo: "Ubique los ánodos", como: [
          "Son piezas de metal gris opaco atornilladas al motor.",
          "Suelen estar en la aleta de debajo de la placa de la hélice, en la cola y en el soporte que va al espejo."
        ] },
        { titulo: "Revíselos", como: [
          "Si perdieron la mitad de su tamaño o más, hay que cambiarlos.",
          "Si están bien, cepíllelos suave para que queden limpios.",
          "Nunca los pinte: un ánodo pintado no protege nada."
        ] },
        { titulo: "Cámbielos si hace falta", como: [
          "Saque el tornillo y el ánodo viejo.",
          "Limpie la superficie donde apoya: tiene que quedar metal limpio, sin pintura.",
          "Coloque el nuevo y ajuste firme."
        ] }
      ]
    },

    {
      id: "engrase", tarea: "engrase", titulo: "Engrase general", nivel: "facil",
      resumen: "Dirección, inclinación, prensas y articulaciones.",
      datos: ["Grasa"],
      materiales: ["Grasa náutica resistente al agua", "Inflador (pistola) de grasa", "Trapo"],
      pasos: [
        { titulo: "Ubique los piquitos de engrase", como: [
          "Se llaman alemites: son piquitos de metal con una bolita en la punta.",
          "Están en el tubo de la dirección, en el soporte de inclinación y, en algunos motores, en el cambio y el acelerador."
        ] },
        { titulo: "Engrase con el inflador", como: [
          "Limpie el alemite con un trapo.",
          "Apoye el inflador y bombee hasta que asome grasa nueva por los costados.",
          "Limpie la grasa que sobra."
        ] },
        { titulo: "Engrase a mano", como: [
          "Ponga grasa en las roscas de las prensas que agarran el motor al espejo.",
          "También en las articulaciones del cambio, del acelerador y en la traba de inclinación."
        ] },
        { titulo: "Reparta la grasa", como: [
          "Mueva la dirección de un lado al otro varias veces.",
          "Suba y baje el motor (inclinación) una o dos veces."
        ] }
      ]
    },

    {
      id: "bujias", tarea: "bujias", titulo: "Bujías", nivel: "medio",
      resumen: "Sacar, mirar y cambiar las bujías.",
      datos: ["Bujía NGK", "Bujía", "Luz de bujía", "Ajuste de bujía"],
      materiales: ["Bujías nuevas (una por cilindro)", "Llave de bujía", "Calibre de luz (sondas)"],
      pasos: [
        { titulo: "Con el motor frío", como: [
          "Las bujías se cambian con el motor frío.",
          "Si tiene más de una, marque cada cable con cinta (1, 2, 3) para no cruzarlos."
        ] },
        { titulo: "Saque y mire cada bujía", como: [
          "Sáquelas de a una con la llave de bujía.",
          "Punta marrón clara: normal. Negra y húmeda: mezcla o aceite de más.",
          "Muy blanca, o distinta entre cilindros: avise al taller."
        ] },
        { titulo: "Controle la luz", como: [
          "La luz es la distancia entre las dos puntas de la bujía nueva. Mídala con el calibre.",
          "Tiene que ser la del dato de su motor. Si hace falta, doble con cuidado la punta en forma de L.",
          "Las bujías de iridio o de varias puntas no se tocan."
        ] },
        { titulo: "Coloque las nuevas", como: [
          "Enrósquelas A MANO hasta que hagan tope. Si se traban, sáquelas y empiece de nuevo.",
          "Ajústelas con la llave según el dato de su motor, sin forzar.",
          "Deje los capuchones sin poner hasta la prueba final."
        ], alto: "Si la bujía entra torcida y la fuerza, se arruina la rosca de la tapa de cilindros: es un arreglo caro." }
      ]
    },

    {
      id: "nafta", tarea: "filtro-combustible", titulo: "Nafta, filtro y mangueras", nivel: "facil",
      resumen: "Filtro de nafta, pera, mangueras y tanque.",
      datos: ["Mezcla nafta/aceite", "Aceite 2T", "Lubricación", "Nafta"],
      materiales: ["Filtro de nafta o elemento de repuesto", "Abrazaderas", "Trapo"],
      pasos: [
        { titulo: "Mire el filtro de nafta", como: [
          "Busque el filtro: un vaso transparente en el motor o un filtro en la manguera.",
          "No tiene que tener agua (una burbuja separada abajo) ni mugre."
        ] },
        { titulo: "Cambie el filtro", como: [
          "Desconecte la manguera del tanque y ponga un trapo debajo.",
          "Filtro en la manguera: afloje las abrazaderas y ponga el nuevo con la flecha hacia el motor.",
          "Filtro de vaso: desenrosque el vaso, cambie el elemento y la junta, y vuelva a enroscarlo."
        ], alto: "Sin fuego ni cigarrillos cerca. Limpie toda la nafta que se derrame." },
        { titulo: "Su motor tiene inyección", alimentacion: "inyeccion", como: [
          "Acá solo se revisa el filtro separador de agua (el de baja presión).",
          "El filtro de alta presión es tarea de taller: no lo abra."
        ] },
        { titulo: "Mangueras y pera", como: [
          "Las mangueras no tienen que estar resecas, duras ni agrietadas.",
          "Apriete la pera de goma: tiene que volver a inflarse sola.",
          "Si una manguera está agrietada, cámbiela. Revise que las abrazaderas estén firmes."
        ] },
        { titulo: "Tanque y mezcla", tiempos: "2T", como: [
          "Si encontró agua en el filtro, vacíe el tanque y cargue nafta nueva.",
          "Si su motor va a mezcla, prepárela en el bidón con la proporción de su motor (vea el dato).",
          "Nunca ponga el aceite directo en el tanque del motor sin mezclar."
        ] },
        { titulo: "Tanque", tiempos: "4T", como: [
          "Si encontró agua en el filtro, vacíe el tanque y cargue nafta nueva.",
          "En un 4 tiempos se carga nafta sola, nunca con aceite."
        ] }
      ]
    },

    {
      id: "bateria", titulo: "Batería", nivel: "facil", opcional: "Solo si su motor tiene arranque eléctrico.",
      resumen: "Bornes limpios y batería cargada.",
      datos: ["Batería", "Batería mínima"],
      materiales: ["Cepillo de alambre", "Agua con bicarbonato", "Vaselina", "Tester (si tiene)"],
      pasos: [
        { titulo: "Limpie los bornes", como: [
          "Si hay polvo blanco o verde en los bornes, límpielos con el cepillo y agua con bicarbonato.",
          "Ajuste los terminales y póngales una capa fina de vaselina."
        ] },
        { titulo: "Controle la carga", como: [
          "Con un tester: 12,6 voltios o más es batería cargada.",
          "Menos de 12,4 voltios: cárguela antes de salir.",
          "Si no tiene tester, cárguela igual antes de la temporada."
        ] },
        { titulo: "Vuelva a conectarla", como: [
          "Conecte primero el cable rojo (+) y después el negro (−)."
        ] }
      ]
    },

    {
      id: "carburador", tarea: "carburador", alimentacion: "carburador", titulo: "Limpieza del carburador", nivel: "riesgo",
      resumen: "La tarea más arriesgada del service.",
      datos: ["Carburador", "Ralentí en neutro", "Ralentí"],
      materiales: ["Kit de juntas del carburador de su motor", "Limpiador de carburador en aerosol", "Aire comprimido (inflador o compresor)", "Destornilladores que calcen justo", "Anteojos de protección", "Recipiente y trapos", "El celular para sacar fotos"],
      advertencia: {
        titulo: "Es la tarea más arriesgada del service",
        texto: [
          "Un carburador mal armado puede dejar el motor sin arrancar o hacer que se pare en el agua.",
          "Si queda mal regulado, el motor puede trabajar pobre y romperse (en un 2 tiempos, se puede dañar un pistón).",
          "Se trabaja con nafta, que es inflamable.",
          "Por eso, siempre le recomendamos que lo haga un mecánico."
        ]
      },
      pasos: [
        { titulo: "Prepare el lugar", como: [
          "Al aire libre, sin fuego ni cigarrillos cerca. Con el motor frío.",
          "Batería desconectada y capuchones sacados.",
          "Saque FOTOS de todo antes de desarmar: varillas, mangueras y tornillos."
        ] },
        { titulo: "Corte y vacíe la nafta", como: [
          "Desconecte la manguera del tanque.",
          "Si el carburador tiene tornillo de drenaje abajo de la cuba, aflójelo y vacíela en el recipiente.",
          "Vuelva a cerrar el tornillo."
        ] },
        { titulo: "Saque el carburador", como: [
          "Saque la tapa de la toma de aire que está delante del carburador.",
          "Desconecte la manguera de nafta y las varillas del acelerador y del cebador. Saque fotos.",
          "Saque las tuercas que lo sostienen. Si tiene varios carburadores, haga uno por vez."
        ], alto: "Nunca mezcle piezas de un carburador con las de otro." },
        { titulo: "Abra la cuba", como: [
          "Sobre una mesa limpia, con una bandeja para que no se pierdan piezas chicas.",
          "Saque los tornillos de la cuba (la parte de abajo) y retírela con cuidado.",
          "Saque el pasador del flotante: el flotante sale junto con su aguja. No doble la chapita del flotante."
        ] },
        { titulo: "Saque los chiclers", como: [
          "Los chiclers son tornillitos de bronce con un agujero en el medio: hay uno principal y uno de baja.",
          "Desenrósquelos con un destornillador que calce justo. Si no salen, no fuerce: lleve el carburador al taller."
        ] },
        { titulo: "Tornillo de mezcla: cuente las vueltas", como: [
          "ANTES de sacarlo, enrósquelo despacio contando las vueltas hasta que haga tope suave. Anote el número.",
          "No lo apriete contra el tope: se arruina el asiento.",
          "Si el tornillo tiene un tapón o un precinto, no lo toque."
        ] },
        { titulo: "Limpie", como: [
          "Póngase los anteojos. Rocíe limpiador en cada agujero, conducto y chicler.",
          "Sople con aire comprimido. Mire cada chicler contra la luz: se tiene que ver el agujero limpio.",
          "Deje secar todo."
        ], alto: "Nunca pase alambres, agujas ni mechas por los chiclers: los agrandan y el motor queda con la mezcla mal." },
        { titulo: "Revise las piezas", como: [
          "La punta de la aguja del flotante no tiene que tener un escalón ni marcas.",
          "Sacuda el flotante: si tiene nafta adentro, hay que cambiarlo.",
          "Ponga todas las juntas nuevas del kit, nunca las viejas."
        ] },
        { titulo: "Arme el carburador", como: [
          "Coloque los chiclers ajustados suave, sin forzar.",
          "Coloque el tornillo de mezcla hasta el tope suave y después desenrósquelo las vueltas que anotó.",
          "Coloque flotante, aguja y pasador, y cierre la cuba con su junta nueva."
        ] },
        { titulo: "Móntelo en el motor", como: [
          "Con juntas nuevas, ajuste las tuercas parejo.",
          "Conecte las varillas y la manguera de nafta igual que en las fotos.",
          "Coloque la tapa de la toma de aire."
        ] },
        { titulo: "Pruébelo", como: [
          "Conecte la nafta y apriete la pera hasta que esté dura. Si gotea nafta del carburador, NO arranque: llévelo al taller.",
          "Arranque con orejeras y mire el chorro testigo.",
          "Si no arranca, se apaga o el ralentí quedó muy alto o muy bajo, no lo regule a ojo: llévelo al taller."
        ], alto: "Si después de limpiarlo el motor anda distinto que antes, no salga a navegar." }
      ]
    },

    {
      id: "prueba", titulo: "Prueba final", nivel: "facil",
      resumen: "Armar, probar con orejeras y revisar pérdidas.",
      materiales: ["Orejeras de enjuague", "Manguera con agua"],
      pasos: [
        { titulo: "Arme todo", como: [
          "Coloque los capuchones de las bujías hasta que hagan clic.",
          "Ponga la llave de corte. Si tiene batería, conéctela.",
          "Conecte la nafta y apriete la pera hasta que esté dura. Revise que no gotee nafta."
        ] },
        { titulo: "Ponga las orejeras", como: [
          "Colóquelas sobre las tomas de agua de la cola.",
          "Abra la canilla ANTES de arrancar."
        ], alto: "Nunca haga andar el motor sin agua, ni siquiera unos segundos: se rompe la bomba de agua." },
        { titulo: "Arranque y mire el chorro testigo", como: [
          "Arranque en neutro.",
          "En el primer minuto tiene que salir el chorro testigo.",
          "Si no sale agua, apague enseguida y pida ayuda al taller."
        ] },
        { titulo: "Busque pérdidas", como: [
          "Déjelo andar 5 minutos en neutro, sin acelerar.",
          "Mire que no gotee aceite (tapones, filtro) ni nafta (mangueras, filtro)."
        ] },
        { titulo: "Termine", como: [
          "Apague primero el motor y después cierre el agua.",
          "Coloque la tapa del motor.",
          "Anote en la app las tareas que hizo."
        ] }
      ]
    }
  ],

  /* Lo que queda siempre para el taller (se muestra al final de la guía). */
  taller: ["impulsor", "termostato", "valvulas"],

  /* COMPRAR LOS REPUESTOS: desde el 16/11/2026 la lista completa (repuestos, insumos,
     herramientas y limpieza) está en repuestos.js. */
  repuestos: []
};
