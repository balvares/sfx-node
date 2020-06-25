const uuidv4 = require('uuid/v4');
// const crypto = require("crypto");

module.exports = app => {
  const usersDB = app.data.users;
  const controller = {};

  const {
    users: usersMock,
  } = usersDB;

  function randomSalt() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 20; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

  controller.listUsers = (req, res) => res.status(200).json(usersDB);

  controller.saveUser = (req, res) => {
    usersMock.push({
      id: uuidv4(),
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      username: req.body.username,
      senha: req.body.senha,
      salt: randomSalt(),
      datacriacao: Date.parse(req.body.datacriacao).toString()
    });

    res.status(201).json(usersMock);
  }

  controller.updateUser = (req, res) => {
    const {
      userId,
    } = req.params;

    const foundUserIndex = usersMock.data.findIndex(user => userId === userId);

    if (foundUserIndex === -1) {
      res.status(404).json({
        message: 'Usuário não encontrado.',
        success: false,
        users: usersMock
      });
    } else {
      const newUser = {
        id: userId,
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        senha: req.body.senha,
        salt: req.body.salt,
        datacriacao: req.body.datacriacao
      };

      usersMock.data.splice(foundUserIndex, 1, newUser);

      res.status(200).json({
        message: 'Usuário atualizado com sucesso!',
        success: true,
        users: usersMock
      });
    }
  }

  return controller;
}
