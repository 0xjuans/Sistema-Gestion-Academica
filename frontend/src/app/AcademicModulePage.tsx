import { useMemo, useState } from "react";
import { AlumnosSection } from "../features/alumnos/components/AlumnosSection";
import { MateriasSection } from "../features/materias/components/MateriasSection";
import { NotasSection } from "../features/notas/components/NotasSection";
import { AppShell } from "../shared/layout/AppShell";
import styles from "./AcademicModulePage.module.css";

type ModuleTab = "alumnos" | "materias" | "notas";

export function AcademicModulePage() {
  const [activeTab, setActiveTab] = useState<ModuleTab>("alumnos");

  const activeContent = useMemo(() => {
    if (activeTab === "alumnos") {
      return <AlumnosSection />;
    }
    if (activeTab === "materias") {
      return <MateriasSection />;
    }
    return <NotasSection />;
  }, [activeTab]);

  return (
    <section className={styles.wrapper}>
      <AppShell>
        <div className={styles.tabBar} role="tablist" aria-label="Navegación de módulos académicos">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "alumnos"}
            className={`${styles.tabButton} ${activeTab === "alumnos" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("alumnos")}
          >
            Gestión de Alumnos
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "materias"}
            className={`${styles.tabButton} ${activeTab === "materias" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("materias")}
          >
            Gestión de Materias
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "notas"}
            className={`${styles.tabButton} ${activeTab === "notas" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("notas")}
          >
            Gestión de Notas
          </button>
        </div>
        <div className={styles.modulePanel} role="tabpanel">
          {activeContent}
        </div>
      </AppShell>
    </section>
  );
}
