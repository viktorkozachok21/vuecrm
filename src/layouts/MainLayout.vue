<template>
  <div class="app-main-layout">
    <Navbar
      @toggleSidebar="showSidebar = !showSidebar"
    />
    <Sidebar
      :isOpen="showSidebar"
    />
    <main
      class="app-content"
      :class="{ full: !showSidebar}"
    >
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <LinkWithIcon
        link-to="/record"
        :link-class-list="mainLinkClassList"
        :icon-class-list="mainIconClasses"
        icon-name="add"
      />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import LinkWithIcon from "@/components/links/LinkWithIcon.vue";

export default {
  name: "MainLayout",
  data: () => ({
    showSidebar: false,
    mainLinkClassList: [
      "btn-floating",
      "btn-large",
      "orange",
      "darken-2"
    ],
    mainIconClasses: [
      "large",
    ]
  }),
  components: {
    Navbar,
    Sidebar,
    LinkWithIcon
  }
}
</script>

<style lang="scss" scoped>
</style>
