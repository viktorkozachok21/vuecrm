<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашня бухгалтерія</span>
      <FormInputField
        input-id="email"
        input-type="text"
        input-label="Email"
        :input-help-text="!$v.email.required ? 'Поле Email не може бути порожнім'
        : 'Введіть коректний Email'"
        v-model.trim="email"
        :input-text-validate="($v.email.$dirty && !$v.email.required)
        || ($v.email.$dirty && !$v.email.email)"
      />
      <FormInputField
        input-id="password"
        input-type="password"
        input-label="Пароль"
        :inputHelpText="!$v.password.required ? 'Введіть пароль'
        : `Мінімальна довжина паролю ${$v.password.$params.minLength.min} символів. Зараз ${password.length}`"
        v-model.trim="password"
        :input-text-validate="($v.password.$dirty && !$v.password.required)
        || ($v.password.$dirty && !$v.password.minLength)"
      />
      <FormInputField
        input-id="name"
        input-type="text"
        input-label="Ім'я"
        :inputHelpText="!$v.username.required ? 'Введіть пароль'
        : `Мінімальна довжина паролю ${$v.username.$params.minLength.min} символів. Зараз ${username.length}`"
        v-model.trim="username"
        :input-text-validate="($v.username.$dirty && !$v.username.required)
        || ($v.username.$dirty && !$v.username.minLength)"
      />
      <p>
        <label>
          <FormInputField
            input-id="agreedWithRules"
            input-type="checkbox"
            input-label="З правилами погоджуюся"
            input-help-text="Name"
          />
        </label>
      </p>
    </div>
    <div class="card-action">
      <FormButton
        button-type="submit"
        button-title="Зареєструватись"
        :button-classes="buttonClasses"
        icon-name="send"
      />
      <p class="center">
        Вже зареєстровані?
        <LinkWithoutIcon
          link-to="/login"
          link-title="Вхід"
        />
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";
import FormInputField from "@/components/formComponents/FormInputField.vue";
import FormButton from "@/components/formComponents/FormButton.vue";
import LinkWithoutIcon from "@/components/links/LinkWithoutIcon.vue";

export default {
  name: "Register",
  data: () => ({
    email: "",
    password: "",
    username: "",
    agreedWithRules: false,
    buttonClasses: [
      "auth-submit"
    ]
  }),
  validations: {
      email: { email, required },
      password: { required, minLength: minLength(6) },
      username: { required },
      agreedWithRules: { checked: v => v }
  },
  methods: {
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }
      console.log(formData)
      this.$router.push("/")
    }
  },
  components: {
    FormInputField,
    FormButton,
    LinkWithoutIcon
  }
}
</script>

<style lang="css" scoped>
</style>
