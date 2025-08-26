import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { CameraIcon } from "@phosphor-icons/react";
import { TabsContentImageProps } from "../types";

export default function TabsContentImage({
  formData,
  setFormData,
  submitLoading,
  setIsModalOpen,
  handleImageSubmit,
  handleImageChange,
}: TabsContentImageProps) {
  return (
    <TabsContent value="image" className="mt-4">
      <form onSubmit={handleImageSubmit} className="space-y-4">
        <div>
          <Label htmlFor="modelo-image">Modelo</Label>
          <Input
            id="modelo-image"
            placeholder="Modelo do veículo"
            value={formData.modelo}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, modelo: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <Label htmlFor="empresa-image">Empresa</Label>
          <Input
            id="empresa-image"
            placeholder="Nome da empresa"
            value={formData.empresa}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, empresa: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <Label htmlFor="imagem-placa">Foto da Placa</Label>
          <div className="flex items-center gap-2">
            <Input
              id="imagem-placa"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="flex-1"
            />
            <CameraIcon className="h-5 w-5 text-gray-400" />
          </div>
          {formData.imagem && (
            <p className="text-sm text-green-600 mt-1">
              Imagem selecionada: {formData.imagem.name}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            A placa será reconhecida automaticamente
          </p>
        </div>
        <div className="flex gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsModalOpen(false)}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={submitLoading} className="flex-1">
            {submitLoading ? "Processando..." : "Cadastrar"}
          </Button>
        </div>
      </form>
    </TabsContent>
  )
}