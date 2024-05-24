const express = require("express");
const path = require("path");
const http = require("http");

const app = express();

app.use(express.static(__dirname + "/dist/wedding-website/"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/wedding-website/index.html"));
});

const port = process.env.PORT || "4998";
app.set("port", port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));
