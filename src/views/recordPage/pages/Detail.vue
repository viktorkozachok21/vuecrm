<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">Історія</router-link>
        <a @click.pevent class="breadcrumb">
          {{ record.recordTypeText }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="[record.recordType]"
          >
            <div class="card-content white-text">
              <p>Опис: {{ record.description }}</p>
              <p>Сума: {{ record.sum | currencyFilter() }}</p>
              <p>Категорія: {{ record.categoryName }}</p>

              <small>{{ record.date | dateTimeFilter('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="center">Запис з id={{ $route.params.id }} не знайдено <router-link to="/record">Додати запис</router-link></p>
  </div>
</template>

<script>
export default {
  name: "Detail",
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted() {
    const id = this.$route.params.id

    try {
      const record = await this.$store.dispatch('fetchRecordById', id)
      const categoryOfRecord = await this.$store.dispatch('fetchCategoryById', record.categoryId)

      this.record = {
        ...record,
        categoryName: categoryOfRecord.title,
        recordType: record.type === 'income' ? "green" : "red",
        recordTypeText: record.type === 'income' ? "Дохід" : "Витрати"
      }
    } catch (error) {
      this.record = null
    }

    this.loading = false
  }
}
</script>
