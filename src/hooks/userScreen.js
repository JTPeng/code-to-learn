import { ref, onMounted, nextTick } from "vue";

export default function useScreen(id) {
  const width = ref(0);
  const height = ref(0);
  let dom;
  // 获取 dom要在 onMounted，直接放在 setup里不行，打印是 null，因为 setup在 onMounted之前执行
  onMounted(() => {
    dom = document.getElementById(id);
    width.value = dom.clientWidth;
    height.value = dom.clientHeight;
    console.log(width.value, height.value);
  });

  return {
    width,
    height,
  };
}
