"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CameraIcon, CameraRotate, Check, Upload, X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface CameraCaptureProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCapture: (image: File) => void;
  title?: string;
  description?: string;
}

export function CameraCapture({
  open,
  onOpenChange,
  onCapture,
  title = "Capturar Foto",
  description = "Posicione-se adequadamente e tire uma foto"
}: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const startCamera = useCallback(async () => {
    try {
      setIsLoading(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode
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
    } finally {
      setIsLoading(false);
    }
  }, [facingMode, toast]);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  }, []);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    setCapturedImage(imageData);
    stopCamera();
  }, [stopCamera]);

  const confirmCapture = useCallback(() => {
    if (!capturedImage || !canvasRef.current) return;

    canvasRef.current.toBlob((blob) => {
      if (blob) {
        // Convert Blob to File
        const file = new File([blob], 'camera-capture.jpg', {
          type: 'image/jpeg',
          lastModified: Date.now()
        });
        onCapture(file);
        setCapturedImage(null);
        onOpenChange(false);
      }
    }, 'image/jpeg', 0.8);
  }, [capturedImage, onCapture, onOpenChange]);

  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
    startCamera();
  }, [startCamera]);

  const flipCamera = useCallback(async () => {
    if (isStreaming) {
      stopCamera();
      const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
      setFacingMode(newFacingMode);

      setTimeout(async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: 640 },
              height: { ideal: 480 },
              facingMode: newFacingMode
            }
          });

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setIsStreaming(true);
          }
        } catch (error) {
          console.error('Erro ao trocar câmera:', error);
          toast({
            title: "Erro ao trocar câmera",
            description: "Não foi possível trocar a câmera. Tente novamente.",
            variant: "destructive",
          });
          setFacingMode(facingMode);
        }
      }, 500);
    }
  }, [isStreaming, facingMode, stopCamera, toast]);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        onCapture(file);
        onOpenChange(false);
      } else {
        toast({
          title: "Arquivo inválido",
          description: "Por favor, selecione uma imagem válida.",
          variant: "destructive",
        });
      }
    }
  }, [onCapture, onOpenChange, toast]);

  const handleClose = useCallback(() => {
    stopCamera();
    setCapturedImage(null);
    onOpenChange(false);
  }, [stopCamera, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </DialogHeader>

        <div className="space-y-4">
          {/* Camera Preview or Captured Image */}
          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
            {capturedImage ? (
              <img
                src={capturedImage}
                alt="Captured"
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <canvas ref={canvasRef} className="hidden" />

                {/* Floating Flip Camera Button */}
                {isStreaming && (
                  <Button
                    onClick={flipCamera}
                    size="sm"
                    variant="secondary"
                    className="absolute bottom-2 right-2 w-10 h-10 p-0 rounded-full shadow-lg bg-white/90 backdrop-blur-sm border border-gray-200"
                    title="Trocar câmera"
                  >
                    <CameraRotate className="h-4 w-4 text-gray-700" />
                  </Button>
                )}

                {!isStreaming && !isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <CameraIcon className="h-12 w-12 text-gray-400 mx-auto mb-2"/>
                      <p className="text-gray-500">Câmera desligada</p>
                      <p className="text-xs text-gray-400">Clique em "Iniciar Câmera" para começar</p>
                    </div>
                  </div>
                )}

                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"/>
                      <p className="text-gray-500">Iniciando câmera...</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            {capturedImage ? (
              <div className="flex gap-2">
                <Button
                  onClick={retakePhoto}
                  variant="outline"
                  className="flex-1 flex items-center gap-2"
                >
                  <X className="h-4 w-4"/>
                  Tirar Novamente
                </Button>
                <Button
                  onClick={confirmCapture}
                  className="flex-1 flex items-center gap-2"
                >
                  <Check className="h-4 w-4"/>
                  Confirmar
                </Button>
              </div>
            ) : (
              <>
                <div className="flex gap-2">
                  <Button
                    onClick={isStreaming ? stopCamera : startCamera}
                    variant={isStreaming ? "destructive" : "default"}
                    className="flex-1 flex items-center gap-2"
                    disabled={isLoading}
                  >
                    <CameraIcon className="h-4 w-4"/>
                    {isStreaming ? "Parar Câmera" : "Iniciar Câmera"}
                  </Button>

                  {isStreaming && (
                    <Button
                      onClick={capturePhoto}
                      className="flex-1 flex items-center gap-2"
                    >
                      <CameraIcon className="h-4 w-4"/>
                      Capturar
                    </Button>
                  )}
                </div>

                {/* File Upload Alternative */}
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2">ou</p>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="w-full flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4"/>
                    Selecionar do Dispositivo
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
