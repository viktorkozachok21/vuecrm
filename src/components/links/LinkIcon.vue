<template>
  <i class="material-icons" :class="className">{{ iconName }}</i>
</template>

<script>
export default {
  name: "LinkIcon",
  props: {
    className: String,
    iconName: String
  }
}
</script>

<style lang="css" scoped>
</style>
