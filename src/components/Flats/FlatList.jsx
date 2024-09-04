import React, { useState, useEffect } from "react";
import { getFlats } from "../../services/firebase";
import { getToken } from "../../services/authService";
import fondoHome from "../../images/fondoHome.png";
import FlatItem from "./FlatItem";

function FlatList({ showOnlyUserFlats = false }) {
  const [flats, setFlats] = useState([]);
  const [filteredFlats, setFilteredFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para los filtros
  const [cityFilter, setCityFilter] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sizeRange, setSizeRange] = useState([0, 10000]);

  // Estado para el orden
  const [orderBy, setOrderBy] = useState("");

  useEffect(() => {
    const fetchFlats = async () => {
      try {
        setLoading(true);
        const allFlats = await getFlats();
        const userToken = getToken();

        let flatsToSet = allFlats;

        if (showOnlyUserFlats) {
          flatsToSet = allFlats.filter((flat) => flat.userId === userToken);
        }

        setFlats(flatsToSet);
        setFilteredFlats(flatsToSet); // Inicialmente todos los flats
      } catch (err) {
        console.error("Error fetching flats:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlats();
  }, [showOnlyUserFlats]);

  useEffect(() => {
    let filtered = flats;

    // Filtro por ciudad
    if (cityFilter) {
      filtered = filtered.filter((flat) =>
        flat.city.toLowerCase().includes(cityFilter.toLowerCase())
      );
    }

    // Filtro por rango de precio
    filtered = filtered.filter(
      (flat) => flat.value >= priceRange[0] && flat.value <= priceRange[1]
    );

    // Filtro por rango de tamaño
    filtered = filtered.filter(
      (flat) => flat.size >= sizeRange[0] && flat.size <= sizeRange[1]
    );

    // Ordenar los resultados
    if (orderBy === "city") {
      filtered = filtered.sort((a, b) => a.city.localeCompare(b.city));
    } else if (orderBy === "priceAsc") {
      filtered = filtered.sort((a, b) => a.value - b.value);
    } else if (orderBy === "sizeAsc") {
      filtered = filtered.sort((a, b) => a.size - b.size);
    }

    setFilteredFlats(filtered);
  }, [cityFilter, priceRange, sizeRange, orderBy, flats]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="filter-section p-4 flex justify-between">
        {/* Filtro por ciudad */}
        <input
          type="text"
          placeholder="Filtrar por ciudad"
          className="p-2 border border-gray-300 rounded"
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
        />

        {/* Filtro por rango de precio */}
        <input
          type="range"
          min="0"
          max="10000"
          step="100"
          className="p-2 border border-gray-300 rounded"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, parseInt(e.target.value, 10)])}
        />
        <span>${priceRange[1]}</span>

        {/* Filtro por rango de tamaño */}
        <input
          type="range"
          min="0"
          max="10000"
          step="100"
          className="p-2 border border-gray-300 rounded"
          value={sizeRange[1]}
          onChange={(e) => setSizeRange([0, parseInt(e.target.value, 10)])}
        />
        <span>{sizeRange[1]} m²</span>

        {/* Ordenar por */}
        <select
          value={orderBy}
          onChange={(e) => setOrderBy(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Ordenar por</option>
          <option value="city">Ciudad (A-Z)</option>
          <option value="priceAsc">Precio (Menor a Mayor)</option>
          <option value="sizeAsc">Tamaño (Menor a Mayor)</option>
        </select>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-5 bg-cover bg-center"
        style={{ backgroundImage: `url(${fondoHome})` }}
      >
        {filteredFlats.map((flat) => (
          <FlatItem
            key={flat.id}
            id={flat.id}
            city={flat.city}
            size={flat.size}
            availableFrom={flat.availableFrom}
            address={flat.address}
            value={flat.value}
          />
        ))}
      </div>
    </div>
  );
}

export default FlatList;
