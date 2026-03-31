import sgMail from '@sendgrid/mail'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  sgMail.setApiKey(config.sendgridApiKey)

  const body = await readBody(event)

  const {
    firstName,
    lastName,
    email,
    phone,
    channelType,
    audienceSize,
    channelUrl,
    message,
  } = body

  // ── Basic validation ────────────────────────────────────────────
  if (!firstName || !lastName || !email || !channelType || !audienceSize || !channelUrl || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Faltan campos obligatorios.',
    })
  }

  const emailRegex = /.+@.+\..+/
  if (!emailRegex.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'El correo electrónico no es válido.',
    })
  }

  // ── Build email ─────────────────────────────────────────────────
  const msg = {
    to:      'jcfuentes@motomundi.cl',
    from:    'ventas@motomundi.cl', // must be a verified sender in SendGrid
    replyTo: email,
    subject: `Nueva postulación de afiliado – ${firstName} ${lastName}`,
    text: buildPlainText({ firstName, lastName, email, phone, channelType, audienceSize, channelUrl, message }),
    html: buildHtml({ firstName, lastName, email, phone, channelType, audienceSize, channelUrl, message }),
  }

  try {
    await sgMail.send(msg)
    return { success: true }
  } catch (error) {
    console.error('[affiliate-apply] SendGrid error:', error?.response?.body ?? error)
    throw createError({
      statusCode: 502,
      statusMessage: 'No se pudo enviar el correo. Intenta nuevamente.',
    })
  }
})

// ── Plain-text fallback ─────────────────────────────────────────
function buildPlainText(d) {
  return `
NUEVA POSTULACIÓN DE AFILIADO – MOTOMUNDI
==========================================

DATOS PERSONALES
-----------------
Nombre:    ${d.firstName} ${d.lastName}
Email:     ${d.email}
Teléfono:  ${d.phone || 'No indicado'}

CANAL / PLATAFORMA
------------------
Tipo de canal:      ${d.channelType}
Tamaño audiencia:   ${d.audienceSize}
URL:                ${d.channelUrl}

MENSAJE
-------
${d.message}

--
Este correo fue generado automáticamente desde el formulario de afiliados de motomundi.cl
`.trim()
}

// ── HTML email ──────────────────────────────────────────────────
function buildHtml(d) {
  const brand   = '#B21915'
  const surface = '#f7f7f7'
  const border  = '#e8e8e8'
  const text    = '#222222'
  const muted   = '#777777'

  const row = (label, value) => `
    <tr>
      <td style="padding:10px 16px;font-size:13px;color:${muted};font-weight:600;
                 white-space:nowrap;border-bottom:1px solid ${border};width:160px;">
        ${label}
      </td>
      <td style="padding:10px 16px;font-size:14px;color:${text};
                 border-bottom:1px solid ${border};">
        ${value || '<span style="color:#bbb">No indicado</span>'}
      </td>
    </tr>`

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Nueva postulación de afiliado</title>
</head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f0;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
               style="max-width:600px;width:100%;background:#ffffff;
                      border-radius:16px;overflow:hidden;
                      box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:${brand};padding:32px 40px;">
              <p style="margin:0 0 4px;font-size:11px;font-weight:700;
                        letter-spacing:0.1em;text-transform:uppercase;
                        color:rgba(255,255,255,0.6);">
                Programa de Afiliados
              </p>
              <h1 style="margin:0;font-size:22px;font-weight:900;color:#ffffff;
                         letter-spacing:-0.02em;line-height:1.2;">
                Nueva postulación de afiliado
              </h1>
              <p style="margin:10px 0 0;font-size:13px;color:rgba(255,255,255,0.75);">
                Recibida desde motomundi.cl
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 40px 0;">

              <!-- Section: Datos personales -->
              <p style="margin:0 0 12px;font-size:11px;font-weight:700;
                        letter-spacing:0.1em;text-transform:uppercase;color:${brand};">
                Datos personales
              </p>
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="border:1px solid ${border};border-radius:10px;
                            overflow:hidden;margin-bottom:28px;">
                ${row('Nombre', `${d.firstName} ${d.lastName}`)}
                ${row('Email', `<a href="mailto:${d.email}" style="color:${brand};text-decoration:none;">${d.email}</a>`)}
                ${row('Teléfono', d.phone)}
              </table>

              <!-- Section: Canal -->
              <p style="margin:0 0 12px;font-size:11px;font-weight:700;
                        letter-spacing:0.1em;text-transform:uppercase;color:${brand};">
                Canal o plataforma
              </p>
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="border:1px solid ${border};border-radius:10px;
                            overflow:hidden;margin-bottom:28px;">
                ${row('Tipo de canal', d.channelType)}
                ${row('Audiencia', d.audienceSize)}
                ${row('URL', `<a href="${d.channelUrl}" target="_blank"
                              style="color:${brand};text-decoration:none;
                                     word-break:break-all;">${d.channelUrl}</a>`)}
              </table>

              <!-- Section: Mensaje -->
              <p style="margin:0 0 12px;font-size:11px;font-weight:700;
                        letter-spacing:0.1em;text-transform:uppercase;color:${brand};">
                Mensaje
              </p>
              <div style="background:${surface};border:1px solid ${border};
                          border-radius:10px;padding:20px 24px;margin-bottom:32px;">
                <p style="margin:0;font-size:14px;color:${text};line-height:1.7;
                           white-space:pre-wrap;">${escapeHtml(d.message)}</p>
              </div>

            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 32px;">
              <a href="mailto:${d.email}"
                 style="display:inline-block;background:${brand};color:#ffffff;
                        font-size:14px;font-weight:700;text-decoration:none;
                        border-radius:999px;padding:12px 28px;letter-spacing:0.02em;">
                Responder al postulante
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:${surface};border-top:1px solid ${border};
                       padding:20px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:${muted};line-height:1.6;">
                Este correo fue generado automáticamente desde el formulario de afiliados de
                <a href="https://motomundi.cl" style="color:${brand};text-decoration:none;">
                  motomundi.cl
                </a>.<br>
                Por favor no respondas directamente a este mensaje.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`
}

// ── Sanitise user content before embedding in HTML ──────────────
function escapeHtml(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
