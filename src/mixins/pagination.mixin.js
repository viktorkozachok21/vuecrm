import _ from "lodash"

export default {
  data: () => ({
    page: 1,
    pageSize: 5,
    pageCount: 0,
    allItems: [],
    activeItems: []
  }),
  mounted() {
    this.page = +this.$route.query.page || 1
  },
  methods: {
    setupPagination(givenItems) {
      this.allItems = _.chunk(givenItems, this.pageSize)
      this.pageCount = _.size(this.allItems)
      this.activeItems = this.allItems[this.page - 1] || this.allItems[0]
    },
    changePageHandler(activePage) {
      this.$router.push(`${this.$route.path}?page=${activePage}`)
      this.activeItems = this.allItems[activePage - 1] || this.allItems[0]
    }
  }
}
