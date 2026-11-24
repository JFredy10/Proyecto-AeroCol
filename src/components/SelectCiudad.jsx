function SelectCiudad({ label, value, ciudades, onCambio, icono }) {
  return (
    <label className="campo">
      <span className="campo-header">
        {icono && <span className="campo-icono">{icono}</span>}
        <span className="campo-titulo">{label}</span>
      </span>
      <select
        value={value}
        onChange={(e) => onCambio(e.target.value)}
        className="campo-select"
      >
        <option value="">— Elige {label.toLowerCase()} —</option>
        {ciudades.map((c) => (
          <option key={c.codigo} value={c.codigo}>
            {c.nombre} ({c.codigo})
          </option>
        ))}
      </select>
    </label>
  )
}

export default SelectCiudad
