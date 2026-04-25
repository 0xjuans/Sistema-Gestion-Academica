import styles from "./HeroSection.module.css";

interface HeroSectionProps {
  onNavigateToAcademicModule: () => void;
}

export function HeroSection({ onNavigateToAcademicModule }: HeroSectionProps) {
  return (
    <section className={`${styles.section} js-hero-section`}>
      <div className={`${styles.content} js-hero-animate js-hero-content`}>
        <div className={`${styles.badge} js-hero-animate`}>La plataforma integral para educación</div>
        <h1 className="js-hero-animate">
          Gestiona tu institución educativa con <span>eficiencia</span>
        </h1>
        <p className="js-hero-animate">
          Centraliza la administración, simplifica la comunicación y empodera a docentes con una
          solución moderna para el entorno académico.
        </p>
        <div className={`${styles.ctaRow} js-hero-animate`}>
          <button
            type="button"
            className={`${styles.primaryButton} ${styles.ctaPulse}`}
            onClick={onNavigateToAcademicModule}
          >
            Comenzar ahora
          </button>
          <button
            type="button"
            className={`${styles.secondaryButton} ${styles.ctaPulseSoft}`}
            onClick={onNavigateToAcademicModule}
          >
            Ver demo
          </button>
        </div>
      </div>

      <div className={`${styles.visual} js-hero-animate js-hero-visual`}>
        <div className={`${styles.dashboard} js-hero-dashboard`}>
          <div className={styles.dashboardTop}>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <strong>Panel Académico</strong>
          </div>

          <div className={styles.chartCard}>
            <p className={styles.chartTitle}>Rendimiento Sostenible (Últimos 7 días)</p>
            <div className={styles.chartArea}>
              <div className={styles.gridLines}></div>
              <div className={styles.bars}>
                <span className="js-chart-bar" style={{ height: "26%" }}></span>
                <span className="js-chart-bar" style={{ height: "40%" }}></span>
                <span className="js-chart-bar" style={{ height: "54%" }}></span>
                <span className="js-chart-bar" style={{ height: "35%" }}></span>
                <span className="js-chart-bar" style={{ height: "47%" }}></span>
                <span className="js-chart-bar" style={{ height: "66%" }}></span>
                <span className="js-chart-bar" style={{ height: "58%" }}></span>
              </div>
              <svg
                className={`${styles.line} js-chart-line`}
                viewBox="0 0 320 120"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <polyline
                  className="js-chart-polyline"
                  points="0,95 45,84 90,78 135,86 180,72 225,54 270,60 320,38"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className={`${styles.floatingCard} js-hero-floating-card`}>
          <strong>Rendimiento Académico</strong>
          <span>+15% este trimestre</span>
        </div>
      </div>
    </section>
  );
}
