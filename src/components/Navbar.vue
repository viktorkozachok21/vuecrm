<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('toggleSidebar')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ todayIs | dateTimeFilter("datetime") }}</span>
      </div>

      <ul class="right">
        <li>
          <a class="dropdown-trigger black-text active-user-name"
            ref="dropdownUser"
            href="#"
            data-target="dropdown"
          >
          <span class="black-text">{{ activeUserName }}</span>
          <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <LinkWithIcon
              link-tag="li"
              link-to="/profile"
              link-title="Профіль"
              :link-class-list="navbarLinkClasses"
              :icon-class-list="navbarIconClasses"
              icon-name="account_circle"
            />
            <li class="divider" tabindex="-1"></li>
            <LinkWithIcon
              link-tag="li"
              link-to="/login?message=logout"
              @click.native="logout"
              link-title="Вийти"
              :link-class-list="navbarLinkClasses"
              :icon-class-list="navbarIconClasses"
              icon-name="assignment_return"
            />
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import LinkWithIcon from "./links/LinkWithIcon.vue";

export default {
  data: () => ({
    todayIs: new Date(),
    dateInterval: null,
    userDropdown: null,
    navbarLinkClasses: [
      "black-text"
    ],
    navbarIconClasses: [
      "left"
    ]
  }),
  computed: {
    activeUserName() {
      return this.$store.getters.getActiveUserInfo.name
    }
  },
  mounted() {
    this.todayInterval = setInterval(() => {
      this.todayIs = new Date()
    }, 1000)
    this.userDropdown = M.Dropdown.init(this.$refs.dropdownUser, {
      constrainWidth: true
    })
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logoutActiveUser')
      this.$store.commit('CLEAR_ACTIVE_USER_INFO')
    }
  },
  beforeDestroy() {
    clearInterval(this.todayInterval)
    if (this.userDropdown && this.userDropdown.destroy) this.userDropdown.destroy()
  },
  components: {
    LinkWithIcon
  }
}
</script>

<style lang="scss" scoped>
#dropdown {
  transform: translateY(-4.3rem);
}

.active-user-name {
  min-width: 150px;
}
</style>
