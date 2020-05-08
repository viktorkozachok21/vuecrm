<template>
  <div>
    <button
      class="btn waves-effect waves-light"
      :class="[...buttonClasses]"
      :type="buttonType"
    >
      {{ buttonTitle }}
      <i class="material-icons right">{{ iconName }}</i>
    </button>
  </div>
</template>

<script>
export default {
  name: "FormButton",
  props: {
    buttonType: String,
    buttonTitle: String,
    buttonClasses: Array,
    iconName: String
  }
}
</script>

<style lang="css" scoped>
</style>
