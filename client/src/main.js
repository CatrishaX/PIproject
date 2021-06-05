import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
//import Vuex from "vuex";

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/src/jquery.js";
import "bootstrap/dist/js/bootstrap.min.js";

//import authModule from "@/store/AuthModule.js";
//import awsAuth from "@/Scripts/Buisness/AwsAuth.js";

//import usersModule from "@/store/UserProfileModule.js";
//import userService from "@/Scripts/Buisness/AwsUser.js";
//import userMapper from "@/Scripts/Mappers/UserProfileMapper.js";

createApp(App)
  //.use(store)
  .use(router)
  .mount("#app");
/*
let build = async () => {
  let auth = await authModule(awsAuth);
  let users = usersModule(userService(userMapper));

  const store = new Vuex.Store({
    modules: {
      auth: auth,
      users: users,
    },
  });

  createApp(App)
    .use(store)
    .use(router)
    .mount("#app");
};

build();*/
