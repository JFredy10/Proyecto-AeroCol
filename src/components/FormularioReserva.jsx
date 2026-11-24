import { useState } from 'react'
import { CLASES } from '../data/vuelos.js'
import flightThumb from '../assets/flight-thumb.jpg'

function FormularioReserva({ vuelo, nombreOrigen, nombreDestino, onReservar }) {
  const [nombre, setNombre] = useState('')
  const [pasajeros, setPasajeros] = useState(1)
  const [clase, setClase] = useState('economica')

  // Estado derivado: el factor y el total se calculan en cada render
  const factorClase = CLASES.find((c) => c.id === clase)?.factor ?? 1
  const total = vuelo.precio * pasajeros * factorClase

  const esValido = nombre.trim() !== ''

  const manejarEnvio = (e) => {
    e.preventDefault()
    if (!esValido) return

    onReservar?.({
      id: crypto.randomUUID(),
      vueloId: vuelo.id,
      vuelo,
      nombre: nombre.trim(),
      pasajeros,
      clase,
      claseNombre: CLASES.find((c) => c.id === clase)?.nombre ?? clase,
      total,
      fecha: new Date().toLocaleDateString('es-CO'),
    })
  }

  return (
    <div className="formulario-card">
      <div className="formulario-header">
        <span className="formulario-icono">🎟</span>
        <h3>Reservar vuelo</h3>
      </div>

      <div className="formulario-body">
        {/* Reto 2 F3: Detalle del vuelo seleccionado (avión, hora, precio base, ruta) */}
        <div className="vuelo-resumen-mini">
          <img src={flightThumb} alt={vuelo.avion} className="mini-thumb" />
          <div className="mini-info">
            <h4>{vuelo.avion}</h4>
            <p className="mini-horas">
              {vuelo.hora} – {vuelo.hora}
            </p>
            <p className="mini-ruta">
              {nombreOrigen} → {nombreDestino}
            </p>
            <p className="mini-precio-base">
              Base: $ {vuelo.precio.toLocaleString('es-CO')}
            </p>
          </div>
        </div>

        <form onSubmit={manejarEnvio} className="formulario-campos">
          <div className="campo-grupo">
            <label className="campo-etiqueta" htmlFor="nombre-pasajero">
              <span className="icono-campo">👤</span>
              Nombre del pasajero
            </label>
            <input
              id="nombre-pasajero"
              type="text"
              className="campo-input-texto"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ana García"
            />
          </div>

          <div className="campo-grupo">
            <label className="campo-etiqueta">
              <span className="icono-campo">👥</span>
              Pasajeros
            </label>
            <div className="contador-pasajeros">
              <button
                type="button"
                className="btn-contador"
                onClick={() => setPasajeros((prev) => prev - 1)}
                disabled={pasajeros <= 1}
                aria-label="Disminuir pasajeros"
              >
                −
              </button>
              <div className="valor-contador">{pasajeros}</div>
              <button
                type="button"
                className="btn-contador"
                onClick={() => setPasajeros((prev) => prev + 1)}
                aria-label="Aumentar pasajeros"
              >
                +
              </button>
            </div>
          </div>

          <div className="campo-grupo">
            <div className="clases-radios">
              <span className="icono-campo">💺</span>
              {CLASES.map((c) => (
                <label key={c.id} className="radio-opcion">
                  <input
                    type="radio"
                    name="clase"
                    value={c.id}
                    checked={clase === c.id}
                    onChange={() => setClase(c.id)}
                  />
                  <span>{c.nombre}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="total-contenedor">
            <span className="icono-total">🪙</span>
            <span className="total-texto">Total:</span>
            <strong className="total-monto">$ {total.toLocaleString('es-CO')}</strong>
          </div>

          <button type="submit" className="btn-reservar" disabled={!esValido}>
            ✓ Reservar
          </button>
        </form>
      </div>
    </div>
  )
}

export default FormularioReserva
