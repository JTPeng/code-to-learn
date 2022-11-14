<template>
  <div id="data-container" :ref="refName">
    <template v-if="ready">
      <slot></slot>
    </template>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted, onUnmounted, nextTick } from "vue";
import { debounce } from "../../utils";
export default {
  name: "DataContainer",
  props: {
    options: Object,
  },
  setup(ctx) {
    const refName = "dataContainer";
    const width = ref(0);
    const height = ref(0);
    const originalWidth = ref(0);
    const originalHeight = ref(0);
    const ready = ref(false);
    let context, dom, observer;

    const initSize = () => {
      return new Promise((resolve) => {
        // 确保在渲染更新后再执行
        nextTick(() => {
          dom = context.$refs[refName];
          // 获取大屏的真实尺寸
          if (ctx.options && ctx.options.width && ctx.options.height) {
            width.value = ctx.options.width;
            height.value = ctx.options.height;
          } else {
            width.value = dom.clientWidth;
            height.value = dom.clientHeight;
          }
          // 获取画布尺寸
          if (!originalWidth.value || !originalHeight.value) {
            originalWidth.value = window.screen.width;
            originalHeight.value = window.screen.height;
          }
          console.log(width.value, height.value, originalWidth.value, originalHeight.value)
          resolve();
        });
      });
    };

    const updateSize = () => {
      if (width.value && height.value) {
        dom.style.width = `${width.value}px`;
        dom.style.height = `${height.value}px`;
      } else {
        dom.style.width = `${originalWidth.value}px`;
        dom.style.height = `${originalHeight.value}px`;
      }
    };

    const updateScale = () => {
      // 获取真实的视口尺寸
      const currentWidth = document.body.clientWidth;
      const currentHeight = document.body.clientHeight;
      // 获取大屏最终的宽高
      const realWidth = width.value || originalWidth.value;
      const realHeight = height.value || originalHeight.value;
      // console.log(currentWidth, currentHeight)
      const widthScale = currentWidth / realWidth;
      const heightScale = currentHeight / realHeight;
      dom && (dom.style.transform = `scale(${widthScale},${heightScale})`);
    };

    const onResize = async (e) => {
      // console.log('onResize', e)
      await initSize();
      updateScale();
    };

    const initMutationObserver = () => {
      const MutationObserver =
        window.MutationObserver ||
        window.WebKitMutationObserver ||
        window.MozMutationObserver;
      observer = new MutationObserver(onResize);
      observer.observe(dom, {
        // 监听的规则
        attributes: true,
        attributeFilter: ["style"],
        attributeOldValue: true,
      });
    };

    const removeMutationObserver = () => {
      if (observer) {
        observer.disconnect();
        observer.takeRecords();
        observer = null;
      }
    };

    onMounted(async () => {
      ready.value = false;
      context = getCurrentInstance().ctx;
      await initSize();
      updateSize();
      updateScale();
      window.addEventListener("resize", debounce(100, onResize));
      initMutationObserver();
      ready.value = true;
    });
    // window.addEventListener('resize', onResize) 不延迟

    //有监听事件记得释放，如果忘记应该释放哪一个，可以使用下面语句查看
    // console.log(require('vue'))
    onUnmounted(() => {
      window.removeEventListener("resize", onResize);
      removeMutationObserver();
    });
    return {
      refName,
      ready,
    };
  },
};
</script>

<style lang="scss" scope>
#data-container {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  transform-origin: left top;
  z-index: 999;
}
</style>
