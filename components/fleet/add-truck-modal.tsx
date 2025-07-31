import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

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

  const handleSave = () => {
    if (!formData.plate || !formData.model || !formData.company) {
      alert("Por favor, preencha os campos obrigatórios");
      return;
    }

    onSave(formData);

    // Reset form
    setFormData({
      plate: "",
      model: "",
      company: "",
      capacity: "",
      status: "Ativo",
      observations: "",
    });

    onOpenChange(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Caminhão</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="plate">Placa *</Label>
              <Input
                id="plate"
                value={formData.plate}
                onChange={(e) => handleChange("plate", e.target.value.toUpperCase())}
                placeholder="ABC-1234"
                maxLength={8}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Modelo *</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => handleChange("model", e.target.value)}
                placeholder="Ex: Mercedes-Benz Axor 2644"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Empresa *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleChange("company", e.target.value)}
                placeholder="Nome da empresa proprietária"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacidade</Label>
              <Input
                id="capacity"
                value={formData.capacity}
                onChange={(e) => handleChange("capacity", e.target.value)}
                placeholder="Ex: 30.000 kg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: Truck["status"]) => handleChange("status", value)}
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

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-primary-900 hover:bg-primary-900/80">
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
