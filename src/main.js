import './style.css'

const toggle = document.getElementById('nav-toggle')
const menu = document.getElementById('mobile-menu')

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open')
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false')
  })
}

const form = document.getElementById('rfp-form')
const success = document.getElementById('form-success')

if (form && success) {
  form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    const name = form.name.value.trim()
    const organization = form.organization.value.trim()
    const email = form.email.value.trim()
    const message = form.message.value.trim()
    const role = form.role ? form.role.value.trim() : ''
    const jd = form.jd ? form.jd.value.trim() : ''
    const boardMeetings = form.board_meetings ? form.board_meetings.value.trim() : ''
    const events = form.events ? form.events.value.trim() : ''
    const ams = form.ams ? form.ams.value.trim() : ''
    const financePartners = form.finance_partners ? form.finance_partners.value.trim() : ''

    const subject = `RFP / proposal request: ${organization}`
    const body = [
      `Name: ${name}`,
      `Organization: ${organization}`,
      role ? `Role: ${role}` : null,
      `Email: ${email}`,
      boardMeetings ? `Board meetings / year: ${boardMeetings}` : null,
      events ? `In-person vs virtual events: ${events}` : null,
      ams ? `AMS / CRM: ${ams}` : null,
      financePartners ? `Bookkeeper / CPA engaged: ${financePartners}` : null,
      '',
      jd ? 'Role scope / JD:' : null,
      jd || null,
      jd ? '' : null,
      'Message / RFP notes:',
      message,
    ]
      .filter((line) => line !== null)
      .join('\n')

    const mailto = `mailto:micah@parrishtas.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailto

    form.classList.add('hidden')
    success.classList.remove('hidden')
    success.focus()
  })
}
