<template>
  <button
    class="btn waves-effect waves-light teal darken-3"
    :class="[...buttonCustomClass]"
    :type="buttonType"
  >
    <span :class="{ 'btn-title': buttonTitle }">{{ buttonTitle }}</span>
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
  name: "FormButton",
  props: {
    buttonType: String,
    buttonTitle: String,
    buttonCustomClass: Array,
    iconName: String,
    iconCustomClass: Array
  }
}
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  .btn-title {
    margin-right: .5rem;
  }
}
</style>
