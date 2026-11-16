// Guarda la app en el celular para que abra sin señal (en el río o el mar).
const CACHE = "fdb-v31";
const ARCHIVOS = ["./", "./index.html", "./datos-motores.js", "./diagnosticos.js", "./identificar-anio.js", "./service-propio.js", "./talleres.js", "./cobros.js", "./logos/muestra.svg", "./manifest.webmanifest", "./icono.svg", "./icono-192.png", "./icono-512.png", "./icono-180.png"];
self.addEventListener("install", e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARCHIVOS)).then(() => self.skipWaiting())));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  // "no-cache": siempre pregunta al servidor si hay versión nueva (si no hay señal, usa la guardada)
  e.respondWith(fetch(e.request, { cache: "no-cache" }).then(r => { const copia = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copia)); return r; }).catch(() => caches.match(e.request)));
});
