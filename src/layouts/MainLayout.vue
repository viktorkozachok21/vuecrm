<template>
  <div class="app-main-layout">
    <Navbar @toggleSidebar="showSidebar = !showSidebar"/>
    <Sidebar :isOpen="showSidebar"/>
    <main class="app-content" :class="{ full: !showSidebar}">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <LinkWithIcon
      linkTo="/record"
      :linkClassList="mainLinkClassList"
      :iconClassList="mainIconClasses"
      iconName="add"
      />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import LinkWithIcon from "@/components/links/LinkWithIcon";

export default {
  name: "main-layout",
  data: () => ({
    showSidebar: false,
    mainLinkClassList: [
      "btn-floating",
      "btn-large",
      "blue"
    ],
    mainIconClasses: [
      "large"
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
