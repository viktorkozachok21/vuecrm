<template>
  <div class="black-text">
    <router-link
    :to="linkTo"
    :tag="linkTag"
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
