
const isEqual = (a, b) => {
  if (a.length !== b.length) return false
  const setB = new Set(b)
  
  return a.every(item => setB.has(item))
}

export { isEqual }
