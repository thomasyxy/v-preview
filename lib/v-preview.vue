<template>
  <div id="PREVIEW_CONTAINER" class="v-preview">
    <div class="v-preview-mask"></div>
    <div class="v-preview-container">
      <div class="v-preview-list">
        <div class="v-preview-item" v-for="img in imgs">
          <img
            :class="normal ? 'v-preview-normal' : 'v-preview-artwork'"
            :src="img"
           	v-finger:tap="tap"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import AlloyFinger from '../finger/index.js'
import AlloyFingerVue from '../finger/alloy_finger.vue.js'

Vue.use(AlloyFingerVue, { AlloyFinger: AlloyFinger })
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
    return {
      normal: true
    }
  },

  computed: {},

  methods: {
		tap: function() { console.log('onTap'); }
  },

  mounted: function () {
    let app = document.getElementById('PREVIEW_CONTAINER')
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
  overflow: auto;
}
.v-preview-normal {
  max-width: 100%;
  max-height: 100%;
}
.v-preview-artwork {
  width: auto;
  height: auto;
}
</style>
