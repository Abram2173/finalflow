export function generateFolio(tipo: string): string {
  const year = new Date().getFullYear()
  const month = String(new Date().getMonth() + 1).padStart(2, "0")
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")

  const prefijos: Record<string, string> = {
    compra: "COM",
    reembolso: "REM",
    vacaciones: "VAC",
    permiso: "PER",
    oficio: "OFI",
    solicitud: "SOL",
  }

  const prefijo = prefijos[tipo.toLowerCase()] || "DOC"

  return `${prefijo}-${year}${month}-${random}`
}

export function generateQRData(folio: string, tipo: string, fecha: string): string {
  return JSON.stringify({
    folio,
    tipo,
    fecha,
    url: `https://docflow.com/documento/${folio}`,
    timestamp: new Date().toISOString(),
  })
}
