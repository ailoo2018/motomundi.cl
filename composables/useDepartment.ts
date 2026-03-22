import { Departments } from "@/models"

const DEPT_COOKIE = 'mm-user-department'

const DEPT_PATHS = {
  [Departments.Road]: '/',
  [Departments.CafeRacer]: '/cafe-racer',
  [Departments.Mx]: '/motocross-enduro-trial',
  [Departments.LifeStyle]: '/ropa-casual',
}

export function useDepartment() {
  const currDept = useCookie(DEPT_COOKIE, {
    decode: val => Number(val),
    encode: val => String(val),
    default: () => 0,
  })

  const deptPath = computed(() => DEPT_PATHS[currDept.value] ?? '/')

  function setDepartment(deptId) {

    console.log("set department to: " + deptId)

    currDept.value = deptId
  }

  return {
    currDept,
    deptPath,
    setDepartment,
  }
}
