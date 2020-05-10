<template>
  <div class="input-field">
    <input
      :id="inputId"
      :type="inputType"
      v-model="inputValue"
      :class="{ 'invalid': inputTextValidate }"
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
    value: {
      required: true
    },
    inputId: String,
    inputType: String,
    inputLabel: String,
    inputHelpText: String,
    inputTextValidate: Boolean
  },
  computed: {
    inputValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  mounted() {
    setTimeout(() => M.updateTextFields(), 0)
  }
};
</script>
