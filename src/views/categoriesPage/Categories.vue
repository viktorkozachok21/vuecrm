<template>
  <div>
    <div class="page-title">
      <h3>Категорії</h3>
    </div>
    <section>
      <Loader v-if="loading"/>
      <div v-else class="row">

        <CategoryCreate
          @categoryCreated="addNewCategory"
        />

        <CategoryEdit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @categoryUpdated="updateCategory"
        />
        <p v-else class="center">Категорій не знайдено</p>

      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/categoriesComponents/CategoryCreate.vue"
import CategoryEdit from "@/components/categoriesComponents/CategoryEdit.vue"

export default {
  name: "Categories",
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategoriesForActiveUser')
    this.loading = false
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    updateCategory(category) {
      const index = this.categories.findIndex(category => category.id === category.id)
      this.categories[index].title = category.title
      this.categories[index].limit = category.limit
      this.updateCount++
    }
  },
  components: {
    CategoryCreate,
    CategoryEdit
  }
}
</script>

<style lang="css" scoped>
</style>
