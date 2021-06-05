<template>
  <div class="m-0 h-100">
    <h1>Orders</h1>
    <div class="overflow-auto border">
      <table class="table table-borderless table-hover">
        <thead class="thead-light">
          <tr>
            <th>Клиент</th>
            <th>Операция</th>
            <th>Дата начала</th>
            <th>Комментарий</th>
            <th><button  class="btn btn-light btn-lg" @click="updateData">Обновить</button></th>
          </tr>
        </thead>
        <template v-if="loading">
          Items are loading...
        </template>
        <template v-else>
        <tbody>
          <Order v-for="item in orders" :key="item.id" v-bind:orderOrigin="item" v-bind:clients="clients" v-bind:operations="operations" @remove = "(el) => removeFormElement(el)"/>
          <tr>
            <td>
              <select v-model="toAdd.ClientId">
                <option v-for="item in clients" :key="item.id" :value="item.id">
                  {{item.lastName}}
                </option>
              </select>
            </td>
            <td>
              <select v-model="toAdd.OperationId">
                <option v-for="item in operations" :key="item.id" :value="item.id">
                  {{item.name}}
                </option>
              </select>
            </td>
            <td><input type=text placeholder="YYYY-MM-DD" v-model="toAdd.dateToStart"></td>
            <td><input type=text v-model="toAdd.comment"></td>
            <td><button class="btn btn-light btn-lg" @click="addData">Добавить</button></td>
          </tr>
        </tbody>
        </template>
      </table>
    </div>
  </div>
</template>

<script>
import Order from "@/components/Order.vue";
import ApiRouter from "@/Credentials/apiroutes.js";
import $ from "jquery/src/jquery.js";

export default {
  name: 'Operations',
  components: {
    Order
  },
  data() { 
    return {
      loading: true,
      orders: [],
      clients: [],
      operations: [],
      toAdd: {
        dateToStart: "",
        ClientId: 1, 
        OperationId: 1,
        comment: ""
      },
    }
  },
  methods: {
    async updateData() {
      this.loading = true;
      this.orders = [];
      this.clients = [];
      this.operations = [];
      this.orders = await $.ajax({
        url: ApiRouter.order.get,
          method: "GET",
        });
      this.operations = await $.ajax({
      url: ApiRouter.operation.get,
        method: "GET",
      });
      this.clients = await $.ajax({
      url: ApiRouter.client.get,
        method: "GET",
      });
      this.loading = false;


    },
    removeFormElement(component){
      const index = this.orders.indexOf(component);
      if (index > -1) {
        this.orders.splice(index, 1);
      }
    },
    addData() {
      $.ajax({
        url: ApiRouter.order.add,
        method: "POST",
        data: this.toAdd
      })
      .then((response) => {
        this.orders.push(response.result);
      }).catch((err) => {
        console.log(err)
      });
    },
  },
  beforeMount() {
    this.updateData();
  },
}
</script>