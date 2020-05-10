<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Menu_Planning' | localizeFilter }}</h3>
      <h4>{{ getActiveUserInfo.account | currencyFilter }}</h4>
    </div>
    <Loader v-if="loading"/>
    <p v-else-if="!categories.length" class="center">{{ 'NoCategories' | localizeFilter }} <router-link to="/categories">{{ 'AddFirst' | localizeFilter }}</router-link></p>
    <section v-else>
      <div
        v-for="category in categories"
        :key="category.id"
      >
        <p>
          <strong>{{ category.title }}:</strong>
          {{ category.spentSum | currencyFilter }} з {{ category.limit | currencyFilter }}
        </p>
        <div class="progress" v-tooltip-directive="category.tooltip">
          <div
              class="determinate"
              :class="[category.progressColor]"
              :style="{ width: category.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { currencyFilter } from "@/filters/currency.filter"
import { localizeFilter } from "@/filters/localize.filter"

export default {
  name: "Planning",
  metaInfo() {
    return {
      title: this.$title('Menu_Planning')
    }
  },
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['getActiveUserInfo'])
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecordsForActiveUser')
    const categories = await this.$store.dispatch('fetchCategoriesForActiveUser')

    this.categories = categories.map(category => {
      const spentSum = records
      .filter(record => record.categoryId === category.id)
      .filter(record => record.type === 'outcome')
      .reduce((total, record) => total += +record.sum, 0)

      const percent = 100 * spentSum / category.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red'

      const tooltipValue = category.limit - spentSum
      const tooltip = `${tooltipValue < 0 ? localizeFilter('MoreThan') : localizeFilter('Stayed')} ${currencyFilter(Math.abs(tooltipValue))}`

      return {
        ...category,
        progressPercent,
        progressColor,
        spentSum,
        tooltip
      }
    })

    this.loading = false
  }
}
</script>
