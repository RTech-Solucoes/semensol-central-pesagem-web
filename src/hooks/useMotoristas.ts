import {useEffect, useState} from 'react';
import {apiClient} from "@/lib/api";
import { useToast } from "@/hooks/use-toast";


export interface Motorista{ 
    id: number;
    nome: string;
}

export function useMotoristas({toast}: {toast: ReturnType<typeof useToast>['toast']}) {
    const [motoristas, setMotoristas] = useState<Motorista[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadMotoristas();
    }, []);

    const loadMotoristas = async () => {
        const response = await apiClient.getMotoristas();
        if (response.error) {
            toast({
                title: "Erro ao carregar motoristas",
                description: response.error.message,
                variant: "destructive",
            });
            return;
        } else if(response.warning) {
            toast({
                title: 'Aviso',
                description: response.warning,
                variant: 'default',
            });
        }
        setLoading(false);
    }
    return {motoristas, loading, reload: loadMotoristas};
}