<template>
  <ul class="sidenav app-sidenav open">
    <SidebarLink
    v-for="link in sidebarLinks"
    :key="link.url"
    tag="li"
    :link="link" />
  </ul>
</template>

<script>
import SidebarLink from "./links/SidebarLink";

export default {
  data: () => ({
    sidebarLinks: [
      { title: "Рахунок", url: "/", exact: true },
      { title: "Історія", url: "/history" },
      { title: "Планування", url: "/planning" },
      { title: "Новий запис", url: "/record" },
      { title: "Категорії", url: "/categories" }
    ]
  }),
  components: { SidebarLink }
}
</script>

<style lang="scss" scoped>
</style>
