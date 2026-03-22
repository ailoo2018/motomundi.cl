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
  const deptCookie = useCookie(DEPT_COOKIE, {
    decode: val => Number(val),
    encode: val => String(val),
    default: () => Departments.Road,
  })

  // Source of truth:
  // - Client → localStorage (bypasses SSR cache)
  // - Server → cookie (best effort)
  const currDept = useState('department', () => {
    if (import.meta.client) {
      const stored = localStorage.getItem(DEPT_STORAGE)
      return stored !== null ? Number(stored) : (deptCookie.value ?? Departments.Road)
    }
    return deptCookie.value ?? Departments.Road
  })

  const deptPath = computed(() => DEPT_PATHS[currDept.value] ?? '/')

  function setDepartment(deptId) {
    currDept.value = deptId

    // Keep both in sync as side effects
    deptCookie.value = deptId
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
