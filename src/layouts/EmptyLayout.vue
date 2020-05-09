<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import messages from "@/utils/messages"

export default {
  name: "EmptyLayout",
  computed: {
    authError() {
      return this.$store.getters.getAuthError
    }
  },
  watch: {
    authError(firebaseError) {
      this.$error(messages[firebaseError.code] || 'Під час обробки запиту виникла помилка' )
    }
  }
}
</script>

<style lang="css" scoped>
</style>
