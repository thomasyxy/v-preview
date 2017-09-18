<template>
  <div id="PREVIEW_CONTAINER" class="v-preview">
    <div class="v-preview-mask"></div>
    <div class="v-preview-container">
      <div class="v-preview-list">
        <div class="v-preview-item" v-for="img in imgs">
          <img :class="v-preview-img" :src="img" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import touch from '../touch'
export default {
  name: 'v-preview',

  props: {
    imgs: {
      type: Array,
      default: function () {
        return []
      }
    },
    zIndex: {
      type: [Number, String]
    }
  },

  data () {
    return {}
  },

  computed: {},

  methods: {},

  mounted: function () {
    let app = document.getElementById('PREVIEW_CONTAINER')
    let appTouch = new touch(app)
    appTouch.on('longTap', function () {
      console.log('longTap')
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.v-preview {
  position: fixed;
  width: 100%;
  height: 100%;
}
.v-preview-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #000;
}
.v-preview-container {
  position: absolute;
  width: 100%;
  height: 100%;
}
.v-preview-list {
  position: relative;
  width: 100%;
  height: 100%;
}
.v-preview-item {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: scroll;
}
.v-preview-img {
  max-width: 100%;
  max-height: 100%;
}
</style>
