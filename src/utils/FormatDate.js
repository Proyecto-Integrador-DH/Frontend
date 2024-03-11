const formatDate = (dateString) => {
  const fecha = new Date(dateString);
  const opcionesDeFormato = { year: "numeric", month: "long", day: "2-digit" };
  return fecha.toLocaleDateString("es-ES", opcionesDeFormato);
};

export default formatDate;
