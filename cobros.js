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
  servicePropio: {
    activo: false,                 // false = la guía sigue gratis. true = se cobra.
    precio: 150000,                // en pesos
    usd: 99,                       // referencia en dólares
    linkPago: "",                  // link de pago de Mercado Pago con monto fijo. Vacío = se coordina por WhatsApp.
    whatsapp: "5493425217781"      // a dónde llegan los comprobantes
  }
};
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
