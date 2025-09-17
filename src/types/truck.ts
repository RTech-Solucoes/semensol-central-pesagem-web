export interface Truck {
  id: number;
  plate: string;
  model: string;
  company: string;
  capacity: string;
  status: "Ativo" | "Manutenção" | "Inativo";
  observations: string;
}
