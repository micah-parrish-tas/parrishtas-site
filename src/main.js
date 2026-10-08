import './style.css'

const toggle = document.getElementById('nav-toggle')
const menu = document.getElementById('mobile-menu')

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open')
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false')
  })
}

function readField(form, name) {
  const el = form.elements.namedItem(name)
  if (!el || !('value' in el)) return ''
  return String(el.value).trim()
}

function bindMailtoForm(formId, buildMessage) {
  const form = document.getElementById(formId)
  const success = document.getElementById('form-success')
  if (!form || !success) return

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    const { subject, body } = buildMessage(form)
    const mailto = `mailto:micah@parrishtas.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailto

    form.classList.add('hidden')
    success.classList.remove('hidden')
    success.focus()
  })
}

bindMailtoForm('contact-form', (form) => {
  const name = readField(form, 'name')
  const organization = readField(form, 'organization')
  const email = readField(form, 'email')
  const message = readField(form, 'message')

  return {
    subject: `Website message: ${organization}`,
    body: [
      `Name: ${name}`,
      `Organization: ${organization}`,
      `Email: ${email}`,
      '',
      'Message:',
      message,
    ].join('\n'),
  }
})

bindMailtoForm('rfp-form', (form) => {
  const name = readField(form, 'name')
  const organization = readField(form, 'organization')
  const title = readField(form, 'job_title')
  const email = readField(form, 'email')
  const services = readField(form, 'services')
  const members = readField(form, 'members')
  const boardMeetings = readField(form, 'board_meetings')
  const events = readField(form, 'events')
  const database = readField(form, 'database')
  const deadline = readField(form, 'deadline')
  const message = readField(form, 'message')

  return {
    subject: `Proposal request: ${organization}`,
    body: [
      `Name: ${name}`,
      `Organization: ${organization}`,
      title ? `Title: ${title}` : null,
      `Email: ${email}`,
      services ? `Services of interest: ${services}` : null,
      members ? `Number of members: ${members}` : null,
      boardMeetings ? `Board meetings per year: ${boardMeetings}` : null,
      events ? `Events per year: ${events}` : null,
      database ? `Current member database or software: ${database}` : null,
      deadline ? `Proposal deadline: ${deadline}` : null,
      '',
      'Message:',
      message,
    ]
      .filter((line) => line !== null)
      .join('\n'),
  }
})
