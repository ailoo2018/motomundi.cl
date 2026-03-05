<script setup>
import Department from "@/views/pages/departments/department.vue"
import { Departments } from "@/models/index.js"

definePageMeta({
  public: true,
  layout: "default",
})


</script>

<template>
  <Department :wcc-id="Departments.Road" />
</template>


<style lang="scss">

</style>
