import { useEffect, useMemo, useState, type FormEvent } from "react";
import { HttpError } from "../../../api/httpClient";
import { Button } from "../../../shared/components/Button";
import { FormField } from "../../../shared/components/FormField";
import { SectionCard } from "../../../shared/components/SectionCard";
import type { Materia, MateriaPayload } from "../../../types/domain";
import { createMateria, deleteMateria, listMaterias, updateMateria } from "../materiaApi";
import styles from "./MateriasSection.module.css";

const initialFormState: MateriaPayload = {
  nombre: "",
  codigo: "",
  creditos: 1,
};

export function MateriasSection() {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [formData, setFormData] = useState<MateriaPayload>(initialFormState);
  const [editingMateriaId, setEditingMateriaId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const submitLabel = useMemo(
    () => (editingMateriaId ? "Guardar cambios" : "Registrar materia"),
    [editingMateriaId],
  );

  const loadMaterias = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const data = await listMaterias();
      setMaterias(data);
    } catch (error) {
      setErrorMessage(
        error instanceof HttpError ? error.message : "No fue posible cargar las materias.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadMaterias();
  }, []);

  const handleChange = (name: string, value: string) => {
    setFormData((current) => ({
      ...current,
      [name]: name === "creditos" ? Number(value) : value,
    }));
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setEditingMateriaId(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setFeedbackMessage("");

    try {
      if (editingMateriaId) {
        await updateMateria(editingMateriaId, formData);
        setFeedbackMessage("Materia actualizada correctamente.");
      } else {
        await createMateria(formData);
        setFeedbackMessage("Materia registrada correctamente.");
      }
      resetForm();
      await loadMaterias();
    } catch (error) {
      setErrorMessage(error instanceof HttpError ? error.message : "No fue posible guardar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (materia: Materia) => {
    setFormData({
      nombre: materia.nombre,
      codigo: materia.codigo,
      creditos: materia.creditos,
    });
    setEditingMateriaId(materia.id);
    setFeedbackMessage("");
    setErrorMessage("");
  };

  const handleDelete = async (id: number) => {
    setErrorMessage("");
    setFeedbackMessage("");
    try {
      await deleteMateria(id);
      setFeedbackMessage("Materia eliminada correctamente.");
      if (editingMateriaId === id) {
        resetForm();
      }
      await loadMaterias();
    } catch (error) {
      setErrorMessage(error instanceof HttpError ? error.message : "No fue posible eliminar.");
    }
  };

  return (
    <SectionCard
      title="Gestión de Materias"
      subtitle="Administra materias y créditos académicos"
      actions={
        <Button variant="secondary" onClick={() => void loadMaterias()} disabled={isLoading}>
          Actualizar
        </Button>
      }
    >
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <FormField
            label="Nombre de materia"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <FormField
            label="Código"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
            required
          />
          <FormField
            label="Créditos"
            name="creditos"
            type="number"
            value={formData.creditos}
            min={1}
            onChange={handleChange}
            required
          />
          <div className={styles.formActions}>
            <Button type="submit" disabled={isSubmitting}>
              {submitLabel}
            </Button>
            {editingMateriaId && (
              <Button type="button" variant="secondary" onClick={resetForm}>
                Cancelar edición
              </Button>
            )}
          </div>
        </form>

        {feedbackMessage && <p className={styles.success}>{feedbackMessage}</p>}
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Código</th>
                <th>Créditos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading &&
                materias.map((materia) => (
                  <tr key={materia.id}>
                    <td>{materia.nombre}</td>
                    <td>{materia.codigo}</td>
                    <td>{materia.creditos}</td>
                    <td>
                      <div className={styles.rowActions}>
                        <Button type="button" variant="secondary" onClick={() => handleEdit(materia)}>
                          Editar
                        </Button>
                        <Button
                          type="button"
                          variant="danger"
                          onClick={() => void handleDelete(materia.id)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {isLoading && <p className={styles.info}>Cargando materias...</p>}
          {!isLoading && materias.length === 0 && (
            <p className={styles.info}>No hay materias registradas aún.</p>
          )}
        </div>
      </div>
    </SectionCard>
  );
}
