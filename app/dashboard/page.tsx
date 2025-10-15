import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"

export default function DocFlowLanding() {
  const teamMembers = [
    { name: "Abram Ortiz Martínez", initials: "AO" },
    { name: "José Jerónimo Medrano Flores", initials: "JM" },
    { name: "Jesús Abdiel Chapa Cruz", initials: "JC" },
  ] 

  const projectSections = [
    {
      id: "1",
      icon: "📋",
      title: "Introducción / Información del Proyecto",
      description:
        "DocFlow automatiza la gestión de documentos internos, eliminando procesos manuales y estableciendo flujos de trabajo estructurados.",
    },
    {
      id: "2",
      icon: "👥",
      title: "Stakeholders / Actores Involucrados",
      description:
        "Usuarios iniciadores, revisores, aprobadores, auditores y administradores con permisos y responsabilidades específicas.",
    },
    {
      id: "3",
      icon: "⚙️",
      title: "Requerimientos Funcionales",
      description:
        "Flujo de 6 etapas: Iniciación, Revisión, Asignación, Aprobación, Auditoría y Finalización con trazabilidad completa.",
    },
    {
      id: "4",
      icon: "🛡️",
      title: "Requerimientos No Funcionales",
      description:
        "Rendimiento < 2s, seguridad robusta, escalabilidad para 1000+ usuarios, 99.9% uptime y usabilidad intuitiva.",
    },
    {
      id: "5",
      icon: "🔍",
      title: "Recolección de Información / Técnicas",
      description:
        "Entrevistas, análisis de procesos, encuestas y workshops colaborativos para identificar necesidades clave.",
    },
    {
      id: "6",
      icon: "📊",
      title: "Clasificación y Priorización",
      description:
        "Requerimientos clasificados por criticidad e impacto, priorizados según viabilidad técnica y dependencias.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="mb-6 font-sans text-5xl font-bold text-[#10B981] md:text-6xl lg:text-7xl">
            DocFlow: Flujo de Aprobaciones y Control de Documentos Internos
          </h1>
          <p className="mb-8 text-2xl font-medium text-[#3B82F6] md:text-3xl">
            Automatiza tus documentos internos y reduce tiempos en 50%
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/registro">
              <Button
                size="lg"
                className="animate-pulse bg-[#3B82F6] px-10 py-7 text-xl font-semibold text-white shadow-lg transition-all hover:bg-[#10B981] hover:shadow-xl"
              >
                Prueba Gratis
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="px-10 py-7 text-xl font-semibold text-[#3B82F6] border-[#3B82F6] hover:bg-[#3B82F6] hover:text-white"
              >
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-[#10B981]">Equipo de Desarrollo:</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center gap-3 text-center">
                <Avatar className="h-28 w-28 bg-[#3B82F6] shadow-lg">
                  <AvatarFallback className="text-2xl font-bold text-white">{member.initials}</AvatarFallback>
                </Avatar>
                <p className="font-semibold text-gray-800">{member.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Index Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-4xl font-bold text-[#10B981]">Índice del Proyecto</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projectSections.map((section, index) => (
              <Card
                key={section.id}
                className="animate-in fade-in bg-[#3B82F6] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="mb-4 text-5xl">{section.icon}</div>
                  <h3 className="mb-3 text-xl font-bold text-[#10B981]">{section.title}</h3>
                  <p className="leading-relaxed text-white">{section.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl text-center">
          <Link href="/login">
            <Button
              size="lg"
              className="animate-pulse bg-[#3B82F6] px-12 py-8 text-2xl font-bold text-white shadow-2xl transition-all hover:scale-110 hover:bg-[#10B981]"
            >
              Explorar Demo
            </Button>
          </Link>
          <Link href="/login" className="ml-4">
            <Button
              size="lg"
              variant="outline"
              className="px-12 py-8 text-2xl font-bold text-[#3B82F6] border-[#3B82F6] hover:bg-[#3B82F6] hover:text-white"
            >
              Iniciar Sesión
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 text-center">
            <h3 className="text-3xl font-bold text-[#10B981]">DocFlow</h3>
          </div>
          <div className="mb-4 flex justify-center gap-6">
            <a href="#" className="font-medium text-[#3B82F6] transition-colors hover:text-[#10B981]">
              Contacto
            </a>
            <a href="#" className="font-medium text-[#3B82F6] transition-colors hover:text-[#10B981]">
              Soporte
            </a>
            <a href="#" className="font-medium text-[#3B82F6] transition-colors hover:text-[#10B981]">
              Documentación
            </a>
          </div>
          <p className="text-center text-gray-600">Desarrollado por el equipo DocFlow</p>
          <p className="mt-2 text-center text-sm text-gray-500">© 2025 DocFlow. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}