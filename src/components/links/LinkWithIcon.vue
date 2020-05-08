<template>
  <div class="black-text">
    <router-link
    :tag="linkTag"
    active-class="active orange lighten-3"
    :to="linkTo"
    >
      <a href="#"
        :class="[...linkClassList]"
        >
        <i class="material-icons"
          :class="[...iconClassList]">
          {{ iconName }}
        </i>
        {{ linkTitle }}
      </a>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NavbarLink",
  props: {
    linkTo: String,
    linkTag: String,
    linkTitle: String,
    linkClassList: Array,
    iconName: String,
    iconClassList: Array
  }
}
</script>

<style lang="scss" scoped>
</style>
