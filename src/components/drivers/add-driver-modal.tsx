import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Driver } from "./driver-card";
import { CameraCapture } from "@/components/ui/camera-capture";
import { CameraIcon, UserCircle } from "@phosphor-icons/react";

interface AddDriverModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (driver: Omit<Driver, "id">) => void;
}

export function AddDriverModal({ open, onOpenChange, onSave }: AddDriverModalProps) {
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

  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);

  const handleSave = () => {
    if (!formData.name || !formData.document || !formData.cpf) {
      alert("Por favor, preencha os campos obrigatórios");
      return;
    }

    onSave({
      ...formData,
      document: `CNH: ${formData.document}`,
    });

    setFormData({
      name: "",
      document: "",
      cpf: "",
      phone: "",
      email: "",
      status: "Ativo",
      company: "",
      experience: "",
      category: "",
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
            <DialogTitle>Novo Motorista</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Foto do Motorista</Label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserCircle className="w-8 h-8 text-gray-400" />
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Nome completo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="document">CNH *</Label>
                <Input
                  id="document"
                  value={formData.document}
                  onChange={(e) => handleChange("document", e.target.value)}
                  placeholder="Número da CNH"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF *</Label>
                <Input
                  id="cpf"
                  value={formData.cpf}
                  onChange={(e) => handleChange("cpf", e.target.value)}
                  placeholder="000.000.000-00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="email@exemplo.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  placeholder="Nome da empresa"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experiência</Label>
                <Input
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => handleChange("experience", e.target.value)}
                  placeholder="Ex: 5 anos"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Categoria CNH</Label>
                <Select onValueChange={(value) => handleChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A - Motocicleta</SelectItem>
                    <SelectItem value="B">B - Automóvel</SelectItem>
                    <SelectItem value="C">C - Caminhão</SelectItem>
                    <SelectItem value="D">D - Ônibus</SelectItem>
                    <SelectItem value="E">E - Carreta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: Driver["status"]) => handleChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Inativo">Inativo</SelectItem>
                    <SelectItem value="Suspenso">Suspenso</SelectItem>
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

      <CameraCapture
        open={cameraOpen}
        onOpenChange={setCameraOpen}
        onCapture={handlePhotoCapture}
        title="Foto do Motorista"
        description="Posicione-se adequadamente e tire uma foto para o cadastro"
      />
    </>
  );
}
