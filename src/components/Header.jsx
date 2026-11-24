import logoImg from '../assets/logo.png'
import heroBanner from '../assets/hero-banner.jpg'

function Header({ aerolinea = 'AeroCol', eslogan = 'Tu vuelo en un clic' }) {
  return (
    <header className="header-completo">
      {/* Barra superior de navegación */}
      <nav className="nav-superior">
        <div className="nav-contenedor">
          <div className="logo-contenedor">
            <img src={logoImg} alt={aerolinea} className="logo-img" />
          </div>

          <div className="nav-enlaces">
            <a href="#inicio" className="nav-enlace activo">
              <span className="nav-icono">🏠</span>
              <span>Inicio</span>
            </a>
            <a href="#vuelos" className="nav-enlace">
              <span className="nav-icono">✈</span>
              <span>Vuelos</span>
            </a>
            <a href="#reservas" className="nav-enlace">
              <span className="nav-icono">🧳</span>
              <span>Mis reservas</span>
            </a>
          </div>

          <div className="nav-usuario">
            <span className="usuario-icono">👤</span>
            <span className="usuario-nombre">Mi cuenta</span>
            <span className="usuario-flecha">⌵</span>
          </div>
        </div>
      </nav>

      {/* Hero Banner visual */}
      <div className="hero-banner-wrap">
        <img src={heroBanner} alt={eslogan} className="hero-banner-img" />
      </div>
    </header>
  )
}

export default Header
