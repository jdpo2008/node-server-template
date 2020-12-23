const { app } = require("./src/app")
const http = require('http');
//const https = require('https');
//const privateKey  = fs.readFileSync('certificates/key.pem', 'utf8');
//const certificate = fs.readFileSync('certificates/cert.pem', 'utf8');

//const credentials = {key: privateKey, cert: certificate};

const PORT = process.env.PORT || 8080;

// Se asignan las rutas a usar

// enpoint inicial
app.use("/", (req, res) => {
    res.send({ status: true, message: "Server running sucessfully" });
});
  
// Si la url no es valida indica el error
app.use("*", (req, res) => {
    res.send({ status: false, message: "Endpoint not found" });
});

app.set("port", PORT);

// your express configuration here

const httpServer = http.createServer(app);
//const httpsServer = https.createServer(credentials, app);

// For http
httpServer.listen(8080, () => {
  console.log(
    "Server operaivo sobre el PORT: \x1b[32m%s\x1b[0m",
    app.get("port")
  );
});
// For https
//httpsServer.listen(8443);
