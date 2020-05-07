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
      <router-link class="btn-floating btn-large blue" to="/record">
        <LinkIcon
        className="large"
        iconName="add" />
      </router-link>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import LinkIcon from "@/components/links/LinkIcon";

export default {
  name: "main-layout",
  data: () => ({
    showSidebar: false
  }),
  components: {
    Navbar,
    Sidebar,
    LinkIcon
  }
}
</script>

<style lang="scss" scoped>
</style>
