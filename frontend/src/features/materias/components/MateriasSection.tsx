import { SectionCard } from "../../../shared/components/SectionCard";
import styles from "./MateriasSection.module.css";

// Seccion inicial de materias. En el siguiente hito se conecta al backend.
export function MateriasSection() {
  return (
    <SectionCard
      title="Gestion de Materias"
      subtitle="CRUD de materias con validaciones y componentes compartidos"
    >
      <p className={styles.placeholder}>
        Hito 2: aqui conectaremos Fetch API para listar, crear, editar y eliminar materias.
      </p>
    </SectionCard>
  );
}
