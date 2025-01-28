const http = require("http");
const app = require("./app");
const PORT = process.env.PORT || 3000;
const { initializeSocket } = require('./socket');

const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}` + " " + `http://localhost:${PORT}`);
});