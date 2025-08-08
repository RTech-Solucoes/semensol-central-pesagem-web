import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, DownloadSimpleIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExportModal({ open, onOpenChange }: ExportModalProps) {
  const [exportFormat, setExportFormat] = useState<string>("xlsx");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [selectedColumns, setSelectedColumns] = useState({
    date: true,
    plate: true,
    driver: true,
    company: true,
    product: true,
    grossWeight: true,
    tareWeight: true,
    netWeight: true,
    observations: false,
  });

  const handleExport = () => {
    // Simulate export functionality
    const exportData = {
      format: exportFormat,
      dateRange,
      columns: Object.entries(selectedColumns)
        .filter(([_, selected]) => selected)
        .map(([column]) => column),
    };

    console.log("Exportando dados:", exportData);

    // Create a mock CSV content
    const csvContent = generateMockCSV();
    downloadFile(csvContent, `historico-pesagens.${exportFormat}`, exportFormat);

    onOpenChange(false);
  };

  const generateMockCSV = () => {
    const headers = Object.entries(selectedColumns)
      .filter(([_, selected]) => selected)
      .map(([column]) => {
        const columnNames = {
          date: "Data",
          plate: "Placa",
          driver: "Motorista",
          company: "Empresa",
          product: "Produto",
          grossWeight: "Peso Bruto",
          tareWeight: "Tara",
          netWeight: "Peso Líquido",
          observations: "Observações",
        };
        return columnNames[column as keyof typeof columnNames];
      });

    const mockData = [
      ["2024-01-15", "ABC-1234", "João Silva", "Agro Brasil", "Soja", "45.200", "14.800", "30.400", "Carga conforme"],
      ["2024-01-15", "DEF-5678", "Maria Santos", "Campo Verde", "Milho", "42.150", "15.200", "26.950", ""],
      ["2024-01-14", "GHI-9012", "Pedro Costa", "Rural Tech", "Soja", "44.800", "14.500", "30.300", "Produto de qualidade"],
    ];

    const csvRows = [headers.join(",")];
    mockData.forEach(row => {
      const filteredRow = Object.entries(selectedColumns)
        .filter(([_, selected]) => selected)
        .map((_, index) => row[index] || "");
      csvRows.push(filteredRow.join(","));
    });

    return csvRows.join("\n");
  };

  const downloadFile = (content: string, filename: string, format: string) => {
    const mimeTypes = {
      csv: "text/csv",
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      pdf: "application/pdf",
    };

    const blob = new Blob([content], { type: mimeTypes[format as keyof typeof mimeTypes] });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const toggleColumn = (column: string) => {
    setSelectedColumns(prev => ({
      ...prev,
      [column]: !prev[column as keyof typeof prev],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DownloadSimpleIcon className="h-5 w-5" />
            Exportar Histórico
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label>Formato do Arquivo</Label>
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
                <SelectItem value="csv">CSV (.csv)</SelectItem>
                <SelectItem value="pdf">PDF (.pdf)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Período (Opcional)</Label>
            <div className="grid grid-cols-2 gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="secondary" className="justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? format(dateRange.from, "dd/MM/yyyy", { locale: ptBR }) : "Data início"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateRange.from}
                    onSelect={(date) => setDateRange(prev => ({ ...prev, from: date }))}
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="secondary" className="justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.to ? format(dateRange.to, "dd/MM/yyyy", { locale: ptBR }) : "Data fim"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateRange.to}
                    onSelect={(date) => setDateRange(prev => ({ ...prev, to: date }))}
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Colunas para Exportar</Label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(selectedColumns).map(([column, selected]) => {
                const columnNames = {
                  date: "Data",
                  plate: "Placa",
                  driver: "Motorista",
                  company: "Empresa",
                  product: "Produto",
                  grossWeight: "Peso Bruto",
                  tareWeight: "Tara",
                  netWeight: "Peso Líquido",
                  observations: "Observações",
                };

                return (
                  <div key={column} className="flex items-center space-x-2">
                    <Checkbox
                      id={column}
                      checked={selected}
                      onCheckedChange={() => toggleColumn(column)}
                    />
                    <Label htmlFor={column} className="text-sm">
                      {columnNames[column as keyof typeof columnNames]}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleExport} className="bg-primary-900 hover:bg-primary-900/80">
            <DownloadSimpleIcon className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
