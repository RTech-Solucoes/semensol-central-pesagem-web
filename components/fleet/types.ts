export interface Truck {
    id: number;
    placa: string;
    modelo?: string;
    empresa?: string;
}

export interface VehicleFormData {
    placa: string;
    modelo: string;
    empresa: string;
    imagem: File | null;
}

export interface TabsContentManualProps {
    formData: VehicleFormData;
    setFormData: React.Dispatch<React.SetStateAction<VehicleFormData>>;
    submitLoading: boolean;
    setIsModalOpen: (value: boolean) => void;
    handleManualSubmit: (e: React.FormEvent) => void;
}

export interface TabsContentImageProps {
    formData: VehicleFormData;
    setFormData: React.Dispatch<React.SetStateAction<VehicleFormData>>;
    submitLoading: boolean;
    setIsModalOpen: (value: boolean) => void;
    handleImageSubmit: (e: React.FormEvent) => void;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface AddVehicleModalProps {
    children: React.ReactNode;
    onVehicleAdded?: () => void;
}

export interface CardFleetContentProps {
    loading: boolean;
    trucks: Truck[];
}
