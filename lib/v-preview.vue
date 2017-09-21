<template>
  <div id="PREVIEW_CONTAINER" class="v-preview">
    <div class="v-preview-mask"></div>
    <div class="v-preview-container">
      <div class="v-preview-list">
        <div class="v-preview-item" v-for="img in imgs">
          <img
            id="v-preview-image"
            :src="img"
           	v-finger:tap="tap"
            @load="imageLoaded"
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
import Transform from '../utils/transform'
import To from '../utils/to'

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
    }
  },

  computed: {},

  methods: {
    imageLoaded: function (e) {
      document.querySelector('#imgBox').style.display = 'block'
      topPx = window.innerHeight / 2 - (h * window.innerWidth / w) / 2
      this.style.top = topPx + 'px'
    },
    ease: function (x) {
        return Math.sqrt(1 - Math.pow(x - 1, 2));
    },
		tap: function () {
      console.log('onTap')
    }
  },

  create: function () {
    imageLoaded("#testImg", function(w,h){
    });
  },

  mounted: function () {
    let img = document.getElementById('v-preview-image')
    Transform(img)
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
  left: 0;
  top: 0;
}
</style>
