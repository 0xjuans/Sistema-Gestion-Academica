import type { ReactNode } from "react";
import styles from "./AppShell.module.css";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <h1>Sistema de Gestion Academica</h1>
        <p>
          Plataforma responsive para administrar alumnos, materias y notas con una
          experiencia clara y productiva.
        </p>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
