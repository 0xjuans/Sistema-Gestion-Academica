import { useEffect, useMemo, useState, type FormEvent } from "react";
import { HttpError } from "../../../api/httpClient";
import { Button } from "../../../shared/components/Button";
import { FormField } from "../../../shared/components/FormField";
import { SectionCard } from "../../../shared/components/SectionCard";
import type { Alumno, AlumnoPayload } from "../../../types/domain";
import { createAlumno, deleteAlumno, listAlumnos, updateAlumno } from "../alumnoApi";
import styles from "./AlumnosSection.module.css";

const initialFormState: AlumnoPayload = {
  nombre: "",
  apellido: "",
  email: "",
  fechaNacimiento: "",
};

export function AlumnosSection() {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [formData, setFormData] = useState<AlumnoPayload>(initialFormState);
  const [editingAlumnoId, setEditingAlumnoId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const submitLabel = useMemo(
    () => (editingAlumnoId ? "Guardar cambios" : "Registrar alumno"),
    [editingAlumnoId],
  );

  const loadAlumnos = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const data = await listAlumnos();
      setAlumnos(data);
    } catch (error) {
      setErrorMessage(
        error instanceof HttpError ? error.message : "No fue posible cargar los alumnos.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadAlumnos();
  }, []);

  const handleChange = (name: string, value: string) => {
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setEditingAlumnoId(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setFeedbackMessage("");

    try {
      if (editingAlumnoId) {
        await updateAlumno(editingAlumnoId, formData);
        setFeedbackMessage("Alumno actualizado correctamente.");
      } else {
        await createAlumno(formData);
        setFeedbackMessage("Alumno registrado correctamente.");
      }
      resetForm();
      await loadAlumnos();
    } catch (error) {
      setErrorMessage(error instanceof HttpError ? error.message : "No fue posible guardar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (alumno: Alumno) => {
    setFormData({
      nombre: alumno.nombre,
      apellido: alumno.apellido,
      email: alumno.email,
      fechaNacimiento: alumno.fechaNacimiento,
    });
    setEditingAlumnoId(alumno.id);
    setFeedbackMessage("");
    setErrorMessage("");
  };

  const handleDelete = async (id: number) => {
    setErrorMessage("");
    setFeedbackMessage("");
    try {
      await deleteAlumno(id);
      setFeedbackMessage("Alumno eliminado correctamente.");
      if (editingAlumnoId === id) {
        resetForm();
      }
      await loadAlumnos();
    } catch (error) {
      setErrorMessage(error instanceof HttpError ? error.message : "No fue posible eliminar.");
    }
  };

  return (
    <SectionCard
      title="Gestion de Alumnos"
      subtitle="Administra alumnos de forma centralizada"
      actions={
        <Button variant="secondary" onClick={() => void loadAlumnos()} disabled={isLoading}>
          Actualizar
        </Button>
      }
    >
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <FormField
            label="Nombres"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <FormField
            label="Apellidos"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
          <FormField
            label="Correo electronico"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <FormField
            label="Fecha de nacimiento"
            name="fechaNacimiento"
            type="date"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            required
          />
          <div className={styles.formActions}>
            <Button type="submit" disabled={isSubmitting}>
              {submitLabel}
            </Button>
            {editingAlumnoId && (
              <Button type="button" variant="secondary" onClick={resetForm}>
                Cancelar edicion
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
                <th>Alumno</th>
                <th>Email</th>
                <th>Nacimiento</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading &&
                alumnos.map((alumno) => (
                  <tr key={alumno.id}>
                    <td>{`${alumno.nombre} ${alumno.apellido}`}</td>
                    <td>{alumno.email}</td>
                    <td>{alumno.fechaNacimiento}</td>
                    <td>
                      <div className={styles.rowActions}>
                        <Button type="button" variant="secondary" onClick={() => handleEdit(alumno)}>
                          Editar
                        </Button>
                        <Button
                          type="button"
                          variant="danger"
                          onClick={() => void handleDelete(alumno.id)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {isLoading && <p className={styles.info}>Cargando alumnos...</p>}
          {!isLoading && alumnos.length === 0 && (
            <p className={styles.info}>No hay alumnos registrados aun.</p>
          )}
        </div>
      </div>
    </SectionCard>
  );
}
