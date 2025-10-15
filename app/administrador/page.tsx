"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardFooter } from "@/components/dashboard-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Users, Settings, FileText, Database, Edit, TrendingUp, Clock, CheckCircle2 } from "lucide-react"

const sidebarItems = [
  { label: "Usuarios", href: "/administrador", icon: "👥" },
  { label: "Flujos", href: "/administrador/flujos", icon: "🔄" },
  { label: "KPIs Globales", href: "/administrador/kpis", icon: "📊" },
  { label: "Reportes", href: "/administrador/reportes", icon: "📄" },
  { label: "Mantenimiento", href: "/administrador/mantenimiento", icon: "⚙️" },
]

const usuarios = [
  { id: 1, nombre: "Juan Pérez", email: "juan@empresa.com", rol: "Solicitante", estado: "Activo" },
  { id: 2, nombre: "María García", email: "maria@empresa.com", rol: "Aprobador", estado: "Activo" },
  { id: 3, nombre: "Carlos López", email: "carlos@empresa.com", rol: "Auditor", estado: "Activo" },
  { id: 4, nombre: "Ana Martínez", email: "ana@empresa.com", rol: "Solicitante", estado: "Pendiente" },
]

const etapasFlujo = [
  { numero: 1, nombre: "Iniciación", descripcion: "Creación del documento" },
  { numero: 2, nombre: "Revisión", descripcion: "Validación inicial" },
  { numero: 3, nombre: "Asignación", descripcion: "Asignación a aprobador" },
  { numero: 4, nombre: "Aprobación", descripcion: "Decisión final" },
  { numero: 5, nombre: "Auditoría", descripcion: "Revisión de cumplimiento" },
  { numero: 6, nombre: "Finalización", descripcion: "Cierre del proceso" },
]

