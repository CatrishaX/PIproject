<template>
  <tr>
    <template v-if="editing == false">
      <td>{{client.firstName}}</td>
      <td>{{client.lastName}}</td>
      <td>{{client.phone}}</td>
      <td><button class="btn btn-light btn-lg" @click="edit">Edit</button></td>
      <td><button class="btn btn-light btn-lg" @click="remove">Delete</button></td>
    </template>
    <template v-else>
      <td><input type=text v-model="editable.firstName"></td>
      <td><input type=text v-model="editable.lastName"></td>
      <td><input type=text v-model="editable.phone"></td>
      <td><button class="btn btn-light btn-lg" @click="editCommit">Commit</button></td>
      <td><button class="btn btn-light btn-lg" @click="editCancel">Cancel</button></td>
    </template>
  </tr>
</template>

<script>
import ApiRouter from "@/Credentials/apiroutes.js";
import $ from "jquery/src/jquery.js";

export default {
  name: 'Client',
  data() {
    return {
      editing: false,
      client: {},
      editable: {}
    }
  },
  props: {
    clientOrigin: Object
  },
  methods: {
    edit() {
      this.editable = {
        id: this.client.id,
        firstName: this.client.firstName ,
        lastName: this.client.lastName,
        phone: this.client.phone,
      }
      this.editing = true;
    },
    editCommit() {
      $.ajax({
        url: ApiRouter.client.modify,
        method: "POST",
        data: this.editable
      })
      .then(() => {
        this.client.firstName = this.editable.firstName;
        this.client.lastName = this.editable.lastName;
        this.client.phone = this.editable.phone;

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
        url: ApiRouter.client.remove,
        method: "POST",
        data: {id: this.client.id}
      })
      .then(() => {
        this.$emit('remove', this.client) 
      }).catch(err => console.log(err))
    }
  },
  beforeMount() {
    this.client = this.clientOrigin
  }
}
</script>

