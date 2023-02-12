module.exports = function (conn, app, verifyJWT) {
  app.get("/consultarcliente", verifyJWT, function (req, res) {
    //consulta
    conn.query("SELECT * FROM cliente", function (err, results, fields) {
      res.status(200).json(results);
    });
    conn.end(function (err) {
      if (err) throw err;
      else console.log("Closing connection");
    });
  });

  app.post("/cadastrarcliente", verifyJWT, function (req, res) {
    // cadastra
    const { nome, cpf, email, senha, dt_nasc } = req.body;

    conn.query(
      "INSERT INTO cliente (nomeCliente, cpf, email, senha, dt_nasc) values (?,?,?,?,?)",
      [nome, cpf, email, senha, dt_nasc],
      function (error, results) {
        if (error) throw error;
        res.status(200).json(results);
      }
    );
    conn.end(function (err) {
      if (err) throw err;
      else console.log("Closing connection");
    });
  });

  app.put("/editarcliente", verifyJWT, function (req, res) {
    //update
    const { id, nome, cpf, email, senha, dt_nasc } = req.body;

    conn.query(
      "UPDATE cliente set nomeCliente = ?, cpf = ?, email = ?, senha = ?, dt_nasc = ? where idCliente = ?",
      [nome, cpf, email, senha, dt_nasc, id],
      function (error, results) {
        if (error) throw error;
        res.status(200).json(results);
      }
    );

    conn.end(function (err) {
      if (err) throw err;
      else console.log("Closing connection.");
    });
  });

  app.delete("/deletecliente/:idCliente", verifyJWT, function (req, res) {
    // deleta registro
    const { idCliente } = req.body;

    conn.query(
      "DELETE FROM cliente WHERE idCliente= ?",
      [idCliente],
      function (error, results) {
        if (error) throw error;
        res.status(200).json(results);
      }
    );

    conn.end(function (err) {
      if (err) throw err;
      else console.log("Closing connection.");
    });
  });
};
