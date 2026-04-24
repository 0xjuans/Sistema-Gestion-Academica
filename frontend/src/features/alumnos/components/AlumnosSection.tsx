import { SectionCard } from "../../../shared/components/SectionCard";
import styles from "./AlumnosSection.module.css";

// Seccion inicial de alumnos. En el siguiente hito se conecta al backend.
export function AlumnosSection() {
  return (
    <SectionCard
      title="Gestion de Alumnos"
      subtitle="CRUD de alumnos con formulario reutilizable y tabla responsive"
    >
      <p className={styles.placeholder}>
        Hito 2: aqui conectaremos Fetch API para listar, crear, editar y eliminar alumnos.
      </p>
    </SectionCard>
  );
}
