import SelectCiudad from './SelectCiudad.jsx'

function SelectorRuta({
  origen,
  destino,
  ciudades,
  ciudadesDestino,
  onOrigen,
  onDestino,
  orden,
  onOrden,
}) {
  return (
    <div className="ruta">
      <SelectCiudad
        label="Origen"
        value={origen}
        ciudades={ciudades}
        onCambio={onOrigen}
        icono="🛫"
      />
      <SelectCiudad
        label="Destino"
        value={destino}
        ciudades={ciudadesDestino}
        onCambio={onDestino}
        icono="📍"
      />

      {onOrden && (
        <label className="campo campo-orden">
          <span className="campo-header">
            <span className="campo-icono">⇄</span>
            <span className="campo-titulo">Ordenar por</span>
          </span>
          <select
            value={orden}
            onChange={(e) => onOrden(e.target.value)}
            className="campo-select"
          >
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
            <option value="hora">Hora de salida</option>
            <option value="avion">Avión (A–Z)</option>
          </select>
        </label>
      )}
    </div>
  )
}

export default SelectorRuta
