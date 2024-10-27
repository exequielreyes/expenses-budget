export const setDataInLocalStorage = <T>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error al guardar los datos para ${key}:`, error)
  }
}

export const getDataFromLocalStorage = <T>(key: string): T | null => {
  try {
    const stored = localStorage.getItem(key)
    return stored ? (JSON.parse(stored) as T) : null
  } catch (error) {
    console.error(`Error al obtener los datos para ${key}:`, error)
    return null
  }
}
