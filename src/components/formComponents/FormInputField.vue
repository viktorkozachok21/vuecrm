<template>
  <div class="input-field">
    <input
      :id="inputId"
      :type="inputType"
      :class="{ 'invalid': inputTextValidate }"
      @input="$emit('input', $event.target.value)"
    >
    <label :for="inputId">{{ inputLabel }}</label>
    <small
      class="helper-text invalid"
      v-show="inputTextValidate"
    >
      {{ inputHelpText }}
    </small>
  </div>
</template>

<script>
export default {
  name: "FormInputField",
  props: {
    inputId: String,
    inputType: String,
    inputLabel: String,
    inputHelpText: String,
    inputTextValidate: Boolean
  }
};
</script>

<style scoped lang="scss">

</style>
