"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardFooter } from "@/components/dashboard-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { BarChart3, FileText, TrendingUp, Download, FileSpreadsheet, QrCode } from "lucide-react"
import { QRGenerator } from "@/components/qr-generator"
import { generateQRData } from "@/lib/folio-generator"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const sidebarItems = [
  { label: "KPIs", href: "/auditor", icon: "📊" },
  { label: "Reportes", href: "/auditor/reportes", icon: "📄" },
  { label: "Bitácora Global", href: "/auditor/bitacora", icon: "📋" },
]

const historial = [
  {
    id: "COM-202501-0001",
    tipo: "Compra",
    estado: "Aprobado",
    tiempo: "2 días",
    fecha: "2025-01-08",
    qr: "COM-202501-0001",
  },
  {
    id: "REM-202501-0002",
    tipo: "Reembolso",
    estado: "Aprobado",
    tiempo: "1 día",
    fecha: "2025-01-05",
    qr: "REM-202501-0002",
  },
  {
    id: "VAC-202501-0003",
    tipo: "Vacaciones",
    estado: "Rechazado",
    tiempo: "3 días",
    fecha: "2025-01-10",
    qr: "VAC-202501-0003",
  },
  {
    id: "PER-202501-0004",
    tipo: "Permiso",
    estado: "Aprobado",
    tiempo: "1 día",
    fecha: "2025-01-07",
    qr: "PER-202501-0004",
  },
]

const tiempoCicloData = [
  { mes: "Sep", dias: 2.3 },
  { mes: "Oct", dias: 2.1 },
  { mes: "Nov", dias: 1.9 },
  { mes: "Dic", dias: 2.0 },
  { mes: "Ene", dias: 1.8 },
]

const rechazosData = [
  { mes: "Sep", porcentaje: 15 },
  { mes: "Oct", porcentaje: 12 },
  { mes: "Nov", porcentaje: 10 },
  { mes: "Dic", porcentaje: 9 },
  { mes: "Ene", porcentaje: 12 },
]

export default function AuditorPage() {
  const handleExportPDF = () => {
    alert("Generando reporte PDF con códigos QR...")
  }

  const handleExportExcel = () => {
    alert("Exportando datos a Excel...")
  }

  const handleExportCSV = () => {
    alert("Exportando datos a CSV...")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader userName="Auditor" role="Rol: Auditor" />
      <div className="flex flex-1">
        <DashboardSidebar items={sidebarItems} />
        <main className="flex-1 bg-gray-50 p-6">
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Tiempo Promedio de Ciclo</CardTitle>
                  <TrendingUp className="h-4 w-4 text-[#3B82F6]" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-[#10B981]">1.8 días</div>
                  <p className="text-xs text-gray-500">-15% vs mes anterior</p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">% de Rechazos</CardTitle>
                  <BarChart3 className="h-4 w-4 text-[#3B82F6]" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-[#10B981]">12%</div>
                  <p className="text-xs text-gray-500">+3% vs mes anterior</p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Documentos Procesados</CardTitle>
                  <FileText className="h-4 w-4 text-[#3B82F6]" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-[#10B981]">247</div>
                  <p className="text-xs text-gray-500">Este mes</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-[#10B981]">Tiempo de Ciclo (Últimos 5 Meses)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={tiempoCicloData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mes" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="dias" stroke="#10B981" strokeWidth={2} name="Días Promedio" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-[#10B981]">% de Rechazos (Últimos 5 Meses)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={rechazosData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mes" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="porcentaje" fill="#3B82F6" name="% Rechazos" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-[#10B981]">Generador de Reportes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Tipo de Reporte</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mensual">Reporte Mensual</SelectItem>
                        <SelectItem value="trimestral">Reporte Trimestral</SelectItem>
                        <SelectItem value="anual">Reporte Anual</SelectItem>
                        <SelectItem value="custom">Personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Departamento</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos los departamentos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="rh">Recursos Humanos</SelectItem>
                        <SelectItem value="finanzas">Finanzas</SelectItem>
                        <SelectItem value="ti">TI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  <Button className="bg-[#3B82F6] hover:bg-[#2563EB]" onClick={handleExportPDF}>
                    <Download className="mr-2 h-4 w-4" />
                    Exportar PDF
                  </Button>
                  <Button className="bg-[#10B981] hover:bg-[#059669]" onClick={handleExportExcel}>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    Exportar Excel
                  </Button>
                  <Button className="bg-[#3B82F6] hover:bg-[#2563EB]" onClick={handleExportCSV}>
                    <FileText className="mr-2 h-4 w-4" />
                    Exportar CSV
                  </Button>
                </div>
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="text-sm text-[#3B82F6]">
                    Los reportes PDF incluirán códigos QR para verificación de documentos
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-[#10B981]">
                  <QrCode className="h-6 w-6" />
                  Bitácora Global de Documentos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex gap-3">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filtrar por tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="compra">Compra</SelectItem>
                      <SelectItem value="reembolso">Reembolso</SelectItem>
                      <SelectItem value="vacaciones">Vacaciones</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filtrar por estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="aprobado">Aprobado</SelectItem>
                      <SelectItem value="rechazado">Rechazado</SelectItem>
                      <SelectItem value="pendiente">Pendiente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Folio</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Tiempo</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>QR</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {historial.map((doc) => (
                      <TableRow key={doc.id} className="hover:bg-gray-50 transition-colors">
                        <TableCell className="font-medium">{doc.id}</TableCell>
                        <TableCell>{doc.tipo}</TableCell>
                        <TableCell>{doc.estado}</TableCell>
                        <TableCell>{doc.tiempo}</TableCell>
                        <TableCell>{doc.fecha}</TableCell>
                        <TableCell>
                          <QRGenerator value={generateQRData(doc.qr, doc.tipo, doc.fecha)} size={48} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <DashboardFooter />
    </div>
  )
}
