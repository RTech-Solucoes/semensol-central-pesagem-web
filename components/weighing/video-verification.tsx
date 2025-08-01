"use client";

import {useState, useRef, useCallback} from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {CameraIcon, CheckCircleIcon, XCircleIcon, IdentificationCardIcon} from "@phosphor-icons/react";
import {apiClient} from "@/lib/api";
import {cn} from "@/lib/utils";
import {useToast} from "@/hooks/use-toast";

interface VideoVerificationProps {
  onDriverVerified: (driverId: number, driverName: string) => void;
  onPlateDetected: (plate: string) => void;
  onVerificationComplete: (success: boolean) => void;
}

export function VideoVerification({
  onDriverVerified,
  onPlateDetected,
  onVerificationComplete
}: VideoVerificationProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [verificationState, setVerificationState] = useState<{
    driver: { verified: boolean; name?: string; confidence?: number };
    plate: { detected: boolean; value?: string };
    loading: boolean;
  }>({
    driver: { verified: false },
    plate: { detected: false },
    loading: false
  });
  const { toast } = useToast();

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (error) {
      console.error('Erro ao acessar câmera:', error);
      toast({
        title: "Erro de câmera",
        description: "Não foi possível acessar a câmera. Verifique as permissões.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  }, []);

  const captureImage = useCallback((): Promise<Blob | null> => {
    if (!videoRef.current || !canvasRef.current) return Promise.resolve(null);

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');

    if (!context) return Promise.resolve(null);

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg', 0.8);
    });
  }, []);

  const verifyDriver = useCallback(async () => {
    const imageBlob = await captureImage();
    if (!imageBlob) {
      toast({
        title: "Erro na captura",
        description: "Não foi possível capturar a imagem da câmera.",
        variant: "destructive",
      });
      return;
    }

    setVerificationState(prev => ({ ...prev, loading: true }));

    const formData = new FormData();
    formData.append('imagem_rosto', imageBlob, 'driver.jpg');

    const response = await apiClient.reconhecerMotorista(formData);

    if (response.error) {
      toast({
        title: "Erro na verificação",
        description: response.error,
        variant: "destructive",
      });
      setVerificationState(prev => ({ ...prev, driver: { verified: false }, loading: false }));
    } else if (response.data?.motorista_reconhecido) {
      const driverData = {
        verified: true,
        name: response.data.motorista_nome,
        confidence: response.data.confianca
      };

      setVerificationState(prev => ({ ...prev, driver: driverData, loading: false }));

      if (response.data.motorista_id && response.data.motorista_nome) {
        onDriverVerified(response.data.motorista_id, response.data.motorista_nome);
        toast({
          title: "Motorista verificado",
          description: `${response.data.motorista_nome} identificado com sucesso!`,
        });
      }
    } else {
      toast({
        title: "Motorista não reconhecido",
        description: "Não foi possível identificar o motorista na imagem.",
        variant: "destructive",
      });
      setVerificationState(prev => ({ ...prev, driver: { verified: false }, loading: false }));
    }
  }, [captureImage, onDriverVerified, toast]);

  const detectPlate = useCallback(async () => {
    const imageBlob = await captureImage();
    if (!imageBlob) {
      toast({
        title: "Erro na captura",
        description: "Não foi possível capturar a imagem da câmera.",
        variant: "destructive",
      });
      return;
    }

    setVerificationState(prev => ({ ...prev, loading: true }));

    const formData = new FormData();
    formData.append('imagem_placa', imageBlob, 'plate.jpg');

    const response = await apiClient.reconhecerPlaca(formData);

    if (response.error) {
      toast({
        title: "Erro na detecção de placa",
        description: response.error,
        variant: "destructive",
      });
      setVerificationState(prev => ({ ...prev, plate: { detected: false }, loading: false }));
    } else if (response.data?.placa) {
      const plateData = {
        detected: true,
        value: response.data.placa
      };

      setVerificationState(prev => ({ ...prev, plate: plateData, loading: false }));
      onPlateDetected(response.data.placa);
      toast({
        title: "Placa detectada",
        description: `Placa ${response.data.placa} identificada com sucesso!`,
      });
    } else {
      toast({
        title: "Placa não detectada",
        description: "Não foi possível identificar a placa na imagem.",
        variant: "destructive",
      });
      setVerificationState(prev => ({ ...prev, plate: { detected: false }, loading: false }));
    }
  }, [captureImage, onPlateDetected, toast]);

  const performCompleteVerification = useCallback(async () => {
    const imageBlob = await captureImage();
    if (!imageBlob) {
      toast({
        title: "Erro na captura",
        description: "Não foi possível capturar a imagem da câmera.",
        variant: "destructive",
      });
      return;
    }

    setVerificationState(prev => ({ ...prev, loading: true }));

    const formData = new FormData();
    formData.append('imagem_rosto', imageBlob, 'driver.jpg');
    formData.append('imagem_placa', imageBlob, 'plate.jpg');

    const response = await apiClient.reconhecimentoCompleto(formData);

    if (response.error) {
      toast({
        title: "Erro na verificação completa",
        description: response.error,
        variant: "destructive",
      });
      setVerificationState(prev => ({ ...prev, loading: false }));
    } else if (response.data) {
      const newState = {
        driver: {
          verified: response.data.motorista_reconhecido,
          name: response.data.motorista_nome,
          confidence: response.data.confianca_motorista
        },
        plate: {
          detected: response.data.placa_valida,
          value: response.data.placa_reconhecida
        },
        loading: false
      };

      setVerificationState(newState);

      if (response.data.motorista_reconhecido && response.data.motorista_id && response.data.motorista_nome) {
        onDriverVerified(response.data.motorista_id, response.data.motorista_nome);
      }

      if (response.data.placa_reconhecida) {
        onPlateDetected(response.data.placa_reconhecida);
      }

      const success = response.data.motorista_reconhecido && response.data.placa_valida;
      onVerificationComplete(success);

      if (success) {
        toast({
          title: "Verificação completa",
          description: "Motorista e placa verificados com sucesso!",
        });
      } else {
        toast({
          title: "Verificação parcial",
          description: "Nem todos os elementos foram verificados com sucesso.",
          variant: "destructive",
        });
      }
    }
  }, [captureImage, onDriverVerified, onPlateDetected, onVerificationComplete, toast]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CameraIcon className="h-5 w-5"/>
          Verificação por Vídeo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-64 bg-gray-100 rounded-lg object-cover"
          />
          <canvas
            ref={canvasRef}
            className="hidden"
          />

          {!isStreaming && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
              <div className="text-center">
                <CameraIcon className="h-12 w-12 text-gray-400 mx-auto mb-2"/>
                <p className="text-gray-500">Câmera desativada</p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Motorista:</span>
              <Badge
                variant="secondary"
                className={cn(
                  verificationState.driver.verified
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                )}
              >
                {verificationState.driver.verified ? (
                  <CheckCircleIcon className="w-3 h-3 mr-1"/>
                ) : (
                  <XCircleIcon className="w-3 h-3 mr-1"/>
                )}
                {verificationState.driver.verified ? "Verificado" : "Não verificado"}
              </Badge>
            </div>
            {verificationState.driver.name && (
              <p className="text-sm text-gray-600">{verificationState.driver.name}</p>
            )}
            {verificationState.driver.confidence && (
              <p className="text-xs text-gray-500">
                Confiança: {Math.round(verificationState.driver.confidence * 100)}%
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Placa:</span>
              <Badge
                variant="secondary"
                className={cn(
                  verificationState.plate.detected
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                )}
              >
                {verificationState.plate.detected ? (
                  <CheckCircleIcon className="w-3 h-3 mr-1"/>
                ) : (
                  <XCircleIcon className="w-3 h-3 mr-1"/>
                )}
                {verificationState.plate.detected ? "Detectada" : "Não detectada"}
              </Badge>
            </div>
            {verificationState.plate.value && (
              <p className="text-sm font-medium">{verificationState.plate.value}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          {!isStreaming ? (
            <Button onClick={startCamera} className="flex-1">
              <CameraIcon className="w-4 h-4 mr-2"/>
              Ativar Câmera
            </Button>
          ) : (
            <>
              <Button
                onClick={stopCamera}
                variant="outline"
                className="flex-1"
              >
                Parar Câmera
              </Button>
              <Button
                onClick={verifyDriver}
                disabled={verificationState.loading}
                variant="secondary"
                className="flex-1"
              >
                {verificationState.loading ? "Verificando..." : "Verificar Motorista"}
              </Button>
              <Button
                onClick={detectPlate}
                disabled={verificationState.loading}
                variant="secondary"
                className="flex-1"
              >
                {verificationState.loading ? "Detectando..." : "Detectar Placa"}
              </Button>
              <Button
                onClick={performCompleteVerification}
                disabled={verificationState.loading}
                className="flex-1"
              >
                {verificationState.loading ? "Verificando..." : "Verificar Ambos"}
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
