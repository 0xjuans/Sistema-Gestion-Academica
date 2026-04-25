import { trustMetrics } from "../data/content";
import styles from "./TrustMetricsSection.module.css";

function parseMetricValue(value: string) {
  const prefix = value.startsWith("+") ? "+" : "";
  const suffix = value.includes("%") ? "%" : value.toLowerCase().includes("k") ? "k" : "";
  const numericPart = Number.parseInt(value.replace(/\D/g, ""), 10);
  return { prefix, suffix, numericPart };
}

export function TrustMetricsSection() {
  return (
    <section className={`${styles.section} js-metrics`}>
      <div className={styles.grid}>
        {trustMetrics.map((metric) => {
          const parsed = parseMetricValue(metric.value);
          return (
            <article key={metric.label} className={`${styles.card} js-metric-card`}>
              <strong
                className="js-metric-value"
                data-target={parsed.numericPart}
                data-prefix={parsed.prefix}
                data-suffix={parsed.suffix}
              >
                {`${parsed.prefix}0${parsed.suffix}`}
              </strong>
              <span>{metric.label}</span>
            </article>
          );
        })}
      </div>
    </section>
  );
}
