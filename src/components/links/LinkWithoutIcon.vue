<template>
  <div class="black-text">
    <router-link
    :tag="linkTag"
    active-class="active orange lighten-3"
    :to="linkTo"
    :exact="linkExact"
    >
      <a href="#"
        :class="[...linkClassList]"
        >
        {{ linkTitle }}
      </a>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "SidebarLink",
  props: {
    linkTo: String,
    linkTag: String,
    linkExact: Boolean,
    linkTitle: String,
    linkClassList: Array
  }
}
</script>
