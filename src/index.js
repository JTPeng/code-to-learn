import Test from "./components/Test/index";
import Test2 from "./components/Test2/index";
import Icon from "./components/Icon/index";
import SvgAnimation from "./components/SvgAnimation/index";
import ScreenLoading from "./components/ScreenLoading/index";
import FlexBox from "./components/FlexBox/index";
import Container from "./components/Container/index";
export default function (Vue) {
  // 组件注册
  Vue.use(Test);
  Vue.use(Test2);
  Vue.use(Icon);
  Vue.use(SvgAnimation);
  Vue.use(ScreenLoading);
  Vue.use(FlexBox);
  Vue.use(Container);
}
