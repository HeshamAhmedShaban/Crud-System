<template>
  <form @click.prevent>
    <div class="row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <h1>Login</h1>
        <input
          type="email"
          class="form-control"
          placeholder="Enter Your Email"
          v-model="state.email"
        />
        <span class="error-feedback text-danger" v-if="v$.email.$error">{{
          v$.email.$errors[0].$message
        }}</span>
      </div>
    </div>
    <br />
    <div class="row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <input
          type="password"
          class="form-control"
          placeholder="Enter Your password"
          v-model="state.password"
        />
        <span class="error-feedback text-danger" v-if="v$.password.$error">{{
          v$.password.$errors[0].$message
        }}</span>
      </div>
    </div>
    <br />
    <div class="row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <button type="submit" class="btn btn-primary" @click="signIn()">
          Login
        </button>
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
    <br />
    <div class="row g-3 align-items-center">
      <div class="col-auto d-block mx-auto text-danger error-feedback">
        {{ errorMessage }}
      </div>
    </div>
  </form>
</template>
<script>
import axios from "axios";
import { mapActions } from "vuex";
import useValidate from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";
export default {
  name: "LoginForm",

  // Composition API
  setup() {
    // Define reactive state for form inputs
    const state = reactive({
      email: "",
      password: "",
    });
    // Define reactive state for validation rules
    const rules = computed(() => {
      return {
        email: { required, email },
        password: {
          required,
          minLength: minLength(8),
          maxLength: maxLength(30),
        },
      };
    });
    const v$ = useValidate(rules, state);
    return { state, v$ };
  },
  data() {
    return {
      errorMessage: "",
    };
  },
  mounted() {
    // let email = localStorage.getItem("user Email");
    // if (email) {
    //   this.redirectTo({ value: "home" });
    // }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    // goToSignUpPage() {
    //   this.$router.push("/sign-up");
    // },
    async signIn() {
      this.v$.$validate();
      if (this.v$.email.$invalid || this.v$.password.$invalid) {
        console.log("Form validation failed");
        console.log(this.v$, " this.v$");
        console.log(this.state, "state");
      } else {
        console.log("Form validation successful");
        // let result = await axios.get(`http://localhost:3000/users`);
        // console.log(result.data, "result");
        // console.log(this.state.email, this.state.password);
        // let user = result.data.find((user) => {
        //   return (
        //     user.email === this.state.email &&
        //     user.password === this.state.password
        //   );
        // });
        // console.log(user, "user");
        let result = await axios.get(
          `http://localhost:3000/users?email=${this.state.email}&password=${this.state.password}`
        );
        if (result.data.length > 0) {
          alert("Login successful");
          console.log(result.data);

          localStorage.setItem("userData", JSON.stringify(result.data[0]));
          this.errorMessage = "Login successful";
          this.redirectTo({ value: "home" });
        } else {
          this.errorMessage = "Invalid credentials";
          alert("Invalid credentials");
        }
      }
    },
  },
};
</script>
