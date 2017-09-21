<template>
  <div id="app">
    <v-preview :imgs="imgs" />
  </div>
</template>

<script>
import VPreview from '../lib/v-preview'
export default {
  name: 'app',
  data () {
    return {
      imgs: [
        // 'https://img.leoao.com/o_1bpol7uhh9vj1aml1hvn1i781f0gkf.jpg?imageslim?imageslim',
        // 'https://img.leoao.com/o_1bpoktr9qu2719q4r1e1jne12eqgd.jpg?imageslim?imageslim',
        // 'https://img.leoao.com/o_1bpolgmn343ls1u1jga1djuhbkno.jpg?imageslim?imageslim',
        'https://img.leoao.com/o_1bpolcdpm1div1n1oonr7f1mr8m1.jpg?imageslim?imageslim'
      ]
    }
  },
  components: {
    VPreview
  },
  methods: {},
  mounted () {
  }
}
</script>

<style lang="less">
body {
  margin: 0;
}
</style>
