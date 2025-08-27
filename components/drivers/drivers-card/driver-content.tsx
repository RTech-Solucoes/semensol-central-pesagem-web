import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { IdentificationCardIcon } from "@phosphor-icons/react";

interface Driver {
  id: number;
  nome: string;
  cpf: string;
  cnh: string;
  imagem_path?: string;
}

interface DriverContentProps {
  drivers: Driver[];
  loading: boolean;
}

export default function DriverContent({ drivers, loading }: DriverContentProps) {
  return (
    <CardContent>
      {loading ? (
        <LoadingSpinner text="Carregando motoristas..." />
      ) : drivers.length === 0 ? (
        <div className="text-center py-12">
          <IdentificationCardIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">Nenhum motorista cadastrado</p>
          <p className="text-sm text-gray-400">
            Clique em <strong>Novo Motorista</strong> para começar
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {drivers.map((driver) => (
            <Card key={driver.id} className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    {driver.imagem_path ? (
                      <img
                        src={driver.imagem_path}
                        alt={driver.nome}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <IdentificationCardIcon className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{driver.nome}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </CardContent>
  );
}