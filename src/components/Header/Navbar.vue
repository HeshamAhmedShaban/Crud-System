<template>
  <ul id="nav">
    <router-link
      :to="{ name: 'home', params: { pageTitle: 'Home Page' } }"
      exact
    >
      <li>
        <a>Home</a>
      </li>
    </router-link>
    <li>
      <a href="#" @click="logout()">LogOut</a>
    </li>
  </ul>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "NavBar",
  methods: {
    ...mapActions(["redirectTo"]),
    logout() {
      localStorage.removeItem("userData");
      this.redirectTo({ value: "LoginPage" });
    },
  },
};
</script>

<style lang="scss" scoped>
$fontColor: darkcyan;
$navColor: #525a5a;
ul {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  margin-bottom: 50px;
  a {
    color: $fontColor;
    text-decoration: none;
    font-weight: bold;
    padding: 10px;
  }
}
a.router-link-exact-active a,
ul a a:hover {
  color: $navColor;
  box-shadow: 2px 2px 4px 0px $navColor;
}
</style>
