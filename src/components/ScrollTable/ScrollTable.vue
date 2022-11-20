<template>
  <template>
    <div class="base-scroll-list" :id="id">
      <div class="base-scroll-list-header" :style="{
        backgroundColor: actualConfig.headerBg,
        height: `${actualConfig.headerHeight}px`,
        fontSize: `${actualConfig.headerFontSize}px`,
        color: `${actualConfig.headerColor}`,
      }">
        <div class="header-item base-scroll-list-text" v-for="(headerItem, i) in headerData" :key="headerItem + i"
          :style="{
            width: `${columnWidths[i]}px`,
            ...headerStyle[i]
          }" :align="aligns[i]" v-html="headerItem" />
        <!-- 因为有可能传入一些 html 样式，所以通过 v-html 渲染比较合适 -->
      </div>
      <div class="base-scroll-list-rows-wrapper" :style="{
        height: `${height - actualConfig.headerHeight}px`
      }">
        <div class="base-scroll-list-rows" v-for="(rowsData, index) in currentRowsData" :key="rowsData.rowIndex" :style="{
          height: `${rowsHeights[index]}px`,
          lineHeight: `${rowsHeights[index]}px`,
          backgroundColor: rowsData.rowIndex % 2 === 0 ? rowBg[1] : rowBg[0],
          fontSize: `${actualConfig.rowFontSize}px`,
          color: `${actualConfig.rowColor}`
        }">
          <div class="base-scroll-list-columns base-scroll-list-text" v-for="(colData, colIndex) in rowsData.data"
            :key="colData + colIndex" :style="{
              width: `${columnWidths[colIndex]}px`,
              ...rowStyle[colIndex]
            }" :align="aligns[colIndex]" v-html="colData" />
        </div>
      </div>
    </div>
  </template>
</template>

<script>
import { watch, onMounted, ref } from 'vue'
import useScreen from '../../hooks/userScreen'
import cloneDeep from 'lodash/cloneDeep'
import assign from 'lodash/assign'

const defaultConfig = {
  // 标题数据，格式：['a','b','c']
  headerData: [],
  /*
    标题允许每一个样式有差异，所以不能传入 Object 类型，格式：[{}, {}, {}]
    style要在 headerStyle 中去找第 i 个元素，header 和 headerStyle 长度必须一致，
    如果长度不一致，headerStyle 没法找到 i，因此 headerStyle 未来还要做一些处理，让它长度与 header 一致，
    如果只传入 第一个的 headerStyle，那 headerStyle 要给它填空
    这是后面会讲到的关键问题：两个数组合并。headerStyle 一定要有默认样式，才能保证不出问题
  */
  headerStyle: [],
  // 标题背景色
  headerBg: 'rgb(90, 90, 90)',
  // 标题高度
  headerHeight: 35,
  // 标题是否展示序号
  // 其实就是在当前 header 数组里第一位再去插入一个数据
  headerIndex: false,
  // 标题插入内容
  headerIndexContent: '#',
  // 序号列标题的样式
  headerIndexStyle: {
    width: '50px'
  },
  // 序号列的数据内容
  headerIndexData: [],
  // 数据项，二维数组
  data: [],
  // 每页显示数据量
  rowNum: 10,
  // 行样式
  rowStyle: [],
  // 序号列内容样式
  rowIndexStyle: {
    width: '50px'
  },
  // 行背景色
  rowBg: [],
  // 居中方式
  aligns: [],
  headerFontSize: 28,
  rowFontSize: 20,
  headerColor: '#fff',
  rowColor: '#000',
  moveNum: 1, // 移动的位置
  duration: 2000
}

