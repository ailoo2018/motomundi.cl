<script setup lang="ts">
const props = defineProps({
  store: {
    type: Object,
  },
})

const specialColors = [
  "#d9aadc",
  "#f9e5a3",
  "#f4b8b8",
  "#aac8e4",
  "#f5d0b8",
]

const normalColors = [
  "#CBDFAA",
  "#4CAF50",
  "#90EE90",
  "#228B22",
  "#006400",
]

function IntervalDescription(entryIntervals) {
  try{
    let desc = ""
    for (var ei of entryIntervals) {
      if (desc.length != 0)
        desc += ", "
      desc += ei.open + " a " + ei.close
    }

    return desc
  }catch(e){
    return "error invervaldesc"
  }

}

const now = new Date()

const nowFmt = new Intl.DateTimeFormat('es-CL', {
  month: 'short',
  year: 'numeric',
}).format(now)

// Create the first day of the current month (Year, Month Index 0-11, Day 1)
const firstDayMonth = new Date(now.getFullYear(), now.getMonth(), 1)

// dayOfWeek: 0 (Sun) to 6 (Sat)
const dayOfWeek = firstDayMonth.getDay()

// Calculate start date
// If Sunday (0), ((0 - 1) * -1) = 1 day added (which moves it forward).
// To match the "Monday as start of week" logic from C#:
const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1
const start = new Date(firstDayMonth)

start.setDate(firstDayMonth.getDate() - diff)

const end = new Date(start) // Create a copy so 'start' isn't modified

end.setDate(start.getDate() + (6 * 7))

const { data } = await useFetch("/api/stores/calendar", {
  method: "GET",
  query: { from: start.toISOString().split('T')[0], to: end.toISOString().split('T')[0], facilityId: props.store.id },
})

console.log("return: ", data.value.dates)

var map = new Map()
for (var d of data.value.dates) {
  let key = d.date
  if (!map.has(key))
    map.set( key, d )
}

console.log("mapkey:" + JSON.stringify(map.keys()))

const weeks = ref([0, 1, 2, 3, 4, 5])
const dow = ref([0, 1, 2, 3, 4, 5, 6])

let itDate = new Date(start)
const days = ref([])
let color = ""
const specialHours = []
const normalHours = []
const set = new Map()
let idxSpecial = 0
var idxNormal = 0



for (const w of weeks.value) {
  for (const d of dow.value) {
    try {
      let key = itDate.toISOString().split('T')[0]
      let entry = map.get(key)



      if (!entry.isOpen) {
        color = ""
      } else if (entry.isOpen && !entry.isNormalHours) {
        specialHours.push(
          {
            date: itDate,
            intervals: entry.intervals,
            description: IntervalDescription(entry.intervals),
            note: entry.note,
            color: specialColors[idxSpecial],
          })
        color = specialColors[idxSpecial]
        idxSpecial++
      } else if (entry.isOpen && entry.isNormalHours) {
        if (itDate.getDay() === 6) {
          color = "#9FD9D7"
          let keyEntry = JSON.stringify(entry.intervals)

          if (!set.has(keyEntry)) {
            normalHours.push({
              key: keyEntry,
              date: itDate,
              intervals: entry.intervals,
              description: IntervalDescription(entry.intervals),
              note: entry.note,
              color: color,
            })
            set.set(keyEntry, color)
          }
        } else if (entry.isNormalHours) {
          var keyEntry = JSON.stringify(entry.intervals)
          if (set.has(keyEntry))
          {
            color = set.get(keyEntry)
          }
          else if (entry.intervals.length > 0 && !set.has(keyEntry))
          {
            if (idxNormal < normalColors.length)
            {
              color = normalColors[idxNormal]
            }
            else
            {
              color = "#CBDFAA"
            }

            set.set(keyEntry, color)
            normalHours.push(
              {
                key: keyEntry,
                date: start,
                intervals: entry.intervals,
                description: IntervalDescription(entry.intervals),
                note: entry.Note,
                color: color,
              })
            
            idxNormal++
          }
        }



      }

      days.value.push({
        id: key,
        isOpen: entry != null ? entry.isOpen : true,
        isSpecialHours: entry != null ? !entry.isNormalHours : false,
        date: itDate,
        color: color,
        isOtherMonth: firstDayMonth.getMonth() != itDate.getMonth(),
      })

      itDate.setDate(itDate.getDate() + 1)
      console.log("entry added: " + key)

    }catch(e){
      console.log("error", e)
    }
  }
}

