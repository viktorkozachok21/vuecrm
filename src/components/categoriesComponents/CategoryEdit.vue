<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="categoriesSelect" v-model="currentCategory">
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
            {{ category.title }}
            </option>
          </select>
          <label>Оберіть категорію</label>
        </div>

        <FormInputField
          input-id="category-title"
          input-type="text"
          input-label="Назва категорії"
          input-help-text="Введіть назву категорії"
          v-model.trim="categoryTitle"
          :input-text-validate="$v.categoryTitle.$dirty && !$v.categoryTitle.required"
        />
        <FormInputField
          input-id="category-limit"
          input-type="number"
          input-label="Ліміт бюджету"
          :input-help-text="!$v.categoryLimit.required ? 'Введіть ліміт'
          : `Мінімальне значення ${$v.categoryLimit.$params.minValue.min}`"
          v-model.number="categoryLimit"
          :input-text-validate="($v.categoryLimit.$dirty && !$v.categoryLimit.required)
          || ($v.categoryLimit.$dirty && !$v.categoryLimit.minValue)"
        />
        <FormButton
          button-type="submit"
          button-title="Оновити"
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

export default {
  name: "CategoryEdit",
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    categoryTitle: "",
    categoryLimit: null,
    categoriesSelect: null,
    currentCategory: null
  }),
  created() {
    const { id, title, limit } = this.categories[0]
    this.currentCategory = id
    this.categoryTitle = title
    this.categoryLimit = limit
  },
  mounted() {
    this.categoriesSelect = M.FormSelect.init(this.$refs.categoriesSelect)
    M.updateTextFields()
  },
  watch: {
    currentCategory(categoryId) {
      const { title, limit } = this.categories.find(category => category.id === categoryId)
      this.categoryTitle = title
      this.categoryLimit = limit
    }
  },
  validations: {
    categoryTitle: { required },
    categoryLimit: { required, minValue: minValue(10) }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const categoryData = {
          id: this.currentCategory,
          title: this.categoryTitle,
          limit: this.categoryLimit
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$v.$reset()
        this.$message("Категорію успішно оновлено")
        this.$emit('categoryUpdated', categoryData)
      } catch (error) {}

    }
  },
  beforeDestroy() {
    if (this.categoriesSelect && this.categoriesSelect.destroy) this.categoriesSelect.destroy()
  },
  components: {
    FormInputField,
    FormButton
  }
}
</script>
