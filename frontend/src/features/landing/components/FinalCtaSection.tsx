import styles from "./FinalCtaSection.module.css";

interface FinalCtaSectionProps {
  onNavigateToAcademicModule: () => void;
}

export function FinalCtaSection({ onNavigateToAcademicModule }: FinalCtaSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <div>
          <h2>¿Listo para transformar tu gestión académica?</h2>
          <p>
            Únete a instituciones que optimizaron procesos y mejoraron su experiencia
            educativa con una plataforma centralizada.
          </p>
        </div>
        <button type="button" className={styles.ctaPulse} onClick={onNavigateToAcademicModule}>
          Solicitar implementación
        </button>
      </div>
    </section>
  );
}
