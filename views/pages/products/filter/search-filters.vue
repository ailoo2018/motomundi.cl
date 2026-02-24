<script setup>
const filters = defineModel({
  type: Array,
  default: () => []
})

const MAX_SHOW = 5
const sliderValues = ref([10, 60])

const activeFilters = computed(() => {
  return filters?.value?.filter(f => f.buckets.length > 0) || []
})

</script>

<template>
  <ul style="overflow-y: auto;max-height: 60vh;">

    <li
      v-for="facetGroup in activeFilters"

      v-bind:key="facetGroup.name"
      class="filter "
      style=""
      :class="{'expanded' : facetGroup.expanded}"
    >
      <button
        class="mt-2 mb-2"
        @click="facetGroup.expanded = !facetGroup.expanded;"
      >
       {{ facetGroup.name }}
      </button>
      <ul
        v-if="facetGroup.expanded"
        class="filters__list pa-3"
      >
        <li
          v-for="(b, index) in facetGroup.buckets"
          v-bind:key="b.id"
          :class="{'extra-content': index >= MAX_SHOW && !facetGroup.showExtraContent}"
        >

          <label :for="b.name" class="d-flex ">
            <VCheckbox v-model="b.checked"  />
            <span  style="position: relative; top: 6px">{{ b.name }}</span>
          </label>
          <div class="filters__extras">
            <strong class="facets__total">{{ b.total }} </strong>
          </div>
        </li>

        <li
          v-if="facetGroup.buckets.length> MAX_SHOW && !facetGroup.showExtraContent"
          class="show-more mt-1"
        >
          <button
            class="ng-binding"
            @click="facetGroup.showExtraContent = true"
          >
            <i class="icon-plus" />
            Mostrar {{ facetGroup.buckets.length - MAX_SHOW }} más...
          </button>
        </li>
        <li
          v-if="facetGroup.buckets.length> MAX_SHOW && facetGroup.showExtraContent"
          class="show-more mt-1"
        >
          <button @click="facetGroup.showExtraContent = false">
            <i class="icon-minus" />
            Mostrar menos...
          </button>
        </li>
      </ul>
    </li>
  </ul>
</template>

<style scoped>
button:focus, input[type="submit"]:focus, button, input[type="submit"] {
  border-color: #d6001c;
}

.filter ul {
  display: none;
  padding: 0 20px 15px;
}

.filter > button {
  border-top: 1px solid #ebebeb;
  font-size: 13px;
  font-weight: 700;
  padding: 15px 20px;
  position: relative;
  text-align: left;
  text-transform: uppercase;
  width: 100%;
}

.search__dropdown {
  background: #fff;
  box-shadow: 0 10px 35px 0 rgba(0, 0, 0, .25);
  display: flex;
  height: 80%;
  /* height: 80vh; */
  left: 50%;
  position: absolute;
  /* top: 110%; */
  top: 140px;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  width: 95%;
  z-index: 2000000;
  max-width: 1150px;
}
.search__dropdown .search-dropdown__filters {
  background-color: #f5f5f5;
  flex: 0 0 27%;
  overflow-y: auto;
  padding: 10px;
}



.filter > button:after {
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxMyI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRUIwMDEyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS4yOCIgZD0iTTEyLjQzIDYuNzczSDEuNTdNNyAxLjM0M3YxMC44NjEiLz48L3N2Zz4=) 50% no-repeat;
  content: "";
  display: block;
  height: 10px;
  position: absolute;
  right: 20px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  width: 10px;
}

.filter > button:after {
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxMyI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRUIwMDEyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS4yOCIgZD0iTTEyLjQzIDYuNzczSDEuNTdNNyAxLjM0M3YxMC44NjEiLz48L3N2Zz4=) 50% no-repeat;
  content: "";
  display: block;
  height: 10px;
  position: absolute;
  right: 20px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  width: 10px;
}

*, ::after, ::before {
  box-sizing: border-box;
}

.filter.expanded > button:after {
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIyIj48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNFQjAwMTIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjI4IiBkPSJNMTIuNDMuNzc0SDEuNTciLz48L3N2Zz4=) 50% no-repeat;
}
.filters__list li.extra-content {
  display: none;
}
.filters__list li.show-more button {
  font-weight: normal;
  font-size: 12px;
}

.filter>button.collapded:after {
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxMyI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRUIwMDEyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS4yOCIgZD0iTTEyLjQzIDYuNzczSDEuNTdNNyAxLjM0M3YxMC44NjEiLz48L3N2Zz4=) 50% no-repeat;
  content: "";
  display: block;
  height: 10px;
  position: absolute;
  right: 20px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  width: 10px;
}
.filter.expanded ul {
  display: block;
}

.filters__list li {
  align-items: center;
  display: flex;
  justify-content: space-between;
  /*margin-bottom: 5px;*/
}

.filters__list li label {
  color: #000;
  flex: 1 1 70%;
  margin-bottom: 0;
  max-width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.filters__list li strong {
  background-color: #e8e8e8;
  color: #000;
  border-radius: 200px;
  font-size: 12px;
  font-weight: 500;
  padding: 2px 10px;
  text-align: right;
}


.filter > button:after {
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxMyI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRUIwMDEyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS4yOCIgZD0iTTEyLjQzIDYuNzczSDEuNTdNNyAxLjM0M3YxMC44NjEiLz48L3N2Zz4=) 50% no-repeat;
  content: "";
  display: block;
  height: 10px;
  position: absolute;
  right: 20px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  width: 10px;
}
.filter.expanded > button:after {
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIyIj48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNFQjAwMTIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjI4IiBkPSJNMTIuNDMuNzc0SDEuNTciLz48L3N2Zz4=) 50% no-repeat;
}

.fake-checkbox span:before, .fake-radio span:before {
  border: 1px solid #000;
  content: "";
  display: block;
  flex: 0 0 18px;
  height: 18px;
  margin-right: 8px;
  transition: .2s;
  width: 18px;
}

.fake-checkbox.checked span:before {
  background: #000 url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSI4Ij48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNGRkYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjgiIGQ9Ik05IDFMMy41IDYuNSAxIDQiLz48L3N2Zz4=) 50% no-repeat;
}
/*

[type=checkbox] + span {
  cursor: pointer;
  display: inline-block;
  height: 25px;
  line-height: 25px;
  padding-left: 30px;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

[type=checkbox] + span:before {
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSI4Ij48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNGRkYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjgiIGQ9Ik05IDFMMy41IDYuNSAxIDQiLz48L3N2Zz4=) 50% no-repeat;
  background-size: 0;
  border: 1px solid #000;
  content: "";
  height: 18px;
  left: 0;
  margin-top: 3px;
  position: absolute;
  top: 0;
  transition: .2s;
  transition: all .2s ease-in-out;
  width: 18px;
  z-index: 0;
}

[type=checkbox] + span {
  cursor: pointer;
  display: inline-block;
  height: 25px;
  line-height: 25px;
  padding-left: 30px;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

[type=checkbox]:checked, [type=checkbox]:not(:checked), [type=radio]:checked, [type=radio]:not(:checked) {
  opacity: 0;
  pointer-events: none;
  position: absolute;
}
*/

button, input, optgroup, select, textarea {
  border-radius: 0;
  box-sizing: border-box !important;
  color: #000;
  font-family: system, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-weight: 500;
  outline: none;
}
</style>
