<template>
  <div class="container">
    <NavBar />
    <p class="text-end">
      Welcome {{ userName }}
      <router-link :to="{ name: 'UserProfile' }">
        <button class="btn btn-info" type="button">Profile</button>
      </router-link>
    </p>
    <AddLocation />
  </div>
</template>
<script>
import NavBar from "@/components/Header/Navbar.vue";
import AddLocation from "@/components/Locations/Location.vue";
import { mapActions } from "vuex";
export default {
  name: "HomeView",
  components: { NavBar, AddLocation },
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
