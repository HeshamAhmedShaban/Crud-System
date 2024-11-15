<template>
  <NavBar />
  <div class="home">
    <h1>Home</h1>
  </div>
</template>
<script>
import NavBar from "@/components/Header/Navbar.vue";
import { mapActions } from "vuex";
export default {
  name: "HomeView",
  components: { NavBar },
  data() {},
  mounted() {
    let email = localStorage.getItem("userEmail");
    if (!email) {
      this.redirectTo({ value: "SignUp" });
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
  },
};
</script>
