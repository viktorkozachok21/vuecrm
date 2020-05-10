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
        input-id="username"
        input-type="text"
        input-label="Ім'я"
        input-help-text="Введіть ваше ім'я"
        v-model.trim="username"
        :input-text-validate="$v.username.$dirty && !$v.username.required"
      />
      <p>
        <label>
          <input type="checkbox" v-model="agreedWithRules" />
          <span>З правилами погоджуюся</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <FormButton
        button-type="submit"
        button-title="Зареєструватись"
        :button-custom-class="buttonClasses"
        icon-name="send"
        :icon-custom-class="['right']"
      />
      <p class="center">
        Вже зареєстровані?
        <NavigationLink
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
import NavigationLink from "@/components/links/NavigationLink.vue";

export default {
  name: "Register",
  components: {
    FormInputField,
    FormButton,
    NavigationLink
  },
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
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.username
      }

      try {
        await this.$store.dispatch('registerNewUser', formData)
        this.$router.push("/")
      } catch (error) {}
    }
  }
}
</script>
