<template>
  <div>
    <div class="page-title">
      <h3>Новий запис</h3>
    </div>

    <Loader v-if="loading"/>

    <p v-else-if="!categories.length" class="center">Категорій не знайдено <router-link to="/categories">Додати нову категорію</router-link></p>

    <form v-else class="form" @submit.prevent="submitHandler">
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
      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="recordType"
          />
          <span>Дохід</span>
        </label>
      </p>
      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="recordType"
          />
          <span>Витрати</span>
        </label>
      </p>
      <FormInputField
        input-id="record-sum"
        input-type="number"
        input-label="Сума"
        :input-help-text="!$v.recordSum.required ? 'Введіть суму'
        : `Мінімальне значення ${$v.recordSum.$params.minValue.min}`"
        v-model.trim="recordSum"
        :input-text-validate="($v.recordSum.$dirty && !$v.recordSum.required)
        || ($v.recordSum.$dirty && !$v.recordSum.minValue)"
      />
      <FormInputField
        input-id="record-description"
        input-type="text"
        input-label="Опис"
        input-help-text="Введіть опис"
        v-model.trim="recordDescription"
        :input-text-validate="$v.recordDescription.$dirty && !$v.recordDescription.required"
      />
      <FormButton
        button-type="submit"
        button-title="Створити"
        icon-name="send"
      />
    </form>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators"
import { mapGetters } from "vuex"
import FormInputField from "@/components/formComponents/FormInputField.vue"
import FormButton from "@/components/formComponents/FormButton.vue"

export default {
  name: "Record",
  data: () => ({
    loading: true,
    categories: [],
    categoriesSelect: null,
    currentCategory: null,
    recordType: "income",
    recordSum: 10,
    recordDescription: ""
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategoriesForActiveUser')
    this.loading = false
    if (this.categories.length) this.currentCategory = this.categories[0].id
    setTimeout(() => {
      this.categoriesSelect = M.FormSelect.init(this.$refs.categoriesSelect)
      M.updateTextFields()
    }, 0)
  },
  validations: {
    recordSum: { required, minValue: minValue(1) },
    recordDescription: { required }
  },
  computed: {
    ...mapGetters(['getActiveUserInfo']),
    canCreateRecord() {
      if (this.recordType === 'income') return true
      return this.getActiveUserInfo.account >= this.recordSum
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.currentCategory,
            type: this.recordType,
            sum: this.recordSum,
            description: this.recordDescription,
            date: new Date().toJSON()
          })

          // Update active user account
          const account = this.recordType === 'income'
          ? +this.getActiveUserInfo.account + +this.recordSum
          : +this.getActiveUserInfo.account - +this.recordSum

          await this.$store.dispatch('updateActiveUserInfo', { account })
          this.recordSum = 10
          this.recordDescription = ""
          this.$v.$reset()
          this.$message("Новий запис успішно додано")
        } catch (error) {}
      } else {
        this.$message(`Недостатньо коштів на рахунку (${this.recordSum - this.getActiveUserInfo.account})`)
      }


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

<style lang="css" scoped>
</style>
