export interface Driver {
  id: number;
  name: string;
  document: string;
  cpf: string;
  phone: string;
  email: string;
  status: "Ativo" | "Inativo" | "Suspenso";
  company?: string;
  experience?: string;
  category?: string;
}


export interface DriverCardProps {
  driver: Driver;
  onEdit?: (driver: Driver) => void;
}