<template>
  <tr>
    <template v-if="editing == false">
      <td>{{operation.name}}</td>
      <td>{{operation.comment}}</td>
      <td>{{operation.price}}</td>
      <td><button class="btn btn-light btn-lg" @click="edit">Edit</button></td>
      <td><button class="btn btn-light btn-lg" @click="remove">Delete</button></td>
    </template>
    <template v-else>
      <td><input type=text v-model="editable.name"></td>
      <td><input type=text v-model="editable.comment"></td>
      <td><input type=text v-model="editable.price"></td>
      <td><button class="btn btn-light btn-lg" @click="editCommit">Commit</button></td>
      <td><button class="btn btn-light btn-lg" @click="editCancel">Cancel</button></td>
    </template>
  </tr>
</template>

<script>
import ApiRouter from "@/Credentials/apiroutes.js";
import $ from "jquery/src/jquery.js";

export default {
  name: 'Operation',
  data() {
    return {
      editing: false,
      operation: {},
      editable: {}
    }
  },
  props: {
    operationOrigin: Object
  },
  methods: {
    edit() {
      this.editable = {
        id: this.operation.id,
        name: this.operation.name,
        comment: this.operation.comment,
        price: this.operation.price,
      }
      this.editing = true;
    },
    editCommit() {
      $.ajax({
        url: ApiRouter.operation.modify,
        method: "POST",
        data: this.editable
      })
      .then(() => {
        this.operation.name = this.editable.name;
        this.operation.comment = this.editable.comment;
        this.operation.price = this.editable.price;

        this.editing = false;
      })
      .catch(err => console.log(err))
    },
    editCancel() {
      this.editable = {};
      this.editing = false;
    },
    remove() {
      $.ajax({
        url: ApiRouter.operation.remove,
        method: "POST",
        data: {id: this.operation.id}
      })
      .then(() => {
        this.$emit('remove', this.operation) 
      }).catch(err => console.log(err))
    }
  },
  beforeMount() {
    this.operation = this.operationOrigin
  }
}
</script>

