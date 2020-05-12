const WebSocket = require("ws");

function WSUtils() {
    const wsu = {};

    wsu.setupWS = (server) => {
        console.log("Setting up Web Socket");
        const wss = new WebSocket.Server({ server });
        const queue = [];

        wss.on("connection", (ws) => {
            console.log("New connection!");
            if (!queue.length) {
                queue.push(ws);
            } else {
                wsu.gameProtocol(queue.pop(), ws);
            }
        });
    };

    wsu.gameProtocol = (ws1, ws2) => {
        console.log("Game protocol");
        ws1.onmessage = (msg) => {
            console.log("Message WS1: ", msg.data);
            ws2.send(msg.data);
        };
        ws2.onmessage = (msg) => {
            console.log("Message WS2: ", msg.data);
            ws1.send(msg.data);
        };
    }

    return wsu;
}

module.exports = WSUtils();