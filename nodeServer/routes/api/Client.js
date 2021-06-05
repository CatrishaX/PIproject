const client = require("../../database/Models/Client.js");

module.exports = (router) => {
  router.post("/add", Add);
  router.post("/modify", Modify);
  router.post("/delete", Delete);
  router.get("/", Query);

  return router;
};

function Add(req, res) {
  try {
    let { firstName, lastName, phone } = req.body;
    if (!firstName || !lastName || !phone) {
      throw new Error("");
    }
  } catch {
    res.status(400).json({
      message: "Заполнены не все поля",
      request: req.body,
    });
    return;
  }
  client.Client.create(req.body, {
    fields: ["firstName", "lastName", "phone"],
  })
    .then((result) => {
      res.status(200).json({
        message: "Успех",
        result: result,
        request: req.body,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Не смог добавить запись",
        requst: req.body,
        error: err,
      });
    });
}

function Modify(req, res) {
  try {
    let { id } = req.body;
    if (!id) {
      throw new Error("");
    }
  } catch {
    res.status(400).json({
      message: "Заполнены не все поля",
      request: req.body,
    });
    return;
  }

  client.Client.update(req.body, {
    where: {
      id: req.body.id,
    },
    fields: ["firstName", "lastName", "phone"],
  })
    .then((result) => {
      res.status(200).json({
        message: "Успех",
        result: result,
        request: req.body,
      });
    })
    .catch(() => {
      res.status(400).json({
        message: "Запись не найдена",
        requst: req.body,
      });
    });
}

function Delete(req, res) {
  try {
    let { id } = req.body;
    console.log(id);
    if (!id) {
      throw new Error("");
    }
  } catch {
    res.status(400).json({
      message: "Заполнены не все поля",
      request: req.body,
    });
    return;
  }

  client.Client.destroy({
    where: {
      id: req.body.id,
    },
  }).then((result, err) => {
    if (err) {
      res.status(400).json({
        message: "Запись не найдена",
        requst: req.body,
        error: err,
      });
      return;
    }
    res.status(200).json({
      message: "Успех",
      result: result,
      request: req.body,
    });
  });
}

function Query(req, res) {
  client.Client.findAll({
    attributes: ["id", "firstName", "lastName", "phone"],
  }).then((result) => {
    res.status(200).send(result);
  });
}
