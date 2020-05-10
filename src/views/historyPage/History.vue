<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Menu_History' | localizeFilter }}</h3>
    </div>
    <HistoryChart
      v-if="categories.length"
      :chart-data="setupChart"
    />
    <Loader v-if="loading"/>
    <p v-else-if="!records.length" class="center">
      {{ 'NoRecords' | localizeFilter }}
      <router-link to="/record">
        {{ 'AddFirst' | localizeFilter }}
      </router-link>
    </p>
    <section v-else>
      <HistoryTable
        :records="activeItems"
      />
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="changePageHandler"
        :prev-text="'Back' | localizeFilter"
        :next-text="'Forward' | localizeFilter"
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
import { localizeFilter } from "@/filters/localize.filter"

export default {
  name: "History",
  metaInfo() {
    return {
      title: this.$title('Menu_History')
    }
  },
  components: {
    HistoryChart,
    HistoryTable
  },
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
    categories: []
  }),
  computed: {
    setupChart() {
      return {
        labels: this.categories.map(category => category.title),
        datasets: [{
            label: localizeFilter('SpentByCategories'),
            data: this.categories.map(category => {
              return this.records.reduce((total, record) => {
                if (record.categoryId === category.id && record.type === 'outcome') total += +record.sum
                return total
              }, 0)
            }),
            backgroundColor: this.categories.map(category => this.getRandomColor(0.3)),
            borderColor: this.categories.map(category => this.getRandomColor(1)),
            borderWidth: 1
        }]
      }
    }
  },
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecordsForActiveUser')
    this.categories = await this.$store.dispatch('fetchCategoriesForActiveUser')

    this.setupRecordsPagination()

    this.loading = false
  },
  methods: {
    setupRecordsPagination() {
      this.setupPagination(this.records.map(record => {
        return {
          ...record,
          categoryName: this.categories.find(category => category.id === record.categoryId).title,
          recordType: record.type === 'income' ? "green" : "red",
          recordTypeText: record.type === 'income' ? localizeFilter('Income') : localizeFilter('Outcome'),
        }
      }))
    },
    getRandomColor(transparency) {
      return `rgba(${+Math.floor(Math.random() * 255)},${+Math.floor(Math.random() * 255)},${+Math.floor(Math.random() * 255)},${transparency})`
    },
  }
}
</script>

<style lang="css" scoped>
</style>
