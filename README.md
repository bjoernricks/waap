# Waap - Daap Web App

Waap is a web based application (means running in your browser) to communicate
with [DAAP](https://de.wikipedia.org/wiki/Digital_Audio_Access_Protocol)
servers. It allows to browse your music library and play songs directly in your
web browser.

 * [Getting Started](#getting-started)
 * [Note on iTunes](#note-on-itunes)
 * [Note on CORS](#note-on-cors)

## tl;dr

```sh
cd waap
npm install
npm start
```

Afterwards open http://localhost:3000/ to connect to your daap server.

## Getting Started

Waap is in an early stage. It has not yet been tested to be run from a web
server like Apache or ngnix. Therefore currently it requires nodejs to be
shipped. A nodejs development server can be started with `npm start`. Waap
itself will be served at http://localhost:8000 afterwards.

## Note on iTunes

With iTunes 7 the authentication scheme for its daap server changed and Apple
decided to lock out other clients then iTunes >= 7. Therefore it is not possible
to connect to iTunes with this application. Thanks to the free software
community better daap servers like
[forked-daapd](http://ejurgensen.github.io/forked-daapd/) exist.

## Note on CORS and running a proxy

For security reasons browsers will only handle responses from http servers with
enabled [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing).
Sadly currently no daap server supports CORS.

To circumvent this issue you can run a proxy to add CORS headers to responses
from your daap server. Waap ships with a simple poxy which can be started with

```sh
cd waap
node proxy.js -f http://url.or.ip.to.your.daap.server:port
```

Afterwards open Waap and use 127.0.0.1 (or localhost) and port 3689 for your
connection settings.
