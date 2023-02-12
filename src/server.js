const jwt = require("jsonwebtoken");

const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.listen(5000, function () {
  console.log("Api contato esta rodando na porta 5000!");
});

const conn = require("./config/bd");

function verifyJWT(req, res, next) {
  // const token = req.headers["x-acess-token"];
  // if (!token)
  //   return res.status(401).json({ auth: false, message: "No token provided." });

  // jwt.verify(token, process.env.SECRET, function (err, decored) {
  //   if (err)
  //     return res
  //       .status(500)
  //       .json({ auth: false, message: "Failed to authenticate token." });

  //   req.userId = decored.id;
  next();
  // });
}

require("./routes/cliente")(conn, app, verifyJWT);

require("./routes/fornecedor")(conn, app, verifyJWT);

require("./routes/produto")(conn, app, verifyJWT);

require("./routes/venda")(conn, app, verifyJWT);

require("./routes/funcionario")(conn, app, verifyJWT);

require("./routes/login")(conn, app, jwt);
