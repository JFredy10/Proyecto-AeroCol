import { useState } from 'react'
import './App.css'
import { CIUDADES, VUELOS } from './data/vuelos.js'
import Header from './components/Header.jsx'
import SelectorRuta from './components/SelectorRuta.jsx'
import ListaVuelos from './components/ListaVuelos.jsx'
import FormularioReserva from './components/FormularioReserva.jsx'
import Footer from './components/Footer.jsx'

function nombreCiudad(codigo) {
  return CIUDADES.find((c) => c.codigo === codigo)?.nombre ?? codigo
}

function App() {
  const [origen, setOrigen] = useState('')
  const [destino, setDestino] = useState('')
  const [seleccionado, setSeleccionado] = useState(null)

  const ciudadesDestino = CIUDADES.filter((c) => c.codigo !== origen)
  const vuelosEncontrados =
    origen !== '' && destino !== ''
      ? VUELOS.filter((v) => v.origen === origen && v.destino === destino)
      : []

  const manejarOrigen = (codigo) => {
    setOrigen(codigo)
    if (codigo === destino) setDestino('')
    setSeleccionado(null)
  }

  const manejarDestino = (codigo) => {
    setDestino(codigo)
    setSeleccionado(null)
  }

  const intercambiar = () => {
    setOrigen(destino)
    setDestino(origen)
    setSeleccionado(null)
  }

  const manejarReserva = (datosReserva) => {
    // F1: confirmación visual y registro en consola
    alert(
      `¡Reserva confirmada con éxito!\n\nPasajero: ${datosReserva.nombre}\nClase: ${datosReserva.claseNombre} (${datosReserva.pasajeros} pasajero/s)\nTotal: $ ${datosReserva.total.toLocaleString('es-CO')}`
    )
  }

  return (
    <div className="app-layout">
      <Header aerolinea="AeroCol" eslogan="Tu vuelo en un clic" />

      <main className="app-main">
        {/* Barra flotante de búsqueda / selección de ruta */}
        <section className="selector-flotante">
          <div className="selector-tarjeta">
            <SelectorRuta
              origen={origen}
              destino={destino}
              ciudades={CIUDADES}
              ciudadesDestino={ciudadesDestino}
              onOrigen={manejarOrigen}
              onDestino={manejarDestino}
            />

            <div className="selector-acciones">
              <button
                type="button"
                className="btn-intercambiar"
                onClick={intercambiar}
                disabled={!origen || !destino}
                title="Intercambiar origen y destino"
              >
                🔄
              </button>
              <button
                type="button"
                className="btn-buscar"
                disabled={!origen || !destino}
              >
                🔍 Buscar
              </button>
            </div>
          </div>
        </section>

        {/* Mensajes informativos de estado */}
        {!origen || !destino ? (
          <p className="mensaje mensaje-info">
            Elige origen y destino para buscar vuelos 🛫
          </p>
        ) : vuelosEncontrados.length === 0 ? (
          <p className="mensaje mensaje-vacio">No hay vuelos para esa ruta 🙃</p>
        ) : (
          /* Contenido de vuelos y formulario de reserva F1 */
          <div className={`layout-contenido ${seleccionado ? 'con-panel-reserva' : ''}`}>
            <div className="columna-resultados">
              <ListaVuelos
                vuelos={vuelosEncontrados}
                nombreOrigen={nombreCiudad(origen)}
                nombreDestino={nombreCiudad(destino)}
                vueloSeleccionado={seleccionado}
                onSeleccionar={setSeleccionado}
              />
            </div>

            {seleccionado && (
              <aside className="columna-formulario">
                <FormularioReserva
                  vuelo={seleccionado}
                  nombreOrigen={nombreCiudad(origen)}
                  nombreDestino={nombreCiudad(destino)}
                  onReservar={manejarReserva}
                />
              </aside>
            )}
          </div>
        )}
      </main>

      <Footer anio={2026} />
    </div>
  )
}

export default App
