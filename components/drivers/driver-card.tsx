import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserIcon, PencilSimpleLineIcon, PhoneIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react";

export interface Driver {
  id: number;
  name: string;
  document: string;
  cpf: string;
  phone: string;
  email: string;
  status: "Ativo" | "Inativo" | "Suspenso";
  company?: string;
  experience?: string;
  category?: string;
}

interface DriverCardProps {
  driver: Driver;
  onEdit?: (driver: Driver) => void;
}

export function DriverCard({ driver, onEdit }: DriverCardProps) {
  const getStatusColor = (status: Driver["status"]) => {
    switch (status) {
      case "Ativo":
        return "bg-green-100 text-green-700 border-green-200";
      case "Inativo":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "Suspenso":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-primary-100 text-primary-700 border-primary-200";
    }
  };

  return (
    <Card className="relative h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-primary-100 flex items-center justify-center">
              <UserIcon className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold">
                {driver.name}
              </h3>
              <p className="text-sm text-gray-400">{driver.document}</p>
            </div>
          </div>
          <Badge
            variant="secondary"
            className={getStatusColor(driver.status)}
          >
            {driver.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="space-y-3 flex-1">
          <div>
            <p className="text-sm font-semibold text-primary-600">CPF</p>
            <p className="text-sm font-medium text-card-foreground">{driver.cpf}</p>
          </div>
          <div className="flex items-center gap-2">
            <PhoneIcon className="h-4 w-4 text-primary-600" />
            <p className="text-sm font-medium text-card-foreground">{driver.phone}</p>
          </div>
          <div className="flex items-center gap-2">
            <EnvelopeSimpleIcon className="h-4 w-4 text-primary-600" />
            <p className="text-sm font-medium text-card-foreground">{driver.email}</p>
          </div>
          {driver.company && (
            <div>
              <p className="text-sm font-semibold text-primary-600">Empresa</p>
              <p className="text-sm font-medium text-card-foreground">{driver.company}</p>
            </div>
          )}
          {driver.experience && (
            <div>
              <p className="text-sm font-semibold text-primary-600">Experiência</p>
              <p className="text-sm font-medium text-card-foreground">{driver.experience}</p>
            </div>
          )}
          {driver.category && (
            <div>
              <p className="text-sm font-medium text-primary-600">Categoria CNH</p>
              <p className="text-sm font-medium text-card-foreground">{driver.category}</p>
            </div>
          )}
        </div>
        <div className="mt-6">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => onEdit?.(driver)}
          >
            <PencilSimpleLineIcon className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
