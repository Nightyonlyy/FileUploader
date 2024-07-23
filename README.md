# Just a SIMPLE FILE UPLOADER

## Beschreibung

Dieses Projekt ermöglicht das einfache Hochladen von Dateien auf einen Server über eine benutzerfreundliche Weboberfläche. Es eignet sich ideal für schnellere und effizientere Dateiübertragungen, ohne auf komplexe Befehle oder Skripte zurückgreifen zu müssen.

## Installation
Schritte zur Installation der Anwendung auf einem Server.

1. Klonen Sie das Repository auf Ihren Server:
```shell
git clone https://github.com/Nightyonlyy/FileUploader.git
```
2. Wechsel den Pfad zu server.js:
```shell
cd FileUploader/
```
3. Starten Sie Ihren Server (Benötigt node js, siehe unten):
```shell
node server.js
```
4. Besuche sie auf die ip:port Ihres Servers
Beispiel
```shell
localhost:3000
```

INFO:
Falls es gewünscht ist das die Website im Hintergrund läuft, empfiehlt sich pm2 [Node.js benötigt]. (Installation weiter unten)


## Node js Installation on Ubuntu
1. Fügen Sie das offizielle Repository hinzu:
```shell
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
```
2. Installiere Node.js:
```shell
sudo apt-get install -y nodejs
```
3. Überprüfe die Installation:
```shell
node -v
npm -v
```

## PM2 globale Installation auf Ubuntu
1. Installiere PM2 global, sollte das nicht gewünscht sein das "-g" entfernen:
```shell
sudo npm install -g pm2
```
2. Überprüfe die Installation:
```shell
pm2 -v
```
3. Füge eine App PM2 hinzu, die im Hintergrund laufen soll:
```shell
pm2 start server.js
```

Anpassungen können in der config datei vorgenommen werden
<div style="background-color:yellow; color:black; padding:10px;">
    <strong>Warnung:</strong> Aktuelle Anpassungen in der config datei sind nur der port für die weboberfläche
</div>

