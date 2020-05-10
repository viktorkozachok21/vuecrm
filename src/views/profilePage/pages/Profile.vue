<template>
  <div>
    <div class="page-title">
      <h3>Профіль</h3>
    </div>
    <form class="form" @submit.prevent="submitHandler">
      <FormInputField
        input-id="username"
        input-type="text"
        input-label="Ім'я"
        input-help-text="Введіть ваше ім'я"
        v-model.trim="username"
        :input-text-validate="$v.username.$dirty && !$v.username.required"
      />
      <div class="switch">
        <label>
          English
          <input type="checkbox">
          <span class="lever"></span>
          Українська
        </label>
      </div>
      <FormButton
        button-type="submit"
        button-title="Оновити"
        icon-name="send"
      />
    </form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators"
import { mapGetters } from "vuex"
import FormInputField from "@/components/formComponents/FormInputField.vue"
import FormButton from "@/components/formComponents/FormButton.vue"

export default {
  name: "Profile",
  components: {
    FormInputField,
    FormButton
  },
  data: () => ({
    username: ""
  }),
  computed: {
    ...mapGetters(['getActiveUserInfo'])
  },
  mounted() {
    this.username = this.getActiveUserInfo.name
  },
  validations: {
    username: { required },
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

    }
  }
}
</script>

<style lang="scss" scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
