/* =====================================================================
   REPUESTOS, INSUMOS Y HERRAMIENTAS DEL SERVICE (pedido de Juan, 16/11/2026)
   ---------------------------------------------------------------------
   Lista COMPLETA de todo lo que se nombra en cada tarea del service
   (guía "Haga el service usted mismo" + plan de mantenimiento de cada
   motor), para poder ofrecerlo a la venta desde "Comprar los repuestos".

   - Los datos de cada motor (bujía, aceites, cantidades, filtros) salen de
     la ficha del motor (datos-motores.js, sacados del manual de cada marca).
   - "codigos": números de pieza que figuran en los manuales de la carpeta
     de Juan (Mercury, Tohatsu, Evinrude). Si no hay código, el taller
     confirma el modelo exacto.
   - Esta misma lista arma la planilla listados/repuestos-y-herramientas.xlsx.
   - VENTA: por ahora el pedido va por WhatsApp al taller (sin precios ni
     pago en la app). Regla de Juan: todo cobro queda en modo prueba.

   Campos de cada ítem:
     grupo:   "repuesto" | "insumo" | "herramienta" | "proteccion"
     en:      tareas (id de mantenimiento) donde se usa. Si el motor no
              tiene ninguna de esas tareas, el ítem no aparece. "*" = siempre.
     tiempos / alimentacion: filtros, igual que en el resto de la app.
     datos:   de qué datos de la ficha sale el detalle.
     porCilindro: la cantidad es una por cilindro.
     taller:  lo coloca el taller (se puede pedir igual).
     sugerido: no se nombra literal en la guía, pero hace falta para hacer
              bien la tarea (por ejemplo, la llave de torque para los Nm).
   ===================================================================== */
