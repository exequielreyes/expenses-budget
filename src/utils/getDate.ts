export const getDate = () => {
  return new Date().toLocaleDateString('en-CA').split('T')[0]
}