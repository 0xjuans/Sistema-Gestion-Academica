import type { ApiError } from "../types/api";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export class HttpError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function parseJson<T>(response: Response): Promise<T | null> {
  const text = await response.text();
  if (!text) {
    return null;
  }
  return JSON.parse(text) as T;
}

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    const apiError = await parseJson<ApiError>(response);
    throw new HttpError(apiError?.message ?? "Error inesperado en API", response.status);
  }

  const body = await parseJson<T>(response);
  return body as T;
}
