import { SectionCard } from "../../../shared/components/SectionCard";
import styles from "./NotasSection.module.css";

// Seccion inicial de notas. En el siguiente hito se conecta al backend.
export function NotasSection() {
  return (
    <SectionCard
      title="Gestion de Notas"
      subtitle="Registro y consulta de notas por alumno y por materia"
    >
      <p className={styles.placeholder}>
        Hito 2: aqui conectaremos Fetch API para registrar notas y filtrarlas.
      </p>
    </SectionCard>
  );
}
