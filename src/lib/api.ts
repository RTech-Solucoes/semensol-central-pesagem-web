const BASE_URL = 'https://develop.api.semensol.rtechsolution.com.br/api';

interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  message?: string;
  warning?: string;
}

interface ApiError {
  code: string;
  message: string;
}

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          error: errorData.error || errorData.erro || errorData.message || `Erro ${response.status}: ${response.statusText}`
        };
      }

      const data = await response.json();

      if (data && typeof data === 'object' && data.message) {
        return {
          data,
          warning: data.message
        };
      }

      return { data };
    } catch (error) {
      console.error('API Error:', error);
      return {
        error: {
          code: "network_error",
          message:
            "Erro de conexão com o servidor. Verifique sua internet e tente novamente.",
        },
      };
    }
  }

  async getMotoristas(): Promise<ApiResponse<{ id: number; nome: string }[]>> {
    return this.request('/motorista/listar');
  }

  async registrarEntrada(data: {
    placa: string;
    motorista_id: number;
    peso: number;
  }): Promise<ApiResponse<{ id_evento: number }>> {
    return this.request('/balanca/entrada', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }

  async registrarSaida(data: {
    evento_id: number;
    peso: number;
  }): Promise<ApiResponse<void>> {
    return this.request('/balanca/saida', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }

  async getCiclosAbertos(): Promise<ApiResponse<{
    id_pesagem: number;
    placa: string;
    motorista: string;
  }[]>> {
    return this.request('/balanca/ciclos-abertos');
  }

  async getHistorico(): Promise<ApiResponse<any[]>> {
    return this.request('/balanca/historico');
  }

  async cadastrarMotorista(formData: FormData): Promise<ApiResponse<any>> {
    return this.request('/cadastro/motorista', {
      method: 'POST',
      body: formData,
    });
  }

  async cadastrarCaminhaoManual(data: {
    placa: string;
    modelo: string;
    empresa: string;
  }): Promise<ApiResponse<{ id_caminhao: number }>> {
    return this.request('/cadastro/caminhao/manual', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }

  async cadastrarCaminhaoPorImagem(formData: FormData): Promise<ApiResponse<{
    id_caminhao: number;
    placa: string;
  }>> {
    return this.request('/cadastro/caminhao/imagem', {
      method: 'POST',
      body: formData,
    });
  }

  async reconhecimentoCompleto(formData: FormData): Promise<ApiResponse<{
    id_motorista: number;
    motorista_id?: number;
    nome?: string;
    confianca_motorista?: number;
    placa_reconhecida?: string;
    placa_valida: boolean;
  }>> {
    return this.request('/reconhecimento/completo', {
      method: 'POST',
      body: formData,
    });
  }

  async reconhecerMotorista(formData: FormData): Promise<ApiResponse<{
    motorista: {
      id_motorista: number;
      nome: string;
      confianca: number;
    };
    ok: boolean;
  }>> {
    return this.request('/reconhecimento/motorista', {
      method: 'POST',
      body: formData,
    });
  }

  async reconhecerPlaca(formData: FormData): Promise<ApiResponse<{
    placa: string;
  }>> {
    return this.request('/reconhecimento/caminhao', {
      method: 'POST',
      body: formData,
    });
  }

  async getCaminhoes(): Promise<ApiResponse<{
    id: number;
    placa: string;
  }[]>> {
    return this.request('/caminhao/listar');
  }
}

export const apiClient = new ApiClient();
