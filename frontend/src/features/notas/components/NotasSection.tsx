import { useEffect, useState, type FormEvent } from "react";
import { HttpError } from "../../../api/httpClient";
import { listAlumnos } from "../../../features/alumnos/alumnoApi";
import { listMaterias } from "../../../features/materias/materiaApi";
import { Button } from "../../../shared/components/Button";
import { FormField } from "../../../shared/components/FormField";
import { SectionCard } from "../../../shared/components/SectionCard";
import type { Alumno, Materia, Nota } from "../../../types/domain";
import { createNota, listNotasByAlumno, listNotasByAlumnoAndMateria } from "../notaApi";
import styles from "./NotasSection.module.css";

export function NotasSection() {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [notas, setNotas] = useState<Nota[]>([]);
  const [selectedAlumnoId, setSelectedAlumnoId] = useState("");
  const [selectedMateriaId, setSelectedMateriaId] = useState("");
  const [notaValue, setNotaValue] = useState("3.5");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loadReferenceData = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const [alumnosData, materiasData] = await Promise.all([listAlumnos(), listMaterias()]);
      setAlumnos(alumnosData);
      setMaterias(materiasData);

      const firstAlumnoId = alumnosData.at(0)?.id;
      if (firstAlumnoId) {
        setSelectedAlumnoId(String(firstAlumnoId));
        const notasData = await listNotasByAlumno(firstAlumnoId);
        setNotas(notasData);
      } else {
        setNotas([]);
      }
    } catch (error) {
      setErrorMessage(
        error instanceof HttpError
          ? error.message
          : "No fue posible cargar alumnos, materias y notas.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadReferenceData();
  }, []);

  const handleRegisterNota = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedAlumnoId || !selectedMateriaId) {
      setErrorMessage("Debes seleccionar alumno y materia para registrar la nota.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setFeedbackMessage("");

    try {
      await createNota({
        alumnoId: Number(selectedAlumnoId),
        materiaId: Number(selectedMateriaId),
        valor: Number(notaValue),
      });
      setFeedbackMessage("Nota registrada correctamente.");
      const notasData = await listNotasByAlumno(Number(selectedAlumnoId));
      setNotas(notasData);
    } catch (error) {
      setErrorMessage(error instanceof HttpError ? error.message : "No fue posible registrar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSearch = async () => {
    if (!selectedAlumnoId) {
      setErrorMessage("Selecciona un alumno para consultar sus notas.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setFeedbackMessage("");

    try {
      const notasData = selectedMateriaId
        ? await listNotasByAlumnoAndMateria(Number(selectedAlumnoId), Number(selectedMateriaId))
        : await listNotasByAlumno(Number(selectedAlumnoId));
      setNotas(notasData);
    } catch (error) {
      setErrorMessage(error instanceof HttpError ? error.message : "No fue posible consultar notas.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SectionCard
      title="Gestión de Notas"
      subtitle="Registro y consulta por alumno y por materia"
      actions={
        <Button variant="secondary" onClick={() => void loadReferenceData()} disabled={isLoading}>
          Actualizar
        </Button>
      }
    >
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleRegisterNota}>
          <label className={styles.selectGroup}>
            <span>Alumno</span>
            <select
              className={styles.select}
              value={selectedAlumnoId}
              onChange={(event) => setSelectedAlumnoId(event.target.value)}
              required
            >
              <option value="">Selecciona un alumno</option>
              {alumnos.map((alumno) => (
                <option key={alumno.id} value={alumno.id}>
                  {`${alumno.nombre} ${alumno.apellido}`}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.selectGroup}>
            <span>Materia</span>
            <select
              className={styles.select}
              value={selectedMateriaId}
              onChange={(event) => setSelectedMateriaId(event.target.value)}
              required
            >
              <option value="">Selecciona una materia</option>
              {materias.map((materia) => (
                <option key={materia.id} value={materia.id}>
                  {`${materia.codigo} - ${materia.nombre}`}
                </option>
              ))}
            </select>
          </label>

          <FormField
            label="Nota (0 a 5)"
            name="valor"
            type="number"
            min={0}
            step="0.1"
            value={notaValue}
            onChange={(_, value) => setNotaValue(value)}
            required
          />

          <div className={styles.formActions}>
            <Button type="submit" disabled={isSubmitting}>
              Registrar nota
            </Button>
            <Button type="button" variant="secondary" onClick={() => void handleSearch()}>
              Consultar
            </Button>
          </div>
        </form>

        {feedbackMessage && <p className={styles.success}>{feedbackMessage}</p>}
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Alumno</th>
                <th>Materia</th>
                <th>Código</th>
                <th>Nota</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading &&
                notas.map((nota) => (
                  <tr key={nota.id}>
                    <td>{nota.alumnoNombreCompleto}</td>
                    <td>{nota.materiaNombre}</td>
                    <td>{nota.materiaCodigo}</td>
                    <td>{nota.valor.toFixed(1)}</td>
                    <td>{nota.fechaRegistro}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          {isLoading && <p className={styles.info}>Cargando notas...</p>}
          {!isLoading && notas.length === 0 && (
            <p className={styles.info}>No hay notas para los filtros seleccionados.</p>
          )}
        </div>
      </div>
    </SectionCard>
  );
}
