"use client"

import type React from "react"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardFooter } from "@/components/dashboard-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText, Upload, Save, Send, QrCode, Bell, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import { QRGenerator } from "@/components/qr-generator"
import { generateFolio, generateQRData } from "@/lib/folio-generator"

const sidebarItems = [
  { label: "Crear Trámite", href: "/solicitante", icon: "➕" },
  { label: "Mis Trámites", href: "/solicitante/tramites", icon: "📋" },
  { label: "Notificaciones", href: "/solicitante/notificaciones", icon: "🔔" },
]

const tramites = [
  {
    id: "COM-202501-0001",
    tipo: "Solicitud de Compra",
    estado: "En Revisión",
    fecha: "2025-01-08",
    qr: "COM-202501-0001",
  },
  { id: "REM-202501-0002", tipo: "Reembolso", estado: "Aprobado", fecha: "2025-01-05", qr: "REM-202501-0002" },
  { id: "VAC-202501-0003", tipo: "Vacaciones", estado: "Pendiente", fecha: "2025-01-10", qr: "VAC-202501-0003" },
]

const notificaciones = [
  { id: 1, mensaje: "Tu solicitud COM-202501-0001 está en revisión", tipo: "info", folio: "COM-202501-0001" },
  { id: 2, mensaje: "Tu reembolso REM-202501-0002 fue aprobado", tipo: "success", folio: "REM-202501-0002" },
  {
    id: 3,
    mensaje: "Tu solicitud VAC-202501-0003 requiere información adicional",
    tipo: "warning",
    folio: "VAC-202501-0003",
  },
]