/*
{
  "id": "2025-12-29",
  "isSpecialHours": true,
  "date": "2025-12-29T03:00:00.000Z",
  "color": "",
  "isOtherMonth": false
}
*/

const getEntry = (week, dow) => {
  let idx = (week * 7) + dow
  if( days.value.length > idx){
    return days.value[idx]
  }
  
  return null
}

const getDayClass = (week, dow) => {
  let entry = getEntry(week, dow)
  if(!entry)
    return ""

  let clazz = entry.isOpen ? 'calendar-open' : 'calendar-close'

  if(entry.isOtherMonth)
    clazz += " other-month"

  return clazz
}

const getDayOfMonth = (week, dow) => {
  let entry = null
  let idx = (week * 7) + dow
  if( days.value.length > idx){
    entry = days.value[idx]

    if(entry){
      return parseInt(entry.id.split("-")[2])
    }

  }
  
  return `${idx},${days.value.length}`
}
</script>

<template>
  <DIV class="shop-schedule">
    <h2><VIcon class="tabler-clock" size="xs" /> Horarios</h2>

    <table class="calendar">
      <tbody>
        <tr class="days">
          <td>L</td>
          <td>M</td>
          <td>X</td>
          <td>J</td>
          <td>V</td>
          <td>S</td>
          <td>D</td>
        </tr>


        <tr
          v-for="(week, idxWeek) in weeks"
          :key="idxWeek"
        >
          <td
            v-for="(d, idxDow) in dow"
            :key="idxDow"
            :class="getDayClass(idxWeek, idxDow)"
            :style="{ 'background-color' : getEntry(idxWeek, idxDow).color } "
          >
            {{ getDayOfMonth(idxWeek, idxDow ) }}
          </td>
        </tr>
      </tbody>
    </table>


    <DIV
      class="calendar-info"
      style="padding: 4px 8px"
    >
      <H3>{{ nowFmt }}</H3>
      <UL>
        <LI v-for="sch in normalHours">
          <VIcon
            class="tabler-circle-filled"
            :color=" sch.color "
          />
          {{ sch.description }}
        </LI>

        <li>
          <VIcon
            class="tabler-circle-filled"
            style="color:#D6D6D6"
          />
          Festivo cerrado
        </li>
      </UL>



      <h3
        v-if="specialHours.length > 0"
        style="margin: 12px 0;"
      >
        Horario especial
      </h3>
      <ul>
        <li
          v-for="sch of specialHours"
          style="display: flex; align-items: flex-start;"
        >
          <VIcon
            class="tabler-circle-filled mr-1"
            style=" margin-right: 8px; flex-shrink: 0;"
            :style="{'color': sch.color }"
          />
          <p style="margin: 0;">
            {{ sch.note }}, <br> {{ sch.description }}
          </p>
        </li>
      </ul>
    </DIV>
  </div>
</template>

<style lang="scss">

.calendar-open {
  background-color: #CBDFAA;
}

.calendar-close {
  background-color: #D6D6D6;
}

.calendar-color-1 {
  background-color: #d9aadc;
}

.calendar-color-2 {
  background-color: #aac8e4;
}

.calendar-color-5 {
  background-color: #f9e5a3;
}

.calendar-color-4 {
  background-color: #f4b8b8;
}

.calendar-color-6 {
  background-color: #f5d0b8;
}

.calendar-color-7 {
  background-color: #b8e6d5;
}

.calendar-color-8 {
  background-color: #e6b8d0;
}

.calendar-color-9 {
  background-color: #b8d9f5;
}

.calendar-color-10 {
  background-color: #d4c4f0;
}
</style>
