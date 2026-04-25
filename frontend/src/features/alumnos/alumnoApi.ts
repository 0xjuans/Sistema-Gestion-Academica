import { request } from "../../api/httpClient";
import type { Alumno, AlumnoPayload } from "../../types/domain";

export async function listAlumnos(): Promise<Alumno[]> {
  return request<Alumno[]>("/api/alumnos");
}

export async function createAlumno(payload: AlumnoPayload): Promise<Alumno> {
  return request<Alumno>("/api/alumnos", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateAlumno(id: number, payload: AlumnoPayload): Promise<Alumno> {
  return request<Alumno>(`/api/alumnos/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteAlumno(id: number): Promise<void> {
  await request<void>(`/api/alumnos/${id}`, {
    method: "DELETE",
  });
}
