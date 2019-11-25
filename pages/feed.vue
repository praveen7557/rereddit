<template>
  <div>
    <Listing />
  </div>
</template>

<script>
import Listing from "~/components/Listing.vue";

export default {
  layout: "home",
  components: {
    Listing
  },
  async fetch({ store, route }) {
    console.log("In Feed");
    await store.dispatch("GET_POSTS", route.params.type);
  }
};
</script>
