import SelectCiudad from './SelectCiudad.jsx'

function SelectorRuta({ origen, destino, ciudades, ciudadesDestino, onOrigen, onDestino }) {
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
    </div>
  )
}

export default SelectorRuta