export default function AdministradorPage() {
  const [selectedUser, setSelectedUser] = useState<number | null>(null)
  const [editingFlow, setEditingFlow] = useState(false)

  const handleApproveUser = (userId: number) => {
    alert(`Usuario ${userId} aprobado exitosamente`)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 via-white to-blue-50/20">
      <DashboardHeader userName="Administrador" role="Rol: Administrador" />
      <div className="flex flex-1">
        <DashboardSidebar items={sidebarItems} />
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            <div className="grid gap-6 md:grid-cols-4">
              <Card className="group animate-in fade-in slide-in-from-left-4 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl duration-500">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-semibold text-gray-600">Usuarios Totales</CardTitle>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3B82F6] shadow-lg transition-all group-hover:scale-110">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-[#10B981]">156</div>
                  <p className="mt-1 flex items-center gap-1 text-xs text-green-600">
                    <TrendingUp className="h-3 w-3" />
                    +12% este mes
                  </p>
                </CardContent>
              </Card>

              <Card className="group animate-in fade-in slide-in-from-left-4 border-2 border-green-200 bg-gradient-to-br from-green-50 to-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl duration-500 delay-100">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-semibold text-gray-600">Documentos Activos</CardTitle>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#10B981] shadow-lg transition-all group-hover:scale-110">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-[#10B981]">89</div>
                  <p className="mt-1 flex items-center gap-1 text-xs text-green-600">
                    <TrendingUp className="h-3 w-3" />
                    +8% esta semana
                  </p>
                </CardContent>
              </Card>

              <Card className="group animate-in fade-in slide-in-from-left-4 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl duration-500 delay-200">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-semibold text-gray-600">Tiempo Promedio</CardTitle>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 shadow-lg transition-all group-hover:scale-110">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-[#10B981]">1.8d</div>
                  <p className="mt-1 flex items-center gap-1 text-xs text-green-600">
                    <TrendingUp className="h-3 w-3" />
                    -15% más rápido
                  </p>
                </CardContent>
              </Card>

              <Card className="group animate-in fade-in slide-in-from-left-4 border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl duration-500 delay-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-semibold text-gray-600">Tasa de Aprobación</CardTitle>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 shadow-lg transition-all group-hover:scale-110">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-[#10B981]">94%</div>
                  <p className="mt-1 flex items-center gap-1 text-xs text-green-600">
                    <TrendingUp className="h-3 w-3" />
                    +3% este mes
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="animate-in fade-in slide-in-from-bottom-4 border-2 border-gray-200 shadow-2xl duration-700">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
                <CardTitle className="flex items-center gap-3 text-2xl text-[#10B981]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#10B981] shadow-lg">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  Gestión de Usuarios
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-2">
                      <TableHead className="font-bold">Nombre</TableHead>
                      <TableHead className="font-bold">Email</TableHead>
                      <TableHead className="font-bold">Rol</TableHead>
                      <TableHead className="font-bold">Estado</TableHead>
                      <TableHead className="font-bold">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usuarios.map((usuario, index) => (
                      <TableRow
                        key={usuario.id}
                        className="animate-in fade-in border-b transition-all hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:shadow-md duration-300"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <TableCell className="font-semibold text-gray-900">{usuario.nombre}</TableCell>
                        <TableCell className="font-medium text-gray-600">{usuario.email}</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-500 text-white shadow-md">{usuario.rol}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`shadow-md ${usuario.estado === "Activo" ? "bg-green-500 text-white" : "bg-yellow-500 text-white"}`}
                          >
                            {usuario.estado}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedUser(usuario.id)}
                              className="transition-all hover:scale-110 hover:border-blue-500 hover:text-blue-500"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            {usuario.estado === "Pendiente" && (
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-[#10B981] to-[#059669] shadow-md transition-all hover:scale-110 hover:shadow-lg"
                                onClick={() => handleApproveUser(usuario.id)}
                              >
                                Aprobar
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="animate-in fade-in slide-in-from-bottom-4 border-2 border-blue-200 shadow-2xl duration-700 delay-200">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                <CardTitle className="flex items-center gap-3 text-2xl text-[#10B981]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#3B82F6] shadow-lg">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                  Editor de Flujos de Trabajo (6 Etapas)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-6 flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setEditingFlow(!editingFlow)}
                    className="border-2 border-[#3B82F6] bg-white text-[#3B82F6] transition-all hover:bg-[#3B82F6] hover:text-white hover:scale-105"
                  >
                    {editingFlow ? "✓ Guardar Cambios" : "✏️ Editar Flujo"}
                  </Button>
                </div>
                <div className="space-y-2">
                  {etapasFlujo.map((etapa, index) => (
                    <div
                      key={etapa.numero}
                      className="animate-in fade-in slide-in-from-left-4"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="group flex items-center gap-4 rounded-xl border-2 border-gray-200 bg-gradient-to-r from-white to-blue-50/30 p-5 shadow-md transition-all hover:scale-[1.02] hover:border-[#3B82F6] hover:shadow-xl">
                        <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#3B82F6] to-[#2563EB] text-2xl font-bold text-white shadow-lg ring-4 ring-blue-100 transition-all group-hover:scale-110 group-hover:ring-[#3B82F6]/30">
                          {etapa.numero}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-gray-900">{etapa.nombre}</h4>
                          <p className="text-sm font-medium text-gray-600">{etapa.descripcion}</p>
                        </div>
                        {editingFlow && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="transition-all hover:scale-110 hover:border-[#3B82F6] hover:text-[#3B82F6] bg-transparent"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      {index < etapasFlujo.length - 1 && (
                        <div className="ml-7 flex h-10 items-center">
                          <div className="relative h-full w-1 overflow-hidden rounded-full bg-gradient-to-b from-[#3B82F6] to-[#2563EB] shadow-md">
                            <div className="absolute inset-0 animate-pulse bg-white/30" />
                          </div>
                          <div className="ml-[-5px] h-3 w-3 animate-pulse rounded-full bg-[#3B82F6] shadow-lg ring-2 ring-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-6 animate-in fade-in rounded-xl bg-gradient-to-r from-green-50 to-green-100 p-5 shadow-lg duration-700 delay-500">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#10B981] shadow-md">
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                    <p className="font-semibold text-[#10B981]">
                      Cada etapa genera un folio único y código QR para trazabilidad completa del documento
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-in fade-in slide-in-from-bottom-4 border-2 border-gray-200 shadow-2xl duration-700 delay-300">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                <CardTitle className="flex items-center gap-3 text-2xl text-[#10B981]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-700 shadow-lg">
                    <Database className="h-6 w-6 text-white" />
                  </div>
                  Mantenimiento del Sistema
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <Button className="group h-20 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95">
                    <Database className="mr-3 h-6 w-6 transition-all group-hover:scale-110" />
                    <span className="text-lg font-semibold">Crear Backup</span>
                  </Button>
                  <Button className="group h-20 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95">
                    <Settings className="mr-3 h-6 w-6 transition-all group-hover:scale-110" />
                    <span className="text-lg font-semibold">Configurar Notificaciones</span>
                  </Button>
                  <Button className="group h-20 bg-gradient-to-r from-[#10B981] to-[#059669] shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95">
                    <FileText className="mr-3 h-6 w-6 transition-all group-hover:scale-110" />
                    <span className="text-lg font-semibold">Ver Logs del Sistema</span>
                  </Button>
                  <Button className="group h-20 bg-gradient-to-r from-[#10B981] to-[#059669] shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95">
                    <Settings className="mr-3 h-6 w-6 transition-all group-hover:scale-110" />
                    <span className="text-lg font-semibold">Integración ERP</span>
                  </Button>
                </div>
                <div className="animate-in fade-in rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 p-5 shadow-lg duration-700 delay-500">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3B82F6] shadow-md">
                      <CheckCircle2 className="h-5 w-5 animate-pulse text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#3B82F6]">Sistema Operando Normalmente</p>
                      <p className="text-sm text-blue-700">
                        Último backup: 2025-01-10 03:00 AM | Integraciones activas: 3
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <DashboardFooter />
    </div>
  )
}
