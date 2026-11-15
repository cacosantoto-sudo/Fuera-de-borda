/* =====================================================================
   TALLERES ADHERIDOS – Auxilio Fuera de Borda
   Cada taller tiene su link:  https://cacosantoto-sudo.github.io/Fuera-de-borda/?t=CODIGO
   y su kit imprimible con QR: https://cacosantoto-sudo.github.io/Fuera-de-borda/kit.html?t=CODIGO
   El cliente que entra por el link queda con ese taller (lo puede cambiar en "Mi motor").

   Para dar de alta un taller: copiar un bloque y completar.
   Para darlo de baja (dejó de pagar): poner  activo:false  (sus clientes pasan a ver la app sin taller).
     codigo        corto, sin espacios ni acentos (va en el link)
     nombre        como lo quiere ver el cliente
     ciudad        para la lista "Buscar un taller adherido"
     tel           para llamar, con +54 9 y característica, sin espacios
     whatsapp      el mismo número sin "+"
     ver           cómo se muestra el número
     logo          (opcional) archivo en la carpeta logos/, cuadrado (PNG o SVG)
     repuestos     true = muestra "Comprar los repuestos" con pedido a su WhatsApp
     servicePropio true = muestra "Haga el service usted mismo"
     guiaIncluida  true = el taller les regala la guía a TODOS sus clientes (no ven nada bloqueado).
                   Para regalársela a un cliente solo, el taller le da un código desde su kit (kit.html).
     muestra       true = taller de demostración: no aparece en la lista, solo por link
   ===================================================================== */
window.TALLERES = {
  // Quienes ya tenían la app instalada antes de los talleres adheridos quedan con este taller.
  anteriores: "scotto",
  // Contacto para talleres que quieren adherirse (página "Para talleres").
  contacto: { nombre: "Juan José Scotto", whatsapp: "5493425217781" },
  lista: [
    { codigo: "scotto", nombre: "Scotto Mecánica Náutica", ciudad: "Santa Fe",
      tel: "+5493425217781", whatsapp: "5493425217781", ver: "342 521-7781",
      logo: "", repuestos: true, servicePropio: true, guiaIncluida: false, activo: true },

    // Taller de muestra para enseñarle la app a un taller interesado (los botones van al teléfono de Juan).
    { codigo: "muestra", nombre: "Náutica del Puerto (taller de muestra)", ciudad: "Rosario",
      tel: "+5493425217781", whatsapp: "5493425217781", ver: "342 521-7781",
      logo: "logos/muestra.svg", repuestos: true, servicePropio: false, activo: true, muestra: true }
  ]
};
