"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@chakra-ui/react";
import { TextField } from "@/components/ui/text-field";
import Select from "@/components/ui/select";
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
import { Driver } from "@/types/driver";
import { IconTrashFilled } from "@tabler/icons-react";

interface EditDriverModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  driver: Driver | null;
  onSave: (driver: Driver) => void;
  onDelete: (driverId: number) => void;
}

export function EditDriverModal({
  open,
  onOpenChange,
  driver,
  onSave,
  onDelete,
}: EditDriverModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    document: "",
    cpf: "",
    phone: "",
    email: "",
    status: "Ativo" as Driver["status"],
    company: "",
    experience: "",
    category: "",
  });

  useEffect(() => {
    if (driver) {
      setFormData({
        name: driver.name,
        document: driver.document.replace("CNH: ", ""),
        cpf: driver.cpf,
        phone: driver.phone,
        email: driver.email,
        status: driver.status,
        company: driver.company || "",
        experience: driver.experience || "",
        category: driver.category || "",
      });
    }
  }, [driver]);

  const handleSave = () => {
    if (!formData.name || !formData.document || !formData.cpf) {
      alert("Por favor, preencha os campos obrigatórios");
      return;
    }

    if (!driver) return;

    onSave({
      ...driver,
      ...formData,
      document: `CNH: ${formData.document}`,
    });

    onOpenChange(false);
  };

  const handleDelete = () => {
    if (!driver) return;
    onDelete(driver.id);
    onOpenChange(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!driver) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Motorista</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <TextField
                id="name"
                label="Nome *"
                required
                value={formData.name}
                onChange={(value) => handleChange("name", value)}
                placeholder="Nome completo"
              />
            </div>
            <div className="space-y-2">
              <TextField
                id="document"
                label="CNH *"
                required
                value={formData.document}
                onChange={(value) => handleChange("document", value)}
                placeholder="Número da CNH"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <TextField
                id="cpf"
                label="CPF *"
                required
                value={formData.cpf}
                onChange={(value) => handleChange("cpf", value)}
                placeholder="000.000.000-00"
              />
            </div>
            <div className="space-y-2">
              <TextField
                id="phone"
                label="Telefone"
                value={formData.phone}
                onChange={(value) => handleChange("phone", value)}
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <TextField
              id="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={(value) => handleChange("email", value)}
              placeholder="email@exemplo.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <TextField
                id="company"
                label="Empresa"
                value={formData.company}
                onChange={(value) => handleChange("company", value)}
                placeholder="Nome da empresa"
              />
            </div>
            <div className="space-y-2">
              <TextField
                id="experience"
                label="Experiência"
                value={formData.experience}
                onChange={(value) => handleChange("experience", value)}
                placeholder="Ex: 5 anos"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Select
                label="Categoria CNH"
                value={formData.category}
                onValueChange={(value) => handleChange("category", value as string)}
                placeholder="Selecione a categoria"
                items={[
                  { label: "A - Motocicleta", value: "A" },
                  { label: "B - Automóvel", value: "B" },
                  { label: "C - Caminhão", value: "C" },
                  { label: "D - Ônibus", value: "D" },
                  { label: "E - Carreta", value: "E" },
                ]}
              />
            </div>
            <div className="space-y-2">
              <Select
                label="Status"
                value={formData.status}
                onValueChange={(value) =>
                  handleChange("status", value as Driver["status"])
                }
                items={[
                  { label: "Ativo", value: "Ativo" },
                  { label: "Inativo", value: "Inativo" },
                  { label: "Suspenso", value: "Suspenso" },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="subtle" className="text-red-600 bg-red-100 hover:bg-red-200">
                <IconTrashFilled className="h-4 w-4 mr-2" />
                Excluir
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja excluir o motorista <strong>{driver.name}</strong> ? Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                  <IconTrashFilled className="h-4 w-4 mr-2" />
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div className="flex gap-3">
            <Button variant="subtle" onClick={() => onOpenChange(false)}>
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
