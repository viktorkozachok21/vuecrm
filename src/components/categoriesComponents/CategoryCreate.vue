<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ 'Create' | localizeFilter }}</h4>
      </div>
      <form @submit.prevent="submitHandler">
        <FormInputField
          input-id="category-title"
          input-type="text"
          :input-label="'Category' | localizeFilter"
          :input-help-text="'Message_CategoryTitle' | localizeFilter"
          v-model.trim="categoryTitle"
          :input-text-validate="$v.categoryTitle.$dirty && !$v.categoryTitle.required"
        />
        <FormInputField
          input-id="category-limit"
          input-type="number"
          :input-label="'Limit' | localizeFilter"
          :input-help-text="!$v.categoryLimit.required ? localize('Limit')
            : `${localize('Message_MinLength')} ${$v.categoryLimit.$params.minValue.min}`"
          v-model.number="categoryLimit"
          :input-text-validate="($v.categoryLimit.$dirty && !$v.categoryLimit.required)
            || ($v.categoryLimit.$dirty && !$v.categoryLimit.minValue)"
        />
        <FormButton
          button-type="submit"
          :button-title="'Create' | localizeFilter"
          icon-name="send"
        />
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators"
import FormInputField from "../formComponents/FormInputField.vue"
import FormButton from "../formComponents/FormButton.vue"
import { localizeFilter } from "@/filters/localize.filter"

export default {
  name: "CategoryCreate",
  components: {
    FormInputField,
    FormButton
  },
  data: () => ({
    categoryTitle: "",
    categoryLimit: 100
  }),
  validations: {
    categoryTitle: { required },
    categoryLimit: { required, minValue: minValue(10) }
  },
  methods: {
    localize(value) {
      return localizeFilter(value)
    },
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const newCategory = await this.$store.dispatch('createCategory', {
          title: this.categoryTitle,
          limit: this.categoryLimit
        })
        this.categoryTitle = ""
        this.categoryLimit = 100
        this.$v.$reset()
        this.$message(localizeFilter('Category_HasBeenCreated'))
        this.$emit('categoryCreated', newCategory)
      } catch (error) {}

    }
  }
}
</script>
