const WebSocket = require("ws");

function WSUtils() {
    const wsu = {};

    const framework = {
        create: "create",
        createprivate: "createprivate",
        games: "games",
        startgame: "startgame",
        startprivategame: "startprivategame",
        move: "move",
        turn: "turn",
        winner: "winner",
        username: "username",
    };

    wsu.generateID = (count, array) => {
        var founded = false,
            _sym = "1234567890",
            str = "";
        while (!founded) {
            for (var i = 0; i < count; i++) {
                str += _sym[parseInt(Math.random() * _sym.length)];
            }
            const index = array.indexOf(str);
            if (index < 0) {
                founded = true;
            }
        }
        return str;
    };

    wsu.setupWS = (server) => {
        console.log("Setting up Web Socket");
        const wss = new WebSocket.Server({ server });
        const gamesSockets = [];
        const gamesQueue = [];
        const gamesStartedQueue = [];

        wss.on("connection", (ws) => {
            console.log("New connection!");
            ws.onmessage = (event) => {
                let msg = JSON.parse(event.data);
                switch (msg.type) {
                    case framework.create:
                        let id = wsu.generateID(6, gamesQueue);
                        ws.send(
                            JSON.stringify({
                                type: framework.create,
                                data: id,
                            })
                        );
                        gamesQueue.push(id);
                        gamesSockets.map((socket) => {
                            socket.send(
                                JSON.stringify({
                                    type: framework.games,
                                    data: gamesQueue,
                                })
                            );
                        });
                        break;
                    case framework.games:
                        ws.send(
                            JSON.stringify({
                                type: framework.games,
                                data: gamesQueue,
                            })
                        );
                        gamesSockets.push(ws);
                        break;
                    case framework.startgame:
                        const idGame = msg.data;
                        const found = gamesStartedQueue.find((game) => game.id === idGame);
                        if (found === undefined) {
                            gamesStartedQueue.push({ id: idGame, ws });
                            gamesStartedQueue.map((game) => console.log(game.id));
                        } else {
                            var index = gamesQueue.indexOf(found.id);
                            if (index > -1) {
                                gamesQueue.splice(index, 1);
                            }
                            gamesSockets.map((socket) => {
                                socket.send(
                                    JSON.stringify({
                                        type: framework.games,
                                        data: gamesQueue,
                                    })
                                );
                            });
                            wsu.gameProtocol(found.ws, ws);
                            index = gamesStartedQueue.indexOf(found);
                            if (index > -1) {
                                gamesStartedQueue.splice(index, 1);
                            }
                        }

                    default:
                        break;
                }
            };
        });
    };

    wsu.sendBySocket = (ws, type, data) => {
        let msg = {
            type,
            data,
        };
        ws.send(JSON.stringify(msg));
    };

    wsu.gameProtocol = (ws1, ws2) => {
        wsu.sendBySocket(ws1, framework.turn, true);
        wsu.sendBySocket(ws2, framework.turn, false);
        ws1.onmessage = (event) => {
            let msg = JSON.parse(event.data);
            switch (msg.type) {
                case framework.move:
                    ws2.send(event.data);
                    break;
                case framework.winner:
                    ws2.send(event.data);
                    break;
                case framework.username:
                    ws2.send(event.data);
                    console.log(event.data);
                    break;
                default:
                    console.log(msg.data);
                    break;
            }
        };
        ws2.onmessage = (event) => {
            let msg = JSON.parse(event.data);
            switch (msg.type) {
                case framework.move:
                    ws1.send(event.data);
                    break;
                case framework.winner:
                    ws1.send(event.data);
                    break;
                case framework.username:
                    ws1.send(event.data);
                    console.log(event.data);
                    break;
                default:
                    console.log(msg.data);
                    break;
            }
        };
    };

    return wsu;
}

module.exports = WSUtils();