<template>
  <div>
    <div class="page-title">
      <h3>{{ 'ProfileTitle' | localizeFilter }}</h3>
    </div>
    <form class="form" @submit.prevent="submitHandler">
      <FormInputField
        input-id="username"
        input-type="text"
        :input-label="'Name' | localizeFilter"
        :input-help-text="'Label_EnterName' | localizeFilter"
        v-model.trim="username"
        :input-text-validate="$v.username.$dirty && !$v.username.required"
      />
      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isUserLocaleUA">
          <span class="lever"></span>
          Українська
        </label>
      </div>
      <FormButton
        button-type="submit"
        :button-title="'Update' | localizeFilter"
        icon-name="send"
      />
    </form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators"
import { mapActions, mapGetters } from "vuex"
import FormInputField from "@/components/formComponents/FormInputField.vue"
import FormButton from "@/components/formComponents/FormButton.vue"

export default {
  name: "Profile",
  metaInfo() {
    return {
      title: this.$title('ProfileTitle')
    }
  },
  components: {
    FormInputField,
    FormButton
  },
  data: () => ({
    username: "",
    isUserLocaleUA: true
  }),
  computed: {
    ...mapGetters(['getActiveUserInfo'])
  },
  mounted() {
    this.username = this.getActiveUserInfo.name
    this.isUserLocaleUA = this.getActiveUserInfo.locale === "uk-UA"
  },
  validations: {
    username: { required },
  },
  methods: {
    ...mapActions(['updateActiveUserInfo']),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.updateActiveUserInfo({
          name: this.username,
          locale: this.isUserLocaleUA ? "uk-UA" : "en-US"
        })
      } catch(error) {}

    }
  }
}
</script>

<style lang="scss" scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
