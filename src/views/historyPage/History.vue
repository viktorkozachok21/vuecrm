<template>
  <div>
    <div class="page-title">
      <h3>Історія записів</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading"/>

    <p v-else-if="!records.length" class="center">Записів не знайдено <router-link to="/record">Додати запис</router-link></p>

    <section v-else>
      <HistoryTable
        :records="records"
      />
    </section>
  </div>
</template>

<script>
import HistoryChart from "@/components/historyComponents/HistoryChart.vue"
import HistoryTable from "@/components/historyComponents/HistoryTable.vue"

export default {
  name: "History",
  data: () => ({
    loading: true,
    records: [],
    categories: [],
  }),
  async mounted() {
    // this.records = await this.$store.dispatch('fetchRecordsForActiveUser')
    const records = await this.$store.dispatch('fetchRecordsForActiveUser')
    this.categories = await this.$store.dispatch('fetchCategoriesForActiveUser')

    this.records = records.map(record => {
      return {
        ...record,
        categoryName: this.categories.find(category => category.id === record.categoryId).title,
        recordType: record.type === 'income' ? "green" : "red",
        recordTypeText: record.type === 'income' ? "Дохід" : "Витрати",
      }
    })

    this.loading = false
  },
  components: {
    HistoryChart,
    HistoryTable
  }
}
</script>

<style lang="css" scoped>
</style>
