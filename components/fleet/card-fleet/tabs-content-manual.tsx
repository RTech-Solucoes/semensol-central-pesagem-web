import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { TabsContentManualProps } from "../types";

export default function TabsContentManual({
  formData,
  setFormData,
  submitLoading,
  setIsModalOpen,
  handleManualSubmit,
}: TabsContentManualProps) {
  return (
    <TabsContent value="manual" className="mt-4">
      <form onSubmit={handleManualSubmit} className="space-y-4">
        <div>
          <Label htmlFor="placa-manual">Placa</Label>
          <Input
            id="placa-manual"
            placeholder="ABC-1234"
            value={formData.placa}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                placa: e.target.value.toUpperCase(),
              }))
            }
            required
          />
        </div>
        <div>
          <Label htmlFor="modelo-manual">Modelo</Label>
          <Input
            id="modelo-manual"
            placeholder="Modelo do veículo"
            value={formData.modelo}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, modelo: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <Label htmlFor="empresa-manual">Empresa</Label>
          <Input
            id="empresa-manual"
            placeholder="Nome da empresa"
            value={formData.empresa}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, empresa: e.target.value }))
            }
            required
          />
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
            {submitLoading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </div>
      </form>
    </TabsContent>
  )
}