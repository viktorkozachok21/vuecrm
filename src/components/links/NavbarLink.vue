<template>
  <div class="black-text">
    <router-link
    :to="url"
    :tag="tag"
    class="black-text">
      <LinkIcon
      :className="iconClass"
      :iconName="iconName" />
      <span class="black-text">{{ title }}</span>
    </router-link>
  </div>
</template>

<script>
import LinkIcon from "./LinkIcon";

export default {
  name: "NavbarLink",
  props: {
    tag: String,
    url: String,
    title: String,
    iconClass: String,
    iconName: String
  },
  components: { LinkIcon }
}
</script>

<style lang="scss" scoped>
</style>
