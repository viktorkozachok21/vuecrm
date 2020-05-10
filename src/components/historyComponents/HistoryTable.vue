<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>{{ 'Sum' | localizeFilter }}</th>
      <th>{{ 'Date' | localizeFilter }}</th>
      <th>{{ 'Category' | localizeFilter }}</th>
      <th>{{ 'Type' | localizeFilter }}</th>
      <th>{{ 'Detail' | localizeFilter }}</th>
    </tr>
    </thead>

    <tbody>
    <tr
      v-for="(record, index) in records"
      :key="record.id"
    >
      <td>{{ index + 1 }}</td>
      <td>{{ record.sum | currencyFilter() }}</td>
      <td>{{ record.date | dateTimeFilter('datetime') }}</td>
      <td>{{ record.categoryName }}</td>
      <td>
        <span
          class="white-text badge"
          :class="[record.recordType]"
        >
          {{ record.recordTypeText }}
        </span>
      </td>
      <td class="center">
        <FormButton
          v-tooltip-directive="'Переглянути запис'"
          :button-custom-class="buttonCustomClass"
          icon-name="open_in_new"
          @click.native="$router.push(`/detail/${record.id}`)"
          />
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import FormButton from "../formComponents/FormButton.vue"

export default {
  name: "HistoryTable",
  components: {
    FormButton
  },
  props: {
    records: {
      required: true,
      type: Array
    }
  },
  data: () => ({
    loading: true,
    buttonCustomClass: [
      "btn-small"
    ]
  })
}
</script>
