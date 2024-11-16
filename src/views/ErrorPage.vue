<template>
  <div>
    <img
      src="../assets/logo.png"
      class="rounded mx-auto d-block h-400"
      alt="Error Page"
    />
    <h1 class="text-center text-danger text-xxl-center">
      Oops! Page Not Found
    </h1>
    <div class="text-center">
      <router-link :to="{ name: 'home' }">
        <button class="btn btn-info">Home</button>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "ErrorPage",
};
</script>
<style>
.h-400 {
  padding-top: 100px;
  height: 400px;
  width: auto;
  object-fit: cover;
  object-position: center;
}
</style>
