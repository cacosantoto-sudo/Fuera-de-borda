/* =====================================================================
   COBROS – Auxilio Fuera de Borda (Juan, 15/11/2026)
   "Haga el service usted mismo" se compra una vez, para el motor del usuario.
   Cómo funciona (sin servidor):
     1. El usuario toca "Haga el service usted mismo" y ve la pantalla de compra con el precio.
     2. Paga (link de Mercado Pago o transferencia) y manda el comprobante por WhatsApp
        con su NÚMERO DE PEDIDO (lo muestra la app; es distinto en cada celular).
     3. Juan abre codigo.html, escribe ese número y le responde el CÓDIGO por WhatsApp.
     4. El usuario escribe el código en la app y la guía queda activada en ese celular.
   Para prender o apagar el cobro: activo true / false.
   ===================================================================== */
window.COBROS = {
  // Juan (16/11/2026): una sola versión de prueba para todos. true = todos ven los bloqueos, la pantalla de compra
  // y los precios de talleres, pero nadie paga: la guía se activa con el código de prueba (PRUEBA).
  pruebaParaTodos: true,
  servicePropio: {
    activo: false,                 // false = la guía sigue gratis. true = se cobra.
    usd: 99,                       // precio que se muestra (Juan, 16/11/2026: solo en dólares)
    precio: 150000,                // referencia en pesos (no se muestra)
    linkPago: "",                  // link de pago de Mercado Pago con monto fijo. Vacío = se coordina por WhatsApp.
    whatsapp: "5493425217781",     // a dónde llegan los comprobantes
    // MODO PRUEBA (Juan, 15/11/2026): con el cobro apagado, quien abre la app con el link
    //   https://cacosantoto-sudo.github.io/Fuera-de-borda/?prueba=1
    // ve la pantalla de compra y puede activar la guía con este código, sin pagar.
    // Los demás usuarios no ven nada distinto. Para salir: el botón de la pantalla, o ?prueba=0.
    codigoPrueba: "PRUEBA"
  },
  // Suscripción de los talleres adheridos (página "Para talleres").
  // activo:false = la página dice que adherirse es sin cargo durante el lanzamiento (no muestra precios).
  // Con ?prueba=1 se ven los precios tal como quedarían. El alta y la baja de cada taller se hacen en talleres.js.
  talleres: {
    activo: false,
    precioMes: 20000,
    precioAnio: 200000,
    mesesGratis: 3,          // para los primeros talleres
    primeros: 10
  }
};
/* RESUMEN DE INTERRUPTORES (Juan, 15/11/2026: todo lo que cobra queda en prueba hasta que él decida):
   servicePropio.activo  -> cobrar la guía "Haga el service usted mismo"
   talleres.activo       -> mostrar los precios a los talleres
   Repuestos: no se cobra en la app; el taller responde por WhatsApp con su precio. */
/* Código de activación: sale del número de pedido. No cambiar la "sal" una vez que se vendió,
   porque los códigos ya entregados dejarían de funcionar. */
window.COBROS.codigo = function(pedido, producto){
  var s = "auxilio|" + (producto || "sp") + "|" + String(pedido || "").replace(/\D/g, "") + "|sal-2026-santa-fe";
  var h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (var i = 0; i < s.length; i++){ var c = s.charCodeAt(i); h1 = Math.imul(h1 ^ c, 2654435761); h2 = Math.imul(h2 ^ c, 1597334677); }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  var n = 4294967296 * (2097151 & h2) + (h1 >>> 0), abc = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789", out = "";
  for (var k = 0; k < 6; k++){ out += abc[n % 32]; n = Math.floor(n / 32); }
  return out;
};
