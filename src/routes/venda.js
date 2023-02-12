module.exports = function (conn, app, verifyJWT) {
  app.get("/consultarvenda", verifyJWT, function (req, res) {
    //consulta
    conn.query("SELECT * FROM venda", function (err, results, fields) {
      res.status(200).json(results);
    });
    conn.end(function (err) {
      if (err) throw err;
      else console.log("Closing connection");
    });
  });

  app.post("/cadastrarvenda", verifyJWT, function (req, res) {
    // cadastra
    const { idCliente, formPag, data, valorTotal, status } = req.body;

    conn.query(
      "INSERT INTO venda (idCliente, formPag, data, valorTotal, status) values (?,?,?,?)",
      [idCliente, formPag, data, valorTotal, status],
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

  app.put("/editarvenda", verifyJWT, function (req, res) {
    //update
    const { idCliente, formPag, data, valorTotal, idVenda, status } = req.body;

    conn.query(
      "UPDATE venda set idCliente = ?, formPag = ?, data = ?, valorTotal = ? status = ? where idVenda = ?",
      [idCliente, formPag, data, valorTotal, idVenda, status],
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

  app.delete("/deletevenda", verifyJWT, function (req, res) {
    // deleta registro
    const { idVenda } = req.body;

    conn.query(
      "DELETE FROM venda WHERE idVenda = ? ",
      [idVenda],
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
