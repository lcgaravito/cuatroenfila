const WebSocket = require("ws");

function WSUtils() {
    const wsu = {};

    wsu.setupWS = (server) => {
        console.log("Setting up Web Socket");
        const wss = new WebSocket.Server({ server });

        wss.on("connection", (ws) => {
            console.log("New connection!");
            ws.send(1);
            ws.send(0);
        });
    };

    return wsu;
}

module.exports = WSUtils();