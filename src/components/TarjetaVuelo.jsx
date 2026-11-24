import flightThumb from '../assets/flight-thumb.jpg'

function formatoPrecio(precio) {
  return `$ ${precio.toLocaleString('es-CO')}`
}

function TarjetaVuelo({ vuelo, seleccionado, onSeleccionar, nombreOrigen, nombreDestino }) {
  return (
    <li
      className={`tarjeta ${seleccionado ? 'seleccionada' : ''}`}
      onClick={() => onSeleccionar?.(vuelo)}
    >
      <div className="tarjeta-imagen-col">
        <img src={flightThumb} alt={vuelo.avion} className="tarjeta-thumb" />
      </div>

      <div className="tarjeta-info-col">
        <div className="tarjeta-avion">{vuelo.avion}</div>
        <div className="tarjeta-ruta-nombre">
          {nombreOrigen} → {nombreDestino}
        </div>
        <div className="tarjeta-itinerario">
          <div className="hora-bloque">
            <span className="hora">{vuelo.hora}</span>
            <span className="ciudad">{nombreOrigen}</span>
          </div>
          <div className="icono-vuelo-linea">
            <span className="linea-itinerario"></span>
            <span className="avion-icono">✈</span>
            <span className="linea-itinerario"></span>
          </div>
          <div className="hora-bloque">
            <span className="hora">{vuelo.hora}</span>
            <span className="ciudad">{nombreDestino}</span>
          </div>
        </div>
      </div>

      <div className="tarjeta-separador"></div>

      <div className="tarjeta-precio-col">
        <div className="tarjeta-precio">{formatoPrecio(vuelo.precio)}</div>
        <div className="tarjeta-duracion">
          <span className="icono-reloj">🕒</span> Duración: 1h 0min
        </div>
        {seleccionado ? (
          <button type="button" className="btn-seleccionado">
            ✓ Seleccionado
          </button>
        ) : (
          <button
            type="button"
            className="btn-ver"
            onClick={(e) => {
              e.stopPropagation()
              onSeleccionar?.(vuelo)
            }}
          >
            Ver &gt;
          </button>
        )}
      </div>

      {seleccionado && <div className="badge-check-circulo">✓</div>}
    </li>
  )
}

export default TarjetaVuelo
