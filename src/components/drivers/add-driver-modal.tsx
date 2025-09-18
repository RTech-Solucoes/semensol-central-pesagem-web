import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button, Text} from "@chakra-ui/react";
import {TextField} from "@/components/ui/text-field";
import Select from "@/components/ui/select";
import {useState} from "react";
import {Driver} from "@/types/driver";
import {CameraCapture} from "@/components/ui/camera-capture";
import {IconCamera, IconUserCircle} from "@tabler/icons-react";

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
              <Text>Foto do Motorista</Text>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <IconUserCircle className="w-8 h-8 text-gray-400" />
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
                id="name"
                label="Nome *"
                value={formData.name}
                onChange={(value) => handleChange("name", value)}
                placeholder="Nome completo"
              />
              <TextField
                id="document"
                label="CNH *"
                value={formData.document}
                onChange={(value) => handleChange("document", value)}
                placeholder="Número da CNH"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <TextField
                id="cpf"
                label="CPF *"
                value={formData.cpf}
                onChange={(value) => handleChange("cpf", value)}
                placeholder="000.000.000-00"
              />
              <TextField
                id="phone"
                label="Telefone"
                value={formData.phone}
                onChange={(value) => handleChange("phone", value)}
                placeholder="(00) 00000-0000"
              />
            </div>

            <TextField
              id="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={(value) => handleChange("email", value)}
              placeholder="email@exemplo.com"
            />

            <div className="grid grid-cols-2 gap-4">
              <TextField
                id="company"
                label="Empresa"
                value={formData.company}
                onChange={(value) => handleChange("company", value)}
                placeholder="Nome da empresa"
              />
              <TextField
                id="experience"
                label="Experiência"
                value={formData.experience}
                onChange={(value) => handleChange("experience", value)}
                placeholder="Ex: 5 anos"
              />
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
                  onValueChange={(value) => handleChange("status", value as Driver["status"])}
                  items={[
                    { label: "Ativo", value: "Ativo" },
                    { label: "Inativo", value: "Inativo" },
                    { label: "Suspenso", value: "Suspenso" },
                  ]}
                />
              </div>
            </div>
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
