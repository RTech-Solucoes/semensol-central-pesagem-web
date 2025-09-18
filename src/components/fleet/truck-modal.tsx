"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { CameraCapture } from "@/components/ui/camera-capture";
import {
  CameraIcon,
  TrashIcon,
  TruckIcon,
} from "@phosphor-icons/react";
import { Label } from "@radix-ui/react-label";

export interface Truck {
  id: number;
  plate: string;
  model: string;
  company: string;
  capacity: string;
  status: "Ativo" | "Manutenção" | "Inativo";
  observations: string;
}

interface TruckModalProps {
  mode: "create" | "edit";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  truck?: Truck | null;
  onSave: (truck: Omit<Truck, "id">, id?: number) => void;
  onDelete?: (truckId: number) => void; // só necessário em edição
}

export function TruckModal({
  mode,
  open,
  onOpenChange,
  truck,
  onSave,
  onDelete,
}: TruckModalProps) {
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

  useEffect(() => {
    if (mode === "edit" && truck) {
      setFormData({
        plate: truck.plate,
        model: truck.model,
        company: truck.company,
        capacity: truck.capacity,
        status: truck.status,
        observations: truck.observations,
      });
    }
    if (mode === "create") {
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
    }
  }, [mode, truck, open]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoCapture = (capturedPhoto: File) => {
    setPhoto(capturedPhoto);
    const previewUrl = URL.createObjectURL(capturedPhoto);
    setPhotoPreview(previewUrl);
  };

  const removePhoto = () => {
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhoto(null);
    setPhotoPreview(null);
  };

  const handleSave = () => {
    if (!formData.plate || !formData.model || !formData.company) {
      alert("Por favor, preencha os campos obrigatórios");
      return;
    }

    if (mode === "edit" && truck) {
      onSave(formData, truck.id);
    } else {
      onSave(formData);
    }

    onOpenChange(false);
  };

  const handleDelete = () => {
    if (truck && onDelete) {
      onDelete(truck.id);
      onOpenChange(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {mode === "create" ? "Novo Caminhão" : "Editar Caminhão"}
            </DialogTitle>
          </DialogHeader>

          {/* Foto só no cadastro */}
          {mode === "create" && (
            <div className="space-y-2 py-2">
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
                    <TruckIcon className="w-8 h-8 text-gray-400" />
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
                    <CameraIcon className="h-4 w-4" />
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
          )}

          {/* Formulário */}
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <TextField
                id="plate"
                label="Placa *"
                required
                value={formData.plate}
                onChange={(value) =>
                  handleChange("plate", value.toUpperCase())
                }
                placeholder="ABC-1234"
                maxLength={8}
              />
              <TextField
                id="model"
                label="Modelo *"
                required
                value={formData.model}
                onChange={(value) => handleChange("model", value)}
                placeholder="Ex: Mercedes-Benz Axor 2644"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <TextField
                id="company"
                label="Empresa *"
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
                onValueChange={(value: Truck["status"]) =>
                  handleChange("status", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Manutenção">Manutenção</SelectItem>
                  <SelectItem value="Inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="observations">Observações</Label>
              <Textarea
                id="observations"
                value={formData.observations}
                onChange={(e) => handleChange("observations", e.target.value)}
                placeholder="Informações adicionais sobre o caminhão"
                rows={3}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between gap-3">
            {mode === "edit" && onDelete && truck && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="secondary"
                    className="text-red-600 bg-red-100 hover:bg-red-200"
                  >
                    <TrashIcon className="h-4 w-4 mr-2" />
                    Excluir
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja excluir o caminhão  {truck.plate} ?
                      Tem certeza que deseja excluir o caminhão {truck.plate} ?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <TrashIcon className="h-4 w-4 mr-2" />
                      Excluir
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            <div className="flex gap-3 ml-auto">
              <Button variant="secondary" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                className="bg-primary-900 hover:bg-primary-900/80"
              >
                Salvar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Camera */}
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
