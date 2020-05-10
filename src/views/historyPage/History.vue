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
        :records="activeItems"
      />
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="changePageHandler"
        :prev-text="'Попередня'"
        :next-text="'Наступна'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import paginationMixin from "@/mixins/pagination.mixin"
import HistoryChart from "@/components/historyComponents/HistoryChart.vue"
import HistoryTable from "@/components/historyComponents/HistoryTable.vue"

export default {
  name: "History",
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecordsForActiveUser')
    const categories = await this.$store.dispatch('fetchCategoriesForActiveUser')

    this.setupPagination(this.records.map(record => {
      return {
        ...record,
        categoryName: categories.find(category => category.id === record.categoryId).title,
        recordType: record.type === 'income' ? "green" : "red",
        recordTypeText: record.type === 'income' ? "Дохід" : "Витрати",
      }
    }))

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
