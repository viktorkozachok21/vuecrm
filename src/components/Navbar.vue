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
          <a class="dropdown-trigger black-text"
            ref="dropdownUser"
            href="#"
            data-target="dropdown"
          >
          <span class="black-text">USER NAME</span>
          <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <LinkWithIcon
              linkTag="li"
              linkTo="/profile"
              linkTitle="Профіль"
              :linkClassList="navbarLinksClasses"
              :iconClassList="navbarIconClasses"
              iconName="account_circle"
            />
            <li class="divider" tabindex="-1"></li>
            <LinkWithIcon
              linkTag="li"
              linkTo="/login?message=logout"
              linkTitle="Вийти"
              :linkClassList="navbarLinksClasses"
              :iconClassList="navbarIconClasses"
              iconName="assignment_return"
            />
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import LinkWithIcon from "./links/LinkWithIcon";

export default {
  data: () => ({
    todayIs: new Date(),
    dateInterval: null,
    userDropdown: null,
    navbarLinksClasses: [
      "black-text"
    ],
    navbarIconClasses: [
      "left"
    ]
  }),
  mounted() {
    this.todayInterval = setInterval(() => {
      this.todayIs = new Date()
    }, 1000)
    this.userDropdown = M.Dropdown.init(this.$refs.dropdownUser, {
      constrainWidth: true
    })
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
</style>
