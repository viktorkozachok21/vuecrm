<template>
  <button
    class="btn waves-effect waves-light"
    :class="[...buttonCustomClass]"
  >
    <i
    class="material-icons"
      :class="[...iconCustomClass]"
    >
      {{ iconName }}
    </i>
  </button>
</template>

<script>
export default {
  name: "ButtonWithIcon",
  props: {
    buttonCustomClass: Array,
    iconCustomClass: Array,
    iconName: String
  }
}
</script>
