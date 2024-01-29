const formData = {
  name: '',
  email: '',
  message: '',
}

let customModalMessage = null

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  section.scrollIntoView({ behavior: 'smooth' })
}

function handleChange(e) {
  const { name, value } = e.target
  formData[name] = value
}

async function handleFormSubmit(e) {
  e.preventDefault()
  // console.log('before sending', formData)

  try {
    const response = await fetch('https://formspree.io/f/mrgngjqr', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // console.log('formData:', formData)

    if (response.ok) {
      customModalMessage = 'Form submitted successfully!'
      formData.name = ''
      formData.email = ''
      formData.message = ''
    } else {
      const errorData = await response.json()
      console.error(
        'Form submission error:',
        errorData.message || 'Unknown error'
      )
      customModalMessage = 'Form submission failed. Please try again.'
    }
  } catch (error) {
    console.error('General error:', error)
    customModalMessage = 'An unexpected error occurred. Please try again.'
  }

  const customModal = document.querySelector('.custom-modal')
  const modalContent = customModal.querySelector('.modal-content')
  const closeBtn = modalContent.querySelector('.close')
  const modalMessageElement = modalContent.querySelector('p')

  modalMessageElement.textContent = customModalMessage
  customModal.style.display = 'block'

  closeBtn.onclick = function () {
    customModal.style.display = 'none'
  }

  window.onclick = function (event) {
    if (event.target === customModal) {
      customModal.style.display = 'none'
    }
  }
}

function closeCustomModal() {
  const customModal = document.querySelector('.custom-modal')
  customModal.style.display = 'none'
}
