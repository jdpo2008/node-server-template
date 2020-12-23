const cors = require("cors");
const path = require("path");
//const http = require('http');
//const https = require('https');
const helmet = require("helmet");
const winston = require("winston");
const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const fileUpload = require("express-fileupload");
const expressWinston = require("express-winston");

const app = express();

app.use(cors({ origin: true}));
app.use(helmet());
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

// Se setea la creacion del path en el archivo
app.use(fileUpload({ createParentPath: true }));

// Directorio público
app.use(express.static(path.join(__dirname, "public")));

// express-winston logger makes sense BEFORE the router
let fecha = new Date();
app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.Console({ level: "error" }),
      new winston.transports.Http({
        level: "warn",
      }),
      new winston.transports.File({
        filename: path.join(
          __dirname,
          `src/logs/${
            fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDay()
          }_error.log`
        ),
        level: "info",
      }),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
  })
);

module.exports = {
    app
};