<script setup lang="ts">
const props = defineProps({
  id: {
    type: Number,
  },
})

const { data: entry } = await useFetch(`/api/blog/articles/${props.id}`,
  {
    key: "blog-article-" + props.id,
  })
</script>

<template>

  <div class="cms-container">
  <VCard class="pa-4" >
    <VCardText>
      <article v-if="entry">

        <div v-for="w of entry.widgets" >

          <div v-if="w.template && w.template.length > 0" >
            <div v-html="w.template.replace('$config.contenido', '')" />
          </div>


          <div v-if="w.configuration &&  w.configuration.contenido && w.configuration.contenido.length > 0" >
            <div v-html="w.configuration.contenido" />
          </div>


        </div>


      </article>
    </VCardText>
  </VCard>
  </div>

</template>

<style>

.cms-container h1 {
  border-left: 3px solid red;
  padding-left: 10px;
  text-transform: uppercase;
  font-size: 2rem;
}

.cms-container h3 {
  display: block;
  font-size: 1.17em;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  unicode-bidi: isolate;
}

.cms-container article li {
  display: list-item;
  text-align: -webkit-match-parent;
  unicode-bidi: isolate;
}


.cms-container article ul {
  padding-left: 30px;
  list-style-type: disc !important;
}

.cms-container  b, .cms-container  strong {
  font-weight: inherit;
  font-weight: bolder;
}

.cms-container p {
  margin: 20px 0;
  margin-left: 0 !important;
}
</style>


