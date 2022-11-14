<template>
  <div class="test-svg">
    <svg width="0" height="0">
      <defs>
        <symbol id="more" viewBox="0 0 100 100">
          <circle r="5" cx="10" cy="25" fill="currentColor" />
          <circle r="5" cx="10" cy="50" fill="currentColor" />
          <circle r="5" cx="10" cy="75" fill="currentColor" />
          <line
            x1="40"
            y1="25"
            x2="90"
            y2="25"
            stroke-width="8"
            stroke="currentColor"
          />
          <line
            x1="40"
            y1="50"
            x2="80"
            y2="50"
            stroke-width="8"
            stroke="currentColor"
          />
          <line
            x1="40"
            y1="75"
            x2="90"
            y2="75"
            stroke-width="8"
            stroke="currentColor"
          />
        </symbol>
        <symbol id="filledArrowRight" viewBox="0 0 100 100">
          <polyline points="20 10, 80 50, 20 90" fill="currentColor"></polyline>
        </symbol>
        <symbol id="arrowRight" viewBox="0 0 100 100">
          <polyline
            points="30 20, 70 50, 30 80"
            fill="transparent"
            stroke="currentColor"
          ></polyline>
        </symbol>
        <symbol id="selected" viewBox="0 0 1024 1024">
          <path
            fill="currentColor"
            d="M464.247574 677.487844C474.214622 686.649009 489.665824 686.201589 499.086059 676.479029L798.905035 367.037898C808.503379 357.131511 808.253662 341.319801 798.347275 331.721456 788.44089 322.12311 772.62918 322.372828 763.030833 332.279215L463.211858 641.720346 498.050342 640.711531 316.608839 473.940462C306.453341 464.606085 290.653676 465.271736 281.319299 475.427234 271.984922 485.582733 272.650573 501.382398 282.806071 510.716775L464.247574 677.487844Z"
            p-id="2904"
          ></path>
        </symbol>
      </defs>
    </svg>
  </div>
</template>

<script>
export default {
  name: "Test1",
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.test {
  color: red;
}
</style>
