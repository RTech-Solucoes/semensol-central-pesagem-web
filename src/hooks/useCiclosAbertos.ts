"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { CicloAberto } from "@/types/dashboard";

export function useCiclosAbertos({ toast }: { toast: ReturnType<typeof useToast>["toast"] }) {
  const [ciclosAbertos, setCiclosAbertos] = useState<CicloAberto[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCiclosAbertos();
  }, []);

  const loadCiclosAbertos = async () => {
    setLoading(true);
    const response = await apiClient.getCiclosAbertos();

    if (response.error) {
      toast({
        title: "Erro ao carregar ciclos",
        description: response.error?.message,
        variant: "destructive",
      });
    } else if (response.data) {
      setCiclosAbertos(response.data);
    }

    if (response.warning) {
      toast({
        title: "Aviso",
        description: response.warning,
        variant: "default",
      });
    }
    setLoading(false);
  };

  return { ciclosAbertos, loading, reload: loadCiclosAbertos };
}
