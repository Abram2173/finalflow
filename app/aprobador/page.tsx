"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardFooter } from "@/components/dashboard-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, Clock, MessageSquare, QrCode } from "lucide-react"
import { QRGenerator } from "@/components/qr-generator"
import { generateQRData } from "@/lib/folio-generator"

const sidebarItems = [
  { label: "Pendientes", href: "/aprobador", icon: "⏳" },
  { label: "Historial", href: "/aprobador/historial", icon: "📜" },
  { label: "Notificaciones", href: "/aprobador/notificaciones", icon: "🔔" },
]

const pendientes = [
  {
    id: "COM-202501-0001",
    creador: "Juan Pérez",
    tipo: "Solicitud de Compra",
    estado: "Pendiente",
    fecha: "2025-01-08",
    contenido: "Solicitud de compra de 10 laptops para el departamento de TI",
  },
  {
    id: "VAC-202501-0003",
    creador: "María García",
    tipo: "Vacaciones",
    estado: "Pendiente",
    fecha: "2025-01-10",
    contenido: "Solicitud de vacaciones del 15 al 30 de enero",
  },
  {
    id: "REM-202501-0005",
    creador: "Carlos López",
    tipo: "Reembolso",
    estado: "Pendiente",
    fecha: "2025-01-09",
    contenido: "Reembolso de gastos de viaje por $2,500 MXN",
  },
]

const historial = [
  {
    id: "COM-202501-0002",
    creador: "Ana Martínez",
    tipo: "Compra",
    decision: "Aprobado",
    fecha: "2025-01-07",
    qrPreliminar: "COM-202501-0002-PRELIM",
  },
  {
    id: "REM-202501-0001",
    creador: "Pedro Sánchez",
    tipo: "Reembolso",
    decision: "Aprobado",
    fecha: "2025-01-06",
    qrPreliminar: "REM-202501-0001-PRELIM",
  },
  {
    id: "VAC-202501-0002",
    creador: "Laura Gómez",
    tipo: "Vacaciones",
    decision: "Rechazado",
    fecha: "2025-01-05",
    qrPreliminar: "VAC-202501-0002-PRELIM",
  },
]

const bitacora = [
  { fecha: "2025-01-08 10:30", accion: "Documento creado", usuario: "Juan Pérez" },
  { fecha: "2025-01-08 11:15", accion: "Enviado a revisión", usuario: "Sistema" },
  { fecha: "2025-01-08 14:20", accion: "Asignado a aprobador", usuario: "Sistema" },
]

