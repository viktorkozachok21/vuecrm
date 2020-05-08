<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('toggleSidebar')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ todayIs }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a class="dropdown-trigger black-text"
          ref="dropdownUser"
          href="#"
          data-target="dropdown">
          <span class="black-text">USER NAME</span>
          <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
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
            linkTo="/logout"
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
    todayIs: new Date().toDateString(),
    navbarLinksClasses: [
      "black-text"
    ],
    navbarIconClasses: [
      "left"
    ]
  }),
  mounted() {
    M.Dropdown.init(this.$refs.dropdownUser, {
      constrainWidth: true
    })
  },
  components: {
    LinkWithIcon
  }
}
</script>

<style lang="css" scoped>
</style>
