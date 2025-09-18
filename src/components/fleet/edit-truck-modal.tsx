"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { Label } from "@/components/ui/label";
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
import { useState, useEffect } from "react";
import { TrashIcon } from "@phosphor-icons/react";

interface Truck {
  id: number;
  plate: string;
  model: string;
  company: string;
  capacity: string;
  status: "Ativo" | "Manutenção" | "Inativo";
  observations: string;
}

interface EditTruckModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  truck: Truck | null;
  onSave: (truck: Truck) => void;
  onDelete: (truckId: number) => void;
}

export function EditTruckModal({
  open,
  onOpenChange,
  truck,
  onSave,
  onDelete,
}: EditTruckModalProps) {
  const [formData, setFormData] = useState({
    plate: "",
    model: "",
    company: "",
    capacity: "",
    status: "Ativo" as Truck["status"],
    observations: "",
  });

  useEffect(() => {
    if (truck) {
      setFormData({
        plate: truck.plate,
        model: truck.model,
        company: truck.company,
        capacity: truck.capacity,
        status: truck.status,
        observations: truck.observations,
      });
    }
  }, [truck]);

  const handleSave = () => {
    if (!formData.plate || !formData.model || !formData.company) {
      alert("Por favor, preencha os campos obrigatórios");
      return;
    }

    if (!truck) return;

    onSave({
      ...truck,
      ...formData,
    });

    onOpenChange(false);
  };

  const handleDelete = () => {
    if (!truck) return;
    onDelete(truck.id);
    onOpenChange(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!truck) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Caminhão</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <TextField
                id="plate"
                label="Placa *"
                required
                value={formData.plate}
                onChange={(value) => handleChange("plate", value.toUpperCase())}
                placeholder="ABC-1234"
                maxLength={8}
              />
            </div>
            <div className="space-y-2">
              <TextField
                id="model"
                label="Modelo *"
                required
                value={formData.model}
                onChange={(value) => handleChange("model", value)}
                placeholder="Ex: Mercedes-Benz Axor 2644"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <TextField
                id="company"
                label="Empresa *"
                required
                value={formData.company}
                onChange={(value) => handleChange("company", value)}
                placeholder="Nome da empresa proprietária"
              />
            </div>
            <div className="space-y-2">
              <TextField
                id="capacity"
                label="Capacidade"
                value={formData.capacity}
                onChange={(value) => handleChange("capacity", value)}
                placeholder="Ex: 30.000 kg"
              />
            </div>
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
              placeholder="Informações adicionais sobre o caminh��o"
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-between gap-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="secondary" className="text-red-600 bg-red-100 hover:bg-red-200">
                <TrashIcon className="h-4 w-4 mr-2" />
                Excluir
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja excluir o caminhão &quot;{truck.plate}&quot;? Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
  <TrashIcon className="h-4 w-4 mr-2" />
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-primary-900 hover:bg-primary-900/80">
              Salvar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
