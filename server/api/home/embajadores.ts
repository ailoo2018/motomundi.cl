export interface Ambassador {
  id: number
  name: string
  country: string
  discipline: string
  bio: string
  image: string
  featured?: boolean
  social: {
    instagram?: string
    youtube?: string
  }
}


const embajadores = [
  {
    id: 1,
    name: 'Javier Valenzuela',
    country: 'Valparaíso, Chile', // Corregido: Es de la V Región/España según contexto
    discipline: 'Motoviajero & Documentalista',
    bio: 'Javier Valenzuela es un viajero y documentalista español, creador de "Donde termine el asfalto". Explora el mundo en moto buscando autenticidad humana y rutas remotas.',
    image: '/embajadores/javier-valenzuela.webp',
    featured: true,
    social: { instagram: '@idayvueltaenmoto' },
  },
  {
    id: 2,
    name: 'Anonimoto',
    country: 'Santiago, Chile',
    discipline: 'Reviewer & Educación Vial',
    bio: 'Anonimoto es un influyente creador de contenido chileno que, bajo el anonimato de su casco, educa sobre seguridad vial, realiza reseñas técnicas y promueve la cultura motera.',
    image: '/embajadores/anonimoto.jpg',
    social: { instagram: '@anonimotojorge' },
  },
  {
    id: 3,
    name: 'George Marchant',
    country: 'Santiago, Chile',
    discipline: 'Motoviajero',
    bio: 'George Marchant es el director y camarógrafo del programa chileno Mototemáticos. Documentó rutas globales junto a Ricky Godoy, siendo un pilar de la cultura motera audiovisual.',
    image: '/embajadores/george.jpg',
    social: { instagram: '@mototematicos' },
  },
  {
    id: 4,
    name: 'Ayleen Martínez',
    country: 'Santiago, Chile',
    discipline: 'Motoviajera',
    bio: 'Ayleen Martínez es una destacada motoviajera chilena que documenta rutas épicas. Promueve el empoderamiento femenino y la libertad, inspirando a más mujeres a recorrer el mundo.',
    image: '/embajadores/ayleen.webp',
    social: { instagram: '@ayleen_al_limite' },
  },
  {
    id: 5,
    name: 'Natalia Muñoz',
    country: 'Valparaíso, Chile',
    discipline: 'Motoviajera',
    bio: 'Natalia Muñoz es una aventurera chilena que ha recorrido más de 70 países en solitario. A través de Natalia Overlands, inspira con sus viajes minimalistas por rutas remotas.',
    image: '/embajadores/natalia.jpg',
    social: { instagram: '@nataliaoverlands' },
  },
  {
    id: 6,
    name: 'Nivem',
    country: 'Santiago, Chile',
    discipline: 'Motovlog Urbano',
    bio: 'Nivem es un destacado motovlogger chileno que documenta la vida sobre dos ruedas haciendo delivery. Con humor y honestidad, comparte la realidad del tráfico urbano.',
    image: '/embajadores/nivem.jpeg',
    social: { instagram: '@nicolas_nivem' },
  },
  {
    id: 7,
    name: 'Lucho MotoK',
    country: 'Santiago, Chile',
    discipline: 'Eventos',
    bio: 'Lucho MotoK es un comunicador y organizador chileno. Destaca por sus reseñas técnicas y por crear el Trail Trophy, evento clave para la comunidad trail en Chile.',
    image: '/embajadores/motok.webp',
    social: { instagram: '@luchomotok' },
  },
]

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.cmsBaseUrl
  const id = getRouterParam(event, 'id')

  return embajadores
})
