module.exports = function (conn, app, verifyJWT) {
  app.get("/consultarproduto", verifyJWT, function (req, res) {
    //consulta
    conn.query("SELECT * FROM produto", function (err, results, fields) {
      res.status(200).json(results);
      if (err) throw err;
    });
    // .end(console.log("Closing connection"));
  });

  app.post("/cadastrarproduto", verifyJWT, function (req, res) {
    // cadastra
    const { nome, preco } = req.body;

    conn.query(
      "INSERT INTO produto (nomeProduto, precoProduto) values (?,?)",
      [nome, preco],
      function (error, results) {
        if (error) throw error;
        res.status(200).json(results);
      }
    );
    // conn.end(console.log("Closing connection"));
  });

  app.put("/editarproduto", verifyJWT, function (req, res) {
    //update
    const { idProduto, nome, preco } = req.body;

    conn.query(
      "UPDATE produto set nomeProduto = ?, precoProduto = ? where idProduto = ?",
      [nome, preco, idProduto],
      function (error, results) {
        if (error) throw error;
        res.status(200).json(results);
      }
    );

    // conn.end(console.log("Closing connection"));
  });

  app.delete("/deleteproduto/:idProduto", verifyJWT, function (req, res) {
    // deleta registro
    const { idProduto } = req.params;

    conn.query(
      "DELETE FROM produto WHERE idProduto = ? ",
      [idProduto],
      function (error, results) {
        if (error) throw error;
        res.status(200).json(results);
      }
    );
    // conn.end(console.log("Closing connection"));
  });
};
