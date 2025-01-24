export const getDate = () => {
  return new Date().toLocaleDateString('en-CA')
}

export const getMonth = () => {
  return (new Date().getMonth() + 1).toString().padStart(2, '0')
}

export const getYear = () => {
  return new Date().getFullYear().toString()
}