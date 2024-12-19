export const useCategories = () => {

  // Aca luego traer las categorias de la BD
  const categories = [
    { value: "verduleria", label: "Verduleria" },
    { value: "fiambreria", label: "Fiambreria" },
    { value: "carniceria", label: "Carniceria" },
    { value: "supermercado", label: "Supermercado" },
    { value: "prestamo", label: "Prestamo" },
    { value: "otro", label: "Otro" }
  ]


  return {
    categories
  }
}