<template>
  <ul class="sidenav app-sidenav" :class="{ open: isOpen }">
    <LinkWithoutIcon
      v-for="link in sidebarLinks"
      :key="link.url"
      link-tag="li"
      :link-to="link.url"
      :link-exact="link.exact"
      :link-title="link.title"
      :link-class-list="sidebarLinksClasses"
    />
  </ul>
</template>

<script>
import LinkWithoutIcon from "./links/LinkWithoutIcon.vue";

export default {
  props: {
    isOpen: Boolean
  },
  data: () => ({
    sidebarLinks: [
      { title: "Рахунок", url: "/", exact: true },
      { title: "Історія", url: "/history" },
      { title: "Планування", url: "/planning" },
      { title: "Новий запис", url: "/record" },
      { title: "Категорії", url: "/categories" }
    ],
    sidebarLinksClasses: [
      "waves-effect",
      "waves-orange",
      "pointer"
    ]
  }),
  components: {
    LinkWithoutIcon
  }
}
</script>

<style lang="scss" scoped>
</style>
