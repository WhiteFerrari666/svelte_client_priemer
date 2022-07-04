---

## Friends and Places Client, Svelte Edition

Dieses Projekt enthält einen Client für den Friends-and-Places (FAP) Server.
Der Client nutzt das Frontend-Framework Svelte und ist als Single-Page-App konzipiert.

Der zugehörige Server läuft autark, beispielsweise in einem Tomcat Application Server und wird vom Client per REST/HTTP
angesprochen.

### Vorkehrungen bzgl. des Servers

Server:

Vorab bitte sicherstellen, dass der FAP-Server korrekt gestartet ist und auf einem **anderen Port als 8080** läuft.
In unserem Fall wird der Server unter localhost:8088 erwartet.
Die URL des Servers, die der Client verwendet, lässt sich in der Konstanten `fapServerBaseURL` in `scripts/stores.ts`
bearbeiten.

### Client lokal starten

Projekt auschecken und Dependencies mit `npm` installieren:

```bash
cd <projektordner>
npm install
```

Der Build- und Bereitstellungsprozess wird dann über das Tool [Rollup](https://rollupjs.org) gesteuert:

Mit

```bash
npm run dev
```

wird der Client auf dem lokalen Rechner unter [localhost:8080](http://localhost:8080) bereitgestellt.