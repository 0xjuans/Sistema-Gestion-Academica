import type { ReactNode } from "react";
import styles from "./SectionCard.module.css";

interface SectionCardProps {
  title: string;
  subtitle: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function SectionCard({ title, subtitle, actions, children }: SectionCardProps) {
  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        {actions}
      </header>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
