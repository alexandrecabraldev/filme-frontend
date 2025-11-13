import { CreateFilmePayload, Filme, UpdateFilmePayload } from "@/types/movie";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  if (res.status === 204) return undefined as unknown as T;
  return (await res.json()) as T;
}

export const api = {
  async listFilmes(): Promise<Filme[]> {
    const res = await fetch(`${API_BASE}/filmes`, { cache: "no-store" });
    return handle(res);
  },
  async createFilme(payload: CreateFilmePayload): Promise<Filme> {
    const res = await fetch(`${API_BASE}/filmes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return handle(res);
  },
  async getFilme(id: string): Promise<Filme> {
    const res = await fetch(`${API_BASE}/filmes/${id}`, { cache: "no-store" });
    return handle(res);
  },
  async updateFilme(id: string, payload: UpdateFilmePayload): Promise<Filme> {
    const res = await fetch(`${API_BASE}/filmes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return handle(res);
  },
  async deleteFilme(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/filmes/${id}`, { method: "DELETE" });
    await handle(res);
  },
};
