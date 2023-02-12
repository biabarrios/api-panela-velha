module.exports = function (conn, app, jwt) {
  app.post("/login", (req, res, next) => {
    if (req.body.user === "Bianca" && req.body.password === "123") {
      const id = 1;
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 300,
      });
      return res.json({ auth: true, token: token });
    }
    return res.status(500).json({ message: "Login invalido!" });
  });
};
