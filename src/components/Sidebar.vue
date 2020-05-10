<template>
  <ul class="sidenav app-sidenav" :class="{ open: isOpen }">
    <NavigationLink
      v-for="link in sidebarLinks"
      :key="link.url"
      link-tag="li"
      :link-to="link.url"
      :link-exact="link.exact"
      :link-title="link.title"
      :link-custom-class="sidebarLinksClasses"
    />
  </ul>
</template>

<script>
import NavigationLink from "./links/NavigationLink.vue";

export default {
  name: "Sidebar",
  components: {
    NavigationLink
  },
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
  })
}
</script>
