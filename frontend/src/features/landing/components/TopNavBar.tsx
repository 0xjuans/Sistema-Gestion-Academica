import { useState } from "react";
import styles from "./TopNavBar.module.css";

const links = ["Inicio", "Funcionalidades", "Beneficios", "Testimonios", "Contacto"] as const;

interface TopNavBarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onNavigateToAcademicModule: () => void;
  onNavigateToHome?: () => void;
}

export function TopNavBar({
  isDarkMode,
  onToggleTheme,
  onNavigateToAcademicModule,
  onNavigateToHome,
}: TopNavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen((value) => !value);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavigateHome = () => {
    onNavigateToHome?.();
    handleCloseMenu();
  };

  const handleNavigateModule = () => {
    onNavigateToAcademicModule();
    handleCloseMenu();
  };

  return (
    <header className={styles.navWrapper}>
      <nav className={styles.nav}>
        <button type="button" className={styles.logoButton} onClick={onNavigateToHome}>
          <span className={styles.logo}>EduManage</span>
        </button>
        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link}>
              <button
                type="button"
                className={styles.navLinkButton}
                onClick={link === "Inicio" ? handleNavigateHome : handleNavigateModule}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>
        <div className={styles.actions}>
          <button
            className={styles.themeButton}
            onClick={onToggleTheme}
            aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            <span className={styles.themeTrack}>
              <span className={`${styles.themeThumb} ${isDarkMode ? styles.dark : ""}`}>
                <span className="material-symbols-outlined">
                  {isDarkMode ? "dark_mode" : "light_mode"}
                </span>
              </span>
            </span>
          </button>
          <button type="button" className={styles.loginButton} onClick={handleNavigateModule}>
            Iniciar sesion
          </button>
          <button
            type="button"
            className={`${styles.demoButton} ${styles.ctaPulse}`}
            onClick={handleNavigateModule}
          >
            Solicitar demo
          </button>
          <button
            className={styles.menuButton}
            onClick={handleToggleMenu}
            aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
          >
            <span className="material-symbols-outlined">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      <div className={`${styles.mobilePanel} ${isMenuOpen ? styles.mobilePanelOpen : ""}`}>
        <ul className={styles.mobileLinks}>
          {links.map((link) => (
            <li key={link}>
              <button
                type="button"
                className={styles.mobileLinkButton}
                onClick={link === "Inicio" ? handleNavigateHome : handleNavigateModule}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>
        <div className={styles.mobileActions}>
          <button className={styles.themeButton} onClick={onToggleTheme}>
            <span className={styles.themeTrack}>
              <span className={`${styles.themeThumb} ${isDarkMode ? styles.dark : ""}`}>
                <span className="material-symbols-outlined">
                  {isDarkMode ? "dark_mode" : "light_mode"}
                </span>
              </span>
            </span>
          </button>
          <button type="button" className={styles.loginButton} onClick={handleNavigateModule}>
            Iniciar sesion
          </button>
          <button
            type="button"
            className={`${styles.demoButton} ${styles.ctaPulse}`}
            onClick={handleNavigateModule}
          >
            Solicitar demo
          </button>
        </div>
      </div>
    </header>
  );
}
