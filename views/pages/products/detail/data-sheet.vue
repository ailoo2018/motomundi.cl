<script setup lang="ts">
const props = defineProps({
  product: {
    type: Object,
  },
})


const attributes = computed( () => {
  return props.product.tags ? props.product.tags.filter(t => t.type === "attribute" ) : []
})

</script>

<template>
  <section class="data-sheet">
    <h2>
      Ficha técnica
    </h2>
    <table class="data-sheet__table striped">
      <tbody>
        <tr nag-repeat="prop in product.dataSheet">
          <td class="data-sheet_detail-key">
            <h3>
              <strong>Identificador</strong>
            </h3>
          </td>
          <td class="data-sheet_detail-value">
            <span>{{ product.id }}</span>
          </td>
        </tr>
        <tr>
          <td class="data-sheet_detail-key">
            <h3>
              <strong>Marca</strong>
            </h3>
          </td>
          <td class="data-sheet_detail-value">
            <span>{{ product.brand.name }}</span>
          </td>
        </tr>


        <tr v-if="product.model">
          <td class="data-sheet_detail-key">
            <h3>
              <strong>Modelo</strong>
            </h3>
          </td>
          <td class="data-sheet_detail-value">
            <span>{{ product.model.name }}</span>
          </td>
        </tr>


        <tr v-if="product.motorbikeVersion && product.motorbikeVersion.length > 0">
          <td class="data-sheet_detail-key">
            <h3>
              <strong>Modelo motos</strong>
            </h3>
          </td>
          <td class="data-sheet_detail-value">
            <span v-for="mbk in product.motorbikeVersion">{{ mbk.name }}</span>
          </td>
        </tr>
        <tr v-for="attr in attributes">
          <td class="data-sheet_detail-key">
            <h3>
              <strong>{{ attr.categoryName }}</strong>
            </h3>
          </td>
          <td class="data-sheet_detail-value">
            <span>{{attr.name}} </span>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
<style scoped>
table {
  border-collapse: collapse;
  border-spacing: 0;
  display: table;
  width: 100%;
  font-size: 13px;
  margin-bottom: 50px;
}

td, th {
  padding: 10px;
}

table.striped > tbody > tr:nth-child(odd) {
  background-color: hsla(0, 0%, 95%, .5);
}

table.striped > tbody > tr:nth-child(2n+1) {
  background-color: rgba(242, 242, 242, 0.5);
}

table.striped tr {
  border-bottom: none;
}

.data-sheet__table .data-sheet_detail-key {
  width: 40%;
}

table h3 {
  margin: 0;
}

table h3 > strong {
  font-size: 13px;
  font-weight: 400;
}
</style>

