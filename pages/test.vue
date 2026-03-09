<script setup>
import { useCurrencyConverter } from "@/composables/useCurrencyConverter.js"

const { convert } = useCurrencyConverter()







</script>

<template>
  sel: {{convert(1000 )}}


</template>
