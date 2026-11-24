import TarjetaVuelo from './TarjetaVuelo.jsx'

function ListaVuelos({ vuelos, nombreOrigen, nombreDestino, vueloSeleccionado, onSeleccionar }) {
  return (
    <section className="lista">
      <div className="lista-badge-header">
        <span className="badge-vuelos-icono">✈</span>
        <span>
          Vuelos encontrados: {vuelos.length}
        </span>
      </div>
      <ul className="vuelos-grid">
        {vuelos.map((v) => (
          <TarjetaVuelo
            key={v.id}
            vuelo={v}
            seleccionado={vueloSeleccionado?.id === v.id}
            onSeleccionar={onSeleccionar}
            nombreOrigen={nombreOrigen}
            nombreDestino={nombreDestino}
          />
        ))}
      </ul>
    </section>
  )
}

export default ListaVuelos
