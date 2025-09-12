export interface CicloAberto {
  id_pesagem: number;
  placa: string;
  motorista: string;
}

export interface HistoricoItem {
  id: number;
  placa: string;
  motorista: string;
  peso_entrada: number;
  peso_saida?: number;
  data_entrada: string;
  data_saida?: string;
  status: string;
}