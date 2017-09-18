<template>
  <div class="vue-MPreview">
  </div>
</template>

<script>
import touch from '../utils/touch'
export default {
  name: 'v-preview',

  props: {
    img: {
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

  mounted: function () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
