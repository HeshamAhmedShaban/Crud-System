<template>
  <div class="container">
    <NavBar />
    <p class="text-end">Welcome {{ userName }}</p>
  </div>
</template>
<script>
import NavBar from "@/components/Header/Navbar.vue";
import { mapActions } from "vuex";
export default {
  name: "HomeView",
  components: { NavBar },
  data() {
    return {
      userName: "",
    };
  },
  mounted() {
    this.getUserData();
  },
  methods: {
    ...mapActions(["redirectTo"]),
    getUserData() {
      let userData = localStorage.getItem("userData");
      if (!userData) {
        this.redirectTo({ value: "SignUp" });
      } else {
        this.userName = JSON.parse(userData).name;
      }
    },
  },
};
</script>
