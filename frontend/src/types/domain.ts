export interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento: string;
}

export interface Materia {
  id: number;
  nombre: string;
  codigo: string;
  creditos: number;
}

export interface Nota {
  id: number;
  valor: number;
  fechaRegistro: string;
  alumnoId: number;
  alumnoNombreCompleto: string;
  materiaId: number;
  materiaNombre: string;
  materiaCodigo: string;
}
export interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento: string;
}

export interface Materia {
  id: number;
  nombre: string;
  codigo: string;
  creditos: number;
}

export interface Nota {
  id: number;
  valor: number;
  fechaRegistro: string;
  alumnoId: number;
  alumnoNombreCompleto: string;
  materiaId: number;
  materiaNombre: string;
  materiaCodigo: string;
}

export interface AlumnoPayload {
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento: string;
}

export interface MateriaPayload {
  nombre: string;
  codigo: string;
  creditos: number;
}

export interface NotaPayload {
  valor: number;
  alumnoId: number;
  materiaId: number;
}
