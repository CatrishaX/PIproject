<template>
  <div class="m-0 h-100">
    <h1>Operations</h1>
    <div class="overflow-auto border">
      <table class="table table-borderless table-hover">
        <thead class="thead-light">
          <tr>
            <th>Операция</th>
            <th>Комментарий</th>
            <th>Цена</th>
            <th><button  class="btn btn-light btn-lg" @click="updateData">Обновить</button></th>
          </tr>
        </thead>
        <template v-if="loading">
          Items are loading...
        </template>
        <template v-else>
        <tbody>
          <Operation v-for="item in operations" :key="item.id" v-bind:operationOrigin="item" @remove = "(el) => removeFormElement(el)"/>
          <tr>
            <td><input type=text v-model="toAdd.name"></td>
            <td><input type=text v-model="toAdd.comment"></td>
            <td><input type=text v-model="toAdd.price"></td>
            <td><button  class="btn btn-light btn-lg" @click="addData">Добавить</button></td>
          </tr>
        </tbody>
        </template>
      </table>
    </div>
  </div>
</template>

<script>
import Operation from "@/components/Operation.vue";
import ApiRouter from "@/Credentials/apiroutes.js";
import $ from "jquery/src/jquery.js";

export default {
  name: 'Operations',
  components: {
    Operation
  },
  data() { 
    return {
      loading: true,
      operations: [],
      toAdd: {
        name: "",
        comment: "",
        price: ""
      }
    }
  },
  methods: {
    updateData() {
      this.operations = [];
        $.ajax({
        url: ApiRouter.operation.get,
        method: "GET",
      }).then((response) => {
          this.operations = response;
          this.loading = false;
        }).catch(() => {
          this.loading = false;
        });
    },
    removeFormElement(component){
      const index = this.operations.indexOf(component);
      if (index > -1) {
        this.operations.splice(index, 1);
      }
    },
    addData() {
      $.ajax({
      url: ApiRouter.operation.add,
        method: "POST",
        data: this.toAdd
      })
      .then((response) => {
        this.operations.push(response.result);
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