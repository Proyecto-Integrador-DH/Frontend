import React, { useEffect, useState } from "react";
import { fetchListarProductos } from "../../services/api";
import { fetchAgendarExperiencia } from "../../services/api";
import Logo from "../../assets/Logo03.png";

const ModalAgenda = ({
  isOpen,
  onClose,
  onSubmit,
  producto: initialProduct,
}) => {
  const [producto, setProducto] = useState({});
  const [fechaIda, setFechaIda] = useState("");
  const [fechaVuelta, setFechaVuelta] = useState("");
  const [cupos, setCupos] = useState("");
  const [estado, setEstado] = useState(false);
  const [experiencias, setExperiencias] = useState([]);

  useEffect(() => {
    fetchListarProductos().then((response) => {
      setExperiencias(response);
      if (initialProduct) {
        setProducto(initialProduct);
      }
    });
  }, [initialProduct]);

  const handleProductoChange = (e) => {
    const selectedProductId = e.target.value;
    const selectedProduct = experiencias.find(
      (experiencia) => experiencia.Id == selectedProductId
    );
    setProducto(selectedProduct);
  };

  const handleFechaIdaChange = (e) => {
    const fechaIda = e.target.value;
    setFechaIda(fechaIda);
  };

  const handleFechaVueltaChange = (e) => {
    const fechaVuelta = e.target.value;
    setFechaVuelta(fechaVuelta);
  };

  const handleCupoChange = (e) => {
    setCupos(e.target.value);
  };

  const handleEstadoChange = (e) => {
    setEstado(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { producto, fechaIda, fechaVuelta, cupos, estado };
      await fetchAgendarExperiencia(data);
      setCupos("");
      setFechaIda("");
      setFechaVuelta("");
      onClose();
    } catch (error) {
      console.error("Error al agendar la experiencia:", error);
    }
  };
  

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg">
        <img className="mx-auto h-10 w-auto" src={Logo} alt="Solo Aventuras" />
        <h2 className="m-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Agregar Agenda
        </h2>
        <form onSubmit={handleSubmit}>
          {initialProduct ? (
            <div className="mb-4">
              <label
                htmlFor="producto"
                className="block text-left text-sm font-medium leading-6 text-gray-900"
              >
                Experiencia:
              </label>
              <input
                type="text"
                id="producto"
                className="w-full border rounded p-2"
                value={initialProduct.nombre}
                readOnly
              />
            </div>
          ) : (
            <div className="mb-4">
              <label
                htmlFor="producto"
                className="block text-left text-sm font-medium leading-6 text-gray-900"
              >
                Experiencia:
              </label>
              <select
                id="producto"
                className="w-full border rounded p-2"
                value={producto.Id || ""}
                onChange={handleProductoChange}
              >
                <option value="">Seleccionar experiencia</option>
                {experiencias.map((experiencia) => (
                  <option key={experiencia.Id} value={experiencia.Id}>
                    {experiencia.nombre}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="fechaIda"
              className="block text-left text-sm font-medium leading-6 text-gray-900"
            >
              Fecha Ida:
            </label>
            <input
              type="date"
              id="fechaIda"
              className="w-full border rounded p-2"
              required
              value={fechaIda}
              onChange={handleFechaIdaChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="fechaVuelta"
              className="block text-left text-sm font-medium leading-6 text-gray-900"
            >
              Fecha Vuelta:
            </label>
            <input
              type="date"
              id="fechaVuelta"
              className="w-full border rounded p-2"
              required
              value={fechaVuelta}
              onChange={handleFechaVueltaChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="cupos"
              className="block text-left text-sm font-medium leading-6 text-gray-900"
            >
              Cupo:
            </label>
            <input
              type="number"
              id="cupos"
              className="w-full border rounded p-2"
              required
              value={cupos}
              onChange={handleCupoChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="estado"
              className="block text-left text-sm font-medium leading-6 text-gray-900"
            >
              Estado:
            </label>
            <input
              type="checkbox"
              id="estado"
              className="mr-2"
              checked={estado}
              onChange={handleEstadoChange}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="m-12 flex w-full justify-center rounded-md bg-rosa px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="m-12 flex w-full justify-center rounded-md bg-grey px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAgenda;
