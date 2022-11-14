<template>
  <div id="flex-box">
    <FlexBox>
      <h1>222</h1>
      <h3>333</h3>
    </FlexBox>
    <div class="width-container">
      <FlexBox :repeatCount="1">
        <h1>222</h1>
        <h3>333</h3>
      </FlexBox>
    </div>
  </div>
</template>

<style scoped>
.width-container {
  width: 50%;
  background-color: black;
}
</style>
