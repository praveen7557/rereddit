<template>
  <div class="container">
    <Sidebar />
    <div class="main-container">
      <Navbar />
      <div class="data-parent">
        <div class="data-container">
          <nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "~/components/Navbar.vue";
import Sidebar from "~/components/Sidebar.vue";

export default {
  components: {
    Navbar,
    Sidebar
  }
};
</script>

<style>
html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  background-color: #f8f8f8;
  font-family: Poppins;
  font-size: 14px;
}
.main-container {
  margin-left: 250px;
  /* padding: 0px 50px; */
  padding-bottom: 20px;
}
.data-parent {
  padding: 0 50px;
}
.data-container {
  margin-top: 0px;
  border-radius: 5px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  padding: 20px 30px;
}
</style>
