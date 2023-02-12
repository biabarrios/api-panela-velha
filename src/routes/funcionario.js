module.exports = function (conn, app, verifyJWT) {
  app.get("/consultarfuncionario", verifyJWT, function (req, res) {
    //consulta
    conn.query("SELECT * FROM funcionario", function (err, results, fields) {
      res.status(200).json(results);
    });
    conn.end(function (err) {
      if (err) throw err;
      else console.log("Closing connection");
    });
  });

  app.post("/cadastrarfuncionario", verifyJWT, function (req, res) {
    // cadastra
    const { nome } = req.body;

    conn.query(
      "INSERT INTO funcionario (nomeFuncionario) values (?)",
      [nome],
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

  app.put("/editarfuncionario", verifyJWT, function (req, res) {
    //update
    const { idFuncionario, nome } = req.body;

    conn.query(
      "UPDATE funcionario set nomeFuncionario = ? = ? where idFuncionario = ?",
      [nome, idFuncionario],
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

  app.delete("/deletefuncionario", verifyJWT, function (req, res) {
    // deleta registro
    const { idFuncionario } = req.body;

    conn.query(
      "DELETE FROM funcionario WHERE idFuncionario = ? ",
      [idFuncionario],
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
