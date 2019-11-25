import Vue from "vue";

Vue.directive('infinite-scroll', {
  bind(el, binding) {
    window.onscroll = () => {
      const bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;
      if (bottomOfWindow) {
        const disabled = el.getAttribute("infinite-disabled");
        if (!disabled) {
          binding.value();
        }
      }
    };
  }
})