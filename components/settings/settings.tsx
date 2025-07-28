"use client";

import {useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Badge} from "@/components/ui/badge";
import {Bell, Database, Printer, Save, Scale, Weight,} from "lucide-react";

export function SettingsPage() {
  const tabs = [
    {
      id: "weighing",
      label: "Pesagem",
      icon: Weight,
    },
    {
      id: "scales",
      label: "Balanças",
      icon: Scale,
    },
    {
      id: "notifications",
      label: "Notificações",
      icon: Bell,
    },
    {
      id: "backup",
      label: "Backup",
      icon: Database,
    },
    {
      id: "printing",
      label: "Impressão",
      icon: Printer,
    }
  ]

  const [settings, setSettings] = useState({
    // Configurações de Pesagem
    weighing: {
      autoTare: true,
      minWeight: "100",
      maxWeight: "50000",
      precision: "0.1",
      timeout: "300",
      printTicket: true,
    },
    // Configurações de Sistema
    system: {
      companyName: "Semensol Professional",
      address: "Rua das Plantações, 123",
      city: "Ribeirão Preto - SP",
      phone: "(16) 3333-4444",
      email: "contato@semensol.com.br",
      cnpj: "12.345.678/0001-90",
    },
    // Configurações de Balanças
    scales: {
      scale1: {
        name: "Balança R1",
        ip: "192.168.1.100",
        port: "502",
        enabled: true,
        calibration: "2024-01-15",
      },
      scale2: {
        name: "Balança R2", 
        ip: "192.168.1.101",
        port: "502",
        enabled: false,
        calibration: "2024-01-15",
      },
    },
    // Configurações de Notificações
    notifications: {
      emailAlerts: true,
      systemAlerts: true,
      weighingComplete: true,
      scaleOffline: true,
      dailyReport: true,
      weeklyReport: false,
    },
    // Configurações de Backup
    backup: {
      autoBackup: true,
      backupTime: "02:00",
      retentionDays: "30",
      cloudBackup: false,
    },
    // Configurações de Impressão
    printing: {
      printerName: "HP LaserJet Pro",
      ticketFormat: "standard",
      copies: "2",
      autoprint: true,
    },
  });

  const handleSave = () => {
    // Aqui seria implementada a lógica de salvamento
    console.log("Configurações salvas:", settings);
  };

  return (
    <div className="flex flex-col w-full space-y-8 page-animation">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Configurações
          </h1>
          <p className="text-gray-200 mt-1">
            Gerencie as configurações do sistema Semensol
          </p>
        </div>
        <Button onClick={handleSave} className="bg-primary-900 hover:bg-primary-900/70">
          <Save className="h-4 w-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      <Tabs defaultValue="weighing" className="flex flex-col bg-white/20 rounded-3xl">
        <TabsList className="grid grid-cols-5 w-full rounded-r-none bg-transparent p-0">
          {tabs.map((tab, index) => (
            <TabsTrigger
              key={index}
              value={tab.id}
              className="
                flex items-center justify-center w-full rounded-b-none rounded-t-2xl gap-2
                data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm
              "
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Configurações de Pesagem */}
        <TabsContent value="weighing" className="flex-1 bg-white rounded-3xl rounded-tl-none">
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Configurações de Pesagem
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="minWeight">Peso Mínimo (kg)</Label>
                  <Input
                    id="minWeight"
                    value={settings.weighing.minWeight}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        weighing: { ...settings.weighing, minWeight: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxWeight">Peso Máximo (kg)</Label>
                  <Input
                    id="maxWeight"
                    value={settings.weighing.maxWeight}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        weighing: { ...settings.weighing, maxWeight: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="precision">Precisão (kg)</Label>
                  <Select
                    value={settings.weighing.precision}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        weighing: { ...settings.weighing, precision: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.1">0.1 kg</SelectItem>
                      <SelectItem value="0.5">0.5 kg</SelectItem>
                      <SelectItem value="1.0">1.0 kg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeout">Timeout (segundos)</Label>
                  <Input
                    id="timeout"
                    value={settings.weighing.timeout}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        weighing: { ...settings.weighing, timeout: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Tara Automática</Label>
                  <p className="text-sm text-gray-600">
                    Zerar automaticamente a balança antes da pesagem
                  </p>
                </div>
                <Switch
                  checked={settings.weighing.autoTare}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      weighing: { ...settings.weighing, autoTare: checked },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Imprimir Ticket Automaticamente</Label>
                  <p className="text-sm text-gray-600">
                    Imprimir ticket ao finalizar pesagem
                  </p>
                </div>
                <Switch
                  checked={settings.weighing.printTicket}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      weighing: { ...settings.weighing, printTicket: checked },
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configurações de Balanças */}
        <TabsContent value="scales" className="flex-1 bg-white rounded-3xl shadow-lg">
          <div>
            {Object.entries(settings.scales).map(([key, scale]) => (
              <Card key={key} className="shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Scale className="h-5 w-5" />
                      {scale.name}
                    </div>
                    <Badge variant={scale.enabled ? "default" : "secondary"}>
                      {scale.enabled ? "Ativa" : "Inativa"}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Endereço IP</Label>
                      <Input value={scale.ip} />
                    </div>
                    <div className="space-y-2">
                      <Label>Porta</Label>
                      <Input value={scale.port} />
                    </div>
                    <div className="space-y-2">
                      <Label>Última Calibração</Label>
                      <Input value={scale.calibration} type="date" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Balança Ativa</Label>
                      <p className="text-sm text-gray-600">
                        Habilitar esta balança para pesagens
                      </p>
                    </div>
                    <Switch checked={scale.enabled} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Configurações de Notificações */}
        <TabsContent value="notifications" className="flex-1 bg-white rounded-3xl shadow-lg">
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notificações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Alertas por E-mail</Label>
                    <p className="text-sm text-gray-600">
                      Receber alertas importantes por e-mail
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.emailAlerts}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, emailAlerts: checked },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Alertas do Sistema</Label>
                    <p className="text-sm text-gray-600">
                      Notificações de sistema na interface
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.systemAlerts}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, systemAlerts: checked },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Pesagem Concluída</Label>
                    <p className="text-sm text-gray-600">
                      Notificar quando uma pesagem for finalizada
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.weighingComplete}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, weighingComplete: checked },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Balança Offline</Label>
                    <p className="text-sm text-gray-600">
                      Alertar quando uma balança ficar offline
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.scaleOffline}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, scaleOffline: checked },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Relatório Diário</Label>
                    <p className="text-sm text-gray-600">
                      Enviar relatório diário por e-mail
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.dailyReport}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, dailyReport: checked },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Relatório Semanal</Label>
                    <p className="text-sm text-gray-600">
                      Enviar relatório semanal por e-mail
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.weeklyReport}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, weeklyReport: checked },
                      })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configurações de Backup */}
        <TabsContent value="backup" className="flex-1 bg-white rounded-3xl shadow-lg">
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Backup e Segurança
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Backup Automático</Label>
                  <p className="text-sm text-gray-600">
                    Realizar backup automático dos dados
                  </p>
                </div>
                <Switch
                  checked={settings.backup.autoBackup}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      backup: { ...settings.backup, autoBackup: checked },
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="backupTime">Horário do Backup</Label>
                  <Input
                    id="backupTime"
                    type="time"
                    value={settings.backup.backupTime}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        backup: { ...settings.backup, backupTime: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retentionDays">Retenção (dias)</Label>
                  <Input
                    id="retentionDays"
                    value={settings.backup.retentionDays}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        backup: { ...settings.backup, retentionDays: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Backup na Nuvem</Label>
                  <p className="text-sm text-gray-600">
                    Enviar backups para armazenamento na nuvem
                  </p>
                </div>
                <Switch
                  checked={settings.backup.cloudBackup}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      backup: { ...settings.backup, cloudBackup: checked },
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configurações de Impressão */}
        <TabsContent value="printing" className="flex-1 bg-white rounded-3xl rounded-tr-none shadow-lg">
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Printer className="h-5 w-5" />
                Configurações de Impressão
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="printerName">Impressora Padrão</Label>
                  <Select
                    value={settings.printing.printerName}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        printing: { ...settings.printing, printerName: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HP LaserJet Pro">HP LaserJet Pro</SelectItem>
                      <SelectItem value="Epson L3150">Epson L3150</SelectItem>
                      <SelectItem value="Canon PIXMA">Canon PIXMA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ticketFormat">Formato do Ticket</Label>
                  <Select
                    value={settings.printing.ticketFormat}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        printing: { ...settings.printing, ticketFormat: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Padrão</SelectItem>
                      <SelectItem value="compact">Compacto</SelectItem>
                      <SelectItem value="detailed">Detalhado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="copies">Número de Cópias</Label>
                  <Select
                    value={settings.printing.copies}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        printing: { ...settings.printing, copies: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 cópia</SelectItem>
                      <SelectItem value="2">2 cópias</SelectItem>
                      <SelectItem value="3">3 cópias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Impressão Automática</Label>
                  <p className="text-sm text-gray-600">
                    Imprimir automaticamente ao finalizar pesagem
                  </p>
                </div>
                <Switch
                  checked={settings.printing.autoprint}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      printing: { ...settings.printing, autoprint: checked },
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}