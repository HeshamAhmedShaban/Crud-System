<template>
  <form @click.prevent>
    <div class="row g-3 align-items-center">
      <h1>Login</h1>
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
        <button type="submit" class="btn btn-primary">Login</button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button
          class="btn btn-link"
          type="button"
          @click="redirectTo({ value: 'SignUp' })"
        >
          Sign Up
        </button>
      </div>
    </div>
  </form>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["redirectTo"]),
    // goToSignUpPage() {
    //   this.$router.push("/sign-up");
    // },
  },
};
</script>
