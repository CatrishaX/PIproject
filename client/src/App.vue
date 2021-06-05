<template>
  <nav ref="nav" class="navbar navbar-light bg-light mb-5 ml-0 row w-100">
    <div class="col-1 m-0"></div>
    <div class="navbar-brand col-2 justify-content-center m-0">
      <h1>VueProject</h1>
    </div>
    <ul class="nav justify-content-center col-6 m-0">
      <li class="nav-item">
        <router-link class="nav-link" to="/clients"><button class="btn btn-light btn-lg">Клиенты</button></router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/operations"><button class="btn btn-light btn-lg">Операции</button></router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/orders"><button class="btn btn-light btn-lg">Заказы</button></router-link>
      </li>
    </ul>
    <ul class="nav justify-content-center w-100 col-3 m-0">
    </ul>
  </nav>
  <div ref="navcontainer" class="container ml-auto mr-auto vh-100">
    <div class="border p-3 bg-white" style="height:700px;">
      <router-view v-slot="{ Component }">
        <transition name="component-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script>

export default {
}
</script>

<style scoped>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.16s ease;
}

.component-fade-enter-from,
.component-fade-leave-to {
  opacity: 0;
}
</style>