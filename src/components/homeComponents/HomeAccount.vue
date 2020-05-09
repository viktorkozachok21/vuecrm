<template>
  <div class="col s12 m5 l3">
    <div class="card teal darken-3 bill-card">
      <div class="card-content white-text">
        <span class="card-title">Рахунок в валюті</span>

        <p
          v-for="cur in currencies"
          :key="cur"
          class="currency-line"
        >
          <span>{{ getCurrency(cur) | currencyFilter(cur) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeAccount",
  data: () => ({
    currencies: [
      'UAH',
      'USD',
      'EUR'
    ]
  }),
  props: {
    rates: Object
  },
  computed: {
    ratesBase() {
      return this.$store.getters.getActiveUserInfo.account / (this.rates['UAH'] / this.rates['EUR'])
    }
  },
  methods: {
    getCurrency(currency) {
      return ~~(this.ratesBase * this.rates[currency])
    }
  }
}
</script>
