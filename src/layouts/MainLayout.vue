<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else class="app-main-layout">
      <Navbar
        @toggleSidebar="showSidebar = !showSidebar"
      />
      <Sidebar
        :isOpen="showSidebar"
        :key="locale"
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
        <NavigationLink
          link-to="/record"
          :link-custom-class="mainLinkClassList"
          icon-name="add"
          :icon-custom-class="mainIconClasses"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import Sidebar from "@/components/Sidebar.vue"
import NavigationLink from "@/components/links/NavigationLink.vue"
import messages from "@/utils/messages"

export default {
  name: "MainLayout",
  components: {
    Navbar,
    Sidebar,
    NavigationLink
  },
  data: () => ({
    showSidebar: false,
    loading: true,
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
  computed: {
    authError() {
      return this.$store.getters.getAuthError
    },
    locale() {
      return this.$store.getters.getActiveUserInfo.locale
    }
  },
  watch: {
    authError(firebaseError) {
      this.$error(messages[firebaseError.code] || 'Під час обробки запиту виникла помилка' )
    }
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.getActiveUserInfo).length) {
      await this.$store.dispatch('fetchInfoAboutActiveUser')
    }

    this.loading = false
  }
}
</script>
