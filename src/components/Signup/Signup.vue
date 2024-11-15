<template>
  <form @click.prevent>
    <div class="row g-3 align-items-center">
      <h1>Sign Up</h1>
      <div class="col-auto d-block mx-auto">
        <input
          type="text"
          class="form-control"
          placeholder="Enter Your Name"
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
        <button type="submit" class="btn btn-primary">Sign Up</button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button
          class="btn btn-link"
          type="button"
          @click="redirectTo({ value: 'LoginPage' })"
        >
          Login
        </button>
      </div>
    </div>
  </form>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "SignUpForm",
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["redirectTo"]),
    // goToSignUpPage() {
    //   this.$router.push("/login");
    // },
  },
};
</script>
