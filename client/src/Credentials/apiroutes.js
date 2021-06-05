const site = "http://localhost:2500/";

const api = site + "api/";

const client = api + "client/";
const operation = api + "operation/";
const order = api + "order/";

const add = "add/";
const modify = "modify/";
const remove = "delete/";

const routes = {
  client: {
    get: client,
    add: client + add,
    modify: client + modify,
    remove: client + remove,
  },
  operation: {
    get: operation,
    add: operation + add,
    modify: operation + modify,
    remove: operation + remove,
  },
  order: {
    get: order,
    add: order + add,
    modify: order + modify,
    remove: order + remove,
  },
};

export default routes;
