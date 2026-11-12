/* =====================================================================
   DATOS DE MOTORES – Scotto Mecánica Náutica
   ---------------------------------------------------------------------
   Este es el único archivo que hay que tocar para cargar contenido.

   Cómo está organizado:
   1. MANTENIMIENTO_BASE: tareas de mantenimiento comunes.
   2. DIAGNOSTICOS_BASE: síntomas con sus pasos, de lo más simple a lo más complejo.
   3. MOTORES: el catálogo. Cada motor hereda lo común y puede ajustar
      intervalos, agregar tareas o pasos propios y cargar sus datos técnicos.

   Filtros disponibles en tareas y pasos (opcionales):
     tiempos: "2T" o "4T"                 -> solo se muestra en ese tipo de motor
     alimentacion: "carburador" o "inyeccion"

   Niveles de un paso de diagnóstico:
     "simple"     -> lo puede hacer cualquier dueño, sin herramientas especiales
     "intermedio" -> requiere herramientas básicas y algo de mano
     "mecanico"   -> STOP: la app indica llevarlo al taller

   Los valores marcados con "A confirmar" los debe validar Juan.
   ===================================================================== */

window.DATOS = {
  version: 1,

  MANTENIMIENTO_BASE: [
    {
      id: "enjuague",
      nombre: "Enjuague con agua dulce",
      cada: { usos: true },
      quien: "usuario",
      porque: "La sal y la arena tapan los conductos de refrigeración y corroen el motor.",
      pasos: [
        "Coloque las orejeras (o un tacho con agua) cubriendo las tomas de agua de la cola.",
        "Abra la canilla antes de arrancar y verifique que el testigo tire agua.",
        "Haga funcionar en neutro 5 a 10 minutos, sin acelerar.",
        "Apague el motor primero y después cierre el agua.",
        "Lave el exterior y deje la tapa abierta un rato para que se seque."
      ],
      materiales: ["Orejeras de enjuague", "Manguera"]
    },
    {
      id: "aceite-cola",
      nombre: "Cambio de aceite de cola (pata)",
      cada: { horas: 100, meses: 12, primeraHoras: 10 },
      quien: "usuario",
      porque: "Protege los engranajes. Si sale lechoso, entra agua por los retenes.",
      pasos: [
        "Con el motor vertical, coloque un recipiente debajo de la cola.",
        "Afloje primero el tapón de arriba (ventilación) y después el de abajo (drenaje).",
        "Observe el aceite: si sale blanco o lechoso, o con limaduras, anótelo y consulte al mecánico.",
        "Cargue aceite nuevo desde el tapón de ABAJO con el pomo, hasta que salga por el de arriba.",
        "Coloque el tapón de arriba, retire el pomo y ponga enseguida el de abajo. Use arandelas nuevas."
      ],
      materiales: ["Aceite de cola SAE 90 hipoide (cantidad según motor)", "Arandelas de tapones", "Destornillador"]
    },
    {
      id: "aceite-motor",
      nombre: "Cambio de aceite y filtro de motor",
      tiempos: "4T",
      cada: { horas: 100, meses: 12, primeraHoras: 20 },
      quien: "usuario",
      porque: "El aceite pierde protección con las horas y el tiempo, aunque no se use.",
      pasos: [
        "Caliente el motor unos minutos con orejeras y apáguelo.",
        "Saque la varilla y drene el aceite por el tapón del cárter (o con bomba extractora).",
        "Cambie el filtro de aceite: aceite una fina capa sobre la junta del filtro nuevo y ajuste a mano.",
        "Cargue el aceite indicado y verifique el nivel con la varilla.",
        "Arranque con orejeras, revise que no haya pérdidas y controle el nivel otra vez."
      ],
      materiales: ["Aceite 4T náutico (tipo y cantidad según motor)", "Filtro de aceite", "Arandela del tapón"]
    },
    {
      id: "filtro-combustible",
      nombre: "Revisión del filtro / decantador de combustible",
      cada: { horas: 50, meses: 6 },
      quien: "usuario",
      porque: "El agua y la mugre en la nafta son la causa número uno de fallas.",
      pasos: [
        "Revise el vaso del filtro: no debe haber agua (se ve como una burbuja abajo) ni sedimento.",
        "Si tiene decantador, drene el agua por el tornillo inferior.",
        "Cambie el elemento si está oscuro o si nunca se cambió."
      ],
      materiales: ["Filtro de combustible o elemento de repuesto"]
    },
    {
      id: "bujias",
      nombre: "Revisión y cambio de bujías",
      cada: { horas: 100, meses: 12 },
      quien: "usuario",
      porque: "Una bujía gastada hace difícil el arranque y aumenta el consumo.",
      pasos: [
        "Con el motor frío, saque los capuchones tirando del capuchón, nunca del cable.",
        "Saque las bujías con llave de bujía y observe el color: marrón claro es normal.",
        "Negra y húmeda: mezcla rica o aceite de más. Blanca: mezcla pobre, consultar.",
        "Coloque bujías nuevas con la luz correcta, enrosque a mano y ajuste sin forzar."
      ],
      materiales: ["Bujías (modelo según motor)", "Llave de bujía", "Calibre de luz"]
    },
    {
      id: "impulsor",
      nombre: "Cambio de impulsor de la bomba de agua",
      cada: { horas: 300, meses: 36 },
      cadaTrabajo: { meses: 12 },
      quien: "mecanico",
      porque: "El impulsor es de goma, se endurece y se rompe. Si falla, el motor se recalienta.",
      pasos: [
        "Criterio del taller: controlar la bomba de agua cada 100 horas y cambiar el impulsor de forma preventiva a las 300 horas o a los 3 años. En uso de trabajo (alquiler, pesca, transporte), cada 12 meses.",
        "Si navega en agua con arena o barro, conviene hacerlo cada año.",
        "Requiere bajar la cola y desconectar el cambio: recomendamos hacerlo en el taller.",
        "Aproveche para revisar el cuerpo de la bomba y la placa de desgaste."
      ],
      materiales: ["Kit de bomba de agua"]
    },
    {
      id: "anodos",
      nombre: "Revisión de ánodos de sacrificio",
      cada: { horas: 50, meses: 6 },
      quien: "usuario",
      porque: "Se gastan para que no se corroa el motor. Sin ánodos, se come el aluminio.",
      pasos: [
        "Ubique los ánodos (aleta de trim, placa antiventilación, abrazadera de espejo).",
        "Cámbielos si perdieron la mitad de su tamaño.",
        "No los pinte nunca: un ánodo pintado no funciona."
      ],
      materiales: ["Ánodos según motor"]
    },
    {
      id: "engrase",
      nombre: "Engrase general",
      cada: { horas: 50, meses: 6 },
      quien: "usuario",
      porque: "Evita que se trabe la dirección, el tilt y las prensas de espejo.",
      pasos: [
        "Engrase con inflador los alemites del tubo de giro, el tilt y la dirección.",
        "Engrase las roscas de las prensas de espejo y las articulaciones del acelerador y cambio.",
        "Saque la hélice, limpie y engrase el eje (ver tarea de hélice)."
      ],
      materiales: ["Grasa náutica resistente al agua", "Inflador de grasa"]
    },
    {
      id: "helice",
      nombre: "Revisión de hélice y eje",
      cada: { horas: 50, meses: 6 },
      quien: "usuario",
      porque: "Un cabo o tanza enredada detrás de la hélice corta el retén y deja entrar agua a la cola.",
      pasos: [
        "Con el motor apagado y en neutro, quite la chaveta, la tuerca y la hélice.",
        "Retire cualquier tanza, cabo o plástico enredado en el eje.",
        "Revise golpes y palas dobladas. Limpie y engrase el eje.",
        "Monte con chaveta nueva."
      ],
      materiales: ["Chaveta / pasador", "Grasa náutica"]
    },
    {
      id: "carburador",
      nombre: "Limpieza y puesta a punto de carburador",
      alimentacion: "carburador",
      cada: { horas: 100, meses: 12 },
      quien: "mecanico",
      porque: "La nafta vieja deja barniz que tapa los chiclers, sobre todo el de baja.",
      pasos: [
        "Requiere desarmar y limpiar los chiclers: recomendamos hacerlo en el taller.",
        "Para prevenir: use estabilizador si el motor va a estar parado más de un mes."
      ],
      materiales: ["Kit de juntas de carburador"]
    },
    {
      id: "termostato",
      nombre: "Revisión de termostato",
      cada: { horas: 200, meses: 24 },
      quien: "mecanico",
      porque: "Un termostato pegado causa recalentamiento o que el motor trabaje frío.",
      pasos: ["Requiere desarmar la tapa del termostato y probarlo: tarea de taller."],
      materiales: ["Termostato y junta"]
    },
    {
      id: "valvulas",
      nombre: "Control de luz de válvulas",
      tiempos: "4T",
      cada: { horas: 200, meses: 24 },
      quien: "mecanico",
      porque: "Una luz incorrecta hace perder potencia y puede quemar válvulas.",
      pasos: ["Requiere herramientas y especificaciones de fábrica: tarea de taller."],
      materiales: []
    },
    {
      id: "inicio-temporada",
      nombre: "Puesta en marcha de temporada",
      temporada: "inicio",
      quien: "usuario",
      porque: "Revisar antes de la primera salida evita quedarse varado.",
      pasos: [
        "Cargue la batería y limpie los bornes.",
        "Revise mangueras de nafta, bulbo cebador y abrazaderas: no deben estar resecas ni agrietadas.",
        "Use nafta nueva. En 2T, prepare la mezcla en la proporción indicada.",
        "Pruebe el motor con orejeras y verifique el testigo de agua.",
        "Revise el kit de seguridad: llave de corte (hombre al agua), chaveta y bujías de repuesto."
      ],
      materiales: ["Nafta nueva", "Aceite 2T náutico (TC-W3) si corresponde"]
    },
    {
      id: "invernaje",
      nombre: "Invernaje (guardado fuera de temporada)",
      temporada: "fin",
      quien: "usuario",
      porque: "Un motor bien guardado arranca a la primera la próxima temporada.",
      pasos: [
        "Agregue estabilizador a la nafta y haga funcionar el motor 10 minutos con orejeras.",
        "Motor a carburador: corte la nafta y deje que se apague solo para vaciar la cuba.",
        "Rocíe aceite de empañado (fogging) por la admisión antes de que se apague.",
        "Cambie el aceite de cola (y el de motor en 4T) para no guardarlo con humedad.",
        "Engrase todo, saque la batería y guárdela cargada.",
        "Guarde el motor vertical, para que drene el agua de la refrigeración."
      ],
      materiales: ["Estabilizador de nafta", "Aceite de empañado (fogging)", "Aceite de cola"]
    }
  ],

  DIAGNOSTICOS_BASE: [
    {
      id: "no-arranca",
      titulo: "No arranca",
      descripcion: "Tira de la piola o da arranque, pero el motor no prende.",
      pasos: [
        {
          titulo: "Lo básico que más se olvida",
          nivel: "simple",
          como: [
            "La llave de corte (hombre al agua) debe estar colocada en su lugar.",
            "La palanca debe estar en NEUTRO: en cambio no arranca.",
            "Verifique que haya nafta en el tanque.",
            "Abra el respiradero de la tapa del tanque.",
            "Revise que el conector de la manguera esté bien enchufado al motor y al tanque."
          ],
          solucion: "Corrija lo que encontró e intente arrancar otra vez."
        },
        {
          titulo: "Bulbo cebador",
          nivel: "simple",
          como: [
            "Apriete el bulbo varias veces hasta que quede duro.",
            "Si nunca se pone duro, entra aire: revise abrazaderas, conectores y el bulbo.",
            "La flecha del bulbo debe apuntar hacia el motor."
          ],
          solucion: "Con el bulbo firme, la nafta llega al motor."
        },
        {
          titulo: "Arranque en frío y motor ahogado",
          nivel: "simple",
          como: [
            "En frío: use el cebador (choke) y el acelerador de arranque según su motor.",
            "Si huele mucho a nafta, puede estar ahogado.",
            "Para desahogarlo: sin cebador, acelerador a fondo en neutro, y dé 5 o 6 tirones.",
            "En arranque eléctrico: revise que la batería tenga carga y los bornes estén firmes y limpios."
          ],
          solucion: "Si prendió, deje que caliente antes de sacar el cebador del todo."
        },
        {
          titulo: "Revisar las bujías",
          nivel: "intermedio",
          como: [
            "Saque las bujías con el motor frío y mírelas.",
            "Mojadas de nafta: el motor está ahogado. Séquelas o cámbielas.",
            "Secas: no le está llegando nafta. Pase al paso siguiente.",
            "Negras con carbonilla o puntas gastadas: cámbielas.",
            "Para probar chispa use un probador de chispa. No sostenga el cable con la mano."
          ],
          solucion: "Con bujías nuevas y chispa, muchos motores vuelven a arrancar.",
          alto: "Haga esta prueba lejos de vapores de nafta. Nunca pruebe chispa con el tanque abierto cerca."
        },
        {
          titulo: "Nafta vieja o con agua",
          nivel: "intermedio",
          como: [
            "La nafta de más de 30 días se degrada, y más si tiene etanol.",
            "En 2T, confirme que la mezcla esté bien hecha y con aceite náutico.",
            "Revise el filtro de combustible: si se ve agua o mugre, drene y cambie el elemento.",
            "Si es a carburador, afloje el tornillo de drenaje de la cuba para sacar la nafta vieja.",
            "Pruebe con un bidón chico de nafta nueva."
          ],
          tiempos: null,
          solucion: "Si arrancó con nafta nueva, descarte la vieja y limpie el tanque."
        },
        {
          titulo: "Llevar al mecánico",
          nivel: "mecanico",
          como: [
            "Si no hay chispa con bujías nuevas: puede ser la llave de corte, bobinas, CDI o estator.",
            "Si llega nafta y hay chispa: puede ser el carburador por dentro o baja compresión.",
            "Medir compresión y probar el encendido requiere instrumental de taller."
          ]
        }
      ]
    },
    {
      id: "se-apaga",
      titulo: "Arranca y se apaga",
      descripcion: "Prende pero se para al rato, al sacar el cebador o al poner el cambio.",
      pasos: [
        {
          titulo: "Respiradero del tanque",
          nivel: "simple",
          como: [
            "Si anda unos minutos y se apaga, revise que el respiradero de la tapa esté abierto.",
            "Señal típica: el bulbo cebador se aplasta y queda chupado."
          ],
          solucion: "Con el respiradero abierto, la nafta fluye sin hacer vacío."
        },
        {
          titulo: "Bulbo y mangueras",
          nivel: "simple",
          como: [
            "Apriete el bulbo con el motor en marcha: si mejora, falta nafta.",
            "Revise que no entre aire por conectores o abrazaderas flojas.",
            "Un bulbo viejo puede tener las válvulas internas pegadas. Es barato cambiarlo."
          ],
          solucion: "Cambie el bulbo o las piezas flojas y vuelva a probar."
        },
        {
          titulo: "Se apaga al sacar el cebador",
          nivel: "simple",
          alimentacion: "carburador",
          como: [
            "En frío es normal: deje calentar 3 a 5 minutos y saque el cebador de a poco.",
            "Si ya caliente sigue necesitando cebador, suele ser el chicler de baja tapado."
          ],
          solucion: "Si con el motor caliente anda bien, no hay falla."
        },
        {
          titulo: "Nafta vieja y filtro",
          nivel: "intermedio",
          como: [
            "Revise el filtro de combustible y drene el agua si la hay.",
            "Pruebe con nafta nueva en un bidón aparte."
          ],
          solucion: "Si anda con nafta nueva, el problema estaba en el combustible."
        },
        {
          titulo: "Ralentí bajo",
          nivel: "intermedio",
          como: [
            "Si se apaga al poner el cambio, el ralentí puede estar bajo.",
            "Ubique el tornillo de ralentí según el manual de su motor.",
            "Gire como máximo media vuelta para subirlo. Anote cuánto giró por si hay que volver."
          ],
          solucion: "Con un ralentí correcto, el motor no se para al poner el cambio."
        },
        {
          titulo: "Llevar al mecánico",
          nivel: "mecanico",
          como: [
            "Lo más común es el carburador sucio por dentro (chicler de baja) o la bomba de nafta.",
            "En inyección, puede ser un sensor o la bomba de alta presión.",
            "Requiere desarme y limpieza con equipo de taller."
          ]
        }
      ]
    },
    {
      id: "pierde-potencia",
      titulo: "Pierde potencia",
      descripcion: "No levanta vueltas, no planea o anda más lento que antes.",
      pasos: [
        {
          titulo: "Hélice",
          nivel: "simple",
          como: [
            "Con el motor apagado, revise que no haya cabo, tanza, bolsas o redes enredadas.",
            "Busque palas golpeadas o dobladas.",
            "Si el motor sube de vueltas pero la lancha no avanza, el buje de la hélice puede estar patinando."
          ],
          solucion: "Una hélice limpia y sana recupera la velocidad."
        },
        {
          titulo: "Carga, trim y altura",
          nivel: "simple",
          como: [
            "Revise si hay más peso que de costumbre o mal repartido.",
            "Pruebe con el trim más abajo para salir a planear.",
            "Fíjese si el casco tiene mucho crecimiento marino (verdín, mejillón)."
          ],
          solucion: "Corregir peso y trim muchas veces resuelve la falta de planeo."
        },
        {
          titulo: "Falta de nafta a altas vueltas",
          nivel: "simple",
          como: [
            "Si pierde fuerza a fondo y mejora al apretar el bulbo, falta nafta.",
            "Revise respiradero, filtro y que la manguera no esté doblada o aplastada."
          ],
          solucion: "Con buen caudal de nafta, el motor vuelve a tirar a fondo."
        },
        {
          titulo: "Testigo de agua y temperatura",
          nivel: "simple",
          como: [
            "Verifique que el testigo tire buen chorro.",
            "Muchos motores bajan las vueltas solos cuando se recalientan (modo protección)."
          ],
          solucion: "Si el testigo tira poco, vaya al síntoma \"No tira agua el testigo\".",
          alto: "Si suena la alarma de temperatura, apague el motor y no siga navegando a motor."
        },
        {
          titulo: "Bujías",
          nivel: "intermedio",
          como: [
            "Saque las bujías y compárelas entre sí.",
            "Si una está distinta (más negra o mojada), ese cilindro puede no estar trabajando bien.",
            "Cambie el juego completo."
          ],
          solucion: "Si con bujías nuevas recupera la fuerza, era encendido."
        },
        {
          titulo: "Llevar al mecánico",
          nivel: "mecanico",
          como: [
            "Puede ser baja compresión, carburador o encendido.",
            "Si un cilindro no trabaja, seguir navegando puede dañar el motor."
          ]
        }
      ]
    },
    {
      id: "testigo",
      titulo: "No tira agua el testigo",
      descripcion: "El chorrito de control sale débil, intermitente o no sale.",
      alerta: "Apague el motor de inmediato. Sin refrigeración, el motor puede dañarse en pocos minutos.",
      pasos: [
        {
          titulo: "Tomas de agua",
          nivel: "simple",
          como: [
            "Verifique que la cola esté bien sumergida (o las orejeras bien puestas y con caudal).",
            "Revise las rejillas de toma de agua de la cola: bolsas, algas o barro las tapan."
          ],
          solucion: "Destapada la toma, el testigo debería volver a tirar."
        },
        {
          titulo: "Testigo tapado",
          nivel: "simple",
          como: [
            "Con el motor apagado, pase un alambre fino o una tanza por el orificio del testigo.",
            "Arranque y fíjese si sale chorro. Muchas veces es solo mugre en la salida.",
            "También puede revisar la manguerita interna del testigo si es accesible."
          ],
          solucion: "Si sale chorro firme después de destapar, era solo el testigo."
        },
        {
          titulo: "¿Cuándo cambió el impulsor?",
          nivel: "simple",
          como: [
            "Si sale agua solo al acelerar, o el chorro es débil, el impulsor puede estar gastado.",
            "Revise en Mantenimiento cuándo fue el último cambio.",
            "Si pasaron más de 2 años o navega en agua con arena, es lo más probable."
          ],
          solucion: "Si el impulsor está vencido, el próximo paso es cambiarlo."
        },
        {
          titulo: "Llevar al mecánico",
          nivel: "mecanico",
          como: [
            "Cambiar el impulsor requiere bajar la cola: recomendamos hacerlo en el taller.",
            "Si el motor llegó a recalentar, conviene medir compresión antes de seguir usándolo.",
            "También puede ser el termostato o conductos tapados con sal o arena."
          ]
        }
      ]
    },
    {
      id: "humo",
      titulo: "Humo excesivo",
      descripcion: "Más humo del habitual, o de un color distinto.",
      pasos: [
        {
          titulo: "¿Es normal?",
          nivel: "simple",
          tiempos: "2T",
          como: [
            "Un 2T siempre humea algo, más al arrancar en frío. Eso es normal.",
            "Preocupa si el humo aumentó de golpe o cambió de color."
          ],
          solucion: "Si humea poco y se va al calentar, no hay falla."
        },
        {
          titulo: "¿Es normal?",
          nivel: "simple",
          tiempos: "4T",
          como: [
            "Un 4T casi no debería humear una vez caliente.",
            "Revise el nivel de aceite: si está por encima del máximo, puede humear azul."
          ],
          solucion: "Con el aceite en nivel y motor caliente, no debería haber humo visible."
        },
        {
          titulo: "Mezcla de nafta y aceite",
          nivel: "simple",
          tiempos: "2T",
          como: [
            "Verifique la proporción de la mezcla: aceite de más da humo azul.",
            "Use aceite 2T náutico (TC-W3), no aceite de moto o de auto.",
            "Si tiene inyección de aceite (autolube), revise el tanque y la bomba en el taller."
          ],
          solucion: "Con la mezcla correcta, el humo baja en la próxima carga."
        },
        {
          titulo: "Humo negro: cebador o ahogado",
          nivel: "simple",
          como: [
            "Humo negro es exceso de nafta. Revise que el cebador no haya quedado puesto.",
            "Fíjese si el filtro de aire o la toma de aire están tapados."
          ],
          solucion: "Sin cebador puesto, el humo negro debería desaparecer."
        },
        {
          titulo: "Bujías empastadas",
          nivel: "intermedio",
          como: [
            "Saque las bujías: si están negras y aceitosas, cámbielas.",
            "Pasear mucho tiempo en ralentí empasta las bujías en los 2T."
          ],
          solucion: "Con bujías nuevas y un rato a régimen medio, se limpia."
        },
        {
          titulo: "Llevar al mecánico",
          nivel: "mecanico",
          como: [
            "Humo blanco espeso y persistente con el motor caliente puede ser agua en el cilindro (junta de tapa).",
            "Humo azul en un 4T con consumo de aceite indica desgaste interno.",
            "No siga usando el motor hasta revisarlo."
          ]
        }
      ]
    },
    {
      id: "vibra",
      titulo: "Vibra",
      descripcion: "Vibración nueva o más fuerte que lo habitual.",
      alerta: "Si la vibración apareció después de un golpe, baje las vueltas y vuelva despacio a puerto.",
      pasos: [
        {
          titulo: "Hélice",
          nivel: "simple",
          como: [
            "Con el motor apagado, revise golpes, palas dobladas o algo enredado.",
            "Una pala apenas doblada ya genera vibración a altas vueltas."
          ],
          solucion: "Si la hélice está dañada, se repara o se cambia."
        },
        {
          titulo: "Fijación al espejo",
          nivel: "simple",
          como: [
            "Revise que las prensas de espejo estén bien ajustadas.",
            "Si tiene bulones pasantes, verifique que no estén flojos.",
            "Revise que el espejo no esté rajado o blando."
          ],
          solucion: "Con el motor bien firme al espejo, la vibración baja."
        },
        {
          titulo: "Falla un cilindro",
          nivel: "intermedio",
          como: [
            "Si vibra más en ralentí y anda \"a los saltos\", puede no estar trabajando un cilindro.",
            "Revise las bujías y compare su color."
          ],
          solucion: "Si con bujías nuevas anda parejo, era encendido."
        },
        {
          titulo: "Llevar al mecánico",
          nivel: "mecanico",
          como: [
            "Pueden ser los soportes de goma del motor gastados.",
            "Después de un golpe, puede estar doblado el eje de la hélice.",
            "Requiere desarme y medición."
          ]
        }
      ]
    }
  ],

  /* -------------------------------------------------------------------
     FAMILIAS: motores que comparten la misma base mecánica.
     Lo que se carga acá (datos técnicos, consejos, ajustes de intervalos)
     lo heredan todos los motores de la familia. Ejemplo: el Mercury 40
     japonés y el Tohatsu 40 se cargan una sola vez.
     ------------------------------------------------------------------- */
  FAMILIAS: {
    // ---- Mercury japoneses: familias propias (12/11/2026). La base compartida con Tohatsu es dato interno (fuenteInterna), no se muestra ----
    "mercury-jp-40-2t": {"nombre": "Mercury 40 HP 2T de 3 cilindros", "estado": "completo", "fuente": "Manual oficial del fabricante del motor", "datosTecnicos": [{"dato": "Cilindros", "valor": "3"}, {"dato": "Cilindrada", "valor": "697 cc (68 × 64 mm)"}, {"dato": "Encendido", "valor": "CDI por volante magnético"}, {"dato": "Mezcla nafta/aceite", "valor": "50:1 (rodaje: 25:1). Modelos con tanque de aceite (automezcla): aceite en el tanque y 50:1 en la nafta durante el rodaje"}, {"dato": "Aceite 2T", "valor": "Mercury / Quicksilver TC-W3 o náutico TC-W3, sin mezclar marcas"}, {"dato": "Nafta", "valor": "Sin plomo, 91 RON o más, hasta 10 % de etanol"}, {"dato": "Bujía NGK", "valor": "B7HS-10 (resistiva: BR7HS-10)"}, {"dato": "Luz de bujía", "valor": "0,9 a 1,0 mm"}, {"dato": "Ajuste de bujía", "valor": "27 Nm"}, {"dato": "Aceite de cola", "valor": "API GL-5, SAE 80 a 90 · aprox. 500 ml"}, {"dato": "Ralentí", "valor": "900 rpm en neutro · 750 rpm en marcha"}, {"dato": "Rango a fondo", "valor": "5000 a 5700 rpm"}, {"dato": "Relación de cola", "valor": "1,85 (24:13)"}, {"dato": "Ajuste tuerca de hélice", "valor": "35 Nm"}, {"dato": "Fluido del trim (PTT)", "valor": "ATF Dexron III"}, {"dato": "Tanque (modelo a piola)", "valor": "25 litros"}], "ajustes": {"aceite-cola": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: controlar o cambiar a las 10 horas (o al mes), a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses. Revisar si hay agua en el aceite."}, "filtro-combustible": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: revisar y limpiar el filtro y el tanque a las 10 h, a las 50 h y después cada 100 horas o 6 meses. Limpiar el tanque también después de más de 3 meses guardado."}, "helice": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: además, revisar hélice y pasador antes y después de cada uso."}, "impulsor": {"segun": "el taller", "cada": {"meses": 36}, "notaMarca": "Criterio del taller: controlar la bomba de agua cada 100 horas; cambiar el impulsor cada 3 años en uso recreativo y cada 12 meses en uso de trabajo (alquiler, pesca, transporte). El manual del fabricante dice: cambiar el impulsor cada 12 meses. Es tarea de concesionario o taller.", "cadaTrabajo": {"meses": 12}}, "bujias": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: revisar luz (0,9 a 1,0 mm) y limpiar carbonilla a las 10 h, a las 50 h y después cada 100 horas o 6 meses."}, "engrase": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 50}, "notaMarca": "Plan del fabricante: engrasar piezas de giro y alemites a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses."}, "anodos": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 50}, "notaMarca": "Plan del fabricante: revisar corrosión y deformación a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses; cambiar si hace falta."}, "carburador": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: desarmar, limpiar y regular el ralentí a las 10 horas y después cada 100 horas o 6 meses. Tarea de taller. El manual recomienda una revisión completa a las 300 horas."}, "invernaje": {"segun": "el fabricante", "notaMarca": "Plan del fabricante: vaciar nafta de mangueras, bomba, filtro y carburador; poner una cucharadita de aceite por cada agujero de bujía y girar el motor varias veces; cambiar aceite de cola, engrasar y guardar vertical en lugar seco."}}, "consejos": ["Rodaje de 10 horas, en el agua y en marcha: primeros 10 minutos en ralentí; hasta las 2 horas, menos de media aceleración; de 2 a 3 horas, menos de 3/4; de 3 a 10 horas, 3/4 con tramos cortos a fondo. Después de 10 horas, uso normal.", "Si suena la alarma y el motor no pasa de unas 3500 rpm, el sistema de protección está actuando: revise el testigo de agua y, en modelos con tanque, el nivel de aceite.", "Si el motor se pasa de vueltas y la alarma limita a menos de 6300 rpm, revise la hélice: puede estar doblada o patinando.", "Uso intensivo (alquiler, trabajo, agua barrosa o poco profunda) requiere acortar los intervalos."], "fuenteInterna": "Copia interna de la familia tohatsu-40-2t. Fuente original: Manual del propietario oficial Tohatsu M40D2 / M50D2 (003-11038)"},
    "mercury-jp-50-2t": {"nombre": "Mercury 50 HP 2T", "estado": "completo", "fuente": "Manual oficial del fabricante del motor", "datosTecnicos": [{"dato": "Cilindros", "valor": "3"}, {"dato": "Cilindrada", "valor": "697 cc (68 × 64 mm)"}, {"dato": "Encendido", "valor": "CDI por volante magnético"}, {"dato": "Mezcla nafta/aceite", "valor": "50:1 (rodaje: 25:1). Modelos con tanque de aceite (automezcla): aceite en el tanque y 50:1 en la nafta durante el rodaje"}, {"dato": "Aceite 2T", "valor": "Mercury / Quicksilver TC-W3 o náutico TC-W3, sin mezclar marcas"}, {"dato": "Nafta", "valor": "Sin plomo, 91 RON o más, hasta 10 % de etanol"}, {"dato": "Bujía NGK", "valor": "B8HS-10 (resistiva: BR8HS-10)"}, {"dato": "Luz de bujía", "valor": "0,9 a 1,0 mm"}, {"dato": "Ajuste de bujía", "valor": "27 Nm"}, {"dato": "Aceite de cola", "valor": "API GL-5, SAE 80 a 90 · aprox. 500 ml"}, {"dato": "Ralentí", "valor": "900 rpm en neutro · 750 rpm en marcha"}, {"dato": "Rango a fondo", "valor": "5150 a 5850 rpm"}, {"dato": "Relación de cola", "valor": "1,85 (24:13)"}, {"dato": "Ajuste tuerca de hélice", "valor": "35 Nm"}, {"dato": "Fluido del trim (PTT)", "valor": "ATF Dexron III"}, {"dato": "Tanque (modelo a piola)", "valor": "25 litros"}], "ajustes": {"aceite-cola": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: controlar o cambiar a las 10 horas (o al mes), a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses. Revisar si hay agua en el aceite."}, "filtro-combustible": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: revisar y limpiar el filtro y el tanque a las 10 h, a las 50 h y después cada 100 horas o 6 meses. Limpiar el tanque también después de más de 3 meses guardado."}, "helice": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: además, revisar hélice y pasador antes y después de cada uso."}, "impulsor": {"segun": "el taller", "cada": {"meses": 36}, "notaMarca": "Criterio del taller: controlar la bomba de agua cada 100 horas; cambiar el impulsor cada 3 años en uso recreativo y cada 12 meses en uso de trabajo (alquiler, pesca, transporte). El manual del fabricante dice: cambiar el impulsor cada 12 meses. Es tarea de concesionario o taller.", "cadaTrabajo": {"meses": 12}}, "bujias": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: revisar luz (0,9 a 1,0 mm) y limpiar carbonilla a las 10 h, a las 50 h y después cada 100 horas o 6 meses."}, "engrase": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 50}, "notaMarca": "Plan del fabricante: engrasar piezas de giro y alemites a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses."}, "anodos": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 50}, "notaMarca": "Plan del fabricante: revisar corrosión y deformación a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses; cambiar si hace falta."}, "carburador": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: desarmar, limpiar y regular el ralentí a las 10 horas y después cada 100 horas o 6 meses. Tarea de taller. El manual recomienda una revisión completa a las 300 horas."}, "invernaje": {"segun": "el fabricante", "notaMarca": "Plan del fabricante: vaciar nafta de mangueras, bomba, filtro y carburador; poner una cucharadita de aceite por cada agujero de bujía y girar el motor varias veces; cambiar aceite de cola, engrasar y guardar vertical en lugar seco."}}, "consejos": ["Rodaje de 10 horas, en el agua y en marcha: primeros 10 minutos en ralentí; hasta las 2 horas, menos de media aceleración; de 2 a 3 horas, menos de 3/4; de 3 a 10 horas, 3/4 con tramos cortos a fondo. Después de 10 horas, uso normal.", "Si suena la alarma y el motor no pasa de unas 3500 rpm, el sistema de protección está actuando: revise el testigo de agua y, en modelos con tanque, el nivel de aceite.", "Si el motor se pasa de vueltas y la alarma limita a menos de 6300 rpm, revise la hélice: puede estar doblada o patinando.", "Uso intensivo (alquiler, trabajo, agua barrosa o poco profunda) requiere acortar los intervalos."], "fuenteInterna": "Copia interna de la familia tohatsu-50-2t. Fuente original: Manual del propietario oficial Tohatsu M40D2 / M50D2 (003-11038)"},
    "mercury-jp-25-30-2t": {"nombre": "Mercury 25/30 HP 2T", "estado": "completo", "fuente": "Manual oficial del fabricante del motor", "datosTecnicos": [{"dato": "Cilindros", "valor": "2"}, {"dato": "Cilindrada", "valor": "429 cc (68 × 59 mm) en el modelo actual; a confirmar en modelos anteriores"}, {"dato": "Encendido", "valor": "CDI por volante magnético"}, {"dato": "Mezcla nafta/aceite", "valor": "50:1 (rodaje: 25:1)"}, {"dato": "Aceite 2T", "valor": "Mercury / Quicksilver TC-W3 o náutico TC-W3"}, {"dato": "Nafta", "valor": "Sin plomo, 91 RON o más, hasta 10 % de etanol"}, {"dato": "Bujía NGK", "valor": "B7HS-10 (resistiva: BR7HS-10)"}, {"dato": "Luz de bujía", "valor": "0,9 a 1,0 mm"}, {"dato": "Ajuste de bujía", "valor": "27 Nm"}, {"dato": "Aceite de cola", "valor": "API GL-5, SAE 80 a 90 · aprox. 360 ml"}, {"dato": "Ralentí", "valor": "950 rpm en neutro · 800 rpm en marcha"}, {"dato": "Rango a fondo", "valor": "25 HP: 5000 a 6000 rpm · 30 HP: 5150 a 5850 rpm"}, {"dato": "Relación de cola", "valor": "1,92 (23:12)"}, {"dato": "Ajuste tuerca de hélice", "valor": "25 Nm"}, {"dato": "Refrigeración", "valor": "Por agua, con termostato"}, {"dato": "Tanque", "valor": "25 litros, separado"}], "ajustes": {"aceite-cola": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: controlar o cambiar a las 10 horas (o al mes), a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses. Revisar si hay agua en el aceite."}, "filtro-combustible": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: revisar, limpiar o cambiar a las 10 h, a las 50 h y después cada 100 horas o 6 meses. Revisar también las mangueras."}, "helice": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: además, revisar hélice, tuerca y pasador antes de cada uso."}, "impulsor": {"segun": "el taller", "cada": {"meses": 36}, "notaMarca": "Criterio del taller: controlar la bomba de agua cada 100 horas; cambiar el impulsor cada 3 años en uso recreativo y cada 12 meses en uso de trabajo (alquiler, pesca, transporte). El manual del fabricante dice: cambiar el impulsor cada 12 meses. Es tarea de concesionario o taller.", "cadaTrabajo": {"meses": 12}}, "bujias": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: revisar luz (0,9 a 1,0 mm) y limpiar carbonilla o cambiar a las 10 horas (o al mes) y después cada 100 horas o 6 meses."}, "engrase": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 50}, "notaMarca": "Plan del fabricante: engrasar piezas de giro y alemites a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses."}, "anodos": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 50}, "notaMarca": "Plan del fabricante: revisar corrosión y deformación a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses; cambiar si hace falta."}, "carburador": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Plan del fabricante: desarmar, limpiar y regular el ralentí cada 100 horas o 6 meses. Tarea de taller. El manual recomienda una revisión completa a las 300 horas."}, "invernaje": {"segun": "el fabricante", "notaMarca": "Plan del fabricante: vaciar nafta de mangueras, bomba, filtro y carburador; poner una cucharadita de aceite por cada agujero de bujía y tirar de la piola varias veces; cambiar aceite de cola, engrasar y guardar vertical en lugar seco. Al volver a usarlo: 3 minutos en neutro, 5 minutos despacio y 10 minutos a media aceleración."}}, "consejos": ["Rodaje de 10 horas, en el agua y en marcha, con mezcla 25:1: primeros 10 minutos en ralentí; hasta las 2 horas, menos de media aceleración; de 2 a 3 horas, menos de 3/4; de 3 a 10 horas, 3/4 con tramos cortos a fondo. Después de 10 horas, uso normal con 50:1.", "Uso intensivo (alquiler, trabajo, agua salobre o barrosa) requiere acortar los intervalos."], "fuenteInterna": "Copia interna de la familia tohatsu-25-30-2t. Fuente original: Manual del propietario oficial Tohatsu MX25H / MX30H (003-11099). Los modelos anteriores pueden diferir en cilindrada"},
    "mercury-jp-18-2t": {"nombre": "Mercury 18 HP 2T", "estado": "completo", "fuente": "Manual oficial del fabricante del motor", "datosTecnicos": [{"dato": "Cilindros", "valor": "2"}, {"dato": "Cilindrada", "valor": "294 cc (60 × 52 mm)"}, {"dato": "Mezcla nafta/aceite", "valor": "50:1 (rodaje: 25:1)"}, {"dato": "Aceite 2T", "valor": "Mercury / Quicksilver TC-W3 o náutico TC-W3"}, {"dato": "Nafta", "valor": "Sin plomo, 91 RON o más, hasta 10 % de etanol"}, {"dato": "Bujía NGK", "valor": "B7HS-10 (resistiva: BR7HS-10)"}, {"dato": "Luz de bujía", "valor": "0,9 a 1,0 mm"}, {"dato": "Ajuste de bujía", "valor": "25 Nm"}, {"dato": "Aceite de cola", "valor": "API GL-5, SAE 80 a 90 · aprox. 370 ml"}, {"dato": "Ralentí", "valor": "950 rpm en neutro · 800 rpm en marcha"}, {"dato": "Rango a fondo", "valor": "5200 a 5800 rpm"}, {"dato": "Relación de cola", "valor": "1,85 (13:24)"}, {"dato": "Ajuste de prensas de espejo", "valor": "30 Nm"}, {"dato": "Tanque", "valor": "25 litros"}], "ajustes": {"aceite-cola": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: controlar o cambiar a las 10 horas (o al mes), a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses. Revisar si hay agua en el aceite."}, "filtro-combustible": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: revisar, limpiar o cambiar a las 10 h, a las 50 h y después cada 100 horas o 6 meses. Revisar también las mangueras. Limpiar el tanque si estuvo guardado más de 3 meses."}, "helice": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: además, revisar hélice, tuerca y pasador antes de cada uso."}, "impulsor": {"segun": "el taller", "cada": {"meses": 36}, "notaMarca": "Criterio del taller: controlar la bomba de agua cada 100 horas; cambiar el impulsor cada 3 años en uso recreativo y cada 12 meses en uso de trabajo (alquiler, pesca, transporte). El manual del fabricante dice: revisar desgaste a las 50 h y cada 100 h; cambiar el impulsor cada 12 meses. Es tarea de concesionario o taller.", "cadaTrabajo": {"meses": 12}}, "bujias": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: revisar luz (0,9 a 1,0 mm) y limpiar carbonilla o cambiar a las 10 horas (o al mes) y después cada 100 horas o 6 meses."}, "engrase": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 50}, "notaMarca": "Plan del fabricante: engrasar piezas de giro y alemites a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses."}, "anodos": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 50}, "notaMarca": "Plan del fabricante: revisar corrosión y deformación a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses; cambiar si hace falta."}, "carburador": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Plan del fabricante: desarmar, limpiar y regular el ralentí cada 100 horas o 6 meses. Tarea de taller. El manual recomienda una revisión completa a las 300 horas."}}, "consejos": ["Rodaje de 10 horas, en el agua y en marcha, con mezcla 25:1: primeros 10 minutos en ralentí; hasta las 2 horas, menos de media aceleración; de 2 a 3 horas, menos de 3/4; de 3 a 10 horas, 3/4 con tramos cortos a fondo. Después de 10 horas, uso normal con 50:1.", "Calentamiento: 3 minutos a baja velocidad (con menos de 5 °C, 5 minutos a 2000 rpm) y verificar que el testigo tire agua."], "fuenteInterna": "Copia interna de la familia tohatsu-18-2t. Fuente original: Manual del propietario oficial Tohatsu M9.9D2 / M15D2 / M18E2 (003-11049, 2018), completo"},
    "mercury-jp-m2.5-3.5-2t": {"nombre": "Mercury 2,5 / 3,5 HP 2T", "estado": "completo", "fuente": "Manual oficial del fabricante del motor", "datosTecnicos": [{"dato": "Cilindros", "valor": "1"}, {"dato": "Cilindrada", "valor": "74,6 cc (47 × 43 mm)"}, {"dato": "Mezcla nafta/aceite", "valor": "50:1 (rodaje: 25:1)"}, {"dato": "Aceite 2T", "valor": "Mercury / Quicksilver TC-W3 o náutico TC-W3"}, {"dato": "Nafta", "valor": "Sin plomo, 91 RON o más"}, {"dato": "Tanque", "valor": "Integral de 1,4 litros"}, {"dato": "Bujía NGK", "valor": "BP6HS-10 (resistiva: BPR6HS-10)"}, {"dato": "Luz de bujía", "valor": "0,9 a 1,0 mm"}, {"dato": "Ajuste de bujía", "valor": "27 Nm"}, {"dato": "Aceite de cola", "valor": "API GL-5, SAE 80 a 90 · 90 ml (2,5 y 3,5A) o 180 ml (3,5B con marcha)"}, {"dato": "Rango a fondo", "valor": "2,5 HP: 3800 a 5200 rpm · 3,5 HP: 4200 a 5300 rpm"}, {"dato": "Ralentí (3,5B)", "valor": "1300 rpm en neutro · 1100 rpm en marcha"}, {"dato": "Arranque", "valor": "Manual (piola)"}, {"dato": "Relación de cola", "valor": "2,5: 1,85 (24:13) · 3,5: 2,15 (28:13)"}], "ajustes": {"aceite-cola": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: cambiar o completar a las 10 horas (o al mes), a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses. Lleva unos 90 ml (o 180 ml en el 3,5B). Si sale lechoso, entra agua por los retenes."}, "filtro-combustible": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: revisar, limpiar o cambiar el filtro y las mangueras a las 10 h, a las 50 h y después cada 100 horas o 6 meses. Limpiar el tanque en los mismos controles."}, "bujias": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: revisar la luz (0,9 a 1,0 mm), limpiar la carbonilla o cambiarla a las 10 h, a las 50 h y después cada 100 horas o 6 meses."}, "helice": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: revisar aspas, pasador y chaveta antes de cada uso y en cada service."}, "engrase": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: engrasar las piezas que giran y deslizan y los alemites en cada service (10 h, 50 h y cada 100 horas o 6 meses)."}, "anodos": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 50}, "notaMarca": "Plan del fabricante: revisar corrosión y deformación a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses. Revisarlo también antes de cada uso."}, "carburador": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Plan del fabricante: desarmar, limpiar y ajustar cada 100 horas o 6 meses. Tarea de taller."}, "impulsor": {"segun": "el taller", "cada": {"meses": 36}, "cadaTrabajo": {"meses": 12}, "notaMarca": "Criterio del taller: controlar la bomba de agua cada 100 horas; cambiar el impulsor cada 3 años en uso recreativo y cada 12 meses en uso de trabajo (alquiler, pesca, transporte). El manual del fabricante dice: el taller revisa el desgaste de la bomba de agua cada 100 horas o 6 meses y la cambia si hace falta."}, "enjuague": {"segun": "el fabricante", "notaMarca": "Plan del fabricante: después de usarlo en agua salada, turbia o con barro, lavar el motor y enjuagar el circuito de refrigeración con agua dulce."}}, "consejos": ["Rodaje: usar mezcla 25:1 durante el rodaje indicado en el manual, sin ir a fondo de entrada; después, 50:1.", "Antes de cada uso: revisar la nafta, que el corte (llave de parada) funcione y que el testigo tire agua apenas arranca."], "fuenteInterna": "Copia interna de la familia tohatsu-m2.5-3.5-2t. Fuente original: Manual del propietario oficial Tohatsu M2.5A2 / M3.5A2 / M3.5B2 (003-11045, en español, tohatsu.com)"},
    "mercury-jp-m4-5-2t": {"nombre": "Mercury 4 / 5 HP 2T", "estado": "completo", "fuente": "Manual oficial del fabricante del motor", "datosTecnicos": [{"dato": "Cilindros", "valor": "1"}, {"dato": "Cilindrada", "valor": "102 cc (55 × 43 mm)"}, {"dato": "Mezcla nafta/aceite", "valor": "50:1 (rodaje: 25:1)"}, {"dato": "Aceite 2T", "valor": "Mercury / Quicksilver TC-W3 o náutico TC-W3"}, {"dato": "Nafta", "valor": "Sin plomo, 91 RON o más"}, {"dato": "Tanque", "valor": "Integral de 2,5 litros (el de 5 HP con tanque separado usa uno de 12 litros)"}, {"dato": "Bujía NGK", "valor": "BP7HS-10 (resistiva: BPR7HS-10)"}, {"dato": "Luz de bujía", "valor": "0,9 a 1,0 mm"}, {"dato": "Ajuste de bujía", "valor": "27 Nm"}, {"dato": "Aceite de cola", "valor": "API GL-5, SAE 80 a 90 · 195 ml"}, {"dato": "Rango a fondo", "valor": "4500 a 5500 rpm"}, {"dato": "Ralentí en marcha", "valor": "850 rpm"}, {"dato": "Ajuste tuerca de hélice", "valor": "12 Nm"}], "ajustes": {"aceite-cola": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: cambiar o completar a las 10 horas (o al mes), a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses. Lleva unos 195 ml. Si sale lechoso, entra agua por los retenes."}, "filtro-combustible": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: revisar, limpiar o cambiar el filtro y las mangueras a las 10 h, a las 50 h y después cada 100 horas o 6 meses. Limpiar el tanque en los mismos controles."}, "bujias": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: revisar la luz (0,9 a 1,0 mm), limpiar la carbonilla o cambiarla a las 10 h, a las 50 h y después cada 100 horas o 6 meses."}, "helice": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: revisar aspas, pasador y chaveta antes de cada uso y en cada service."}, "engrase": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: engrasar las piezas que giran y deslizan y los alemites en cada service (10 h, 50 h y cada 100 horas o 6 meses)."}, "anodos": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 50}, "notaMarca": "Plan del fabricante: revisar corrosión y deformación a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses. Revisarlo también antes de cada uso."}, "carburador": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Plan del fabricante: desarmar, limpiar y ajustar cada 100 horas o 6 meses. Tarea de taller."}, "impulsor": {"segun": "el taller", "cada": {"meses": 36}, "notaMarca": "Criterio del taller: controlar la bomba de agua cada 100 horas; cambiar el impulsor cada 3 años en uso recreativo y cada 12 meses en uso de trabajo (alquiler, pesca, transporte). El manual del fabricante dice: el taller revisa la bomba de agua a las 50 h y cada 100 h, y cambia el impulsor cada 12 meses.", "cadaTrabajo": {"meses": 12}}, "enjuague": {"segun": "el fabricante", "notaMarca": "Plan del fabricante: después de usarlo en agua salada, turbia o con barro, lavar el motor y enjuagar el circuito de refrigeración con agua dulce."}}, "consejos": ["Rodaje: usar mezcla 25:1 durante el rodaje indicado en el manual, sin ir a fondo de entrada; después, 50:1.", "Antes de cada uso: revisar la nafta, que el corte (llave de parada) funcione y que el testigo tire agua apenas arranca."], "fuenteInterna": "Copia interna de la familia tohatsu-m4-5-2t. Fuente original: Manual del propietario oficial Tohatsu M4C / M5B (003-11068, en español, tohatsu.com)"},
    "mercury-jp-m8-9.8-2t": {"nombre": "Mercury 8 / 9,8 HP 2T", "estado": "completo", "fuente": "Manual oficial del fabricante del motor", "datosTecnicos": [{"dato": "Cilindros", "valor": "2"}, {"dato": "Cilindrada", "valor": "169 cc (50 × 43 mm)"}, {"dato": "Mezcla nafta/aceite", "valor": "50:1 (rodaje: 25:1)"}, {"dato": "Aceite 2T", "valor": "Mercury / Quicksilver TC-W3 o náutico TC-W3"}, {"dato": "Nafta", "valor": "Sin plomo, 91 RON o más"}, {"dato": "Tanque", "valor": "Aparte, 12 litros"}, {"dato": "Bujía NGK", "valor": "BP7HS-10 (resistiva: BPR7HS-10)"}, {"dato": "Luz de bujía", "valor": "0,9 a 1,0 mm"}, {"dato": "Ajuste de bujía", "valor": "27 Nm"}, {"dato": "Aceite de cola", "valor": "API GL-5, SAE 80 a 90 · 320 ml"}, {"dato": "Rango a fondo", "valor": "8 HP: 4500 a 5500 rpm · 9,8 HP: 5000 a 6000 rpm"}, {"dato": "Ralentí en marcha", "valor": "750 rpm"}, {"dato": "Ajuste tuerca de hélice", "valor": "12 Nm"}], "ajustes": {"aceite-cola": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: cambiar o completar a las 10 horas (o al mes), a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses. Lleva unos 320 ml. Si sale lechoso, entra agua por los retenes."}, "filtro-combustible": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: revisar, limpiar o cambiar el filtro y las mangueras a las 10 h, a las 50 h y después cada 100 horas o 6 meses. Limpiar el tanque en los mismos controles."}, "bujias": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: revisar la luz (0,9 a 1,0 mm), limpiar la carbonilla o cambiarla a las 10 h, a las 50 h y después cada 100 horas o 6 meses."}, "helice": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: revisar aspas, pasador y chaveta antes de cada uso y en cada service."}, "engrase": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: engrasar las piezas que giran y deslizan y los alemites en cada service (10 h, 50 h y cada 100 horas o 6 meses)."}, "anodos": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 50}, "notaMarca": "Plan del fabricante: revisar corrosión y deformación a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses. Revisarlo también antes de cada uso."}, "carburador": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Plan del fabricante: desarmar, limpiar y ajustar cada 100 horas o 6 meses. Tarea de taller."}, "impulsor": {"segun": "el taller", "cada": {"meses": 36}, "notaMarca": "Criterio del taller: controlar la bomba de agua cada 100 horas; cambiar el impulsor cada 3 años en uso recreativo y cada 12 meses en uso de trabajo (alquiler, pesca, transporte). El manual del fabricante dice: el taller revisa la bomba de agua a las 50 h y cada 100 h, y cambia el impulsor cada 12 meses.", "cadaTrabajo": {"meses": 12}}, "enjuague": {"segun": "el fabricante", "notaMarca": "Plan del fabricante: después de usarlo en agua salada, turbia o con barro, lavar el motor y enjuagar el circuito de refrigeración con agua dulce."}}, "consejos": ["Rodaje: usar mezcla 25:1 durante el rodaje indicado en el manual, sin ir a fondo de entrada; después, 50:1.", "Antes de cada uso: revisar la nafta, que el corte (llave de parada) funcione y que el testigo tire agua apenas arranca."], "fuenteInterna": "Copia interna de la familia tohatsu-m8-9.8-2t. Fuente original: Manual del propietario oficial Tohatsu M8B / M9.8B (003-11029, en español, tohatsu.com)"},
    "mercury-jp-mfs2.5-3.5": {"nombre": "Mercury FourStroke 2.5 / FourStroke 3.5 4T", "estado": "completo", "fuente": "Manual oficial del fabricante del motor", "datosTecnicos": [{"dato": "Cilindros", "valor": "1"}, {"dato": "Cilindrada", "valor": "86 cc (55 × 36 mm)"}, {"dato": "Alimentación", "valor": "Carburador"}, {"dato": "Nafta", "valor": "Sin plomo, 91 RON o más"}, {"dato": "Tanque", "valor": "Integral de 1 litro"}, {"dato": "Aceite de motor", "valor": "SAE 10W-30 o 10W-40, API SH/SJ/SL · 300 ml"}, {"dato": "Aceite de cola", "valor": "API GL-5, SAE 80 a 90 · 180 ml"}, {"dato": "Bujía NGK", "valor": "DCPR6E"}, {"dato": "Luz de bujía", "valor": "0,8 a 0,9 mm"}, {"dato": "Luz de válvulas", "valor": "Admisión 0,06 a 0,14 mm · escape 0,11 a 0,19 mm"}], "ajustes": {"aceite-motor": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: primer cambio a las 20 horas (o al mes) y después cada 100 horas o 6 meses. Aceite 4T SAE 10W-30 o 10W-40 API SH/SJ/SL, 300 ml. Revisar el nivel antes de cada uso. Este motor no tiene filtro de aceite."}, "aceite-cola": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: primer cambio a las 20 horas (o al mes) y después cada 100 horas o 6 meses. Lleva 180 ml de aceite API GL-5 SAE 80-90."}, "filtro-combustible": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: revisar y limpiar o cambiar a las 20 horas y después cada 100 horas o 6 meses, junto con mangueras, tanque y tapa."}, "bujias": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Plan del fabricante: revisar, limpiar o cambiar cada 100 horas o 6 meses. Luz 0,8 a 0,9 mm."}, "helice": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: revisar hélice, chaveta y tuerca a las 20 horas y después cada 100 horas o 6 meses, y antes de cada uso."}, "engrase": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: lubricar piezas que giran y deslizan a las 20 horas y después cada 100 horas o 6 meses."}, "anodos": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Plan del fabricante: revisar el ánodo exterior cada 100 horas o 6 meses."}, "valvulas": {"segun": "el fabricante", "cada": {"horas": 200, "meses": 12}, "notaMarca": "Plan del fabricante: control y ajuste de la luz de válvulas cada 200 horas o 1 año. Tarea de concesionario."}, "termostato": {"segun": "el fabricante", "cada": {"horas": 200, "meses": 12}, "notaMarca": "Plan del fabricante: revisión de concesionario cada 200 horas o 1 año."}, "impulsor": {"segun": "el taller", "cada": {"horas": 200, "meses": 36}, "cadaTrabajo": {"meses": 12}, "notaMarca": "Criterio del taller: controlar la bomba de agua cada 100 horas; cambiar el impulsor cada 3 años en uso recreativo y cada 12 meses en uso de trabajo (alquiler, pesca, transporte). El manual del fabricante dice: el concesionario cambia el impulsor de la bomba de agua cada 200 horas o 1 año."}, "enjuague": {"segun": "el fabricante", "notaMarca": "Plan del fabricante: después de usarlo en agua salada, turbia o con barro, lavar el motor y enjuagar el circuito de refrigeración con agua dulce."}, "carburador": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Plan del fabricante: el concesionario revisa y ajusta el ralentí a las 20 horas y después cada 100 horas o 6 meses. La bomba de nafta se revisa cada 400 horas o 2 años."}}, "tareasExtra": [], "consejos": ["Revisar el nivel de aceite del motor antes de cada salida, con el motor vertical y frío.", "Rodaje: los primeros tiempos de uso a regímenes variados, sin ir a fondo de forma sostenida, como indica el manual."], "fuenteInterna": "Copia interna de la familia tohatsu-mfs2.5-3.5. Fuente original: Manual del propietario oficial Tohatsu MFS2.5C / MFS3.5C (003-11151, en español, tohatsu.com)"},
    "mercury-jp-mfs4-6": {"nombre": "Mercury FourStroke 4 / FourStroke 5 / FourStroke 6 4T", "estado": "completo", "fuente": "Manual oficial del fabricante del motor", "datosTecnicos": [{"dato": "Cilindros", "valor": "1"}, {"dato": "Cilindrada", "valor": "123 cc (59 × 45 mm)"}, {"dato": "Alimentación", "valor": "Carburador"}, {"dato": "Nafta", "valor": "Sin plomo, 91 RON o más"}, {"dato": "Tanque", "valor": "Integral de 1,2 litros o aparte de 12 litros"}, {"dato": "Aceite de motor", "valor": "SAE 10W-30 o 10W-40, API SH/SJ/SL · 450 ml"}, {"dato": "Aceite de cola", "valor": "API GL-5, SAE 80 a 90 · 195 ml"}, {"dato": "Bujía NGK", "valor": "DCPR6E"}, {"dato": "Luz de bujía", "valor": "0,8 a 0,9 mm"}, {"dato": "Luz de válvulas", "valor": "Admisión 0,06 a 0,14 mm · escape 0,11 a 0,19 mm"}], "ajustes": {"aceite-motor": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: primer cambio a las 20 horas (o al mes) y después cada 100 horas o 6 meses. Aceite 4T SAE 10W-30 o 10W-40 API SH/SJ/SL, 450 ml. Revisar el nivel antes de cada uso. Este motor no tiene filtro de aceite."}, "aceite-cola": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: primer cambio a las 20 horas (o al mes) y después cada 100 horas o 6 meses. Lleva 195 ml de aceite API GL-5 SAE 80-90."}, "filtro-combustible": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: revisar y limpiar o cambiar a las 20 horas y después cada 100 horas o 6 meses, junto con mangueras, tanque y tapa."}, "bujias": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Plan del fabricante: revisar, limpiar o cambiar cada 100 horas o 6 meses. Luz 0,8 a 0,9 mm."}, "helice": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: revisar hélice, chaveta y tuerca a las 20 horas y después cada 100 horas o 6 meses, y antes de cada uso."}, "engrase": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: lubricar piezas que giran y deslizan a las 20 horas y después cada 100 horas o 6 meses."}, "anodos": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Plan del fabricante: revisar el ánodo exterior cada 100 horas o 6 meses."}, "valvulas": {"segun": "el fabricante", "cada": {"horas": 200, "meses": 12}, "notaMarca": "Plan del fabricante: control y ajuste de la luz de válvulas cada 200 horas o 1 año. Tarea de concesionario."}, "termostato": {"segun": "el fabricante", "cada": {"horas": 200, "meses": 12}, "notaMarca": "Plan del fabricante: revisión de concesionario cada 200 horas o 1 año."}, "impulsor": {"segun": "el taller", "cada": {"horas": 200, "meses": 36}, "cadaTrabajo": {"meses": 12}, "notaMarca": "Criterio del taller: controlar la bomba de agua cada 100 horas; cambiar el impulsor cada 3 años en uso recreativo y cada 12 meses en uso de trabajo (alquiler, pesca, transporte). El manual del fabricante dice: el concesionario cambia el impulsor de la bomba de agua cada 200 horas o 1 año."}, "enjuague": {"segun": "el fabricante", "notaMarca": "Plan del fabricante: después de usarlo en agua salada, turbia o con barro, lavar el motor y enjuagar el circuito de refrigeración con agua dulce."}, "carburador": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Plan del fabricante: el concesionario revisa y ajusta el ralentí a las 20 horas y después cada 100 horas o 6 meses. La bomba de nafta se revisa cada 400 horas o 2 años."}}, "tareasExtra": [], "consejos": ["Revisar el nivel de aceite del motor antes de cada salida, con el motor vertical y frío.", "Rodaje: los primeros tiempos de uso a regímenes variados, sin ir a fondo de forma sostenida, como indica el manual."], "fuenteInterna": "Copia interna de la familia tohatsu-mfs4-6. Fuente original: Manual del propietario oficial Tohatsu MFS4D / MFS5D / MFS6D (003-11154, en español, tohatsu.com)"},
    "mercury-jp-mfs6-9.9": {"nombre": "Mercury FourStroke 6 / FourStroke 8 / FourStroke 9.9 4T", "estado": "completo", "fuente": "Manual oficial del fabricante del motor", "datosTecnicos": [{"dato": "Cilindros", "valor": "2"}, {"dato": "Cilindrada", "valor": "209 cc (55 × 44 mm)"}, {"dato": "Alimentación", "valor": "Inyección sin cebador (a confirmar en motores anteriores, que eran a carburador)"}, {"dato": "Nafta", "valor": "Sin plomo, 91 RON o más"}, {"dato": "Tanque", "valor": "Aparte, 12 litros"}, {"dato": "Aceite de motor", "valor": "SAE 10W-30 o 10W-40, API SH/SJ/SL · 800 ml"}, {"dato": "Aceite de cola", "valor": "API GL-5, SAE 80 a 90 · 320 ml"}, {"dato": "Bujía NGK", "valor": "DCPR6E"}, {"dato": "Luz de bujía", "valor": "0,8 a 0,9 mm"}, {"dato": "Luz de válvulas", "valor": "Admisión 0,10 a 0,15 mm · escape 0,20 a 0,24 mm"}, {"dato": "Rango a fondo", "valor": "5000 a 6000 rpm"}, {"dato": "Trim (si tiene)", "valor": "ATF Dexron III"}], "ajustes": {"aceite-motor": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: primer cambio a las 20 horas (o al mes) y después cada 100 horas o 6 meses. Aceite 4T SAE 10W-30 o 10W-40 API SH/SJ/SL, 800 ml. Revisar el nivel antes de cada uso. Este motor no tiene filtro de aceite."}, "aceite-cola": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: primer cambio a las 20 horas (o al mes) y después cada 100 horas o 6 meses. Lleva 320 ml de aceite API GL-5 SAE 80-90."}, "filtro-combustible": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: revisar y limpiar o cambiar a las 20 horas y después cada 100 horas o 6 meses, junto con mangueras, tanque y tapa."}, "bujias": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Plan del fabricante: revisar, limpiar o cambiar cada 100 horas o 6 meses. Luz 0,8 a 0,9 mm."}, "helice": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: revisar hélice, chaveta y tuerca a las 20 horas y después cada 100 horas o 6 meses, y antes de cada uso."}, "engrase": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: lubricar piezas que giran y deslizan a las 20 horas y después cada 100 horas o 6 meses."}, "anodos": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Plan del fabricante: revisar el ánodo exterior cada 100 horas o 6 meses."}, "valvulas": {"segun": "el fabricante", "cada": {"horas": 200, "meses": 12}, "notaMarca": "Plan del fabricante: control y ajuste de la luz de válvulas cada 200 horas o 1 año. Tarea de concesionario."}, "termostato": {"segun": "el fabricante", "cada": {"horas": 200, "meses": 12}, "notaMarca": "Plan del fabricante: revisión de concesionario cada 200 horas o 1 año."}, "impulsor": {"segun": "el fabricante", "cada": {"horas": 400, "meses": 24}, "notaMarca": "Plan del fabricante: el concesionario cambia el impulsor de la bomba de agua cada 400 horas o 2 años."}, "enjuague": {"segun": "el fabricante", "notaMarca": "Plan del fabricante: después de usarlo en agua salada, turbia o con barro, lavar el motor y enjuagar el circuito de refrigeración con agua dulce."}}, "tareasExtra": [{"id": "correa", "nombre": "Revisión de correa de distribución", "tiempos": "4T", "cada": {"horas": 200, "meses": 12}, "quien": "mecanico", "segun": "el fabricante", "porque": "Si la correa se corta, el motor se detiene y puede dañarse.", "pasos": ["El fabricante indica revisarla cada 200 horas o 1 año.", "Tarea de concesionario o taller."], "materiales": []}], "consejos": ["Revisar el nivel de aceite del motor antes de cada salida, con el motor vertical y frío.", "Rodaje: los primeros tiempos de uso a regímenes variados, sin ir a fondo de forma sostenida, como indica el manual."], "fuenteInterna": "Copia interna de la familia tohatsu-mfs6-9.9. Fuente original: Manual del propietario oficial Tohatsu MFS6C / MFS8C / MFS9.9C (003-11175, en español, tohatsu.com)"},
    "mercury-jp-mfs9.9-20": {"nombre": "Mercury FourStroke 9.9 / FourStroke 15 / FourStroke 20 4T (333 cc)", "estado": "completo", "fuente": "Manual oficial del fabricante del motor", "datosTecnicos": [{"dato": "Cilindros", "valor": "2"}, {"dato": "Cilindrada", "valor": "333 cc (61 × 57 mm)"}, {"dato": "Alimentación", "valor": "Inyección electrónica"}, {"dato": "Nafta", "valor": "Sin plomo, 91 RON o más"}, {"dato": "Tanque", "valor": "Aparte, 12 litros"}, {"dato": "Aceite de motor", "valor": "SAE 10W-30 o 10W-40, API SH/SJ/SL · 1,0 L sin filtro · 1,2 L con filtro"}, {"dato": "Aceite de cola", "valor": "API GL-5, SAE 80 a 90 · 460 ml"}, {"dato": "Bujía NGK", "valor": "DCPR6E"}, {"dato": "Luz de bujía", "valor": "0,8 a 0,9 mm"}, {"dato": "Luz de válvulas", "valor": "Admisión 0,13 a 0,17 mm · escape 0,18 a 0,22 mm"}, {"dato": "Ralentí", "valor": "950 rpm"}, {"dato": "Rango a fondo", "valor": "5400 a 6100 rpm"}, {"dato": "Trim (si tiene)", "valor": "ATF Dexron III"}], "ajustes": {"aceite-motor": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: primer cambio a las 20 horas (o al mes) y después cada 100 horas o 6 meses. Aceite 4T SAE 10W-30 o 10W-40 API SH/SJ/SL, 1,0 L (1,2 L con filtro). Revisar el nivel antes de cada uso. El filtro de aceite se cambia a las 20 horas y después cada 200 horas o 1 año."}, "aceite-cola": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: primer cambio a las 20 horas (o al mes) y después cada 100 horas o 6 meses. Lleva 460 ml de aceite API GL-5 SAE 80-90."}, "filtro-combustible": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: revisar y limpiar o cambiar a las 20 horas y después cada 100 horas o 6 meses, junto con mangueras, tanque y tapa."}, "bujias": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Plan del fabricante: revisar, limpiar o cambiar cada 100 horas o 6 meses. Luz 0,8 a 0,9 mm."}, "helice": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: revisar hélice, chaveta y tuerca a las 20 horas y después cada 100 horas o 6 meses, y antes de cada uso."}, "engrase": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: lubricar piezas que giran y deslizan a las 20 horas y después cada 100 horas o 6 meses."}, "anodos": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Plan del fabricante: revisar el ánodo exterior cada 100 horas o 6 meses."}, "valvulas": {"segun": "el fabricante", "cada": {"horas": 200, "meses": 12}, "notaMarca": "Plan del fabricante: control y ajuste de la luz de válvulas cada 200 horas o 1 año. Tarea de concesionario."}, "termostato": {"segun": "el fabricante", "cada": {"horas": 200, "meses": 12}, "notaMarca": "Plan del fabricante: revisión de concesionario cada 200 horas o 1 año."}, "impulsor": {"segun": "el fabricante", "cada": {"horas": 400, "meses": 24}, "notaMarca": "Plan del fabricante: el concesionario cambia el impulsor de la bomba de agua cada 400 horas o 2 años."}, "enjuague": {"segun": "el fabricante", "notaMarca": "Plan del fabricante: después de usarlo en agua salada, turbia o con barro, lavar el motor y enjuagar el circuito de refrigeración con agua dulce."}}, "tareasExtra": [{"id": "filtro-aceite", "nombre": "Cambio de filtro de aceite", "tiempos": "4T", "cada": {"horas": 200, "meses": 12, "primeraHoras": 20}, "quien": "mecanico", "segun": "el fabricante", "porque": "Retiene las partículas del aceite. El fabricante indica cambiarlo a las 20 horas y después cada 200 horas o 1 año.", "pasos": ["Se cambia junto con el aceite de motor.", "Tarea de concesionario o taller."], "materiales": ["Filtro de aceite original"]}, {"id": "correa", "nombre": "Revisión de correa de distribución", "tiempos": "4T", "cada": {"horas": 200, "meses": 12}, "quien": "mecanico", "segun": "el fabricante", "porque": "Si la correa se corta, el motor se detiene y puede dañarse.", "pasos": ["El fabricante indica revisarla cada 200 horas o 1 año.", "Tarea de concesionario o taller."], "materiales": []}], "consejos": ["Revisar el nivel de aceite del motor antes de cada salida, con el motor vertical y frío.", "Rodaje: los primeros tiempos de uso a regímenes variados, sin ir a fondo de forma sostenida, como indica el manual."], "fuenteInterna": "Copia interna de la familia tohatsu-mfs9.9-20. Fuente original: Manual del propietario oficial Tohatsu MFS9.9E / MFS15E / MFS20E (003-11144, en español, tohatsu.com)"},
    "mercury-jp-mfs25-30": {"nombre": "Mercury FourStroke 25 / FourStroke 30 4T (500 cc)", "estado": "completo", "fuente": "Manual oficial del fabricante del motor", "datosTecnicos": [{"dato": "Cilindros", "valor": "3"}, {"dato": "Cilindrada", "valor": "500 cc"}, {"dato": "Alimentación", "valor": "Inyección electrónica"}, {"dato": "Nafta", "valor": "Sin plomo, 91 RON o más"}, {"dato": "Tanque", "valor": "Aparte, 25 litros"}, {"dato": "Aceite de motor", "valor": "SAE 10W-30 o 10W-40, API SH/SJ/SL · 1,5 L sin filtro · 1,7 L con filtro"}, {"dato": "Aceite de cola", "valor": "API GL-5, SAE 80 a 90 · 460 ml"}, {"dato": "Bujía NGK", "valor": "DCPR6E o equivalente"}, {"dato": "Luz de bujía", "valor": "0,8 a 0,9 mm"}, {"dato": "Luz de válvulas", "valor": "Admisión 0,10 a 0,15 mm · escape 0,20 a 0,24 mm"}, {"dato": "Ralentí", "valor": "850 rpm"}, {"dato": "Trim (si tiene)", "valor": "ATF Dexron III"}], "ajustes": {"aceite-motor": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: primer cambio a las 20 horas (o al mes) y después cada 100 horas o 6 meses. Aceite 4T SAE 10W-30 o 10W-40 API SH/SJ/SL, 1,5 L (1,7 L con filtro). Revisar el nivel antes de cada uso. El filtro de aceite se cambia a las 20 horas y después cada 200 horas o 1 año."}, "aceite-cola": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: primer cambio a las 20 horas (o al mes) y después cada 100 horas o 6 meses. Lleva 460 ml de aceite API GL-5 SAE 80-90."}, "filtro-combustible": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: revisar y limpiar o cambiar a las 20 horas y después cada 100 horas o 6 meses, junto con mangueras, tanque y tapa."}, "bujias": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Plan del fabricante: revisar, limpiar o cambiar cada 100 horas o 6 meses. Luz 0,8 a 0,9 mm."}, "helice": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: revisar hélice, chaveta y tuerca a las 20 horas y después cada 100 horas o 6 meses, y antes de cada uso."}, "engrase": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: lubricar piezas que giran y deslizan a las 20 horas y después cada 100 horas o 6 meses."}, "anodos": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Plan del fabricante: revisar el ánodo exterior cada 100 horas o 6 meses."}, "valvulas": {"segun": "el fabricante", "cada": {"horas": 200, "meses": 12}, "notaMarca": "Plan del fabricante: control y ajuste de la luz de válvulas cada 200 horas o 1 año. Tarea de concesionario."}, "termostato": {"segun": "el fabricante", "cada": {"horas": 200, "meses": 12}, "notaMarca": "Plan del fabricante: revisión de concesionario cada 200 horas o 1 año."}, "impulsor": {"segun": "el fabricante", "cada": {"horas": 400, "meses": 24}, "notaMarca": "Plan del fabricante: el concesionario cambia el impulsor de la bomba de agua cada 400 horas o 2 años."}, "enjuague": {"segun": "el fabricante", "notaMarca": "Plan del fabricante: después de usarlo en agua salada, turbia o con barro, lavar el motor y enjuagar el circuito de refrigeración con agua dulce."}}, "tareasExtra": [{"id": "filtro-aceite", "nombre": "Cambio de filtro de aceite", "tiempos": "4T", "cada": {"horas": 200, "meses": 12, "primeraHoras": 20}, "quien": "mecanico", "segun": "el fabricante", "porque": "Retiene las partículas del aceite. El fabricante indica cambiarlo a las 20 horas y después cada 200 horas o 1 año.", "pasos": ["Se cambia junto con el aceite de motor.", "Tarea de concesionario o taller."], "materiales": ["Filtro de aceite original"]}, {"id": "correa", "nombre": "Revisión de correa de distribución", "tiempos": "4T", "cada": {"horas": 200, "meses": 12}, "quien": "mecanico", "segun": "el fabricante", "porque": "Si la correa se corta, el motor se detiene y puede dañarse.", "pasos": ["El fabricante indica revisarla cada 200 horas o 1 año.", "Tarea de concesionario o taller."], "materiales": []}], "consejos": ["Revisar el nivel de aceite del motor antes de cada salida, con el motor vertical y frío.", "Rodaje: los primeros tiempos de uso a regímenes variados, sin ir a fondo de forma sostenida, como indica el manual."], "fuenteInterna": "Copia interna de la familia tohatsu-mfs25-30. Fuente original: Manual del propietario oficial Tohatsu MFS25D / MFS30D (003-11171, en español, tohatsu.com)"},

    // ---- Agregadas el 11/11/2026 (modelos que se venden hoy en la Argentina) ----

    // ---- Agregadas el 11/11/2026 (modelos que se venden hoy en la Argentina) ----
    "tohatsu-m2.5-3.5-2t": {"nombre": "Base Tohatsu 2,5 / 3,5 HP 2T (M2.5A2, M3.5A2, M3.5B2)", "estado": "completo", "fuente": "Manual del propietario oficial Tohatsu M2.5A2 / M3.5A2 / M3.5B2 (003-11045, en español, tohatsu.com)", "datosTecnicos": [{"dato": "Base", "valor": "Tohatsu M2.5 / M3.5, fabricado en Japón"}, {"dato": "Cilindros", "valor": "1"}, {"dato": "Cilindrada", "valor": "74,6 cc (47 × 43 mm)"}, {"dato": "Mezcla nafta/aceite", "valor": "50:1 (rodaje: 25:1)"}, {"dato": "Aceite 2T", "valor": "Original Tohatsu o náutico TC-W3"}, {"dato": "Nafta", "valor": "Sin plomo, 91 RON o más"}, {"dato": "Tanque", "valor": "Integral de 1,4 litros"}, {"dato": "Bujía NGK", "valor": "BP6HS-10 (resistiva: BPR6HS-10)"}, {"dato": "Luz de bujía", "valor": "0,9 a 1,0 mm"}, {"dato": "Ajuste de bujía", "valor": "27 Nm"}, {"dato": "Aceite de cola", "valor": "API GL-5, SAE 80 a 90 · 90 ml (2,5 y 3,5A) o 180 ml (3,5B con marcha)"}, {"dato": "Rango a fondo", "valor": "2,5 HP: 3800 a 5200 rpm · 3,5 HP: 4200 a 5300 rpm"}, {"dato": "Ralentí (3,5B)", "valor": "1300 rpm en neutro · 1100 rpm en marcha"}, {"dato": "Arranque", "valor": "Manual (piola)"}, {"dato": "Relación de cola", "valor": "2,5: 1,85 (24:13) · 3,5: 2,15 (28:13)"}], "ajustes": {"aceite-cola": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Tohatsu: cambiar o completar a las 10 horas (o al mes), a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses. Lleva unos 90 ml (o 180 ml en el 3,5B). Si sale lechoso, entra agua por los retenes."}, "filtro-combustible": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Tohatsu: revisar, limpiar o cambiar el filtro y las mangueras a las 10 h, a las 50 h y después cada 100 horas o 6 meses. Limpiar el tanque en los mismos controles."}, "bujias": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Tohatsu: revisar la luz (0,9 a 1,0 mm), limpiar la carbonilla o cambiarla a las 10 h, a las 50 h y después cada 100 horas o 6 meses."}, "helice": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Tohatsu: revisar aspas, pasador y chaveta antes de cada uso y en cada service."}, "engrase": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Tohatsu: engrasar las piezas que giran y deslizan y los alemites en cada service (10 h, 50 h y cada 100 horas o 6 meses)."}, "anodos": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 50}, "notaMarca": "Tohatsu: revisar corrosión y deformación a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses. Revisarlo también antes de cada uso."}, "carburador": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Tohatsu: desarmar, limpiar y ajustar cada 100 horas o 6 meses. Tarea de taller."}, "impulsor": {"segun": "el taller", "cada": {"meses": 36}, "cadaTrabajo": {"meses": 12}, "notaMarca": "Criterio del taller: controlar la bomba de agua cada 100 horas; cambiar el impulsor cada 3 años en uso recreativo y cada 12 meses en uso de trabajo (alquiler, pesca, transporte). El manual Tohatsu dice: el taller revisa el desgaste de la bomba de agua cada 100 horas o 6 meses y la cambia si hace falta."}, "enjuague": {"segun": "Tohatsu", "notaMarca": "Tohatsu: después de usarlo en agua salada, turbia o con barro, lavar el motor y enjuagar el circuito de refrigeración con agua dulce."}}, "consejos": ["Rodaje: usar mezcla 25:1 durante el rodaje indicado en el manual, sin ir a fondo de entrada; después, 50:1.", "Antes de cada uso: revisar la nafta, que el corte (llave de parada) funcione y que el testigo tire agua apenas arranca."]},
    "tohatsu-m4-5-2t": {"nombre": "Base Tohatsu 4 / 5 HP 2T (M4C, M5B)", "estado": "completo", "fuente": "Manual del propietario oficial Tohatsu M4C / M5B (003-11068, en español, tohatsu.com)", "datosTecnicos": [{"dato": "Base", "valor": "Tohatsu M4C / M5B, fabricado en Japón"}, {"dato": "Cilindros", "valor": "1"}, {"dato": "Cilindrada", "valor": "102 cc (55 × 43 mm)"}, {"dato": "Mezcla nafta/aceite", "valor": "50:1 (rodaje: 25:1)"}, {"dato": "Aceite 2T", "valor": "Original Tohatsu o náutico TC-W3"}, {"dato": "Nafta", "valor": "Sin plomo, 91 RON o más"}, {"dato": "Tanque", "valor": "Integral de 2,5 litros (el M5BS usa tanque aparte de 12 litros)"}, {"dato": "Bujía NGK", "valor": "BP7HS-10 (resistiva: BPR7HS-10)"}, {"dato": "Luz de bujía", "valor": "0,9 a 1,0 mm"}, {"dato": "Ajuste de bujía", "valor": "27 Nm"}, {"dato": "Aceite de cola", "valor": "API GL-5, SAE 80 a 90 · 195 ml"}, {"dato": "Rango a fondo", "valor": "4500 a 5500 rpm"}, {"dato": "Ralentí en marcha", "valor": "850 rpm"}, {"dato": "Ajuste tuerca de hélice", "valor": "12 Nm"}], "ajustes": {"aceite-cola": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Tohatsu: cambiar o completar a las 10 horas (o al mes), a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses. Lleva unos 195 ml. Si sale lechoso, entra agua por los retenes."}, "filtro-combustible": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Tohatsu: revisar, limpiar o cambiar el filtro y las mangueras a las 10 h, a las 50 h y después cada 100 horas o 6 meses. Limpiar el tanque en los mismos controles."}, "bujias": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Tohatsu: revisar la luz (0,9 a 1,0 mm), limpiar la carbonilla o cambiarla a las 10 h, a las 50 h y después cada 100 horas o 6 meses."}, "helice": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Tohatsu: revisar aspas, pasador y chaveta antes de cada uso y en cada service."}, "engrase": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Tohatsu: engrasar las piezas que giran y deslizan y los alemites en cada service (10 h, 50 h y cada 100 horas o 6 meses)."}, "anodos": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 50}, "notaMarca": "Tohatsu: revisar corrosión y deformación a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses. Revisarlo también antes de cada uso."}, "carburador": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Tohatsu: desarmar, limpiar y ajustar cada 100 horas o 6 meses. Tarea de taller."}, "impulsor": {"segun": "el taller", "cada": {"meses": 36}, "cadaTrabajo": {"meses": 12}, "notaMarca": "Criterio del taller: controlar la bomba de agua cada 100 horas; cambiar el impulsor cada 3 años en uso recreativo y cada 12 meses en uso de trabajo (alquiler, pesca, transporte). El manual Tohatsu dice: el taller revisa la bomba de agua a las 50 h y cada 100 h, y cambia el impulsor cada 12 meses."}, "enjuague": {"segun": "Tohatsu", "notaMarca": "Tohatsu: después de usarlo en agua salada, turbia o con barro, lavar el motor y enjuagar el circuito de refrigeración con agua dulce."}}, "consejos": ["Rodaje: usar mezcla 25:1 durante el rodaje indicado en el manual, sin ir a fondo de entrada; después, 50:1.", "Antes de cada uso: revisar la nafta, que el corte (llave de parada) funcione y que el testigo tire agua apenas arranca."]},
    "tohatsu-m8-9.8-2t": {"nombre": "Base Tohatsu 8 / 9,8 HP 2T (M8B, M9.8B)", "estado": "revision", "fuente": "Manual del propietario oficial Tohatsu M8B / M9.8B (003-11029, en español, tohatsu.com)", "datosTecnicos": [{"dato": "Base", "valor": "Tohatsu M8B / M9.8B, fabricado en Japón"}, {"dato": "Cilindros", "valor": "2"}, {"dato": "Cilindrada", "valor": "169 cc (50 × 43 mm)"}, {"dato": "Mezcla nafta/aceite", "valor": "50:1 (rodaje: 25:1)"}, {"dato": "Aceite 2T", "valor": "Original Tohatsu o náutico TC-W3"}, {"dato": "Nafta", "valor": "Sin plomo, 91 RON o más"}, {"dato": "Tanque", "valor": "Aparte, 12 litros"}, {"dato": "Bujía NGK", "valor": "BP7HS-10 (resistiva: BPR7HS-10)"}, {"dato": "Luz de bujía", "valor": "0,9 a 1,0 mm"}, {"dato": "Ajuste de bujía", "valor": "27 Nm"}, {"dato": "Aceite de cola", "valor": "API GL-5, SAE 80 a 90 · 320 ml"}, {"dato": "Rango a fondo", "valor": "8 HP: 4500 a 5500 rpm · 9,8 HP: 5000 a 6000 rpm"}, {"dato": "Ralentí en marcha", "valor": "750 rpm"}, {"dato": "Ajuste tuerca de hélice", "valor": "12 Nm"}], "ajustes": {"aceite-cola": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Tohatsu: cambiar o completar a las 10 horas (o al mes), a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses. Lleva unos 320 ml. Si sale lechoso, entra agua por los retenes."}, "filtro-combustible": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Tohatsu: revisar, limpiar o cambiar el filtro y las mangueras a las 10 h, a las 50 h y después cada 100 horas o 6 meses. Limpiar el tanque en los mismos controles."}, "bujias": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Tohatsu: revisar la luz (0,9 a 1,0 mm), limpiar la carbonilla o cambiarla a las 10 h, a las 50 h y después cada 100 horas o 6 meses."}, "helice": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Tohatsu: revisar aspas, pasador y chaveta antes de cada uso y en cada service."}, "engrase": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Tohatsu: engrasar las piezas que giran y deslizan y los alemites en cada service (10 h, 50 h y cada 100 horas o 6 meses)."}, "anodos": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 50}, "notaMarca": "Tohatsu: revisar corrosión y deformación a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses. Revisarlo también antes de cada uso."}, "carburador": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Tohatsu: desarmar, limpiar y ajustar cada 100 horas o 6 meses. Tarea de taller."}, "impulsor": {"segun": "el taller", "cada": {"meses": 36}, "cadaTrabajo": {"meses": 12}, "notaMarca": "Criterio del taller: controlar la bomba de agua cada 100 horas; cambiar el impulsor cada 3 años en uso recreativo y cada 12 meses en uso de trabajo (alquiler, pesca, transporte). El manual Tohatsu dice: el taller revisa la bomba de agua a las 50 h y cada 100 h, y cambia el impulsor cada 12 meses."}, "enjuague": {"segun": "Tohatsu", "notaMarca": "Tohatsu: después de usarlo en agua salada, turbia o con barro, lavar el motor y enjuagar el circuito de refrigeración con agua dulce."}}, "consejos": ["Rodaje: usar mezcla 25:1 durante el rodaje indicado en el manual, sin ir a fondo de entrada; después, 50:1.", "Antes de cada uso: revisar la nafta, que el corte (llave de parada) funcione y que el testigo tire agua apenas arranca."]},
    "tohatsu-9.9-15-2t": {"nombre": "Base Tohatsu 9,9 / 15 HP 2T (M9.9D2, M15D2)", "estado": "completo", "fuente": "Manual del propietario oficial Tohatsu M9.9D2 / M15D2 / M18E2 (003-11049, en español, tohatsu.com)", "datosTecnicos": [{"dato": "Base", "valor": "Tohatsu M9.9D2 / M15D2, fabricado en Japón"}, {"dato": "Cilindros", "valor": "2"}, {"dato": "Cilindrada", "valor": "247 cc (55 × 52 mm)"}, {"dato": "Mezcla nafta/aceite", "valor": "50:1 (rodaje: 25:1)"}, {"dato": "Aceite 2T", "valor": "Original Tohatsu o náutico TC-W3"}, {"dato": "Nafta", "valor": "Sin plomo, 91 RON o más"}, {"dato": "Tanque", "valor": "Aparte, 25 litros"}, {"dato": "Bujía NGK", "valor": "B7HS-10 (resistiva: BR7HS-10)"}, {"dato": "Luz de bujía", "valor": "0,9 a 1,0 mm"}, {"dato": "Aceite de cola", "valor": "API GL-5, SAE 80 a 90 · 370 ml"}], "ajustes": {"aceite-cola": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Tohatsu: cambiar o completar a las 10 horas (o al mes), a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses. Lleva unos 370 ml. Si sale lechoso, entra agua por los retenes."}, "filtro-combustible": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Tohatsu: revisar, limpiar o cambiar el filtro y las mangueras a las 10 h, a las 50 h y después cada 100 horas o 6 meses. Limpiar el tanque en los mismos controles."}, "bujias": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Tohatsu: revisar la luz (0,9 a 1,0 mm), limpiar la carbonilla o cambiarla a las 10 h, a las 50 h y después cada 100 horas o 6 meses."}, "helice": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Tohatsu: revisar aspas, pasador y chaveta antes de cada uso y en cada service."}, "engrase": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Tohatsu: engrasar las piezas que giran y deslizan y los alemites en cada service (10 h, 50 h y cada 100 horas o 6 meses)."}, "anodos": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 50}, "notaMarca": "Tohatsu: revisar corrosión y deformación a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses. Revisarlo también antes de cada uso."}, "carburador": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Tohatsu: desarmar, limpiar y ajustar cada 100 horas o 6 meses. Tarea de taller."}, "impulsor": {"segun": "el taller", "cada": {"meses": 36}, "cadaTrabajo": {"meses": 12}, "notaMarca": "Criterio del taller: controlar la bomba de agua cada 100 horas; cambiar el impulsor cada 3 años en uso recreativo y cada 12 meses en uso de trabajo (alquiler, pesca, transporte). El manual Tohatsu dice: el taller revisa la bomba de agua a las 50 h y cada 100 h, y cambia el impulsor cada 12 meses."}, "enjuague": {"segun": "Tohatsu", "notaMarca": "Tohatsu: después de usarlo en agua salada, turbia o con barro, lavar el motor y enjuagar el circuito de refrigeración con agua dulce."}}, "consejos": ["Rodaje: usar mezcla 25:1 durante el rodaje indicado en el manual, sin ir a fondo de entrada; después, 50:1.", "Antes de cada uso: revisar la nafta, que el corte (llave de parada) funcione y que el testigo tire agua apenas arranca."]},
    "tohatsu-mfs2.5-3.5": {"nombre": "Base Tohatsu MFS2.5 / MFS3.5 4T", "estado": "completo", "fuente": "Manual del propietario oficial Tohatsu MFS2.5C / MFS3.5C (003-11151, en español, tohatsu.com)", "datosTecnicos": [{"dato": "Base", "valor": "Tohatsu MFS2.5C / MFS3.5C"}, {"dato": "Cilindros", "valor": "1"}, {"dato": "Cilindrada", "valor": "86 cc (55 × 36 mm)"}, {"dato": "Alimentación", "valor": "Carburador"}, {"dato": "Nafta", "valor": "Sin plomo, 91 RON o más"}, {"dato": "Tanque", "valor": "Integral de 1 litro"}, {"dato": "Aceite de motor", "valor": "SAE 10W-30 o 10W-40, API SH/SJ/SL · 300 ml"}, {"dato": "Aceite de cola", "valor": "API GL-5, SAE 80 a 90 · 180 ml"}, {"dato": "Bujía NGK", "valor": "DCPR6E"}, {"dato": "Luz de bujía", "valor": "0,8 a 0,9 mm"}, {"dato": "Luz de válvulas", "valor": "Admisión 0,06 a 0,14 mm · escape 0,11 a 0,19 mm"}], "ajustes": {"aceite-motor": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Tohatsu: primer cambio a las 20 horas (o al mes) y después cada 100 horas o 6 meses. Aceite 4T SAE 10W-30 o 10W-40 API SH/SJ/SL, 300 ml. Revisar el nivel antes de cada uso. Este motor no tiene filtro de aceite."}, "aceite-cola": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Tohatsu: primer cambio a las 20 horas (o al mes) y después cada 100 horas o 6 meses. Lleva 180 ml de aceite API GL-5 SAE 80-90."}, "filtro-combustible": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Tohatsu: revisar y limpiar o cambiar a las 20 horas y después cada 100 horas o 6 meses, junto con mangueras, tanque y tapa."}, "bujias": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Tohatsu: revisar, limpiar o cambiar cada 100 horas o 6 meses. Luz 0,8 a 0,9 mm."}, "helice": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Tohatsu: revisar hélice, chaveta y tuerca a las 20 horas y después cada 100 horas o 6 meses, y antes de cada uso."}, "engrase": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Tohatsu: lubricar piezas que giran y deslizan a las 20 horas y después cada 100 horas o 6 meses."}, "anodos": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Tohatsu: revisar el ánodo exterior cada 100 horas o 6 meses."}, "valvulas": {"segun": "Tohatsu", "cada": {"horas": 200, "meses": 12}, "notaMarca": "Tohatsu: control y ajuste de la luz de válvulas cada 200 horas o 1 año. Tarea de concesionario."}, "termostato": {"segun": "Tohatsu", "cada": {"horas": 200, "meses": 12}, "notaMarca": "Tohatsu: revisión de concesionario cada 200 horas o 1 año."}, "impulsor": {"segun": "el taller", "cada": {"horas": 200, "meses": 36}, "cadaTrabajo": {"meses": 12}, "notaMarca": "Criterio del taller: controlar la bomba de agua cada 100 horas; cambiar el impulsor cada 3 años en uso recreativo y cada 12 meses en uso de trabajo (alquiler, pesca, transporte). El manual Tohatsu dice: el concesionario cambia el impulsor de la bomba de agua cada 200 horas o 1 año."}, "enjuague": {"segun": "Tohatsu", "notaMarca": "Tohatsu: después de usarlo en agua salada, turbia o con barro, lavar el motor y enjuagar el circuito de refrigeración con agua dulce."}, "carburador": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Tohatsu: el concesionario revisa y ajusta el ralentí a las 20 horas y después cada 100 horas o 6 meses. La bomba de nafta se revisa cada 400 horas o 2 años."}}, "tareasExtra": [], "consejos": ["Revisar el nivel de aceite del motor antes de cada salida, con el motor vertical y frío.", "Rodaje: los primeros tiempos de uso a regímenes variados, sin ir a fondo de forma sostenida, como indica el manual."]},
    "tohatsu-mfs4-6": {"nombre": "Base Tohatsu MFS4 / MFS5 / MFS6 4T", "estado": "completo", "fuente": "Manual del propietario oficial Tohatsu MFS4D / MFS5D / MFS6D (003-11154, en español, tohatsu.com)", "datosTecnicos": [{"dato": "Base", "valor": "Tohatsu MFS4D / MFS5D / MFS6D"}, {"dato": "Cilindros", "valor": "1"}, {"dato": "Cilindrada", "valor": "123 cc (59 × 45 mm)"}, {"dato": "Alimentación", "valor": "Carburador"}, {"dato": "Nafta", "valor": "Sin plomo, 91 RON o más"}, {"dato": "Tanque", "valor": "Integral de 1,2 litros o aparte de 12 litros"}, {"dato": "Aceite de motor", "valor": "SAE 10W-30 o 10W-40, API SH/SJ/SL · 450 ml"}, {"dato": "Aceite de cola", "valor": "API GL-5, SAE 80 a 90 · 195 ml"}, {"dato": "Bujía NGK", "valor": "DCPR6E"}, {"dato": "Luz de bujía", "valor": "0,8 a 0,9 mm"}, {"dato": "Luz de válvulas", "valor": "Admisión 0,06 a 0,14 mm · escape 0,11 a 0,19 mm"}], "ajustes": {"aceite-motor": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Tohatsu: primer cambio a las 20 horas (o al mes) y después cada 100 horas o 6 meses. Aceite 4T SAE 10W-30 o 10W-40 API SH/SJ/SL, 450 ml. Revisar el nivel antes de cada uso. Este motor no tiene filtro de aceite."}, "aceite-cola": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Tohatsu: primer cambio a las 20 horas (o al mes) y después cada 100 horas o 6 meses. Lleva 195 ml de aceite API GL-5 SAE 80-90."}, "filtro-combustible": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Tohatsu: revisar y limpiar o cambiar a las 20 horas y después cada 100 horas o 6 meses, junto con mangueras, tanque y tapa."}, "bujias": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Tohatsu: revisar, limpiar o cambiar cada 100 horas o 6 meses. Luz 0,8 a 0,9 mm."}, "helice": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Tohatsu: revisar hélice, chaveta y tuerca a las 20 horas y después cada 100 horas o 6 meses, y antes de cada uso."}, "engrase": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Tohatsu: lubricar piezas que giran y deslizan a las 20 horas y después cada 100 horas o 6 meses."}, "anodos": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Tohatsu: revisar el ánodo exterior cada 100 horas o 6 meses."}, "valvulas": {"segun": "Tohatsu", "cada": {"horas": 200, "meses": 12}, "notaMarca": "Tohatsu: control y ajuste de la luz de válvulas cada 200 horas o 1 año. Tarea de concesionario."}, "termostato": {"segun": "Tohatsu", "cada": {"horas": 200, "meses": 12}, "notaMarca": "Tohatsu: revisión de concesionario cada 200 horas o 1 año."}, "impulsor": {"segun": "el taller", "cada": {"horas": 200, "meses": 36}, "cadaTrabajo": {"meses": 12}, "notaMarca": "Criterio del taller: controlar la bomba de agua cada 100 horas; cambiar el impulsor cada 3 años en uso recreativo y cada 12 meses en uso de trabajo (alquiler, pesca, transporte). El manual Tohatsu dice: el concesionario cambia el impulsor de la bomba de agua cada 200 horas o 1 año."}, "enjuague": {"segun": "Tohatsu", "notaMarca": "Tohatsu: después de usarlo en agua salada, turbia o con barro, lavar el motor y enjuagar el circuito de refrigeración con agua dulce."}, "carburador": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Tohatsu: el concesionario revisa y ajusta el ralentí a las 20 horas y después cada 100 horas o 6 meses. La bomba de nafta se revisa cada 400 horas o 2 años."}}, "tareasExtra": [], "consejos": ["Revisar el nivel de aceite del motor antes de cada salida, con el motor vertical y frío.", "Rodaje: los primeros tiempos de uso a regímenes variados, sin ir a fondo de forma sostenida, como indica el manual."]},
    "tohatsu-mfs6-9.9": {"nombre": "Base Tohatsu MFS6 / MFS8 / MFS9.9 4T (serie C)", "estado": "completo", "fuente": "Manual del propietario oficial Tohatsu MFS6C / MFS8C / MFS9.9C (003-11175, en español, tohatsu.com)", "datosTecnicos": [{"dato": "Base", "valor": "Tohatsu MFS6C / MFS8C / MFS9.9C"}, {"dato": "Cilindros", "valor": "2"}, {"dato": "Cilindrada", "valor": "209 cc (55 × 44 mm)"}, {"dato": "Alimentación", "valor": "Inyección sin cebador (a confirmar en motores anteriores, que eran a carburador)"}, {"dato": "Nafta", "valor": "Sin plomo, 91 RON o más"}, {"dato": "Tanque", "valor": "Aparte, 12 litros"}, {"dato": "Aceite de motor", "valor": "SAE 10W-30 o 10W-40, API SH/SJ/SL · 800 ml"}, {"dato": "Aceite de cola", "valor": "API GL-5, SAE 80 a 90 · 320 ml"}, {"dato": "Bujía NGK", "valor": "DCPR6E"}, {"dato": "Luz de bujía", "valor": "0,8 a 0,9 mm"}, {"dato": "Luz de válvulas", "valor": "Admisión 0,10 a 0,15 mm · escape 0,20 a 0,24 mm"}, {"dato": "Rango a fondo", "valor": "5000 a 6000 rpm"}, {"dato": "Trim (si tiene)", "valor": "ATF Dexron III"}], "ajustes": {"aceite-motor": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Tohatsu: primer cambio a las 20 horas (o al mes) y después cada 100 horas o 6 meses. Aceite 4T SAE 10W-30 o 10W-40 API SH/SJ/SL, 800 ml. Revisar el nivel antes de cada uso. Este motor no tiene filtro de aceite."}, "aceite-cola": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Tohatsu: primer cambio a las 20 horas (o al mes) y después cada 100 horas o 6 meses. Lleva 320 ml de aceite API GL-5 SAE 80-90."}, "filtro-combustible": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Tohatsu: revisar y limpiar o cambiar a las 20 horas y después cada 100 horas o 6 meses, junto con mangueras, tanque y tapa."}, "bujias": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Tohatsu: revisar, limpiar o cambiar cada 100 horas o 6 meses. Luz 0,8 a 0,9 mm."}, "helice": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Tohatsu: revisar hélice, chaveta y tuerca a las 20 horas y después cada 100 horas o 6 meses, y antes de cada uso."}, "engrase": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Tohatsu: lubricar piezas que giran y deslizan a las 20 horas y después cada 100 horas o 6 meses."}, "anodos": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Tohatsu: revisar el ánodo exterior cada 100 horas o 6 meses."}, "valvulas": {"segun": "Tohatsu", "cada": {"horas": 200, "meses": 12}, "notaMarca": "Tohatsu: control y ajuste de la luz de válvulas cada 200 horas o 1 año. Tarea de concesionario."}, "termostato": {"segun": "Tohatsu", "cada": {"horas": 200, "meses": 12}, "notaMarca": "Tohatsu: revisión de concesionario cada 200 horas o 1 año."}, "impulsor": {"segun": "Tohatsu", "cada": {"horas": 400, "meses": 24}, "notaMarca": "Tohatsu: el concesionario cambia el impulsor de la bomba de agua cada 400 horas o 2 años."}, "enjuague": {"segun": "Tohatsu", "notaMarca": "Tohatsu: después de usarlo en agua salada, turbia o con barro, lavar el motor y enjuagar el circuito de refrigeración con agua dulce."}}, "tareasExtra": [{"id": "correa", "nombre": "Revisión de correa de distribución", "tiempos": "4T", "cada": {"horas": 200, "meses": 12}, "quien": "mecanico", "segun": "Tohatsu", "porque": "Si la correa se corta, el motor se detiene y puede dañarse.", "pasos": ["Tohatsu indica revisarla cada 200 horas o 1 año.", "Tarea de concesionario o taller."], "materiales": []}], "consejos": ["Revisar el nivel de aceite del motor antes de cada salida, con el motor vertical y frío.", "Rodaje: los primeros tiempos de uso a regímenes variados, sin ir a fondo de forma sostenida, como indica el manual."]},
    "tohatsu-mfs9.9-20": {"nombre": "Base Tohatsu MFS9.9 / MFS15 / MFS20 4T (serie E, 333 cc)", "estado": "completo", "fuente": "Manual del propietario oficial Tohatsu MFS9.9E / MFS15E / MFS20E (003-11144, en español, tohatsu.com)", "datosTecnicos": [{"dato": "Base", "valor": "Tohatsu MFS9.9E / 15E / 20E"}, {"dato": "Cilindros", "valor": "2"}, {"dato": "Cilindrada", "valor": "333 cc (61 × 57 mm)"}, {"dato": "Alimentación", "valor": "Inyección electrónica"}, {"dato": "Nafta", "valor": "Sin plomo, 91 RON o más"}, {"dato": "Tanque", "valor": "Aparte, 12 litros"}, {"dato": "Aceite de motor", "valor": "SAE 10W-30 o 10W-40, API SH/SJ/SL · 1,0 L sin filtro · 1,2 L con filtro"}, {"dato": "Aceite de cola", "valor": "API GL-5, SAE 80 a 90 · 460 ml"}, {"dato": "Bujía NGK", "valor": "DCPR6E"}, {"dato": "Luz de bujía", "valor": "0,8 a 0,9 mm"}, {"dato": "Luz de válvulas", "valor": "Admisión 0,13 a 0,17 mm · escape 0,18 a 0,22 mm"}, {"dato": "Ralentí", "valor": "950 rpm"}, {"dato": "Rango a fondo", "valor": "5400 a 6100 rpm"}, {"dato": "Trim (si tiene)", "valor": "ATF Dexron III"}], "ajustes": {"aceite-motor": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Tohatsu: primer cambio a las 20 horas (o al mes) y después cada 100 horas o 6 meses. Aceite 4T SAE 10W-30 o 10W-40 API SH/SJ/SL, 1,0 L (1,2 L con filtro). Revisar el nivel antes de cada uso. El filtro de aceite se cambia a las 20 horas y después cada 200 horas o 1 año."}, "aceite-cola": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Tohatsu: primer cambio a las 20 horas (o al mes) y después cada 100 horas o 6 meses. Lleva 460 ml de aceite API GL-5 SAE 80-90."}, "filtro-combustible": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Tohatsu: revisar y limpiar o cambiar a las 20 horas y después cada 100 horas o 6 meses, junto con mangueras, tanque y tapa."}, "bujias": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Tohatsu: revisar, limpiar o cambiar cada 100 horas o 6 meses. Luz 0,8 a 0,9 mm."}, "helice": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Tohatsu: revisar hélice, chaveta y tuerca a las 20 horas y después cada 100 horas o 6 meses, y antes de cada uso."}, "engrase": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Tohatsu: lubricar piezas que giran y deslizan a las 20 horas y después cada 100 horas o 6 meses."}, "anodos": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Tohatsu: revisar el ánodo exterior cada 100 horas o 6 meses."}, "valvulas": {"segun": "Tohatsu", "cada": {"horas": 200, "meses": 12}, "notaMarca": "Tohatsu: control y ajuste de la luz de válvulas cada 200 horas o 1 año. Tarea de concesionario."}, "termostato": {"segun": "Tohatsu", "cada": {"horas": 200, "meses": 12}, "notaMarca": "Tohatsu: revisión de concesionario cada 200 horas o 1 año."}, "impulsor": {"segun": "Tohatsu", "cada": {"horas": 400, "meses": 24}, "notaMarca": "Tohatsu: el concesionario cambia el impulsor de la bomba de agua cada 400 horas o 2 años."}, "enjuague": {"segun": "Tohatsu", "notaMarca": "Tohatsu: después de usarlo en agua salada, turbia o con barro, lavar el motor y enjuagar el circuito de refrigeración con agua dulce."}}, "tareasExtra": [{"id": "filtro-aceite", "nombre": "Cambio de filtro de aceite", "tiempos": "4T", "cada": {"horas": 200, "meses": 12, "primeraHoras": 20}, "quien": "mecanico", "segun": "Tohatsu", "porque": "Retiene las partículas del aceite. Tohatsu indica cambiarlo a las 20 horas y después cada 200 horas o 1 año.", "pasos": ["Se cambia junto con el aceite de motor.", "Tarea de concesionario o taller."], "materiales": ["Filtro de aceite original"]}, {"id": "correa", "nombre": "Revisión de correa de distribución", "tiempos": "4T", "cada": {"horas": 200, "meses": 12}, "quien": "mecanico", "segun": "Tohatsu", "porque": "Si la correa se corta, el motor se detiene y puede dañarse.", "pasos": ["Tohatsu indica revisarla cada 200 horas o 1 año.", "Tarea de concesionario o taller."], "materiales": []}], "consejos": ["Revisar el nivel de aceite del motor antes de cada salida, con el motor vertical y frío.", "Rodaje: los primeros tiempos de uso a regímenes variados, sin ir a fondo de forma sostenida, como indica el manual."]},
    "tohatsu-mfs25-30": {"nombre": "Base Tohatsu MFS25 / MFS30 4T (serie D, 500 cc)", "estado": "completo", "fuente": "Manual del propietario oficial Tohatsu MFS25D / MFS30D (003-11171, en español, tohatsu.com)", "datosTecnicos": [{"dato": "Base", "valor": "Tohatsu MFS25D / MFS30D"}, {"dato": "Cilindros", "valor": "3"}, {"dato": "Cilindrada", "valor": "500 cc"}, {"dato": "Alimentación", "valor": "Inyección electrónica"}, {"dato": "Nafta", "valor": "Sin plomo, 91 RON o más"}, {"dato": "Tanque", "valor": "Aparte, 25 litros"}, {"dato": "Aceite de motor", "valor": "SAE 10W-30 o 10W-40, API SH/SJ/SL · 1,5 L sin filtro · 1,7 L con filtro"}, {"dato": "Aceite de cola", "valor": "API GL-5, SAE 80 a 90 · 460 ml"}, {"dato": "Bujía NGK", "valor": "DCPR6E o equivalente"}, {"dato": "Luz de bujía", "valor": "0,8 a 0,9 mm"}, {"dato": "Luz de válvulas", "valor": "Admisión 0,10 a 0,15 mm · escape 0,20 a 0,24 mm"}, {"dato": "Ralentí", "valor": "850 rpm"}, {"dato": "Trim (si tiene)", "valor": "ATF Dexron III"}], "ajustes": {"aceite-motor": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Tohatsu: primer cambio a las 20 horas (o al mes) y después cada 100 horas o 6 meses. Aceite 4T SAE 10W-30 o 10W-40 API SH/SJ/SL, 1,5 L (1,7 L con filtro). Revisar el nivel antes de cada uso. El filtro de aceite se cambia a las 20 horas y después cada 200 horas o 1 año."}, "aceite-cola": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Tohatsu: primer cambio a las 20 horas (o al mes) y después cada 100 horas o 6 meses. Lleva 460 ml de aceite API GL-5 SAE 80-90."}, "filtro-combustible": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Tohatsu: revisar y limpiar o cambiar a las 20 horas y después cada 100 horas o 6 meses, junto con mangueras, tanque y tapa."}, "bujias": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Tohatsu: revisar, limpiar o cambiar cada 100 horas o 6 meses. Luz 0,8 a 0,9 mm."}, "helice": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Tohatsu: revisar hélice, chaveta y tuerca a las 20 horas y después cada 100 horas o 6 meses, y antes de cada uso."}, "engrase": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Tohatsu: lubricar piezas que giran y deslizan a las 20 horas y después cada 100 horas o 6 meses."}, "anodos": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Tohatsu: revisar el ánodo exterior cada 100 horas o 6 meses."}, "valvulas": {"segun": "Tohatsu", "cada": {"horas": 200, "meses": 12}, "notaMarca": "Tohatsu: control y ajuste de la luz de válvulas cada 200 horas o 1 año. Tarea de concesionario."}, "termostato": {"segun": "Tohatsu", "cada": {"horas": 200, "meses": 12}, "notaMarca": "Tohatsu: revisión de concesionario cada 200 horas o 1 año."}, "impulsor": {"segun": "Tohatsu", "cada": {"horas": 400, "meses": 24}, "notaMarca": "Tohatsu: el concesionario cambia el impulsor de la bomba de agua cada 400 horas o 2 años."}, "enjuague": {"segun": "Tohatsu", "notaMarca": "Tohatsu: después de usarlo en agua salada, turbia o con barro, lavar el motor y enjuagar el circuito de refrigeración con agua dulce."}}, "tareasExtra": [{"id": "filtro-aceite", "nombre": "Cambio de filtro de aceite", "tiempos": "4T", "cada": {"horas": 200, "meses": 12, "primeraHoras": 20}, "quien": "mecanico", "segun": "Tohatsu", "porque": "Retiene las partículas del aceite. Tohatsu indica cambiarlo a las 20 horas y después cada 200 horas o 1 año.", "pasos": ["Se cambia junto con el aceite de motor.", "Tarea de concesionario o taller."], "materiales": ["Filtro de aceite original"]}, {"id": "correa", "nombre": "Revisión de correa de distribución", "tiempos": "4T", "cada": {"horas": 200, "meses": 12}, "quien": "mecanico", "segun": "Tohatsu", "porque": "Si la correa se corta, el motor se detiene y puede dañarse.", "pasos": ["Tohatsu indica revisarla cada 200 horas o 1 año.", "Tarea de concesionario o taller."], "materiales": []}], "consejos": ["Revisar el nivel de aceite del motor antes de cada salida, con el motor vertical y frío.", "Rodaje: los primeros tiempos de uso a regímenes variados, sin ir a fondo de forma sostenida, como indica el manual."]},
    "tohatsu-mfs40-60": {"nombre": "Base Tohatsu MFS40 / MFS50 / MFS60 4T (866 cc)", "estado": "completo", "fuente": "Manual del propietario oficial Tohatsu MFS40A / MFS50A / MFS60A (003-11106, en español, tohatsu.com)", "datosTecnicos": [{"dato": "Base", "valor": "Tohatsu MFS40A / 50A / 60A"}, {"dato": "Cilindros", "valor": "3"}, {"dato": "Cilindrada", "valor": "866 cc (70 × 75 mm)"}, {"dato": "Alimentación", "valor": "Inyección multipunto (MFI)"}, {"dato": "Nafta", "valor": "Sin plomo, 91 RON o más"}, {"dato": "Tanque", "valor": "Aparte, 25 litros"}, {"dato": "Aceite de motor", "valor": "SAE 10W-30 o 10W-40, API SH/SJ/SL · 2,2 L sin filtro · 2,4 L con filtro"}, {"dato": "Aceite de cola", "valor": "API GL-5, SAE 80 a 90 · 500 ml"}, {"dato": "Bujía NGK", "valor": "IKR6G8"}, {"dato": "Luz de bujía", "valor": "0,7 a 0,8 mm"}, {"dato": "Luz de válvulas", "valor": "40/50: admisión 0,15 a 0,25 mm, escape 0,25 a 0,35 mm · 60: admisión 0,20 a 0,25 mm, escape 0,30 a 0,35 mm"}, {"dato": "Ralentí", "valor": "850 rpm"}, {"dato": "Rango a fondo", "valor": "5000 a 6000 rpm"}, {"dato": "Trim", "valor": "ATF Dexron III"}, {"dato": "Batería mínima", "valor": "70 Ah / 512 CCA"}], "ajustes": {"aceite-motor": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Tohatsu: primer cambio a las 20 horas (o al mes) y después cada 100 horas o 6 meses. Aceite 4T SAE 10W-30 o 10W-40 API SH/SJ/SL, 2,2 L (2,4 L con filtro). Revisar el nivel antes de cada uso. El filtro de aceite se cambia a las 20 horas y después cada 200 horas o 1 año."}, "aceite-cola": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Tohatsu: primer cambio a las 20 horas (o al mes) y después cada 100 horas o 6 meses. Lleva 500 ml de aceite API GL-5 SAE 80-90."}, "filtro-combustible": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Tohatsu: revisar y limpiar o cambiar a las 20 horas y después cada 100 horas o 6 meses, junto con mangueras, tanque y tapa."}, "bujias": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Tohatsu: revisar, limpiar o cambiar cada 100 horas o 6 meses. Luz 0,7 a 0,8 mm."}, "helice": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Tohatsu: revisar hélice, chaveta y tuerca a las 20 horas y después cada 100 horas o 6 meses, y antes de cada uso."}, "engrase": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Tohatsu: lubricar piezas que giran y deslizan a las 20 horas y después cada 100 horas o 6 meses."}, "anodos": {"segun": "Tohatsu", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Tohatsu: revisar el ánodo exterior cada 100 horas o 6 meses."}, "valvulas": {"segun": "Tohatsu", "cada": {"horas": 200, "meses": 12}, "notaMarca": "Tohatsu: control y ajuste de la luz de válvulas cada 200 horas o 1 año. Tarea de concesionario."}, "termostato": {"segun": "Tohatsu", "cada": {"horas": 200, "meses": 12}, "notaMarca": "Tohatsu: revisión de concesionario cada 200 horas o 1 año."}, "impulsor": {"segun": "Tohatsu", "cada": {"horas": 400, "meses": 24}, "notaMarca": "Tohatsu: el concesionario cambia el impulsor de la bomba de agua cada 400 horas o 2 años."}, "enjuague": {"segun": "Tohatsu", "notaMarca": "Tohatsu: después de usarlo en agua salada, turbia o con barro, lavar el motor y enjuagar el circuito de refrigeración con agua dulce."}}, "tareasExtra": [{"id": "filtro-aceite", "nombre": "Cambio de filtro de aceite", "tiempos": "4T", "cada": {"horas": 200, "meses": 12, "primeraHoras": 20}, "quien": "mecanico", "segun": "Tohatsu", "porque": "Retiene las partículas del aceite. Tohatsu indica cambiarlo a las 20 horas y después cada 200 horas o 1 año.", "pasos": ["Se cambia junto con el aceite de motor.", "Tarea de concesionario o taller."], "materiales": ["Filtro de aceite original"]}, {"id": "correa", "nombre": "Revisión de correa de distribución", "tiempos": "4T", "cada": {"horas": 200, "meses": 12}, "quien": "mecanico", "segun": "Tohatsu", "porque": "Si la correa se corta, el motor se detiene y puede dañarse.", "pasos": ["Tohatsu indica revisarla cada 200 horas o 1 año.", "Tarea de concesionario o taller."], "materiales": []}], "consejos": ["Revisar el nivel de aceite del motor antes de cada salida, con el motor vertical y frío.", "Rodaje: los primeros tiempos de uso a regímenes variados, sin ir a fondo de forma sostenida, como indica el manual."]},
    "honda-8-10": {"nombre": "Base Honda BF8D / BF9.9D / BF10 (222 cc)", "estado": "completo", "fuente": "Manual del propietario oficial Honda BF8D / BF9.9D / BF15D / BF20D (00X31ZY06520, cdn.powerequipment.honda.com). El BF10 que se vende en la Argentina no figura en ese manual: comparte la base de 222 cc del BF8D / BF9.9D (a confirmar)", "datosTecnicos": [{"dato": "Motor", "valor": "4 tiempos, OHC, 2 cilindros en línea"}, {"dato": "Cilindrada", "valor": "222 cc"}, {"dato": "Alimentación", "valor": "Carburador"}, {"dato": "Encendido", "valor": "Digital (ICM)"}, {"dato": "Aceite de motor", "valor": "SAE 10W-30 API SG/SH/SJ (FC-W) · 1,0 L sin cambio de filtro · 1,1 L con filtro"}, {"dato": "Aceite de cola", "valor": "Hipoide SAE 90 API GL-4 · 0,29 L"}, {"dato": "Bujía", "valor": "NGK CR5EH-9 o Denso U16FER9"}, {"dato": "Luz de bujía", "valor": "0,8 a 0,9 mm"}, {"dato": "Rango a fondo", "valor": "5000 a 6000 rpm"}, {"dato": "Nafta", "valor": "Sin plomo, 86 octanos (R+M)/2 o más (equivale a unos 91 RON)"}, {"dato": "Tanque", "valor": "Aparte, 12 litros"}, {"dato": "Refrigeración", "valor": "Por agua, con termostato"}], "ajustes": {"aceite-motor": {"segun": "Honda", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Honda: primer cambio al mes o a las 20 horas y después cada 100 horas o 6 meses. Revisar el nivel antes de cada uso. El filtro de aceite se cambia cada 200 horas o una vez por año."}, "aceite-cola": {"segun": "Honda", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Honda: primer cambio al mes o a las 20 horas y después cada 100 horas o 6 meses. Tarea de concesionario si no tiene experiencia."}, "bujias": {"segun": "Honda", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Honda: revisar, calibrar o cambiar cada 100 horas o 6 meses."}, "engrase": {"segun": "Honda", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Honda: engrasar al mes o a las 20 horas y después cada 100 horas o 6 meses. Engrasar más seguido si navega en agua salada."}, "anodos": {"segun": "Honda", "cada": {"usos": true}, "notaMarca": "Honda: revisar el ánodo exterior en cada uso y cambiarlo cuando se redujo a un tercio de su tamaño o se desarma. Los ánodos internos los revisa el concesionario cada 2 años o 400 horas."}, "helice": {"segun": "Honda", "cada": {"usos": true}, "notaMarca": "Honda: revisar hélice y pasador antes de cada uso."}, "filtro-combustible": {"segun": "Honda", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Honda: revisar el filtro de baja presión (agua y suciedad) cada 100 horas o 6 meses y cambiarlo una vez por año o cada 200 horas. Limpiar el tanque y su filtro una vez por año o cada 200 horas."}, "impulsor": {"segun": "Honda", "cada": {"horas": 200, "meses": 12}, "notaMarca": "Honda: revisar la bomba de agua una vez por año o cada 200 horas. Tarea de concesionario."}, "termostato": {"segun": "Honda", "cada": {"horas": 200, "meses": 12}, "notaMarca": "Honda: revisar una vez por año o cada 200 horas. Tarea de concesionario."}, "valvulas": {"segun": "Honda", "cada": {"horas": 200, "meses": 12}, "notaMarca": "Honda: controlar y ajustar la luz de válvulas una vez por año o cada 200 horas. Tarea de concesionario."}, "enjuague": {"segun": "Honda", "notaMarca": "Honda: después de cada uso en agua salada, turbia o con barro, enjuagar el sistema de refrigeración con agua dulce."}}, "tareasExtra": [{"id": "filtro-aceite", "nombre": "Cambio de filtro de aceite", "tiempos": "4T", "cada": {"horas": 200, "meses": 12}, "quien": "mecanico", "segun": "Honda", "porque": "Retiene las partículas del aceite. Honda indica cambiarlo una vez por año o cada 200 horas.", "pasos": ["Se cambia junto con el aceite de motor.", "Honda recomienda que lo haga el concesionario si no tiene herramientas y experiencia."], "materiales": ["Filtro de aceite original Honda"]}, {"id": "correa", "nombre": "Revisión de correa de distribución", "tiempos": "4T", "cada": {"horas": 200, "meses": 12}, "quien": "mecanico", "segun": "Honda", "porque": "Si la correa se corta, el motor se detiene y puede dañarse.", "pasos": ["Honda indica revisarla y ajustarla una vez por año o cada 200 horas.", "Tarea de concesionario o taller."], "materiales": []}], "consejos": ["Al arrancar, verificar que no haya ruidos raros y que el testigo tire agua con fuerza.", "Revisar el nivel de aceite del motor antes de cada uso, con el motor vertical.", "Uso profesional o comercial: llevar registro de horas para acortar los intervalos."]},
    "honda-2.3": {"nombre": "Base Honda BF2.3 (refrigerado por aire)", "estado": "completo", "fuente": "Manual del propietario oficial Honda BF2.3DH (00X31ZVA6120, 2023, cdn.powerequipment.honda.com)", "datosTecnicos": [{"dato": "Motor", "valor": "4 tiempos, OHV, 1 cilindro"}, {"dato": "Cilindrada", "valor": "57,2 cc"}, {"dato": "Refrigeración", "valor": "POR AIRE (no tiene bomba de agua ni testigo de agua)"}, {"dato": "Embrague", "valor": "Centrífugo: no tiene marcha atrás ni neutro; gire el motor 360° para ir hacia atrás"}, {"dato": "Alimentación", "valor": "Carburador"}, {"dato": "Aceite de motor", "valor": "SAE 10W-30 API SG/SH/SJ · 0,25 L"}, {"dato": "Aceite de cola", "valor": "Hipoide SAE 90 API GL-4 · 0,05 L"}, {"dato": "Bujía", "valor": "NGK LR4C-E"}, {"dato": "Luz de bujía", "valor": "0,6 a 0,7 mm"}, {"dato": "Ralentí", "valor": "2000 ± 100 rpm"}, {"dato": "Luz de válvulas en frío", "valor": "Admisión 0,08 ± 0,02 mm · escape 0,11 ± 0,02 mm"}, {"dato": "Rango a fondo", "valor": "5000 a 6000 rpm"}, {"dato": "Tanque", "valor": "Integral de 1,1 litros"}, {"dato": "Nafta", "valor": "Sin plomo, 86 octanos (R+M)/2 o más"}], "ajustes": {"aceite-motor": {"segun": "Honda", "cada": {"horas": 50, "meses": 6, "primeraHoras": 10}, "notaMarca": "Honda: primer cambio al mes o a las 10 horas y después cada 50 horas o 6 meses. Lleva solo 0,25 L. Revisar el nivel antes de cada uso. No tiene filtro de aceite."}, "aceite-cola": {"segun": "Honda", "cada": {"horas": 50, "meses": 6, "primeraHoras": 10}, "notaMarca": "Honda: primer cambio al mes o a las 10 horas y después cada 50 horas o 6 meses. Lleva 50 ml."}, "bujias": {"segun": "Honda", "cada": {"horas": 50, "meses": 6}, "notaMarca": "Honda: revisar y calibrar (0,6 a 0,7 mm) cada 50 horas o 6 meses."}, "valvulas": {"segun": "Honda", "cada": {"horas": 150, "meses": 12}, "notaMarca": "Honda: control de luz de válvulas una vez por año o cada 150 horas. Tarea de concesionario."}, "carburador": {"segun": "Honda", "cada": {"horas": 50, "meses": 6, "primeraHoras": 10}, "notaMarca": "Honda: el concesionario revisa articulaciones del carburador y ralentí al mes (10 h) y cada 50 horas o 6 meses."}, "engrase": {"segun": "Honda", "cada": {"horas": 50, "meses": 6, "primeraHoras": 10}, "notaMarca": "Honda: engrasar al mes (10 h) y después cada 50 horas o 6 meses. Más seguido en agua salada."}, "filtro-combustible": {"segun": "Honda", "cada": {"horas": 50, "meses": 6}, "notaMarca": "Honda: el concesionario limpia el tanque y su filtro cada 50 horas o 6 meses. Revisar la manguera de nafta antes de cada uso."}, "helice": {"segun": "Honda", "cada": {"usos": true}, "notaMarca": "Honda: revisar hélice y pasador antes de cada uso."}, "anodos": {"segun": "Honda", "cada": {"usos": true}, "notaMarca": "Honda: revisar el ánodo antes de cada uso."}, "impulsor": {"noAplica": true}, "termostato": {"noAplica": true}, "enjuague": {"segun": "Honda", "notaMarca": "Honda: este motor se refrigera por aire. Después de usarlo en agua salada, lave el exterior y la cola con agua dulce."}}, "consejos": ["Es refrigerado por aire: no busque el testigo de agua. Si recalienta, revise que las tomas de aire de la tapa no estén tapadas.", "Tiene embrague centrífugo: la hélice empieza a girar al acelerar. Para ir hacia atrás, gire el motor 180°.", "Revisar el nivel de aceite antes de cada uso, con el motor vertical."]},
    "honda-5": {"nombre": "Base Honda BF5 (127 cc)", "estado": "completo", "fuente": "Manual del propietario oficial Honda BF4A / BF5D / BF6A (00X31ZVC6150, 2023, cdn.powerequipment.honda.com)", "datosTecnicos": [{"dato": "Motor", "valor": "4 tiempos, OHV, 1 cilindro, refrigerado por agua"}, {"dato": "Cilindrada", "valor": "127 cc"}, {"dato": "Alimentación", "valor": "Carburador"}, {"dato": "Encendido", "valor": "CDI"}, {"dato": "Aceite de motor", "valor": "SAE 10W-30 API SG/SH/SJ · 0,55 L"}, {"dato": "Aceite de cola", "valor": "Hipoide SAE 75W-90 o 90 API GL-4 · 0,10 L"}, {"dato": "Bujía", "valor": "NGK BKR6E-E"}, {"dato": "Luz de bujía", "valor": "0,6 a 0,7 mm"}, {"dato": "Ralentí", "valor": "1550 + 100 rpm"}, {"dato": "Luz de válvulas en frío", "valor": "Admisión 0,10 + 0,04 mm · escape 0,15 + 0,04 mm"}, {"dato": "Rango a fondo", "valor": "5000 a 6000 rpm"}, {"dato": "Tanque", "valor": "Integral de 1,5 litros o aparte de 12 litros"}, {"dato": "Cambios", "valor": "Avance, neutro y marcha atrás"}, {"dato": "Nafta", "valor": "Sin plomo, 86 octanos (R+M)/2 o más"}], "ajustes": {"aceite-motor": {"segun": "Honda", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Honda: primer cambio al mes o a las 20 horas y después cada 100 horas o 6 meses. Lleva 0,55 L. No tiene filtro de aceite."}, "aceite-cola": {"segun": "Honda", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Honda: primer cambio al mes o a las 20 horas y después cada 100 horas o 6 meses. Lleva 100 ml."}, "bujias": {"segun": "Honda", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Honda: revisar y calibrar cada 100 horas o 6 meses; cambiarla una vez por año o cada 200 horas."}, "valvulas": {"segun": "Honda", "cada": {"horas": 200, "meses": 12, "primeraHoras": 20}, "notaMarca": "Honda: control de luz de válvulas al mes (20 h) y después una vez por año o cada 200 horas. Tarea de concesionario."}, "termostato": {"segun": "Honda", "cada": {"horas": 200, "meses": 12}, "notaMarca": "Honda: revisión de concesionario una vez por año o cada 200 horas."}, "impulsor": {"segun": "Honda", "cada": {"horas": 200, "meses": 12}, "notaMarca": "Honda: el concesionario revisa la bomba de agua una vez por año o cada 200 horas."}, "carburador": {"segun": "Honda", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Honda: el concesionario revisa articulaciones del carburador y ralentí al mes (20 h) y cada 100 horas o 6 meses."}, "filtro-combustible": {"segun": "Honda", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Honda: revisar el filtro de nafta cada 100 horas o 6 meses y cambiarlo una vez por año o cada 200 horas."}, "engrase": {"segun": "Honda", "cada": {"horas": 100, "meses": 6, "primeraHoras": 20}, "notaMarca": "Honda: engrasar al mes (20 h) y después cada 100 horas o 6 meses. Más seguido en agua salada."}, "helice": {"segun": "Honda", "cada": {"usos": true}, "notaMarca": "Honda: revisar hélice y pasador antes de cada uso."}, "anodos": {"segun": "Honda", "cada": {"usos": true}, "notaMarca": "Honda: revisar el ánodo antes de cada uso."}, "enjuague": {"segun": "Honda", "notaMarca": "Honda: después de cada uso en agua salada, turbia o con barro, limpiar los conductos de refrigeración con agua dulce."}}, "consejos": ["Revisar el nivel de aceite antes de cada uso, con el motor vertical.", "Al arrancar, verificar que el testigo tire agua."]},
    "honda-9.9a-15a": {
      nombre: "Base Honda BF9.9A / BF15A",
      estado: "completo",
      fuente: "Manual del propietario oficial Honda BF9.9A / BF15A (1999), de la carpeta de Juan",
      datosTecnicos: [
        { dato: "Motor", valor: "4 tiempos, OHC, 2 cilindros en línea" },
        { dato: "Cilindrada", valor: "280 cc" },
        { dato: "Alimentación", valor: "Carburador" },
        { dato: "Encendido", valor: "CDI" },
        { dato: "Aceite de motor", valor: "SAE 10W-30 API SF o SG · 1,1 L" },
        { dato: "Aceite de cola", valor: "Hipoide SAE 90 API GL-4 o GL-5 · 0,24 L" },
        { dato: "Bujía", valor: "BF9.9A: NGK DR-5HS · BF15A: NGK DR-6HS" },
        { dato: "Luz de bujía", valor: "0,6 a 0,7 mm" },
        { dato: "Ralentí", valor: "1100 ± 50 rpm" },
        { dato: "Luz de válvulas en frío", valor: "Admisión 0,12 ± 0,02 mm · escape 0,15 ± 0,02 mm" },
        { dato: "Rango a fondo", valor: "4500 a 5500 rpm" },
        { dato: "Nafta", valor: "Común sin plomo, 86 octanos (índice americano)" },
        { dato: "Tanque", valor: "12 L" }
      ],
      ajustes: {
        "impulsor": { segun: "el taller", cada: { horas: 300, meses: 36 }, cadaTrabajo: { meses: 12 }, notaMarca: "Criterio del taller (el manual Honda de este modelo no da plazo): controlar la bomba de agua cada 100 horas y cambiar el impulsor de forma preventiva a las 300 horas o a los 3 años. En uso de trabajo (alquiler, pesca, transporte), cada 12 meses." },
        "aceite-motor": { segun: "Honda", cada: { horas: 100, meses: 6, primeraHoras: 20 }, notaMarca: "Honda: revisar el nivel en cada uso. Cambiar al mes o a las 20 horas y después cada 100 horas o 6 meses." },
        "aceite-cola": { segun: "Honda", cada: { horas: 200, meses: 12, primeraHoras: 20 }, notaMarca: "Honda: cambiar al mes o a las 20 horas y después una vez por año o cada 200 horas. Revisar el nivel y si tiene agua cada 6 meses o 100 horas." },
        "bujias": { segun: "Honda", cada: { horas: 100, meses: 6 }, notaMarca: "Honda: revisar y limpiar cada 100 horas o 6 meses." },
        "engrase": { segun: "Honda", cada: { horas: 100, meses: 6, primeraHoras: 20 }, notaMarca: "Honda: engrasar al mes o a las 20 horas y después cada 100 horas o 6 meses. Más seguido en agua salada." },
        "anodos": { segun: "Honda", cada: { usos: true }, notaMarca: "Honda: revisar el ánodo en cada uso." },
        "helice": { segun: "Honda", cada: { horas: 100, meses: 6 }, notaMarca: "Honda: revisar hélice y pasador en cada uso y cada 6 meses o 100 horas." },
        "filtro-combustible": { segun: "Honda", cada: { horas: 200, meses: 12 }, notaMarca: "Honda: cambiar el filtro de nafta y limpiar el tanque una vez por año o cada 200 horas. Revisar la manguera en cada uso y cambiarla cada 2 años si hace falta." },
        "termostato": { segun: "Honda", cada: { horas: 200, meses: 12 }, notaMarca: "Honda: revisar una vez por año o cada 200 horas. Tarea de concesionario." },
        "valvulas": { segun: "Honda", cada: { horas: 200, meses: 12, primeraHoras: 20 }, notaMarca: "Honda: controlar y ajustar al mes o a las 20 horas y después una vez por año o cada 200 horas. Tarea de concesionario." },
        "carburador": { segun: "Honda", cada: { horas: 100, meses: 6, primeraHoras: 20 }, notaMarca: "Honda: revisar el varillaje del carburador al mes o a las 20 horas y después cada 6 meses o 100 horas. Tarea de concesionario." },
        "enjuague": { segun: "Honda", notaMarca: "Honda: después de cada uso en agua salada, turbia o con barro, enjuagar con agua dulce." }
      },
      tareasExtra: [
        { id: "cuerda-arranque", nombre: "Revisión de la cuerda de arranque", cada: { horas: 100, meses: 6 }, quien: "usuario", segun: "Honda", porque: "Una cuerda gastada se corta al arrancar.", pasos: ["Honda indica revisarla cada 6 meses o 100 horas.", "Cambiarla si está deshilachada."], materiales: [] }
      ],
      consejos: ["Revisar el nivel de aceite del motor antes de cada uso, con el motor vertical.", "Uso profesional o comercial: llevar registro de horas para acortar los intervalos."]
    },
    "honda-40a-50a": {
      nombre: "Base Honda BF40A / BF50A",
      estado: "completo",
      fuente: "Manual del propietario oficial Honda BF40A / BF50A (2002), de la carpeta de Juan",
      datosTecnicos: [
        { dato: "Motor", valor: "4 tiempos, OHC, 3 cilindros en línea" },
        { dato: "Cilindrada", valor: "808 cc" },
        { dato: "Alimentación", valor: "Carburador" },
        { dato: "Encendido", valor: "CDI" },
        { dato: "Aceite de motor", valor: "SAE 5W-30 API SG o SH · 2,4 L" },
        { dato: "Aceite de cola", valor: "SAE 90 API GL-4 o GL-5 · 0,41 L" },
        { dato: "Bujía", valor: "NGK DR7EA o Denso X22ESR-U" },
        { dato: "Luz de bujía", valor: "0,6 a 0,7 mm" },
        { dato: "Ralentí", valor: "950 ± 50 rpm" },
        { dato: "Luz de válvulas en frío", valor: "Admisión 0,15 ± 0,02 mm · escape 0,23 ± 0,02 mm" },
        { dato: "Rango a fondo", valor: "BF40A: 5000 a 6000 rpm · BF50A: 5500 a 6000 rpm" },
        { dato: "Nafta", valor: "Sin plomo, 86 octanos (índice americano) o más" }
      ],
      ajustes: {
        "impulsor": { segun: "el taller", cada: { horas: 300, meses: 36 }, cadaTrabajo: { meses: 12 }, notaMarca: "Criterio del taller (el manual Honda de este modelo no da plazo): controlar la bomba de agua cada 100 horas y cambiar el impulsor de forma preventiva a las 300 horas o a los 3 años. En uso de trabajo (alquiler, pesca, transporte), cada 12 meses." },
        "aceite-motor": { segun: "Honda", cada: { horas: 100, meses: 6, primeraHoras: 20 }, notaMarca: "Honda: revisar el nivel en cada uso. Cambiar al mes o a las 20 horas y después cada 100 horas o 6 meses. El filtro se cambia una vez por año o cada 200 horas." },
        "aceite-cola": { segun: "Honda", cada: { horas: 100, meses: 6, primeraHoras: 20 }, notaMarca: "Honda: cambiar al mes o a las 20 horas y después cada 100 horas o 6 meses." },
        "bujias": { segun: "Honda", cada: { horas: 100, meses: 6 }, notaMarca: "Honda: revisar y calibrar cada 100 horas o 6 meses, y cambiar una vez por año o cada 200 horas." },
        "engrase": { segun: "Honda", cada: { horas: 100, meses: 6, primeraHoras: 20 }, notaMarca: "Honda: engrasar al mes o a las 20 horas y después cada 100 horas o 6 meses. Más seguido en agua salada." },
        "anodos": { segun: "Honda", cada: { usos: true }, notaMarca: "Honda: revisar el ánodo en cada uso." },
        "helice": { segun: "Honda", cada: { usos: true }, notaMarca: "Honda: revisar hélice y pasador en cada uso." },
        "filtro-combustible": { segun: "Honda", cada: { horas: 100, meses: 6 }, notaMarca: "Honda: revisar el filtro cada 6 meses o 100 horas y cambiarlo cada 2 años o 400 horas. Limpiar el tanque y su filtro una vez por año o cada 200 horas." },
        "termostato": { segun: "Honda", cada: { horas: 200, meses: 12 }, notaMarca: "Honda: revisar una vez por año o cada 200 horas. Tarea de concesionario." },
        "valvulas": { segun: "Honda", cada: { horas: 200, meses: 12, primeraHoras: 20 }, notaMarca: "Honda: controlar y ajustar al mes o a las 20 horas y después una vez por año o cada 200 horas. Tarea de concesionario." },
        "carburador": { segun: "Honda", cada: { horas: 100, meses: 6, primeraHoras: 20 }, notaMarca: "Honda: revisar el varillaje del carburador y el ralentí al mes o a las 20 horas y después cada 6 meses o 100 horas. Tarea de concesionario." },
        "enjuague": { segun: "Honda", notaMarca: "Honda: después de cada uso en agua salada, turbia o con barro, limpiar los conductos de refrigeración con agua dulce." }
      },
      tareasExtra: [
        { id: "filtro-aceite", nombre: "Cambio de filtro de aceite", tiempos: "4T", cada: { horas: 200, meses: 12 }, quien: "mecanico", segun: "Honda", porque: "Retiene las partículas del aceite.", pasos: ["Honda indica cambiarlo una vez por año o cada 200 horas, junto con el aceite."], materiales: ["Filtro de aceite original Honda"] },
        { id: "correa", nombre: "Revisión de correa de distribución", tiempos: "4T", cada: { horas: 200, meses: 12 }, quien: "mecanico", segun: "Honda", porque: "Si la correa se corta, el motor se detiene y puede dañarse.", pasos: ["Honda indica revisarla y ajustarla una vez por año o cada 200 horas.", "Tarea de concesionario."], materiales: [] }
      ],
      consejos: ["Revisar el nivel de aceite y la batería antes de cada uso.", "Uso profesional o comercial: llevar registro de horas para acortar los intervalos."]
    },
    "honda-25a-30a": {
      nombre: "Base Honda BF25A / BF30A",
      estado: "completo",
      fuente: "Manual del propietario oficial Honda BF25A / BF30A (31ZV7612, cdn.powerequipment.honda.com)",
      datosTecnicos: [
        { dato: "Motor", valor: "4 tiempos, OHC, 3 cilindros en línea" },
        { dato: "Cilindrada", valor: "499 cc" },
        { dato: "Alimentación", valor: "Carburador" },
        { dato: "Encendido", valor: "CDI" },
        { dato: "Aceite de motor", valor: "BF25A: SAE 10W-30 · BF30A: SAE 5W-30 · API SG/SH · 1,6 L (1,9 L con filtro)" },
        { dato: "Aceite de cola", valor: "SAE 90 API GL-4 o GL-5 · 0,29 L" },
        { dato: "Bujía", valor: "NGK DR7EA o Denso X22ESR-U" },
        { dato: "Luz de bujía", valor: "0,6 a 0,7 mm" },
        { dato: "Rango a fondo", valor: "BF25A: 5000 a 6000 rpm · BF30A: 5700 a 6200 rpm" },
        { dato: "Nafta", valor: "Común, 86 octanos (índice americano)" },
        { dato: "Tanque", valor: "25 L" }
      ],
      ajustes: {
        "impulsor": { segun: "el taller", cada: { horas: 300, meses: 36 }, cadaTrabajo: { meses: 12 }, notaMarca: "Criterio del taller (el manual Honda de este modelo no da plazo): controlar la bomba de agua cada 100 horas y cambiar el impulsor de forma preventiva a las 300 horas o a los 3 años. En uso de trabajo (alquiler, pesca, transporte), cada 12 meses." },
        "aceite-motor": { segun: "Honda", cada: { horas: 100, meses: 6, primeraHoras: 20 }, notaMarca: "Honda: revisar el nivel en cada uso. Cambiar al mes o a las 20 horas y después cada 100 horas o 6 meses." },
        "aceite-cola": { segun: "Honda", cada: { horas: 200, meses: 12, primeraHoras: 20 }, notaMarca: "Honda: cambiar al mes o a las 20 horas y después una vez por año o cada 200 horas. Revisar nivel y si tiene agua cada 6 meses o 100 horas." },
        "bujias": { segun: "Honda", cada: { horas: 200, meses: 12, primeraHoras: 20 }, notaMarca: "Honda: revisar y limpiar al mes o a las 20 horas y después una vez por año o cada 200 horas; cambiar si hace falta." },
        "engrase": { segun: "Honda", cada: { horas: 100, meses: 6, primeraHoras: 20 }, notaMarca: "Honda: engrasar al mes o a las 20 horas y después cada 100 horas o 6 meses. Más seguido en agua salada." },
        "helice": { segun: "Honda", cada: { horas: 100, meses: 6 }, notaMarca: "Honda: revisar hélice y pasador en cada uso; cambiarlos si hace falta cada 6 meses o 100 horas." },
        "filtro-combustible": { segun: "Honda", cada: { horas: 100, meses: 6 }, notaMarca: "Honda: revisar el filtro cada 6 meses o 100 horas y cambiarlo cada 2 años o 400 horas. Limpiar el tanque y su filtro una vez por año o cada 200 horas." },
        "termostato": { segun: "Honda", cada: { horas: 200, meses: 12 }, notaMarca: "Honda: revisar una vez por año o cada 200 horas. Tarea de concesionario." },
        "valvulas": { segun: "Honda", cada: { horas: 200, meses: 12, primeraHoras: 20 }, notaMarca: "Honda: controlar y ajustar al mes o a las 20 horas y después una vez por año o cada 200 horas. Tarea de concesionario." },
        "carburador": { segun: "Honda", cada: { horas: 100, meses: 6, primeraHoras: 20 }, notaMarca: "Honda: revisar el varillaje y ajustar el ralentí al mes o a las 20 horas y después cada 6 meses o 100 horas. Tarea de concesionario." }
      },
      tareasExtra: [
        { id: "filtro-aceite", nombre: "Cambio de filtro de aceite", tiempos: "4T", cada: { horas: 400, meses: 24 }, quien: "mecanico", segun: "Honda", porque: "Retiene las partículas del aceite.", pasos: ["Honda indica cambiarlo cada 2 años o 400 horas; con uso comercial, una vez por año o cada 200 horas."], materiales: ["Filtro de aceite original Honda"] },
        { id: "correa", nombre: "Revisión de correa de distribución", tiempos: "4T", cada: { horas: 200, meses: 12 }, quien: "mecanico", segun: "Honda", porque: "Si la correa se corta, el motor se detiene y puede dañarse.", pasos: ["Honda indica revisarla y ajustarla una vez por año o cada 200 horas."], materiales: [] }
      ],
      consejos: ["Rodaje de 10 horas, según el manual de Honda.", "Revisar nivel de aceite antes de cada uso, con el motor vertical."]
    },
    "evinrude-etec-25-30": {
      estado: "completo",
      fuente: "Guía del operador oficial Evinrude E-TEC 15 H.O. / 25 / 30 (2012) (BRP, 216067, operatorsguides.brp.com)",
      datosTecnicos: [
        { dato: "Motor", valor: "2 tiempos, 2 cilindros en línea, 576 cc" },
        { dato: "Inyección", valor: "Inyección directa E-TEC con inyección de aceite" },
        { dato: "Aceite 2T", valor: "Evinrude XD100 o TC-W3 certificado NMMA" },
        { dato: "Nafta", valor: "87 AKI (90 RON) o más" },
        { dato: "Bujía", valor: "Ver etiqueta de emisiones (ECI) del motor" },
        { dato: "Tanque de aceite del motor", valor: "1,4 L" },
        { dato: "Aceite de cola", valor: "Evinrude HPF XR · 325 ml" },
        { dato: "Ralentí en neutro", valor: "750 ± 50 rpm" },
        { dato: "Rango a fondo", valor: "5500 a 6000 rpm" }
      ],
      ajustes: {
        "enjuague": { segun: "Evinrude", cada: { usos: 1 }, notaMarca: "Evinrude: enjuagar con agua dulce después de cada uso en agua salada, salobre o contaminada. Se puede hacer por el puerto de la tapa sin arrancar el motor." },
        "aceite-cola": { segun: "Evinrude", cada: { horas: 300, meses: 36 }, cadaTrabajo: { meses: 12 }, notaMarca: "Evinrude: cambiar cada 300 horas o 3 años (uso recreativo promedio). Una vez por año si navega en agua salada o contaminada, o en uso de trabajo. Lubricante Evinrude HPF XR." },
        "engrase": { segun: "Evinrude", cada: { horas: 300, meses: 36 }, cadaTrabajo: { meses: 12 }, notaMarca: "Evinrude: engrasar dirección, estrías del eje de hélice y graseras cada 300 horas o 3 años. Una vez por año si navega en agua salada o contaminada, o en uso de trabajo. Grasa Triple-Guard." },
        "anodos": { segun: "Evinrude", cada: { horas: 300, meses: 36 }, cadaTrabajo: { meses: 12 }, notaMarca: "Evinrude: revisar cada 300 horas o 3 años. Una vez por año si navega en agua salada o contaminada, o en uso de trabajo. Cambiar los ánodos que quedaron en menos de 2/3 de su tamaño original. No pintarlos." },
        "bujias": { segun: "Evinrude", cada: { horas: 300, meses: 36 }, notaMarca: "Evinrude: revisar y cambiar si hace falta cada 300 horas o 3 años. El tipo de bujía figura en la etiqueta de emisiones (ECI) del motor." },
        "impulsor": { segun: "Evinrude", cada: { horas: 300, meses: 36 }, cadaTrabajo: { meses: 12 }, notaMarca: "Evinrude: revisar la bomba de agua y cambiarla si hace falta cada 300 horas o 3 años. Una vez por año si navega en agua salada o contaminada, o en uso de trabajo." },
        "termostato": { segun: "Evinrude", cada: { horas: 300, meses: 36 }, notaMarca: "Evinrude: revisar termostato y válvula de presión cada 300 horas o 3 años." },
        "filtro-combustible": { segun: "Evinrude", cada: { horas: 300, meses: 12 }, notaMarca: "Evinrude: cambiar el filtro de nafta del motor cada 300 horas o 3 años. El filtro separador montado en el casco se cambia una vez por año." }
      },
      tareasExtra: [],
      consejos: ["Motor E-TEC de inyección directa con inyección de aceite: no se mezcla aceite en la nafta. Use aceite Evinrude XD100 o TC-W3 certificado NMMA.", "Evinrude indica que no hace falta rodaje y que el mantenimiento de concesionario es cada 300 horas o 3 años en uso recreativo; en uso intenso, comercial o en agua salada, se recomiendan controles anuales."]
    },
    "evinrude-etec-40-60": {
      estado: "completo",
      fuente: "Guía del operador oficial Evinrude E-TEC 40 / 50 / 60 (E40D, E50D, E60D, 2012) (BRP, 216069, operatorsguides.brp.com)",
      datosTecnicos: [
        { dato: "Motor", valor: "2 tiempos, 2 cilindros en línea, 864 cc" },
        { dato: "Inyección", valor: "Inyección directa E-TEC con inyección de aceite" },
        { dato: "Aceite 2T", valor: "Evinrude XD100 o TC-W3 certificado NMMA" },
        { dato: "Nafta", valor: "87 AKI (90 RON) o más" },
        { dato: "Bujía", valor: "Ver etiqueta de emisiones (ECI) del motor" },
        { dato: "Tanque de aceite del motor", valor: "1,9 L" },
        { dato: "Aceite de cola", valor: "Evinrude Ultra-HPF · 650 ml (pata L)" },
        { dato: "Ralentí en neutro", valor: "750 ± 50 rpm" },
        { dato: "Rango a fondo", valor: "40 HP: 5000 a 6000 rpm · 50 y 60 HP: 5500 a 6000 rpm" }
      ],
      ajustes: {
        "enjuague": { segun: "Evinrude", cada: { usos: 1 }, notaMarca: "Evinrude: enjuagar con agua dulce después de cada uso en agua salada, salobre o contaminada. Se puede hacer por el puerto de la tapa sin arrancar el motor." },
        "aceite-cola": { segun: "Evinrude", cada: { horas: 300, meses: 36 }, cadaTrabajo: { meses: 12 }, notaMarca: "Evinrude: cambiar cada 300 horas o 3 años (uso recreativo promedio). Una vez por año si navega en agua salada o contaminada, o en uso de trabajo. Lubricante Evinrude HPF XR." },
        "engrase": { segun: "Evinrude", cada: { horas: 300, meses: 36 }, cadaTrabajo: { meses: 12 }, notaMarca: "Evinrude: engrasar dirección, estrías del eje de hélice y graseras cada 300 horas o 3 años. Una vez por año si navega en agua salada o contaminada, o en uso de trabajo. Grasa Triple-Guard." },
        "anodos": { segun: "Evinrude", cada: { horas: 300, meses: 36 }, cadaTrabajo: { meses: 12 }, notaMarca: "Evinrude: revisar cada 300 horas o 3 años. Una vez por año si navega en agua salada o contaminada, o en uso de trabajo. Cambiar los ánodos que quedaron en menos de 2/3 de su tamaño original. No pintarlos." },
        "bujias": { segun: "Evinrude", cada: { horas: 300, meses: 36 }, notaMarca: "Evinrude: revisar y cambiar si hace falta cada 300 horas o 3 años. El tipo de bujía figura en la etiqueta de emisiones (ECI) del motor." },
        "impulsor": { segun: "Evinrude", cada: { horas: 300, meses: 36 }, cadaTrabajo: { meses: 12 }, notaMarca: "Evinrude: revisar la bomba de agua y cambiarla si hace falta cada 300 horas o 3 años. Una vez por año si navega en agua salada o contaminada, o en uso de trabajo." },
        "termostato": { segun: "Evinrude", cada: { horas: 300, meses: 36 }, notaMarca: "Evinrude: revisar termostato y válvula de presión cada 300 horas o 3 años." },
        "filtro-combustible": { segun: "Evinrude", cada: { horas: 300, meses: 12 }, notaMarca: "Evinrude: cambiar el filtro de nafta del motor cada 300 horas o 3 años. El filtro separador montado en el casco se cambia una vez por año." }
      },
      tareasExtra: [],
      consejos: ["Motor E-TEC de inyección directa con inyección de aceite: no se mezcla aceite en la nafta. Use aceite Evinrude XD100 o TC-W3 certificado NMMA.", "Evinrude indica que no hace falta rodaje y que el mantenimiento de concesionario es cada 300 horas o 3 años en uso recreativo; en uso intenso, comercial o en agua salada, se recomiendan controles anuales."]
    },
    "evinrude-etec-75-90": {
      estado: "completo",
      fuente: "Guía del operador oficial Evinrude E-TEC 75 / 90 (E75D, E90D) (BRP, 216156, 2012, operatorsguides.brp.com)",
      datosTecnicos: [
        { dato: "Motor", valor: "2 tiempos, 3 cilindros en línea, 1296 cc" },
        { dato: "Inyección", valor: "Inyección directa E-TEC con inyección de aceite" },
        { dato: "Aceite 2T", valor: "Evinrude XD100 o TC-W3 certificado NMMA" },
        { dato: "Nafta", valor: "87 AKI (90 RON) o más" },
        { dato: "Bujía", valor: "Ver etiqueta de emisiones (ECI) del motor" },
        { dato: "Tanque de aceite del motor", valor: "2,3 L" },
        { dato: "Aceite de cola", valor: "Evinrude Ultra-HPF · 935 ml (pata L) · 970 ml (pata X)" },
        { dato: "Ralentí", valor: "600 ± 50 rpm en neutro · 700 ± 50 en marcha" },
        { dato: "Rango a fondo", valor: "5000 a 5500 rpm" }
      ],
      ajustes: {
        "enjuague": { segun: "Evinrude", cada: { usos: 1 }, notaMarca: "Evinrude: enjuagar con agua dulce después de cada uso en agua salada, salobre o contaminada. Se puede hacer por el puerto de la tapa sin arrancar el motor." },
        "aceite-cola": { segun: "Evinrude", cada: { horas: 300, meses: 36 }, cadaTrabajo: { meses: 12 }, notaMarca: "Evinrude: cambiar cada 300 horas o 3 años (uso recreativo promedio). Una vez por año si navega en agua salada o contaminada, o en uso de trabajo. Lubricante Evinrude HPF XR." },
        "engrase": { segun: "Evinrude", cada: { horas: 300, meses: 36 }, cadaTrabajo: { meses: 12 }, notaMarca: "Evinrude: engrasar dirección, estrías del eje de hélice y graseras cada 300 horas o 3 años. Una vez por año si navega en agua salada o contaminada, o en uso de trabajo. Grasa Triple-Guard." },
        "anodos": { segun: "Evinrude", cada: { horas: 300, meses: 36 }, cadaTrabajo: { meses: 12 }, notaMarca: "Evinrude: revisar cada 300 horas o 3 años. Una vez por año si navega en agua salada o contaminada, o en uso de trabajo. Cambiar los ánodos que quedaron en menos de 2/3 de su tamaño original. No pintarlos." },
        "bujias": { segun: "Evinrude", cada: { horas: 300, meses: 36 }, notaMarca: "Evinrude: revisar y cambiar si hace falta cada 300 horas o 3 años. El tipo de bujía figura en la etiqueta de emisiones (ECI) del motor." },
        "impulsor": { segun: "Evinrude", cada: { horas: 300, meses: 36 }, cadaTrabajo: { meses: 12 }, notaMarca: "Evinrude: revisar la bomba de agua y cambiarla si hace falta cada 300 horas o 3 años. Una vez por año si navega en agua salada o contaminada, o en uso de trabajo." },
        "termostato": { segun: "Evinrude", cada: { horas: 300, meses: 36 }, notaMarca: "Evinrude: revisar termostato y válvula de presión cada 300 horas o 3 años." },
        "filtro-combustible": { segun: "Evinrude", cada: { horas: 300, meses: 12 }, notaMarca: "Evinrude: cambiar el filtro de nafta del motor cada 300 horas o 3 años. El filtro separador montado en el casco se cambia una vez por año." }
      },
      tareasExtra: [],
      consejos: ["Motor E-TEC de inyección directa con inyección de aceite: no se mezcla aceite en la nafta. Use aceite Evinrude XD100 o TC-W3 certificado NMMA.", "Evinrude indica que no hace falta rodaje y que el mantenimiento de concesionario es cada 300 horas o 3 años en uso recreativo; en uso intenso, comercial o en agua salada, se recomiendan controles anuales."]
    },
    "evinrude-etec-115-130": {
      estado: "completo",
      fuente: "Guía del operador oficial Evinrude E-TEC 115 a 300 HP (2012) (BRP, 216079, operatorsguides.brp.com)",
      datosTecnicos: [
        { dato: "Motor", valor: "2 tiempos, V4 a 60°, 1727 cc" },
        { dato: "Inyección", valor: "Inyección directa E-TEC con inyección de aceite" },
        { dato: "Aceite 2T", valor: "Evinrude XD100 o TC-W3 certificado NMMA" },
        { dato: "Nafta", valor: "87 AKI (90 RON) o más" },
        { dato: "Bujía", valor: "Ver etiqueta de emisiones (ECI) del motor" },
        { dato: "Aceite de cola", valor: "Evinrude HPF XR · 950 ml (pata L) · 970 ml (pata X)" },
        { dato: "Ralentí en neutro", valor: "580 ± 50 rpm" },
        { dato: "Rango a fondo", valor: "5500 a 6000 rpm" }
      ],
      ajustes: {
        "enjuague": { segun: "Evinrude", cada: { usos: 1 }, notaMarca: "Evinrude: enjuagar con agua dulce después de cada uso en agua salada, salobre o contaminada. Se puede hacer por el puerto de la tapa sin arrancar el motor." },
        "aceite-cola": { segun: "Evinrude", cada: { horas: 300, meses: 36 }, cadaTrabajo: { meses: 12 }, notaMarca: "Evinrude: cambiar cada 300 horas o 3 años (uso recreativo promedio). Una vez por año si navega en agua salada o contaminada, o en uso de trabajo. Lubricante Evinrude HPF XR." },
        "engrase": { segun: "Evinrude", cada: { horas: 300, meses: 36 }, cadaTrabajo: { meses: 12 }, notaMarca: "Evinrude: engrasar dirección, estrías del eje de hélice y graseras cada 300 horas o 3 años. Una vez por año si navega en agua salada o contaminada, o en uso de trabajo. Grasa Triple-Guard." },
        "anodos": { segun: "Evinrude", cada: { horas: 300, meses: 36 }, cadaTrabajo: { meses: 12 }, notaMarca: "Evinrude: revisar cada 300 horas o 3 años. Una vez por año si navega en agua salada o contaminada, o en uso de trabajo. Cambiar los ánodos que quedaron en menos de 2/3 de su tamaño original. No pintarlos." },
        "bujias": { segun: "Evinrude", cada: { horas: 300, meses: 36 }, notaMarca: "Evinrude: revisar y cambiar si hace falta cada 300 horas o 3 años. El tipo de bujía figura en la etiqueta de emisiones (ECI) del motor." },
        "impulsor": { segun: "Evinrude", cada: { horas: 300, meses: 36 }, cadaTrabajo: { meses: 12 }, notaMarca: "Evinrude: revisar la bomba de agua y cambiarla si hace falta cada 300 horas o 3 años. Una vez por año si navega en agua salada o contaminada, o en uso de trabajo." },
        "termostato": { segun: "Evinrude", cada: { horas: 300, meses: 36 }, notaMarca: "Evinrude: revisar termostato y válvula de presión cada 300 horas o 3 años." },
        "filtro-combustible": { segun: "Evinrude", cada: { horas: 300, meses: 12 }, notaMarca: "Evinrude: cambiar el filtro de nafta del motor cada 300 horas o 3 años. El filtro separador montado en el casco se cambia una vez por año." }
      },
      tareasExtra: [],
      consejos: ["Motor E-TEC de inyección directa con inyección de aceite: no se mezcla aceite en la nafta. Use aceite Evinrude XD100 o TC-W3 certificado NMMA.", "Evinrude indica que no hace falta rodaje y que el mantenimiento de concesionario es cada 300 horas o 3 años en uso recreativo; en uso intenso, comercial o en agua salada, se recomiendan controles anuales."]
    },
    "johnson-40-2t": {
      estado: "completo",
      fuente: "Guía del operador oficial Johnson 40 HP 2 tiempos R / RL (2005, 215599, operatorsguides.brp.com)",
      datosTecnicos: [
        { dato: "Motor", valor: "2 tiempos, 2 cilindros en línea, barrido en lazo, 737 cc" },
        { dato: "Alimentación", valor: "Carburador" },
        { dato: "Mezcla", valor: "50:1 (2 % de aceite) · rodaje 25:1 las primeras 10 horas" },
        { dato: "Aceite 2T", valor: "TC-W3 certificado NMMA" },
        { dato: "Nafta", valor: "87 AKI (90 RON) o más" },
        { dato: "Bujía", valor: "Ver etiqueta de emisiones (ECI) · ajuste 24 a 28 Nm" },
        { dato: "Aceite de cola", valor: "Ultra-HPF · 485 ml" },
        { dato: "Ralentí en marcha", valor: "800 ± 30 rpm" },
        { dato: "Rango a fondo", valor: "4500 a 5500 rpm" },
        { dato: "Encendido", valor: "Avance 1° en ralentí, 19° a fondo · sistema S.L.O.W. contra sobrecalentamiento" }
      ],
      ajustes: {
        "enjuague": { segun: "Johnson", cada: { usos: 1 }, notaMarca: "Johnson: enjuagar el sistema de refrigeración después de cada uso." },
        "aceite-cola": { segun: "Johnson", cada: { horas: 100, meses: 12, primeraHoras: 10 }, notaMarca: "Johnson: cambiar a las primeras 10 horas, revisar nivel a las 50 horas siguientes y después cada 50 horas, y cambiarlo cada 100 horas o una vez por temporada. Lubricante Ultra-HPF." },
        "engrase": { segun: "Johnson", cada: { meses: 2 }, notaMarca: "Johnson: engrasar tubo de inclinación, dirección, tornillos de fijación y articulaciones de acelerador y cambios cada 60 días (cada 30 días en agua salada). Las estrías del eje de hélice, cada 100 horas o una vez por año." },
        "anodos": { segun: "Johnson", cada: { usos: 1 }, notaMarca: "Johnson: el usuario verifica los ánodos en cada uso; el concesionario los revisa en el control de las 10 horas." },
        "bujias": { segun: "Johnson", cada: { horas: 100, meses: 12 }, notaMarca: "Johnson: cambiar cada 100 horas o una vez por año. El tipo de bujía figura en la etiqueta de emisiones (ECI). Ajuste 24 a 28 Nm." },
        "filtro-combustible": { segun: "Johnson", cada: { horas: 100, meses: 12 }, notaMarca: "Johnson: revisar el filtro y eliminar contaminación en el control de las 10 horas y después cada 100 horas o una vez por año; cambiar el filtro cada 100 horas o una vez por año." },
        "termostato": { segun: "Johnson", cada: { horas: 100, meses: 12, primeraHoras: 10 }, notaMarca: "Johnson: el concesionario revisa el termostato a las 10 horas y después cada 100 horas o una vez por año." },
        "carburador": { segun: "Johnson", cada: { horas: 100, meses: 12, primeraHoras: 10 }, notaMarca: "Johnson: el concesionario revisa la sincronización y las articulaciones a las 10 horas y después cada 100 horas o una vez por año. Descarbonizar con Engine Tuner cada 100 horas." },
        "impulsor": { segun: "Johnson", cada: { horas: 200, meses: 24 }, notaMarca: "Johnson: el concesionario revisa y cambia la bomba de agua cada 200 horas o cada 2 años." },
        "helice": { segun: "Johnson", cada: { horas: 100, meses: 12 }, notaMarca: "Johnson: revisar y engrasar las estrías del eje de hélice cada 100 horas o una vez por año." }
      },
      tareasExtra: [],
      consejos: ["Rodaje de 10 horas con mezcla 25:1: la primera hora sin pasar de 3500 rpm, variando la velocidad cada 15 minutos; después, mezcla 50:1.", "Johnson indica cambiar el aceite de cola a las primeras 10 horas."]
    },
    "suzuki-df2-5": {
      estado: "completo",
      fuente: "Manual del propietario oficial Suzuki DF2.5 (edición polaca K23, suzuki.pl)",
      datosTecnicos: [
        { dato: "Motor", valor: "4 tiempos, 1 cilindro, 68 cc (48 × 38 mm), tanque integrado de 0,9 L" },
        { dato: "Alimentación", valor: "Carburador" },
        { dato: "Aceite de motor", valor: "SAE 10W-40 NMMA FC-W · 0,38 L" },
        { dato: "Aceite de cola", valor: "Hipoide SAE 90 GL5 · 70 ml" },
        { dato: "Bujía", valor: "NGK CR6HSA" },
        { dato: "Luz de bujía", valor: "0,6 a 0,7 mm" },
        { dato: "Luz de válvulas", valor: "Admisión y escape 0,13 a 0,17 mm" },
        { dato: "Rango a fondo", valor: "5250 a 5750 rpm" },
        { dato: "Nafta", valor: "Sin plomo, 91 RON o más" }
      ],
      ajustes: {
        "aceite-motor": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: cambiar a las 20 horas (o al mes) y después cada 100 horas o 12 meses." },
        "aceite-cola": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: cambiar a las 20 horas (o al mes) y después cada 100 horas o 12 meses. Aceite hipoide SAE 90 GL5." },
        "bujias": { segun: "Suzuki", cada: { horas: 100, meses: 12 }, notaMarca: "Suzuki: revisar cada 100 horas o 12 meses." },
        "engrase": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: revisar el engrase a las 20 horas y después cada 100 horas o 12 meses." },
        "anodos": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: revisar los ánodos exteriores a las 20 horas y después cada 100 horas o 12 meses. Los ánodos internos los revisa el concesionario cada 100 horas." },
        "impulsor": { segun: "Suzuki", cada: { horas: 300, meses: 36 }, notaMarca: "Suzuki: el concesionario revisa la bomba de agua y el impulsor cada 200 horas o 12 meses y cambia el impulsor cada 300 horas o 36 meses." },
        "valvulas": { segun: "Suzuki", cada: { horas: 200, meses: 12 }, notaMarca: "Suzuki: el concesionario revisa la luz de válvulas a las 20 horas y después cada 200 horas o 12 meses." },
        "helice": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: revisar tuerca y pasador de la hélice a las 20 horas y después cada 100 horas o 12 meses." },
        "termostato": { segun: "Suzuki", cada: { horas: 100, meses: 12 }, notaMarca: "Suzuki: el concesionario revisa el termostato cada 100 horas o 12 meses." },
        "filtro-combustible": { segun: "Suzuki", cada: { horas: 100, meses: 12 }, notaMarca: "Suzuki: el concesionario revisa el filtro de nafta cada 100 horas o 12 meses." },
        "carburador": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: el concesionario revisa el carburador a las 20 horas y después cada 100 horas o 12 meses." }
      },
      tareasExtra: [

      ],
      consejos: ["Revisar el nivel de aceite antes de cada uso."]
    },
    "suzuki-df4a-6a": {
      estado: "completo",
      fuente: "Manual del propietario oficial Suzuki DF4A / DF5A / DF6A (edición polaca K23, suzuki.pl)",
      datosTecnicos: [
        { dato: "Motor", valor: "4 tiempos, 1 cilindro, 138 cc (60,4 × 48 mm), tanque integrado de 1,0 L" },
        { dato: "Alimentación", valor: "Carburador" },
        { dato: "Aceite de motor", valor: "SAE 10W-40 NMMA FC-W · 0,7 L" },
        { dato: "Aceite de cola", valor: "Hipoide SAE 90 GL5 · 190 ml" },
        { dato: "Bujía", valor: "NGK CPR6EA-9" },
        { dato: "Luz de bujía", valor: "0,8 a 0,9 mm" },
        { dato: "Luz de válvulas", valor: "Admisión y escape 0,13 a 0,17 mm" },
        { dato: "Rango a fondo", valor: "DF4A: 4000 a 5000 rpm · DF5A: 4500 a 5500 rpm · DF6A: 4750 a 5750 rpm" },
        { dato: "Nafta", valor: "Sin plomo, 91 RON o más" }
      ],
      ajustes: {
        "aceite-motor": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: cambiar a las 20 horas (o al mes) y después cada 100 horas o 12 meses. El filtro se cambia a las 20 horas y después cada 200 horas o 12 meses." },
        "aceite-cola": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: cambiar a las 20 horas (o al mes) y después cada 100 horas o 12 meses. Aceite hipoide SAE 90 GL5." },
        "bujias": { segun: "Suzuki", cada: { horas: 100, meses: 12 }, notaMarca: "Suzuki: revisar cada 100 horas o 12 meses." },
        "engrase": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: revisar el engrase a las 20 horas y después cada 100 horas o 12 meses." },
        "anodos": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: revisar los ánodos exteriores a las 20 horas y después cada 100 horas o 12 meses. Los ánodos internos los revisa el concesionario cada 100 horas." },
        "impulsor": { segun: "Suzuki", cada: { horas: 300, meses: 36 }, notaMarca: "Suzuki: el concesionario revisa la bomba de agua y el impulsor cada 200 horas o 12 meses y cambia el impulsor cada 300 horas o 36 meses." },
        "valvulas": { segun: "Suzuki", cada: { horas: 200, meses: 12 }, notaMarca: "Suzuki: el concesionario revisa la luz de válvulas a las 20 horas y después cada 200 horas o 12 meses." },
        "helice": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: revisar tuerca y pasador de la hélice a las 20 horas y después cada 100 horas o 12 meses." },
        "termostato": { segun: "Suzuki", cada: { horas: 100, meses: 12 }, notaMarca: "Suzuki: el concesionario revisa el termostato cada 100 horas o 12 meses." },
        "filtro-combustible": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: revisar el filtro de nafta a las 20 horas y después cada 100 horas o 12 meses, y cambiarlo cada 400 horas o 2 años." },
        "carburador": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: el concesionario revisa el carburador a las 20 horas y después cada 100 horas o 12 meses." }
      },
      tareasExtra: [
        { id: "filtro-aceite", nombre: "Cambio de filtro de aceite", tiempos: "4T", cada: { horas: 200, meses: 12, primeraHoras: 20 }, quien: "mecanico", segun: "Suzuki", porque: "Retiene las partículas del aceite.", pasos: ["Suzuki indica cambiarlo a las 20 horas y después cada 200 horas o 12 meses."], materiales: ["Filtro de aceite original Suzuki"] }
      ],
      consejos: ["Revisar el nivel de aceite antes de cada uso."]
    },
    "suzuki-df9-9b-20a": {
      estado: "completo",
      fuente: "Manual del propietario oficial Suzuki DF9.9B / DF15A / DF20A (edición polaca K23, suzuki.pl)",
      datosTecnicos: [
        { dato: "Motor", valor: "4 tiempos, 2 cilindros, 327 cc (60,4 × 57 mm)" },
        { dato: "Alimentación", valor: "Inyección electrónica (sin batería en las versiones de arranque manual)" },
        { dato: "Aceite de motor", valor: "SAE 10W-40 NMMA FC-W · 1,0 L" },
        { dato: "Aceite de cola", valor: "Hipoide SAE 90 GL5 · 250 ml" },
        { dato: "Bujía", valor: "NGK MR6K-9" },
        { dato: "Luz de bujía", valor: "0,8 a 0,9 mm" },
        { dato: "Ajuste de bujía", valor: "10 a 12 Nm" },
        { dato: "Luz de válvulas", valor: "Admisión y escape 0,16 a 0,20 mm" },
        { dato: "Rango a fondo", valor: "DF9.9B: 4700 a 5700 rpm · DF15A: 5000 a 6000 rpm · DF20A: 5300 a 6300 rpm" },
        { dato: "Nafta", valor: "Sin plomo, 91 RON o más" }
      ],
      ajustes: {
        "aceite-motor": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: cambiar a las 20 horas (o al mes) y después cada 100 horas o 12 meses. El filtro se cambia a las 20 horas y después cada 200 horas o 12 meses." },
        "aceite-cola": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: cambiar a las 20 horas (o al mes) y después cada 100 horas o 12 meses. Aceite hipoide SAE 90 GL5." },
        "bujias": { segun: "Suzuki", cada: { horas: 100, meses: 12 }, notaMarca: "Suzuki: revisar cada 100 horas o 12 meses." },
        "engrase": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: revisar el engrase a las 20 horas y después cada 100 horas o 12 meses." },
        "anodos": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: revisar los ánodos exteriores a las 20 horas y después cada 100 horas o 12 meses. Los ánodos internos los revisa el concesionario cada 100 horas." },
        "impulsor": { segun: "Suzuki", cada: { horas: 300, meses: 36 }, notaMarca: "Suzuki: el concesionario revisa la bomba de agua y el impulsor cada 200 horas o 12 meses y cambia el impulsor cada 300 horas o 36 meses." },
        "valvulas": { segun: "Suzuki", cada: { horas: 200, meses: 12 }, notaMarca: "Suzuki: el concesionario revisa la luz de válvulas a las 20 horas y después cada 200 horas o 12 meses." },
        "helice": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: revisar tuerca y pasador de la hélice a las 20 horas y después cada 100 horas o 12 meses." },
        "termostato": { segun: "Suzuki", cada: { horas: 100, meses: 12 }, notaMarca: "Suzuki: el concesionario revisa el termostato cada 100 horas o 12 meses." },
        "filtro-combustible": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: revisar el filtro de baja presión a las 20 horas y después cada 100 horas o 12 meses, y cambiarlo cada 400 horas o 2 años. El filtro separador de agua se cambia cada 12 meses." }
      },
      tareasExtra: [
        { id: "filtro-aceite", nombre: "Cambio de filtro de aceite", tiempos: "4T", cada: { horas: 200, meses: 12, primeraHoras: 20 }, quien: "mecanico", segun: "Suzuki", porque: "Retiene las partículas del aceite.", pasos: ["Suzuki indica cambiarlo a las 20 horas y después cada 200 horas o 12 meses."], materiales: ["Filtro de aceite original Suzuki"] },
        { id: "bateria", nombre: "Revisión de batería", cada: { horas: 100, meses: 12, primeraHoras: 20 }, quien: "usuario", segun: "Suzuki", porque: "Una batería floja o sulfatada deja sin arranque.", pasos: ["Suzuki indica revisarla a las 20 horas y después cada 100 horas o 12 meses."], materiales: [] },
        { id: "correa-distribucion", nombre: "Correa de distribución", tiempos: "4T", cada: { horas: 200, meses: 12, primeraHoras: 20 }, quien: "mecanico", segun: "Suzuki", porque: "Si se corta, el motor se para y puede dañarse.", pasos: ["Suzuki indica que el concesionario la revise a las 20 horas y después cada 200 horas o 12 meses, y que la cambie cada 4 años."], materiales: ["Correa de distribución original Suzuki"] }
      ],
      consejos: ["Revisar el nivel de aceite antes de cada uso."]
    },
    "suzuki-df25a-30a": {
      estado: "completo",
      fuente: "Manual del propietario oficial Suzuki DF25A / DF30A (edición polaca K23, suzuki.pl)",
      datosTecnicos: [
        { dato: "Motor", valor: "4 tiempos, 3 cilindros, 490 cc (60,4 × 57 mm)" },
        { dato: "Alimentación", valor: "Inyección electrónica" },
        { dato: "Aceite de motor", valor: "SAE 10W-40 NMMA FC-W · 1,5 L" },
        { dato: "Aceite de cola", valor: "Hipoide SAE 90 GL5 · 330 ml" },
        { dato: "Bujía", valor: "NGK MR6K-9" },
        { dato: "Luz de bujía", valor: "0,8 a 0,9 mm" },
        { dato: "Ajuste de bujía", valor: "10 a 12 Nm" },
        { dato: "Luz de válvulas", valor: "Admisión 0,18 a 0,22 mm · escape 0,20 a 0,24 mm" },
        { dato: "Rango a fondo", valor: "DF25A: 5000 a 6000 rpm · DF30A: 5300 a 6300 rpm" },
        { dato: "Nafta", valor: "Sin plomo, 91 RON o más" }
      ],
      ajustes: {
        "aceite-motor": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: cambiar a las 20 horas (o al mes) y después cada 100 horas o 12 meses. El filtro se cambia a las 20 horas y después cada 200 horas o 12 meses." },
        "aceite-cola": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: cambiar a las 20 horas (o al mes) y después cada 100 horas o 12 meses. Aceite hipoide SAE 90 GL5." },
        "bujias": { segun: "Suzuki", cada: { horas: 100, meses: 12 }, notaMarca: "Suzuki: revisar cada 100 horas o 12 meses." },
        "engrase": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: revisar el engrase a las 20 horas y después cada 100 horas o 12 meses." },
        "anodos": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: revisar los ánodos exteriores a las 20 horas y después cada 100 horas o 12 meses. Los ánodos internos los revisa el concesionario cada 100 horas." },
        "impulsor": { segun: "Suzuki", cada: { horas: 300, meses: 36 }, notaMarca: "Suzuki: el concesionario revisa la bomba de agua y el impulsor cada 200 horas o 12 meses y cambia el impulsor cada 300 horas o 36 meses." },
        "valvulas": { segun: "Suzuki", cada: { horas: 200, meses: 12 }, notaMarca: "Suzuki: el concesionario revisa la luz de válvulas a las 20 horas y después cada 200 horas o 12 meses." },
        "helice": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: revisar tuerca y pasador de la hélice a las 20 horas y después cada 100 horas o 12 meses." },
        "termostato": { segun: "Suzuki", cada: { horas: 100, meses: 12 }, notaMarca: "Suzuki: el concesionario revisa el termostato cada 100 horas o 12 meses." },
        "filtro-combustible": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: revisar el filtro de baja presión a las 20 horas y después cada 100 horas o 12 meses, y cambiarlo cada 400 horas o 2 años. El filtro junto a la bomba de nafta se cambia cada 1000 horas y el separador de agua cada 12 meses." }
      },
      tareasExtra: [
        { id: "filtro-aceite", nombre: "Cambio de filtro de aceite", tiempos: "4T", cada: { horas: 200, meses: 12, primeraHoras: 20 }, quien: "mecanico", segun: "Suzuki", porque: "Retiene las partículas del aceite.", pasos: ["Suzuki indica cambiarlo a las 20 horas y después cada 200 horas o 12 meses."], materiales: ["Filtro de aceite original Suzuki"] },
        { id: "bateria", nombre: "Revisión de batería", cada: { horas: 100, meses: 12, primeraHoras: 20 }, quien: "usuario", segun: "Suzuki", porque: "Una batería floja o sulfatada deja sin arranque.", pasos: ["Suzuki indica revisarla a las 20 horas y después cada 100 horas o 12 meses."], materiales: [] },
        { id: "correa-distribucion", nombre: "Correa de distribución", tiempos: "4T", cada: { horas: 200, meses: 12, primeraHoras: 20 }, quien: "mecanico", segun: "Suzuki", porque: "Si se corta, el motor se para y puede dañarse.", pasos: ["Suzuki indica que el concesionario la revise a las 20 horas y después cada 200 horas o 12 meses, y que la cambie cada 4 años."], materiales: ["Correa de distribución original Suzuki"] }
      ],
      consejos: ["Revisar el nivel de aceite antes de cada uso."]
    },
    "suzuki-df115bg-140bg": {
      estado: "completo",
      fuente: "Manual del propietario oficial Suzuki DF115BG / DF140BG (edición polaca K23, suzuki.pl)",
      datosTecnicos: [
        { dato: "Motor", valor: "4 tiempos, 4 cilindros, 2045 cc (86 × 88 mm)" },
        { dato: "Alimentación", valor: "Inyección electrónica" },
        { dato: "Aceite de motor", valor: "SAE 10W-40 NMMA FC-W · 5,5 L" },
        { dato: "Aceite de cola", valor: "Hipoide SAE 90 GL5 · 1050 ml" },
        { dato: "Bujía", valor: "NGK LKR6E" },
        { dato: "Luz de bujía", valor: "0,8 a 0,9 mm" },
        { dato: "Luz de válvulas", valor: "Admisión y escape 0,23 a 0,27 mm" },
        { dato: "Rango a fondo", valor: "DF115BG: 5000 a 6000 rpm · DF140BG: 5700 a 6300 rpm" },
        { dato: "Nafta", valor: "Sin plomo, 91 RON o más" }
      ],
      ajustes: {
        "aceite-motor": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: cambiar a las 20 horas (o al mes) y después cada 100 horas o 12 meses. El filtro se cambia a las 20 horas y después cada 200 horas o 12 meses." },
        "aceite-cola": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: cambiar a las 20 horas (o al mes) y después cada 100 horas o 12 meses. Aceite hipoide SAE 90 GL5." },
        "bujias": { segun: "Suzuki", cada: { horas: 100, meses: 12 }, notaMarca: "Suzuki: revisar cada 100 horas o 12 meses." },
        "engrase": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: revisar el engrase a las 20 horas y después cada 100 horas o 12 meses." },
        "anodos": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: revisar los ánodos exteriores a las 20 horas y después cada 100 horas o 12 meses. Los ánodos internos los revisa el concesionario cada 100 horas." },
        "impulsor": { segun: "Suzuki", cada: { horas: 300, meses: 36 }, notaMarca: "Suzuki: el concesionario revisa la bomba de agua y el impulsor cada 200 horas o 12 meses y cambia el impulsor cada 300 horas o 36 meses." },
        "valvulas": { segun: "Suzuki", cada: { horas: 300, meses: 36 }, notaMarca: "Suzuki: el concesionario revisa la luz de válvulas cada 300 horas o 36 meses." },
        "helice": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: revisar tuerca y pasador de la hélice a las 20 horas y después cada 100 horas o 12 meses." },
        "termostato": { segun: "Suzuki", cada: { horas: 100, meses: 12 }, notaMarca: "Suzuki: el concesionario revisa el termostato cada 100 horas o 12 meses." },
        "filtro-combustible": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: revisar el filtro de baja presión a las 20 horas y después cada 100 horas o 12 meses, y cambiarlo cada 400 horas o 2 años. El filtro separador de agua se cambia cada 12 meses." }
      },
      tareasExtra: [
        { id: "filtro-aceite", nombre: "Cambio de filtro de aceite", tiempos: "4T", cada: { horas: 200, meses: 12, primeraHoras: 20 }, quien: "mecanico", segun: "Suzuki", porque: "Retiene las partículas del aceite.", pasos: ["Suzuki indica cambiarlo a las 20 horas y después cada 200 horas o 12 meses."], materiales: ["Filtro de aceite original Suzuki"] },
        { id: "bateria", nombre: "Revisión de batería", cada: { horas: 100, meses: 12, primeraHoras: 20 }, quien: "usuario", segun: "Suzuki", porque: "Una batería floja o sulfatada deja sin arranque.", pasos: ["Suzuki indica revisarla a las 20 horas y después cada 100 horas o 12 meses."], materiales: [] }
      ],
      consejos: ["Revisar el nivel de aceite antes de cada uso."]
    },
    "suzuki-df40a-60a": {
      estado: "completo",
      fuente: "Manual del propietario oficial Suzuki DF40A / DF50A / DF60A (edición polaca K20, suzuki.pl)",
      datosTecnicos: [
        { dato: "Motor", valor: "4 tiempos, 4 cilindros, 941 cc (72,5 × 76 mm)" },
        { dato: "Alimentación", valor: "Inyección electrónica" },
        { dato: "Aceite de motor", valor: "SAE 10W-40 NMMA FC-W (5W-30 con frío) · 2,7 L" },
        { dato: "Aceite de cola", valor: "Hipoide SAE 90 GL5 · DF40A/50A/60A: 610 ml · DF50AV/60AV: 1050 ml" },
        { dato: "Bujía", valor: "NGK DCPR6E" },
        { dato: "Luz de bujía", valor: "0,8 a 0,9 mm" },
        { dato: "Ajuste de bujía", valor: "15 a 19 Nm" },
        { dato: "Luz de válvulas", valor: "Admisión 0,18 a 0,22 mm · escape 0,28 a 0,32 mm" },
        { dato: "Rango a fondo", valor: "DF40A: 5000 a 6000 rpm · DF50A/60A: 5300 a 6300 rpm" },
        { dato: "Nafta", valor: "Sin plomo, 91 RON o más" }
      ],
      ajustes: {
        "aceite-motor": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: cambiar a las 20 horas (o al mes) y después cada 100 horas o 12 meses. El filtro se cambia a las 20 horas y después cada 200 horas o 12 meses." },
        "aceite-cola": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: cambiar a las 20 horas (o al mes) y después cada 100 horas o 12 meses. Aceite hipoide SAE 90 GL5." },
        "bujias": { segun: "Suzuki", cada: { horas: 100, meses: 12 }, notaMarca: "Suzuki: revisar cada 100 horas o 12 meses." },
        "engrase": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: revisar el engrase a las 20 horas y después cada 100 horas o 12 meses." },
        "anodos": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: revisar los ánodos exteriores y el cable de masa a las 20 horas y después cada 100 horas o 12 meses. Los ánodos internos (bloque y tapa de cilindros) los revisa el concesionario cada 100 horas." },
        "filtro-combustible": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: revisar el filtro de baja presión a las 20 horas y después cada 100 horas o 12 meses, y cambiarlo cada 400 horas o 2 años. Revisar el respiradero y la manguera de nafta en cada control." },
        "impulsor": { segun: "Suzuki", cada: { horas: 300, meses: 36 }, notaMarca: "Suzuki: el concesionario revisa la bomba de agua y el impulsor cada 200 horas o 12 meses y cambia el impulsor cada 300 horas o 36 meses." },
        "valvulas": { segun: "Suzuki", cada: { horas: 300, meses: 36 }, notaMarca: "Suzuki: el concesionario revisa la luz de válvulas cada 300 horas o 36 meses." },
        "helice": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: revisar tuerca y pasador de la hélice a las 20 horas y después cada 100 horas o 12 meses." }
      },
      tareasExtra: [
        { id: "filtro-aceite", nombre: "Cambio de filtro de aceite", tiempos: "4T", cada: { horas: 200, meses: 12, primeraHoras: 20 }, quien: "mecanico", segun: "Suzuki", porque: "Retiene las partículas del aceite.", pasos: ["Suzuki indica cambiarlo a las 20 horas y después cada 200 horas o 12 meses."], materiales: ["Filtro de aceite original Suzuki"] },
        { id: "bateria", nombre: "Revisión de batería", cada: { horas: 100, meses: 12, primeraHoras: 20 }, quien: "usuario", segun: "Suzuki", porque: "Una batería floja o sulfatada deja sin arranque.", pasos: ["Suzuki indica revisarla a las 20 horas y después cada 100 horas o 12 meses."], materiales: [] }
      ],
      consejos: ["Revisar el nivel de aceite antes de cada uso."]
    },
    "suzuki-df70a-90a": {
      estado: "completo",
      fuente: "Manual del propietario oficial Suzuki DF70A / DF80A / DF90A (edición polaca K17, suzuki.pl)",
      datosTecnicos: [
        { dato: "Motor", valor: "4 tiempos, 4 cilindros, 1502 cc (75 × 85 mm)" },
        { dato: "Alimentación", valor: "Inyección electrónica" },
        { dato: "Aceite de motor", valor: "SAE 10W-40 NMMA FC-W (5W-30 con frío) · 4,0 L" },
        { dato: "Aceite de cola", valor: "Hipoide SAE 90 GL5 · 850 ml" },
        { dato: "Bujía", valor: "NGK DCPR6E" },
        { dato: "Luz de bujía", valor: "0,8 a 0,9 mm" },
        { dato: "Rango a fondo", valor: "DF70A: 5000 a 6000 rpm · DF80A/90A: 5500 a 6300 rpm" },
        { dato: "Ralentí en marcha", valor: "Unas 700 rpm" }
      ],
      ajustes: {
        "aceite-motor": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: cambiar a las 20 horas (o al mes) y después cada 100 horas o 12 meses. El filtro se cambia a las 20 horas y después cada 200 horas o 12 meses." },
        "aceite-cola": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: cambiar a las 20 horas (o al mes) y después cada 100 horas o 12 meses. Aceite hipoide SAE 90 GL5." },
        "bujias": { segun: "Suzuki", cada: { horas: 100, meses: 12 }, notaMarca: "Suzuki: revisar cada 100 horas o 12 meses." },
        "engrase": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: revisar el engrase a las 20 horas y después cada 100 horas o 12 meses." },
        "anodos": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: revisar los ánodos exteriores y el cable de masa a las 20 horas y después cada 100 horas o 12 meses. Los ánodos internos (bloque y tapa de cilindros) los revisa el concesionario cada 100 horas." },
        "filtro-combustible": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: revisar el filtro de baja presión a las 20 horas y después cada 100 horas o 12 meses, y cambiarlo cada 400 horas o 2 años. Revisar el respiradero y la manguera de nafta en cada control." },
        "impulsor": { segun: "Suzuki", cada: { horas: 300, meses: 36 }, notaMarca: "Suzuki: el concesionario revisa la bomba de agua y el impulsor cada 200 horas o 12 meses y cambia el impulsor cada 300 horas o 36 meses." },
        "valvulas": { segun: "Suzuki", cada: { horas: 300, meses: 36 }, notaMarca: "Suzuki: el concesionario revisa la luz de válvulas cada 300 horas o 36 meses." },
        "helice": { segun: "Suzuki", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Suzuki: revisar tuerca y pasador de la hélice a las 20 horas y después cada 100 horas o 12 meses." }
      },
      tareasExtra: [
        { id: "filtro-aceite", nombre: "Cambio de filtro de aceite", tiempos: "4T", cada: { horas: 200, meses: 12, primeraHoras: 20 }, quien: "mecanico", segun: "Suzuki", porque: "Retiene las partículas del aceite.", pasos: ["Suzuki indica cambiarlo a las 20 horas y después cada 200 horas o 12 meses."], materiales: ["Filtro de aceite original Suzuki"] },
        { id: "bateria", nombre: "Revisión de batería", cada: { horas: 100, meses: 12, primeraHoras: 20 }, quien: "usuario", segun: "Suzuki", porque: "Una batería floja o sulfatada deja sin arranque.", pasos: ["Suzuki indica revisarla a las 20 horas y después cada 100 horas o 12 meses."], materiales: [] }
      ],
      consejos: ["Revisar el nivel de aceite antes de cada uso."]
    },
    "honda-15-20": {
      nombre: "Base Honda BF15D / BF20D",
      estado: "completo",
      fuente: "Manual del propietario oficial Honda BF8D / BF9.9D / BF15D / BF20D (31ZY0652). Modelos anteriores (BF15A / BF20A) pueden diferir",
      datosTecnicos: [
        { dato: "Motor", valor: "4 tiempos, OHC, 2 cilindros en línea" },
        { dato: "Cilindrada", valor: "350 cc" },
        { dato: "Alimentación", valor: "Carburador" },
        { dato: "Encendido", valor: "Digital (ICM)" },
        { dato: "Aceite de motor", valor: "SAE 10W-30 API SG/SH/SJ (FC-W) · 1,0 L sin cambio de filtro" },
        { dato: "Aceite de cola", valor: "Hipoide SAE 90 API GL-4 · 0,29 L" },
        { dato: "Bujía", valor: "NGK CR5EH-9 o Denso U16FER9" },
        { dato: "Luz de bujía", valor: "0,8 a 0,9 mm" },
        { dato: "Ralentí", valor: "900 ± 50 rpm" },
        { dato: "Rango a fondo", valor: "BF15: 4500 a 5500 rpm · BF20: 5000 a 6000 rpm" },
        { dato: "Nafta", valor: "Sin plomo, 86 octanos (R+M)/2 o más (equivale a unos 91 RON)" },
        { dato: "Refrigeración", valor: "Por agua, con termostato" }
      ],
      ajustes: {
        "aceite-motor": { segun: "Honda", cada: { horas: 100, meses: 6, primeraHoras: 20 }, notaMarca: "Honda: primer cambio al mes o a las 20 horas y después cada 100 horas o 6 meses. Revisar el nivel antes de cada uso. El filtro de aceite se cambia cada 200 horas o una vez por año." },
        "aceite-cola": { segun: "Honda", cada: { horas: 100, meses: 6, primeraHoras: 20 }, notaMarca: "Honda: primer cambio al mes o a las 20 horas y después cada 100 horas o 6 meses. Tarea de concesionario si no tiene experiencia." },
        "bujias": { segun: "Honda", cada: { horas: 100, meses: 6 }, notaMarca: "Honda: revisar, calibrar o cambiar cada 100 horas o 6 meses." },
        "engrase": { segun: "Honda", cada: { horas: 100, meses: 6, primeraHoras: 20 }, notaMarca: "Honda: engrasar al mes o a las 20 horas y después cada 100 horas o 6 meses. Engrasar más seguido si navega en agua salada." },
        "anodos": { segun: "Honda", cada: { usos: true }, notaMarca: "Honda: revisar el ánodo exterior en cada uso y cambiarlo cuando se redujo a un tercio de su tamaño o se desarma. Los ánodos internos los revisa el concesionario cada 2 años o 400 horas." },
        "helice": { segun: "Honda", cada: { usos: true }, notaMarca: "Honda: revisar hélice y pasador antes de cada uso." },
        "filtro-combustible": { segun: "Honda", cada: { horas: 100, meses: 6 }, notaMarca: "Honda: revisar el filtro de baja presión (agua y suciedad) cada 100 horas o 6 meses y cambiarlo una vez por año o cada 200 horas. Limpiar el tanque y su filtro una vez por año o cada 200 horas." },
        "impulsor": { segun: "Honda", cada: { horas: 200, meses: 12 }, notaMarca: "Honda: revisar la bomba de agua una vez por año o cada 200 horas. Tarea de concesionario." },
        "termostato": { segun: "Honda", cada: { horas: 200, meses: 12 }, notaMarca: "Honda: revisar una vez por año o cada 200 horas. Tarea de concesionario." },
        "valvulas": { segun: "Honda", cada: { horas: 200, meses: 12 }, notaMarca: "Honda: controlar y ajustar la luz de válvulas una vez por año o cada 200 horas. Tarea de concesionario." },
        "enjuague": { segun: "Honda", notaMarca: "Honda: después de cada uso en agua salada, turbia o con barro, enjuagar el sistema de refrigeración con agua dulce." }
      },
      tareasExtra: [
        { id: "filtro-aceite", nombre: "Cambio de filtro de aceite", tiempos: "4T", cada: { horas: 200, meses: 12 }, quien: "mecanico", segun: "Honda", porque: "Retiene las partículas del aceite. Honda indica cambiarlo una vez por año o cada 200 horas.", pasos: ["Se cambia junto con el aceite de motor.", "Honda recomienda que lo haga el concesionario si no tiene herramientas y experiencia."], materiales: ["Filtro de aceite original Honda"] },
        { id: "correa", nombre: "Revisión de correa de distribución", tiempos: "4T", cada: { horas: 200, meses: 12 }, quien: "mecanico", segun: "Honda", porque: "Si la correa se corta, el motor se detiene y puede dañarse.", pasos: ["Honda indica revisarla y ajustarla una vez por año o cada 200 horas.", "Tarea de concesionario o taller."], materiales: [] }
      ],
      consejos: [
        "Al arrancar, verificar que no haya ruidos raros y que el testigo tire agua con fuerza.",
        "Revisar el nivel de aceite del motor antes de cada uso, con el motor vertical.",
        "Uso profesional o comercial: llevar registro de horas para acortar los intervalos."
      ]
    },
    "honda-25-30": {
      nombre: "Base Honda BF25D / BF30D",
      estado: "completo",
      fuente: "Manual del propietario oficial Honda BF25D / BF30D (31ZW2651). Modelos anteriores pueden diferir",
      datosTecnicos: [
        { dato: "Motor", valor: "4 tiempos, OHC, 3 cilindros en línea" },
        { dato: "Cilindrada", valor: "552 cc" },
        { dato: "Alimentación", valor: "Carburador" },
        { dato: "Encendido", valor: "Digital (ICM)" },
        { dato: "Aceite de motor", valor: "SAE 10W-30 API SG/SH/SJ · 1,6 L sin cambio de filtro" },
        { dato: "Aceite de cola", valor: "Hipoide SAE 90 API GL-4 · 0,27 L" },
        { dato: "Bujía", valor: "NGK DR7EA o Denso X22ESR-U" },
        { dato: "Luz de bujía", valor: "0,6 a 0,7 mm" },
        { dato: "Ralentí", valor: "950 ± 50 rpm" },
        { dato: "Rango a fondo", valor: "5000 a 6000 rpm" },
        { dato: "Luz de válvulas (en frío)", valor: "Escape 0,20 ± 0,02 mm (taller)" },
        { dato: "Nafta", valor: "Sin plomo, 86 octanos (R+M)/2 o más" },
        { dato: "Tanque", valor: "25 litros" },
        { dato: "Refrigeración", valor: "Por agua, con termostato" }
      ],
      ajustes: {
        "aceite-motor": { segun: "Honda", cada: { horas: 100, meses: 6, primeraHoras: 20 }, notaMarca: "Honda: primer cambio al mes o a las 20 horas y después cada 100 horas o 6 meses. Revisar el nivel antes de cada uso. El filtro de aceite se cambia cada 200 horas o una vez por año." },
        "aceite-cola": { segun: "Honda", cada: { horas: 100, meses: 6, primeraHoras: 20 }, notaMarca: "Honda: primer cambio al mes o a las 20 horas y después cada 100 horas o 6 meses. Tarea de concesionario si no tiene experiencia." },
        "bujias": { segun: "Honda", cada: { horas: 100, meses: 6 }, notaMarca: "Honda: revisar, calibrar o cambiar cada 100 horas o 6 meses." },
        "engrase": { segun: "Honda", cada: { horas: 100, meses: 6, primeraHoras: 20 }, notaMarca: "Honda: engrasar al mes o a las 20 horas y después cada 100 horas o 6 meses. Engrasar más seguido si navega en agua salada." },
        "anodos": { segun: "Honda", cada: { usos: true }, notaMarca: "Honda: revisar el ánodo exterior en cada uso y cambiarlo cuando se redujo a un tercio de su tamaño o se desarma. Los ánodos internos los revisa el concesionario cada 2 años o 400 horas." },
        "helice": { segun: "Honda", cada: { usos: true }, notaMarca: "Honda: revisar hélice y pasador antes de cada uso." },
        "filtro-combustible": { segun: "Honda", cada: { horas: 100, meses: 6 }, notaMarca: "Honda: revisar el filtro de baja presión (agua y suciedad) cada 100 horas o 6 meses y cambiarlo cada 2 años o 400 horas. Limpiar el tanque y su filtro una vez por año o cada 200 horas." },
        "impulsor": { segun: "Honda", cada: { horas: 200, meses: 12 }, notaMarca: "Honda: revisar la bomba de agua una vez por año o cada 200 horas. Tarea de concesionario." },
        "termostato": { segun: "Honda", cada: { horas: 200, meses: 12 }, notaMarca: "Honda: revisar una vez por año o cada 200 horas. Tarea de concesionario." },
        "valvulas": { segun: "Honda", cada: { horas: 200, meses: 12 }, notaMarca: "Honda: controlar y ajustar la luz de válvulas una vez por año o cada 200 horas. Tarea de concesionario." },
        "enjuague": { segun: "Honda", notaMarca: "Honda: después de cada uso en agua salada, turbia o con barro, enjuagar el sistema de refrigeración con agua dulce." }
      },
      tareasExtra: [
        { id: "filtro-aceite", nombre: "Cambio de filtro de aceite", tiempos: "4T", cada: { horas: 200, meses: 12 }, quien: "mecanico", segun: "Honda", porque: "Retiene las partículas del aceite. Honda indica cambiarlo una vez por año o cada 200 horas.", pasos: ["Se cambia junto con el aceite de motor.", "Honda recomienda que lo haga el concesionario si no tiene herramientas y experiencia."], materiales: ["Filtro de aceite original Honda"] },
        { id: "correa", nombre: "Revisión de correa de distribución", tiempos: "4T", cada: { horas: 200, meses: 12 }, quien: "mecanico", segun: "Honda", porque: "Si la correa se corta, el motor se detiene y puede dañarse.", pasos: ["Honda indica revisarla y ajustarla una vez por año o cada 200 horas.", "Tarea de concesionario o taller."], materiales: [] }
      ],
      consejos: [
        "Al arrancar, verificar que no haya ruidos raros y que el testigo tire agua con fuerza.",
        "Revisar el nivel de aceite del motor antes de cada uso, con el motor vertical.",
        "Uso profesional o comercial: llevar registro de horas para acortar los intervalos."
      ]
    },
    "honda-40-50": {
      nombre: "Base Honda BF40D / BF50D",
      estado: "completo",
      fuente: "Manual del propietario oficial Honda BF40D / BF50D (31ZZ4644, 2021). Los BF40A / BF50A a carburador son otro motor",
      datosTecnicos: [
        { dato: "Motor", valor: "4 tiempos, OHC, 3 cilindros en línea" },
        { dato: "Cilindrada", valor: "808 cc" },
        { dato: "Alimentación", valor: "Inyección electrónica (PGM-FI)" },
        { dato: "Encendido", valor: "Transistorizado" },
        { dato: "Aceite de motor", valor: "SAE 10W-30 API SG/SH/SJ/SL · 2,0 L" },
        { dato: "Aceite de cola", valor: "Hipoide SAE 90 API GL-4 · 0,41 L" },
        { dato: "Bujía", valor: "NGK DR7EB o Denso X22ESR-UB" },
        { dato: "Luz de bujía", valor: "0,6 a 0,7 mm" },
        { dato: "Ralentí", valor: "850 ± 50 rpm" },
        { dato: "Nafta", valor: "Sin plomo, 86 octanos (R+M)/2 o más" },
        { dato: "Refrigeración", valor: "Por agua, con termostato" }
      ],
      ajustes: {
        "aceite-motor": { segun: "Honda", cada: { horas: 100, meses: 6, primeraHoras: 20 }, notaMarca: "Honda: primer cambio al mes o a las 20 horas y después cada 100 horas o 6 meses. Revisar el nivel antes de cada uso. El filtro de aceite se cambia cada 200 horas o una vez por año." },
        "aceite-cola": { segun: "Honda", cada: { horas: 100, meses: 6, primeraHoras: 20 }, notaMarca: "Honda: primer cambio al mes o a las 20 horas y después cada 100 horas o 6 meses. Tarea de concesionario si no tiene experiencia." },
        "bujias": { segun: "Honda", cada: { horas: 100, meses: 6 }, notaMarca: "Honda: revisar, calibrar o cambiar cada 100 horas o 6 meses." },
        "engrase": { segun: "Honda", cada: { horas: 100, meses: 6, primeraHoras: 20 }, notaMarca: "Honda: engrasar al mes o a las 20 horas y después cada 100 horas o 6 meses. Engrasar más seguido si navega en agua salada." },
        "anodos": { segun: "Honda", cada: { usos: true }, notaMarca: "Honda: revisar el ánodo exterior en cada uso y cambiarlo cuando se redujo a un tercio de su tamaño o se desarma. Los ánodos internos los revisa el concesionario cada 2 años o 400 horas." },
        "helice": { segun: "Honda", cada: { usos: true }, notaMarca: "Honda: revisar hélice y pasador antes de cada uso." },
        "filtro-combustible": { segun: "Honda", cada: { horas: 100, meses: 6 }, notaMarca: "Honda: revisar el filtro de baja presión (agua y suciedad) cada 100 horas o 6 meses y cambiarlo cada 2 años o 400 horas. Limpiar el tanque y su filtro una vez por año o cada 200 horas." },
        "impulsor": { segun: "Honda", cada: { horas: 200, meses: 12 }, notaMarca: "Honda: revisar la bomba de agua una vez por año o cada 200 horas. Tarea de concesionario." },
        "termostato": { segun: "Honda", cada: { horas: 200, meses: 12 }, notaMarca: "Honda: revisar una vez por año o cada 200 horas. Tarea de concesionario." },
        "valvulas": { segun: "Honda", cada: { horas: 200, meses: 12 }, notaMarca: "Honda: controlar y ajustar la luz de válvulas una vez por año o cada 200 horas. Tarea de concesionario." },
        "enjuague": { segun: "Honda", notaMarca: "Honda: después de cada uso en agua salada, turbia o con barro, enjuagar el sistema de refrigeración con agua dulce." }
      },
      tareasExtra: [
        { id: "filtro-aceite", nombre: "Cambio de filtro de aceite", tiempos: "4T", cada: { horas: 200, meses: 12 }, quien: "mecanico", segun: "Honda", porque: "Retiene las partículas del aceite. Honda indica cambiarlo una vez por año o cada 200 horas.", pasos: ["Se cambia junto con el aceite de motor.", "Honda recomienda que lo haga el concesionario si no tiene herramientas y experiencia."], materiales: ["Filtro de aceite original Honda"] },
        { id: "correa", nombre: "Revisión de correa de distribución", tiempos: "4T", cada: { horas: 200, meses: 12 }, quien: "mecanico", segun: "Honda", porque: "Si la correa se corta, el motor se detiene y puede dañarse.", pasos: ["Honda indica revisarla y ajustarla una vez por año o cada 200 horas.", "Tarea de concesionario o taller."], materiales: [] }
      ],
      consejos: [
        "Al arrancar, verificar que no haya ruidos raros y que el testigo tire agua con fuerza.",
        "Revisar el nivel de aceite del motor antes de cada uso, con el motor vertical.",
        "Uso profesional o comercial: llevar registro de horas para acortar los intervalos."
      ]
    },
    "honda-60": {
      nombre: "Base Honda BF60A",
      estado: "completo",
      fuente: "Manual del propietario oficial Honda BF60A / BFP60A (31ZZ3630, 2022)",
      datosTecnicos: [
        { dato: "Motor", valor: "4 tiempos, OHC, 3 cilindros en línea" },
        { dato: "Cilindrada", valor: "998 cc" },
        { dato: "Alimentación", valor: "Inyección electrónica (PGM-FI)" },
        { dato: "Encendido", valor: "Transistorizado" },
        { dato: "Aceite de motor", valor: "SAE 10W-30 API SG/SH/SJ · 2,6 L sin filtro / 2,7 L con filtro" },
        { dato: "Aceite de cola", valor: "Hipoide SAE 90 API GL-4 · BF60A: 0,43 L · BFP60A: 0,95 L" },
        { dato: "Bujía", valor: "NGK LMAR6C-9" },
        { dato: "Luz de bujía", valor: "0,8 a 0,9 mm" },
        { dato: "Ralentí", valor: "850 ± 50 rpm" },
        { dato: "Rango a fondo", valor: "5000 a 6000 rpm" },
        { dato: "Nafta", valor: "Sin plomo, 86 octanos (R+M)/2 o más" },
        { dato: "Refrigeración", valor: "Por agua, con termostato" }
      ],
      ajustes: {
        "aceite-motor": { segun: "Honda", cada: { horas: 100, meses: 6, primeraHoras: 20 }, notaMarca: "Honda: primer cambio al mes o a las 20 horas y después cada 100 horas o 6 meses. Revisar el nivel antes de cada uso. El filtro de aceite se cambia cada 200 horas o una vez por año." },
        "aceite-cola": { segun: "Honda", cada: { horas: 100, meses: 6, primeraHoras: 20 }, notaMarca: "Honda: primer cambio al mes o a las 20 horas y después cada 100 horas o 6 meses. Tarea de concesionario si no tiene experiencia." },
        "bujias": { segun: "Honda", cada: { horas: 100, meses: 6 }, notaMarca: "Honda: revisar, calibrar o cambiar cada 100 horas o 6 meses." },
        "engrase": { segun: "Honda", cada: { horas: 100, meses: 6, primeraHoras: 20 }, notaMarca: "Honda: engrasar al mes o a las 20 horas y después cada 100 horas o 6 meses. Engrasar más seguido si navega en agua salada." },
        "anodos": { segun: "Honda", cada: { usos: true }, notaMarca: "Honda: revisar el ánodo exterior en cada uso y cambiarlo cuando se redujo a un tercio de su tamaño o se desarma. Los ánodos internos los revisa el concesionario cada 2 años o 400 horas." },
        "helice": { segun: "Honda", cada: { usos: true }, notaMarca: "Honda: revisar hélice y pasador antes de cada uso." },
        "filtro-combustible": { segun: "Honda", cada: { horas: 100, meses: 6 }, notaMarca: "Honda: revisar el filtro de baja presión (agua y suciedad) cada 100 horas o 6 meses y cambiarlo cada 2 años o 400 horas. Limpiar el tanque y su filtro una vez por año o cada 200 horas." },
        "impulsor": { segun: "Honda", cada: { horas: 200, meses: 12 }, notaMarca: "Honda: revisar la bomba de agua una vez por año o cada 200 horas. Tarea de concesionario." },
        "termostato": { segun: "Honda", cada: { horas: 200, meses: 12 }, notaMarca: "Honda: revisar una vez por año o cada 200 horas. Tarea de concesionario." },
        "valvulas": { segun: "Honda", cada: { horas: 200, meses: 12 }, notaMarca: "Honda: controlar y ajustar la luz de válvulas una vez por año o cada 200 horas. Tarea de concesionario." },
        "enjuague": { segun: "Honda", notaMarca: "Honda: después de cada uso en agua salada, turbia o con barro, enjuagar el sistema de refrigeración con agua dulce." }
      },
      tareasExtra: [
        { id: "filtro-aceite", nombre: "Cambio de filtro de aceite", tiempos: "4T", cada: { horas: 200, meses: 12 }, quien: "mecanico", segun: "Honda", porque: "Retiene las partículas del aceite. Honda indica cambiarlo una vez por año o cada 200 horas.", pasos: ["Se cambia junto con el aceite de motor.", "Honda recomienda que lo haga el concesionario si no tiene herramientas y experiencia."], materiales: ["Filtro de aceite original Honda"] },
        { id: "correa", nombre: "Revisión de correa de distribución", tiempos: "4T", cada: { horas: 200, meses: 12 }, quien: "mecanico", segun: "Honda", porque: "Si la correa se corta, el motor se detiene y puede dañarse.", pasos: ["Honda indica revisarla y ajustarla una vez por año o cada 200 horas.", "Tarea de concesionario o taller."], materiales: [] }
      ],
      consejos: [
        "Al arrancar, verificar que no haya ruidos raros y que el testigo tire agua con fuerza.",
        "Revisar el nivel de aceite del motor antes de cada uso, con el motor vertical.",
        "Uso profesional o comercial: llevar registro de horas para acortar los intervalos."
      ]
    },
    "honda-75-90": {
      nombre: "Base Honda BF75D / BF90D",
      estado: "completo",
      fuente: "Manual del propietario oficial Honda BF75D / BF90D / BF100A (31ZZ0609)",
      datosTecnicos: [
        { dato: "Motor", valor: "4 tiempos, OHC VTEC, 4 cilindros en línea" },
        { dato: "Cilindrada", valor: "1497 cc" },
        { dato: "Alimentación", valor: "Inyección electrónica (PGM-FI)" },
        { dato: "Encendido", valor: "Transistorizado" },
        { dato: "Aceite de motor", valor: "SAE 10W-30 API SG/SH/SJ/SL · 4,2 L sin cambio de filtro" },
        { dato: "Aceite de cola", valor: "Hipoide SAE 90 API GL-4 · 0,95 L" },
        { dato: "Bujía", valor: "NGK ZFR6K-9E (opcional iridio IZFR6K-11E)" },
        { dato: "Luz de bujía", valor: "0,8 a 0,9 mm (iridio: 1,0 a 1,3 mm)" },
        { dato: "Ralentí", valor: "750 ± 50 rpm" },
        { dato: "Nafta", valor: "Sin plomo, 86 octanos (R+M)/2 o más" },
        { dato: "Refrigeración", valor: "Por agua, con termostato" }
      ],
      ajustes: {
        "aceite-motor": { segun: "Honda", cada: { horas: 100, meses: 6, primeraHoras: 20 }, notaMarca: "Honda: primer cambio al mes o a las 20 horas y después cada 100 horas o 6 meses. Revisar el nivel antes de cada uso. El filtro de aceite se cambia cada 200 horas o una vez por año." },
        "aceite-cola": { segun: "Honda", cada: { horas: 100, meses: 6, primeraHoras: 20 }, notaMarca: "Honda: primer cambio al mes o a las 20 horas y después cada 100 horas o 6 meses. Tarea de concesionario si no tiene experiencia." },
        "bujias": { segun: "Honda", cada: { horas: 100, meses: 6 }, notaMarca: "Honda: revisar, calibrar o cambiar cada 100 horas o 6 meses. La bujía de iridio opcional se revisa una vez por año y se cambia cada 2 años o 400 horas." },
        "engrase": { segun: "Honda", cada: { horas: 100, meses: 6, primeraHoras: 20 }, notaMarca: "Honda: engrasar al mes o a las 20 horas y después cada 100 horas o 6 meses. Engrasar más seguido si navega en agua salada." },
        "anodos": { segun: "Honda", cada: { usos: true }, notaMarca: "Honda: revisar el ánodo exterior en cada uso y cambiarlo cuando se redujo a un tercio de su tamaño o se desarma. Los ánodos internos los revisa el concesionario cada 2 años o 400 horas." },
        "helice": { segun: "Honda", cada: { usos: true }, notaMarca: "Honda: revisar hélice y pasador antes de cada uso." },
        "filtro-combustible": { segun: "Honda", cada: { horas: 100, meses: 6 }, notaMarca: "Honda: revisar el filtro de baja presión (agua y suciedad) cada 100 horas o 6 meses y cambiarlo cada 2 años o 400 horas. Limpiar el tanque y su filtro una vez por año o cada 200 horas." },
        "impulsor": { segun: "Honda", cada: { horas: 200, meses: 12 }, notaMarca: "Honda: revisar la bomba de agua una vez por año o cada 200 horas. Tarea de concesionario." },
        "termostato": { segun: "Honda", cada: { horas: 200, meses: 12 }, notaMarca: "Honda: revisar una vez por año o cada 200 horas. Tarea de concesionario." },
        "valvulas": { segun: "Honda", cada: { horas: 200, meses: 12 }, notaMarca: "Honda: controlar y ajustar la luz de válvulas una vez por año o cada 200 horas. Tarea de concesionario." },
        "enjuague": { segun: "Honda", notaMarca: "Honda: después de cada uso en agua salada, turbia o con barro, enjuagar el sistema de refrigeración con agua dulce." }
      },
      tareasExtra: [
        { id: "filtro-aceite", nombre: "Cambio de filtro de aceite", tiempos: "4T", cada: { horas: 200, meses: 12 }, quien: "mecanico", segun: "Honda", porque: "Retiene las partículas del aceite. Honda indica cambiarlo una vez por año o cada 200 horas.", pasos: ["Se cambia junto con el aceite de motor.", "Honda recomienda que lo haga el concesionario si no tiene herramientas y experiencia."], materiales: ["Filtro de aceite original Honda"] },
        { id: "correa", nombre: "Revisión de correa de distribución", tiempos: "4T", cada: { horas: 200, meses: 12 }, quien: "mecanico", segun: "Honda", porque: "Si la correa se corta, el motor se detiene y puede dañarse.", pasos: ["Honda indica revisarla y ajustarla una vez por año o cada 200 horas.", "Tarea de concesionario o taller."], materiales: [] }
      ],
      consejos: [
        "Al arrancar, verificar que no haya ruidos raros y que el testigo tire agua con fuerza.",
        "Revisar el nivel de aceite del motor antes de cada uso, con el motor vertical.",
        "Uso profesional o comercial: llevar registro de horas para acortar los intervalos."
      ]
    },
    "tohatsu-40-50-tldi": {
      estado: "completo",
      fuente: "Manual de servicio oficial Tohatsu TLDI 40/50 (inyección directa), de la carpeta de Juan",
      datosTecnicos: [
        { dato: "Motor", valor: "2 tiempos, 3 cilindros en línea, inyección directa TLDI" },
        { dato: "Cilindrada", valor: "697 cc (68 × 64 mm)" },
        { dato: "Lubricación", valor: "Mezcla automática (tanque de aceite de 2 L, con filtro)" },
        { dato: "Aceite 2T", valor: "Original Tohatsu o TC-W aprobado" },
        { dato: "Nafta", valor: "Común sin plomo" },
        { dato: "Encendido", valor: "L-CDI con avance electrónico, orden 1-2-3" },
        { dato: "Bujía", valor: "Champion RC10ECC" },
        { dato: "Luz de bujía", valor: "1,0 a 1,1 mm" },
        { dato: "Ralentí y trolling", valor: "700 rpm" },
        { dato: "Rango a fondo", valor: "5150 a 5850 rpm" },
        { dato: "Aceite de cola", valor: "Original o API GL5 SAE 80/90 · 500 ml" },
        { dato: "Relación de cola", valor: "1,85 (13:24)" },
        { dato: "Batería", valor: "12 V 100 Ah (120 Ah con frío)" }
      ],
      ajustes: {
        "aceite-cola": { segun: "Tohatsu", cada: { horas: 100, meses: 6, primeraHoras: 10 }, notaMarca: "Tohatsu: cambiar a las 10 horas (o a los 2 meses). Después revisar nivel y si entra agua cada 50 horas o 3 meses, y completar o cambiar según estado." },
        "bujias": { segun: "Tohatsu", cada: { horas: 100, meses: 6, primeraHoras: 30 }, notaMarca: "Tohatsu: revisar a las 30 horas y después cada 100 horas o 6 meses. Sacar el carbón y calibrar a 1,0–1,1 mm." },
        "impulsor": { segun: "el taller", cada: { horas: 200, meses: 36 }, cadaTrabajo: { meses: 12 }, notaMarca: "Criterio del taller: controlar la bomba de agua cada 100 horas; cambiar el impulsor cada 3 años en uso recreativo y cada 12 meses en uso de trabajo (alquiler, pesca, transporte). El manual Tohatsu dice: revisar cada 50 horas o 3 meses y cambiar el impulsor una vez por año o cada 200 horas." },
        "filtro-combustible": { segun: "Tohatsu", cada: { horas: 200, meses: 24 }, notaMarca: "Tohatsu: revisar el filtro de alta presión desde las 50 horas y cambiar el cartucho completo cada 200 horas o 2 años. Limpiar el tanque y su filtro cada 100 horas o 6 meses." },
        "anodos": { segun: "Tohatsu", cada: { horas: 50, meses: 3 }, notaMarca: "Tohatsu: revisar corrosión y desgaste cada 50 horas o 3 meses." },
        "engrase": { segun: "Tohatsu", cada: { horas: 50, meses: 3 }, notaMarca: "Tohatsu: engrasar las piezas móviles y los alemites cada 50 horas o 3 meses." },
        "helice": { segun: "Tohatsu", cada: { horas: 50, meses: 3, primeraHoras: 10 }, notaMarca: "Tohatsu: revisar desgaste, golpes y que no patine el buje de goma a las 10 y 30 horas, y después cada 50 horas o 3 meses." }
      },
      tareasExtra: [
        { id: "tanque-aceite", nombre: "Revisión del tanque, las mangueras y el filtro de aceite", tiempos: "2T", cada: { horas: 100, meses: 6, primeraHoras: 10 }, quien: "usuario", segun: "Tohatsu", porque: "Si no llega aceite, el motor se funde.", pasos: ["Tohatsu: revisar a las 10 horas y después cada 100 horas o 6 meses.", "Buscar pérdidas y abrazaderas flojas, y lavar el filtro."], materiales: [] },
        { id: "filtro-aire", nombre: "Cambio del filtro de aire del compresor", cada: { horas: 200, meses: 24 }, quien: "mecanico", segun: "Tohatsu", porque: "El sistema TLDI usa aire comprimido para inyectar la nafta.", pasos: ["Tohatsu: revisar una vez por año y cambiar cada 200 horas o 2 años."], materiales: [] },
        { id: "correa-compresor", nombre: "Cambio de la correa del compresor", cada: { horas: 200, meses: 24 }, quien: "mecanico", segun: "Tohatsu", porque: "Si la correa se corta, no hay presión de aire para inyectar.", pasos: ["Tohatsu: revisar una vez por año y cambiar cada 200 horas o 2 años."], materiales: [] },
        { id: "trim", nombre: "Revisión del trim hidráulico", cada: { horas: 100, meses: 6, primeraHoras: 10 }, quien: "usuario", segun: "Tohatsu", porque: "Con poco líquido, el trim no levanta el motor.", pasos: ["Tohatsu: revisar y completar el aceite y probarlo a mano a las 10 horas y después cada 100 horas o 6 meses."], materiales: [] }
      ],
      consejos: [
        "Tohatsu recomienda una reparación general del motor cada 300 horas de uso.",
        "Las presiones de nafta y de aire del sistema TLDI se controlan en el taller una vez por año."
      ]
    },
    "mercury-75-115-4t": {
      estado: "completo",
      fuente: "Manual oficial de operación y mantenimiento Mercury 75 a 115 FourStroke 2,1 L (8M0108376, 2015-2016) y curso de servicio oficial Mercury 75-90-115 FourStroke (2017)",
      datosTecnicos: [
        { dato: "Motor", valor: "4 cilindros en línea, SOHC, 8 válvulas, orden 1-3-4-2" },
        { dato: "Cilindrada", valor: "2061 cc (2,1 L)" },
        { dato: "Alimentación", valor: "Inyección multipunto (MPI EFI)" },
        { dato: "Aceite de motor", valor: "Mercury 4T SAE 10W-30 · 5,2 L con filtro" },
        { dato: "Filtro de aceite", valor: "Mercury 35-8M0065104 (Quicksilver 35-8M0065103)" },
        { dato: "Bujía", valor: "NGK ZFR5F" },
        { dato: "Luz de bujía", valor: "0,8 mm" },
        { dato: "Rango a fondo", valor: "75: 4500 a 5500 rpm · 90 y 115: 5000 a 6000 rpm" },
        { dato: "Relación de cola", valor: "2,07:1 (estándar) · 2,38:1 (Command Thrust)" },
        { dato: "Aceite de cola", valor: "Mercury High Performance Gear Lube · estándar: 800 ml · Command Thrust: 810 ml (rotación derecha) o 790 ml (izquierda)" },
        { dato: "Nafta", valor: "Sin plomo, 90 RON o más" },
        { dato: "Diagnóstico", valor: "CDS G3, versión 1.5.3 o superior" }
      ],
      ajustes: {
        "aceite-motor": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: revisar el nivel antes de cada uso. Cambiar aceite y filtro cada 100 horas o una vez por año." },
        "aceite-cola": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: drenar y cambiar el aceite de la cola cada 100 horas o una vez por año." },
        "filtro-combustible": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: revisar o cambiar el filtro de baja presión (35-879885) cada 100 horas o una vez por año, y cambiar el filtro de alta presión (35-8M0090809) cada 300 horas." },
        "termostato": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: revisar el termostato cada 100 horas o una vez por año." },
        "anodos": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: revisar los ánodos cada 100 horas o una vez por año, y cambiarlos si hace falta." },
        "bujias": { segun: "Mercury", cada: { horas: 300, meses: 36 }, notaMarca: "Mercury: cambiar las bujías a las primeras 300 horas o 3 años, y después revisarlas cada 300 horas o 3 años. En agua salada, revisarlas cada 100 horas o una vez por año." },
        "impulsor": { segun: "Mercury", cada: { horas: 300, meses: 36 }, notaMarca: "Mercury: cambiar el impulsor de la bomba de agua cada 300 horas o 3 años (kit 8M0094530)." },
        "engrase": { segun: "Mercury", cada: { horas: 300 }, notaMarca: "Mercury: engrasar las estrías del eje de la cola cada 300 horas." }
      },
      tareasExtra: [
        { id: "trim", nombre: "Revisión del aceite del trim", tiempos: "4T", cada: { horas: 300, meses: 36 }, quien: "usuario", segun: "Mercury", porque: "Con poco líquido, el trim no levanta el motor.", pasos: ["Mercury indica revisarlo cada 300 horas, con Mercury Power Trim and Steering Fluid."], materiales: [] }
      ],
      consejos: [
        "Revisar el nivel de aceite de motor antes de cada salida."
      ]
    },
    "mercury-40-60-4t-efi": {
      estado: "completo",
      fuente: "Manual de servicio oficial Mercury 40/50/60 FourStroke EFI (90-883065, 2001), de la carpeta de Juan",
      datosTecnicos: [
        { dato: "Motor", valor: "4 cilindros en línea, OHC, orden de encendido 1-3-4-2" },
        { dato: "Cilindrada", valor: "995 cc (65 × 75 mm)" },
        { dato: "Alimentación", valor: "Inyección electrónica (EFI)" },
        { dato: "Nafta", valor: "Sin plomo, 87 octanos (índice americano) o más" },
        { dato: "Aceite de motor", valor: "Quicksilver 4T náutico SAE 10W-30 (25W-40 con más de 4 °C) · 3,0 L" },
        { dato: "Filtro de aceite", valor: "Mercury 35-822626A2" },
        { dato: "Bujía", valor: "NGK DPR6EA-9 (equivale a Champion RA8HC)" },
        { dato: "Luz de bujía", valor: "1,0 mm" },
        { dato: "Ajuste de bujía", valor: "17 Nm" },
        { dato: "Luz de válvulas en frío", valor: "Admisión 0,15 a 0,25 mm · escape 0,25 a 0,35 mm" },
        { dato: "Ralentí", valor: "725 ± 25 rpm" },
        { dato: "Rango a fondo", valor: "5500 a 6000 rpm" },
        { dato: "Aceite de cola", valor: "Quicksilver Premium Blend · 340 ml (1,83:1) · Bigfoot: 710 ml (2,31:1)" }
      ],
      ajustes: {
        "enjuague": { segun: "Mercury", notaMarca: "Mercury: después de cada uso en agua salada o contaminada, enjuagar el circuito de refrigeración con el motor en marcha y lavar la salida de escape de la hélice y la cola." },
        "aceite-motor": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: revisar el nivel antes de cada uso. Cambiar aceite y filtro cada 100 horas o una vez por año, y más seguido si trabaja mucho al ralentí o en trolling." },
        "aceite-cola": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: drenar y cambiar el aceite de cola cada 100 horas o una vez por año." },
        "engrase": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: engrasar todos los puntos y las estrías del eje de transmisión cada 100 horas o una vez por año; más seguido en agua salada." },
        "bujias": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: revisar y limpiar las bujías cada 100 horas o una vez por año." },
        "filtro-combustible": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: revisar el filtro de nafta del motor cada 100 horas o una vez por año." },
        "anodos": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: revisar los ánodos cada 100 horas o una vez por año, y más seguido en agua salada." },
        "termostato": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: revisar el termostato cada 100 horas o una vez por año (corrosión, resorte roto y que cierre a temperatura ambiente)." },
        "valvulas": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: revisar y ajustar la luz de válvulas, si hace falta, cada 100 horas o una vez por año." },
        "impulsor": { segun: "Mercury", cada: { horas: 300, meses: 36 }, notaMarca: "Mercury: cambiar el impulsor cada 300 horas o 3 años, o antes si recalienta o baja la presión de agua." },
        "helice": { segun: "Mercury", notaMarca: "Mercury: revisar las palas de la hélice antes de cada uso." }
      },
      tareasExtra: [
        { id: "correa", nombre: "Revisión de correa de distribución", tiempos: "4T", cada: { horas: 100, meses: 12 }, quien: "mecanico", segun: "Mercury", porque: "Si la correa se corta, el motor se detiene y puede dañarse.", pasos: ["Mercury indica revisarla cada 100 horas o una vez por año."], materiales: [] },
        { id: "trim", nombre: "Revisión del líquido del trim", tiempos: "4T", cada: { horas: 100, meses: 12 }, quien: "usuario", segun: "Mercury", porque: "Con poco líquido, el trim no levanta el motor.", pasos: ["Mercury indica revisar el nivel cada 100 horas o una vez por año."], materiales: [] }
      ],
      consejos: [
        "Cada 100 horas, Mercury también indica revisar la batería, los cables de comando y el ajuste de tuercas y bulones, y limpiar los depósitos del motor con Quicksilver Power Tune."
      ]
    },
    "mercury-40-60-2t-usa": {
      estado: "completo",
      fuente: "Manual de servicio oficial Mercury 40/50/55/60 (90-852572R1, 1998), serie EE. UU. 0G531301 en adelante",
      datosTecnicos: [
        { dato: "Cilindros", valor: "3 en línea, barrido en lazo (loop charged)" },
        { dato: "Cilindrada", valor: "967 cc (76 × 71 mm)" },
        { dato: "Encendido", valor: "Descarga capacitiva (CDI), orden 1-2-3" },
        { dato: "Lubricación", valor: "Arranque manual: mezcla 50:1. Arranque eléctrico (ELO, ELPTO): inyección de aceite, nafta sola" },
        { dato: "Mezcla en el rodaje", valor: "Arranque manual: 50:1 (igual que después del rodaje). Arranque eléctrico: 50:1 en el tanque, además de la inyección" },
        { dato: "Aceite 2T", valor: "Quicksilver TC-WII o TC-W3" },
        { dato: "Nafta", valor: "Sin plomo, 87 octanos (índice americano) o más" },
        { dato: "Bujía NGK", valor: "BP8H-N-10 (o BPZ8H-N-10)" },
        { dato: "Luz de bujía", valor: "1,0 mm" },
        { dato: "Ralentí", valor: "675 ± 25 rpm" },
        { dato: "Rango a fondo", valor: "5000 a 5500 rpm" },
        { dato: "Aceite de cola", valor: "Quicksilver Premium Blend · 40/50: 440 ml (1,83:1) · 55/60: 340 ml (1,64:1) · 60 Bigfoot: 655 ml (2,3:1)" },
        { dato: "Presión de agua", valor: "40/50: 0,5 a 1,5 PSI al ralentí y 5 a 7 PSI a fondo" },
        { dato: "Batería", valor: "350 CCA y 100 minutos de reserva como mínimo" }
      ],
      ajustes: {
        "enjuague": { segun: "Mercury", notaMarca: "Mercury: después de cada uso en agua salada o contaminada, enjuagar el circuito de refrigeración y lavar con agua dulce la salida de escape de la hélice y la cola." },
        "aceite-cola": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: drenar y cambiar el aceite de cola cada 100 horas o una vez por año." },
        "engrase": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: engrasar todos los puntos y las estrías del eje de transmisión cada 100 horas o una vez por año, y más seguido en agua salada." },
        "bujias": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: revisar y limpiar las bujías cada 100 horas o una vez por año." },
        "filtro-combustible": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: revisar el filtro de nafta del motor cada 100 horas o una vez por año. Antes de cada uso, revisar que no haya pérdidas en el sistema de combustible." },
        "anodos": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: revisar los ánodos cada 100 horas o una vez por año, y más seguido en agua salada." },
        "carburador": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: el concesionario ajusta los carburadores (si hace falta) y revisa la puesta a punto cada 100 horas o una vez por año." },
        "impulsor": { segun: "Mercury", cada: { horas: 300, meses: 36 }, notaMarca: "Mercury: cambiar el impulsor de la bomba de agua cada 300 horas o 3 años, o antes si recalienta o baja la presión de agua." },
        "helice": { segun: "Mercury", notaMarca: "Mercury: revisar las palas de la hélice antes de cada uso." }
      },
      consejos: [
        "En los modelos de arranque manual se usa 50:1 también en el rodaje, como indica el capítulo de combustible del manual de servicio (validado por el taller).",
        "Los modelos con inyección de aceite (ELO y ELPTO) llevan nafta sola en el tanque después del rodaje.",
        "Cada 100 horas, Mercury indica también revisar el líquido del trim, la batería, los cables de comando y el ajuste de tuercas y bulones, y limpiar los depósitos del motor con Quicksilver Power Tune."
      ]
    },
    "tohatsu-40c-2t": {
      nombre: "Base Tohatsu 40 HP 2T de 2 cilindros (M40C)",
      estado: "completo",
      fuente: "Manual de servicio Tohatsu M40C (1987), aportado por el taller",
      datosTecnicos: [
        { dato: "Cilindros", valor: "2" },
        { dato: "Cilindrada", valor: "493 cc (70 × 64 mm)" },
        { dato: "Encendido", valor: "CDI por volante magnético" },
        { dato: "Carburador", valor: "Keihin" },
        { dato: "Mezcla nafta/aceite", valor: "50:1 con aceite Tohatsu (20:1 en el rodaje después de una reparación de motor)" },
        { dato: "Bujía NGK", valor: "B7HS-10 (Champion L82YC)" },
        { dato: "Luz de bujía", valor: "0,9 a 1,0 mm" },
        { dato: "Aceite de cola", valor: "Tohatsu #80 · aprox. 470 cc" },
        { dato: "Ralentí", valor: "1000 a 1100 rpm en neutro · 850 a 950 rpm en marcha" },
        { dato: "Rango a fondo", valor: "5000 a 5800 rpm" },
        { dato: "Compresión estándar", valor: "7,0 kg/cm² a 500 rpm" },
        { dato: "Relación de cola", valor: "13:25" },
        { dato: "Refrigeración", valor: "Por agua, con termostato y válvula de alivio" },
        { dato: "Encendido (avance)", valor: "2° DPMS a 25° APMS" },
        { dato: "Hélice de serie", valor: "11 (3 palas, 268 × 287 mm)" },
        { dato: "Tanque", valor: "24 litros, separado" }
      ],
      ajustes: {
        "anodos": { segun: "Tohatsu", cada: { usos: true }, notaMarca: "Tohatsu: revisar corrosión y desgaste en cada uso." },
        "helice": { segun: "Tohatsu", cada: { usos: true }, notaMarca: "Tohatsu: revisar en cada uso y corregir o cambiar si hace falta." }
      },
      tareasExtra: [
        { id: "compresion", nombre: "Medición de compresión y descarbonizado", cada: { horas: 100 }, quien: "mecanico", segun: "Tohatsu",
          porque: "Detecta a tiempo el desgaste de aros y pistones. Estándar: 7,0 kg/cm² a 500 rpm.",
          pasos: ["Tohatsu recomienda medir la compresión cada 100 horas, con el motor caliente.", "En el mismo intervalo, limpiar la carbonilla de la cámara de combustión, el escape y las ranuras de los aros.", "Requiere manómetro y desarme: tarea de taller."], materiales: [] },
        { id: "conductos-agua", nombre: "Limpieza de conductos de refrigeración", cada: { horas: 100 }, quien: "mecanico", segun: "Tohatsu",
          porque: "La acumulación en los conductos causa recalentamiento por falta de caudal de agua.",
          pasos: ["Tohatsu indica limpiar cada 100 horas los conductos de la bomba, el caño de agua, el cilindro y la tapa de cilindros.", "Entre servicios, el enjuague con agua dulce después de cada uso ayuda a evitar depósitos."], materiales: [] }
      ],
      consejos: [
        "Tabla de fallas de Tohatsu: si no arranca o se apaga enseguida, revise primero el tanque vacío, la conexión de nafta, entradas de aire, el respiradero cerrado y el filtro, la bomba o el carburador tapados.",
        "Tabla de fallas de Tohatsu: si recalienta, las causas típicas son poco caudal de agua, termostato defectuoso, falta de aceite en la mezcla, hélice inadecuada o dañada y motor mal ubicado en el espejo.",
        "Un interruptor de parada (corte) en cortocircuito impide el arranque: es una falla que se pasa por alto.",
        "En cada uso: verificar que el testigo tire agua y que el embrague y la traba de marcha atrás funcionen bien."
      ]
    },
    "tohatsu-40-2t": {
      nombre: "Base Tohatsu 40 HP 2T de 3 cilindros (M40D2)",
      estado: "completo",
      fuente: "Manual del propietario oficial Tohatsu M40D2 / M50D2 (003-11038)",
      datosTecnicos: [
        { dato: "Cilindros", valor: "3" },
        { dato: "Cilindrada", valor: "697 cc (68 × 64 mm)" },
        { dato: "Encendido", valor: "CDI por volante magnético" },
        { dato: "Mezcla nafta/aceite", valor: "50:1 (rodaje: 25:1). Modelos con tanque de aceite (automezcla): aceite en el tanque y 50:1 en la nafta durante el rodaje" },
        { dato: "Aceite 2T", valor: "Original Tohatsu o náutico TC-W3, sin mezclar marcas" },
        { dato: "Nafta", valor: "Sin plomo, 91 RON o más, hasta 10 % de etanol" },
        { dato: "Bujía NGK", valor: "B7HS-10 (resistiva: BR7HS-10)" },
        { dato: "Luz de bujía", valor: "0,9 a 1,0 mm" },
        { dato: "Ajuste de bujía", valor: "27 Nm" },
        { dato: "Aceite de cola", valor: "API GL-5, SAE 80 a 90 · aprox. 500 ml" },
        { dato: "Ralentí", valor: "900 rpm en neutro · 750 rpm en marcha" },
        { dato: "Rango a fondo", valor: "5000 a 5700 rpm" },
        { dato: "Relación de cola", valor: "1,85 (24:13)" },
        { dato: "Ajuste tuerca de hélice", valor: "35 Nm" },
        { dato: "Fluido del trim (PTT)", valor: "ATF Dexron III" },
        { dato: "Tanque (modelo a piola)", valor: "25 litros" }
      ],
      ajustes: {
        "aceite-cola": { segun: "Tohatsu", cada: { horas: 100, meses: 6, primeraHoras: 10 }, notaMarca: "Tohatsu: controlar o cambiar a las 10 horas (o al mes), a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses. Revisar si hay agua en el aceite." },
        "filtro-combustible": { segun: "Tohatsu", cada: { horas: 100, meses: 6, primeraHoras: 10 }, notaMarca: "Tohatsu: revisar y limpiar el filtro y el tanque a las 10 h, a las 50 h y después cada 100 horas o 6 meses. Limpiar el tanque también después de más de 3 meses guardado." },
        "helice": { segun: "Tohatsu", cada: { horas: 100, meses: 6, primeraHoras: 10 }, notaMarca: "Tohatsu: además, revisar hélice y pasador antes y después de cada uso." },
        "impulsor": { segun: "el taller", cada: { meses: 36 }, cadaTrabajo: { meses: 12 }, notaMarca: "Criterio del taller: controlar la bomba de agua cada 100 horas; cambiar el impulsor cada 3 años en uso recreativo y cada 12 meses en uso de trabajo (alquiler, pesca, transporte). El manual Tohatsu dice: cambiar el impulsor cada 12 meses. Es tarea de concesionario o taller." },
        "bujias": { segun: "Tohatsu", cada: { horas: 100, meses: 6, primeraHoras: 10 }, notaMarca: "Tohatsu: revisar luz (0,9 a 1,0 mm) y limpiar carbonilla a las 10 h, a las 50 h y después cada 100 horas o 6 meses." },
        "engrase": { segun: "Tohatsu", cada: { horas: 100, meses: 6, primeraHoras: 50 }, notaMarca: "Tohatsu: engrasar piezas de giro y alemites a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses." },
        "anodos": { segun: "Tohatsu", cada: { horas: 100, meses: 6, primeraHoras: 50 }, notaMarca: "Tohatsu: revisar corrosión y deformación a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses; cambiar si hace falta." },
        "carburador": { segun: "Tohatsu", cada: { horas: 100, meses: 6, primeraHoras: 10 }, notaMarca: "Tohatsu: desarmar, limpiar y regular el ralentí a las 10 horas y después cada 100 horas o 6 meses. Tarea de taller. El manual recomienda una revisión completa a las 300 horas." },
        "invernaje": { segun: "Tohatsu", notaMarca: "Tohatsu: vaciar nafta de mangueras, bomba, filtro y carburador; poner una cucharadita de aceite por cada agujero de bujía y girar el motor varias veces; cambiar aceite de cola, engrasar y guardar vertical en lugar seco." }
      },
      consejos: [
        "Rodaje de 10 horas, en el agua y en marcha: primeros 10 minutos en ralentí; hasta las 2 horas, menos de media aceleración; de 2 a 3 horas, menos de 3/4; de 3 a 10 horas, 3/4 con tramos cortos a fondo. Después de 10 horas, uso normal.",
        "Si suena la alarma y el motor no pasa de unas 3500 rpm, el sistema de protección está actuando: revise el testigo de agua y, en modelos con tanque, el nivel de aceite.",
        "Si el motor se pasa de vueltas y la alarma limita a menos de 6300 rpm, revise la hélice: puede estar doblada o patinando.",
        "Uso intensivo (alquiler, trabajo, agua barrosa o poco profunda) requiere acortar los intervalos."
      ]
    },
    "tohatsu-50-2t": {
      nombre: "Base Tohatsu 50 HP 2T (M50D2)",
      estado: "completo",
      fuente: "Manual del propietario oficial Tohatsu M40D2 / M50D2 (003-11038)",
      datosTecnicos: [
        { dato: "Cilindros", valor: "3" },
        { dato: "Cilindrada", valor: "697 cc (68 × 64 mm)" },
        { dato: "Encendido", valor: "CDI por volante magnético" },
        { dato: "Mezcla nafta/aceite", valor: "50:1 (rodaje: 25:1). Modelos con tanque de aceite (automezcla): aceite en el tanque y 50:1 en la nafta durante el rodaje" },
        { dato: "Aceite 2T", valor: "Original Tohatsu o náutico TC-W3, sin mezclar marcas" },
        { dato: "Nafta", valor: "Sin plomo, 91 RON o más, hasta 10 % de etanol" },
        { dato: "Bujía NGK", valor: "B8HS-10 (resistiva: BR8HS-10)" },
        { dato: "Luz de bujía", valor: "0,9 a 1,0 mm" },
        { dato: "Ajuste de bujía", valor: "27 Nm" },
        { dato: "Aceite de cola", valor: "API GL-5, SAE 80 a 90 · aprox. 500 ml" },
        { dato: "Ralentí", valor: "900 rpm en neutro · 750 rpm en marcha" },
        { dato: "Rango a fondo", valor: "5150 a 5850 rpm" },
        { dato: "Relación de cola", valor: "1,85 (24:13)" },
        { dato: "Ajuste tuerca de hélice", valor: "35 Nm" },
        { dato: "Fluido del trim (PTT)", valor: "ATF Dexron III" },
        { dato: "Tanque (modelo a piola)", valor: "25 litros" }
      ],
      ajustes: {
        "aceite-cola": { segun: "Tohatsu", cada: { horas: 100, meses: 6, primeraHoras: 10 }, notaMarca: "Tohatsu: controlar o cambiar a las 10 horas (o al mes), a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses. Revisar si hay agua en el aceite." },
        "filtro-combustible": { segun: "Tohatsu", cada: { horas: 100, meses: 6, primeraHoras: 10 }, notaMarca: "Tohatsu: revisar y limpiar el filtro y el tanque a las 10 h, a las 50 h y después cada 100 horas o 6 meses. Limpiar el tanque también después de más de 3 meses guardado." },
        "helice": { segun: "Tohatsu", cada: { horas: 100, meses: 6, primeraHoras: 10 }, notaMarca: "Tohatsu: además, revisar hélice y pasador antes y después de cada uso." },
        "impulsor": { segun: "el taller", cada: { meses: 36 }, cadaTrabajo: { meses: 12 }, notaMarca: "Criterio del taller: controlar la bomba de agua cada 100 horas; cambiar el impulsor cada 3 años en uso recreativo y cada 12 meses en uso de trabajo (alquiler, pesca, transporte). El manual Tohatsu dice: cambiar el impulsor cada 12 meses. Es tarea de concesionario o taller." },
        "bujias": { segun: "Tohatsu", cada: { horas: 100, meses: 6, primeraHoras: 10 }, notaMarca: "Tohatsu: revisar luz (0,9 a 1,0 mm) y limpiar carbonilla a las 10 h, a las 50 h y después cada 100 horas o 6 meses." },
        "engrase": { segun: "Tohatsu", cada: { horas: 100, meses: 6, primeraHoras: 50 }, notaMarca: "Tohatsu: engrasar piezas de giro y alemites a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses." },
        "anodos": { segun: "Tohatsu", cada: { horas: 100, meses: 6, primeraHoras: 50 }, notaMarca: "Tohatsu: revisar corrosión y deformación a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses; cambiar si hace falta." },
        "carburador": { segun: "Tohatsu", cada: { horas: 100, meses: 6, primeraHoras: 10 }, notaMarca: "Tohatsu: desarmar, limpiar y regular el ralentí a las 10 horas y después cada 100 horas o 6 meses. Tarea de taller. El manual recomienda una revisión completa a las 300 horas." },
        "invernaje": { segun: "Tohatsu", notaMarca: "Tohatsu: vaciar nafta de mangueras, bomba, filtro y carburador; poner una cucharadita de aceite por cada agujero de bujía y girar el motor varias veces; cambiar aceite de cola, engrasar y guardar vertical en lugar seco." }
      },
      consejos: [
        "Rodaje de 10 horas, en el agua y en marcha: primeros 10 minutos en ralentí; hasta las 2 horas, menos de media aceleración; de 2 a 3 horas, menos de 3/4; de 3 a 10 horas, 3/4 con tramos cortos a fondo. Después de 10 horas, uso normal.",
        "Si suena la alarma y el motor no pasa de unas 3500 rpm, el sistema de protección está actuando: revise el testigo de agua y, en modelos con tanque, el nivel de aceite.",
        "Si el motor se pasa de vueltas y la alarma limita a menos de 6300 rpm, revise la hélice: puede estar doblada o patinando.",
        "Uso intensivo (alquiler, trabajo, agua barrosa o poco profunda) requiere acortar los intervalos."
      ]
    },
    "tohatsu-18-2t": {
      nombre: "Base Tohatsu 18 HP 2T (M18E2)",
      estado: "completo",
      fuente: "Manual del propietario oficial Tohatsu M9.9D2 / M15D2 / M18E2 (003-11049, 2018), completo",
      datosTecnicos: [
        { dato: "Base", valor: "Tohatsu M18E2, fabricado en Japón" },
        { dato: "Cilindros", valor: "2" },
        { dato: "Cilindrada", valor: "294 cc (60 × 52 mm)" },
        { dato: "Mezcla nafta/aceite", valor: "50:1 (rodaje: 25:1)" },
        { dato: "Aceite 2T", valor: "Original Tohatsu o náutico TC-W3" },
        { dato: "Nafta", valor: "Sin plomo, 91 RON o más, hasta 10 % de etanol" },
        { dato: "Bujía NGK", valor: "B7HS-10 (resistiva: BR7HS-10)" },
        { dato: "Luz de bujía", valor: "0,9 a 1,0 mm" },
        { dato: "Ajuste de bujía", valor: "25 Nm" },
        { dato: "Aceite de cola", valor: "API GL-5, SAE 80 a 90 · aprox. 370 ml" },
        { dato: "Ralentí", valor: "950 rpm en neutro · 800 rpm en marcha" },
        { dato: "Rango a fondo", valor: "5200 a 5800 rpm" },
        { dato: "Relación de cola", valor: "1,85 (13:24)" },
        { dato: "Ajuste de prensas de espejo", valor: "30 Nm" },
        { dato: "Tanque", valor: "25 litros" }
      ],
      ajustes: {
        "aceite-cola": { segun: "Tohatsu", cada: { horas: 100, meses: 6, primeraHoras: 10 }, notaMarca: "Tohatsu: controlar o cambiar a las 10 horas (o al mes), a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses. Revisar si hay agua en el aceite." },
        "filtro-combustible": { segun: "Tohatsu", cada: { horas: 100, meses: 6, primeraHoras: 10 }, notaMarca: "Tohatsu: revisar, limpiar o cambiar a las 10 h, a las 50 h y después cada 100 horas o 6 meses. Revisar también las mangueras. Limpiar el tanque si estuvo guardado más de 3 meses." },
        "helice": { segun: "Tohatsu", cada: { horas: 100, meses: 6, primeraHoras: 10 }, notaMarca: "Tohatsu: además, revisar hélice, tuerca y pasador antes de cada uso." },
        "impulsor": { segun: "el taller", cada: { meses: 36 }, cadaTrabajo: { meses: 12 }, notaMarca: "Criterio del taller: controlar la bomba de agua cada 100 horas; cambiar el impulsor cada 3 años en uso recreativo y cada 12 meses en uso de trabajo (alquiler, pesca, transporte). El manual Tohatsu dice: revisar desgaste a las 50 h y cada 100 h; cambiar el impulsor cada 12 meses. Es tarea de concesionario o taller." },
        "bujias": { segun: "Tohatsu", cada: { horas: 100, meses: 6, primeraHoras: 10 }, notaMarca: "Tohatsu: revisar luz (0,9 a 1,0 mm) y limpiar carbonilla o cambiar a las 10 horas (o al mes) y después cada 100 horas o 6 meses." },
        "engrase": { segun: "Tohatsu", cada: { horas: 100, meses: 6, primeraHoras: 50 }, notaMarca: "Tohatsu: engrasar piezas de giro y alemites a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses." },
        "anodos": { segun: "Tohatsu", cada: { horas: 100, meses: 6, primeraHoras: 50 }, notaMarca: "Tohatsu: revisar corrosión y deformación a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses; cambiar si hace falta." },
        "carburador": { segun: "Tohatsu", cada: { horas: 100, meses: 6 }, notaMarca: "Tohatsu: desarmar, limpiar y regular el ralentí cada 100 horas o 6 meses. Tarea de taller. El manual recomienda una revisión completa a las 300 horas." }
      },
      consejos: [
        "Rodaje de 10 horas, en el agua y en marcha, con mezcla 25:1: primeros 10 minutos en ralentí; hasta las 2 horas, menos de media aceleración; de 2 a 3 horas, menos de 3/4; de 3 a 10 horas, 3/4 con tramos cortos a fondo. Después de 10 horas, uso normal con 50:1.",
        "Calentamiento: 3 minutos a baja velocidad (con menos de 5 °C, 5 minutos a 2000 rpm) y verificar que el testigo tire agua."
      ]
    },
    "tohatsu-25-30-2t": {
      nombre: "Base Tohatsu 25/30 HP 2T",
      estado: "completo",
      fuente: "Manual del propietario oficial Tohatsu MX25H / MX30H (003-11099). Los modelos anteriores pueden diferir en cilindrada",
      datosTecnicos: [
        { dato: "Cilindros", valor: "2" },
        { dato: "Cilindrada", valor: "429 cc (68 × 59 mm) en el modelo actual; a confirmar en modelos anteriores" },
        { dato: "Encendido", valor: "CDI por volante magnético" },
        { dato: "Mezcla nafta/aceite", valor: "50:1 (rodaje: 25:1)" },
        { dato: "Aceite 2T", valor: "Original Tohatsu o náutico TC-W3" },
        { dato: "Nafta", valor: "Sin plomo, 91 RON o más, hasta 10 % de etanol" },
        { dato: "Bujía NGK", valor: "B7HS-10 (resistiva: BR7HS-10)" },
        { dato: "Luz de bujía", valor: "0,9 a 1,0 mm" },
        { dato: "Ajuste de bujía", valor: "27 Nm" },
        { dato: "Aceite de cola", valor: "API GL-5, SAE 80 a 90 · aprox. 360 ml" },
        { dato: "Ralentí", valor: "950 rpm en neutro · 800 rpm en marcha" },
        { dato: "Rango a fondo", valor: "25 HP: 5000 a 6000 rpm · 30 HP: 5150 a 5850 rpm" },
        { dato: "Relación de cola", valor: "1,92 (23:12)" },
        { dato: "Ajuste tuerca de hélice", valor: "25 Nm" },
        { dato: "Refrigeración", valor: "Por agua, con termostato" },
        { dato: "Tanque", valor: "25 litros, separado" }
      ],
      ajustes: {
        "aceite-cola": { segun: "Tohatsu", cada: { horas: 100, meses: 6, primeraHoras: 10 }, notaMarca: "Tohatsu: controlar o cambiar a las 10 horas (o al mes), a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses. Revisar si hay agua en el aceite." },
        "filtro-combustible": { segun: "Tohatsu", cada: { horas: 100, meses: 6, primeraHoras: 10 }, notaMarca: "Tohatsu: revisar, limpiar o cambiar a las 10 h, a las 50 h y después cada 100 horas o 6 meses. Revisar también las mangueras." },
        "helice": { segun: "Tohatsu", cada: { horas: 100, meses: 6, primeraHoras: 10 }, notaMarca: "Tohatsu: además, revisar hélice, tuerca y pasador antes de cada uso." },
        "impulsor": { segun: "el taller", cada: { meses: 36 }, cadaTrabajo: { meses: 12 }, notaMarca: "Criterio del taller: controlar la bomba de agua cada 100 horas; cambiar el impulsor cada 3 años en uso recreativo y cada 12 meses en uso de trabajo (alquiler, pesca, transporte). El manual Tohatsu dice: cambiar el impulsor cada 12 meses. Es tarea de concesionario o taller." },
        "bujias": { segun: "Tohatsu", cada: { horas: 100, meses: 6, primeraHoras: 10 }, notaMarca: "Tohatsu: revisar luz (0,9 a 1,0 mm) y limpiar carbonilla o cambiar a las 10 horas (o al mes) y después cada 100 horas o 6 meses." },
        "engrase": { segun: "Tohatsu", cada: { horas: 100, meses: 6, primeraHoras: 50 }, notaMarca: "Tohatsu: engrasar piezas de giro y alemites a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses." },
        "anodos": { segun: "Tohatsu", cada: { horas: 100, meses: 6, primeraHoras: 50 }, notaMarca: "Tohatsu: revisar corrosión y deformación a las 50 horas (o 3 meses) y después cada 100 horas o 6 meses; cambiar si hace falta." },
        "carburador": { segun: "Tohatsu", cada: { horas: 100, meses: 6 }, notaMarca: "Tohatsu: desarmar, limpiar y regular el ralentí cada 100 horas o 6 meses. Tarea de taller. El manual recomienda una revisión completa a las 300 horas." },
        "invernaje": { segun: "Tohatsu", notaMarca: "Tohatsu: vaciar nafta de mangueras, bomba, filtro y carburador; poner una cucharadita de aceite por cada agujero de bujía y tirar de la piola varias veces; cambiar aceite de cola, engrasar y guardar vertical en lugar seco. Al volver a usarlo: 3 minutos en neutro, 5 minutos despacio y 10 minutos a media aceleración." }
      },
      consejos: [
        "Rodaje de 10 horas, en el agua y en marcha, con mezcla 25:1: primeros 10 minutos en ralentí; hasta las 2 horas, menos de media aceleración; de 2 a 3 horas, menos de 3/4; de 3 a 10 horas, 3/4 con tramos cortos a fondo. Después de 10 horas, uso normal con 50:1.",
        "Uso intensivo (alquiler, trabajo, agua salobre o barrosa) requiere acortar los intervalos."
      ]
    }
  },

  /* -------------------------------------------------------------------
     MOTORES: el catálogo que ve el usuario.
     estado: "borrador" (datos sin validar) o "completo" (validado por Juan).
     origen: "americano" o "japonés" (sirve para distinguir los Mercury).
     familia: id de FAMILIAS si comparte base con otro motor.
     ------------------------------------------------------------------- */
  MOTORES: [
    // ---------------- YAMAHA ----------------
    {
      id: "yamaha-40-2t", marca: "Yamaha", modelo: "40 HP 2T", potencia: 40,
      tiempos: "2T", alimentacion: "carburador", estado: "completo",
      fuente: "Manual del propietario oficial Yamaha 40X (66T-28199-7B, 2012), con datos de los manuales E40X y 40V",
      datosTecnicos: [
        { dato: "Cilindros", valor: "2 en línea" },
        { dato: "Cilindrada", valor: "703 cc (80 × 70 mm)" },
        { dato: "Encendido", valor: "CDI" },
        { dato: "Arranque en frío", valor: "Cebador (choke)" },
        { dato: "Mezcla nafta/aceite", valor: "50:1 (rodaje: 25:1), según manual Yamaha en español; validado por el taller" },
        { dato: "Aceite 2T", valor: "Yamalube 2T o náutico TC-W3" },
        { dato: "Nafta", valor: "Sin plomo, 90 RON o más, hasta 10 % de etanol" },
        { dato: "Bujía NGK", valor: "B7HS (resistiva: BR7HS)" },
        { dato: "Luz de bujía", valor: "0,6 a 0,7 mm" },
        { dato: "Ajuste de bujía", valor: "25 Nm (1/4 a 1/2 vuelta después de tope a mano)" },
        { dato: "Aceite de cola", valor: "Hipoide SAE 90 · 430 ml" },
        { dato: "Ralentí en neutro", valor: "1000 ± 50 rpm" },
        { dato: "Rango a fondo", valor: "4500 a 5500 rpm" },
        { dato: "Relación de cola", valor: "2,00 (26/13)" },
        { dato: "Ajuste tuerca de hélice", valor: "40 Nm" },
        { dato: "Tanque portátil Yamaha", valor: "24 litros" },
        { dato: "Grasa", valor: "Resistente al agua; anticorrosiva en el eje de hélice" }
      ],
      // Intervalos verificados en fuentes oficiales de Yamaha. El resto queda con el intervalo general.
      ajustes: {
        "enjuague": { segun: "Yamaha", notaMarca: "Yamaha: en agua salada, turbia o con barro, enjuagar con agua dulce después de cada uso." },
        "aceite-cola": { segun: "Yamaha", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Yamaha: primer cambio a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Si sale lechoso, entra agua por los retenes." },
        "engrase": { segun: "Yamaha", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Yamaha: engrasar a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Grasa resistente al agua; en el eje de hélice, grasa anticorrosiva." },
        "bujias": { segun: "Yamaha", cada: { horas: 100, meses: 12 }, notaMarca: "Yamaha: revisar o cambiar cada 100 horas o una vez por año." },
        "filtro-combustible": { segun: "Yamaha", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Yamaha: revisar o cambiar a las 20 horas y después cada 100 horas o una vez por año. El tanque portátil se revisa y limpia cada 100 horas o una vez por año." },
        "helice": { segun: "Yamaha", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Yamaha: revisar hélice, tuerca y pasador a las 20 horas y después cada 100 horas o una vez por año." },
        "anodos": { segun: "Yamaha", cada: { horas: 100, meses: 12 }, notaMarca: "Yamaha: revisar el ánodo exterior cada 100 horas o una vez por año. Los ánodos internos los cambia el concesionario cada 500 horas o 5 años." },
        "impulsor": { segun: "Yamaha", cada: { horas: 100, meses: 12 }, notaMarca: "Yamaha: el concesionario revisa la bomba de agua cada 100 horas o una vez por año y cambia el impulsor cada 300 horas o 3 años." },
        "termostato": { segun: "Yamaha", cada: { horas: 100, meses: 12 }, notaMarca: "Yamaha: revisión de concesionario cada 100 horas o una vez por año." },
        "invernaje": { segun: "Yamaha", notaMarca: "Yamaha recomienda aceite de empañado (fogging) para motores 2T a carburador al guardarlos." }
      },
      consejos: [
        "Rodaje de 10 horas, en el agua y con carga: 10 minutos a la menor velocidad; 50 minutos sin pasar de media aceleración (unas 3000 rpm); 2 horas a no más de 3/4 (unas 4000 rpm), con tramos de 1 minuto a fondo; las 7 horas restantes a cualquier régimen, sin pasar 5 minutos seguidos a fondo.",
        "Si al cambiar el aceite de cola sale lechoso, entra agua por los retenes: hay que llevarlo al taller.",
        "Una porcelana de bujía muy blanca indica mezcla pobre o entrada de aire en ese cilindro."
      ]
    },
    { id: "yamaha-25-2t", marca: "Yamaha", modelo: "25 HP 2T", potencia: 25, tiempos: "2T", alimentacion: "carburador", estado: "completo",
      fuente: "Manual del propietario oficial Yamaha 25B / 30H (69R-28199-75-E0, 2006), modelo 25BMH. Es el 25 HP que abunda en la Argentina, solo a mezcla (validado por el taller). Intervalos tomados del manual Yamaha 20D / 25N (2010), porque la tabla del 25B no se pudo leer completa",
      datosTecnicos: [
        { dato: "Cilindros", valor: "2 en línea" },
        { dato: "Cilindrada", valor: "496 cc (72 × 61 mm)" },
        { dato: "Encendido", valor: "CDI" },
        { dato: "Arranque en frío", valor: "Cebador (choke)" },
        { dato: "Mezcla nafta/aceite", valor: "50:1 (rodaje: 25:1); en la Argentina se vende solo a mezcla, sin inyección de aceite" },
        { dato: "Aceite 2T", valor: "Yamalube 2T o náutico TC-W3" },
        { dato: "Nafta", valor: "Sin plomo, 90 RON o más" },
        { dato: "Bujía NGK", valor: "BR7HS-10" },
        { dato: "Luz de bujía", valor: "0,9 a 1,0 mm" },
        { dato: "Ajuste de bujía", valor: "25 Nm" },
        { dato: "Aceite de cola", valor: "Hipoide SAE 90 · 320 ml" },
        { dato: "Ralentí en neutro", valor: "1100 ± 50 rpm" },
        { dato: "Rango a fondo", valor: "4500 a 5500 rpm" },
        { dato: "Relación de cola", valor: "2,08 (27/13)" },
        { dato: "Ajuste tuerca de hélice", valor: "35 Nm" },
        { dato: "Tanque portátil Yamaha", valor: "24 o 25 litros" }
      ],
      ajustes: {
        "enjuague": { segun: "Yamaha", notaMarca: "Yamaha: en agua salada, turbia o con barro, enjuagar con agua dulce después de cada uso." },
        "aceite-cola": { segun: "Yamaha", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Yamaha: primer cambio a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Si sale lechoso, entra agua por los retenes." },
        "engrase": { segun: "Yamaha", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Yamaha: engrasar a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Grasa resistente al agua; en el eje de hélice, grasa anticorrosiva." },
        "bujias": { segun: "Yamaha", cada: { horas: 100, meses: 12 }, notaMarca: "Yamaha: revisar o cambiar cada 100 horas o una vez por año." },
        "filtro-combustible": { segun: "Yamaha", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Yamaha: revisar o cambiar a las 20 horas y después cada 100 horas o una vez por año. El tanque portátil se revisa y limpia cada 100 horas o una vez por año." },
        "helice": { segun: "Yamaha", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Yamaha: revisar hélice, tuerca y pasador a las 20 horas y después cada 100 horas o una vez por año." },
        "anodos": { segun: "Yamaha", cada: { horas: 100, meses: 12 }, notaMarca: "Yamaha: revisar el ánodo exterior cada 100 horas o una vez por año. Los ánodos internos los cambia el concesionario cada 500 horas o 5 años." },
        "impulsor": { segun: "Yamaha", cada: { horas: 100, meses: 12 }, notaMarca: "Yamaha: el concesionario revisa la bomba de agua cada 100 horas o una vez por año y cambia el impulsor cada 300 horas o 3 años." },
        "termostato": { segun: "Yamaha", cada: { horas: 100, meses: 12 }, notaMarca: "Yamaha: revisión de concesionario cada 100 horas o una vez por año." }
      },
      consejos: [
        "Rodaje de 10 horas: 10 minutos al mínimo, 50 minutos sin pasar de media aceleración (3000 rpm), 2 horas a 3/4 (4000 rpm) con tramos de 1 minuto a fondo, y 7 horas sin pasar 5 minutos seguidos a fondo."
      ] },
    { id: "yamaha-15-2t", marca: "Yamaha", modelo: "15 HP 2T", potencia: 15, tiempos: "2T", alimentacion: "carburador", estado: "completo",
      fuente: "Manual del propietario oficial Yamaha 9.9F / 15F (63V-28199-7A, 2008)",
      datosTecnicos: [
        { dato: "Cilindros", valor: "2 en línea" },
        { dato: "Cilindrada", valor: "246 cc (56 × 50 mm)" },
        { dato: "Encendido", valor: "CDI" },
        { dato: "Arranque en frío", valor: "Cebador (choke)" },
        { dato: "Mezcla nafta/aceite", valor: "50:1 (rodaje: 25:1), según manual Yamaha en español; validado por el taller" },
        { dato: "Aceite 2T", valor: "Yamalube 2T o náutico TC-W3" },
        { dato: "Nafta", valor: "Sin plomo, 90 RON o más" },
        { dato: "Bujía NGK", valor: "BR7HS-10" },
        { dato: "Luz de bujía", valor: "0,9 a 1,0 mm" },
        { dato: "Ajuste de bujía", valor: "25 Nm" },
        { dato: "Aceite de cola", valor: "Hipoide SAE 90 · 250 ml" },
        { dato: "Ralentí en neutro", valor: "750 ± 50 rpm" },
        { dato: "Rango a fondo", valor: "4500 a 5500 rpm" },
        { dato: "Relación de cola", valor: "2,08 (27/13)" },
        { dato: "Ajuste tuerca de hélice", valor: "17 Nm" },
        { dato: "Tanque portátil Yamaha", valor: "25 litros" }
      ],
      ajustes: {
        "enjuague": { segun: "Yamaha", notaMarca: "Yamaha: en agua salada, turbia o con barro, enjuagar con agua dulce después de cada uso." },
        "aceite-cola": { segun: "Yamaha", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Yamaha: primer cambio a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Si sale lechoso, entra agua por los retenes." },
        "engrase": { segun: "Yamaha", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Yamaha: engrasar a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Grasa resistente al agua; en el eje de hélice, grasa anticorrosiva." },
        "bujias": { segun: "Yamaha", cada: { horas: 100, meses: 12 }, notaMarca: "Yamaha: revisar o cambiar cada 100 horas o una vez por año." },
        "filtro-combustible": { segun: "Yamaha", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Yamaha: revisar o cambiar a las 20 horas y después cada 100 horas o una vez por año. El tanque portátil se revisa y limpia cada 100 horas o una vez por año." },
        "helice": { segun: "Yamaha", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Yamaha: revisar hélice, tuerca y pasador a las 20 horas y después cada 100 horas o una vez por año." },
        "anodos": { segun: "Yamaha", cada: { horas: 100, meses: 12 }, notaMarca: "Yamaha: revisar el ánodo exterior cada 100 horas o una vez por año. Los ánodos internos los cambia el concesionario cada 500 horas o 5 años." },
        "impulsor": { segun: "Yamaha", cada: { horas: 100, meses: 12 }, notaMarca: "Yamaha: el concesionario revisa la bomba de agua cada 100 horas o una vez por año y cambia el impulsor cada 300 horas o 3 años." },
        "termostato": { segun: "Yamaha", cada: { horas: 100, meses: 12 }, notaMarca: "Yamaha: revisión de concesionario cada 100 horas o una vez por año." },
        "invernaje": { segun: "Yamaha", notaMarca: "Yamaha recomienda aceite de empañado (fogging) para motores 2T a carburador al guardarlos." }
      },
      consejos: [
        "La mezcla es 50:1 con Yamalube 2T o aceite TC-W3 (25:1 en el rodaje). Los manuales europeos dicen 100:1, pero para la Argentina corresponde 50:1.",
        "Rodaje de 10 horas: 10 minutos al mínimo, 50 minutos sin pasar de media aceleración (3000 rpm), 2 horas a 3/4 (4000 rpm) con tramos de 1 minuto a fondo, y 7 horas sin pasar 5 minutos seguidos a fondo."
      ] },
    { id: "yamaha-60-2t", marca: "Yamaha", modelo: "60 HP 2T", potencia: 60, tiempos: "2T", alimentacion: "carburador", estado: "completo",
      fuente: "Manual del propietario oficial Yamaha 50G / 60F / 70B (6H2-28199-7S, 2004)",
      datosTecnicos: [
        { dato: "Cilindros", valor: "3 en línea" },
        { dato: "Cilindrada", valor: "849 cc (72 × 69,5 mm)" },
        { dato: "Encendido", valor: "CDI con microcomputadora" },
        { dato: "Lubricación", valor: "Inyección de aceite · tanque de 2,8 litros" },
        { dato: "Aceite 2T", valor: "Yamalube 2T o náutico TC-W3" },
        { dato: "Nafta", valor: "Sin plomo, 90 RON o más" },
        { dato: "Bujía NGK", valor: "B8HS-10 (resistiva: BR8HS-10)" },
        { dato: "Luz de bujía", valor: "0,9 a 1,0 mm" },
        { dato: "Ajuste de bujía", valor: "25 Nm" },
        { dato: "Aceite de cola", valor: "Hipoide SAE 90 · 610 cm³" },
        { dato: "Ralentí en neutro", valor: "800 ± 50 rpm" },
        { dato: "Relación de cola", valor: "2,33 (28/12)" },
        { dato: "Arranque", valor: "Eléctrico, con cebado automático (prime start)" },
        { dato: "Rango a fondo", valor: "4500 a 5500 rpm" }
      ],
      ajustes: {
        "enjuague": { segun: "Yamaha", notaMarca: "Yamaha: en agua salada, turbia o con barro, enjuagar con agua dulce después de cada uso." },
        "aceite-cola": { segun: "Yamaha", cada: { horas: 100, meses: 6, primeraHoras: 10 }, notaMarca: "Yamaha: primer cambio a las 10 horas (o al mes) y después cada 100 horas o 6 meses." },
        "bujias": { segun: "Yamaha", cada: { horas: 100, meses: 6, primeraHoras: 10 }, notaMarca: "Yamaha: limpiar, calibrar o cambiar a las 10 horas, a las 50 horas y después cada 100 horas o 6 meses." },
        "filtro-combustible": { segun: "Yamaha", cada: { horas: 100, meses: 6, primeraHoras: 10 }, notaMarca: "Yamaha: revisar y limpiar el filtro y el sistema de nafta a las 10 horas, a las 50 horas y después cada 100 horas o 6 meses. El tanque portátil se limpia una vez por año." },
        "engrase": { segun: "Yamaha", cada: { horas: 100, meses: 6 }, notaMarca: "Yamaha: engrasar cada 100 horas o 6 meses." },
        "anodos": { segun: "Yamaha", cada: { horas: 100, meses: 6, primeraHoras: 50 }, notaMarca: "Yamaha: revisar el ánodo exterior a las 50 horas y después cada 100 horas o 6 meses." },
        "helice": { segun: "Yamaha", cada: { horas: 100, meses: 6, primeraHoras: 50 }, notaMarca: "Yamaha: revisar hélice y pasador a las 50 horas y después cada 100 horas o 6 meses." },
        "impulsor": { segun: "Yamaha", cada: { horas: 200, meses: 12 }, notaMarca: "Yamaha: el concesionario revisa la bomba de agua cada 200 horas o una vez por año." },
        "termostato": { segun: "Yamaha", cada: { horas: 200, meses: 12 }, notaMarca: "Yamaha: revisión de concesionario cada 200 horas o una vez por año." }
      },
      tareasExtra: [
        { id: "tanque-aceite", nombre: "Drenaje de agua del tanque de aceite", tiempos: "2T", cada: { horas: 100, meses: 12 }, quien: "usuario", segun: "Yamaha", porque: "El agua en el aceite de inyección daña el motor.", pasos: ["Revisar y limpiar el drenaje de agua del tanque de aceite según la tabla de Yamaha.", "Si encuentra agua seguido, revisar la tapa y el respiradero del tanque."], materiales: [] },
        { id: "bomba-aceite", nombre: "Revisión de la bomba de inyección de aceite", tiempos: "2T", cada: { horas: 100, meses: 12 }, quien: "mecanico", segun: "Yamaha", porque: "Si la bomba no entrega aceite, el motor se funde.", pasos: ["Revisión y ajuste de concesionario según la tabla de Yamaha."], materiales: [] }
      ],
      consejos: [
        "Lubricación por inyección de aceite: no se mezcla aceite en la nafta, salvo en el rodaje (50:1 además del aceite del tanque). Mantener lleno el tanque de aceite y drenar el agua de su fondo según la tabla.",
        "Si se enciende el aviso de bajo nivel de aceite, el motor limita las vueltas a unas 2000 rpm.",
        "Rodaje de 10 horas: 10 minutos al mínimo, 50 minutos sin pasar de media aceleración (3000 rpm), 2 horas a 3/4 (4000 rpm) y 7 horas sin pasar 5 minutos seguidos a fondo."
      ] },
    { id: "yamaha-70-2t", marca: "Yamaha", modelo: "70 HP 2T", potencia: 70, tiempos: "2T", alimentacion: "carburador", estado: "completo",
      fuente: "Manual del propietario oficial Yamaha 50G / 60F / 70B (6H2-28199-7S, 2004)",
      datosTecnicos: [
        { dato: "Cilindros", valor: "3 en línea" },
        { dato: "Cilindrada", valor: "849 cc (72 × 69,5 mm)" },
        { dato: "Encendido", valor: "CDI con microcomputadora" },
        { dato: "Lubricación", valor: "Inyección de aceite · tanque de 2,8 litros" },
        { dato: "Aceite 2T", valor: "Yamalube 2T o náutico TC-W3" },
        { dato: "Nafta", valor: "Sin plomo, 90 RON o más" },
        { dato: "Bujía NGK", valor: "B8HS-10 (resistiva: BR8HS-10)" },
        { dato: "Luz de bujía", valor: "0,9 a 1,0 mm" },
        { dato: "Ajuste de bujía", valor: "25 Nm" },
        { dato: "Aceite de cola", valor: "Hipoide SAE 90 · 610 cm³" },
        { dato: "Ralentí en neutro", valor: "800 ± 50 rpm" },
        { dato: "Relación de cola", valor: "2,33 (28/12)" },
        { dato: "Arranque", valor: "Eléctrico, con cebado automático (prime start)" },
        { dato: "Rango a fondo", valor: "5000 a 6000 rpm" }
      ],
      ajustes: {
        "enjuague": { segun: "Yamaha", notaMarca: "Yamaha: en agua salada, turbia o con barro, enjuagar con agua dulce después de cada uso." },
        "aceite-cola": { segun: "Yamaha", cada: { horas: 100, meses: 6, primeraHoras: 10 }, notaMarca: "Yamaha: primer cambio a las 10 horas (o al mes) y después cada 100 horas o 6 meses." },
        "bujias": { segun: "Yamaha", cada: { horas: 100, meses: 6, primeraHoras: 10 }, notaMarca: "Yamaha: limpiar, calibrar o cambiar a las 10 horas, a las 50 horas y después cada 100 horas o 6 meses." },
        "filtro-combustible": { segun: "Yamaha", cada: { horas: 100, meses: 6, primeraHoras: 10 }, notaMarca: "Yamaha: revisar y limpiar el filtro y el sistema de nafta a las 10 horas, a las 50 horas y después cada 100 horas o 6 meses. El tanque portátil se limpia una vez por año." },
        "engrase": { segun: "Yamaha", cada: { horas: 100, meses: 6 }, notaMarca: "Yamaha: engrasar cada 100 horas o 6 meses." },
        "anodos": { segun: "Yamaha", cada: { horas: 100, meses: 6, primeraHoras: 50 }, notaMarca: "Yamaha: revisar el ánodo exterior a las 50 horas y después cada 100 horas o 6 meses." },
        "helice": { segun: "Yamaha", cada: { horas: 100, meses: 6, primeraHoras: 50 }, notaMarca: "Yamaha: revisar hélice y pasador a las 50 horas y después cada 100 horas o 6 meses." },
        "impulsor": { segun: "Yamaha", cada: { horas: 200, meses: 12 }, notaMarca: "Yamaha: el concesionario revisa la bomba de agua cada 200 horas o una vez por año." },
        "termostato": { segun: "Yamaha", cada: { horas: 200, meses: 12 }, notaMarca: "Yamaha: revisión de concesionario cada 200 horas o una vez por año." }
      },
      tareasExtra: [
        { id: "tanque-aceite", nombre: "Drenaje de agua del tanque de aceite", tiempos: "2T", cada: { horas: 100, meses: 12 }, quien: "usuario", segun: "Yamaha", porque: "El agua en el aceite de inyección daña el motor.", pasos: ["Revisar y limpiar el drenaje de agua del tanque de aceite según la tabla de Yamaha.", "Si encuentra agua seguido, revisar la tapa y el respiradero del tanque."], materiales: [] },
        { id: "bomba-aceite", nombre: "Revisión de la bomba de inyección de aceite", tiempos: "2T", cada: { horas: 100, meses: 12 }, quien: "mecanico", segun: "Yamaha", porque: "Si la bomba no entrega aceite, el motor se funde.", pasos: ["Revisión y ajuste de concesionario según la tabla de Yamaha."], materiales: [] }
      ],
      consejos: [
        "Lubricación por inyección de aceite: no se mezcla aceite en la nafta, salvo en el rodaje (50:1 además del aceite del tanque). Mantener lleno el tanque de aceite y drenar el agua de su fondo según la tabla.",
        "Si se enciende el aviso de bajo nivel de aceite, el motor limita las vueltas a unas 2000 rpm.",
        "Rodaje de 10 horas: 10 minutos al mínimo, 50 minutos sin pasar de media aceleración (3000 rpm), 2 horas a 3/4 (4000 rpm) y 7 horas sin pasar 5 minutos seguidos a fondo."
      ] },
    { id: "yamaha-90-2t", marca: "Yamaha", modelo: "90 HP 2T", potencia: 90, tiempos: "2T", alimentacion: "carburador", estado: "completo",
      fuente: "Manual del propietario oficial Yamaha 75C / 90A (67P-28199-76, 2010)",
      datosTecnicos: [
        { dato: "Cilindros", valor: "3 en línea" },
        { dato: "Cilindrada", valor: "1140 cc (82 × 72 mm)" },
        { dato: "Encendido", valor: "CDI con microcomputadora" },
        { dato: "Lubricación", valor: "Inyección de aceite · tanque de 3,3 litros" },
        { dato: "Aceite 2T", valor: "Yamalube 2T o náutico TC-W3" },
        { dato: "Nafta", valor: "Sin plomo, 90 RON o más" },
        { dato: "Bujía NGK", valor: "BR8HS-10" },
        { dato: "Luz de bujía", valor: "0,9 a 1,0 mm" },
        { dato: "Ajuste de bujía", valor: "25 Nm" },
        { dato: "Aceite de cola", valor: "Hipoide SAE 90 · 610 ml" },
        { dato: "Ralentí en neutro", valor: "800 ± 50 rpm" },
        { dato: "Rango a fondo", valor: "4500 a 5500 rpm" },
        { dato: "Relación de cola", valor: "2,00 (26/13)" },
        { dato: "Ajuste tuerca de hélice", valor: "35 Nm" },
        { dato: "Arranque", valor: "Eléctrico, con cebado automático (prime start)" }
      ],
      ajustes: {
        "enjuague": { segun: "Yamaha", notaMarca: "Yamaha: en agua salada, turbia o con barro, enjuagar con agua dulce después de cada uso." },
        "aceite-cola": { segun: "Yamaha", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Yamaha: primer cambio a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Si sale lechoso, entra agua por los retenes." },
        "engrase": { segun: "Yamaha", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Yamaha: engrasar a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Grasa resistente al agua; en el eje de hélice, grasa anticorrosiva." },
        "bujias": { segun: "Yamaha", cada: { horas: 100, meses: 12 }, notaMarca: "Yamaha: revisar o cambiar cada 100 horas o una vez por año." },
        "filtro-combustible": { segun: "Yamaha", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Yamaha: revisar o cambiar a las 20 horas y después cada 100 horas o una vez por año. El tanque portátil se revisa y limpia cada 100 horas o una vez por año." },
        "helice": { segun: "Yamaha", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Yamaha: revisar hélice, tuerca y pasador a las 20 horas y después cada 100 horas o una vez por año." },
        "anodos": { segun: "Yamaha", cada: { horas: 100, meses: 12 }, notaMarca: "Yamaha: revisar el ánodo exterior cada 100 horas o una vez por año. Los ánodos internos los cambia el concesionario cada 500 horas o 5 años." },
        "impulsor": { segun: "Yamaha", cada: { horas: 100, meses: 12 }, notaMarca: "Yamaha: el concesionario revisa la bomba de agua cada 100 horas o una vez por año y cambia el impulsor cada 300 horas o 3 años." },
        "termostato": { segun: "Yamaha", cada: { horas: 100, meses: 12 }, notaMarca: "Yamaha: revisión de concesionario cada 100 horas o una vez por año." }
      },
      tareasExtra: [
        { id: "tanque-aceite", nombre: "Drenaje de agua del tanque de aceite", tiempos: "2T", cada: { horas: 100, meses: 12 }, quien: "usuario", segun: "Yamaha", porque: "El agua en el aceite de inyección daña el motor.", pasos: ["Revisar y limpiar el drenaje de agua del tanque de aceite según la tabla de Yamaha.", "Si encuentra agua seguido, revisar la tapa y el respiradero del tanque."], materiales: [] },
        { id: "bomba-aceite", nombre: "Revisión de la bomba de inyección de aceite", tiempos: "2T", cada: { horas: 100, meses: 12 }, quien: "mecanico", segun: "Yamaha", porque: "Si la bomba no entrega aceite, el motor se funde.", pasos: ["Revisión y ajuste de concesionario según la tabla de Yamaha."], materiales: [] }
      ],
      consejos: [
        "Lubricación por inyección de aceite: no se mezcla aceite en la nafta, salvo en el rodaje (50:1 además del aceite del tanque). Mantener lleno el tanque de aceite y drenar el agua de su fondo según la tabla.",
        "Si se enciende el aviso de bajo nivel de aceite, el motor limita las vueltas a unas 2000 rpm.",
        "Rodaje de 10 horas: 10 minutos al mínimo, 50 minutos sin pasar de media aceleración (3000 rpm), 2 horas a 3/4 (4000 rpm) y 7 horas sin pasar 5 minutos seguidos a fondo."
      ] },
    { id: "yamaha-60-4t", marca: "Yamaha", modelo: "60 HP 4T", potencia: 60, tiempos: "4T", alimentacion: "inyeccion", estado: "completo",
      fuente: "Manual del propietario oficial Yamaha F40H / F50H / F60F / F70A (6C1-28199-7B, 2012), modelo F60FET",
      datosTecnicos: [
        { dato: "Motor", valor: "4 cilindros en línea, SOHC, 8 válvulas" },
        { dato: "Cilindrada", valor: "996 cc (65 × 75 mm)" },
        { dato: "Alimentación", valor: "Inyección electrónica" },
        { dato: "Encendido", valor: "TCI" },
        { dato: "Nafta", valor: "Sin plomo, 90 RON o más" },
        { dato: "Aceite de motor", valor: "Yamalube 4 o aceite 4T náutico · SAE 10W-30, 10W-40 o 5W-30 · API SE a SL" },
        { dato: "Cantidad de aceite", valor: "1,9 L sin cambiar filtro · 2,1 L con filtro" },
        { dato: "Bujía NGK", valor: "DPR6EB-9" },
        { dato: "Luz de bujía", valor: "0,8 a 0,9 mm" },
        { dato: "Ajuste de bujía", valor: "18 Nm" },
        { dato: "Tapón de aceite / filtro", valor: "28 Nm / 18 Nm" },
        { dato: "Luz de válvulas en frío", valor: "Admisión 0,15 a 0,25 mm · escape 0,25 a 0,35 mm" },
        { dato: "Aceite de cola", valor: "Hipoide SAE 90 API GL-4 · 430 ml" },
        { dato: "Ralentí en neutro", valor: "700 a 800 rpm" },
        { dato: "Rango a fondo", valor: "5000 a 6000 rpm" },
        { dato: "Relación de cola", valor: "1,85 (24/13)" },
        { dato: "Ajuste tuerca de hélice", valor: "35 Nm" },
        { dato: "Batería mínima", valor: "430 CCA · 70 Ah" }
      ],
      ajustes: {
        "enjuague": { segun: "Yamaha", notaMarca: "Yamaha: en agua salada, turbia o con barro, enjuagar con agua dulce después de cada uso." },
        "aceite-cola": { segun: "Yamaha", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Yamaha: primer cambio a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Si sale lechoso, entra agua por los retenes." },
        "engrase": { segun: "Yamaha", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Yamaha: engrasar a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Grasa resistente al agua; en el eje de hélice, grasa anticorrosiva." },
        "bujias": { segun: "Yamaha", cada: { horas: 100, meses: 12 }, notaMarca: "Yamaha: revisar o cambiar cada 100 horas o una vez por año." },
        "filtro-combustible": { segun: "Yamaha", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Yamaha: revisar o cambiar a las 20 horas y después cada 100 horas o una vez por año. El tanque portátil se revisa y limpia cada 100 horas o una vez por año." },
        "helice": { segun: "Yamaha", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Yamaha: revisar hélice, tuerca y pasador a las 20 horas y después cada 100 horas o una vez por año." },
        "anodos": { segun: "Yamaha", cada: { horas: 100, meses: 12 }, notaMarca: "Yamaha: revisar el ánodo exterior cada 100 horas o una vez por año. Los ánodos internos los cambia el concesionario cada 500 horas o 5 años." },
        "impulsor": { segun: "Yamaha", cada: { horas: 100, meses: 12 }, notaMarca: "Yamaha: el concesionario revisa la bomba de agua cada 100 horas o una vez por año y cambia el impulsor cada 300 horas o 3 años." },
        "termostato": { segun: "Yamaha", cada: { horas: 100, meses: 12 }, notaMarca: "Yamaha: revisión de concesionario cada 100 horas o una vez por año." },
        "aceite-motor": { segun: "Yamaha", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Yamaha: primer cambio a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. El filtro de aceite se cambia cada 100 horas o una vez por año." },
        "valvulas": { segun: "Yamaha", cada: { horas: 500, meses: 60 }, notaMarca: "Yamaha: control y ajuste de luz de válvulas por el concesionario cada 500 horas o 5 años." }
      },
      tareasExtra: [
        { id: "filtro-aceite", nombre: "Cambio de filtro de aceite", tiempos: "4T", cada: { horas: 100, meses: 12 }, quien: "mecanico", segun: "Yamaha", porque: "Retiene las partículas del aceite. Yamaha indica cambiarlo cada 100 horas o una vez por año.", pasos: ["Se cambia junto con el aceite de motor.", "Ajuste del filtro: 18 Nm."], materiales: ["Filtro de aceite original Yamaha"] },
        { id: "correa", nombre: "Revisión de correa de distribución", tiempos: "4T", cada: { horas: 100, meses: 12 }, quien: "mecanico", segun: "Yamaha", porque: "Si la correa se corta, el motor se detiene y puede dañarse.", pasos: ["Yamaha indica revisarla cada 100 horas o una vez por año, y cambiarla cada 1000 horas.", "Tarea de concesionario o taller."], materiales: [] },
        { id: "trim", nombre: "Revisión del trim y levante hidráulico", tiempos: "4T", cada: { horas: 100, meses: 12, primeraHoras: 20 }, quien: "usuario", segun: "Yamaha", porque: "Una pérdida de líquido deja el motor sin levante.", pasos: ["Yamaha: revisar a las 20 horas y después cada 100 horas o una vez por año.", "Buscar pérdidas de aceite y que suba y baje sin tirones."], materiales: [] }
      ],
      consejos: [
        "Revisar el nivel de aceite de motor antes de cada salida, con el motor vertical y frío.",
        "Si se enciende el aviso de baja presión de aceite, apagar el motor y revisar el nivel antes de seguir.",
        "Rodaje de 10 horas, evitando el ralentí prolongado: primera hora a regímenes variados hasta 2000 rpm (media aceleración); segunda hora, acelerar lo justo para planear, sin ir a fondo; las 8 horas restantes a cualquier régimen, sin pasar 5 minutos seguidos a fondo."
      ] },
    { id: "yamaha-70-4t", marca: "Yamaha", modelo: "70 HP 4T", potencia: 70, tiempos: "4T", alimentacion: "inyeccion", estado: "completo",
      fuente: "Manual del propietario oficial Yamaha F40H / F50H / F60F / F70A (6C1-28199-7B, 2012), modelo F70AET",
      datosTecnicos: [
        { dato: "Motor", valor: "4 cilindros en línea, SOHC, 16 válvulas" },
        { dato: "Cilindrada", valor: "996 cc (65 × 75 mm)" },
        { dato: "Alimentación", valor: "Inyección electrónica" },
        { dato: "Encendido", valor: "TCI" },
        { dato: "Nafta", valor: "Sin plomo, 90 RON o más" },
        { dato: "Aceite de motor", valor: "Yamalube 4 o aceite 4T náutico · SAE 10W-30, 10W-40 o 5W-30 · API SE a SL" },
        { dato: "Cantidad de aceite", valor: "1,9 L sin cambiar filtro · 2,1 L con filtro" },
        { dato: "Bujía NGK", valor: "LKR7E" },
        { dato: "Luz de bujía", valor: "0,8 a 0,9 mm" },
        { dato: "Ajuste de bujía", valor: "17 Nm" },
        { dato: "Tapón de aceite / filtro", valor: "27 Nm / 18 Nm" },
        { dato: "Luz de válvulas en frío", valor: "Admisión 0,15 a 0,25 mm · escape 0,25 a 0,35 mm" },
        { dato: "Aceite de cola", valor: "Hipoide SAE 90 API GL-4 · 670 ml" },
        { dato: "Ralentí en neutro", valor: "700 a 800 rpm" },
        { dato: "Rango a fondo", valor: "5300 a 6300 rpm" },
        { dato: "Relación de cola", valor: "2,33 (28/12)" },
        { dato: "Ajuste tuerca de hélice", valor: "34 Nm" },
        { dato: "Batería mínima", valor: "430 CCA · 70 Ah" }
      ],
      ajustes: {
        "enjuague": { segun: "Yamaha", notaMarca: "Yamaha: en agua salada, turbia o con barro, enjuagar con agua dulce después de cada uso." },
        "aceite-cola": { segun: "Yamaha", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Yamaha: primer cambio a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Si sale lechoso, entra agua por los retenes." },
        "engrase": { segun: "Yamaha", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Yamaha: engrasar a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Grasa resistente al agua; en el eje de hélice, grasa anticorrosiva." },
        "bujias": { segun: "Yamaha", cada: { horas: 100, meses: 12 }, notaMarca: "Yamaha: revisar o cambiar cada 100 horas o una vez por año." },
        "filtro-combustible": { segun: "Yamaha", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Yamaha: revisar o cambiar a las 20 horas y después cada 100 horas o una vez por año. El tanque portátil se revisa y limpia cada 100 horas o una vez por año." },
        "helice": { segun: "Yamaha", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Yamaha: revisar hélice, tuerca y pasador a las 20 horas y después cada 100 horas o una vez por año." },
        "anodos": { segun: "Yamaha", cada: { horas: 100, meses: 12 }, notaMarca: "Yamaha: revisar el ánodo exterior cada 100 horas o una vez por año. Los ánodos internos los cambia el concesionario cada 500 horas o 5 años." },
        "impulsor": { segun: "Yamaha", cada: { horas: 100, meses: 12 }, notaMarca: "Yamaha: el concesionario revisa la bomba de agua cada 100 horas o una vez por año y cambia el impulsor cada 300 horas o 3 años." },
        "termostato": { segun: "Yamaha", cada: { horas: 100, meses: 12 }, notaMarca: "Yamaha: revisión de concesionario cada 100 horas o una vez por año." },
        "aceite-motor": { segun: "Yamaha", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Yamaha: primer cambio a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. El filtro de aceite se cambia cada 100 horas o una vez por año." },
        "valvulas": { segun: "Yamaha", cada: { horas: 500, meses: 60 }, notaMarca: "Yamaha: control y ajuste de luz de válvulas por el concesionario cada 500 horas o 5 años." }
      },
      tareasExtra: [
        { id: "filtro-aceite", nombre: "Cambio de filtro de aceite", tiempos: "4T", cada: { horas: 100, meses: 12 }, quien: "mecanico", segun: "Yamaha", porque: "Retiene las partículas del aceite. Yamaha indica cambiarlo cada 100 horas o una vez por año.", pasos: ["Se cambia junto con el aceite de motor.", "Ajuste del filtro: 18 Nm."], materiales: ["Filtro de aceite original Yamaha"] },
        { id: "correa", nombre: "Revisión de correa de distribución", tiempos: "4T", cada: { horas: 100, meses: 12 }, quien: "mecanico", segun: "Yamaha", porque: "Si la correa se corta, el motor se detiene y puede dañarse.", pasos: ["Yamaha indica revisarla cada 100 horas o una vez por año, y cambiarla cada 1000 horas.", "Tarea de concesionario o taller."], materiales: [] },
        { id: "trim", nombre: "Revisión del trim y levante hidráulico", tiempos: "4T", cada: { horas: 100, meses: 12, primeraHoras: 20 }, quien: "usuario", segun: "Yamaha", porque: "Una pérdida de líquido deja el motor sin levante.", pasos: ["Yamaha: revisar a las 20 horas y después cada 100 horas o una vez por año.", "Buscar pérdidas de aceite y que suba y baje sin tirones."], materiales: [] }
      ],
      consejos: [
        "Revisar el nivel de aceite de motor antes de cada salida, con el motor vertical y frío.",
        "Si se enciende el aviso de baja presión de aceite, apagar el motor y revisar el nivel antes de seguir.",
        "Rodaje de 10 horas, evitando el ralentí prolongado: primera hora a regímenes variados hasta 2000 rpm (media aceleración); segunda hora, acelerar lo justo para planear, sin ir a fondo; las 8 horas restantes a cualquier régimen, sin pasar 5 minutos seguidos a fondo."
      ] },
    { id: "yamaha-90-4t", marca: "Yamaha", modelo: "90 HP 4T (1,6 L)", potencia: 90, tiempos: "4T", alimentacion: "inyeccion", estado: "completo",
      fuente: "Manual del propietario oficial Yamaha F75 / F90 (6D6-28199-12, edición EE. UU. 2005, copia escaneada de boat-manuals.com)",
      datosTecnicos: [
        { dato: "Motor", valor: "4 cilindros en línea, DOHC" },
        { dato: "Cilindrada", valor: "1596 cc (79 × 81,4 mm)" },
        { dato: "Alimentación", valor: "Inyección electrónica" },
        { dato: "Encendido", valor: "TCI" },
        { dato: "Nafta", valor: "Sin plomo común" },
        { dato: "Aceite de motor", valor: "Aceite 4T náutico · SAE 10W-30 o 10W-40 · API SE a SL" },
        { dato: "Cantidad de aceite", valor: "4,3 L sin cambiar filtro" },
        { dato: "Bujía NGK", valor: "LFR5A-11" },
        { dato: "Luz de bujía", valor: "1,0 a 1,1 mm" },
        { dato: "Ajuste de bujía", valor: "25 Nm" },
        { dato: "Tapón de aceite / filtro", valor: "28 Nm / 18 Nm" },
        { dato: "Luz de válvulas en frío", valor: "Admisión 0,17 a 0,23 mm · escape 0,31 a 0,37 mm" },
        { dato: "Aceite de cola", valor: "Hipoide SAE 90 · 670 ml" },
        { dato: "Ralentí en neutro", valor: "700 ± 50 rpm" },
        { dato: "Rango a fondo", valor: "5000 a 6000 rpm" },
        { dato: "Relación de cola", valor: "2,31 (30/13)" },
        { dato: "Ajuste tuerca de hélice", valor: "35 Nm" },
        { dato: "Batería mínima", valor: "380 CCA · 502 MCA" }
      ],
      ajustes: {
        "enjuague": { segun: "Yamaha", notaMarca: "Yamaha: en agua salada, turbia o con barro, enjuagar con agua dulce después de cada uso." },
        "aceite-motor": { segun: "Yamaha", cada: { horas: 100, meses: 6, primeraHoras: 10 }, notaMarca: "Yamaha: revisar o cambiar a las 10 horas (o al mes) y después cada 100 horas o 6 meses. El filtro de aceite se cambia cada 200 horas o una vez por año." },
        "aceite-cola": { segun: "Yamaha", cada: { horas: 100, meses: 6, primeraHoras: 10 }, notaMarca: "Yamaha: primer cambio a las 10 horas (o al mes) y después cada 100 horas o 6 meses." },
        "engrase": { segun: "Yamaha", cada: { horas: 100, meses: 6 }, notaMarca: "Yamaha: engrasar cada 100 horas o 6 meses." },
        "filtro-combustible": { segun: "Yamaha", cada: { horas: 100, meses: 6, primeraHoras: 10 }, notaMarca: "Yamaha: revisar y limpiar a las 10 horas, a las 50 horas y después cada 100 horas o 6 meses. El filtro del separador de vapor lo cambia el concesionario cada 1000 horas o 5 años." },
        "bujias": { segun: "Yamaha", cada: { horas: 200, meses: 12, primeraHoras: 10 }, notaMarca: "Yamaha: limpiar, calibrar o cambiar a las 10 horas y después cada 200 horas o una vez por año." },
        "helice": { segun: "Yamaha", cada: { horas: 100, meses: 6, primeraHoras: 50 }, notaMarca: "Yamaha: revisar hélice y pasador a las 50 horas y después cada 100 horas o 6 meses." },
        "anodos": { segun: "Yamaha", cada: { horas: 100, meses: 6, primeraHoras: 50 }, notaMarca: "Yamaha: revisar el ánodo exterior a las 50 horas y después cada 100 horas o 6 meses. Los ánodos de culata y termostato los revisa el concesionario una vez por año." },
        "impulsor": { segun: "Yamaha", cada: { horas: 200, meses: 12 }, notaMarca: "Yamaha: el concesionario revisa o cambia la bomba de agua cada 200 horas o una vez por año." },
        "termostato": { segun: "Yamaha", cada: { horas: 200, meses: 12 }, notaMarca: "Yamaha: revisión de concesionario cada 200 horas o una vez por año." },
        "valvulas": { segun: "Yamaha", cada: { horas: 500, meses: 30 }, notaMarca: "Yamaha: control y ajuste de luz de válvulas por el concesionario cada 500 horas o 2 años y medio." }
      },
      tareasExtra: [
        { id: "filtro-aceite", nombre: "Cambio de filtro de aceite", tiempos: "4T", cada: { horas: 200, meses: 12 }, quien: "mecanico", segun: "Yamaha", porque: "Retiene las partículas del aceite. Yamaha indica cambiarlo cada 200 horas o una vez por año.", pasos: ["Se cambia junto con el aceite de motor.", "Ajuste del filtro: 18 Nm."], materiales: ["Filtro de aceite original Yamaha"] },
        { id: "correa", nombre: "Revisión de correa de distribución", tiempos: "4T", cada: { horas: 100, meses: 6 }, quien: "mecanico", segun: "Yamaha", porque: "Si la correa se corta, el motor se detiene y puede dañarse.", pasos: ["Yamaha indica revisarla cada 100 horas o 6 meses, y cambiarla cada 1000 horas o 5 años.", "Tarea de concesionario o taller."], materiales: [] },
        { id: "trim", nombre: "Revisión del trim y levante hidráulico", tiempos: "4T", cada: { horas: 200, meses: 12 }, quien: "mecanico", segun: "Yamaha", porque: "Una pérdida de líquido deja el motor sin levante.", pasos: ["Revisión de concesionario cada 200 horas o una vez por año."], materiales: [] }
      ],
      consejos: [
        "Revisar el nivel de aceite de motor antes de cada salida, con el motor vertical y frío.",
        "El manual cargado es el de la versión F75/F90 de 2005 (1,6 L). Los F90 posteriores (1,8 L) pueden tener otros datos.",
        "Con nafta con plomo o con mucho azufre, Yamaha indica revisar las válvulas más seguido que cada 500 horas."
      ] },
    { id: "yamaha-90-4t-nuevo", marca: "Yamaha", modelo: "90 HP 4T nuevo (1,8 L)", potencia: 90, tiempos: "4T", alimentacion: "inyeccion", estado: "completo",
      fuente: "Manual del propietario oficial Yamaha F80D / F100F (6FP-28199-73, 2018), mismo motor de 1,8 L que el F90 nuevo (F75D / F80D / F90C, manual americano LIT-18626-12-41)",
      datosTecnicos: [
        { dato: "Motor", valor: "4 cilindros en línea, SOHC, 16 válvulas" },
        { dato: "Cilindrada", valor: "1832 cc (81 × 88,9 mm)" },
        { dato: "Alimentación", valor: "Inyección electrónica" },
        { dato: "Encendido", valor: "TCI" },
        { dato: "Nafta", valor: "Sin plomo, 90 RON o más" },
        { dato: "Aceite de motor", valor: "Yamalube 4 o aceite 4T náutico · SAE 10W-30, 10W-40 o 5W-30 · API SG a SL" },
        { dato: "Cantidad de aceite", valor: "3,0 L sin cambiar filtro · 3,2 L con filtro" },
        { dato: "Bujía NGK", valor: "LKR6E-9N" },
        { dato: "Luz de bujía", valor: "0,8 a 0,9 mm" },
        { dato: "Ajuste de bujía", valor: "25 Nm" },
        { dato: "Ajuste tapón de aceite", valor: "27 Nm" },
        { dato: "Luz de válvulas en frío", valor: "Admisión 0,15 a 0,25 mm · escape 0,25 a 0,35 mm" },
        { dato: "Aceite de cola", valor: "Yamalube o hipoide SAE 90 GL-4 · 760 ml" },
        { dato: "Ralentí en neutro", valor: "700 a 800 rpm" },
        { dato: "Rango a fondo", valor: "5000 a 6000 rpm" },
        { dato: "Relación de cola", valor: "2,15 (28/13)" },
        { dato: "Ajuste tuerca de hélice", valor: "54 Nm" },
        { dato: "Batería", valor: "430 a 1080 CCA · 70 Ah" }
      ],
      ajustes: {
        "enjuague": { segun: "Yamaha", notaMarca: "Yamaha: en agua salada, turbia o con barro, enjuagar con agua dulce después de cada uso." },
        "aceite-cola": { segun: "Yamaha", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Yamaha: primer cambio a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Si sale lechoso, entra agua por los retenes." },
        "engrase": { segun: "Yamaha", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Yamaha: engrasar a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Grasa resistente al agua; en el eje de hélice, grasa anticorrosiva." },
        "bujias": { segun: "Yamaha", cada: { horas: 100, meses: 12 }, notaMarca: "Yamaha: revisar o cambiar cada 100 horas o una vez por año." },
        "filtro-combustible": { segun: "Yamaha", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Yamaha: revisar o cambiar a las 20 horas y después cada 100 horas o una vez por año. El tanque portátil se revisa y limpia cada 100 horas o una vez por año." },
        "helice": { segun: "Yamaha", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Yamaha: revisar hélice, tuerca y pasador a las 20 horas y después cada 100 horas o una vez por año." },
        "anodos": { segun: "Yamaha", cada: { horas: 100, meses: 12 }, notaMarca: "Yamaha: revisar el ánodo exterior cada 100 horas o una vez por año. Los ánodos internos los cambia el concesionario cada 500 horas o 5 años." },
        "impulsor": { segun: "Yamaha", cada: { horas: 100, meses: 12 }, notaMarca: "Yamaha: el concesionario revisa la bomba de agua cada 100 horas o una vez por año y cambia el impulsor cada 300 horas o 3 años." },
        "termostato": { segun: "Yamaha", cada: { horas: 100, meses: 12 }, notaMarca: "Yamaha: revisión de concesionario cada 100 horas o una vez por año." },
        "aceite-motor": { segun: "Yamaha", cada: { horas: 100, meses: 12, primeraHoras: 20 }, notaMarca: "Yamaha: primer cambio a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. El filtro de aceite se cambia cada 100 horas o una vez por año." },
        "valvulas": { segun: "Yamaha", cada: { horas: 500, meses: 60 }, notaMarca: "Yamaha: control y ajuste de luz de válvulas por el concesionario cada 500 horas o 5 años." }
      },
      tareasExtra: [
        { id: "filtro-aceite", nombre: "Cambio de filtro de aceite", tiempos: "4T", cada: { horas: 100, meses: 12 }, quien: "usuario", segun: "Yamaha", porque: "Retiene las partículas del aceite. Yamaha indica cambiarlo cada 100 horas o una vez por año.", pasos: ["Se cambia junto con el aceite de motor."], materiales: ["Filtro de aceite original Yamaha"] },
        { id: "correa", nombre: "Revisión de correa de distribución", tiempos: "4T", cada: { horas: 100, meses: 12 }, quien: "mecanico", segun: "Yamaha", porque: "Si la correa se corta, el motor se detiene y puede dañarse.", pasos: ["Yamaha indica revisarla cada 100 horas o una vez por año, y cambiarla cada 1000 horas.", "Tarea de concesionario o taller."], materiales: [] },
        { id: "trim", nombre: "Revisión del trim y levante hidráulico", tiempos: "4T", cada: { horas: 100, meses: 12, primeraHoras: 20 }, quien: "usuario", segun: "Yamaha", porque: "Una pérdida de líquido deja el motor sin levante.", pasos: ["Yamaha: revisar a las 20 horas y después cada 100 horas o una vez por año.", "Buscar pérdidas de aceite y que suba y baje sin tirones."], materiales: [] }
      ],
      consejos: [
        "Es el F90 de 1,8 L que se vende desde 2016 aproximadamente. Si el motor es anterior, de 1,6 L, use la ficha Yamaha 90 HP 4T.",
        "Revisar el nivel de aceite de motor antes de cada salida, con el motor vertical y frío.",
        "Yamaha indica hacer el mantenimiento el doble de seguido si el motor trabaja mucho al ralentí o en modo de pesca lenta (por ejemplo, a las 50 horas lo que figura a las 100)."
      ] },

    { id: "tohatsu-40-tldi", marca: "Tohatsu", modelo: "40 HP TLDI (inyección directa 2T)", familia: "tohatsu-40-50-tldi", potencia: 40, tiempos: "2T", alimentacion: "inyeccion", estado: "completo" },
    { id: "tohatsu-50-tldi", marca: "Tohatsu", modelo: "50 HP TLDI (inyección directa 2T)", familia: "tohatsu-40-50-tldi", potencia: 50, tiempos: "2T", alimentacion: "inyeccion", estado: "completo" },

    { id: "suzuki-df2-5", marca: "Suzuki", modelo: "DF2.5 4T", familia: "suzuki-df2-5", potencia: 2.5, tiempos: "4T", alimentacion: "carburador", estado: "completo" },
    { id: "suzuki-df4a", marca: "Suzuki", modelo: "DF4A 4T", familia: "suzuki-df4a-6a", potencia: 4, tiempos: "4T", alimentacion: "carburador", estado: "completo" },
    { id: "suzuki-df5a", marca: "Suzuki", modelo: "DF5A 4T", familia: "suzuki-df4a-6a", potencia: 5, tiempos: "4T", alimentacion: "carburador", estado: "completo" },
    { id: "suzuki-df6a", marca: "Suzuki", modelo: "DF6A 4T", familia: "suzuki-df4a-6a", potencia: 6, tiempos: "4T", alimentacion: "carburador", estado: "completo" },
    { id: "suzuki-df9-9b", marca: "Suzuki", modelo: "DF9.9B 4T", familia: "suzuki-df9-9b-20a", potencia: 9.9, tiempos: "4T", alimentacion: "inyeccion", estado: "completo" },
    { id: "suzuki-df15a", marca: "Suzuki", modelo: "DF15A 4T", familia: "suzuki-df9-9b-20a", potencia: 15, tiempos: "4T", alimentacion: "inyeccion", estado: "completo" },
    { id: "suzuki-df20a", marca: "Suzuki", modelo: "DF20A 4T", familia: "suzuki-df9-9b-20a", potencia: 20, tiempos: "4T", alimentacion: "inyeccion", estado: "completo" },
    { id: "suzuki-df25a", marca: "Suzuki", modelo: "DF25A 4T", familia: "suzuki-df25a-30a", potencia: 25, tiempos: "4T", alimentacion: "inyeccion", estado: "completo" },
    { id: "suzuki-df30a", marca: "Suzuki", modelo: "DF30A 4T", familia: "suzuki-df25a-30a", potencia: 30, tiempos: "4T", alimentacion: "inyeccion", estado: "completo" },
    { id: "suzuki-df40a", marca: "Suzuki", modelo: "DF40A 4T", familia: "suzuki-df40a-60a", potencia: 40, tiempos: "4T", alimentacion: "inyeccion", estado: "completo" },
    { id: "suzuki-df50a", marca: "Suzuki", modelo: "DF50A 4T", familia: "suzuki-df40a-60a", potencia: 50, tiempos: "4T", alimentacion: "inyeccion", estado: "completo" },
    { id: "suzuki-df60a", marca: "Suzuki", modelo: "DF60A 4T", familia: "suzuki-df40a-60a", potencia: 60, tiempos: "4T", alimentacion: "inyeccion", estado: "completo" },
    { id: "suzuki-df70a", marca: "Suzuki", modelo: "DF70A 4T", familia: "suzuki-df70a-90a", potencia: 70, tiempos: "4T", alimentacion: "inyeccion", estado: "completo" },
    { id: "suzuki-df80a", marca: "Suzuki", modelo: "DF80A 4T", familia: "suzuki-df70a-90a", potencia: 80, tiempos: "4T", alimentacion: "inyeccion", estado: "completo" },
    { id: "suzuki-df90a", marca: "Suzuki", modelo: "DF90A 4T", familia: "suzuki-df70a-90a", potencia: 90, tiempos: "4T", alimentacion: "inyeccion", estado: "completo" },
    { id: "suzuki-df115bg", marca: "Suzuki", modelo: "DF115BG 4T", familia: "suzuki-df115bg-140bg", potencia: 115, tiempos: "4T", alimentacion: "inyeccion", estado: "completo" },
    { id: "suzuki-df140bg", marca: "Suzuki", modelo: "DF140BG 4T", familia: "suzuki-df115bg-140bg", potencia: 140, tiempos: "4T", alimentacion: "inyeccion", estado: "completo" },

    // ---------------- JOHNSON / EVINRUDE (OMC / BRP) ----------------
    { id: "johnson-40-2t", marca: "Johnson", modelo: "40 HP 2T (2005)", familia: "johnson-40-2t", potencia: 40, tiempos: "2T", alimentacion: "carburador", estado: "completo" },
    { id: "evinrude-etec-25", marca: "Evinrude", modelo: "E-TEC 25 HP", familia: "evinrude-etec-25-30", potencia: 25, tiempos: "2T", alimentacion: "inyeccion", estado: "completo" },
    { id: "evinrude-etec-30", marca: "Evinrude", modelo: "E-TEC 30 HP", familia: "evinrude-etec-25-30", potencia: 30, tiempos: "2T", alimentacion: "inyeccion", estado: "completo" },
    { id: "evinrude-etec-40", marca: "Evinrude", modelo: "E-TEC 40 HP", familia: "evinrude-etec-40-60", potencia: 40, tiempos: "2T", alimentacion: "inyeccion", estado: "completo" },
    { id: "evinrude-etec-50", marca: "Evinrude", modelo: "E-TEC 50 HP", familia: "evinrude-etec-40-60", potencia: 50, tiempos: "2T", alimentacion: "inyeccion", estado: "completo" },
    { id: "evinrude-etec-60", marca: "Evinrude", modelo: "E-TEC 60 HP", familia: "evinrude-etec-40-60", potencia: 60, tiempos: "2T", alimentacion: "inyeccion", estado: "completo" },
    { id: "evinrude-etec-75", marca: "Evinrude", modelo: "E-TEC 75 HP", familia: "evinrude-etec-75-90", potencia: 75, tiempos: "2T", alimentacion: "inyeccion", estado: "completo" },
    { id: "evinrude-etec-90", marca: "Evinrude", modelo: "E-TEC 90 HP", familia: "evinrude-etec-75-90", potencia: 90, tiempos: "2T", alimentacion: "inyeccion", estado: "completo" },
    { id: "evinrude-etec-115", marca: "Evinrude", modelo: "E-TEC 115 HP V4", familia: "evinrude-etec-115-130", potencia: 115, tiempos: "2T", alimentacion: "inyeccion", estado: "completo" },
    { id: "evinrude-etec-130", marca: "Evinrude", modelo: "E-TEC 130 HP V4", familia: "evinrude-etec-115-130", potencia: 130, tiempos: "2T", alimentacion: "inyeccion", estado: "completo" },

    // ---------------- MERCURY AMERICANO ----------------
    { id: "mercury-40-2t-usa", marca: "Mercury", modelo: "40 HP 2T americano (3 cilindros)", origen: "americano", familia: "mercury-40-60-2t-usa", potencia: 40, tiempos: "2T", alimentacion: "carburador", estado: "completo",
      consejos: ["Esta ficha es para el Mercury de fabricación propia, de 3 cilindros y 967 cc. Si su motor es de 3 cilindros y 697 cc (como los MH, EH y EPTO del manual Mercury de 2017), elija la ficha Mercury 40 HP 2T japonés."] },
    { id: "mercury-50-2t-usa", marca: "Mercury", modelo: "50 HP 2T americano", origen: "americano", familia: "mercury-40-60-2t-usa", potencia: 50, tiempos: "2T", alimentacion: "carburador", estado: "completo",
      consejos: ["Esta ficha es para el Mercury de fabricación propia, de 3 cilindros y 967 cc. Si su motor es de 3 cilindros y 697 cc (como los MH, EH y EPTO del manual Mercury de 2017), elija la ficha Mercury 50 HP 2T japonés."] },
    { id: "mercury-55-2t-usa", marca: "Mercury", modelo: "55 HP 2T americano", origen: "americano", familia: "mercury-40-60-2t-usa", potencia: 55, tiempos: "2T", alimentacion: "carburador", estado: "completo" },
    { id: "mercury-60-2t-usa", marca: "Mercury", modelo: "60 HP 2T americano", origen: "americano", familia: "mercury-40-60-2t-usa", potencia: 60, tiempos: "2T", alimentacion: "carburador", estado: "completo" },
    { id: "mercury-40-2t-usa-2cil", marca: "Mercury", modelo: "40 HP 2T americano (2 cilindros, Sea Pro / Marathon)", origen: "americano", potencia: 40, tiempos: "2T", alimentacion: "carburador", estado: "completo",
      fuente: "Manual oficial de operación y mantenimiento Mercury 30/40 HP y 40 Sea Pro / Marathon, 2 cilindros (2004)",
      datosTecnicos: [
        { dato: "Cilindros", valor: "2" },
        { dato: "Cilindrada", valor: "644 cc (76 × 71 mm)" },
        { dato: "Mezcla nafta/aceite", valor: "Sin inyección de aceite: 50:1 (rodaje: 25:1 en el primer tanque). Con inyección de aceite: nafta sola, y 50:1 en el primer tanque" },
        { dato: "Aceite 2T", valor: "Mercury / Quicksilver Premium TC-W3 o náutico TC-W3 certificado NMMA" },
        { dato: "Nafta", valor: "Sin plomo, 90 RON o más, hasta 10 % de etanol" },
        { dato: "Bujía NGK", valor: "BPZ8H-N-10" },
        { dato: "Luz de bujía", valor: "1,0 mm" },
        { dato: "Aceite de cola", valor: "Quicksilver Premium Blend · 440 ml" },
        { dato: "Relación de cola", valor: "2,0:1" },
        { dato: "Ralentí en marcha", valor: "700 a 750 rpm" },
        { dato: "Rango a fondo", valor: "Recreativo: 5000 a 5500 rpm · Sea Pro / Marathon: 4500 a 5500 rpm" },
        { dato: "Batería", valor: "465 MCA o 350 CCA como mínimo" }
      ],
      ajustes: {
        "enjuague": { segun: "Mercury", notaMarca: "Mercury: después de cada uso en agua salada o contaminada, enjuagar el circuito de refrigeración y lavar con agua dulce la salida de escape y la cola." },
        "aceite-cola": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: drenar y cambiar el aceite de cola cada 100 horas o una vez por año." },
        "engrase": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: engrasar todos los puntos cada 100 horas o una vez por año (más seguido en agua salada). Las estrías del eje de transmisión las engrasa el taller." },
        "bujias": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: revisar y limpiar las bujías cada 100 horas o una vez por año." },
        "filtro-combustible": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: revisar el filtro de nafta del motor cada 100 horas o una vez por año. Antes de cada uso, revisar que no haya pérdidas." },
        "anodos": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: revisar los ánodos cada 100 horas o una vez por año, y más seguido en agua salada." },
        "carburador": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: el taller ajusta los carburadores (si hace falta) y revisa la puesta a punto cada 100 horas o una vez por año." },
        "impulsor": { segun: "Mercury", cada: { horas: 300, meses: 36 }, notaMarca: "Mercury: el taller cambia el impulsor de la bomba de agua cada 300 horas o 3 años, o antes si recalienta o baja la presión de agua." },
        "helice": { segun: "Mercury", notaMarca: "Mercury: revisar las palas de la hélice antes de cada uso." }
      },
      consejos: [
        "Rodaje: durante la primera hora, variar la aceleración, no mantener la misma velocidad más de 2 minutos y no ir a fondo en forma sostenida.",
        "Cada 100 horas, Mercury indica también revisar el líquido del trim, la batería, los cables de comando y el ajuste de tuercas y bulones, y limpiar los depósitos del motor con Power Tune.",
        "Esta ficha es para el 40 de 2 cilindros y 644 cc. Si su motor es de 3 cilindros, elija la ficha del 40 HP 2T americano de 3 cilindros o la del 40 HP 2T japonés."
      ] },
    { id: "mercury-15-2t-usa", marca: "Mercury", modelo: "15 HP 2T americano", origen: "americano", potencia: 15, tiempos: "2T", alimentacion: "carburador", estado: "completo",
      fuente: "Manual de servicio oficial Mercury 6/8/9.9/10/15 (90-827242R02, 2003), desde el modelo 1986 (serie EE. UU. 0A197112 en adelante)",
      datosTecnicos: [
        { dato: "Cilindros", valor: "2, barrido cruzado (crossflow)" },
        { dato: "Cilindrada", valor: "262 cc (60,3 × 45,7 mm)" },
        { dato: "Encendido", valor: "Descarga capacitiva (CDI)" },
        { dato: "Mezcla nafta/aceite", valor: "50:1 (rodaje: 25:1)" },
        { dato: "Aceite 2T", valor: "Mercury / Quicksilver TC-W3 o náutico TC-W3" },
        { dato: "Nafta", valor: "Sin plomo, 86 octanos (índice americano) o más" },
        { dato: "Bujía NGK", valor: "BP8H-N-10 (con supresión de interferencias: BPZ8H-N-10) · alternativa BP8HS-15" },
        { dato: "Luz de bujía", valor: "1,0 mm (BP8HS-15: 1,5 mm)" },
        { dato: "Aceite de cola", valor: "Quicksilver Premium Blend · 200 ml" },
        { dato: "Relación de cola", valor: "2,00 (26/13)" },
        { dato: "Ralentí en marcha", valor: "725 ± 50 rpm" },
        { dato: "Rango a fondo", valor: "5000 a 6000 rpm" },
        { dato: "Presión de agua", valor: "Con termostato: 0,5 a 1,5 PSI al ralentí y 5 a 7 PSI a fondo" },
        { dato: "Tanque", valor: "25 litros" }
      ],
      ajustes: {
        "enjuague": { segun: "Mercury", notaMarca: "Mercury: después de cada uso en agua salada o contaminada, enjuagar el circuito de refrigeración y lavar con agua dulce la salida de escape y la cola." },
        "aceite-cola": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: drenar y cambiar el aceite de cola cada 100 horas o una vez por año. Si sale lechoso o con mucha limadura, llevarlo al taller." },
        "engrase": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: engrasar todos los puntos cada 100 horas o una vez por año (más seguido en agua salada). Las estrías del eje de transmisión las engrasa el taller." },
        "bujias": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: revisar y limpiar las bujías cada 100 horas o una vez por año." },
        "filtro-combustible": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: revisar el filtro de nafta y limpiar el filtro de toma del tanque cada 100 horas o una vez por año. Antes de cada uso, revisar que no haya pérdidas." },
        "anodos": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: revisar los ánodos cada 100 horas o una vez por año, y más seguido en agua salada." },
        "carburador": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: revisar la regulación del carburador cada 100 horas o una vez por año, si hace falta." },
        "impulsor": { segun: "Mercury", cada: { horas: 300, meses: 36 }, notaMarca: "Mercury: el taller cambia el impulsor de la bomba de agua cada 300 horas o 3 años, o antes si recalienta o baja la presión de agua." },
        "helice": { segun: "Mercury", notaMarca: "Mercury: revisar las palas de la hélice antes de cada uso." }
      },
      consejos: [
        "Rodaje con mezcla 25:1; después, 50:1 con aceite TC-W3.",
        "Cada 100 horas, Mercury indica también revisar el ajuste de tuercas y bulones y limpiar los depósitos del motor con Quicksilver Power Tune.",
        "Antes de cada uso, verificar que la piola de hombre al agua apague el motor."
      ] },
    {"id": "mercury-25-2t-usa", "marca": "Mercury", "modelo": "25 HP 2T americano", "origen": "americano", "potencia": 25, "tiempos": "2T", "alimentacion": "carburador", "estado": "completo", "fuente": "Manual de servicio oficial Mercury 20 / 25 HP (90-826883R2, 1998, serie 0G044027 en adelante; cubre 25, 25 Marathon y 25 Sea Pro). Plan de mantenimiento Mercury, igual al del 15 HP americano.", "datosTecnicos": [{"dato": "Cilindros", "valor": "2"}, {"dato": "Cilindrada", "valor": "400 cc (65 × 60 mm)"}, {"dato": "Encendido", "valor": "Descarga capacitiva (CDI)"}, {"dato": "Mezcla nafta/aceite", "valor": "50:1 (rodaje: 25:1)"}, {"dato": "Aceite 2T", "valor": "Mercury / Quicksilver TC-W3 o náutico TC-W3"}, {"dato": "Nafta", "valor": "Sin plomo, 87 octanos (índice americano) o más"}, {"dato": "Bujía NGK", "valor": "BP8H-N-10"}, {"dato": "Luz de bujía", "valor": "1,0 mm"}, {"dato": "Aceite de cola", "valor": "Quicksilver Premium Blend · 260 ml"}, {"dato": "Relación de cola", "valor": "2,25 (27/12)"}, {"dato": "Ralentí en marcha", "valor": "750 ± 50 rpm"}, {"dato": "Rango a fondo", "valor": "5000 a 6000 rpm"}, {"dato": "Tanque", "valor": "25 litros"}], "ajustes": {"enjuague": {"segun": "Mercury", "notaMarca": "Mercury: después de cada uso en agua salada o contaminada, enjuagar el circuito de refrigeración y lavar con agua dulce la salida de escape y la cola."}, "aceite-cola": {"segun": "Mercury", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Mercury: drenar y cambiar el aceite de cola cada 100 horas o una vez por año. Si sale lechoso o con mucha limadura, llevarlo al taller."}, "engrase": {"segun": "Mercury", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Mercury: engrasar todos los puntos cada 100 horas o una vez por año (más seguido en agua salada). Las estrías del eje de transmisión las engrasa el taller."}, "bujias": {"segun": "Mercury", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Mercury: revisar y limpiar las bujías cada 100 horas o una vez por año."}, "filtro-combustible": {"segun": "Mercury", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Mercury: revisar el filtro de nafta y limpiar el filtro de toma del tanque cada 100 horas o una vez por año. Antes de cada uso, revisar que no haya pérdidas."}, "anodos": {"segun": "Mercury", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Mercury: revisar los ánodos cada 100 horas o una vez por año, y más seguido en agua salada."}, "carburador": {"segun": "Mercury", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Mercury: revisar la regulación del carburador cada 100 horas o una vez por año, si hace falta."}, "impulsor": {"segun": "Mercury", "cada": {"horas": 300, "meses": 36}, "notaMarca": "Mercury: el taller cambia el impulsor de la bomba de agua cada 300 horas o 3 años, o antes si recalienta o baja la presión de agua."}, "helice": {"segun": "Mercury", "notaMarca": "Mercury: revisar las palas de la hélice antes de cada uso."}}, "consejos": ["Rodaje con mezcla 25:1; después, 50:1 con aceite TC-W3.", "Cada 100 horas, Mercury indica también revisar el ajuste de tuercas y bulones y limpiar los depósitos del motor con Quicksilver Power Tune.", "Antes de cada uso, verificar que la piola de hombre al agua apague el motor."]},
    { id: "mercury-40-4t-efi", marca: "Mercury", modelo: "40 HP 4T EFI", familia: "mercury-40-60-4t-efi", potencia: 40, tiempos: "4T", alimentacion: "inyeccion", estado: "completo" },
    { id: "mercury-50-4t-efi", marca: "Mercury", modelo: "50 HP 4T EFI", familia: "mercury-40-60-4t-efi", potencia: 50, tiempos: "4T", alimentacion: "inyeccion", estado: "completo" },
    { id: "mercury-75-4t", marca: "Mercury", modelo: "75 HP 4T (2,1 L)", familia: "mercury-75-115-4t", potencia: 75, tiempos: "4T", alimentacion: "inyeccion", estado: "completo" },
    { id: "mercury-90-4t", marca: "Mercury", modelo: "90 HP 4T (2,1 L)", familia: "mercury-75-115-4t", potencia: 90, tiempos: "4T", alimentacion: "inyeccion", estado: "completo" },
    { id: "mercury-115-4t", marca: "Mercury", modelo: "115 HP 4T (2,1 L)", familia: "mercury-75-115-4t", potencia: 115, tiempos: "4T", alimentacion: "inyeccion", estado: "completo" },
    { id: "mercury-60-4t", marca: "Mercury", modelo: "60 HP 4T EFI", potencia: 60, tiempos: "4T", alimentacion: "inyeccion", estado: "completo",
      fuente: "Manual oficial de operación y mantenimiento Mercury 30/40/50/60 FourStroke (8M0231124, 2024)",
      datosTecnicos: [
        { dato: "Motor", valor: "4 cilindros en línea" },
        { dato: "Cilindrada", valor: "995 cc (65 × 75 mm)" },
        { dato: "Alimentación", valor: "Inyección electrónica (EFI)" },
        { dato: "Nafta", valor: "Sin plomo, 91 RON o más (fuera de EE. UU. y Canadá)" },
        { dato: "Aceite de motor", valor: "Mercury/Quicksilver 25W-40 semisintético o 10W-30 para 4T náuticos" },
        { dato: "Cantidad de aceite", valor: "3,0 L" },
        { dato: "Bujía", valor: "NGK DPR6EA-9 (equivale a Champion RA8HC)" },
        { dato: "Luz de bujía", valor: "1,0 mm" },
        { dato: "Ajuste de bujía", valor: "27 Nm" },
        { dato: "Aceite de cola", valor: "340 ml (cola de 83 mm) · 710 ml (cola de 108 mm, Bigfoot/Command Thrust)" },
        { dato: "Relación de cola", valor: "1,83 (cola de 83 mm) · 2,31 (cola de 108 mm)" },
        { dato: "Rango a fondo", valor: "5500 a 6000 rpm" },
        { dato: "Ralentí", valor: "Lo controla la computadora (ECM)" },
        { dato: "Batería", valor: "Sobre 0 °C: 350 CCA / 70 Ah · bajo 0 °C: 750 CCA / 100 Ah" }
      ],
      ajustes: {
        "enjuague": { segun: "Mercury", notaMarca: "Mercury: lavar el motor con agua dulce después de cada uso y enjuagar el circuito de refrigeración si se usó en agua salada o salobre." },
        "aceite-motor": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: revisar el nivel antes de cada uso. Cambiar aceite y filtro cada 100 horas o una vez por año." },
        "aceite-cola": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: cambiar el aceite de la cola cada 100 horas o una vez por año." },
        "engrase": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: engrasar todos los puntos cada 100 horas o una vez por año. Las estrías del eje de transmisión y del eje de hélice las engrasa el concesionario." },
        "anodos": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: revisar los ánodos cada 100 horas o una vez por año (más seguido en agua salada). Cambiarlos antes de que se gasten del todo y nunca pintarlos." },
        "filtro-combustible": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: el concesionario cambia los filtros del lado de succión cada 100 horas o una vez por año, y el filtro de alta presión cada 300 horas o 3 años." },
        "bujias": { segun: "Mercury", cada: { horas: 300, meses: 36 }, notaMarca: "Mercury: poner antiaferrante en las roscas cada 100 horas y cambiar las bujías cada 300 horas o 3 años." },
        "impulsor": { segun: "Mercury", cada: { horas: 300, meses: 36 }, notaMarca: "Mercury: el concesionario cambia el impulsor de la bomba de agua cada 300 horas o 3 años." },
        "termostato": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: en agua salada o salobre, revisar el termostato cada 100 horas o una vez por año." },
        "helice": { segun: "Mercury", notaMarca: "Mercury: revisar la hélice antes de cada uso." }
      },
      tareasExtra: [
        { id: "correa-accesorios", nombre: "Cambio de correa de accesorios", tiempos: "4T", cada: { horas: 300, meses: 36 }, quien: "mecanico", segun: "Mercury", porque: "Si la correa se corta, el motor deja de cargar la batería.", pasos: ["Mercury indica cambiarla cada 300 horas o 3 años.", "Tarea de concesionario o taller."], materiales: [] },
        { id: "trim", nombre: "Revisión del líquido del trim", tiempos: "4T", cada: { horas: 300, meses: 36 }, quien: "mecanico", segun: "Mercury", porque: "Con poco líquido, el trim no levanta el motor.", pasos: ["Mercury indica que el concesionario revise el nivel cada 300 horas o 3 años."], materiales: [] },
        { id: "fijacion-espejo", nombre: "Control del ajuste del motor al espejo", tiempos: "4T", cada: { usos: true }, quien: "usuario", segun: "Mercury", porque: "Un motor flojo en el espejo puede soltarse en marcha.", pasos: ["Antes de cada uso, revisar que los bulones de fijación al espejo estén firmes.", "El concesionario controla su torque cada 100 horas o una vez por año."], materiales: [] }
      ],
      consejos: [
        "Rodaje: la primera hora, a regímenes variados hasta 3500 rpm (media aceleración); la segunda hora, hasta 4500 rpm (3/4), con 1 minuto a fondo cada 10 minutos; las 8 horas siguientes, no más de 5 minutos seguidos a fondo.",
        "El manual cargado es el de 2024. Los 60 4T EFI anteriores tienen datos parecidos, pero conviene confirmarlos con el manual del motor.",
        "Los motores 60 4T viejos a carburador tienen otros datos: esta ficha no les sirve."
      ] },

    // ---------------- MERCURY JAPONÉS (base Tohatsu) ----------------
    // No existe Mercury 40 2T japonés de 2 cilindros (Juan, 11/11/2026): el Mercury 40 japonés es el de 3 cilindros 697 cc.
    { id: "mercury-40-2t-jp", marca: "Mercury", modelo: "40 HP 2T japonés", origen: "japonés", familia: "mercury-jp-40-2t", potencia: 40, tiempos: "2T", alimentacion: "carburador", estado: "completo", fuente: "Manual oficial Mercury 40/50 TwoStroke (8M0133466, 2017), 3 cilindros, 697 cc", "fuenteInterna": "Manual oficial Mercury 40/50 TwoStroke (8M0133466, 2017), 3 cilindros 697 cc, mismo motor que el Tohatsu M40D2/M50D2", 
      ajustes: {
        "enjuague": { segun: "Mercury", notaMarca: "Mercury: lavar el motor con agua dulce después de cada uso y enjuagar el circuito de refrigeración si se usó en agua salada, salobre o con barro (con el motor en marcha, para que abra el termostato)." },
        "aceite-cola": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: cambiar el aceite de cola cada 100 horas o una vez por año. Aceite Mercury/Quicksilver o API GL5 SAE 80 a 90, unos 500 ml." },
        "engrase": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: engrasar el motor y las estrías del eje de hélice cada 100 horas o una vez por año. Las estrías del eje de transmisión las engrasa el concesionario." },
        "anodos": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: revisar los ánodos (en la cola y en el cilindro) cada 100 horas o una vez por año. La aleta compensadora (trim tab) también funciona como ánodo." },
        "filtro-combustible": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: el concesionario cambia todos los filtros del lado de succión cada 100 horas o una vez por año." },
        "bujias": { segun: "Mercury", cada: { horas: 300, meses: 36 }, notaMarca: "Mercury: poner antiaferrante en las roscas cada 100 horas y cambiar las bujías cada 300 horas o 3 años." },
        "impulsor": { segun: "Mercury", cada: { horas: 300, meses: 36 }, notaMarca: "Mercury: el concesionario cambia el impulsor de la bomba de agua cada 300 horas o 3 años." },
        "termostato": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: en agua salada o salobre, revisar el termostato cada 100 horas o una vez por año." },
        "helice": { segun: "Mercury", notaMarca: "Mercury: revisar la hélice antes de cada uso." }
      },
      consejos: [
        "Según el manual Mercury: mezcla 50:1 con aceite TC-W3 (Mercury o Quicksilver Premium) en los modelos a mezcla (MH y EH), y 25:1 en el primer tanque del rodaje. En los modelos con inyección de aceite (EHO, EHPTO, EO y EPTO), en el rodaje se agrega mezcla 50:1 además del aceite del tanque de 2 L.",
        "Rodaje de 10 horas: 10 minutos al ralentí; hasta la hora, menos de media aceleración (unas 3000 rpm); hasta las 2 horas, menos de 3/4 (unas 4000 rpm); después, uso normal sin abusar del fondo.",
        "Bujía según Mercury: el 40 lleva NGK B7HS-10 / BR7HS-10 y el 50 NGK B8HS-10 / BR8HS-10, ambas con luz de 1,0 mm."
      ] },
    { id: "mercury-50-2t-jp", marca: "Mercury", modelo: "50 HP 2T japonés", origen: "japonés", familia: "mercury-jp-50-2t", potencia: 50, tiempos: "2T", alimentacion: "carburador", estado: "completo", fuente: "Manual oficial Mercury 40/50 TwoStroke (8M0133466, 2017), 3 cilindros, 697 cc", "fuenteInterna": "Manual oficial Mercury 40/50 TwoStroke (8M0133466, 2017), 3 cilindros 697 cc, mismo motor que el Tohatsu M40D2/M50D2", 
      ajustes: {
        "enjuague": { segun: "Mercury", notaMarca: "Mercury: lavar el motor con agua dulce después de cada uso y enjuagar el circuito de refrigeración si se usó en agua salada, salobre o con barro (con el motor en marcha, para que abra el termostato)." },
        "aceite-cola": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: cambiar el aceite de cola cada 100 horas o una vez por año. Aceite Mercury/Quicksilver o API GL5 SAE 80 a 90, unos 500 ml." },
        "engrase": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: engrasar el motor y las estrías del eje de hélice cada 100 horas o una vez por año. Las estrías del eje de transmisión las engrasa el concesionario." },
        "anodos": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: revisar los ánodos (en la cola y en el cilindro) cada 100 horas o una vez por año. La aleta compensadora (trim tab) también funciona como ánodo." },
        "filtro-combustible": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: el concesionario cambia todos los filtros del lado de succión cada 100 horas o una vez por año." },
        "bujias": { segun: "Mercury", cada: { horas: 300, meses: 36 }, notaMarca: "Mercury: poner antiaferrante en las roscas cada 100 horas y cambiar las bujías cada 300 horas o 3 años." },
        "impulsor": { segun: "Mercury", cada: { horas: 300, meses: 36 }, notaMarca: "Mercury: el concesionario cambia el impulsor de la bomba de agua cada 300 horas o 3 años." },
        "termostato": { segun: "Mercury", cada: { horas: 100, meses: 12 }, notaMarca: "Mercury: en agua salada o salobre, revisar el termostato cada 100 horas o una vez por año." },
        "helice": { segun: "Mercury", notaMarca: "Mercury: revisar la hélice antes de cada uso." }
      },
      consejos: [
        "Según el manual Mercury: mezcla 50:1 con aceite TC-W3 (Mercury o Quicksilver Premium) en los modelos a mezcla (MH y EH), y 25:1 en el primer tanque del rodaje. En los modelos con inyección de aceite (EHO, EHPTO, EO y EPTO), en el rodaje se agrega mezcla 50:1 además del aceite del tanque de 2 L.",
        "Rodaje de 10 horas: 10 minutos al ralentí; hasta la hora, menos de media aceleración (unas 3000 rpm); hasta las 2 horas, menos de 3/4 (unas 4000 rpm); después, uso normal sin abusar del fondo.",
        "Bujía según Mercury: el 40 lleva NGK B7HS-10 / BR7HS-10 y el 50 NGK B8HS-10 / BR8HS-10, ambas con luz de 1,0 mm."
      ] },
    { id: "mercury-25-seapro", marca: "Mercury", modelo: "25 HP Sea Pro 2T", origen: "japonés", familia: "mercury-jp-25-30-2t", potencia: 25, tiempos: "2T", alimentacion: "carburador", estado: "completo" },
    { id: "mercury-15-super-jp", marca: "Mercury", modelo: "15 HP Super japonés", origen: "japonés", familia: "mercury-jp-18-2t", potencia: 15, tiempos: "2T", alimentacion: "carburador", estado: "completo" },

    // ---------------- HONDA (todos 4 tiempos) ----------------
    { id: "honda-2d-4t", marca: "Honda", modelo: "BF2D 4T", potencia: 2, tiempos: "4T", alimentacion: "carburador", estado: "completo",
      fuente: "Manual del propietario oficial Honda BF2D (2003), de la carpeta de Juan",
      datosTecnicos: [
        { dato: "Motor", valor: "4 tiempos, OHV, 1 cilindro, 57 cc" },
        { dato: "Refrigeración", valor: "Por aire forzado (no tiene bomba de agua)" },
        { dato: "Embrague", valor: "Centrífugo" },
        { dato: "Aceite de motor", valor: "SAE 10W-30 API SG, SH o SJ · 0,25 L" },
        { dato: "Aceite de cola", valor: "SAE 90 API GL-4 o GL-5 · 0,05 L" },
        { dato: "Bujía", valor: "NGK CR4HSB o Denso U14FSR-UB" },
        { dato: "Luz de bujía", valor: "0,6 a 0,7 mm" },
        { dato: "Ralentí", valor: "2000 ± 100 rpm" },
        { dato: "Rango a fondo", valor: "5000 a 6000 rpm" },
        { dato: "Tanque incorporado", valor: "1,0 L" }
      ],
      ajustes: {
        "impulsor": { noAplica: true },
        "termostato": { noAplica: true },
        "aceite-motor": { segun: "Honda", cada: { horas: 50, meses: 6, primeraHoras: 10 }, notaMarca: "Honda: revisar el nivel en cada uso. Cambiar al mes o a las 10 horas y después cada 6 meses o 50 horas." },
        "aceite-cola": { segun: "Honda", cada: { horas: 50, meses: 6, primeraHoras: 10 }, notaMarca: "Honda: cambiar al mes o a las 10 horas y después cada 6 meses o 50 horas." },
        "bujias": { segun: "Honda", cada: { horas: 50, meses: 6 }, notaMarca: "Honda: revisar y calibrar cada 6 meses o 50 horas, y cambiar cada 200 horas." },
        "engrase": { segun: "Honda", cada: { horas: 50, meses: 6, primeraHoras: 10 }, notaMarca: "Honda: engrasar al mes o a las 10 horas y después cada 6 meses o 50 horas. Más seguido en agua salada." },
        "anodos": { segun: "Honda", cada: { usos: true }, notaMarca: "Honda: revisar el ánodo en cada uso." },
        "helice": { segun: "Honda", cada: { usos: true }, notaMarca: "Honda: revisar hélice y pasador en cada uso." },
        "filtro-combustible": { segun: "Honda", cada: { horas: 50, meses: 6 }, notaMarca: "Honda: el concesionario limpia el tanque y su filtro cada 6 meses o 50 horas." },
        "valvulas": { segun: "Honda", cada: { horas: 150, meses: 12 }, notaMarca: "Honda: controlar y ajustar una vez por año o cada 150 horas. Tarea de concesionario." },
        "carburador": { segun: "Honda", cada: { horas: 50, meses: 6, primeraHoras: 10 }, notaMarca: "Honda: revisar el varillaje y el ralentí al mes o a las 10 horas y después cada 6 meses o 50 horas. Tarea de concesionario." }
      },
      tareasExtra: [
        { id: "cuerda-arranque", nombre: "Revisión de la cuerda de arranque", cada: { horas: 50, meses: 6, primeraHoras: 10 }, quien: "usuario", segun: "Honda", porque: "Una cuerda gastada se corta al arrancar.", pasos: ["Honda indica revisarla al mes o a las 10 horas y después cada 6 meses o 50 horas."], materiales: [] },
        { id: "embrague", nombre: "Cambio de zapatas y campana de embrague", cada: { horas: 150, meses: 12 }, quien: "mecanico", segun: "Honda", porque: "El embrague centrífugo se gasta y el motor deja de transmitir.", pasos: ["Honda indica cambiarlos una vez por año o cada 150 horas. Tarea de concesionario."], materiales: [] },
        { id: "buje-sello", nombre: "Cambio del buje del soporte y del sello de agua", cada: { meses: 36 }, quien: "mecanico", segun: "Honda", porque: "El desgaste deja juego en la dirección y deja entrar agua.", pasos: ["Honda indica cambiarlos cada 3 años. Tarea de concesionario."], materiales: [] }
      ],
      consejos: ["Es refrigerado por aire: las tareas de bomba de agua, termostato y enjuague del circuito de refrigeración no corresponden.", "Revisar el nivel de aceite antes de cada uso, con el motor vertical."] },
    { id: "honda-9.9a-4t", marca: "Honda", modelo: "BF9.9A 4T", familia: "honda-9.9a-15a", potencia: 9.9, tiempos: "4T", alimentacion: "carburador", estado: "completo" },
    { id: "honda-15a-4t", marca: "Honda", modelo: "BF15A 4T (modelo anterior)", familia: "honda-9.9a-15a", potencia: 15, tiempos: "4T", alimentacion: "carburador", estado: "completo" },
    { id: "honda-40a-4t", marca: "Honda", modelo: "BF40A 4T (carburador)", familia: "honda-40a-50a", potencia: 40, tiempos: "4T", alimentacion: "carburador", estado: "completo" },
    { id: "honda-50a-4t", marca: "Honda", modelo: "BF50A 4T (carburador)", familia: "honda-40a-50a", potencia: 50, tiempos: "4T", alimentacion: "carburador", estado: "completo" },
    { id: "honda-25a-4t", marca: "Honda", modelo: "BF25A 4T (modelo anterior)", familia: "honda-25a-30a", potencia: 25, tiempos: "4T", alimentacion: "carburador", estado: "completo" },
    { id: "honda-30a-4t", marca: "Honda", modelo: "BF30A 4T (modelo anterior)", familia: "honda-25a-30a", potencia: 30, tiempos: "4T", alimentacion: "carburador", estado: "completo" },
    { id: "honda-15-4t", marca: "Honda", modelo: "BF15 4T", familia: "honda-15-20", potencia: 15, tiempos: "4T", alimentacion: "carburador", estado: "completo" },
    { id: "honda-20-4t", marca: "Honda", modelo: "BF20 4T", familia: "honda-15-20", potencia: 20, tiempos: "4T", alimentacion: "carburador", estado: "completo" },
    { id: "honda-30-4t", marca: "Honda", modelo: "BF30 4T", familia: "honda-25-30", potencia: 30, tiempos: "4T", alimentacion: "carburador", estado: "completo" },
    { id: "honda-40-4t", marca: "Honda", modelo: "BF40 4T", familia: "honda-40-50", potencia: 40, tiempos: "4T", alimentacion: "inyeccion", estado: "completo" },
    { id: "honda-50-4t", marca: "Honda", modelo: "BF50 4T", familia: "honda-40-50", potencia: 50, tiempos: "4T", alimentacion: "inyeccion", estado: "completo" },
    { id: "honda-60-4t", marca: "Honda", modelo: "BF60 4T", familia: "honda-60", potencia: 60, tiempos: "4T", alimentacion: "inyeccion", estado: "completo" },
    { id: "honda-90-4t", marca: "Honda", modelo: "BF90 4T", familia: "honda-75-90", potencia: 90, tiempos: "4T", alimentacion: "inyeccion", estado: "completo" },

    // ---------------- TOHATSU ----------------
    { id: "tohatsu-40c-2t", marca: "Tohatsu", modelo: "40 HP 2T M40C (2 cilindros)", origen: "japonés", familia: "tohatsu-40c-2t", potencia: 40, tiempos: "2T", alimentacion: "carburador", estado: "completo" },
    { id: "tohatsu-40-2t", marca: "Tohatsu", modelo: "40 HP 2T M40D2 (3 cilindros)", origen: "japonés", familia: "tohatsu-40-2t", potencia: 40, tiempos: "2T", alimentacion: "carburador", estado: "completo" },
    { id: "tohatsu-50-2t", marca: "Tohatsu", modelo: "50 HP 2T", origen: "japonés", familia: "tohatsu-50-2t", potencia: 50, tiempos: "2T", alimentacion: "carburador", estado: "completo" },
    { id: "tohatsu-25-2t", marca: "Tohatsu", modelo: "25 HP 2T", origen: "japonés", familia: "tohatsu-25-30-2t", potencia: 25, tiempos: "2T", alimentacion: "carburador", estado: "completo" },
    { id: "tohatsu-30-2t", marca: "Tohatsu", modelo: "30 HP 2T", origen: "japonés", familia: "tohatsu-25-30-2t", potencia: 30, tiempos: "2T", alimentacion: "carburador", estado: "completo" },
    { id: "tohatsu-18-2t", marca: "Tohatsu", modelo: "18 HP 2T", origen: "japonés", familia: "tohatsu-18-2t", potencia: 18, tiempos: "2T", alimentacion: "carburador", estado: "completo" },

    // ---- Agregados el 11/11/2026 (modelos que se venden hoy en la Argentina) ----
    {"id": "tohatsu-3.5-2t", "marca": "Tohatsu", "modelo": "M3.5 2T", "origen": "japonés", "familia": "tohatsu-m2.5-3.5-2t", "potencia": 3.5, "tiempos": "2T", "alimentacion": "carburador", "estado": "completo"},
    {"id": "tohatsu-5-2t", "marca": "Tohatsu", "modelo": "M5 2T", "origen": "japonés", "familia": "tohatsu-m4-5-2t", "potencia": 5, "tiempos": "2T", "alimentacion": "carburador", "estado": "completo"},
    {"id": "tohatsu-9.9-2t", "marca": "Tohatsu", "modelo": "M9.9 2T", "origen": "japonés", "familia": "tohatsu-9.9-15-2t", "potencia": 9.9, "tiempos": "2T", "alimentacion": "carburador", "estado": "completo"},
    {"id": "tohatsu-15-2t", "marca": "Tohatsu", "modelo": "M15 2T", "origen": "japonés", "familia": "tohatsu-9.9-15-2t", "potencia": 15, "tiempos": "2T", "alimentacion": "carburador", "estado": "completo"},
    {"id": "tohatsu-mfs2.5", "marca": "Tohatsu", "modelo": "MFS2.5 4T", "origen": "japonés", "familia": "tohatsu-mfs2.5-3.5", "potencia": 2.5, "tiempos": "4T", "alimentacion": "carburador", "estado": "completo"},
    {"id": "tohatsu-mfs3.5", "marca": "Tohatsu", "modelo": "MFS3.5 4T", "origen": "japonés", "familia": "tohatsu-mfs2.5-3.5", "potencia": 3.5, "tiempos": "4T", "alimentacion": "carburador", "estado": "completo"},
    {"id": "tohatsu-mfs5", "marca": "Tohatsu", "modelo": "MFS5 4T", "origen": "japonés", "familia": "tohatsu-mfs4-6", "potencia": 5, "tiempos": "4T", "alimentacion": "carburador", "estado": "completo"},
    {"id": "tohatsu-mfs6", "marca": "Tohatsu", "modelo": "MFS6 4T", "origen": "japonés", "familia": "tohatsu-mfs4-6", "potencia": 6, "tiempos": "4T", "alimentacion": "carburador", "estado": "completo"},
    {"id": "tohatsu-mfs9.9", "marca": "Tohatsu", "modelo": "MFS9.9 4T", "origen": "japonés", "familia": "tohatsu-mfs6-9.9", "potencia": 9.9, "tiempos": "4T", "alimentacion": "inyeccion", "estado": "completo"},
    {"id": "tohatsu-mfs15", "marca": "Tohatsu", "modelo": "MFS15 4T", "origen": "japonés", "familia": "tohatsu-mfs9.9-20", "potencia": 15, "tiempos": "4T", "alimentacion": "inyeccion", "estado": "completo"},
    {"id": "tohatsu-mfs20", "marca": "Tohatsu", "modelo": "MFS20 4T", "origen": "japonés", "familia": "tohatsu-mfs9.9-20", "potencia": 20, "tiempos": "4T", "alimentacion": "inyeccion", "estado": "completo"},
    {"id": "tohatsu-mfs25", "marca": "Tohatsu", "modelo": "MFS25 4T", "origen": "japonés", "familia": "tohatsu-mfs25-30", "potencia": 25, "tiempos": "4T", "alimentacion": "inyeccion", "estado": "completo"},
    {"id": "tohatsu-mfs30", "marca": "Tohatsu", "modelo": "MFS30 4T", "origen": "japonés", "familia": "tohatsu-mfs25-30", "potencia": 30, "tiempos": "4T", "alimentacion": "inyeccion", "estado": "completo"},
    {"id": "tohatsu-mfs40", "marca": "Tohatsu", "modelo": "MFS40 4T", "origen": "japonés", "familia": "tohatsu-mfs40-60", "potencia": 40, "tiempos": "4T", "alimentacion": "inyeccion", "estado": "completo"},
    {"id": "tohatsu-mfs50", "marca": "Tohatsu", "modelo": "MFS50 4T", "origen": "japonés", "familia": "tohatsu-mfs40-60", "potencia": 50, "tiempos": "4T", "alimentacion": "inyeccion", "estado": "completo"},
    {"id": "tohatsu-mfs60", "marca": "Tohatsu", "modelo": "MFS60 4T", "origen": "japonés", "familia": "tohatsu-mfs40-60", "potencia": 60, "tiempos": "4T", "alimentacion": "inyeccion", "estado": "completo"},
    {"id": "mercury-2.5-2t", "marca": "Mercury", "modelo": "2.5 HP 2T", "origen": "japonés", "familia": "mercury-jp-m2.5-3.5-2t", "potencia": 2.5, "tiempos": "2T", "alimentacion": "carburador", "estado": "completo", "fuente": "Manual oficial del fabricante del motor. Confirmar con el manual Mercury del motor", "fuenteInterna": "Datos del manual oficial Tohatsu M2.5 / M3.5 (003-11045): Mercury vende este motor con base Tohatsu (Tohatsu M2.5). Confirmar con el manual Mercury del motor.", "consejos": ["Para estar seguro de que su motor es este, compare la cilindrada de la chapa o del manual con la de esta ficha."]},
    {"id": "mercury-3.3-2t", "marca": "Mercury", "modelo": "3.3 HP 2T", "origen": "japonés", "familia": "mercury-jp-m2.5-3.5-2t", "potencia": 3.3, "tiempos": "2T", "alimentacion": "carburador", "estado": "completo", "fuente": "Manual oficial del fabricante del motor. Confirmar con el manual Mercury del motor", "fuenteInterna": "Datos del manual oficial Tohatsu M2.5 / M3.5 (003-11045): Mercury vende este motor con base Tohatsu (Tohatsu M3.5). Confirmar con el manual Mercury del motor.", "consejos": ["Para estar seguro de que su motor es este, compare la cilindrada de la chapa o del manual con la de esta ficha."]},
    {"id": "mercury-4-2t", "marca": "Mercury", "modelo": "4 HP 2T", "origen": "japonés", "familia": "mercury-jp-m4-5-2t", "potencia": 4, "tiempos": "2T", "alimentacion": "carburador", "estado": "completo", "fuente": "Manual oficial del fabricante del motor. Confirmar con el manual Mercury del motor", "fuenteInterna": "Datos del manual oficial Tohatsu M4C / M5B (003-11068): Mercury vende este motor con base Tohatsu (Tohatsu M4C). Confirmar con el manual Mercury del motor.", "consejos": ["Para estar seguro de que su motor es este, compare la cilindrada de la chapa o del manual con la de esta ficha."]},
    {"id": "mercury-5-2t", "marca": "Mercury", "modelo": "5 HP 2T", "origen": "japonés", "familia": "mercury-jp-m4-5-2t", "potencia": 5, "tiempos": "2T", "alimentacion": "carburador", "estado": "completo", "fuente": "Manual oficial del fabricante del motor. Confirmar con el manual Mercury del motor", "fuenteInterna": "Datos del manual oficial Tohatsu M4C / M5B (003-11068): Mercury vende este motor con base Tohatsu (Tohatsu M5B). Confirmar con el manual Mercury del motor.", "consejos": ["Para estar seguro de que su motor es este, compare la cilindrada de la chapa o del manual con la de esta ficha."]},
    {"id": "mercury-8-2t", "marca": "Mercury", "modelo": "8 HP 2T", "origen": "japonés", "familia": "mercury-jp-m8-9.8-2t", "potencia": 8, "tiempos": "2T", "alimentacion": "carburador", "estado": "completo", "fuente": "Manual oficial del fabricante del motor. Confirmar con el manual Mercury del motor", "fuenteInterna": "Datos del manual oficial Tohatsu M8B / M9.8B (003-11029): Mercury vende este motor con base Tohatsu (Tohatsu M8B). Confirmar con el manual Mercury del motor.", "consejos": ["Para estar seguro de que su motor es este, compare la cilindrada de la chapa o del manual con la de esta ficha."]},
    {"id": "mercury-9.9-2t", "marca": "Mercury", "modelo": "9.9 HP 2T", "origen": "japonés", "familia": "mercury-jp-m8-9.8-2t", "potencia": 9.9, "tiempos": "2T", "alimentacion": "carburador", "estado": "completo", "fuente": "Manual oficial del fabricante del motor. Confirmar con el manual Mercury del motor", "fuenteInterna": "Datos del manual oficial Tohatsu M8B / M9.8B (003-11029): Mercury vende este motor con base Tohatsu (Tohatsu M9.8B, 169 cc). Confirmar con el manual Mercury del motor.", "consejos": ["Para estar seguro de que su motor es este, compare la cilindrada de la chapa o del manual con la de esta ficha.", "Si su Mercury 9.9 2T es de 247 cc, es otra versión del motor: consulte en el taller."]},
    {"id": "mercury-30-2t", "marca": "Mercury", "modelo": "30 HP 2T", "origen": "japonés", "familia": "mercury-jp-25-30-2t", "potencia": 30, "tiempos": "2T", "alimentacion": "carburador", "estado": "completo", "fuente": "Manual oficial del fabricante del motor. Confirmar con el manual Mercury del motor", "fuenteInterna": "Datos del manual oficial Tohatsu MX25H / MX30H (003-11099): Mercury vende este motor con base Tohatsu (Tohatsu M30H). Confirmar con el manual Mercury del motor.", "consejos": ["Para estar seguro de que su motor es este, compare la cilindrada de la chapa o del manual con la de esta ficha."]},
    {"id": "mercury-2.5-4t", "marca": "Mercury", "modelo": "FourStroke 2.5 HP", "origen": "japonés", "familia": "mercury-jp-mfs2.5-3.5", "potencia": 2.5, "tiempos": "4T", "alimentacion": "carburador", "estado": "completo", "fuente": "Manual oficial del fabricante del motor. Confirmar con el manual Mercury del motor", "fuenteInterna": "Datos del manual oficial Tohatsu MFS2.5C / 3.5C (003-11151): Mercury vende este motor con base Tohatsu (Tohatsu MFS2.5). Confirmar con el manual Mercury del motor.", "consejos": ["Para estar seguro de que su motor es este, compare la cilindrada de la chapa o del manual con la de esta ficha."]},
    {"id": "mercury-3.5-4t", "marca": "Mercury", "modelo": "FourStroke 3.5 HP", "origen": "japonés", "familia": "mercury-jp-mfs2.5-3.5", "potencia": 3.5, "tiempos": "4T", "alimentacion": "carburador", "estado": "completo", "fuente": "Manual oficial del fabricante del motor. Confirmar con el manual Mercury del motor", "fuenteInterna": "Datos del manual oficial Tohatsu MFS2.5C / 3.5C (003-11151): Mercury vende este motor con base Tohatsu (Tohatsu MFS3.5). Confirmar con el manual Mercury del motor.", "consejos": ["Para estar seguro de que su motor es este, compare la cilindrada de la chapa o del manual con la de esta ficha."]},
    {"id": "mercury-4-4t", "marca": "Mercury", "modelo": "FourStroke 4 HP", "origen": "japonés", "familia": "mercury-jp-mfs4-6", "potencia": 4, "tiempos": "4T", "alimentacion": "carburador", "estado": "completo", "fuente": "Manual oficial del fabricante del motor. Confirmar con el manual Mercury del motor", "fuenteInterna": "Datos del manual oficial Tohatsu MFS4D / 5D / 6D (003-11154): Mercury vende este motor con base Tohatsu (Tohatsu MFS4, 123 cc). Confirmar con el manual Mercury del motor.", "consejos": ["Para estar seguro de que su motor es este, compare la cilindrada de la chapa o del manual con la de esta ficha."]},
    {"id": "mercury-5-4t", "marca": "Mercury", "modelo": "FourStroke 5 HP", "origen": "japonés", "familia": "mercury-jp-mfs4-6", "potencia": 5, "tiempos": "4T", "alimentacion": "carburador", "estado": "completo", "fuente": "Manual oficial del fabricante del motor. Confirmar con el manual Mercury del motor", "fuenteInterna": "Datos del manual oficial Tohatsu MFS4D / 5D / 6D (003-11154): Mercury vende este motor con base Tohatsu (Tohatsu MFS5, 123 cc). Confirmar con el manual Mercury del motor.", "consejos": ["Para estar seguro de que su motor es este, compare la cilindrada de la chapa o del manual con la de esta ficha."]},
    {"id": "mercury-6-4t", "marca": "Mercury", "modelo": "FourStroke 6 HP", "origen": "japonés", "familia": "mercury-jp-mfs4-6", "potencia": 6, "tiempos": "4T", "alimentacion": "carburador", "estado": "completo", "fuente": "Manual oficial del fabricante del motor. Confirmar con el manual Mercury del motor", "fuenteInterna": "Datos del manual oficial Tohatsu MFS4D / 5D / 6D (003-11154): Mercury vende este motor con base Tohatsu (Tohatsu MFS6, 123 cc). Confirmar con el manual Mercury del motor.", "consejos": ["Para estar seguro de que su motor es este, compare la cilindrada de la chapa o del manual con la de esta ficha."]},
    {"id": "mercury-8-4t", "marca": "Mercury", "modelo": "FourStroke 8 HP", "origen": "japonés", "familia": "mercury-jp-mfs6-9.9", "potencia": 8, "tiempos": "4T", "alimentacion": "inyeccion", "estado": "completo", "fuente": "Manual oficial del fabricante del motor. Confirmar con el manual Mercury del motor", "fuenteInterna": "Datos del manual oficial Tohatsu MFS6C / 8C / 9.9C (003-11175): Mercury vende este motor con base Tohatsu (Tohatsu MFS8, 209 cc). Confirmar con el manual Mercury del motor.", "consejos": ["Para estar seguro de que su motor es este, compare la cilindrada de la chapa o del manual con la de esta ficha."]},
    {"id": "mercury-9.9-4t", "marca": "Mercury", "modelo": "FourStroke 9.9 HP", "origen": "japonés", "familia": "mercury-jp-mfs6-9.9", "potencia": 9.9, "tiempos": "4T", "alimentacion": "inyeccion", "estado": "completo", "fuente": "Manual oficial del fabricante del motor. Confirmar con el manual Mercury del motor", "fuenteInterna": "Datos del manual oficial Tohatsu MFS6C / 8C / 9.9C (003-11175): Mercury vende este motor con base Tohatsu (Tohatsu MFS9.9, 209 cc). Confirmar con el manual Mercury del motor.", "consejos": ["Para estar seguro de que su motor es este, compare la cilindrada de la chapa o del manual con la de esta ficha.", "Algunos Mercury 9.9 4T nuevos son de 333 cc: en ese caso use la ficha del Mercury FourStroke 15 HP."]},
    {"id": "mercury-15-4t", "marca": "Mercury", "modelo": "FourStroke 15 HP", "familia": "mercury-jp-mfs9.9-20", "potencia": 15, "tiempos": "4T", "alimentacion": "inyeccion", "estado": "completo", "fuente": "Manual oficial del fabricante del motor. Confirmar con el manual Mercury del motor", "fuenteInterna": "Datos del manual oficial Tohatsu MFS9.9E / 15E / 20E (003-11144), mismo motor de 333 cc que el Mercury 15/20 FourStroke. Confirmar con el manual Mercury del motor.", "consejos": ["Para estar seguro de que su motor es este, compare la cilindrada de la chapa o del manual con la de esta ficha."]},
    {"id": "mercury-20-4t", "marca": "Mercury", "modelo": "FourStroke 20 HP", "familia": "mercury-jp-mfs9.9-20", "potencia": 20, "tiempos": "4T", "alimentacion": "inyeccion", "estado": "completo", "fuente": "Manual oficial del fabricante del motor. Confirmar con el manual Mercury del motor", "fuenteInterna": "Datos del manual oficial Tohatsu MFS9.9E / 15E / 20E (003-11144), mismo motor de 333 cc que el Mercury 15/20 FourStroke. Confirmar con el manual Mercury del motor.", "consejos": ["Para estar seguro de que su motor es este, compare la cilindrada de la chapa o del manual con la de esta ficha."]},
    {"id": "mercury-25-4t", "marca": "Mercury", "modelo": "FourStroke 25 HP", "familia": "mercury-jp-mfs25-30", "potencia": 25, "tiempos": "4T", "alimentacion": "inyeccion", "estado": "completo", "fuente": "Manual oficial del fabricante del motor. Confirmar con el manual Mercury del motor", "fuenteInterna": "Datos del manual oficial Tohatsu MFS25D / 30D (003-11171), mismo motor de 3 cilindros y 500 cc que el Mercury 25/30 FourStroke. Confirmar con el manual Mercury del motor.", "consejos": ["Para estar seguro de que su motor es este, compare la cilindrada de la chapa o del manual con la de esta ficha."]},
    {"id": "mercury-30-4t", "marca": "Mercury", "modelo": "FourStroke 30 HP", "familia": "mercury-jp-mfs25-30", "potencia": 30, "tiempos": "4T", "alimentacion": "inyeccion", "estado": "completo", "fuente": "Manual oficial del fabricante del motor. Confirmar con el manual Mercury del motor", "fuenteInterna": "Datos del manual oficial Tohatsu MFS25D / 30D (003-11171), mismo motor de 3 cilindros y 500 cc que el Mercury 25/30 FourStroke. Confirmar con el manual Mercury del motor.", "consejos": ["Para estar seguro de que su motor es este, compare la cilindrada de la chapa o del manual con la de esta ficha."]},
    {"id": "honda-2.3-4t", "marca": "Honda", "modelo": "BF2.3 4T", "familia": "honda-2.3", "potencia": 2.3, "tiempos": "4T", "alimentacion": "carburador", "estado": "completo"},
    {"id": "honda-5-4t", "marca": "Honda", "modelo": "BF5 4T", "familia": "honda-5", "potencia": 5, "tiempos": "4T", "alimentacion": "carburador", "estado": "completo"},
    {"id": "honda-8-4t", "marca": "Honda", "modelo": "BF8 4T", "familia": "honda-8-10", "potencia": 8, "tiempos": "4T", "alimentacion": "carburador", "estado": "completo"},
    {"id": "honda-10-4t", "marca": "Honda", "modelo": "BF10 4T", "familia": "honda-8-10", "potencia": 10, "tiempos": "4T", "alimentacion": "carburador", "estado": "completo"},
    {"id": "yamaha-50-4t", "marca": "Yamaha", "modelo": "F50 4T (F50H)", "potencia": 50, "tiempos": "4T", "alimentacion": "inyeccion", "estado": "completo", "fuente": "Manual del propietario oficial Yamaha F40H / F50H / F60F / F70A (6C1-28199-7B, 2012), modelo F50HET. Ficha técnica oficial Yamaha Argentina F50LETL: 996 cc, aceite 1,9 L (2,1 L con filtro)", "datosTecnicos": [{"dato": "Motor", "valor": "4 cilindros en línea, SOHC, 8 válvulas"}, {"dato": "Cilindrada", "valor": "996 cc (65 × 75 mm)"}, {"dato": "Alimentación", "valor": "Inyección electrónica"}, {"dato": "Encendido", "valor": "TCI"}, {"dato": "Nafta", "valor": "Sin plomo, 90 RON o más"}, {"dato": "Aceite de motor", "valor": "Yamalube 4 o aceite 4T náutico · SAE 10W-30, 10W-40 o 5W-30 · API SE a SL"}, {"dato": "Cantidad de aceite", "valor": "1,9 L sin cambiar filtro · 2,1 L con filtro"}, {"dato": "Bujía NGK", "valor": "DPR6EB-9"}, {"dato": "Luz de bujía", "valor": "0,8 a 0,9 mm"}, {"dato": "Ajuste de bujía", "valor": "18 Nm"}, {"dato": "Tapón de aceite / filtro", "valor": "28 Nm / 18 Nm"}, {"dato": "Luz de válvulas en frío", "valor": "Admisión 0,15 a 0,25 mm · escape 0,25 a 0,35 mm"}, {"dato": "Aceite de cola", "valor": "Hipoide SAE 90 API GL-4 · 430 ml"}, {"dato": "Ralentí en neutro", "valor": "700 a 800 rpm"}, {"dato": "Rango a fondo", "valor": "5000 a 6000 rpm"}, {"dato": "Relación de cola", "valor": "1,85 (24/13)"}, {"dato": "Ajuste tuerca de hélice", "valor": "35 Nm"}, {"dato": "Batería mínima", "valor": "430 CCA · 70 Ah"}], "ajustes": {"enjuague": {"segun": "Yamaha", "notaMarca": "Yamaha: en agua salada, turbia o con barro, enjuagar con agua dulce después de cada uso."}, "aceite-cola": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Yamaha: primer cambio a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Si sale lechoso, entra agua por los retenes."}, "engrase": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Yamaha: engrasar a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Grasa resistente al agua; en el eje de hélice, grasa anticorrosiva."}, "bujias": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Yamaha: revisar o cambiar cada 100 horas o una vez por año."}, "filtro-combustible": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Yamaha: revisar o cambiar a las 20 horas y después cada 100 horas o una vez por año. El tanque portátil se revisa y limpia cada 100 horas o una vez por año."}, "helice": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Yamaha: revisar hélice, tuerca y pasador a las 20 horas y después cada 100 horas o una vez por año."}, "anodos": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Yamaha: revisar el ánodo exterior cada 100 horas o una vez por año. Los ánodos internos los cambia el concesionario cada 500 horas o 5 años."}, "impulsor": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Yamaha: el concesionario revisa la bomba de agua cada 100 horas o una vez por año y cambia el impulsor cada 300 horas o 3 años."}, "termostato": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Yamaha: revisión de concesionario cada 100 horas o una vez por año."}, "aceite-motor": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Yamaha: primer cambio a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. El filtro de aceite se cambia cada 100 horas o una vez por año."}, "valvulas": {"segun": "Yamaha", "cada": {"horas": 500, "meses": 60}, "notaMarca": "Yamaha: control y ajuste de luz de válvulas por el concesionario cada 500 horas o 5 años."}}, "tareasExtra": [{"id": "filtro-aceite", "nombre": "Cambio de filtro de aceite", "tiempos": "4T", "cada": {"horas": 100, "meses": 12}, "quien": "mecanico", "segun": "Yamaha", "porque": "Retiene las partículas del aceite. Yamaha indica cambiarlo cada 100 horas o una vez por año.", "pasos": ["Se cambia junto con el aceite de motor.", "Ajuste del filtro: 18 Nm."], "materiales": ["Filtro de aceite original Yamaha"]}, {"id": "correa", "nombre": "Revisión de correa de distribución", "tiempos": "4T", "cada": {"horas": 100, "meses": 12}, "quien": "mecanico", "segun": "Yamaha", "porque": "Si la correa se corta, el motor se detiene y puede dañarse.", "pasos": ["Yamaha indica revisarla cada 100 horas o una vez por año, y cambiarla cada 1000 horas.", "Tarea de concesionario o taller."], "materiales": []}, {"id": "trim", "nombre": "Revisión del trim y levante hidráulico", "tiempos": "4T", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "quien": "usuario", "segun": "Yamaha", "porque": "Una pérdida de líquido deja el motor sin levante.", "pasos": ["Yamaha: revisar a las 20 horas y después cada 100 horas o una vez por año.", "Buscar pérdidas de aceite y que suba y baje sin tirones."], "materiales": []}], "consejos": ["Revisar el nivel de aceite de motor antes de cada salida, con el motor vertical y frío.", "Si se enciende el aviso de baja presión de aceite, apagar el motor y revisar el nivel antes de seguir.", "Rodaje de 10 horas, evitando el ralentí prolongado: primera hora a regímenes variados hasta 2000 rpm (media aceleración); segunda hora, acelerar lo justo para planear, sin ir a fondo; las 8 horas restantes a cualquier régimen, sin pasar 5 minutos seguidos a fondo."]},
    {"id": "yamaha-4-2t", "marca": "Yamaha", "modelo": "4C 2T", "potencia": 4, "tiempos": "2T", "alimentacion": "carburador", "estado": "completo", "fuente": "Ficha técnica oficial Yamaha Argentina (4CMHS, yamaha-motor.com.ar). Intervalos generales: la ficha oficial no trae el plan de mantenimiento y falta el manual del propietario de este modelo.", "datosTecnicos": [{"dato": "Cilindros", "valor": "1"}, {"dato": "Cilindrada", "valor": "103 cc (54 × 45 mm)"}, {"dato": "Alimentación", "valor": "Carburador"}, {"dato": "Encendido", "valor": "CDI"}, {"dato": "Mezcla nafta/aceite", "valor": "50:1 (rodaje: 25:1)"}, {"dato": "Aceite 2T", "valor": "Yamalube 2T o náutico TC-W3"}, {"dato": "Bujía NGK", "valor": "B7HS (resistiva: BR7HS)"}, {"dato": "Ralentí", "valor": "1000 a 1100 rpm"}, {"dato": "Rango a fondo", "valor": "4500 a 5500 rpm"}, {"dato": "Tanque", "valor": "Integral de 2,8 litros"}, {"dato": "Relación de cola", "valor": "2,08 (27:13)"}], "consejos": ["Hasta tener el manual del propietario, los intervalos de service son generales. Ante la duda, consulte al taller."]},
    {"id": "yamaha-8-2t", "marca": "Yamaha", "modelo": "E8D 2T (Enduro)", "potencia": 8, "tiempos": "2T", "alimentacion": "carburador", "estado": "completo", "fuente": "Ficha técnica oficial Yamaha Argentina E8DMHS y manual del propietario Yamaha E8D (copia en manuals.online, primeras páginas). El plan de mantenimiento no se pudo leer: intervalos generales.", "datosTecnicos": [{"dato": "Cilindros", "valor": "2"}, {"dato": "Cilindrada", "valor": "165 cc (50 × 42 mm)"}, {"dato": "Alimentación", "valor": "Carburador"}, {"dato": "Encendido", "valor": "CDI"}, {"dato": "Aceite 2T", "valor": "Yamalube 2T o náutico TC-W3"}, {"dato": "Refrigeración", "valor": "Por agua, con termostato"}, {"dato": "Ralentí", "valor": "1200 a 1300 rpm"}, {"dato": "Rango a fondo", "valor": "4500 a 5500 rpm"}, {"dato": "Mezcla nafta/aceite", "valor": "50:1 (rodaje: 25:1) con Yamalube 2T o aceite TC-W3"}, {"dato": "Tanque", "valor": "Aparte, 24 litros"}], "consejos": ["Rodaje según Yamaha: los primeros 10 minutos en ralentí y después, durante 50 minutos, no pasar de media aceleración.", "El plan de Yamaha para estos motores tiene controles al inicio (20 h o 3 meses), cada 100 h o 1 año, cada 300 h o 3 años y cada 500 h o 5 años. Las tareas de cada columna no se pudieron leer: por eso los intervalos de la app son generales."]},
    {"id": "yamaha-8-4t", "marca": "Yamaha", "modelo": "F8F 4T", "potencia": 8, "tiempos": "4T", "alimentacion": "carburador", "estado": "completo", "fuente": "Manual del propietario oficial Yamaha F9.9J / FT9.9L (6DR-28199-72-E0, 2014): plan de mantenimiento, mismo motor de 212 cc que el F8F. Datos técnicos: ficha técnica oficial Yamaha Argentina F8FMHS.", "datosTecnicos": [{"dato": "Motor", "valor": "4 tiempos, SOHC, 2 cilindros, 4 válvulas"}, {"dato": "Cilindrada", "valor": "212 cc (56 × 43 mm)"}, {"dato": "Alimentación", "valor": "Carburador"}, {"dato": "Encendido", "valor": "CDI"}, {"dato": "Bujía NGK", "valor": "BR6HS-10"}, {"dato": "Ralentí", "valor": "1000 a 1100 rpm"}, {"dato": "Rango a fondo", "valor": "5000 a 6000 rpm"}, {"dato": "Relación de cola", "valor": "2,08 (27:13)"}, {"dato": "Aceite de motor", "valor": "Yamalube 4T náutico, SAE 10W-30, 10W-40 o 5W-30 · 0,8 L"}, {"dato": "Filtro de aceite", "valor": "Malla dentro del cárter (se revisa y limpia)"}, {"dato": "Luz de válvulas en frío", "valor": "Admisión 0,15 a 0,20 mm · escape 0,20 a 0,25 mm (F8F)"}, {"dato": "Aceite de cola", "valor": "Hipoide SAE 90 API GL-4 · 150 ml (pata corta)"}, {"dato": "Luz de bujía", "valor": "0,9 a 1,0 mm"}], "consejos": ["El plan de Yamaha para estos motores tiene controles al inicio (20 h o 3 meses), cada 100 h o 1 año, cada 300 h o 3 años y cada 500 h o 5 años. Las tareas de cada columna no se pudieron leer: por eso los intervalos de la app son generales."], "ajustes": {"enjuague": {"segun": "Yamaha", "notaMarca": "Yamaha: en agua salada, turbia o con barro, enjuagar con agua dulce después de cada uso."}, "aceite-cola": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Yamaha: primer cambio a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Si sale lechoso, entra agua por los retenes."}, "engrase": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Yamaha: engrasar a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Grasa resistente al agua; en el eje de hélice, grasa anticorrosiva."}, "bujias": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Yamaha: revisar o cambiar cada 100 horas o una vez por año."}, "filtro-combustible": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Yamaha: el concesionario cambia el filtro de nafta cada 100 horas o una vez por año. El tanque portátil se revisa y limpia cada 100 horas o una vez por año."}, "helice": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Yamaha: revisar hélice, tuerca y pasador a las 20 horas y después cada 100 horas o una vez por año."}, "anodos": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Yamaha: revisar el ánodo exterior cada 100 horas o una vez por año. Los ánodos internos los cambia el concesionario cada 500 horas o 5 años."}, "impulsor": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Yamaha: el concesionario revisa la bomba de agua cada 100 horas o una vez por año y cambia el impulsor cada 300 horas o 3 años."}, "termostato": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Yamaha: revisión de concesionario cada 100 horas o una vez por año."}, "aceite-motor": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Yamaha: primer cambio a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. No tiene filtro de cartucho: el concesionario revisa y limpia la malla del cárter cada 100 horas o una vez por año."}, "valvulas": {"segun": "Yamaha", "cada": {"horas": 500, "meses": 60}, "notaMarca": "Yamaha: control y ajuste de luz de válvulas por el concesionario cada 500 horas o 5 años."}}},
    {"id": "yamaha-9.9-4t", "marca": "Yamaha", "modelo": "F9.9J 4T", "potencia": 9.9, "tiempos": "4T", "alimentacion": "carburador", "estado": "completo", "fuente": "Manual del propietario oficial Yamaha F9.9J / FT9.9L (6DR-28199-72-E0, 2014)", "datosTecnicos": [{"dato": "Motor", "valor": "4 tiempos, SOHC, 2 cilindros, 4 válvulas"}, {"dato": "Cilindrada", "valor": "212 cc (56 × 43 mm)"}, {"dato": "Alimentación", "valor": "Carburador"}, {"dato": "Bujía NGK", "valor": "BR6HS-10"}, {"dato": "Ralentí", "valor": "1000 a 1100 rpm"}, {"dato": "Rango a fondo", "valor": "5000 a 6000 rpm"}, {"dato": "Aceite de motor", "valor": "Yamalube 4T náutico, SAE 10W-30, 10W-40 o 5W-30 · 0,8 L"}, {"dato": "Filtro de aceite", "valor": "Malla dentro del cárter (se revisa y limpia)"}, {"dato": "Luz de válvulas en frío", "valor": "Admisión 0,15 a 0,20 mm · escape 0,20 a 0,25 mm (F8F)"}, {"dato": "Aceite de cola", "valor": "Hipoide SAE 90 API GL-4 · 150 ml (FT9.9L pata larga: 370 ml)"}, {"dato": "Luz de bujía", "valor": "0,9 a 1,0 mm"}, {"dato": "Nafta", "valor": "Sin plomo, 90 RON o más"}], "consejos": ["El plan de Yamaha para estos motores tiene controles al inicio (20 h o 3 meses), cada 100 h o 1 año, cada 300 h o 3 años y cada 500 h o 5 años. Las tareas de cada columna no se pudieron leer: por eso los intervalos de la app son generales."], "ajustes": {"enjuague": {"segun": "Yamaha", "notaMarca": "Yamaha: en agua salada, turbia o con barro, enjuagar con agua dulce después de cada uso."}, "aceite-cola": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Yamaha: primer cambio a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Si sale lechoso, entra agua por los retenes."}, "engrase": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Yamaha: engrasar a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Grasa resistente al agua; en el eje de hélice, grasa anticorrosiva."}, "bujias": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Yamaha: revisar o cambiar cada 100 horas o una vez por año."}, "filtro-combustible": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Yamaha: el concesionario cambia el filtro de nafta cada 100 horas o una vez por año. El tanque portátil se revisa y limpia cada 100 horas o una vez por año."}, "helice": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Yamaha: revisar hélice, tuerca y pasador a las 20 horas y después cada 100 horas o una vez por año."}, "anodos": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Yamaha: revisar el ánodo exterior cada 100 horas o una vez por año. Los ánodos internos los cambia el concesionario cada 500 horas o 5 años."}, "impulsor": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Yamaha: el concesionario revisa la bomba de agua cada 100 horas o una vez por año y cambia el impulsor cada 300 horas o 3 años."}, "termostato": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Yamaha: revisión de concesionario cada 100 horas o una vez por año."}, "aceite-motor": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Yamaha: primer cambio a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. No tiene filtro de cartucho: el concesionario revisa y limpia la malla del cárter cada 100 horas o una vez por año."}, "valvulas": {"segun": "Yamaha", "cada": {"horas": 500, "meses": 60}, "notaMarca": "Yamaha: control y ajuste de luz de válvulas por el concesionario cada 500 horas o 5 años."}}},
    {"id": "yamaha-25-4t", "marca": "Yamaha", "modelo": "F25 4T", "potencia": 25, "tiempos": "4T", "alimentacion": "inyeccion", "estado": "completo", "fuente": "Plan de mantenimiento del manual del propietario oficial Yamaha F25D (6BP-28199-70-E0), igual en todos los Yamaha 4T. Datos técnicos: ficha técnica oficial Yamaha Argentina F25SWHC.", "datosTecnicos": [{"dato": "Motor", "valor": "4 tiempos, SOHC, 2 cilindros en línea, 4 válvulas"}, {"dato": "Cilindrada", "valor": "432 cc (65 × 65,1 mm)"}, {"dato": "Alimentación", "valor": "Inyección electrónica"}, {"dato": "Encendido", "valor": "TCI"}, {"dato": "Aceite de motor", "valor": "1,0 L sin filtro · 1,1 L con filtro"}, {"dato": "Bujía NGK", "valor": "DPR6EB-9"}, {"dato": "Luz de bujía", "valor": "0,8 a 0,9 mm"}], "consejos": ["Hasta tener el manual del propietario, los intervalos de service son generales. Ante la duda, consulte al taller."], "ajustes": {"enjuague": {"segun": "Yamaha", "notaMarca": "Yamaha: en agua salada, turbia o con barro, enjuagar con agua dulce después de cada uso."}, "aceite-cola": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Yamaha: primer cambio a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Si sale lechoso, entra agua por los retenes."}, "engrase": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Yamaha: engrasar a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Grasa resistente al agua; en el eje de hélice, grasa anticorrosiva."}, "bujias": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Yamaha: revisar o cambiar cada 100 horas o una vez por año."}, "filtro-combustible": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Yamaha: revisar o cambiar a las 20 horas y después cada 100 horas o una vez por año. El tanque portátil se revisa y limpia cada 100 horas o una vez por año."}, "helice": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Yamaha: revisar hélice, tuerca y pasador a las 20 horas y después cada 100 horas o una vez por año."}, "anodos": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Yamaha: revisar el ánodo exterior cada 100 horas o una vez por año. Los ánodos internos los cambia el concesionario cada 500 horas o 5 años."}, "impulsor": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Yamaha: el concesionario revisa la bomba de agua cada 100 horas o una vez por año y cambia el impulsor cada 300 horas o 3 años."}, "termostato": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Yamaha: revisión de concesionario cada 100 horas o una vez por año."}, "aceite-motor": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Yamaha: primer cambio a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. El filtro de aceite se cambia cada 100 horas o una vez por año."}, "valvulas": {"segun": "Yamaha", "cada": {"horas": 500, "meses": 60}, "notaMarca": "Yamaha: control y ajuste de luz de válvulas por el concesionario cada 500 horas o 5 años."}}},
    {"id": "yamaha-30-4t", "marca": "Yamaha", "modelo": "F30B 4T", "potencia": 30, "tiempos": "4T", "alimentacion": "inyeccion", "estado": "completo", "fuente": "Manual del propietario oficial Yamaha F30B / F40F (6BG-28199-71-E0, 2008)", "datosTecnicos": [{"dato": "Motor", "valor": "4 tiempos, SOHC, 3 cilindros"}, {"dato": "Cilindrada", "valor": "747 cc (65 × 75 mm)"}, {"dato": "Alimentación", "valor": "Inyección electrónica"}, {"dato": "Aceite de motor", "valor": "Yamalube 4 o aceite 4T náutico · SAE 10W-30, 10W-40 o 5W-30 · API SE a SL"}, {"dato": "Cantidad de aceite", "valor": "1,5 L sin filtro · 1,7 L con filtro"}, {"dato": "Aceite de cola", "valor": "Hipoide SAE 90 API GL-4 · 430 ml"}, {"dato": "Bujía NGK", "valor": "DPR6EB-9"}, {"dato": "Luz de bujía", "valor": "0,8 a 0,9 mm"}, {"dato": "Ajuste de bujía", "valor": "17 Nm"}, {"dato": "Luz de válvulas en frío", "valor": "Admisión 0,15 a 0,25 mm · escape 0,25 a 0,35 mm"}, {"dato": "Ralentí en neutro", "valor": "750 a 850 rpm"}, {"dato": "Rango a fondo", "valor": "5000 a 6000 rpm"}, {"dato": "Nafta", "valor": "Sin plomo, 90 RON o más"}, {"dato": "Tanque", "valor": "25 litros"}], "consejos": ["El plan de Yamaha para estos motores tiene controles al inicio (20 h o 3 meses), cada 100 h o 1 año, cada 300 h o 3 años y cada 500 h o 5 años. Las tareas de cada columna no se pudieron leer: por eso los intervalos de la app son generales."], "ajustes": {"enjuague": {"segun": "Yamaha", "notaMarca": "Yamaha: en agua salada, turbia o con barro, enjuagar con agua dulce después de cada uso."}, "aceite-cola": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Yamaha: primer cambio a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Si sale lechoso, entra agua por los retenes."}, "engrase": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Yamaha: engrasar a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Grasa resistente al agua; en el eje de hélice, grasa anticorrosiva."}, "bujias": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Yamaha: revisar o cambiar cada 100 horas o una vez por año."}, "filtro-combustible": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Yamaha: revisar o cambiar a las 20 horas y después cada 100 horas o una vez por año. El tanque portátil se revisa y limpia cada 100 horas o una vez por año."}, "helice": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Yamaha: revisar hélice, tuerca y pasador a las 20 horas y después cada 100 horas o una vez por año."}, "anodos": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Yamaha: revisar el ánodo exterior cada 100 horas o una vez por año. Los ánodos internos los cambia el concesionario cada 500 horas o 5 años."}, "impulsor": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Yamaha: el concesionario revisa la bomba de agua cada 100 horas o una vez por año y cambia el impulsor cada 300 horas o 3 años."}, "termostato": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Yamaha: revisión de concesionario cada 100 horas o una vez por año."}, "aceite-motor": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Yamaha: primer cambio a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. El filtro de aceite se cambia cada 100 horas o una vez por año."}, "valvulas": {"segun": "Yamaha", "cada": {"horas": 500, "meses": 60}, "notaMarca": "Yamaha: control y ajuste de luz de válvulas por el concesionario cada 500 horas o 5 años."}}},
    {"id": "yamaha-40-4t", "marca": "Yamaha", "modelo": "F40F 4T", "potencia": 40, "tiempos": "4T", "alimentacion": "inyeccion", "estado": "completo", "fuente": "Manual del propietario oficial Yamaha F30B / F40F (6BG-28199-71-E0, 2008)", "datosTecnicos": [{"dato": "Motor", "valor": "4 tiempos, SOHC, 3 cilindros"}, {"dato": "Cilindrada", "valor": "747 cc (65 × 75 mm)"}, {"dato": "Alimentación", "valor": "Inyección electrónica"}, {"dato": "Aceite de motor", "valor": "Yamalube 4 o aceite 4T náutico · SAE 10W-30, 10W-40 o 5W-30 · API SE a SL"}, {"dato": "Cantidad de aceite", "valor": "1,5 L sin filtro · 1,7 L con filtro"}, {"dato": "Aceite de cola", "valor": "Hipoide SAE 90 API GL-4 · 430 ml"}, {"dato": "Bujía NGK", "valor": "DPR6EB-9"}, {"dato": "Luz de bujía", "valor": "0,8 a 0,9 mm"}, {"dato": "Ajuste de bujía", "valor": "17 Nm"}, {"dato": "Luz de válvulas en frío", "valor": "Admisión 0,15 a 0,25 mm · escape 0,25 a 0,35 mm"}, {"dato": "Ralentí en neutro", "valor": "750 a 850 rpm"}, {"dato": "Rango a fondo", "valor": "5000 a 6000 rpm"}, {"dato": "Nafta", "valor": "Sin plomo, 90 RON o más"}, {"dato": "Tanque", "valor": "25 litros"}], "consejos": ["El plan de Yamaha para estos motores tiene controles al inicio (20 h o 3 meses), cada 100 h o 1 año, cada 300 h o 3 años y cada 500 h o 5 años. Las tareas de cada columna no se pudieron leer: por eso los intervalos de la app son generales."], "ajustes": {"enjuague": {"segun": "Yamaha", "notaMarca": "Yamaha: en agua salada, turbia o con barro, enjuagar con agua dulce después de cada uso."}, "aceite-cola": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Yamaha: primer cambio a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Si sale lechoso, entra agua por los retenes."}, "engrase": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Yamaha: engrasar a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Grasa resistente al agua; en el eje de hélice, grasa anticorrosiva."}, "bujias": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Yamaha: revisar o cambiar cada 100 horas o una vez por año."}, "filtro-combustible": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Yamaha: revisar o cambiar a las 20 horas y después cada 100 horas o una vez por año. El tanque portátil se revisa y limpia cada 100 horas o una vez por año."}, "helice": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Yamaha: revisar hélice, tuerca y pasador a las 20 horas y después cada 100 horas o una vez por año."}, "anodos": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Yamaha: revisar el ánodo exterior cada 100 horas o una vez por año. Los ánodos internos los cambia el concesionario cada 500 horas o 5 años."}, "impulsor": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Yamaha: el concesionario revisa la bomba de agua cada 100 horas o una vez por año y cambia el impulsor cada 300 horas o 3 años."}, "termostato": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Yamaha: revisión de concesionario cada 100 horas o una vez por año."}, "aceite-motor": {"segun": "Yamaha", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Yamaha: primer cambio a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. El filtro de aceite se cambia cada 100 horas o una vez por año."}, "valvulas": {"segun": "Yamaha", "cada": {"horas": 500, "meses": 60}, "notaMarca": "Yamaha: control y ajuste de luz de válvulas por el concesionario cada 500 horas o 5 años."}}},
    {"id":"suzuki-dt9.9","marca":"Suzuki","modelo":"DT9.9 2T","potencia":9.9,"tiempos":"2T","alimentacion":"carburador","estado":"completo","fuente":"Manual del propietario oficial Suzuki DT9.9 / DT15 (99011-90L20-063, 2012), versión en ruso, enviado por el taller. Mezcla, bujía, aceite de cola, ralentí, rodaje y plan de service salen de ese manual","datosTecnicos":[{"dato":"Cilindros","valor":"2 en línea"},{"dato":"Cilindrada","valor":"284 cc (59 × 52 mm)"},{"dato":"Encendido","valor":"Suzuki PEI (electrónico CDI)"},{"dato":"Mezcla nafta/aceite","valor":"50:1 (rodaje 5 horas: 25:1)"},{"dato":"Aceite 2T","valor":"Náutico TC-W3 certificado NMMA"},{"dato":"Nafta","valor":"Sin plomo, 91 RON o más"},{"dato":"Bujía NGK","valor":"BR7HS-10 (solo resistiva)"},{"dato":"Luz de bujía","valor":"0,9 a 1,0 mm"},{"dato":"Ajuste de bujía","valor":"25 a 28 Nm (nueva: 1/2 a 3/4 de vuelta después de tope a mano)"},{"dato":"Aceite de cola","valor":"Hipoide SAE 90 GL-5 · 250 ml"},{"dato":"Ralentí en neutro","valor":"770 a 830 rpm"},{"dato":"Rango a fondo","valor":"4500 a 5500 rpm"},{"dato":"Relación de cola","valor":"1,92"},{"dato":"Arranque","valor":"Manual (a soga)"},{"dato":"Tanque portátil Suzuki","valor":"25 litros"},{"dato":"Peso","valor":"33 a 39 kg"}],"ajustes":{"enjuague":{"segun":"Suzuki","notaMarca":"Suzuki: después de usarlo en agua salada, sucia o con barro, enjuagar el circuito de agua con agua dulce."},"aceite-cola":{"segun":"Suzuki","cada":{"horas":100,"meses":12,"primeraHoras":20},"notaMarca":"Suzuki: primer cambio a las 20 horas (o al mes) y después cada 100 horas o 12 meses. Aceite SAE 90 hipoide GL-5."},"bujias":{"segun":"Suzuki","cada":{"horas":100,"meses":12},"notaMarca":"Suzuki: revisar, limpiar y calibrar cada 100 horas o 12 meses. Usar solo bujía resistiva (NGK BR7HS-10)."},"filtro-combustible":{"segun":"Suzuki","cada":{"horas":100,"meses":12,"primeraHoras":20},"notaMarca":"Suzuki: revisar mangueras y filtro a las 20 horas y después cada 100 horas o 12 meses. Cambiar el filtro cada 400 horas o 2 años."},"engrase":{"segun":"Suzuki","cada":{"horas":100,"meses":12,"primeraHoras":20},"notaMarca":"Suzuki: engrasar a las 20 horas (o al mes) y después cada 100 horas o 12 meses."},"anodos":{"segun":"Suzuki","cada":{"horas":100,"meses":12,"primeraHoras":20},"notaMarca":"Suzuki: revisar los ánodos a las 20 horas y después cada 100 horas o 12 meses."},"helice":{"segun":"Suzuki","cada":{"horas":100,"meses":12,"primeraHoras":20},"notaMarca":"Suzuki: revisar tuerca y pasador de la hélice a las 20 horas y después cada 100 horas o 12 meses."},"carburador":{"segun":"Suzuki","cada":{"horas":100,"meses":12,"primeraHoras":20},"notaMarca":"Suzuki (tarea de concesionario): revisar y ajustar el carburador a las 20 horas y después cada 100 horas o 12 meses. El ralentí se revisa a las 20 horas y cada 200 horas."},"impulsor":{"segun":"Suzuki","cada":{"horas":200,"meses":12},"notaMarca":"Suzuki (tarea de concesionario): revisar la bomba de agua y el impulsor cada 200 horas o 12 meses, y cambiar el impulsor cada 300 horas o 36 meses."}},"consejos":["Rodaje de 5 horas: mezcla 25:1 con aceite TC-W3. Calentar 5 minutos en ralentí antes de acelerar. Las primeras 3 horas, no pasar de media potencia. Las últimas 2 horas, a cualquier régimen, pero sin más de 30 segundos seguidos a fondo.","Después del rodaje, mezcla 50:1 (manual Suzuki DT9.9/DT15 de 2012). Algunos manuales viejos dicen 100:1 para otros mercados: en la Argentina, 50:1.","Si al cambiar el aceite de cola sale lechoso, entra agua por los retenes: hay que llevarlo al taller."],"tareasExtra":[{"id":"bulones","nombre":"Ajuste de bulones y tuercas","tiempos":"2T","cada":{"horas":100,"meses":12,"primeraHoras":20},"quien":"usuario","segun":"Suzuki","porque":"Con la vibración se aflojan y el motor se puede soltar del espejo.","pasos":["Ajustar bulones y tuercas del motor y del soporte al espejo a las 20 horas y después cada 100 horas o 12 meses."],"materiales":[]},{"id":"encendido","nombre":"Revisión del punto de encendido","tiempos":"2T","cada":{"horas":200,"meses":12},"quien":"mecanico","segun":"Suzuki","porque":"Un punto atrasado o adelantado hace perder potencia y puede dañar el motor.","pasos":["Tarea de concesionario cada 200 horas o 12 meses."],"materiales":[]}]},
    {"id":"suzuki-dt15","marca":"Suzuki","modelo":"DT15 2T","potencia":15,"tiempos":"2T","alimentacion":"carburador","estado":"completo","fuente":"Manual del propietario oficial Suzuki DT9.9 / DT15 (99011-90L20-063, 2012), versión en ruso, enviado por el taller. Mezcla, bujía, aceite de cola, ralentí, rodaje y plan de service salen de ese manual","datosTecnicos":[{"dato":"Cilindros","valor":"2 en línea"},{"dato":"Cilindrada","valor":"284 cc (59 × 52 mm)"},{"dato":"Encendido","valor":"Suzuki PEI (electrónico CDI)"},{"dato":"Mezcla nafta/aceite","valor":"50:1 (rodaje 5 horas: 25:1)"},{"dato":"Aceite 2T","valor":"Náutico TC-W3 certificado NMMA"},{"dato":"Nafta","valor":"Sin plomo, 91 RON o más"},{"dato":"Bujía NGK","valor":"BR7HS-10 (solo resistiva)"},{"dato":"Luz de bujía","valor":"0,9 a 1,0 mm"},{"dato":"Ajuste de bujía","valor":"25 a 28 Nm (nueva: 1/2 a 3/4 de vuelta después de tope a mano)"},{"dato":"Aceite de cola","valor":"Hipoide SAE 90 GL-5 · 250 ml"},{"dato":"Ralentí en neutro","valor":"770 a 830 rpm"},{"dato":"Rango a fondo","valor":"4800 a 5600 rpm"},{"dato":"Relación de cola","valor":"1,92"},{"dato":"Arranque","valor":"Manual (a soga)"},{"dato":"Tanque portátil Suzuki","valor":"25 litros"},{"dato":"Peso","valor":"38 a 39 kg"}],"ajustes":{"enjuague":{"segun":"Suzuki","notaMarca":"Suzuki: después de usarlo en agua salada, sucia o con barro, enjuagar el circuito de agua con agua dulce."},"aceite-cola":{"segun":"Suzuki","cada":{"horas":100,"meses":12,"primeraHoras":20},"notaMarca":"Suzuki: primer cambio a las 20 horas (o al mes) y después cada 100 horas o 12 meses. Aceite SAE 90 hipoide GL-5."},"bujias":{"segun":"Suzuki","cada":{"horas":100,"meses":12},"notaMarca":"Suzuki: revisar, limpiar y calibrar cada 100 horas o 12 meses. Usar solo bujía resistiva (NGK BR7HS-10)."},"filtro-combustible":{"segun":"Suzuki","cada":{"horas":100,"meses":12,"primeraHoras":20},"notaMarca":"Suzuki: revisar mangueras y filtro a las 20 horas y después cada 100 horas o 12 meses. Cambiar el filtro cada 400 horas o 2 años."},"engrase":{"segun":"Suzuki","cada":{"horas":100,"meses":12,"primeraHoras":20},"notaMarca":"Suzuki: engrasar a las 20 horas (o al mes) y después cada 100 horas o 12 meses."},"anodos":{"segun":"Suzuki","cada":{"horas":100,"meses":12,"primeraHoras":20},"notaMarca":"Suzuki: revisar los ánodos a las 20 horas y después cada 100 horas o 12 meses."},"helice":{"segun":"Suzuki","cada":{"horas":100,"meses":12,"primeraHoras":20},"notaMarca":"Suzuki: revisar tuerca y pasador de la hélice a las 20 horas y después cada 100 horas o 12 meses."},"carburador":{"segun":"Suzuki","cada":{"horas":100,"meses":12,"primeraHoras":20},"notaMarca":"Suzuki (tarea de concesionario): revisar y ajustar el carburador a las 20 horas y después cada 100 horas o 12 meses. El ralentí se revisa a las 20 horas y cada 200 horas."},"impulsor":{"segun":"Suzuki","cada":{"horas":200,"meses":12},"notaMarca":"Suzuki (tarea de concesionario): revisar la bomba de agua y el impulsor cada 200 horas o 12 meses, y cambiar el impulsor cada 300 horas o 36 meses."}},"consejos":["Rodaje de 5 horas: mezcla 25:1 con aceite TC-W3. Calentar 5 minutos en ralentí antes de acelerar. Las primeras 3 horas, no pasar de media potencia. Las últimas 2 horas, a cualquier régimen, pero sin más de 30 segundos seguidos a fondo.","Después del rodaje, mezcla 50:1 (manual Suzuki DT9.9/DT15 de 2012). Algunos manuales viejos dicen 100:1 para otros mercados: en la Argentina, 50:1.","Si al cambiar el aceite de cola sale lechoso, entra agua por los retenes: hay que llevarlo al taller."],"tareasExtra":[{"id":"bulones","nombre":"Ajuste de bulones y tuercas","tiempos":"2T","cada":{"horas":100,"meses":12,"primeraHoras":20},"quien":"usuario","segun":"Suzuki","porque":"Con la vibración se aflojan y el motor se puede soltar del espejo.","pasos":["Ajustar bulones y tuercas del motor y del soporte al espejo a las 20 horas y después cada 100 horas o 12 meses."],"materiales":[]},{"id":"encendido","nombre":"Revisión del punto de encendido","tiempos":"2T","cada":{"horas":200,"meses":12},"quien":"mecanico","segun":"Suzuki","porque":"Un punto atrasado o adelantado hace perder potencia y puede dañar el motor.","pasos":["Tarea de concesionario cada 200 horas o 12 meses."],"materiales":[]}]},
    {"id":"suzuki-dt30","marca":"Suzuki","modelo":"DT30 2T","potencia":30,"tiempos":"2T","alimentacion":"carburador","estado":"completo","fuente":"Manual del propietario oficial Suzuki DT30 (99011-91L20-063, 2012), versión en ruso, enviado por el taller. Mezcla, bujía, aceite de cola, ralentí, rodaje y plan de service salen de ese manual","datosTecnicos":[{"dato":"Cilindros","valor":"2 en línea"},{"dato":"Cilindrada","valor":"499 cc (71 × 63 mm)"},{"dato":"Encendido","valor":"Suzuki PEI (electrónico CDI)"},{"dato":"Mezcla nafta/aceite","valor":"50:1 (rodaje 5 horas: 25:1)"},{"dato":"Aceite 2T","valor":"Náutico TC-W3 certificado NMMA"},{"dato":"Nafta","valor":"Sin plomo, 91 RON o más"},{"dato":"Bujía NGK","valor":"BR7HS-10 (solo resistiva)"},{"dato":"Luz de bujía","valor":"0,9 a 1,0 mm"},{"dato":"Ajuste de bujía","valor":"25 a 28 Nm (nueva: 1/2 a 3/4 de vuelta después de tope a mano)"},{"dato":"Aceite de cola","valor":"Hipoide SAE 90 GL-5 · 230 ml"},{"dato":"Ralentí en neutro","valor":"950 a 1050 rpm"},{"dato":"Rango a fondo","valor":"5000 a 5600 rpm"},{"dato":"Relación de cola","valor":"2,09"},{"dato":"Arranque","valor":"Manual o eléctrico, según versión"},{"dato":"Tanque portátil Suzuki","valor":"25 litros"},{"dato":"Peso","valor":"56 a 61 kg"}],"ajustes":{"enjuague":{"segun":"Suzuki","notaMarca":"Suzuki: después de usarlo en agua salada, sucia o con barro, enjuagar el circuito de agua con agua dulce."},"aceite-cola":{"segun":"Suzuki","cada":{"horas":100,"meses":12,"primeraHoras":20},"notaMarca":"Suzuki: primer cambio a las 20 horas (o al mes) y después cada 100 horas o 12 meses. Aceite SAE 90 hipoide GL-5."},"bujias":{"segun":"Suzuki","cada":{"horas":100,"meses":12},"notaMarca":"Suzuki: revisar, limpiar y calibrar cada 100 horas o 12 meses. Usar solo bujía resistiva (NGK BR7HS-10)."},"filtro-combustible":{"segun":"Suzuki","cada":{"horas":100,"meses":12,"primeraHoras":20},"notaMarca":"Suzuki: revisar mangueras y filtro a las 20 horas y después cada 100 horas o 12 meses. Cambiar el filtro cada 400 horas o 2 años."},"engrase":{"segun":"Suzuki","cada":{"horas":100,"meses":12,"primeraHoras":20},"notaMarca":"Suzuki: engrasar a las 20 horas (o al mes) y después cada 100 horas o 12 meses."},"anodos":{"segun":"Suzuki","cada":{"horas":100,"meses":12,"primeraHoras":20},"notaMarca":"Suzuki: revisar los ánodos a las 20 horas y después cada 100 horas o 12 meses."},"helice":{"segun":"Suzuki","cada":{"horas":100,"meses":12,"primeraHoras":20},"notaMarca":"Suzuki: revisar tuerca y pasador de la hélice a las 20 horas y después cada 100 horas o 12 meses."},"carburador":{"segun":"Suzuki","cada":{"horas":100,"meses":12,"primeraHoras":20},"notaMarca":"Suzuki (tarea de concesionario): revisar y ajustar el carburador a las 20 horas y después cada 100 horas o 12 meses. El ralentí se revisa a las 20 horas y cada 200 horas."},"impulsor":{"segun":"Suzuki","cada":{"horas":200,"meses":12},"notaMarca":"Suzuki (tarea de concesionario): revisar la bomba de agua y el impulsor cada 200 horas o 12 meses, y cambiar el impulsor cada 300 horas o 36 meses."}},"consejos":["Rodaje de 5 horas: mezcla 25:1 con aceite TC-W3. Calentar 5 minutos en ralentí antes de acelerar. Las primeras 3 horas, no pasar de media potencia. Las últimas 2 horas, a cualquier régimen, pero sin más de 30 segundos seguidos a fondo.","Después del rodaje, mezcla 50:1 (manual Suzuki 2012). Algunos manuales viejos dicen 100:1 para otros mercados: en la Argentina, 50:1.","Si al cambiar el aceite de cola sale lechoso, entra agua por los retenes: hay que llevarlo al taller."],"tareasExtra":[{"id":"bulones","nombre":"Ajuste de bulones y tuercas","tiempos":"2T","cada":{"horas":100,"meses":12,"primeraHoras":20},"quien":"usuario","segun":"Suzuki","porque":"Con la vibración se aflojan y el motor se puede soltar del espejo.","pasos":["Ajustar bulones y tuercas del motor y del soporte al espejo a las 20 horas y después cada 100 horas o 12 meses."],"materiales":[]},{"id":"encendido","nombre":"Revisión del punto de encendido","tiempos":"2T","cada":{"horas":200,"meses":12},"quien":"mecanico","segun":"Suzuki","porque":"Un punto atrasado o adelantado hace perder potencia y puede dañar el motor.","pasos":["Tarea de concesionario cada 200 horas o 12 meses."],"materiales":[]}]},
    {"id":"suzuki-dt40","marca":"Suzuki","modelo":"DT40 2T","potencia":40,"tiempos":"2T","alimentacion":"carburador","estado":"completo","fuente":"Manual del propietario Suzuki DT40W / DT40WR, traducción al ruso del distribuidor oficial Suzuki Marine (suzukimarine.ru), enviado por el taller. El intervalo de la bomba de agua, que en ese manual no figura, sale del manual Suzuki DT30 de 2012","datosTecnicos":[{"dato":"Cilindros","valor":"2 en línea"},{"dato":"Cilindrada","valor":"696 cc (79 × 71 mm)"},{"dato":"Encendido","valor":"Suzuki PEI (electrónico CDI)"},{"dato":"Mezcla nafta/aceite","valor":"50:1 (rodaje 10 horas: 25:1)"},{"dato":"Aceite 2T","valor":"Suzuki CCI o náutico TC-W3 certificado NMMA"},{"dato":"Bujía NGK","valor":"B8HS-10"},{"dato":"Luz de bujía","valor":"0,9 a 1,0 mm"},{"dato":"Aceite de cola","valor":"Hipoide SAE 90 · 610 ml"},{"dato":"Rango a fondo","valor":"5000 a 5600 rpm"},{"dato":"Relación de cola","valor":"2,09"},{"dato":"Arranque","valor":"Manual o eléctrico, según versión"},{"dato":"Tanque portátil Suzuki","valor":"25 litros"},{"dato":"Peso","valor":"74 a 80 kg"}],"ajustes":{"enjuague":{"segun":"Suzuki","notaMarca":"Suzuki: después de usarlo en agua salada, sucia o con barro, enjuagar el circuito de agua con agua dulce."},"aceite-cola":{"segun":"Suzuki","cada":{"horas":100,"meses":6,"primeraHoras":10},"notaMarca":"Suzuki (manual DT40W): primer cambio a las 10 horas (o al mes) y después cada 100 horas o 6 meses. Aceite hipoide SAE 90, unos 610 ml."},"bujias":{"segun":"Suzuki","cada":{"horas":100,"meses":6},"notaMarca":"Suzuki (manual DT40W): revisar, limpiar y calibrar cada 100 horas o 6 meses. Usar bujía resistiva."},"filtro-combustible":{"segun":"Suzuki","cada":{"horas":50,"meses":3,"primeraHoras":10},"notaMarca":"Suzuki (manual DT40W): revisar mangueras a las 10 horas; filtro y mangueras cada 50 horas o 3 meses."},"engrase":{"segun":"Suzuki","cada":{"horas":50,"meses":3},"notaMarca":"Suzuki (manual DT40W): engrasar cada 50 horas o 3 meses."},"anodos":{"segun":"Suzuki","cada":{"horas":50,"meses":3},"notaMarca":"Suzuki (manual DT40W): revisar los ánodos cada 50 horas o 3 meses; cambiarlos cuando se gastó más de 2/3. No pintarlos."},"carburador":{"segun":"Suzuki","cada":{"horas":100,"meses":6,"primeraHoras":10},"notaMarca":"Suzuki (manual DT40W): (tarea de concesionario) revisar y ajustar los carburadores a las 10 horas y después cada 100 horas o 6 meses."},"impulsor":{"segun":"Suzuki","cada":{"horas":200,"meses":12},"notaMarca":"Suzuki: el manual del DT40W no da intervalo para la bomba de agua; se toma el del manual DT30 (2012): revisar cada 200 horas o 12 meses y cambiar el impulsor cada 300 horas o 36 meses."}},"consejos":["Rodaje de 10 horas: mezcla 25:1 con aceite Suzuki CCI o TC-W3. Calentar 5 minutos en ralentí. Las primeras 5 horas, no más de media aceleración; después de las 3 horas se puede dar todo el acelerador, pero no más de 30 segundos seguidos. Pasadas las 10 horas, a cualquier régimen.","Después del rodaje, mezcla 50:1.","El plan de service del DT40 es más corto que el del DT30: engrase, ánodos y filtro cada 50 horas o 3 meses.","Si al cambiar el aceite de cola sale lechoso, entra agua por los retenes: hay que llevarlo al taller."],"tareasExtra":[{"id":"bulones","nombre":"Ajuste de bulones y tuercas","tiempos":"2T","cada":{"horas":100,"meses":6,"primeraHoras":10},"quien":"mecanico","segun":"Suzuki","porque":"Con la vibración se aflojan y el motor se puede soltar del espejo.","pasos":["Ajustar bulones y tuercas a las 10 horas y después cada 100 horas o 6 meses."],"materiales":[]},{"id":"encendido","nombre":"Revisión del punto de encendido","tiempos":"2T","cada":{"horas":100,"meses":6},"quien":"mecanico","segun":"Suzuki","porque":"Un punto atrasado o adelantado hace perder potencia y puede dañar el motor.","pasos":["Tarea de concesionario cada 100 horas o 6 meses."],"materiales":[]}]},

    // ---- Agregados el 11/11/2026 (modelos que se venden hoy en la Argentina) ----
    {"id": "hidea-15-2t", "marca": "Hidea", "modelo": "HD15F 2T", "origen": "chino", "potencia": 15, "tiempos": "2T", "alimentacion": "carburador", "estado": "completo", "fuente": "Manual oficial del fabricante del motor equivalente, validado por el taller", "datosTecnicos": [{"dato": "Cilindros", "valor": "2 en línea"}, {"dato": "Cilindrada", "valor": "246 cc (56 × 50 mm)"}, {"dato": "Encendido", "valor": "CDI"}, {"dato": "Arranque en frío", "valor": "Cebador (choke)"}, {"dato": "Mezcla nafta/aceite", "valor": "50:1 (rodaje: 25:1), validado por el taller"}, {"dato": "Aceite 2T", "valor": "Aceite 2T náutico TC-W3"}, {"dato": "Nafta", "valor": "Sin plomo, 90 RON o más"}, {"dato": "Bujía NGK", "valor": "BR7HS-10"}, {"dato": "Luz de bujía", "valor": "0,9 a 1,0 mm"}, {"dato": "Ajuste de bujía", "valor": "25 Nm"}, {"dato": "Aceite de cola", "valor": "Hipoide SAE 90 · 250 ml"}, {"dato": "Ralentí en neutro", "valor": "750 ± 50 rpm"}, {"dato": "Rango a fondo", "valor": "4500 a 5500 rpm"}, {"dato": "Relación de cola", "valor": "2,08 (27/13)"}, {"dato": "Ajuste tuerca de hélice", "valor": "17 Nm"}], "consejos": ["La mezcla es 50:1 con aceite 2T náutico TC-W3 (25:1 en el rodaje).", "Rodaje de 10 horas: 10 minutos al mínimo, 50 minutos sin pasar de media aceleración (3000 rpm), 2 horas a 3/4 (4000 rpm) con tramos de 1 minuto a fondo, y 7 horas sin pasar 5 minutos seguidos a fondo."], "ajustes": {"enjuague": {"segun": "el fabricante", "notaMarca": "Plan del fabricante: en agua salada, turbia o con barro, enjuagar con agua dulce después de cada uso."}, "aceite-cola": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: primer cambio a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Si sale lechoso, entra agua por los retenes."}, "engrase": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: engrasar a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Grasa resistente al agua; en el eje de hélice, grasa anticorrosiva."}, "bujias": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Plan del fabricante: revisar o cambiar cada 100 horas o una vez por año."}, "filtro-combustible": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: revisar o cambiar a las 20 horas y después cada 100 horas o una vez por año. El tanque portátil se revisa y limpia cada 100 horas o una vez por año."}, "helice": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: revisar hélice, tuerca y pasador a las 20 horas y después cada 100 horas o una vez por año."}, "anodos": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Plan del fabricante: revisar el ánodo exterior cada 100 horas o una vez por año. Los ánodos internos los cambia el concesionario cada 500 horas o 5 años."}, "impulsor": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Plan del fabricante: el concesionario revisa la bomba de agua cada 100 horas o una vez por año y cambia el impulsor cada 300 horas o 3 años."}, "termostato": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Plan del fabricante: revisión de concesionario cada 100 horas o una vez por año."}, "invernaje": {"segun": "el fabricante", "notaMarca": "El fabricante recomienda aceite de empañado (fogging) para motores 2T a carburador al guardarlos."}}, "fuenteInterna": "Copia del Yamaha 15 HP 2T (indicado por el taller). Datos e intervalos: Manual del propietario oficial Yamaha 9.9F / 15F (63V-28199-7A, 2008)"},
    {"id": "hidea-30-2t", "marca": "Hidea", "modelo": "HD30F 2T (25/30 HP)", "origen": "chino", "potencia": 30, "tiempos": "2T", "alimentacion": "carburador", "estado": "completo", "fuente": "Manual oficial del fabricante del motor equivalente, validado por el taller", "datosTecnicos": [{"dato": "Cilindros", "valor": "2 en línea"}, {"dato": "Cilindrada", "valor": "496 cc (72 × 61 mm)"}, {"dato": "Encendido", "valor": "CDI"}, {"dato": "Arranque en frío", "valor": "Cebador (choke)"}, {"dato": "Mezcla nafta/aceite", "valor": "50:1 (rodaje: 25:1); en la Argentina se vende solo a mezcla, sin inyección de aceite"}, {"dato": "Aceite 2T", "valor": "Aceite 2T náutico TC-W3"}, {"dato": "Nafta", "valor": "Sin plomo, 90 RON o más"}, {"dato": "Bujía NGK", "valor": "BR7HS-10"}, {"dato": "Luz de bujía", "valor": "0,9 a 1,0 mm"}, {"dato": "Ajuste de bujía", "valor": "25 Nm"}, {"dato": "Aceite de cola", "valor": "Hipoide SAE 90 · 320 ml"}, {"dato": "Ralentí en neutro", "valor": "1100 ± 50 rpm"}, {"dato": "Rango a fondo", "valor": "4500 a 5500 rpm"}, {"dato": "Relación de cola", "valor": "2,08 (27/13)"}, {"dato": "Ajuste tuerca de hélice", "valor": "35 Nm"}], "consejos": ["Rodaje de 10 horas: 10 minutos al mínimo, 50 minutos sin pasar de media aceleración (3000 rpm), 2 horas a 3/4 (4000 rpm) con tramos de 1 minuto a fondo, y 7 horas sin pasar 5 minutos seguidos a fondo."], "ajustes": {"enjuague": {"segun": "el fabricante", "notaMarca": "Plan del fabricante: en agua salada, turbia o con barro, enjuagar con agua dulce después de cada uso."}, "aceite-cola": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: primer cambio a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Si sale lechoso, entra agua por los retenes."}, "engrase": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: engrasar a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Grasa resistente al agua; en el eje de hélice, grasa anticorrosiva."}, "bujias": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Plan del fabricante: revisar o cambiar cada 100 horas o una vez por año."}, "filtro-combustible": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: revisar o cambiar a las 20 horas y después cada 100 horas o una vez por año. El tanque portátil se revisa y limpia cada 100 horas o una vez por año."}, "helice": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: revisar hélice, tuerca y pasador a las 20 horas y después cada 100 horas o una vez por año."}, "anodos": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Plan del fabricante: revisar el ánodo exterior cada 100 horas o una vez por año. Los ánodos internos los cambia el concesionario cada 500 horas o 5 años."}, "impulsor": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Plan del fabricante: el concesionario revisa la bomba de agua cada 100 horas o una vez por año y cambia el impulsor cada 300 horas o 3 años."}, "termostato": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Plan del fabricante: revisión de concesionario cada 100 horas o una vez por año."}}, "fuenteInterna": "Copia del Yamaha 25 HP 2T (indicado por el taller). Datos e intervalos: Manual del propietario oficial Yamaha 25B / 30H (69R-28199-75-E0, 2006), modelo 25BMH. Es el 25 HP que abunda en la Argentina, solo a mezcla (validado por el taller). Intervalos tomados del manual Yamaha 20D / 25N (2010), porque la tabla del 25B no se pudo leer completa"},
    {"id": "hidea-40-2t", "marca": "Hidea", "modelo": "HD40F 2T", "origen": "chino", "potencia": 40, "tiempos": "2T", "alimentacion": "carburador", "estado": "completo", "fuente": "Manual oficial del fabricante del motor equivalente, validado por el taller", "datosTecnicos": [{"dato": "Cilindros", "valor": "2 en línea"}, {"dato": "Cilindrada", "valor": "703 cc (80 × 70 mm)"}, {"dato": "Encendido", "valor": "CDI"}, {"dato": "Arranque en frío", "valor": "Cebador (choke)"}, {"dato": "Mezcla nafta/aceite", "valor": "50:1 (rodaje: 25:1), validado por el taller"}, {"dato": "Aceite 2T", "valor": "Aceite 2T náutico TC-W3"}, {"dato": "Nafta", "valor": "Sin plomo, 90 RON o más, hasta 10 % de etanol"}, {"dato": "Bujía NGK", "valor": "B7HS (resistiva: BR7HS)"}, {"dato": "Luz de bujía", "valor": "0,6 a 0,7 mm"}, {"dato": "Ajuste de bujía", "valor": "25 Nm (1/4 a 1/2 vuelta después de tope a mano)"}, {"dato": "Aceite de cola", "valor": "Hipoide SAE 90 · 430 ml"}, {"dato": "Ralentí en neutro", "valor": "1000 ± 50 rpm"}, {"dato": "Rango a fondo", "valor": "4500 a 5500 rpm"}, {"dato": "Relación de cola", "valor": "2,00 (26/13)"}, {"dato": "Ajuste tuerca de hélice", "valor": "40 Nm"}, {"dato": "Grasa", "valor": "Resistente al agua; anticorrosiva en el eje de hélice"}], "consejos": ["Rodaje de 10 horas, en el agua y con carga: 10 minutos a la menor velocidad; 50 minutos sin pasar de media aceleración (unas 3000 rpm); 2 horas a no más de 3/4 (unas 4000 rpm), con tramos de 1 minuto a fondo; las 7 horas restantes a cualquier régimen, sin pasar 5 minutos seguidos a fondo.", "Si al cambiar el aceite de cola sale lechoso, entra agua por los retenes: hay que llevarlo al taller.", "Una porcelana de bujía muy blanca indica mezcla pobre o entrada de aire en ese cilindro."], "ajustes": {"enjuague": {"segun": "el fabricante", "notaMarca": "Plan del fabricante: en agua salada, turbia o con barro, enjuagar con agua dulce después de cada uso."}, "aceite-cola": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: primer cambio a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Si sale lechoso, entra agua por los retenes."}, "engrase": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: engrasar a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Grasa resistente al agua; en el eje de hélice, grasa anticorrosiva."}, "bujias": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Plan del fabricante: revisar o cambiar cada 100 horas o una vez por año."}, "filtro-combustible": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: revisar o cambiar a las 20 horas y después cada 100 horas o una vez por año. El tanque portátil se revisa y limpia cada 100 horas o una vez por año."}, "helice": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: revisar hélice, tuerca y pasador a las 20 horas y después cada 100 horas o una vez por año."}, "anodos": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Plan del fabricante: revisar el ánodo exterior cada 100 horas o una vez por año. Los ánodos internos los cambia el concesionario cada 500 horas o 5 años."}, "impulsor": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Plan del fabricante: el concesionario revisa la bomba de agua cada 100 horas o una vez por año y cambia el impulsor cada 300 horas o 3 años."}, "termostato": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Plan del fabricante: revisión de concesionario cada 100 horas o una vez por año."}, "invernaje": {"segun": "el fabricante", "notaMarca": "El fabricante recomienda aceite de empañado (fogging) para motores 2T a carburador al guardarlos."}}, "fuenteInterna": "Copia del Yamaha 40 HP 2T (indicado por el taller). Datos e intervalos: Manual del propietario oficial Yamaha 40X (66T-28199-7B, 2012), con datos de los manuales E40X y 40V"},
    {"id": "hidea-60-2t", "marca": "Hidea", "modelo": "HD60F 2T", "origen": "chino", "potencia": 60, "tiempos": "2T", "alimentacion": "carburador", "estado": "completo", "fuente": "Manual oficial del fabricante del motor equivalente, validado por el taller", "datosTecnicos": [{"dato": "Cilindros", "valor": "3 en línea"}, {"dato": "Cilindrada", "valor": "849 cc (72 × 69,5 mm)"}, {"dato": "Encendido", "valor": "CDI con microcomputadora"}, {"dato": "Mezcla nafta/aceite", "valor": "50:1 (rodaje: 25:1). En la Argentina se vende a mezcla"}, {"dato": "Aceite 2T", "valor": "Aceite 2T náutico TC-W3"}, {"dato": "Nafta", "valor": "Sin plomo, 90 RON o más"}, {"dato": "Bujía NGK", "valor": "B8HS-10 (resistiva: BR8HS-10)"}, {"dato": "Luz de bujía", "valor": "0,9 a 1,0 mm"}, {"dato": "Ajuste de bujía", "valor": "25 Nm"}, {"dato": "Aceite de cola", "valor": "Hipoide SAE 90 · 610 cm³"}, {"dato": "Ralentí en neutro", "valor": "800 ± 50 rpm"}, {"dato": "Relación de cola", "valor": "2,33 (28/12)"}, {"dato": "Rango a fondo", "valor": "4500 a 5500 rpm"}], "consejos": ["Se usa a mezcla: 50:1 con aceite 2T náutico TC-W3 (25:1 en el rodaje).", "Si se enciende el aviso de bajo nivel de aceite, el motor limita las vueltas a unas 2000 rpm.", "Rodaje de 10 horas: 10 minutos al mínimo, 50 minutos sin pasar de media aceleración (3000 rpm), 2 horas a 3/4 (4000 rpm) y 7 horas sin pasar 5 minutos seguidos a fondo."], "ajustes": {"enjuague": {"segun": "el fabricante", "notaMarca": "Plan del fabricante: en agua salada, turbia o con barro, enjuagar con agua dulce después de cada uso."}, "aceite-cola": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: primer cambio a las 10 horas (o al mes) y después cada 100 horas o 6 meses."}, "bujias": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: limpiar, calibrar o cambiar a las 10 horas, a las 50 horas y después cada 100 horas o 6 meses."}, "filtro-combustible": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: revisar y limpiar el filtro y el sistema de nafta a las 10 horas, a las 50 horas y después cada 100 horas o 6 meses. El tanque portátil se limpia una vez por año."}, "engrase": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Plan del fabricante: engrasar cada 100 horas o 6 meses."}, "anodos": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 50}, "notaMarca": "Plan del fabricante: revisar el ánodo exterior a las 50 horas y después cada 100 horas o 6 meses."}, "helice": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 50}, "notaMarca": "Plan del fabricante: revisar hélice y pasador a las 50 horas y después cada 100 horas o 6 meses."}, "impulsor": {"segun": "el fabricante", "cada": {"horas": 200, "meses": 12}, "notaMarca": "Plan del fabricante: el concesionario revisa la bomba de agua cada 200 horas o una vez por año."}, "termostato": {"segun": "el fabricante", "cada": {"horas": 200, "meses": 12}, "notaMarca": "Plan del fabricante: revisión de concesionario cada 200 horas o una vez por año."}}, "fuenteInterna": "Copia del Yamaha 60 HP 2T (indicado por el taller). Datos e intervalos: Manual del propietario oficial Yamaha 50G / 60F / 70B (6H2-28199-7S, 2004)"},
    {"id": "hidea-70-2t", "marca": "Hidea", "modelo": "70 HP 2T", "origen": "chino", "potencia": 70, "tiempos": "2T", "alimentacion": "carburador", "estado": "completo", "fuente": "Manual oficial del fabricante del motor equivalente, validado por el taller", "datosTecnicos": [{"dato": "Cilindros", "valor": "3 en línea"}, {"dato": "Cilindrada", "valor": "849 cc (72 × 69,5 mm)"}, {"dato": "Encendido", "valor": "CDI con microcomputadora"}, {"dato": "Mezcla nafta/aceite", "valor": "50:1 (rodaje: 25:1). En la Argentina se vende a mezcla"}, {"dato": "Aceite 2T", "valor": "Aceite 2T náutico TC-W3"}, {"dato": "Nafta", "valor": "Sin plomo, 90 RON o más"}, {"dato": "Bujía NGK", "valor": "B8HS-10 (resistiva: BR8HS-10)"}, {"dato": "Luz de bujía", "valor": "0,9 a 1,0 mm"}, {"dato": "Ajuste de bujía", "valor": "25 Nm"}, {"dato": "Aceite de cola", "valor": "Hipoide SAE 90 · 610 cm³"}, {"dato": "Ralentí en neutro", "valor": "800 ± 50 rpm"}, {"dato": "Relación de cola", "valor": "2,33 (28/12)"}, {"dato": "Rango a fondo", "valor": "5000 a 6000 rpm"}], "consejos": ["Se usa a mezcla: 50:1 con aceite 2T náutico TC-W3 (25:1 en el rodaje).", "Si se enciende el aviso de bajo nivel de aceite, el motor limita las vueltas a unas 2000 rpm.", "Rodaje de 10 horas: 10 minutos al mínimo, 50 minutos sin pasar de media aceleración (3000 rpm), 2 horas a 3/4 (4000 rpm) y 7 horas sin pasar 5 minutos seguidos a fondo."], "ajustes": {"enjuague": {"segun": "el fabricante", "notaMarca": "Plan del fabricante: en agua salada, turbia o con barro, enjuagar con agua dulce después de cada uso."}, "aceite-cola": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: primer cambio a las 10 horas (o al mes) y después cada 100 horas o 6 meses."}, "bujias": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: limpiar, calibrar o cambiar a las 10 horas, a las 50 horas y después cada 100 horas o 6 meses."}, "filtro-combustible": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 10}, "notaMarca": "Plan del fabricante: revisar y limpiar el filtro y el sistema de nafta a las 10 horas, a las 50 horas y después cada 100 horas o 6 meses. El tanque portátil se limpia una vez por año."}, "engrase": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6}, "notaMarca": "Plan del fabricante: engrasar cada 100 horas o 6 meses."}, "anodos": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 50}, "notaMarca": "Plan del fabricante: revisar el ánodo exterior a las 50 horas y después cada 100 horas o 6 meses."}, "helice": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 6, "primeraHoras": 50}, "notaMarca": "Plan del fabricante: revisar hélice y pasador a las 50 horas y después cada 100 horas o 6 meses."}, "impulsor": {"segun": "el fabricante", "cada": {"horas": 200, "meses": 12}, "notaMarca": "Plan del fabricante: el concesionario revisa la bomba de agua cada 200 horas o una vez por año."}, "termostato": {"segun": "el fabricante", "cada": {"horas": 200, "meses": 12}, "notaMarca": "Plan del fabricante: revisión de concesionario cada 200 horas o una vez por año."}}, "fuenteInterna": "Copia del Yamaha 70 HP 2T (indicado por el taller). Datos e intervalos: Manual del propietario oficial Yamaha 50G / 60F / 70B (6H2-28199-7S, 2004)"},
    {"id": "parsun-15-2t", "marca": "Parsun", "modelo": "T15 2T", "origen": "chino", "potencia": 15, "tiempos": "2T", "alimentacion": "carburador", "estado": "completo", "fuente": "Manual oficial del fabricante del motor equivalente, validado por el taller", "datosTecnicos": [{"dato": "Cilindros", "valor": "2 en línea"}, {"dato": "Cilindrada", "valor": "246 cc (56 × 50 mm)"}, {"dato": "Encendido", "valor": "CDI"}, {"dato": "Arranque en frío", "valor": "Cebador (choke)"}, {"dato": "Mezcla nafta/aceite", "valor": "50:1 (rodaje: 25:1), validado por el taller"}, {"dato": "Aceite 2T", "valor": "Aceite 2T náutico TC-W3"}, {"dato": "Nafta", "valor": "Sin plomo, 90 RON o más"}, {"dato": "Bujía NGK", "valor": "BR7HS-10"}, {"dato": "Luz de bujía", "valor": "0,9 a 1,0 mm"}, {"dato": "Ajuste de bujía", "valor": "25 Nm"}, {"dato": "Aceite de cola", "valor": "Hipoide SAE 90 · 250 ml"}, {"dato": "Ralentí en neutro", "valor": "750 ± 50 rpm"}, {"dato": "Rango a fondo", "valor": "4500 a 5500 rpm"}, {"dato": "Relación de cola", "valor": "2,08 (27/13)"}, {"dato": "Ajuste tuerca de hélice", "valor": "17 Nm"}], "consejos": ["La mezcla es 50:1 con aceite 2T náutico TC-W3 (25:1 en el rodaje).", "Rodaje de 10 horas: 10 minutos al mínimo, 50 minutos sin pasar de media aceleración (3000 rpm), 2 horas a 3/4 (4000 rpm) con tramos de 1 minuto a fondo, y 7 horas sin pasar 5 minutos seguidos a fondo."], "ajustes": {"enjuague": {"segun": "el fabricante", "notaMarca": "Plan del fabricante: en agua salada, turbia o con barro, enjuagar con agua dulce después de cada uso."}, "aceite-cola": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: primer cambio a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Si sale lechoso, entra agua por los retenes."}, "engrase": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: engrasar a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Grasa resistente al agua; en el eje de hélice, grasa anticorrosiva."}, "bujias": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Plan del fabricante: revisar o cambiar cada 100 horas o una vez por año."}, "filtro-combustible": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: revisar o cambiar a las 20 horas y después cada 100 horas o una vez por año. El tanque portátil se revisa y limpia cada 100 horas o una vez por año."}, "helice": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: revisar hélice, tuerca y pasador a las 20 horas y después cada 100 horas o una vez por año."}, "anodos": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Plan del fabricante: revisar el ánodo exterior cada 100 horas o una vez por año. Los ánodos internos los cambia el concesionario cada 500 horas o 5 años."}, "impulsor": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Plan del fabricante: el concesionario revisa la bomba de agua cada 100 horas o una vez por año y cambia el impulsor cada 300 horas o 3 años."}, "termostato": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Plan del fabricante: revisión de concesionario cada 100 horas o una vez por año."}, "invernaje": {"segun": "el fabricante", "notaMarca": "El fabricante recomienda aceite de empañado (fogging) para motores 2T a carburador al guardarlos."}}, "fuenteInterna": "Copia del Yamaha 15 HP 2T (indicado por el taller). Datos e intervalos: Manual del propietario oficial Yamaha 9.9F / 15F (63V-28199-7A, 2008)"},
    {"id": "parsun-40-2t", "marca": "Parsun", "modelo": "T40 2T", "origen": "chino", "potencia": 40, "tiempos": "2T", "alimentacion": "carburador", "estado": "completo", "fuente": "Manual oficial del fabricante del motor equivalente, validado por el taller", "datosTecnicos": [{"dato": "Cilindros", "valor": "2 en línea"}, {"dato": "Cilindrada", "valor": "703 cc (80 × 70 mm)"}, {"dato": "Encendido", "valor": "CDI"}, {"dato": "Arranque en frío", "valor": "Cebador (choke)"}, {"dato": "Mezcla nafta/aceite", "valor": "50:1 (rodaje: 25:1), validado por el taller"}, {"dato": "Aceite 2T", "valor": "Aceite 2T náutico TC-W3"}, {"dato": "Nafta", "valor": "Sin plomo, 90 RON o más, hasta 10 % de etanol"}, {"dato": "Bujía NGK", "valor": "B7HS (resistiva: BR7HS)"}, {"dato": "Luz de bujía", "valor": "0,6 a 0,7 mm"}, {"dato": "Ajuste de bujía", "valor": "25 Nm (1/4 a 1/2 vuelta después de tope a mano)"}, {"dato": "Aceite de cola", "valor": "Hipoide SAE 90 · 430 ml"}, {"dato": "Ralentí en neutro", "valor": "1000 ± 50 rpm"}, {"dato": "Rango a fondo", "valor": "4500 a 5500 rpm"}, {"dato": "Relación de cola", "valor": "2,00 (26/13)"}, {"dato": "Ajuste tuerca de hélice", "valor": "40 Nm"}, {"dato": "Grasa", "valor": "Resistente al agua; anticorrosiva en el eje de hélice"}], "consejos": ["Rodaje de 10 horas, en el agua y con carga: 10 minutos a la menor velocidad; 50 minutos sin pasar de media aceleración (unas 3000 rpm); 2 horas a no más de 3/4 (unas 4000 rpm), con tramos de 1 minuto a fondo; las 7 horas restantes a cualquier régimen, sin pasar 5 minutos seguidos a fondo.", "Si al cambiar el aceite de cola sale lechoso, entra agua por los retenes: hay que llevarlo al taller.", "Una porcelana de bujía muy blanca indica mezcla pobre o entrada de aire en ese cilindro."], "ajustes": {"enjuague": {"segun": "el fabricante", "notaMarca": "Plan del fabricante: en agua salada, turbia o con barro, enjuagar con agua dulce después de cada uso."}, "aceite-cola": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: primer cambio a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Si sale lechoso, entra agua por los retenes."}, "engrase": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: engrasar a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Grasa resistente al agua; en el eje de hélice, grasa anticorrosiva."}, "bujias": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Plan del fabricante: revisar o cambiar cada 100 horas o una vez por año."}, "filtro-combustible": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: revisar o cambiar a las 20 horas y después cada 100 horas o una vez por año. El tanque portátil se revisa y limpia cada 100 horas o una vez por año."}, "helice": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: revisar hélice, tuerca y pasador a las 20 horas y después cada 100 horas o una vez por año."}, "anodos": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Plan del fabricante: revisar el ánodo exterior cada 100 horas o una vez por año. Los ánodos internos los cambia el concesionario cada 500 horas o 5 años."}, "impulsor": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Plan del fabricante: el concesionario revisa la bomba de agua cada 100 horas o una vez por año y cambia el impulsor cada 300 horas o 3 años."}, "termostato": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Plan del fabricante: revisión de concesionario cada 100 horas o una vez por año."}, "invernaje": {"segun": "el fabricante", "notaMarca": "El fabricante recomienda aceite de empañado (fogging) para motores 2T a carburador al guardarlos."}}, "fuenteInterna": "Copia del Yamaha 40 HP 2T (indicado por el taller). Datos e intervalos: Manual del propietario oficial Yamaha 40X (66T-28199-7B, 2012), con datos de los manuales E40X y 40V"},
    {"id": "powertec-15-2t", "marca": "Powertec", "modelo": "15 HP 2T", "origen": "chino", "potencia": 15, "tiempos": "2T", "alimentacion": "carburador", "estado": "completo", "fuente": "Manual oficial del fabricante del motor equivalente, validado por el taller", "datosTecnicos": [{"dato": "Cilindros", "valor": "2 en línea"}, {"dato": "Cilindrada", "valor": "246 cc (56 × 50 mm)"}, {"dato": "Encendido", "valor": "CDI"}, {"dato": "Arranque en frío", "valor": "Cebador (choke)"}, {"dato": "Mezcla nafta/aceite", "valor": "50:1 (rodaje: 25:1), validado por el taller"}, {"dato": "Aceite 2T", "valor": "Aceite 2T náutico TC-W3"}, {"dato": "Nafta", "valor": "Sin plomo, 90 RON o más"}, {"dato": "Bujía NGK", "valor": "BR7HS-10"}, {"dato": "Luz de bujía", "valor": "0,9 a 1,0 mm"}, {"dato": "Ajuste de bujía", "valor": "25 Nm"}, {"dato": "Aceite de cola", "valor": "Hipoide SAE 90 · 250 ml"}, {"dato": "Ralentí en neutro", "valor": "750 ± 50 rpm"}, {"dato": "Rango a fondo", "valor": "4500 a 5500 rpm"}, {"dato": "Relación de cola", "valor": "2,08 (27/13)"}, {"dato": "Ajuste tuerca de hélice", "valor": "17 Nm"}], "consejos": ["La mezcla es 50:1 con aceite 2T náutico TC-W3 (25:1 en el rodaje).", "Rodaje de 10 horas: 10 minutos al mínimo, 50 minutos sin pasar de media aceleración (3000 rpm), 2 horas a 3/4 (4000 rpm) con tramos de 1 minuto a fondo, y 7 horas sin pasar 5 minutos seguidos a fondo."], "ajustes": {"enjuague": {"segun": "el fabricante", "notaMarca": "Plan del fabricante: en agua salada, turbia o con barro, enjuagar con agua dulce después de cada uso."}, "aceite-cola": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: primer cambio a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Si sale lechoso, entra agua por los retenes."}, "engrase": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: engrasar a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Grasa resistente al agua; en el eje de hélice, grasa anticorrosiva."}, "bujias": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Plan del fabricante: revisar o cambiar cada 100 horas o una vez por año."}, "filtro-combustible": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: revisar o cambiar a las 20 horas y después cada 100 horas o una vez por año. El tanque portátil se revisa y limpia cada 100 horas o una vez por año."}, "helice": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: revisar hélice, tuerca y pasador a las 20 horas y después cada 100 horas o una vez por año."}, "anodos": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Plan del fabricante: revisar el ánodo exterior cada 100 horas o una vez por año. Los ánodos internos los cambia el concesionario cada 500 horas o 5 años."}, "impulsor": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Plan del fabricante: el concesionario revisa la bomba de agua cada 100 horas o una vez por año y cambia el impulsor cada 300 horas o 3 años."}, "termostato": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Plan del fabricante: revisión de concesionario cada 100 horas o una vez por año."}, "invernaje": {"segun": "el fabricante", "notaMarca": "El fabricante recomienda aceite de empañado (fogging) para motores 2T a carburador al guardarlos."}}, "fuenteInterna": "Copia del Yamaha 15 HP 2T (indicado por el taller). Datos e intervalos: Manual del propietario oficial Yamaha 9.9F / 15F (63V-28199-7A, 2008)"},
    {"id": "powertec-25-2t", "marca": "Powertec", "modelo": "25 HP 2T", "origen": "chino", "potencia": 25, "tiempos": "2T", "alimentacion": "carburador", "estado": "completo", "fuente": "Manual oficial del fabricante del motor equivalente, validado por el taller", "datosTecnicos": [{"dato": "Cilindros", "valor": "2 en línea"}, {"dato": "Cilindrada", "valor": "496 cc (72 × 61 mm)"}, {"dato": "Encendido", "valor": "CDI"}, {"dato": "Arranque en frío", "valor": "Cebador (choke)"}, {"dato": "Mezcla nafta/aceite", "valor": "50:1 (rodaje: 25:1); en la Argentina se vende solo a mezcla, sin inyección de aceite"}, {"dato": "Aceite 2T", "valor": "Aceite 2T náutico TC-W3"}, {"dato": "Nafta", "valor": "Sin plomo, 90 RON o más"}, {"dato": "Bujía NGK", "valor": "BR7HS-10"}, {"dato": "Luz de bujía", "valor": "0,9 a 1,0 mm"}, {"dato": "Ajuste de bujía", "valor": "25 Nm"}, {"dato": "Aceite de cola", "valor": "Hipoide SAE 90 · 320 ml"}, {"dato": "Ralentí en neutro", "valor": "1100 ± 50 rpm"}, {"dato": "Rango a fondo", "valor": "4500 a 5500 rpm"}, {"dato": "Relación de cola", "valor": "2,08 (27/13)"}, {"dato": "Ajuste tuerca de hélice", "valor": "35 Nm"}], "consejos": ["Rodaje de 10 horas: 10 minutos al mínimo, 50 minutos sin pasar de media aceleración (3000 rpm), 2 horas a 3/4 (4000 rpm) con tramos de 1 minuto a fondo, y 7 horas sin pasar 5 minutos seguidos a fondo."], "ajustes": {"enjuague": {"segun": "el fabricante", "notaMarca": "Plan del fabricante: en agua salada, turbia o con barro, enjuagar con agua dulce después de cada uso."}, "aceite-cola": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: primer cambio a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Si sale lechoso, entra agua por los retenes."}, "engrase": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: engrasar a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Grasa resistente al agua; en el eje de hélice, grasa anticorrosiva."}, "bujias": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Plan del fabricante: revisar o cambiar cada 100 horas o una vez por año."}, "filtro-combustible": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: revisar o cambiar a las 20 horas y después cada 100 horas o una vez por año. El tanque portátil se revisa y limpia cada 100 horas o una vez por año."}, "helice": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: revisar hélice, tuerca y pasador a las 20 horas y después cada 100 horas o una vez por año."}, "anodos": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Plan del fabricante: revisar el ánodo exterior cada 100 horas o una vez por año. Los ánodos internos los cambia el concesionario cada 500 horas o 5 años."}, "impulsor": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Plan del fabricante: el concesionario revisa la bomba de agua cada 100 horas o una vez por año y cambia el impulsor cada 300 horas o 3 años."}, "termostato": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Plan del fabricante: revisión de concesionario cada 100 horas o una vez por año."}}, "fuenteInterna": "Copia del Yamaha 25 HP 2T (indicado por el taller). Datos e intervalos: Manual del propietario oficial Yamaha 25B / 30H (69R-28199-75-E0, 2006), modelo 25BMH. Es el 25 HP que abunda en la Argentina, solo a mezcla (validado por el taller). Intervalos tomados del manual Yamaha 20D / 25N (2010), porque la tabla del 25B no se pudo leer completa"},
    {"id": "powertec-40-2t", "marca": "Powertec", "modelo": "40 HP 2T", "origen": "chino", "potencia": 40, "tiempos": "2T", "alimentacion": "carburador", "estado": "completo", "fuente": "Manual oficial del fabricante del motor equivalente, validado por el taller", "datosTecnicos": [{"dato": "Cilindros", "valor": "2 en línea"}, {"dato": "Cilindrada", "valor": "703 cc (80 × 70 mm)"}, {"dato": "Encendido", "valor": "CDI"}, {"dato": "Arranque en frío", "valor": "Cebador (choke)"}, {"dato": "Mezcla nafta/aceite", "valor": "50:1 (rodaje: 25:1), validado por el taller"}, {"dato": "Aceite 2T", "valor": "Aceite 2T náutico TC-W3"}, {"dato": "Nafta", "valor": "Sin plomo, 90 RON o más, hasta 10 % de etanol"}, {"dato": "Bujía NGK", "valor": "B7HS (resistiva: BR7HS)"}, {"dato": "Luz de bujía", "valor": "0,6 a 0,7 mm"}, {"dato": "Ajuste de bujía", "valor": "25 Nm (1/4 a 1/2 vuelta después de tope a mano)"}, {"dato": "Aceite de cola", "valor": "Hipoide SAE 90 · 430 ml"}, {"dato": "Ralentí en neutro", "valor": "1000 ± 50 rpm"}, {"dato": "Rango a fondo", "valor": "4500 a 5500 rpm"}, {"dato": "Relación de cola", "valor": "2,00 (26/13)"}, {"dato": "Ajuste tuerca de hélice", "valor": "40 Nm"}, {"dato": "Grasa", "valor": "Resistente al agua; anticorrosiva en el eje de hélice"}], "consejos": ["Rodaje de 10 horas, en el agua y con carga: 10 minutos a la menor velocidad; 50 minutos sin pasar de media aceleración (unas 3000 rpm); 2 horas a no más de 3/4 (unas 4000 rpm), con tramos de 1 minuto a fondo; las 7 horas restantes a cualquier régimen, sin pasar 5 minutos seguidos a fondo.", "Si al cambiar el aceite de cola sale lechoso, entra agua por los retenes: hay que llevarlo al taller.", "Una porcelana de bujía muy blanca indica mezcla pobre o entrada de aire en ese cilindro."], "ajustes": {"enjuague": {"segun": "el fabricante", "notaMarca": "Plan del fabricante: en agua salada, turbia o con barro, enjuagar con agua dulce después de cada uso."}, "aceite-cola": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: primer cambio a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Si sale lechoso, entra agua por los retenes."}, "engrase": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: engrasar a las 20 horas (o 3 meses) y después cada 100 horas o una vez por año. Grasa resistente al agua; en el eje de hélice, grasa anticorrosiva."}, "bujias": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Plan del fabricante: revisar o cambiar cada 100 horas o una vez por año."}, "filtro-combustible": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: revisar o cambiar a las 20 horas y después cada 100 horas o una vez por año. El tanque portátil se revisa y limpia cada 100 horas o una vez por año."}, "helice": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12, "primeraHoras": 20}, "notaMarca": "Plan del fabricante: revisar hélice, tuerca y pasador a las 20 horas y después cada 100 horas o una vez por año."}, "anodos": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Plan del fabricante: revisar el ánodo exterior cada 100 horas o una vez por año. Los ánodos internos los cambia el concesionario cada 500 horas o 5 años."}, "impulsor": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Plan del fabricante: el concesionario revisa la bomba de agua cada 100 horas o una vez por año y cambia el impulsor cada 300 horas o 3 años."}, "termostato": {"segun": "el fabricante", "cada": {"horas": 100, "meses": 12}, "notaMarca": "Plan del fabricante: revisión de concesionario cada 100 horas o una vez por año."}, "invernaje": {"segun": "el fabricante", "notaMarca": "El fabricante recomienda aceite de empañado (fogging) para motores 2T a carburador al guardarlos."}}, "fuenteInterna": "Copia del Yamaha 40 HP 2T (indicado por el taller). Datos e intervalos: Manual del propietario oficial Yamaha 40X (66T-28199-7B, 2012), con datos de los manuales E40X y 40V"},
  ]
};
