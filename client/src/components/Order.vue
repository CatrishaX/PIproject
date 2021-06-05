<template>
  <tr>
    <template v-if="editing == false">
      <td>{{order.Client.lastName}}</td>
      <td>{{order.Operation.name}}</td>
      <td>{{order.dateToStart}}</td>
      <td>{{order.comment}}</td>
      <td><button class="btn btn-light btn-lg" @click="edit">Edit</button></td>
      <td><button class="btn btn-light btn-lg" @click="remove">Delete</button></td>
    </template>
    <template v-else>
      <td>
        <select v-model="editable.ClientId">
          <option v-for="item in clients" :key="item.id" :value="item.id">
            {{item.lastName}}
          </option>
        </select>
        </td>
      <td>
        <select v-model="editable.OperationId">
          <option v-for="item in operations" :key="item.id" :value="item.id">
            {{item.name}}
          </option>
        </select>
        </td>
      <td><input type=text placeholder="YYYY-MM-DD" v-model="editable.dateToStart"></td>
      <td><input type=text v-model="editable.comment"></td>
      <td><button class="btn btn-light btn-lg" @click="editCommit">Commit</button></td>
      <td><button class="btn btn-light btn-lg" @click="editCancel">Cancel</button></td>
    </template>
  </tr>
</template>

<script>
import ApiRouter from "@/Credentials/apiroutes.js";
import $ from "jquery/src/jquery.js";

export default {
  name: 'Order',
  data() {
    return {
      editing: false,
      order: {},
      editable: {}
    }
  },
  props: {
    orderOrigin: Object,
    operations: Object,
    clients: Object
  },
  methods: {
    edit() {
      this.editable = {
        id: this.order.id,
        ClientId: this.order.Client.id,
        OperationId: this.order.Operation.id,
        dateToStart: this.order.dateToStart,
        comment: this.order.comment,
      }
      this.editing = true;
    },
    editCommit() {
      $.ajax({
        url: ApiRouter.order.modify,
        method: "POST",
        data: this.editable
      })
      .then((response) => {
        this.order = response.result;

        this.editing = false;
      }).catch(err => console.log(err))
    },
    editCancel() {
      this.editing = false;
      this.editable = {};
    },
    remove() {
      $.ajax({
        url: ApiRouter.order.remove,
        method: "POST",
        data: {id: this.order.id}
      })
      .then(() => {
        this.$emit('remove', this.order) 
      }).catch(err => console.log(err))
    }
  },
  beforeMount() {
    this.order = this.orderOrigin
  }
}
</script>

