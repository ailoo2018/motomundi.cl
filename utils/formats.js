
function extractNames(fullName) {
  // Split the name into parts
  const parts = fullName.trim().split(/\s+/)

  // If only one part, it's all firstName
  if (parts.length === 1) {
    return {
      firstName: parts[0],
      lastName: '',
    }
  }

  // Get first name (could be compound)
  let firstName = ''
  let lastName = ''

  // Common Spanish/Latin compound first names
  const commonCompoundNames = [
    'juan carlos',
    'josé luis',
    'maría josé',
    'ana maría',
    'josé maría',
    'maría teresa',

    // Add more as needed
  ]

  // Check if we have a compound first name
  const possibleCompound = (parts[0] + ' ' + parts[1]).toLowerCase()
  if (commonCompoundNames.includes(possibleCompound)) {
    firstName = parts[0] + ' ' + parts[1]
    lastName = parts.slice(2).join(' ')
  } else {
    firstName = parts[0]
    lastName = parts.slice(1).join(' ')
  }

  return {
    firstName: firstName,
    lastName: lastName || '', // ensure lastName is never undefined
  }
}

module.exports.extractNames = extractNames



