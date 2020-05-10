<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Menu_NewRecord' | localizeFilter }}</h3>
    </div>
    <Loader v-if="loading"/>
    <p v-else-if="!categories.length" class="center">
      {{ 'NoCategories' | localizeFilter }}
      <router-link to="/categories">
        {{ 'AddFirst' | localizeFilter }}
      </router-link>
    </p>
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
        <label>{{ 'SelectCategory' | localizeFilter }}</label>
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
          <span>{{ 'Income' | localizeFilter }}</span>
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
          <span>{{ 'Outcome' | localizeFilter }}</span>
        </label>
      </p>
      <FormInputField
        input-id="record-sum"
        input-type="number"
        :input-label="'Sum' | localizeFilter"
        :input-help-text="!$v.recordSum.required ? localize('EnterSum')
          : `${localize('Message_MinLength')} ${$v.recordSum.$params.minValue.min}`"
        v-model.trim="recordSum"
        :input-text-validate="($v.recordSum.$dirty && !$v.recordSum.required)
          || ($v.recordSum.$dirty && !$v.recordSum.minValue)"
      />
      <FormInputField
        input-id="record-description"
        input-type="text"
        :input-label="'Description' | localizeFilter"
        :input-help-text="'Message_EnterDescription' | localizeFilter"
        v-model.trim="recordDescription"
        :input-text-validate="$v.recordDescription.$dirty && !$v.recordDescription.required"
      />
      <FormButton
        button-type="submit"
        :button-title="'Create' | localizeFilter"
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
import { localizeFilter } from "@/filters/localize.filter"

export default {
  name: "Record",
  components: {
    FormInputField,
    FormButton
  },
  data: () => ({
    loading: true,
    categories: [],
    categoriesSelect: null,
    currentCategory: null,
    recordType: "income",
    recordSum: 10,
    recordDescription: ""
  }),
  computed: {
    ...mapGetters(['getActiveUserInfo']),
    canCreateRecord() {
      if (this.recordType === 'income') return true
      return this.getActiveUserInfo.account >= this.recordSum
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategoriesForActiveUser')
    this.loading = false
    if (this.categories.length) this.currentCategory = this.categories[0].id
    setTimeout(() => this.categoriesSelect = M.FormSelect.init(this.$refs.categoriesSelect), 0)
  },
  validations: {
    recordSum: { required, minValue: minValue(10) },
    recordDescription: { required }
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
          this.$message(localizeFilter('RecordHasBeenCreated'))
        } catch (error) {}
      } else {
        this.$message(`${this.localize('NotEnoughMoney')} (${this.recordSum - this.getActiveUserInfo.account})`)
      }
    }
  },
  beforeDestroy() {
    if (this.categoriesSelect && this.categoriesSelect.destroy) this.categoriesSelect.destroy()
  }
}
</script>
