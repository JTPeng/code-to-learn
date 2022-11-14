<template>
  <nav v-if="!isShowNav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/test">Test</router-link> |
    <router-link to="/svgAnimation">SvgAnimation</router-link> |
    <router-link to="/screenLoading">ScreenLoading</router-link> |
    <router-link to="/flexBox">FlexBox</router-link> |
    <router-link to="/container">Container</router-link> |
  </nav>
  <router-view />
</template>

<script>
import { watch, ref } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    console.info("router", route);
    const isShowNav = ref(true);
    watch(
      () => route.path,
      (newValue, oldValue) => {
        // active.value = newValue;
        console.info(newValue, ["/container", "/screen"].includes(newValue));
        isShowNav.value = ["/container", "/screen"].includes(newValue);
      },
      { immediate: true }
    );
    return {
      isShowNav,
    };
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
  font-family: "Microsoft Yahei", Arial, sans-serif;
  overflow: hidden;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
