<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('toggleSidebar')">
          <LinkIcon
          className="black-text"
          iconName="dehaze" />
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
            <LinkIcon
            className="right"
            iconName="arrow_drop_down" />
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <NavbarLink
            tag="li"
            url="/profile"
            title="Профіль"
            iconClass="left"
            iconName="account_circle"
            />
            <li class="divider" tabindex="-1"></li>
            <NavbarLink
            tag="li"
            url="/logout"
            title="Вийти"
            iconClass="left"
            iconName="assignment_return"
            />
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import NavbarLink from "./links/NavbarLink";
import LinkIcon from "./links/LinkIcon";

export default {
  data: () => ({
    todayIs: new Date().toDateString()
  }),
  mounted() {
    M.Dropdown.init(this.$refs.dropdownUser, {
      constrainWidth: true
    })
  },
  components: {
    LinkIcon,
    NavbarLink
  }
}
</script>

<style lang="css" scoped>
</style>
