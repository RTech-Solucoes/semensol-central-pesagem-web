import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { TruckIcon } from "@phosphor-icons/react";
import { CardFleetContentProps } from "../types";

export default function CardFleetContent({ loading, trucks }: CardFleetContentProps) {
  return (
    <CardContent>
      {loading ? (
        <LoadingSpinner text="Carregando veículos..." />
      ) : trucks.length === 0 ? (
        <div className="text-center py-12">
          <TruckIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">Nenhum veículo cadastrado</p>
          <p className="text-sm text-gray-400">
            Clique em <strong>Novo Veículo</strong> para começar
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {trucks.map((truck) => (
            <Card key={truck.id} className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <TruckIcon className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-card-foreground">
                      {truck.placa}
                    </h3>
                    {truck.modelo && (
                      <p className="font-medium text-gray-900">
                        {truck.modelo}
                      </p>
                    )}
                    {truck.empresa && (
                      <p className="text-sm text-gray-500">
                        {truck.empresa}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </CardContent>
  )
}