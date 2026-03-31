import sgMail from '@sendgrid/mail'
import type { MultiPartData } from 'h3'

export default defineEventHandler(async (event) => {
  // ── Config ────────────────────────────────────────────────────────────────
  const config = useRuntimeConfig()
  sgMail.setApiKey(config.sendgridApiKey)

  // ── Parse multipart form ──────────────────────────────────────────────────
  let parts: MultiPartData[] | undefined

  try {
    parts = await readMultipartFormData(event)
  } catch {
    throw createError({ statusCode: 400, statusMessage: 'Invalid multipart data' })
  }

  if (!parts?.length) {
    throw createError({ statusCode: 400, statusMessage: 'Empty form submission' })
  }

  // ── Extract fields ────────────────────────────────────────────────────────
  const fields: Record<string, string> = {}
  let cvAttachment: { filename: string; content: string; type: string } | null = null

  for (const part of parts) {
    if (!part.name) continue

    if (part.name === 'cv' && part.filename) {
      cvAttachment = {
        filename: part.filename,
        content: Buffer.from(part.data).toString('base64'),
        type: part.type ?? 'application/octet-stream',
      }
    } else {
      fields[part.name] = part.data.toString('utf-8')
    }
  }

  // ── Validate required fields ──────────────────────────────────────────────
  const required = ['name', 'email', 'phone', 'comuna', 'area', 'location', 'gdpr']
  const missing = required.filter((k) => !fields[k])

  if (missing.length) {
    throw createError({
      statusCode: 422,
      statusMessage: `Missing required fields: ${missing.join(', ')}`,
    })
  }

  if (fields.gdpr !== 'true') {
    throw createError({ statusCode: 422, statusMessage: 'GDPR consent not given' })
  }

  if (!cvAttachment) {
    throw createError({ statusCode: 422, statusMessage: 'CV file is required' })
  }

  // ── Build e-mail ──────────────────────────────────────────────────────────
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 620px; color: #1a1a1a;">
      <div style="background: #B21915; padding: 24px 32px; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; color: #fff; font-size: 22px;">
          Nueva postulación — Motomundi
        </h1>
      </div>

      <div style="background: #f9f9f9; padding: 32px; border-radius: 0 0 8px 8px; border: 1px solid #e5e5e5; border-top: none;">

        <h2 style="margin: 0 0 20px; font-size: 16px; color: #555; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em;">
          Datos del candidato
        </h2>

        <table style="width: 100%; border-collapse: collapse;">
          ${row('Nombre',               fields.name)}
          ${row('Correo',               `<a href="mailto:${fields.email}">${fields.email}</a>`)}
          ${row('Teléfono',             `<a href="tel:${fields.phone}">${fields.phone}</a>`)}
          ${row('Comuna',               fields.comuna)}
          ${row('Área de interés',      fields.area)}
          ${row('Ubicación preferida',  fields.location)}
        </table>

        ${
    fields.message
      ? `<h2 style="margin: 28px 0 10px; font-size: 16px; color: #555; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em;">
                 Mensaje adicional
               </h2>
               <p style="margin: 0; background: #fff; padding: 16px; border-radius: 6px; border: 1px solid #e5e5e5; white-space: pre-wrap;">${escapeHtml(fields.message)}</p>`
      : ''
  }

        <p style="margin: 28px 0 0; font-size: 12px; color: #999;">
          El candidato aceptó el tratamiento de sus datos personales para este proceso de selección.<br>
          CV adjunto al correo.
        </p>
      </div>
    </div>
  `

  // ── Send ──────────────────────────────────────────────────────────────────
  try {
    await sgMail.send({
      to: ['jcfuentes@motomundi.cl', 'andrea@motomundi.cl'],
      from: {
        email: "ventas@motomundi.cl" as string,  // must be a verified sender in SendGrid
        name: 'Motomundi — Postulaciones',
      },
      replyTo: { email: fields.email, name: fields.name },
      subject: `Postulación: ${fields.name} — ${fields.area}`,
      html,
      attachments: [
        {
          filename: cvAttachment.filename,
          content: cvAttachment.content,
          type: cvAttachment.type,
          disposition: 'attachment',
        },
      ],
    })
  } catch (err: unknown) {
    console.error('[work-with-us] SendGrid error:', err)
    throw createError({ statusCode: 502, statusMessage: 'Failed to send email' })
  }

  return { success: true }
})

// ── Helpers ───────────────────────────────────────────────────────────────────
function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding: 10px 12px; background:#fff; font-weight:600; width:38%; border:1px solid #e5e5e5; font-size:14px;">${label}</td>
      <td style="padding: 10px 12px; background:#fff; border:1px solid #e5e5e5; font-size:14px;">${value}</td>
    </tr>`
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
