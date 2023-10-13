$(document).ready(function () {

    let anexoIndex = 1;

    // Function to add product fields dynamically
    function addAnexoFields(file) {
      const anexoFields = `
        <div class="anexo" id="${file.name}" data-index="${anexoIndex}">
            <div class="row">
            <img style="margin-top: 10px" src="./src/fluigicon-trash.png" class="deleteAnexo col-xs-1" data-index="${anexoIndex}" width="50" height="60">
            <img style="margin-top: 10px" src="./src/fluigicon-eye-open.png" class="downloadAnexo col-xs-1" data-index="${anexoIndex}" width="50" height="60">
            <h3 style="margin-top: 30px" class="col-xs-4">Documento Anexo ${file.name}</h3>
            </div>
        </div>
      `;

      $('#anexosContainer').append(anexoFields);
      anexoIndex++;

      $(`.deleteAnexo[data-index="${anexoIndex - 1}"]`).on('click', function () {
        $(`.anexo[data-index="${$(this).data('index')}"]`).remove();
        FLUIGC.sessionStorage.removeItem('anexo ' + `${$(this).data('index')}`);
        FLUIGC.sessionStorage.removeItem('anexo ' + `${$(this).data('index')}` + ' Content');
      });

      $(`.downloadAnexo[data-index="${anexoIndex - 1}"]`).on('click', function() {

        var downloadLink = document.createElement('a');

        downloadLink.download = FLUIGC.sessionStorage.getItem('anexo ' + `${$(this).data('index')}`);
        downloadLink.href = FLUIGC.sessionStorage.getItem('anexo ' + `${$(this).data('index')}` + ' Content');
    
          // Adicionar o link ao corpo do documento e clicar nele
        document.body.appendChild(downloadLink);
        downloadLink.click();
    
        // Remover o link do corpo do documento
        document.body.removeChild(downloadLink);
      });

    }

$("#addAnexo").on('change', function () {

    // Obter o input do arquivo
    var fileInput = $('#addAnexo')[0];

    // Verificar se um arquivo foi selecionado
    if (fileInput.files.length > 0) {
      var file = fileInput.files[0];

      // Ler o conteúdo do arquivo como Blob
      var reader = new FileReader();
      reader.onload = function(event) {
      var fileContent = event.target.result;

      // Armazenar nome e conteúdo do arquivo na sessionStorage
      FLUIGC.sessionStorage.setItem('anexo ' + anexoIndex, file.name);
      FLUIGC.sessionStorage.setItem('anexo ' + anexoIndex + ' Content', fileContent);

      addAnexoFields(file);
      };

      reader.readAsDataURL(file); 
    } 

});

});