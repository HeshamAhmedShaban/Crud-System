<template>
  <div class="container">
    <NavBar />
    <form @click.prevent>
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <h1>Update Your Profile</h1>
        </div>
        <div class="row g-3 align-items-center">
          <div class="col-auto d-block mx-auto">
            <input
              type="text"
              class="form-control"
              placeholder="Enter Your Name"
              v-model="name"
            />
          </div>
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <input
            type="email"
            class="form-control"
            placeholder="Enter Your Email"
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
            @click="updateUserData()"
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
export default {
  name: "UpdateProfile",
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
    patchDataToTheForm() {
      let user = localStorage.getItem("userData");
      if (user) {
        this.name = JSON.parse(user).name;
        this.email = JSON.parse(user).email;
        this.password = JSON.parse(user).password;
      }
    },
    updateUserData() {},
  },
};
</script>
