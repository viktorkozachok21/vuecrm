<template>
  <div class="black-text material-link">
    <router-link
      :tag="linkTag"
      active-class="active orange lighten-3"
      :to="linkTo"
      :exact="linkExact"
    >
      <a href="#"
        :class="[...linkCustomClass]"
      >
        <i class="material-icons"
          :class="[...iconCustomClass]"
        >
          {{ iconName }}
        </i>
        {{ linkTitle }}
      </a>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NavbarLink",
  props: {
    linkTo: String,
    linkTag: String,
    linkExact: Boolean,
    linkTitle: String,
    linkCustomClass: Array,
    iconName: String,
    iconCustomClass: Array
  }
}
</script>
