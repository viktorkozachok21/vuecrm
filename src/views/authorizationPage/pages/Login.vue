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
        :input-help-text="!$v.password.required ? 'Введіть пароль'
          : `Мінімальна довжина паролю ${$v.password.$params.minLength.min} символів. Зараз ${password.length}`"
        v-model.trim="password"
        :input-text-validate="($v.password.$dirty && !$v.password.required)
          || ($v.password.$dirty && !$v.password.minLength)"
      />
    </div>
    <div class="card-action">
      <FormButton
        button-type="submit"
        button-title="Увійти"
        :button-custom-class="['auth-submit']"
        icon-name="send"
        :icon-custom-class="['right']"
      />
      <p class="center">
        Немає облікового запису?
        <NavigationLink
          link-to="/register"
          link-title="Зареєструватись"
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
import messages from "@/utils/messages";

export default {
  name: "Login",
  components: {
    FormInputField,
    FormButton,
    NavigationLink
  },
  data: () => ({
    email: "",
    password: "",
    buttonClasses: [
      "auth-submit"
    ]
  }),
  mounted() {
    if (messages[this.$route.query.message]) this.$message(messages[this.$route.query.message])
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('loginUser', formData)
        this.$router.push("/")
      } catch (error) {}
    }
  }
}
</script>
