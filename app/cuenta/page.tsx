"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, FileText, ArrowLeft } from "lucide-react"
import { DashboardFooter } from "@/components/dashboard-footer"

export default function MiCuentaPage() {
  const [userName, setUserName] = useState("Juan Pérez")
  const [userRole] = useState("Solicitante")
  const [email, setEmail] = useState("juan.perez@empresa.com")
  const [department, setDepartment] = useState("Recursos Humanos")
  const [isEditing, setIsEditing] = useState(false)

  const activityHistory = [
    { date: "2025-01-10", action: "Creó trámite", documentId: "DOC-2025-001" },
    { date: "2025-01-09", action: "Actualizó perfil", documentId: "-" },
    { date: "2025-01-08", action: "Descargó reporte", documentId: "REP-2025-045" },
    { date: "2025-01-07", action: "Creó trámite", documentId: "DOC-2025-002" },
    { date: "2025-01-06", action: "Consultó documento", documentId: "DOC-2025-003" },
  ]

  const handleSaveProfile = () => {
    setIsEditing(false)
    alert("Perfil actualizado correctamente")
  }

  const handleChangePassword = () => {
    alert("Se ha enviado un enlace de cambio de contraseña a tu email")
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="border-b border-green-600/20 bg-[#10B981] px-6 py-6 shadow-md">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Hola, {userName} (Rol: {userRole})
              </h1>
              <p className="mt-1 text-sm text-white/90">Gestiona tu información personal y actividad</p>
            </div>
            <Button
              variant="outline"
              className="gap-2 border-white bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-[#10B981]"
              onClick={() => (window.location.href = `/${userRole.toLowerCase()}`)}
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <Card className="shadow-lg transition-shadow hover:shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#10B981]">
                <User className="h-6 w-6" />
                Datos Personales
              </CardTitle>
              <CardDescription>Administra tu información personal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                    id="name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    disabled={!isEditing}
                    className="disabled:opacity-70"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEditing}
                    className="disabled:opacity-70"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Departamento</Label>
                  <Input
                    id="department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    disabled={!isEditing}
                    className="disabled:opacity-70"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Rol</Label>
                  <Input id="role" value={userRole} disabled className="opacity-70" />
                </div>
              </div>

              <div className="flex gap-3">
                {!isEditing ? (
                  <>
                    <Button className="gap-2 bg-[#3B82F6] hover:bg-[#2563EB]" onClick={() => setIsEditing(true)}>
                      Editar Perfil
                    </Button>
                    <Button className="gap-2 bg-[#10B981] hover:bg-[#059669]" onClick={handleChangePassword}>
                      Cambiar Contraseña
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="gap-2 bg-[#3B82F6] hover:bg-[#2563EB]" onClick={handleSaveProfile}>
                      Guardar Cambios
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancelar
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg transition-shadow hover:shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#10B981]">
                <FileText className="h-6 w-6" />
                Historial de Actividad
              </CardTitle>
              <CardDescription>Últimas acciones realizadas en el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Fecha</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Acción</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Documento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activityHistory.map((activity, index) => (
                      <tr key={index} className="border-b border-gray-100 transition-colors hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-600">{activity.date}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{activity.action}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{activity.documentId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600">Mostrando 5 actividades recientes</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white bg-transparent"
                >
                  Ver Todo el Historial
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <DashboardFooter />
    </div>
  )
}
