const operation = require("../../database/Models/Operation.js");

module.exports = (router) => {
  router.post("/add", Add);
  router.post("/modify", Modify);
  router.post("/delete", Delete);
  router.get("/", Query);

  return router;
};

function Add(req, res) {
  try {
    let { name, price, comment } = req.body;
    if (!name || !price || !comment) {
      throw new Error("");
    }
  } catch {
    res.status(400).json({
      message: "Заполнены не все поля",
      request: req.body,
    });
    return;
  }
  operation.Operation.create(req.body, {
    fields: ["name", "price", "comment"],
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

  operation.Operation.update(req.body, {
    where: {
      id: req.body.id,
    },
    fields: ["name", "price"],
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
        message: "Запись не найдена",
        requst: req.body,
        error: err,
      });
    });
}

function Delete(req, res) {
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

  operation.Operation.destroy({
    where: {
      id: req.body.id,
    },
  }).then((result) => {
    res
      .status(200)
      .json({
        message: "Успех",
        result: result,
        request: req.body,
      })
      .catch((err) => {
        res.status(400).json({
          message: "Запись не найдена",
          requst: req.body,
          error: err,
        });
      });
  });
}

function Query(req, res) {
  operation.Operation.findAll({
    attributes: ["id", "name", "price"],
  }).then((result) => {
    res.status(200).send(result);
  });
}
