<template>
  <div>
    <Post v-for="(post,idx) in posts" :idx="idx" :key="idx" :post="post" />
  </div>
</template>

<script>
import Post from "~/components/Post.vue";

export default {
  layout: "home",
  props: {
    posts: {
      type: Array
    }
  },
  components: {
    Post
  }
};
</script>

<style>
</style>