export default function AprobadorPage() {
  const [comentario, setComentario] = useState("")
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null)
  const [viewingDoc, setViewingDoc] = useState<(typeof pendientes)[0] | null>(null)
  const [showHistorial, setShowHistorial] = useState(false)

  const handleAprobar = (id: string) => {
    if (!comentario.trim()) {
      alert("Por favor agrega un comentario antes de aprobar")
      return
    }
    alert(`Documento ${id} aprobado con comentario: ${comentario}`)
    setComentario("")
    setSelectedDoc(null)
    setViewingDoc(null)
  }

  const handleRechazar = (id: string) => {
    if (!comentario.trim()) {
      alert("Por favor agrega un comentario explicando el rechazo")
      return
    }
    alert(`Documento ${id} rechazado con comentario: ${comentario}`)
    setComentario("")
    setSelectedDoc(null)
    setViewingDoc(null)
  }

  const handleComentar = (id: string) => {
    if (!comentario.trim()) {
      alert("Por favor escribe un comentario")
      return
    }
    alert(`Comentario agregado al documento ${id}: ${comentario}`)
    setComentario("")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader userName="Aprobador" role="Rol: Aprobador" />
      <div className="flex flex-1">
        <DashboardSidebar items={sidebarItems} />
        <main className="flex-1 bg-gray-50 p-6">
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="flex gap-3">
              <Button
                variant={!showHistorial ? "default" : "outline"}
                onClick={() => setShowHistorial(false)}
                className={!showHistorial ? "bg-[#10B981] hover:bg-[#059669]" : ""}
              >
                Pendientes
              </Button>
              <Button
                variant={showHistorial ? "default" : "outline"}
                onClick={() => setShowHistorial(true)}
                className={showHistorial ? "bg-[#3B82F6] hover:bg-[#2563EB]" : ""}
              >
                Historial
              </Button>
            </div>

            {!showHistorial ? (
              <>
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl text-[#10B981]">
                      <Clock className="h-6 w-6" />
                      Trámites Pendientes de Aprobación
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Folio</TableHead>
                          <TableHead>Creador</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Fecha</TableHead>
                          <TableHead>Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendientes.map((doc) => (
                          <TableRow key={doc.id} className="hover:bg-gray-50 transition-colors">
                            <TableCell className="font-medium">{doc.id}</TableCell>
                            <TableCell>{doc.creador}</TableCell>
                            <TableCell>{doc.tipo}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{doc.estado}</Badge>
                            </TableCell>
                            <TableCell>{doc.fecha}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => setViewingDoc(doc)}>
                                  Ver
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-[#10B981] hover:bg-[#059669]"
                                  onClick={() => {
                                    setSelectedDoc(doc.id)
                                    setViewingDoc(doc)
                                  }}
                                >
                                  <CheckCircle className="mr-1 h-4 w-4" />
                                  Aprobar
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => {
                                    setSelectedDoc(doc.id)
                                    setViewingDoc(doc)
                                  }}
                                >
                                  <XCircle className="mr-1 h-4 w-4" />
                                  Rechazar
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {viewingDoc && (
                  <Card className="shadow-lg animate-in fade-in slide-in-from-top-2">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-xl text-[#10B981]">
                        <span>Detalles del Documento - {viewingDoc.id}</span>
                        <QRGenerator
                          value={generateQRData(viewingDoc.id, viewingDoc.tipo, viewingDoc.fecha)}
                          size={80}
                        />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="rounded-lg border bg-gray-50 p-4">
                        <p className="text-sm font-medium text-gray-600 mb-2">Contenido:</p>
                        <p className="text-gray-900">{viewingDoc.contenido}</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="comentario">Comentarios / Observaciones</Label>
                        <Textarea
                          id="comentario"
                          value={comentario}
                          onChange={(e) => setComentario(e.target.value)}
                          placeholder="Escribe tus comentarios aquí..."
                          rows={4}
                        />
                      </div>
                      {selectedDoc === viewingDoc.id ? (
                        <div className="flex gap-3">
                          <Button
                            className="flex-1 bg-[#10B981] hover:bg-[#059669]"
                            onClick={() => handleAprobar(selectedDoc)}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Confirmar Aprobación
                          </Button>
                          <Button className="flex-1" variant="destructive" onClick={() => handleRechazar(selectedDoc)}>
                            <XCircle className="mr-2 h-4 w-4" />
                            Confirmar Rechazo
                          </Button>
                        </div>
                      ) : (
                        <Button
                          className="w-full bg-[#3B82F6] hover:bg-[#2563EB]"
                          onClick={() => handleComentar(viewingDoc.id)}
                        >
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Agregar Comentario
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )}

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-[#10B981]">Bitácora de Actividades</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {bitacora.map((entry, index) => (
                        <div key={index} className="flex items-start gap-3 border-l-2 border-[#3B82F6] pl-4">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{entry.accion}</p>
                            <p className="text-sm text-gray-600">
                              {entry.usuario} - {entry.fecha}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl text-[#3B82F6]">
                    <QrCode className="h-6 w-6" />
                    Historial de Documentos Revisados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Folio</TableHead>
                        <TableHead>Creador</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Decisión</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>QR Preliminar</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {historial.map((doc) => (
                        <TableRow key={doc.id} className="hover:bg-gray-50 transition-colors">
                          <TableCell className="font-medium">{doc.id}</TableCell>
                          <TableCell>{doc.creador}</TableCell>
                          <TableCell>{doc.tipo}</TableCell>
                          <TableCell>
                            <Badge variant={doc.decision === "Aprobado" ? "default" : "destructive"}>
                              {doc.decision}
                            </Badge>
                          </TableCell>
                          <TableCell>{doc.fecha}</TableCell>
                          <TableCell>
                            <QRGenerator value={doc.qrPreliminar} size={48} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
      <DashboardFooter />
    </div>
  )
}
