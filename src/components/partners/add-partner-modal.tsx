import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import {TextField} from "@/components/ui/text-field";

interface Partner {
  id: number;
  name: string;
  cnpj: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  status: "Ativa" | "Inativa";
  type: string;
}

interface AddPartnerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (partner: Omit<Partner, "id">) => void;
}

export function AddPartnerModal({ open, onOpenChange, onSave }: AddPartnerModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    cnpj: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    status: "Ativa" as Partner["status"],
    type: "",
  });

  const handleSave = () => {
    if (!formData.name || !formData.cnpj || !formData.type) {
      alert("Por favor, preencha os campos obrigatórios");
      return;
    }

    onSave(formData);

    setFormData({
      name: "",
      cnpj: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      status: "Ativa",
      type: "",
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
          <DialogTitle>Nova Empresa Parceira</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <TextField
              id="name"
              label="Nome da Empresa"
              required
              value={formData.name}
              onChange={(value) => handleChange("name", value)}
              placeholder="Razão social"
            />
            <TextField
              id="cnpj"
              label="CNPJ"
              required
              value={formData.cnpj}
              onChange={(value) => handleChange("cnpj", value)}
              placeholder="00.000.000/0000-00"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <TextField
              id="phone"
              label="Telefone"
              value={formData.phone}
              onChange={(value) => handleChange("phone", value)}
              placeholder="(00) 0000-0000"
            />
            <TextField
              id="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={(value) => handleChange("email", value)}
              placeholder="contato@empresa.com"
            />
          </div>

          <TextField
            id="address"
            label="Endereço"
            value={formData.address}
            onChange={(value) => handleChange("address", value)}
            placeholder="Rua, número, bairro"
          />

          <TextField
            id="city"
            label="Cidade"
            value={formData.city}
            onChange={(value) => handleChange("city", value)}
            placeholder="Cidade - UF CEP"
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Parceria *</Label>
              <Select onValueChange={(value) => handleChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cliente preferencial">Cliente Preferencial</SelectItem>
                  <SelectItem value="Transportadora">Transportadora</SelectItem>
                  <SelectItem value="Fornecedor">Fornecedor</SelectItem>
                  <SelectItem value="Distribuidor">Distribuidor</SelectItem>
                  <SelectItem value="Cooperativa">Cooperativa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: Partner["status"]) => handleChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ativa">Ativa</SelectItem>
                  <SelectItem value="Inativa">Inativa</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
