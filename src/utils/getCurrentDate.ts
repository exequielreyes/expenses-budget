export const getDate = () => {
  return new Date().toDateString()
}

export const getMonth = () => {
  return new Date().getMonth() + 1
}

export const getYear = () => {
  return new Date().getFullYear()
}