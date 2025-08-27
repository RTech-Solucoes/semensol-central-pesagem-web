"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CameraIcon, PlusIcon } from "@phosphor-icons/react";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/api";

interface AddDriverDialogProps {
  onCreated?: () => void;
}

export default function AddDriverDialog({ onCreated }: AddDriverDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    cnh: "",
    imagem: null as File | null,
  });
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, imagem: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.cpf || !formData.cnh || !formData.imagem) return;

    setLoading(true);
    const form = new FormData();
    form.append("nome", formData.nome);
    form.append("cpf", formData.cpf);
    form.append("cnh", formData.cnh);
    form.append("imagem", formData.imagem);

    const response = await apiClient.cadastrarMotorista(form);

    if (response.error) {
      toast({
        title: "Erro ao cadastrar motorista",
        description: response.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Motorista cadastrado",
        description: "Motorista cadastrado com sucesso!",
      });
      setFormData({ nome: "", cpf: "", cnh: "", imagem: null });
      setIsOpen(false);
      onCreated?.();
    }
    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusIcon className="h-4 w-4" />
          Novo Motorista
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cadastrar Novo Motorista</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nome">Nome Completo</Label>
            <Input
              id="nome"
              placeholder="Nome do motorista"
              value={formData.nome}
              onChange={(e) => setFormData((prev) => ({ ...prev, nome: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              placeholder="CPF do motorista"
              value={formData.cpf}
              onChange={(e) => setFormData((prev) => ({ ...prev, cpf: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="cnh">CNH</Label>
            <Input
              id="cnh"
              placeholder="CNH do motorista"
              value={formData.cnh}
              onChange={(e) => setFormData((prev) => ({ ...prev, cnh: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="imagem">Foto do Motorista</Label>
            <div className="flex items-center gap-2">
              <Input
                id="imagem"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="flex-1"
              />
              <CameraIcon className="h-5 w-5 text-gray-400" />
            </div>
            {formData.imagem && (
              <p className="text-sm text-green-600 mt-1">Imagem selecionada: {formData.imagem.name}</p>
            )}
          </div>
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}