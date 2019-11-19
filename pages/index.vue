<template>
  <div class="container">
    <Sidebar />
    <div class="main-container">
      <Navbar />
      <div class="data-container">
        <Post />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "~/components/Navbar.vue";
import Sidebar from "~/components/Sidebar.vue";
import Post from "~/components/Post.vue";

export default {
  components: {
    Navbar,
    Sidebar,
    Post
  },
  async mounted() {
    if (this.$route.query.code) {
      try {
        const formData = new FormData();
        formData.append("code", this.$route.query.code);
        formData.append("redirect_uri", process.env.REDIRECT_URI);
        formData.append("grant_type", "authorization_code");
        const res = await this.$store.dispatch(
          "auth/GET_ACCESS_TOKEN",
          formData
        );
        console.log(res.data);
      } catch (ex) {}
    }
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  background-color: #f8f8f8;
  font-family: Poppins;
  font-size: 14px;
}
.main-container {
  margin-left: 250px;
  padding: 20px 50px;
}
.data-container {
  height: 900px;
  margin-top: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  padding: 20px 30px;
}
</style>
