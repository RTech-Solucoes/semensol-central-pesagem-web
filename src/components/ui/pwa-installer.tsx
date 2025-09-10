"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DownloadSimpleIcon, XIcon } from "@phosphor-icons/react";

export function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    const checkIfInstalled = () => {
      if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    checkIfInstalled();

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    setDeferredPrompt(null);
  };

  if (isInstalled || !showInstallPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <Card className="border-primary/20 bg-white/95 backdrop-blur-sm shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <h3 className="font-semibold text-sm mb-1">
                    Instalar Semensol Agro
                  </h3>
                  <p className="text-xs text-gray-600 mb-3">
                    Instale o app para acesso rápido e uso offline
                  </p>
                </div>
                <Button
                  onClick={handleDismiss}
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                >
                  <XIcon className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  onClick={handleDismiss}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  Agora não
                </Button>
                <Button
                  onClick={handleInstallClick}
                  size="sm"
                  className="flex items-center gap-1 text-xs"
                >
                  <DownloadSimpleIcon className="h-3 w-3" />
                  Instalar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
