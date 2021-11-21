<template>
  <navbar
    :position="position"
    type="primary"
    :transparent="transparent"
    :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto"
  >
    <template>
      <router-link class="navbar-brand" to="/"> HappyHouse </router-link>
    </template>
    <template slot="navbar-menu">
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'login' }">
          <p>Login</p>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'register' }">
          <p>Register</p>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'house' }">
          <p>House</p>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'question' }">
          <p>Q&A</p>
        </router-link>
      </li>
      <drop-down tag="li" title="more" class="nav-item">
        <nav-link to="/news"> News </nav-link>
        <nav-link to="/dust"> Dust Info </nav-link>
      </drop-down>
    </template>
  </navbar>
</template>

<script>
import { DropDown, Navbar, NavLink } from "@/components";

export default {
  name: "main-navbar",
  props: {
    transparent: Boolean,
    colorOnScroll: Number,
    position: String,
  },
  components: {
    DropDown,
    Navbar,
    NavLink,
  },
};
</script>

<style scoped></style>
