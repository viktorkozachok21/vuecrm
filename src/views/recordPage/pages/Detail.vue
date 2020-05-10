<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{ 'History_Title' | localizeFilter }}</router-link>
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
              <p>{{ 'Description' | localizeFilter }}: {{ record.description }}</p>
              <p>{{ 'Sum' | localizeFilter }}: {{ record.sum | currencyFilter() }}</p>
              <p>{{ 'Category' | localizeFilter }}: {{ record.categoryName }}</p>

              <small>{{ record.date | dateTimeFilter('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="center">{{ 'RecordOf' | localizeFilter }} id={{ $route.params.id }} {{ 'NotFound' | localizeFilter }} <router-link to="/record">{{ 'AddFirst' | localizeFilter }}</router-link></p>
  </div>
</template>

<script>
import { localizeFilter } from "@/filters/localize.filter"

export default {
  name: "Detail",
  metaInfo() {
    return {
      title: this.$title('OpenRecord')
    }
  },
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
        recordTypeText: record.type === 'income' ? localizeFilter('Income') : localizeFilter('Outcome')
      }
    } catch (error) {
      this.record = null
      throw error
    }

    this.loading = false
  }
}
</script>
