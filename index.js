  function setFileName() {
    const fileInput = document.getElementById('file');
    const filePath = fileInput.value;
    const fileName = filePath.substring(filePath.lastIndexOf('\\') + 1);
    const fileNameElement = document.querySelector('.file-name');
    fileNameElement.textContent = fileName;
    document.querySelector('.text-name').classList.add('show');

    const file = fileInput.files[0];

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload', true);
    xhr.setRequestHeader('X-File-Name', file.name);

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const successMessage = document.querySelector('.success-message');
          successMessage.textContent = 'Datei erfolgreich hochgeladen!';
          successMessage.classList.add('show');

          setTimeout(function() {
            successMessage.classList.remove('show');
          }, 2000);

          setTimeout(function() {
            window.location.reload();
          }, 4000);
        } else {
          const errorMessage = document.querySelector('.error-message');
          errorMessage.textContent = 'Datei konnte nicht hochgeladen werden';
          errorMessage.classList.add('show');
        }
      }
    };
    xhr.send(file);
  }

  function reloadPanel() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/runscript');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const successMessage = document.querySelector('.success-message');
          successMessage.textContent = 'Neues Bild wurde erfolgreich geladen!';
          successMessage.classList.add('show');

          setTimeout(function () {
            successMessage.classList.remove('show');
          }, 2000);

          setTimeout(function () {
            window.location.reload();
          }, 4000);
        } else {
          const errorMessage = document.querySelector('.error-message');
          errorMessage.textContent = 'Bild konnte nicht geladen werden';
          errorMessage.classList.add('show');
        }
      }
    };
    xhr.send();
  }

  function displayLastUploaded() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/lastuploaded');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const lastUploaded = document.getElementById('lastUploaded');
        const timestamp = response.timestamp;
        lastUploaded.innerHTML = `Name: ${response.name}<br>Time: ${timestamp}`;
        lastUploaded.innerHTML = `File : ${response.name}<br>Timestamp : ${timestamp}`;
      }
    };
    xhr.send();
  }