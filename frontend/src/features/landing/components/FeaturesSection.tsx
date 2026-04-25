import { featureCards } from "../data/content";
import styles from "./FeaturesSection.module.css";

export function FeaturesSection() {
  return (
    <section className={`${styles.section} js-features`}>
      <header className={styles.header}>
        <h2>Todo lo que necesitas en un solo lugar</h2>
        <p>
          Modulos integrados para cubrir cada aspecto operativo y academico de tu
          institucion.
        </p>
      </header>

      <div className={styles.grid}>
        {featureCards.map((feature) => (
          <article key={feature.title} className={`${styles.card} js-feature-card`}>
            <div className={styles.icon} aria-hidden="true">
              <span className="material-symbols-outlined">{feature.icon}</span>
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
