import { request } from "../../api/httpClient";
import type { Materia, MateriaPayload } from "../../types/domain";

export async function listMaterias(): Promise<Materia[]> {
  return request<Materia[]>("/api/materias");
}

export async function createMateria(payload: MateriaPayload): Promise<Materia> {
  return request<Materia>("/api/materias", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateMateria(id: number, payload: MateriaPayload): Promise<Materia> {
  return request<Materia>(`/api/materias/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteMateria(id: number): Promise<void> {
  await request<void>(`/api/materias/${id}`, {
    method: "DELETE",
  });
}
