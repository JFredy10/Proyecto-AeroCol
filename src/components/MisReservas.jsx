import flightThumb from '../assets/flight-thumb.jpg'

function formatoPrecio(precio) {
  return `$ ${precio.toLocaleString('es-CO')}`
}

function TarjetaReserva({ reserva, onEliminar }) {
  const { vuelo, nombre, pasajeros, claseNombre, total, fecha, id } = reserva

  const verDetalles = () => {
    alert(
      `Detalles de la Reserva\n` +
        `----------------------------------------\n` +
        `ID: ${id}\n` +
        `Fecha: ${fecha}\n` +
        `Pasajero: ${nombre}\n` +
        `Aeronave: ${vuelo.avion}\n` +
        `Ruta: ${vuelo.origenNombre || vuelo.origen} → ${vuelo.destinoNombre || vuelo.destino}\n` +
        `Horario: ${vuelo.hora}\n` +
        `Pasajeros: ${pasajeros}\n` +
        `Clase: ${claseNombre}\n` +
        `Total pagado: ${formatoPrecio(total)}`
    )
  }

  return (
    <li className="tarjeta-reserva">
      {/* Columna 1: Miniatura del vuelo */}
      <div className="reserva-thumb-col">
        <img src={flightThumb} alt={vuelo.avion} className="reserva-thumb-img" />
      </div>

      {/* Columna 2: Datos del vuelo e itinerario */}
      <div className="reserva-vuelo-col">
        <h4 className="reserva-avion-titulo">{vuelo.avion}</h4>
        <p className="reserva-ruta-subtitulo">
          {vuelo.origenNombre || vuelo.origen} → {vuelo.destinoNombre || vuelo.destino}
        </p>
        <div className="reserva-itinerario-row">
          <div className="itinerario-punto">
            <span className="punto-hora">
              <span className="icono-tilted-plane">✈</span> {vuelo.hora}
            </span>
            <span className="punto-ciudad">{vuelo.origenNombre || vuelo.origen}</span>
          </div>
          <div className="itinerario-punto">
            <span className="punto-hora">
              <span className="icono-tilted-plane arrival">✈</span> {vuelo.hora}
            </span>
            <span className="punto-ciudad">{vuelo.destinoNombre || vuelo.destino}</span>
          </div>
        </div>
      </div>

      <div className="reserva-separador"></div>

      {/* Columna 3: Información del pasajero */}
      <div className="reserva-pasajero-col">
        <div className="reserva-dato-fila">
          <span className="icono-dato">👤</span>
          <span className="texto-dato">{nombre}</span>
        </div>
        <div className="reserva-dato-fila">
          <span className="icono-dato">👥</span>
          <span className="texto-dato">
            {pasajeros} {pasajeros === 1 ? 'pasajero' : 'pasajeros'}
          </span>
        </div>
        <div className="reserva-dato-fila">
          <span className="icono-dato">★</span>
          <span className="texto-dato">{claseNombre}</span>
        </div>
      </div>

      <div className="reserva-separador"></div>

      {/* Columna 4: Total y botón ver detalles */}
      <div className="reserva-total-col">
        <span className="reserva-total-etiqueta">Total</span>
        <strong className="reserva-total-valor">{formatoPrecio(total)}</strong>
        <button type="button" className="btn-ver-detalles" onClick={verDetalles}>
          <span className="icono-info">ⓘ</span> Ver detalles &gt;
        </button>
      </div>

      <div className="reserva-separador"></div>

      {/* Columna 5: Botón Eliminar */}
      <div className="reserva-eliminar-col">
        <button
          type="button"
          className="btn-eliminar-reserva"
          onClick={() => onEliminar(id)}
          title="Eliminar esta reserva"
        >
          <svg
            className="svg-papelera"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
          <span className="texto-eliminar">Eliminar</span>
        </button>
      </div>
    </li>
  )
}

function MisReservas({ reservas, onEliminar, onIrABuscar }) {
  return (
    <section className="seccion-mis-reservas">
      {/* Barra de cabecera con cantidad de reservas */}
      <div className="reservas-badge-header">
        <div className="badge-izq">
          <span className="icono-maleta">🧳</span>
          <span className="texto-badge">
            Tienes {reservas.length} reserva(s)
          </span>
        </div>
        <span className="icono-avion-badge">✈</span>
      </div>

      {/* Lista de reservas o estado vacío */}
      {reservas.length === 0 ? (
        <div className="estado-vacio-reservas">
          <p className="mensaje-vacio-texto">Aún no tienes reservas 👀</p>
          {onIrABuscar && (
            <button type="button" className="btn-ir-buscar" onClick={onIrABuscar}>
              Buscar un vuelo ahora 🛫
            </button>
          )}
        </div>
      ) : (
        <ul className="lista-reservas-grid">
          {reservas.map((reserva) => (
            <TarjetaReserva
              key={reserva.id}
              reserva={reserva}
              onEliminar={onEliminar}
            />
          ))}
        </ul>
      )}
    </section>
  )
}

export default MisReservas
