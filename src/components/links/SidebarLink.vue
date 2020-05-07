<template>
  <div class="sidebar-link">
    <router-link
    :tag="tag"
    active-class="active"
    :to="link.url"
    :exact="link.exact"
    >
      <a href="#"
      class="waves-effect waves-orange pointer">
      {{ link.title }}
    </a>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "LinkButton",
  props: {
    tag: String,
    link: Object
  }
}
</script>

<style lang="scss" scoped>
</style>
