<template>
  <div id="app">
    <h1>user trajectory reconstruction</h1>
    <div style="width: 80%; height: 600px;align:center" >
      <amap :zoom="20" :center="position">
        <amap-marker
          :position="position"
          :label="{
            content: 'Hello, AMap-Vue!',
            direction: 'bottom',
          }"
        />
      </amap>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      position: [116.473179, 39.993169],
    };
  },
};
</script>

<style lang="sass" scoped>
.amap-wrapper
  width: 500px
  height: 500px
.app
  color: #2c3e50
  width: 100%
  height: 100%
</style>