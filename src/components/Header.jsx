import logoImg from '../assets/logo.png'
import heroBannerInicio from '../assets/hero-banner.jpg'
import heroBannerReservas from '../assets/hero-banner-reservas.jpg'

function Header({
  aerolinea = 'AeroCol',
  eslogan = 'Tu vuelo en un clic',
  pestanaActiva = 'inicio',
  onCambiarPestana,
}) {
  const esVistaReservas = pestanaActiva === 'reservas'
  const bannerActual = esVistaReservas ? heroBannerReservas : heroBannerInicio

  return (
    <header className="header-completo">
      {/* Barra superior de navegación */}
      <nav className="nav-superior">
        <div className="nav-contenedor">
          <div
            className="logo-contenedor"
            onClick={() => onCambiarPestana?.('inicio')}
            style={{ cursor: 'pointer' }}
            title="Ir a Inicio"
          >
            <img src={logoImg} alt={aerolinea} className="logo-img" />
          </div>

          <div className="nav-enlaces">
            <button
              type="button"
              className={`nav-enlace-btn ${pestanaActiva === 'inicio' ? 'activo' : ''}`}
              onClick={() => onCambiarPestana?.('inicio')}
            >
              <span className="nav-icono">🏠</span>
              <span>Inicio</span>
            </button>
            <button
              type="button"
              className={`nav-enlace-btn ${pestanaActiva === 'vuelos' ? 'activo' : ''}`}
              onClick={() => onCambiarPestana?.('inicio')}
            >
              <span className="nav-icono">✈</span>
              <span>Vuelos</span>
            </button>
            <button
              type="button"
              className={`nav-enlace-btn ${pestanaActiva === 'reservas' ? 'activo' : ''}`}
              onClick={() => onCambiarPestana?.('reservas')}
            >
              <span className="nav-icono">🧳</span>
              <span>Mis reservas</span>
            </button>
          </div>

          <div className="nav-usuario">
            <span className="usuario-icono">👤</span>
            <span className="usuario-nombre">Mi cuenta</span>
            <span className="usuario-flecha">⌵</span>
          </div>
        </div>
      </nav>

      {/* Hero Banner visual según la pestaña activa */}
      <div className="hero-banner-wrap">
        <img
          src={bannerActual}
          alt={esVistaReservas ? 'Mis reservas' : eslogan}
          className="hero-banner-img"
        />
      </div>
    </header>
  )
}

export default Header
