<template>
  <div class="container">
    <NavBar />
    <form @click.prevent>
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <h1>Profile</h1>
          <input
            type="text"
            class="form-control"
            placeholder="Enter Your Name"
            disabled
            v-model="name"
          />
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <input
            type="email"
            class="form-control"
            placeholder="Enter Your Email"
            disabled
            v-model="email"
          />
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <input
            type="password"
            class="form-control"
            placeholder="Enter Your password"
            disabled
            v-model="password"
          />
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <button
            type="submit"
            class="btn btn-primary"
            @click="updateProfile()"
          >
            Update Your Profile
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import NavBar from "../Header/Navbar.vue";
import { mapActions } from "vuex";
export default {
  name: "ProfilePage",
  components: { NavBar },
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  mounted() {
    this.patchDataToTheForm();
  },
  methods: {
    ...mapActions(["redirectTo"]),
    patchDataToTheForm() {
      let user = localStorage.getItem("userData");
      if (user) {
        this.name = JSON.parse(user).name;
        this.email = JSON.parse(user).email;
        this.password = JSON.parse(user).password;
      } else {
        this.$router.push("/");
      }
    },
    updateProfile() {
      this.redirectTo({ value: "UpdateProfile" });
    },
  },
};
</script>
