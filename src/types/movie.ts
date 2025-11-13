export type Ator = {
  id?: string;
  nome: string;
};

export type Filme = {
  id: string;
  titulo: string;
  faixaEtaria: string; // ex: "12", "16"
  genero: string; // ex: "Ação", "Ficção"
  atores: Ator[];
};

export type CreateFilmePayload = {
  titulo: string;
  faixaEtaria: string;
  genero: string;
  atores: { nome: string }[]; // backend também aceita ID no campo nome, conforme instrução
};

export type UpdateFilmePayload = {
  titulo?: string;
  faixaEtaria?: string;
  genero?: string;
  atorIds?: string[]; // IDs de atores existentes
  atores?: { nome: string }[]; // novos atores a criar/associar
};
