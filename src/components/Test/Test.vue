<template>
  <div class="test">{{ message }}</div>
  <slot name="header"></slot>
  <div>double: {{ doubleCount }}</div>
  <slot name="center1">
    <p class="center1">center1</p>
  </slot>
  <slot name="center2">
    <p class="center2">center2</p>
  </slot>
  <h1>count:{{ count }}</h1>
  <slot name="footer"></slot>
  <button @click="clickBtn">clickBtn</button>
</template>

<script>
import { computed, ref } from "vue";
export default {
  name: "TestComponent",
  setup() {
    const message = "hello rollup new";
    const count = ref(1);
    const doubleCount = computed(() => count.value * 2);
    const clickBtn = () => {
      count.value++;
    };
    return {
      message,
      doubleCount,
      clickBtn,
      count,
    };
  },
};
</script>

<style lang="scss" scoped>
.test {
  color: red;
}
.center1 {
  color: red;
}
.center2 {
  color: blue;
}
</style>
