const order = require("../../database/Models/Order.js");
const client = require("../../database/Models/Client.js");
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
    let { dateToStart, ClientId, OperationId, comment } = req.body;
    if (!dateToStart || !ClientId || !OperationId || !comment) {
      throw new Error("");
    }
  } catch {
    res.status(400).json({
      message: "Заполнены не все поля",
      request: req.body,
    });
  }

  order.Order.create(req.body, {
    fields: ["OperationId", "ClientId", "comment", "dateToStart"],
  })
    .then((result) => {
      order.Order.findAll({
        attributes: ["id", "comment", "dateToStart"],
        include: [
          {
            model: client.Client,
            where: { id: result.ClientId },
            attributes: ["id", "lastName"],
          },
          {
            model: operation.Operation,
            where: { id: result.OperationId },
            attributes: ["id", "name"],
          },
        ],
      }).then((result) => {
        res.status(200).json({
          message: "Успех",
          result: result[0],
          request: req.body,
        });
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Не смог добавить запись",
        request: req.body,
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
  }

  let id = req.body.id;

  order.Order.update(req.body, {
    where: {
      id: id,
    },
    fields: ["dateToStart", "ClientId", "OperationId", "comment"],
  })
    .then(() => {
      order.Order.findAll({
        attributes: ["id", "comment", "dateToStart"],
        where: {
          id: id,
        },
        include: [
          {
            model: client.Client,
            attributes: ["id", "lastName"],
          },
          {
            model: operation.Operation,
            attributes: ["id", "name"],
          },
        ],
      }).then((result) => {
        res.status(200).json({
          message: "Успех",
          result: result[0],
          request: req.body,
        });
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Запись не найдена",
        request: req.body,
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
  }

  order.Order.destroy({
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
  order.Order.findAll({
    attributes: ["id", "comment", "dateToStart"],
    include: [
      {
        model: client.Client,
        attributes: ["id", "lastName"],
      },
      {
        model: operation.Operation,
        attributes: ["id", "name"],
      },
    ],
  }).then((result) => {
    res.status(200).send(result);
  });
}
