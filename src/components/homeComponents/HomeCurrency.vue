<template>
  <div class="col s12 m7 l9">
    <div class="card blue-grey lighten-1 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ 'CurrencyAmountTitle' | localizeFilter }}</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>{{ 'Currency' | localizeFilter }}</th>
            <th>{{ 'CurrencyRate' | localizeFilter }}</th>
            <th>{{ 'Date' | localizeFilter }}</th>
          </tr>
          </thead>

          <tbody>
          <tr
            v-for="cur in currencies"
            :key="cur"
          >
            <td>{{ cur }}</td>
            <td>{{ rates[cur] }}</td>
            <td>{{ date | dateTimeFilter('date') }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeCurrency",
  props: {
    rates: Object,
    date: String
  },
  data: () => ({
    currencies: [
      'UAH',
    ]
  })
}
</script>
