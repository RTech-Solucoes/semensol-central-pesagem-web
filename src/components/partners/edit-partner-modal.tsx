import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState, useEffect } from "react";
import { TrashIcon } from "@phosphor-icons/react";

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

interface EditPartnerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  partner: Partner | null;
  onSave: (partner: Partner) => void;
  onDelete: (partnerId: number) => void;
}

export function EditPartnerModal({ open, onOpenChange, partner, onSave, onDelete }: EditPartnerModalProps) {
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

  useEffect(() => {
    if (partner) {
      setFormData({
        name: partner.name,
        cnpj: partner.cnpj,
        phone: partner.phone,
        email: partner.email,
        address: partner.address,
        city: partner.city,
        status: partner.status,
        type: partner.type,
      });
    }
  }, [partner]);

  const handleSave = () => {
    if (!formData.name || !formData.cnpj || !formData.type) {
      alert("Por favor, preencha os campos obrigatórios");
      return;
    }

    if (!partner) return;

    onSave({
      ...partner,
      ...formData,
    });

    onOpenChange(false);
  };

  const handleDelete = () => {
    if (!partner) return;
    onDelete(partner.id);
    onOpenChange(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!partner) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Empresa Parceira</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Empresa *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Razão social"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ *</Label>
              <Input
                id="cnpj"
                value={formData.cnpj}
                onChange={(e) => handleChange("cnpj", e.target.value)}
                placeholder="00.000.000/0000-00"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="(00) 0000-0000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="contato@empresa.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Rua, número, bairro"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">Cidade</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              placeholder="Cidade - UF CEP"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Parceria *</Label>
              <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
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

        <div className="flex justify-between gap-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="text-red-600 bg-red-100 hover:bg-red-200">
                <TrashIcon className="h-4 w-4 mr-2" />
                Excluir
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja excluir a empresa "{partner.name}"? Esta ação não pode ser desfeita.
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
