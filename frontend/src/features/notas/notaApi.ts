import { request } from "../../api/httpClient";
import type { Nota, NotaPayload } from "../../types/domain";

export async function createNota(payload: NotaPayload): Promise<Nota> {
  return request<Nota>("/api/notas", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function listNotasByAlumno(alumnoId: number): Promise<Nota[]> {
  return request<Nota[]>(`/api/notas/alumno/${alumnoId}`);
}

export async function listNotasByAlumnoAndMateria(
  alumnoId: number,
  materiaId: number,
): Promise<Nota[]> {
  return request<Nota[]>(`/api/notas/alumno/${alumnoId}/materia/${materiaId}`);
}
