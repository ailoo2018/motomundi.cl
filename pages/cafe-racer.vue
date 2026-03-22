<script setup>
import Department from "@/views/pages/departments/department.vue"
import { Departments } from "@/models/index.js"
</script>

<template>
  <Department
    :key="Departments.CafeRacer"
    :wcc-id="Departments.CafeRacer"
  />
</template>
