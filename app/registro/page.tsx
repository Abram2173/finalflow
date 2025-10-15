"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { UserPlus, ArrowLeft } from "lucide-react"

export default function RegistroPage() {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [departamento, setDepartamento] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validar email institucional
    const institutionalDomains = ["empresa.com", "docflow.com", "institucion.edu"]
    const domain = email.split("@")[1]

    if (!institutionalDomains.includes(domain)) {
      alert("Por favor usa un correo institucional válido")
      return
    }

    // Simular envío de solicitud al administrador
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <UserPlus className="h-8 w-8 text-[#10B981]" />
            </div>
            <CardTitle className="text-2xl font-bold text-[#10B981]">Solicitud Enviada</CardTitle>
            <CardDescription className="text-base">
              Tu solicitud de registro ha sido enviada al administrador para su aprobación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-blue-50 p-4">
              <p className="text-sm text-[#3B82F6]">
                Recibirás un correo electrónico cuando tu cuenta sea aprobada. Esto puede tomar de 1 a 2 días hábiles.
              </p>
            </div>
            <Link href="/login">
              <Button className="w-full bg-[#3B82F6] hover:bg-[#2563EB]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold text-[#10B981]">Solicitar Cuenta</CardTitle>
          <CardDescription className="text-base text-gray-600">
            Completa el formulario para solicitar acceso a DocFlow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="nombre" className="text-base font-medium">
                Nombre Completo
              </Label>
              <Input
                id="nombre"
                type="text"
                placeholder="Juan Pérez García"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="h-11 border-gray-300 focus:border-[#3B82F6] focus:ring-[#3B82F6]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-medium">
                Correo Electrónico Institucional
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="juan.perez@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 border-gray-300 focus:border-[#3B82F6] focus:ring-[#3B82F6]"
              />
              <p className="text-xs text-gray-500">Debe ser un correo institucional válido</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="departamento" className="text-base font-medium">
                Departamento
              </Label>
              <Select value={departamento} onValueChange={setDepartamento} required>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Selecciona tu departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recursos-humanos">Recursos Humanos</SelectItem>
                  <SelectItem value="finanzas">Finanzas</SelectItem>
                  <SelectItem value="operaciones">Operaciones</SelectItem>
                  <SelectItem value="ti">Tecnología de la Información</SelectItem>
                  <SelectItem value="ventas">Ventas</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              className="h-11 w-full bg-[#10B981] text-base font-semibold text-white transition-all hover:bg-[#059669] hover:shadow-lg"
            >
              <UserPlus className="mr-2 h-5 w-5" />
              Enviar Solicitud
            </Button>
            <div className="text-center">
              <Link href="/login" className="text-sm font-medium text-[#3B82F6] hover:text-[#2563EB] hover:underline">
                ¿Ya tienes cuenta? Inicia sesión
              </Link>
            </div>
          </form>
          <div className="mt-8 border-t pt-6">
            <p className="text-center text-xs text-gray-500">
              Desarrollado por Abram Ortiz Martínez, José Jerónimo Medrano Flores, Jesús Abdiel Chapa Cruz
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
