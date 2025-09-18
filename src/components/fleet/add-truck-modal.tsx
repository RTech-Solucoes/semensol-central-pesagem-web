import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@chakra-ui/react";
import { TextField } from "@/components/ui/text-field";
import { Label } from "@/components/ui/label";
import Select from "@/components/ui/select";
import { useState } from "react";
import { CameraCapture } from "@/components/ui/camera-capture";
import { IconCamera, IconTruck } from "@tabler/icons-react";

interface Truck {
  id: number;
  plate: string;
  model: string;
  company: string;
  capacity: string;
  status: "Ativo" | "Manutenção" | "Inativo";
  observations: string;
}

interface AddTruckModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (truck: Omit<Truck, "id">) => void;
}

export function AddTruckModal({ open, onOpenChange, onSave }: AddTruckModalProps) {
  const [formData, setFormData] = useState({
    plate: "",
    model: "",
    company: "",
    capacity: "",
    status: "Ativo" as Truck["status"],
    observations: "",
  });

  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);

  const handleSave = () => {
    if (!formData.plate || !formData.model || !formData.company) {
      alert("Por favor, preencha os campos obrigatórios");
      return;
    }

    onSave(formData);

    setFormData({
      plate: "",
      model: "",
      company: "",
      capacity: "",
      status: "Ativo",
      observations: "",
    });
    setPhoto(null);
    setPhotoPreview(null);

    onOpenChange(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoCapture = (capturedPhoto: File) => {
    setPhoto(capturedPhoto);
    const previewUrl = URL.createObjectURL(capturedPhoto);
    setPhotoPreview(previewUrl);
  };

  const removePhoto = () => {
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
    }
    setPhoto(null);
    setPhotoPreview(null);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Novo Caminhão</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Foto do Veículo</Label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <IconTruck className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={() => setCameraOpen(true)}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <IconCamera className="h-4 w-4" />
                    {photoPreview ? "Trocar Foto" : "Tirar Foto"}
                  </Button>
                  {photoPreview && (
                    <Button
                      type="button"
                      onClick={removePhoto}
                      variant="outline"
                      size="sm"
                    >
                      Remover
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <TextField
                id="plate"
                label="Placa"
                required
                value={formData.plate}
                onChange={(value) => handleChange("plate", value.toUpperCase())}
                placeholder="ABC-1234"
                maxLength={8}
              />
              <TextField
                id="model"
                label="Modelo"
                required
                value={formData.model}
                onChange={(value) => handleChange("model", value)}
                placeholder="Ex: Mercedes-Benz Axor 2644"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <TextField
                id="company"
                label="Empresa"
                required
                value={formData.company}
                onChange={(value) => handleChange("company", value)}
                placeholder="Nome da empresa proprietária"
              />
              <TextField
                id="capacity"
                label="Capacidade"
                value={formData.capacity}
                onChange={(value) => handleChange("capacity", value)}
                placeholder="Ex: 30.000 kg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleChange("status", value as Truck["status"])}
                items={[
                  { label: "Ativo", value: "Ativo" },
                  { label: "Manutenção", value: "Manutenção" },
                  { label: "Inativo", value: "Inativo" },
                ]}
                grouped
                groups={[]}
              />
            </div>

            <TextField
              id="observations"
              label="Observações"
              textarea
              rows={3}
              value={formData.observations}
              onChange={(value) => handleChange("observations", value)}
              placeholder="Informações adicionais sobre o caminhão"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="subtle" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-primary-900 hover:bg-primary-900/80">
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {cameraOpen && (
        <CameraCapture
          open={cameraOpen}
          onOpenChange={setCameraOpen}
          onCapture={handlePhotoCapture}
        />
      )}
    </>
  );
}
