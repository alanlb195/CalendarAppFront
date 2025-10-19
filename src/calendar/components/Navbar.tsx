import { useAuthStore } from '../../hooks';
import { useThemeStore } from '../../hooks/useThemeStore'
import './Navbar.css'

export const Navbar = () => {
    const { currentTheme, onToggleTheme } = useThemeStore();
    const { startLogout } = useAuthStore();
    const isDark = currentTheme === 'dark';

    return (
        <nav
            className={`custom-navbar d-flex align-items-center justify-content-between px-4 py-2 ${isDark ? 'navbar-dark-theme' : 'navbar-light-theme'
                }`}
        >
            {/* Logo y título */}
            <div className="d-flex align-items-center">
                <div className="logo-circle me-2 d-flex align-items-center justify-content-center">
                    <i className="fas fa-calendar-alt"></i>
                </div>
                <span className="fw-semibold fs-5">Alan Calendar</span>
            </div>

            {/* Acciones */}
            <div className="d-flex align-items-center">
                <button className="btn-logout me-3" onClick={startLogout}>
                    <i className="fas fa-sign-out-alt me-2"></i> Salir
                </button>

                <button className={`btn  ${ isDark ? 'bg-white text-dark' : 'bg-black text-white' }`} onClick={onToggleTheme}>
                    <i
                        className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`}
                    ></i>
                </button>
            </div>
        </nav>
    );
};
