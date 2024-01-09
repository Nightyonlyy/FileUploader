function setFileName() {
  const fileInput = document.getElementById('file');
  const filePath = fileInput.value;
  const fileName = filePath.substring(filePath.lastIndexOf('\\') + 1);
  const fileNameElement = document.querySelector('.file-name');
  fileNameElement.textContent = fileName;
  document.querySelector('.text-name').classList.add('show');

  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append('file', file);

  fetch('/upload', {
    method: 'POST',
    headers: {
      'X-File-Name': file.name
    },
    body: formData
  })
  .then(response => {
    if (response.ok) {
      const successMessage = document.querySelector('.success-message');
      successMessage.textContent = 'Datei erfolgreich hochgeladen!';
      successMessage.classList.add('show');

      setTimeout(() => {
        successMessage.classList.remove('show');
      }, 2000);

      setTimeout(() => {
        window.location.reload();
      }, 4000);
    } else {
      throw new Error('Upload failed');
    }
  })
  .catch(error => {
    const errorMessage = document.querySelector('.error-message');
    errorMessage.textContent = 'Datei konnte nicht hochgeladen werden';
    errorMessage.classList.add('show');
  });
}

function reloadPanel() {
  fetch('/runscript')
    .then(response => {
      if (response.ok) {
        const successMessage = document.querySelector('.success-message');
        successMessage.textContent = 'Neues Bild wurde erfolgreich geladen!';
        successMessage.classList.add('show');

        setTimeout(() => {
          successMessage.classList.remove('show');
        }, 2000);

        setTimeout(() => {
          window.location.reload();
        }, 4000);
      } else {
        throw new Error('Reload failed');
      }
    })
    .catch(error => {
      const errorMessage = document.querySelector('.error-message');
      errorMessage.textContent = 'Bild konnte nicht geladen werden';
      errorMessage.classList.add('show');
    });
}

function displayLastUploaded() {
  fetch('/lastuploaded')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to load last uploaded');
      }
    })
    .then(data => {
      const lastUploaded = document.getElementById('lastUploaded');
      const timestamp = data.timestamp;
      lastUploaded.innerHTML = `File: ${data.name}<br>${timestamp}`;
    })
    .catch(error => {
      // Handle any errors
    });
}

function displayLastProcessed() {
  fetch('/lastprocessed')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to load last processed');
      }
    })
    .then(data => {
      const lastProcessed = document.getElementById('lastProcessed');
      const timestamp = data.timestamp;
      lastProcessed.innerHTML = `File: ${data.name}<br>${timestamp}`;
    })
    .catch(error => {
      // Handle any errors
    });
}
