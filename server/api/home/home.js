export default defineEventHandler(async (event) => {

  return {
    widgets: [
      {
        id: 1,
        component: "Swiper",
        configuration: {},
      },
      {
        id: 2,
        component: "AddedValues",
      },
      {
        id: 3,
        component: "HomeCategories",
      },
      {
        id: 4,
        component: "ScrollingText",
        configuration: {
          items: [
            {
              text: "PACK – Cómpralo ahora y Recíbelo en 2 horas*",
              link: "/go/here",
            },
            {
              text: "CLICK&COLLECT: Recoge tu pedido en 2h en tu tienda más cercana",
              link: "/go/here",
            },
            {
              text: "Si lo encuentras más barato te igualamos el precio",
              link: "/go/here",
            },
          ],
        },
      },
      {
        id: 5,
        component: "FeaturedProducts",
        configuration: {
          collectionId: "OMmWPJoB_1hwOXfYXpXv",
        },
      },
    ],
  }
})
