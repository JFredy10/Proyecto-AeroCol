import { useState } from 'react'
import './App.css'
import { CIUDADES, VUELOS } from './data/vuelos.js'
import Header from './components/Header.jsx'
import SelectorRuta from './components/SelectorRuta.jsx'
import ListaVuelos from './components/ListaVuelos.jsx'
import FormularioReserva from './components/FormularioReserva.jsx'
import MisReservas from './components/MisReservas.jsx'
import Footer from './components/Footer.jsx'

const CLAVE_STORAGE = 'aerocol-reservas'

// Carga inicial mediante función inicializadora
function cargarReservas() {
  try {
    const guardadas = localStorage.getItem(CLAVE_STORAGE)
    return guardadas ? JSON.parse(guardadas) : []
  } catch {
    return []
  }
}

function nombreCiudad(codigo) {
  return CIUDADES.find((c) => c.codigo === codigo)?.nombre ?? codigo
}

function App() {
  const [origen, setOrigen] = useState('')
  const [destino, setDestino] = useState('')
  const [seleccionado, setSeleccionado] = useState(null)
  const [pestanaActiva, setPestanaActiva] = useState('inicio')

  // F3: Estado para el criterio de ordenamiento
  const [orden, setOrden] = useState('precio-asc')

  // F2: Estado inmutable de reservas sincronizado con localStorage
  const [reservas, setReservas] = useState(cargarReservas)

  const ciudadesDestino = CIUDADES.filter((c) => c.codigo !== origen)
  const vuelosEncontrados =
    origen !== '' && destino !== ''
      ? VUELOS.filter((v) => v.origen === origen && v.destino === destino)
      : []

  // F3: Estado derivado - la lista ordenada se calcula siempre sobre una copia con spread [...]
  const vuelosOrdenados = [...vuelosEncontrados].sort((a, b) => {
    if (orden === 'precio-desc') return b.precio - a.precio
    if (orden === 'hora') return a.hora.localeCompare(b.hora)
    if (orden === 'avion') return a.avion.localeCompare(b.avion)
    return a.precio - b.precio // por defecto 'precio-asc'
  })

  const guardarReservasEnStorage = (nuevasReservas) => {
    try {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(nuevasReservas))
    } catch (error) {
      console.error('Error al guardar en localStorage:', error)
    }
  }

  // Al cambiar la ruta se limpia la selección, pero el criterio de orden se mantiene
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

  // F2: Guardar reserva de manera inmutable
  const manejarReserva = (datosReserva) => {
    const nuevaReserva = {
      ...datosReserva,
      vuelo: {
        ...datosReserva.vuelo,
        origenNombre: nombreCiudad(datosReserva.vuelo.origen),
        destinoNombre: nombreCiudad(datosReserva.vuelo.destino),
      },
    }

    const reservasActualizadas = [...reservas, nuevaReserva]
    setReservas(reservasActualizadas)
    guardarReservasEnStorage(reservasActualizadas)
    setSeleccionado(null)
    setPestanaActiva('reservas')
  }

  // F2: Eliminar reserva de manera inmutable con filter
  const manejarEliminarReserva = (idEliminar) => {
    const reservasActualizadas = reservas.filter((r) => r.id !== idEliminar)
    setReservas(reservasActualizadas)
    guardarReservasEnStorage(reservasActualizadas)
  }

  return (
    <div className="app-layout">
      <Header
        aerolinea="AeroCol"
        eslogan="Tu vuelo en un clic"
        pestanaActiva={pestanaActiva}
        onCambiarPestana={setPestanaActiva}
      />

      <main className="app-main">
        {pestanaActiva === 'reservas' ? (
          /* Vista F2: Mis Reservas */
          <div className="vista-reservas-contenedor">
            <MisReservas
              reservas={reservas}
              onEliminar={manejarEliminarReserva}
              onIrABuscar={() => setPestanaActiva('inicio')}
            />
          </div>
        ) : (
          /* Vista Principal: Búsqueda (F3) y Reserva (F1) */
          <>
            <section className="selector-flotante">
              <div className="selector-tarjeta">
                <SelectorRuta
                  origen={origen}
                  destino={destino}
                  ciudades={CIUDADES}
                  ciudadesDestino={ciudadesDestino}
                  onOrigen={manejarOrigen}
                  onDestino={manejarDestino}
                  orden={orden}
                  onOrden={setOrden}
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

            {!origen || !destino ? (
              <p className="mensaje mensaje-info">
                Elige origen y destino para buscar vuelos 🛫
              </p>
            ) : vuelosOrdenados.length === 0 ? (
              <p className="mensaje mensaje-vacio">No hay vuelos para esa ruta 🙃</p>
            ) : (
              <div className={`layout-contenido ${seleccionado ? 'con-panel-reserva' : ''}`}>
                <div className="columna-resultados">
                  <ListaVuelos
                    vuelos={vuelosOrdenados}
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
          </>
        )}
      </main>

      <Footer anio={2026} />
    </div>
  )
}

export default App
