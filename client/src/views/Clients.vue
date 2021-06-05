<template>
  <div class="m-0 h-100">
    <h1>Clients</h1>
    <div class="overflow-auto border">
      <table class="table table-borderless table-hover">
        <thead class="thead-light">
          <tr>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Номер телефона</th>
            <th><button  class="btn btn-light btn-lg" @click="updateData">Обновить</button></th>
          </tr>
        </thead>
        <template v-if="loading">
          Items are loading...
        </template>
        <template v-else>
        <tbody>
          <Client v-for="item in clients" :key="item.id" v-bind:clientOrigin="item" @remove = "(el) => removeFormElement(el)"/>
            <tr>
              <td><input type=text v-model="toAdd.firstName"></td>
              <td><input type=text v-model="toAdd.lastName"></td>
              <td><input type=text v-model="toAdd.phone"></td>
              <td><button  class="btn btn-light btn-lg" @click="addData">Добавить</button></td>
            </tr>
        </tbody>
        </template>
      </table>
    </div>
  </div>
</template>

<script>
import Client from "@/components/Client.vue";
import ApiRouter from "@/Credentials/apiroutes.js";
import $ from "jquery/src/jquery.js";

export default {
  name: 'Clients',
  components: {
    Client
  },
  data() { 
    return {
      loading: true,
      clients: [],
      toAdd: {
        firstName: "",
        lastName: "",
        phone: "",
      }
    }
  },
  methods: {
    updateData() {
      this.loading = true;
      this.clients = [];
      $.ajax({
        url: ApiRouter.client.get,
        method: "GET",
      })
      .then((response) => {
        this.clients = response;
        this.loading = false;
      }).catch((err) => {
        console.log(err)
        this.loading = false;
      });
    },
    removeFormElement(component){
      const index = this.clients.indexOf(component);
      if (index > -1) {
        this.clients.splice(index, 1);
      }
    },
    addData() {
      $.ajax({
        url: ApiRouter.client.add,
        method: "POST",
        data: this.toAdd
      })
      .then((response) => {
        this.clients.push(response.result);
      }).catch((err) => {
        console.log(err)
      });
    },
  },
  beforeMount() {
    this.updateData();
  }
}
</script>