(function(){

/* Medida de la llave de bujía según el código NGK (o Champion) del manual. */
function llaveBujia(cod){
  if (!cod) return "";
  const c = String(cod).toUpperCase().replace(/^NGK\s+/, "");
  if (/^CHAMPION\s+RC/.test(c) || /^RC\d/.test(c)) return "16 mm (5/8\")";
  if (/^(B|BR|BP|BPR|BPZ|BU)\d/.test(c) || /^B[RP]?\d/.test(c)) return "21 mm (13/16\")";
  if (/^DCPR/.test(c)) return "16 mm";
  if (/^D(P)?R/.test(c) || /^DR-/.test(c)) return "18 mm";
  if (/^LKR/.test(c)) return "14 mm";
  if (/^(LFR|ZFR|IZFR|BKR|CR|CPR)/.test(c)) return "16 mm";
  return "";
}

/* Números de pieza que figuran en los manuales de la carpeta de Juan. */
const KIT_ACEITE_MERCURY = {   // Manual Mercury 30-60 FourStroke 8M0231124, tabla "Oil Change Kits"
  "mercury-15-4t": "Kit de cambio de aceite Mercury 8M0081914 (Quicksilver 8M0081910): trae filtro, aceite y lo necesario",
  "mercury-20-4t": "Kit de cambio de aceite Mercury 8M0081914 (Quicksilver 8M0081910): trae filtro, aceite y lo necesario",
  "mercury-25-4t": "Kit de cambio de aceite Mercury 8M0081915 (Quicksilver 8M0081911): trae filtro, aceite y lo necesario",
  "mercury-30-4t": "Kit de cambio de aceite Mercury 8M0081915 (Quicksilver 8M0081911): trae filtro, aceite y lo necesario",
  "mercury-60-4t": "Kit de cambio de aceite Mercury 8M0081916 (Quicksilver 8M0081912): trae filtro, aceite y lo necesario",
  "mercury-75-4t": "Kit de cambio de aceite Mercury 8M0107510 (Quicksilver 8M0107511): trae filtro, aceite y lo necesario",
  "mercury-90-4t": "Kit de cambio de aceite Mercury 8M0107510 (Quicksilver 8M0107511): trae filtro, aceite y lo necesario",
  "mercury-115-4t": "Kit de cambio de aceite Mercury 8M0107510 (Quicksilver 8M0107511): trae filtro, aceite y lo necesario"
};
const MERCURY_4T_NUEVO = /^mercury-(15|20|25|30|60|75|90|115)-4t$/;   // usan Extreme Grease (manuales 8M0231124 / 8M0108376)

function esMarca(m, ...ms){ return ms.includes(m.marca); }
function llevaFiltroAceite(m, ctx){
  if (m.tiempos !== "4T") return false;
  const f = ctx.dato("Filtro de aceite") || "";
  if (/malla/i.test(f)) return false;
  const nota = ctx.nota("aceite-motor") || "";
  if (/no tiene filtro/i.test(nota)) return false;
  if (ctx.tiene("filtro-aceite") || f) return true;
  const txt = [ctx.dato("Aceite de motor"), ctx.dato("Cantidad de aceite"), ctx.dato("Tapón de aceite / filtro"), nota].join(" ");
  return /filtro/i.test(txt);
}
function electrico(m, ctx){
  // Con dato de batería o arranque eléctrico en la ficha; desde 25 HP casi todos lo tienen (al menos en alguna versión).
  if (/^manual/i.test(ctx.dato("Arranque") || "")) return false;
  return !!(ctx.dato("Batería") || ctx.dato("Batería mínima") || ctx.tiene("bateria") || /eléctrico/i.test(ctx.dato("Arranque") || "") || ctx.tiene("trim") || m.potencia >= 25);
}

const ITEMS = [
  /* ------------------------------ REPUESTOS ------------------------------ */
  { id: "filtro-aceite", grupo: "repuesto", nombre: "Filtro de aceite de motor", en: ["aceite-motor", "filtro-aceite"], tiempos: "4T",
    cuando: llevaFiltroAceite,
    detalle: (m, ctx) => KIT_ACEITE_MERCURY[m.id] || ctx.dato("Filtro de aceite") || "" },
  { id: "arandela-carter", grupo: "repuesto", nombre: "Arandela (sello) del tornillo de drenaje de aceite del motor", en: ["aceite-motor"], tiempos: "4T",
    detalle: m => KIT_ACEITE_MERCURY[m.id] ? "Viene en el kit de cambio de aceite Mercury" : "" },
  { id: "arandelas-cola", grupo: "repuesto", nombre: "Arandelas (sellos) de los tornillos de la pata · 2 unidades", en: ["aceite-cola"],
    detalle: () => "Una para el tapón de drenaje (abajo) y otra para el de nivel (arriba)" },
  { id: "bujias", grupo: "repuesto", nombre: "Bujías", en: ["bujias"], datos: ["Bujía NGK", "Bujía"], porCilindro: true },
  { id: "filtro-nafta", grupo: "repuesto", nombre: "Filtro de nafta (o elemento de repuesto)", en: ["filtro-combustible"],
    detalle: (m) => esMarca(m, "Evinrude", "Johnson") ? "Filtro separador de agua de la lancha: Evinrude/Johnson P/N 174176" + (m.potencia >= 115 ? " · filtro del motor P/N 502906" : "")
      : m.alimentacion === "inyeccion" && m.tiempos === "4T" ? "Filtro separador de agua (baja presión). El de alta presión lo cambia el taller" : "" },
  { id: "junta-filtro-nafta", grupo: "repuesto", nombre: "Junta (o-ring) del vaso del filtro de nafta", en: ["filtro-combustible"],
    detalle: () => "Solo si su filtro es de vaso" },
  { id: "abrazaderas", grupo: "repuesto", nombre: "Abrazaderas para manguera de nafta", en: ["filtro-combustible"] },
  { id: "manguera-pera", grupo: "repuesto", nombre: "Manguera de nafta con pera de cebado", en: ["filtro-combustible"],
    detalle: () => "Si la manguera está reseca o agrietada, o la pera no se infla sola" },
  { id: "chaveta", grupo: "repuesto", nombre: "Chaveta (pasador partido) de la tuerca de hélice", en: ["helice"],
    detalle: m => /^tohatsu-(40|50)-2t$/.test(m.id) ? "3 × 25 mm (manual Tohatsu M40D2/M50D2)" : "" },
  { id: "pasador-seguridad", grupo: "repuesto", nombre: "Pasador de seguridad (perno de corte) de hélice", en: ["helice"],
    cuando: m => m.potencia <= 6, detalle: () => "Los motores chicos lo llevan: se corta si la hélice golpea. Conviene tener uno de repuesto a bordo" },
  { id: "anodos", grupo: "repuesto", nombre: "Ánodos de sacrificio", en: ["anodos"],
    detalle: (m, ctx) => /concesionario|internos/i.test(ctx.nota("anodos") || "") ? "El ánodo exterior lo cambia usted; los internos, el taller" : "" },
  { id: "alemite", grupo: "repuesto", nombre: "Grasera (alemite) de repuesto", en: ["engrase"],
    detalle: () => "Por si alguna está rota o tapada y no entra la grasa" },
  { id: "llave-corte", grupo: "repuesto", nombre: "Llave de corte con cordón (hombre al agua) de repuesto", en: ["*"],
    detalle: () => "Sin ella el motor no arranca: conviene tener una de repuesto a bordo" },
  { id: "kit-carburador", grupo: "repuesto", nombre: "Kit de juntas del carburador", en: ["carburador"], alimentacion: "carburador",
    detalle: (m, ctx) => { const c = ctx.cilindros; return c && c > 1 && m.potencia >= 25 ? "Puede llevar un kit por carburador: el taller le confirma cuántos" : ""; } },
  { id: "bateria", grupo: "repuesto", nombre: "Batería náutica", en: ["*"], cuando: (m, ctx) => electrico(m, ctx),
    datos: ["Batería mínima", "Batería"], detalle: () => "Solo si su motor tiene arranque eléctrico y hay que cambiarla" },
  { id: "kit-impulsor", grupo: "repuesto", nombre: "Kit de bomba de agua (impulsor y juntas)", en: ["impulsor"], taller: true },
  { id: "termostato", grupo: "repuesto", nombre: "Termostato y su junta", en: ["termostato"], taller: true },
  { id: "correa-distribucion", grupo: "repuesto", nombre: "Correa de distribución", en: ["correa", "correa-distribucion"], tiempos: "4T", taller: true },
  { id: "correa-accesorios", grupo: "repuesto", nombre: "Correa de accesorios", en: ["correa-accesorios"], taller: true },
  { id: "filtro-aire-compresor", grupo: "repuesto", nombre: "Filtro de aire del compresor", en: ["filtro-aire"], taller: true },
  { id: "correa-compresor", grupo: "repuesto", nombre: "Correa del compresor", en: ["correa-compresor"], taller: true },
  { id: "cuerda-arranque", grupo: "repuesto", nombre: "Cuerda (piola) de arranque", en: ["cuerda-arranque"] },
  { id: "embrague", grupo: "repuesto", nombre: "Zapatas y campana de embrague", en: ["embrague"], taller: true },
  { id: "buje-sello", grupo: "repuesto", nombre: "Buje del soporte y sello de agua", en: ["buje-sello"], taller: true },

  /* ------------------------- ACEITES, GRASAS E INSUMOS ------------------------- */
  { id: "aceite-motor", grupo: "insumo", nombre: "Aceite de motor 4T náutico", en: ["aceite-motor"], tiempos: "4T", datos: ["Aceite de motor", "Cantidad de aceite"] },
  { id: "aceite-2t", grupo: "insumo", nombre: "Aceite 2T náutico (para la mezcla o el tanque de aceite)", en: ["*"], tiempos: "2T", datos: ["Aceite 2T"],
    detalle: (m, ctx) => [ctx.dato("Mezcla nafta/aceite") ? "Mezcla " + String(ctx.dato("Mezcla nafta/aceite")).split(/[,;(]/)[0].trim() : "", ctx.dato("Lubricación") || ""].filter(Boolean).join(" · ") },
  { id: "aceite-cola", grupo: "insumo", nombre: "Aceite de cola (pata)", en: ["aceite-cola"], datos: ["Aceite de cola"],
    detalle: m => esMarca(m, "Mercury") && m.origen === "americano" ? "Código del manual Mercury: Quicksilver Premium Blend 92-19007A24" : "" },
  { id: "grasa", grupo: "insumo", nombre: "Grasa náutica resistente al agua", en: ["engrase", "helice"],
    detalle: (m, ctx) => MERCURY_4T_NUEVO.test(m.id) ? "Mercury Extreme Grease 8M0190472 (manual Mercury)"
      : esMarca(m, "Mercury") ? "Quicksilver 2-4-C con teflón 92-802859Q1 (manual Mercury)"
      : esMarca(m, "Evinrude", "Johnson") ? "Evinrude/Johnson Triple-Guard (manual Evinrude)"
      : (ctx.dato("Grasa") || "") },
  { id: "grasa-anticorrosiva", grupo: "insumo", nombre: "Grasa anticorrosiva para el eje de la hélice", en: ["helice"],
    cuando: (m, ctx) => /anticorros/i.test(ctx.dato("Grasa") || "") || (esMarca(m, "Mercury") && !MERCURY_4T_NUEVO.test(m.id)),
    detalle: m => esMarca(m, "Mercury") ? "Quicksilver Anti-Corrosion Grease 92-802867Q1 (manual Mercury)" : "La indica el manual de su motor" },
  { id: "fluido-trim", grupo: "insumo", nombre: "Fluido del trim", en: ["*"], datos: ["Fluido del trim (PTT)"], cuando: (m, ctx) => !!ctx.dato("Fluido del trim (PTT)") },
  { id: "limpia-carburador", grupo: "insumo", nombre: "Limpiador de carburador en aerosol", en: ["carburador"], alimentacion: "carburador" },
  { id: "estabilizador", grupo: "insumo", nombre: "Estabilizador de nafta", en: ["invernaje"],
    detalle: m => esMarca(m, "Mercury") ? "Quicksilver Quickstor 92-8M0047932 (manual Mercury)" : esMarca(m, "Evinrude", "Johnson") ? "Evinrude 2+4 Fuel Conditioner (manual Evinrude)" : "" },
  { id: "fogging", grupo: "insumo", nombre: "Aceite de empañado (fogging) para guardar el motor", en: ["invernaje"],
    detalle: m => esMarca(m, "Evinrude", "Johnson") ? "Evinrude Storage Fogging Oil (manual Evinrude)" : "" },
  { id: "anticorrosivo", grupo: "insumo", nombre: "Protector anticorrosivo en aerosol (para guardar el motor)", en: ["invernaje"],
    cuando: m => esMarca(m, "Mercury") && m.tiempos === "4T", detalle: () => "Quicksilver Corrosion Guard 92-802878Q55 (manual Mercury)" },
  { id: "vaselina", grupo: "insumo", nombre: "Vaselina (grasa para bornes de batería)", en: ["*"], cuando: (m, ctx) => electrico(m, ctx) },
  { id: "bicarbonato", grupo: "insumo", nombre: "Bicarbonato (para limpiar los bornes)", en: ["*"], cuando: (m, ctx) => electrico(m, ctx) },

  /* ------------------------------ HERRAMIENTAS ------------------------------ */
  { id: "orejeras", grupo: "herramienta", nombre: "Orejeras de enjuague", en: ["*"],
    detalle: m => esMarca(m, "Mercury") ? "Mercury: Flushing Attachment 44357A2 (manual Mercury)" : "" },
  { id: "llave-bujia", grupo: "herramienta", nombre: "Llave de bujía", en: ["bujias"],
    detalle: (m, ctx) => { const x = llaveBujia(ctx.dato("Bujía NGK") || ctx.dato("Bujía")); return x ? "Medida " + x : "Medida según la bujía de su motor"; } },
  { id: "calibre-sondas", grupo: "herramienta", nombre: "Calibre de luz (sondas) para bujías", en: ["bujias"], datos: ["Luz de bujía"] },
  { id: "llave-torque", grupo: "herramienta", nombre: "Llave de torque (dinamométrica)", en: ["bujias", "helice", "aceite-motor"], sugerido: true,
    detalle: (m, ctx) => { const a = [ctx.dato("Ajuste de bujía") ? "Bujía " + String(ctx.dato("Ajuste de bujía")).split(/[(;]/)[0].trim() : "", ctx.dato("Ajuste tuerca de hélice") ? "Tuerca de hélice " + ctx.dato("Ajuste tuerca de hélice") : "", ctx.dato("Tapón de aceite / filtro") ? "Tapón / filtro de aceite " + ctx.dato("Tapón de aceite / filtro") : ""].filter(Boolean); return a.length ? "Para los ajustes del manual: " + a.join(" · ") : "Para ajustar con los valores del manual"; } },
  { id: "pistola-grasa", grupo: "herramienta", nombre: "Pistola (inflador) de engrase", en: ["engrase"] },
  { id: "pomo-cola", grupo: "herramienta", nombre: "Bombín (pomo) para cargar aceite de cola", en: ["aceite-cola"] },
  { id: "llave-filtro", grupo: "herramienta", nombre: "Llave de filtro de aceite", en: ["aceite-motor", "filtro-aceite"], tiempos: "4T",
    cuando: llevaFiltroAceite,
    detalle: m => /^tohatsu-mfs(15|20|25|30|40|50|60)$/.test(m.id) ? "Tohatsu P/N 3AC-99090-0 (manual Tohatsu)" : "" },
  { id: "juego-llaves", grupo: "herramienta", nombre: "Juego de llaves fijas y de tubo", en: ["aceite-motor", "anodos", "helice"] },
  { id: "llave-helice", grupo: "herramienta", nombre: "Llave de tubo para la tuerca de la hélice", en: ["helice"] },
  { id: "traba-helice", grupo: "herramienta", nombre: "Taco de madera (traba de hélice)", en: ["helice"] },
  { id: "pinza", grupo: "herramienta", nombre: "Pinza", en: ["helice"] },
  { id: "destornilladores", grupo: "herramienta", nombre: "Juego de destornilladores (incluye uno ancho para los tapones de la pata)", en: ["aceite-cola", "anodos", "carburador"] },
  { id: "recipiente", grupo: "herramienta", nombre: "Recipiente para aceite usado (5 litros)", en: ["aceite-motor", "aceite-cola"] },
  { id: "embudo", grupo: "herramienta", nombre: "Embudo", en: ["aceite-motor"], tiempos: "4T" },
  { id: "bidon-mezcla", grupo: "herramienta", nombre: "Bidón para preparar la mezcla", en: ["*"], tiempos: "2T",
    cuando: (m, ctx) => !!ctx.dato("Mezcla nafta/aceite") || !ctx.dato("Lubricación") },
  { id: "cepillo-alambre", grupo: "herramienta", nombre: "Cepillo de alambre suave", en: ["anodos"] },
  { id: "tester", grupo: "herramienta", nombre: "Tester (multímetro)", en: ["*"], cuando: (m, ctx) => electrico(m, ctx) },
  { id: "cargador-bateria", grupo: "herramienta", nombre: "Cargador de batería", en: ["*"], cuando: (m, ctx) => electrico(m, ctx), sugerido: true },
  { id: "cinta-marcar", grupo: "herramienta", nombre: "Cinta para marcar los cables de bujía", en: ["bujias"], cuando: (m, ctx) => (ctx.cilindros || 1) > 1 },
  { id: "aire-comprimido", grupo: "herramienta", nombre: "Inflador o compresor de aire", en: ["carburador"], alimentacion: "carburador" },
  { id: "bandeja-piezas", grupo: "herramienta", nombre: "Bandeja para piezas chicas", en: ["carburador"], alimentacion: "carburador" },
  { id: "caballete", grupo: "herramienta", nombre: "Caballete para motor fuera de borda", en: ["*"] },

  /* --------------------------- LIMPIEZA Y PROTECCIÓN --------------------------- */
  { id: "guantes", grupo: "proteccion", nombre: "Guantes", en: ["*"] },
  { id: "anteojos", grupo: "proteccion", nombre: "Anteojos de protección", en: ["carburador"], alimentacion: "carburador" },
  { id: "trapos", grupo: "proteccion", nombre: "Trapos o paños absorbentes", en: ["*"] }
];

const GRUPOS = [
  { id: "repuesto", nombre: "Repuestos" },
  { id: "insumo", nombre: "Aceites, grasas e insumos" },
  { id: "herramienta", nombre: "Herramientas" },
  { id: "proteccion", nombre: "Limpieza y protección" }
];

/* Arma la lista para un motor.
   m:   motor del catálogo (id, marca, tiempos, alimentacion, potencia, origen)
   ctx: { tiene(idTarea), dato(nombre), nota(idTarea), cilindros } */
function lista(m, ctx){
  return ITEMS.filter(it => (!it.tiempos || it.tiempos === m.tiempos) && (!it.alimentacion || it.alimentacion === m.alimentacion))
    .filter(it => it.en.includes("*") || it.en.some(t => ctx.tiene(t)))
    .filter(it => !it.cuando || it.cuando(m, ctx))
    .map(it => {
      let v = (it.datos || []).map(d => ctx.dato(d)).filter(Boolean);
      if (it.datos && it.datos.length > 1 && /^(Bujía NGK|Batería mínima)$/.test(it.datos[0]) && v.length > 1) v = [v[0]];
      if (it.porCilindro && v.length){ const c = ctx.cilindros; v = [v[0] + (c ? " · " + c + (c === 1 ? " unidad" : " unidades") : "")]; }
      const extra = it.detalle ? it.detalle(m, ctx) : "";
      if (extra) v.push(extra);
      return { item: it, detalle: v.join(" · ") };
    });
}

window.REPUESTOS = { items: ITEMS, grupos: GRUPOS, lista, llaveBujia };
})();
