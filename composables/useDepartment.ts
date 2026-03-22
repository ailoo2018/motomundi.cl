import { Departments } from "@/models"

const DEPT_COOKIE  = 'mm-user-department'
const DEPT_STORAGE = 'mm-user-department'

const DEPT_PATHS = {
  [Departments.Road]:      '/',
  [Departments.CafeRacer]: '/cafe-racer',
  [Departments.Mx]:        '/motocross-enduro-trial',
  [Departments.LifeStyle]: '/ropa-casual',
}

export function useDepartment() {
  const currDept = useCookie(DEPT_COOKIE, {
    decode: val => Number(val),
    encode: val => String(val),
    default: () => Departments.Road,
  })

  // On client mount, localStorage overrides the SSR cookie value
  if (import.meta.client) {
    const stored = localStorage.getItem(DEPT_STORAGE)
    if (stored !== null) {
      currDept.value = Number(stored)
    }
  }

  const deptPath = computed(() => DEPT_PATHS[currDept.value] ?? '/')

  function setDepartment(deptId) {
    console.log("set department to: " + deptId)
    currDept.value = deptId

    // Persist to both
    if (import.meta.client) {
      localStorage.setItem(DEPT_STORAGE, String(deptId))
    }
  }

  return {
    currDept,
    deptPath,
    setDepartment,
  }
}
