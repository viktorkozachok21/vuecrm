<template>
  <form class="card auth-card">
    <div class="card-content">
      <span class="card-title">Домашня бухгалтерія</span>
      <FormInputField
      inputId="email"
      inputType="text"
      inputLabel="Email"
      inputHelpText="Email"
      />
      <FormInputField
      inputId="password"
      inputType="password"
      inputLabel="Пароль"
      inputHelpText="Password"
      />
      <FormInputField
      inputId="name"
      inputType="text"
      inputLabel="Ім'я"
      inputHelpText="Name"
      />
      <p>
        <label>
          <input type="checkbox" />
          <span>З правилами погоджуюся</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <FormButton
      buttonType="submit"
      buttonTitle="Зареєструватись"
      :buttonClasses="buttonClasses"
      iconName="send"
      />
      <p class="center">
        Вже зареєстровані?
        <LinkWithoutIcon
        linkTo="/login"
        linkTitle="Вхід"
        />
      </p>
    </div>
  </form>
</template>

<script>
import FormInputField from "@/components/formComponents/FormInputField";
import FormButton from "@/components/formComponents/FormButton";
import LinkWithoutIcon from "@/components/links/LinkWithoutIcon";

export default {
  data: () => ({
    buttonClasses: [
      "auth-submit"
    ]
  }),
  components: {
    FormInputField,
    FormButton,
    LinkWithoutIcon
  }
}
</script>

<style lang="css" scoped>
</style>
