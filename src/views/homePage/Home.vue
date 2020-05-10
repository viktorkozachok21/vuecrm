<template>
  <div>
    <div class="page-title">
      <h3>Рахунок</h3>
      <FormButton
        :button-custom-class="buttonCustomClass"
        icon-name="refresh"
        @click.native="refreshCurrency"
        />
      </div>
    <Loader v-if="loading"/>
    <div v-else class="row">
      <HomeAccount
        :rates="currency.rates"
      />
      <HomeCurrency
        :rates="currency.rates"
        :date="currency.date"
      />
    </div>
  </div>
</template>

<script>
import HomeAccount from "@/components/homeComponents/HomeAccount.vue"
import HomeCurrency from "@/components/homeComponents/HomeCurrency.vue"
import FormButton from "@/components/formComponents/FormButton.vue"

export default {
  name: "Home",
  components: {
    HomeAccount,
    HomeCurrency,
    FormButton
  },
  data: () => ({
    loading: true,
    currency: null,
    buttonCustomClass: [
      "btn-small"
    ]
  }),
  async mounted() {
    this.currency = await this.$store.dispatch('fetchUserCurrency')
    this.loading = false
  },
  methods: {
    async refreshCurrency() {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchUserCurrency')
      this.loading = false
    }
  }
};
</script>
