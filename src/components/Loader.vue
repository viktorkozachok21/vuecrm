<template>
  <div class="app-loader">
    <div class="preloader-wrapper active">
    <div
      class="spinner-layer"
      :class="loaderColor"
    >
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "Loader",
  computed: {
    loaderColor() {
      const colors = [
        'spinner-red-only',
        'spinner-blue-only',
        'spinner-green-only'
      ]
      return colors[~~(Math.random() * 3)]
    }
  }
}
</script>
