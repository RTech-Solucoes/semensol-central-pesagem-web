"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMotoristas } from "@/hooks/useMotoristas";
import { useCiclosAbertos } from "@/hooks/useCiclosAbertos";
import { VideoVerification } from "@/components/weighing/video-verification";
import { WeighingCard } from "@/components/weighing/weighing-card";

export default function WeighingPage() {
  const { toast } = useToast();

  const { motoristas, reload: reloadMotoristas } = useMotoristas({ toast });
  const { ciclosAbertos, reload: reloadCiclos } = useCiclosAbertos({ toast });
  const [isConnected, setIsConnected] = useState(false);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    placa: "",
    motorista_id: "",
    peso: "",
  });
  const [verificationComplete, setVerificationComplete] = useState(false);

  const handleDriverVerified = (driverId: number) => {
    setFormData((prev) => ({ ...prev, motorista_id: driverId.toString() }));
  };

  const handlePlateDetected = (plate: string) => {
    setFormData((prev) => ({ ...prev, placa: plate }));
  };

  const handleVerificationComplete = (success: boolean) => {
    setVerificationComplete(success);
  };

  return (
    <section className="p-4 md:p-6">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-bold text-white">Central de Pesagem</h1>
        <p className="text-gray-200">
          Controle e monitoramento das operações de pesagem em tempo real
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <VideoVerification
          onDriverVerified={handleDriverVerified}
          onPlateDetected={handlePlateDetected}
          onVerificationComplete={handleVerificationComplete}
          formData={formData}
          setFormData={setFormData}
          motoristas={motoristas}
          verificationComplete={verificationComplete}
          ciclosAbertos={ciclosAbertos}
          isConnected={isConnected}
          loading={loading}
          onRegistrarSaida={() => reloadCiclos()}
        />

        <WeighingCard
          isConnected={isConnected}
          setIsConnected={setIsConnected}
          currentWeight={currentWeight}
          setCurrentWeight={setCurrentWeight}
          formData={formData}
          loading={loading}
          verificationComplete={verificationComplete}
          onReloadCiclos={reloadCiclos}
        />
      </div>
    </section>
  );
}
