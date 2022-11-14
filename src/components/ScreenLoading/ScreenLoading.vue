<template>
  <div class="screen-loading">
    <!-- preserveAspectRatio="xMidYMid meet 居中-->
    <svg
      :width="width"
      :height="height"
      viewBox="0 0 50 50"
      preserveAspectRatio="xMinYMid meet"
    >
      <!-- stroke-dasharry=2pir/4=2*3.1415926*22/4=34 -->
      <!-- animateTransform的from，to可以用value代替 -->
      <circle
        cx="25"
        cy="25"
        r="22"
        fill="none"
        stroke-width="3"
        :stroke="outsideColor"
        stroke-dasharray="34"
        stroke-linecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          :dur="`${duration}s`"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke"
          :values="outsideColorAnimation"
          :dur="`${+duration * 2}s`"
          repeatCount="indefinite"
        ></animate>
      </circle>
      <circle
        cx="25"
        cy="25"
        r="12"
        fill="none"
        stroke-width="3"
        :stroke="insideColor"
        stroke-dasharray="19"
        stroke-linecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="360 25 25;0 25 25"
          :dur="`${duration}s`"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke"
          :values="insideColorAnimation"
          :dur="`${+duration * 2}s`"
          repeatCount="indefinite"
        ></animate>
      </circle>
    </svg>
    <div class="screen-loading-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  name: "ScreenLoading",
  props: {
    width: {
      type: [Number, String],
      default: 50,
    },
    height: {
      type: [Number, String],
      default: 50,
    },
    outsideColor: {
      type: String,
      default: "#3be6cd",
    },
    insideColor: {
      type: String,
      default: "#02bcfe",
    },
    duration: {
      type: [Number, String],
      default: 2,
    },
  },
  setup(ctx) {
    const outsideColorAnimation = computed(
      () => `${ctx.outsideColor};${ctx.insideColor};${ctx.outsideColor};`
    );
    const insideColorAnimation = computed(
      () => `${ctx.insideColor};${ctx.outsideColor};${ctx.insideColor};`
    );
    return {
      outsideColorAnimation,
      insideColorAnimation,
    };
  },
};
</script>

<style lang="scss" scoped="">
.screen-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
