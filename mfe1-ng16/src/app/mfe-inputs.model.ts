export type MfeInputs = {
  usuarioId?: string;
  tema?: 'light' | 'dark';
  filtros?: { [k: string]: unknown };
};

export type MfeEvent = {
  type: string;
  payload?: unknown;
};