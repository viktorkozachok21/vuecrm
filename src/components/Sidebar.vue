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
import NavigationLink from "./links/NavigationLink.vue"
import { localizeFilter } from "@/filters/localize.filter"

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
      { title: localizeFilter('Menu_Account'), url: "/", exact: true },
      { title: localizeFilter('Menu_History'), url: "/history" },
      { title: localizeFilter('Menu_Planning'), url: "/planning" },
      { title: localizeFilter('Menu_NewRecord'), url: "/record" },
      { title: localizeFilter('Menu_Categories'), url: "/categories" }
    ],
    sidebarLinksClasses: [
      "waves-effect",
      "waves-orange",
      "pointer"
    ]
  })
}
</script>