export default function SolicitantePage() {
  const [titulo, setTitulo] = useState("")
  const [tipo, setTipo] = useState("")
  const [contenido, setContenido] = useState("")
  const [folio, setFolio] = useState("")
  const [qrData, setQrData] = useState("")
  const [showQR, setShowQR] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const handleTipoChange = (value: string) => {
    setTipo(value)
    const newFolio = generateFolio(value)
    setFolio(newFolio)
    const qr = generateQRData(newFolio, value, new Date().toISOString())
    setQrData(qr)
  }

  const handleSaveDraft = () => {
    if (!titulo || !tipo || !contenido) {
      alert("Por favor completa todos los campos")
      return
    }
    alert(`Borrador guardado con folio: ${folio}`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowQR(true)
    setTimeout(() => {
      alert(`Trámite creado exitosamente con folio: ${folio}`)
      setTitulo("")
      setTipo("")
      setContenido("")
      setFolio("")
      setQrData("")
      setShowQR(false)
    }, 3000)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 via-white to-green-50/20">
      <DashboardHeader userName="Solicitante" role="Rol: Solicitante" />
      <div className="flex flex-1">
        <DashboardSidebar items={sidebarItems} />
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-6xl space-y-6">
            <Alert className="animate-in fade-in slide-in-from-top-4 border-2 border-[#3B82F6]/20 bg-gradient-to-r from-blue-50 to-blue-100/50 shadow-lg duration-700">
              <AlertDescription className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3B82F6] shadow-md">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-semibold text-[#3B82F6]">
                    Bienvenido al panel de Solicitante. Aquí puedes crear nuevos trámites y dar seguimiento a tus
                    solicitudes.
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="group relative border-2 border-[#3B82F6] bg-white text-[#3B82F6] transition-all hover:bg-[#3B82F6] hover:text-white hover:scale-105"
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notificaciones
                  <Badge className="ml-2 animate-pulse bg-red-500 text-white">{notificaciones.length}</Badge>
                </Button>
              </AlertDescription>
            </Alert>

            {showNotifications && (
              <Card className="animate-in fade-in slide-in-from-top-4 border-2 border-blue-200 shadow-2xl duration-500">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                  <CardTitle className="flex items-center gap-2 text-xl text-[#10B981]">
                    <Bell className="h-5 w-5" />
                    Notificaciones Recientes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 p-6">
                  {notificaciones.map((notif, index) => (
                    <div
                      key={notif.id}
                      className={`animate-in fade-in slide-in-from-left-4 flex items-start gap-4 rounded-xl border-2 p-4 shadow-md transition-all hover:scale-[1.02] hover:shadow-lg ${
                        notif.tipo === "success"
                          ? "border-green-200 bg-gradient-to-r from-green-50 to-green-100/50"
                          : notif.tipo === "warning"
                            ? "border-yellow-200 bg-gradient-to-r from-yellow-50 to-yellow-100/50"
                            : "border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100/50"
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          notif.tipo === "success"
                            ? "bg-green-500"
                            : notif.tipo === "warning"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                        }`}
                      >
                        {notif.tipo === "success" ? (
                          <CheckCircle2 className="h-5 w-5 text-white" />
                        ) : notif.tipo === "warning" ? (
                          <AlertCircle className="h-5 w-5 text-white" />
                        ) : (
                          <Clock className="h-5 w-5 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{notif.mensaje}</p>
                        <p className="mt-1 text-xs font-medium text-gray-600">Folio: {notif.folio}</p>
                      </div>
                      <div className="rounded-lg bg-white p-2 shadow-inner">
                        <QRGenerator
                          value={generateQRData(notif.folio, "notificacion", new Date().toISOString())}
                          size={64}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <Card className="animate-in fade-in slide-in-from-bottom-4 border-2 border-green-200 shadow-2xl duration-700 delay-200">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
                <CardTitle className="flex items-center gap-3 text-2xl text-[#10B981]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#10B981] shadow-lg">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  Crear Nuevo Trámite
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {folio && (
                    <Alert className="animate-in zoom-in border-2 border-[#10B981] bg-gradient-to-r from-green-50 to-green-100 shadow-lg duration-500">
                      <AlertDescription className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#10B981] shadow-md">
                            <QrCode className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-600">Folio Generado</p>
                            <p className="text-lg font-bold text-[#10B981]">{folio}</p>
                          </div>
                        </div>
                        <Badge className="animate-pulse bg-[#10B981] px-4 py-2 text-sm text-white shadow-lg">
                          Activo
                        </Badge>
                      </AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="titulo">Título del Documento</Label>
                    <Input
                      id="titulo"
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                      placeholder="Ej: Solicitud de Compra de Equipos"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tipo">Tipo de Documento</Label>
                    <Select value={tipo} onValueChange={handleTipoChange} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="oficio">Oficio</SelectItem>
                        <SelectItem value="solicitud">Solicitud</SelectItem>
                        <SelectItem value="compra">Solicitud de Compra</SelectItem>
                        <SelectItem value="reembolso">Reembolso</SelectItem>
                        <SelectItem value="vacaciones">Solicitud de Vacaciones</SelectItem>
                        <SelectItem value="permiso">Permiso</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contenido">Contenido / Descripción</Label>
                    <Textarea
                      id="contenido"
                      value={contenido}
                      onChange={(e) => setContenido(e.target.value)}
                      placeholder="Describe los detalles de tu solicitud..."
                      rows={5}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adjunto">Adjuntar Archivo</Label>
                    <div className="flex items-center gap-2">
                      <Input id="adjunto" type="file" className="flex-1" />
                      <Button type="button" variant="outline" size="icon">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {showQR && qrData && (
                    <div className="animate-in zoom-in flex flex-col items-center gap-4 rounded-2xl border-4 border-[#10B981] bg-gradient-to-br from-green-50 via-white to-green-50 p-8 shadow-2xl duration-700">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#10B981] shadow-lg">
                        <CheckCircle2 className="h-8 w-8 text-white" />
                      </div>
                      <p className="text-xl font-bold text-[#10B981]">Código QR Generado</p>
                      <div className="rounded-xl bg-white p-4 shadow-xl ring-4 ring-[#10B981]/20">
                        <QRGenerator value={qrData} size={200} />
                      </div>
                      <p className="text-center text-sm font-medium text-gray-600">
                        Escanea este código para verificar tu documento
                      </p>
                      <Badge className="bg-[#10B981] px-4 py-2 text-sm text-white shadow-lg">Folio: {folio}</Badge>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 border-2 border-gray-300 bg-white transition-all hover:scale-105 hover:border-gray-400 hover:shadow-lg active:scale-95"
                      onClick={handleSaveDraft}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Guardar Borrador
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-[#10B981] to-[#059669] shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Enviar Trámite
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="animate-in fade-in slide-in-from-bottom-4 border-2 border-gray-200 shadow-2xl duration-700 delay-300">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                <CardTitle className="text-2xl text-[#10B981]">Mis Trámites</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-2">
                      <TableHead className="font-bold">Folio</TableHead>
                      <TableHead className="font-bold">Tipo</TableHead>
                      <TableHead className="font-bold">Estado</TableHead>
                      <TableHead className="font-bold">Fecha</TableHead>
                      <TableHead className="font-bold">QR</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tramites.map((tramite, index) => (
                      <TableRow
                        key={tramite.id}
                        className="animate-in fade-in border-b transition-all hover:bg-gradient-to-r hover:from-green-50 hover:to-transparent hover:shadow-md duration-300"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <TableCell className="font-bold text-gray-900">{tramite.id}</TableCell>
                        <TableCell className="font-medium">{tramite.tipo}</TableCell>
                        <TableCell>
                          <Badge
                            className={`shadow-md ${
                              tramite.estado === "Aprobado"
                                ? "bg-green-500 text-white"
                                : tramite.estado === "En Revisión"
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-500 text-white"
                            }`}
                          >
                            {tramite.estado}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium text-gray-600">{tramite.fecha}</TableCell>
                        <TableCell>
                          <div className="rounded-lg bg-gray-50 p-2 shadow-inner transition-all hover:scale-110 hover:shadow-lg">
                            <QRGenerator value={generateQRData(tramite.qr, tramite.tipo, tramite.fecha)} size={48} />
                          </div>
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
