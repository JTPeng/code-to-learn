<template>
  <div class="test">
    <TestComponent>
      <template v-slot:header>
        <ul>
          <li v-for="item in 10" :key="item">
            {{ item }}
          </li>
        </ul>
      </template>
      <template #[oneOrTwo]>
        <h1>{{ oneOrTwo }}</h1>
      </template>
      <template v-slot:footer> 123 </template>
    </TestComponent>
    <div class="svg-test">
      <Test1></Test1>
      <svg width="30" height="30" style="color: aquamarine">
        <use href="#more"></use>
      </svg>
      <Icon
        name="filledArrowRight"
        :prefix="''"
        :style="{ width: '30px', height: '30px', color: 'green' }"
      ></Icon>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const oneOrTwo = ref("center1");
    setTimeout(() => {
      oneOrTwo.value = "center2";
    }, 2000);
    return {
      oneOrTwo,
    };
  },
};
</script>
<style scoped>
.svg-test {
  /* width: 20px;
    height: 20px; */
  color: red;
}
</style>
