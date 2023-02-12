module.exports = function (conn, app, verifyJWT) {
  app.get("/consultarfornecedor", verifyJWT, function (req, res) {
    //consulta
    conn.query("SELECT * FROM fornecedor", function (err, results, fields) {
      res.status(200).json(results);
    });
    conn.end(function (err) {
      if (err) throw err;
      else console.log("Closing connection");
    });
  });

  app.post("/cadastrarfornecedor", verifyJWT, function (req, res) {
    // cadastra
    const { nome, telefone } = req.body;

    conn.query(
      "INSERT INTO fornecedor (nome, telefone) values (?,?)",
      [nome, telefone],
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

  app.put("/editarfornecedor", verifyJWT, function (req, res) {
    //update
    const { idFornecedor, nome, telefone } = req.body;

    conn.query(
      "UPDATE fornecedor set nome = ?, telefone = ? where idFornecedor = ?",
      [nome, telefone, idFornecedor],
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

  app.delete("/deletefornecedor", verifyJWT, function (req, res) {
    // deleta registro
    const { idFornecedor } = req.body;

    conn.query(
      "DELETE FROM fornecedor WHERE idFornecedor= ? ",
      [idFornecedor],
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
