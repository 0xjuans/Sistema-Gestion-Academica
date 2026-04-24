import { AlumnosSection } from "../features/alumnos/components/AlumnosSection";
import { MateriasSection } from "../features/materias/components/MateriasSection";
import { NotasSection } from "../features/notas/components/NotasSection";
import { AppShell } from "../shared/layout/AppShell";
import styles from "./App.module.css";

export function App() {
  return (
    <AppShell>
      <div className={styles.grid}>
        <AlumnosSection />
        <MateriasSection />
        <NotasSection />
      </div>
    </AppShell>
  );
}
