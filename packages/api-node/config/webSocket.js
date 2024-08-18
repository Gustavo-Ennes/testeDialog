const WebSocket = require("ws");
const { getLogger } = require("../config/winston");

const webSocketLogger = getLogger("WebSocket");

const clients = new Set();

const connectWebSocket = () => {
    const webSocketServer = new WebSocket.Server({ port: 5001 });

    webSocketServer.on("connection", (ws) => {
        webSocketLogger.info("Client connected");
        clients.add(ws);

        ws.on("message", (message) =>
            webSocketLogger.info("Received a message: ", { message })
        );

        ws.on("close", () => {
            webSocketLogger.info("Client disconnected: ");
            clients.delete(ws);
        });

        ws.on("error", (error) => {
            webSocketLogger.error(error.message, error);
        });
    });
};

const notifyClients = (newPost) => {
    for (const client of clients) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(newPost));
        } else
            webSocketLogger.error(
                "Erro notifying client through websocket. See the logs."
            );
    }
};

module.exports = { notifyClients, connectWebSocket };