export default {
  name: 'ScrollTable',
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const id = `base-scroll-list`
    const { width, height } = useScreen(id)
    const actualConfig = ref([])
    const headerData = ref([])
    const headerStyle = ref([])
    const columnWidths = ref([])
    const rowsData = ref([])
    const currentRowsData = ref([]) // 展示动画的元素
    const currentIndex = ref(0) // 动画指针
    const rowsHeights = ref([])
    const rowNum = ref(defaultConfig.rowNum)
    const rowStyle = ref([])
    const rowBg = ref([])
    const aligns = ref([])
    const isAnimationStart = ref(true)

    let avgHeight // 行高

    const handleHeader = (config) => {
      /*
      最好不要直接改动 props 的值，这样的操作比较危险，
      如果父组件也用到这个header，这边就会有一定风险，所以需要做深拷贝
      这里已知 header 是一维数组，可以直接用扩展运算符做浅拷贝，
      但如果里面有 style 这样全部是对象的值，这个方法就不太可行，所以这里要用深拷贝
      这里可以用到 lodash，体积较大，按需加载
      */
      const _headerData = cloneDeep(config.headerData)
      const _headerStyle = cloneDeep(config.headerStyle)
      const _rowsData = cloneDeep(config.data)
      const _rowStyle = cloneDeep(config.rowStyle)
      const _aligns = cloneDeep(config.aligns)

      if (_headerData.length === 0) return
      // 展示序号列
      if (config.headerIndex) {
        _headerData.unshift(config.headerIndexContent)
        _headerStyle.unshift(config.headerIndexStyle)
        _rowStyle.unshift(config.rowIndexStyle)
        _aligns.unshift('center')
        _rowsData.forEach((rows, index) => {
          if (config.headerIndexData && config.headerIndexData.length > 0 && config.headerIndexData[index]) {
            rows.unshift(config.headerIndexData[index])
          } else {
            rows.unshift(index + 1) // 序号等于索引 + 1
          }
        })
      }
      // 动态计算 header 中每一列的宽度
      let useWidth = 0
      let useColumnNum = 0
      // 判断是否自定义 width
      _headerStyle.forEach(style => {
        // 如果自定义 width，则按照自定义的 width 进行渲染
        if (style.width) {
          useWidth += +style.width.replace('px', '')
          useColumnNum++
        }
      })
      // 动态计算列宽时，使用剩余的宽度除以剩余的列数
      const avgWidth = (width.value - useWidth) / (_headerData.length - useColumnNum)
      const _columnWidths = new Array(_headerData.length).fill(avgWidth)
      _headerStyle.forEach((style, index) => {
        // 如果自定义 width，则按照自定义的 width 进行渲染
        if (style.width) {
          const headerWidth = +style.width.replace('px', '')
          _columnWidths[index] = headerWidth
        }
      })
      columnWidths.value = _columnWidths

      // 直接这样写 打印不出来
      // columnWidths.value.fill(avgWidth)
      console.info('_headerData', _headerData);
      headerData.value = _headerData
      headerStyle.value = _headerStyle
      rowStyle.value = _rowStyle
      const { rowNum } = config
      if (_rowsData.length >= rowNum && _rowsData.length < rowNum * 2) {
        const newRowsData = [..._rowsData, ..._rowsData]
        rowsData.value = newRowsData.map((item, index) => ({
          data: item,
          rowIndex: index
        }))
      } else {
        rowsData.value = _rowsData.map((item, index) => ({
          data: item,
          rowIndex: index
        }))
      }
      aligns.value = _aligns
    }

    const handleRows = (config) => {
      // 如果data不存在，赋值成空数组，总之不能为空
      rowsData.value = config.data || []

      // 动态计算行数据高度
      const { headerHeight } = config
      rowNum.value = config.rowNum
      const unusedHeight = height.value - headerHeight
      // 如果 rowNum 大于实际数据长度，则以实际数据长度为准
      if (rowNum.value > rowsData.value.length) {
        rowNum.value = rowsData.value.length
      }
      avgHeight = unusedHeight / rowNum.value
      rowsHeights.value = new Array(rowNum.value).fill(avgHeight)
      // rowsHeights.value = new Array(rowNum.value < rowsData.value.length ? rowsData.value.length :rowNum.value).fill(avgHeight)

      rowBg.value = config.rowBg && config.rowBg
    }

    const startAnimation = async () => {
      if (!isAnimationStart) return
      const config = actualConfig.value
      const { rowNum, moveNum, duration } = config
      const totalLength = rowsData.value.length
      if (totalLength < rowNum) return
      const index = currentIndex.value
      const _rowsData = cloneDeep(rowsData.value)
      /*
        将数据重新头尾连接
        [a, b, c, d, e]
            1 假设指针 指到 b了
        [b, c, d, e, a]
      */
      const rows = _rowsData.slice(index) // 拿到 bcde
      rows.push(..._rowsData.slice(0, index)) // 前面的 a push进去
      currentRowsData.value = rows
      // 先将所有行的高度还原
      // 这里用的 totalLength，因为下面的行还要上来，avgHeight 必须要有值，如果是 0 上来就没值了，
      rowsHeights.value = new Array(totalLength).fill(avgHeight)
      const waitTime = 300
      if (!isAnimationStart) return
      await new Promise(resolve => setTimeout(resolve, waitTime))
      // 将 moveNum 的行高设置为 0
      // 比如 moveNum 是 1，要将当前第一行高度设置为 0，如果是2，要将前 2行设置为 0
      // 至此，问题变成如何将数组中指定元素进行修改，可以使用 splice
      rowsHeights.value.splice(0, moveNum, ...new Array(moveNum).fill(0))
      currentIndex.value += moveNum
      // 是否到达最后一组数据
      const isLast = currentIndex.value - totalLength
      if (isLast >= 0) {
        currentIndex.value = isLast
      }
      if (!isAnimationStart) return
      // 类似 java 的 sleep 休眠操作，让当前线程休眠多少秒
      await new Promise(resolve => setTimeout(resolve, duration - waitTime))
      if (!isAnimationStart) return
      // 延迟操作
      await startAnimation()
    }

    const stopAnimation = () => {
      isAnimationStart.value = false
    }

    const update = () => {
      stopAnimation()
      const _actualConfig = assign(defaultConfig, props.config)
      handleRows(_actualConfig)
      handleHeader(_actualConfig)
      actualConfig.value = _actualConfig
      // 展示动画
      startAnimation()
      console.log(actualConfig.value)
    }

    watch(() => props.config, () => {
      update()
    })

    return {
      id,
      headerData,
      headerStyle,
      columnWidths,
      rowsData,
      currentRowsData,
      rowsHeights,
      rowNum,
      rowStyle,
      rowBg,
      aligns,
      actualConfig,
      height
    }
  }
};
</script>

<style lang="scss" scoped>
.base-scroll-list {
  width: 100%;
  height: 100%;

  .base-scroll-list-text {
    /*padding: 0 10px;*/
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .base-scroll-list-header {
    display: flex;
    align-items: center;
    font-size: 15px;
  }

  .base-scroll-list-rows-wrapper {
    overflow: hidden;

    .base-scroll-list-rows {
      display: flex;
      align-items: center;
      transition: all 0.3s linear;

      .base-scroll-list-columns {
        height: 100%;
      }
    }
  }
}
</style>
