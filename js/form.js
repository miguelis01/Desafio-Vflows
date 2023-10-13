$(document).ready(function () {
    let anexoIndex = 1;
    let productIndex = 1;

    $('#addProduct').on('click', function () {
        productIndex++;
      });

    $('#addAnexo').on('change', function () {
        anexoIndex++;
    });
    
    // Event listener to handle form submission
    $('#productForm').on('submit', function (e) {
        e.preventDefault();
        
        //cria Modal de loading
        var myModal = FLUIGC.modal({
          title: 'Carregando',
          content: '<h1>Carregando</h1>',
          id: 'fluig-modal',
          size: 'full | large | small'
      })
  
        //Adiciona Form ao JSON
        const jsonData = {
          razaoSocial: $("#razaoSocial").val(),
          nomeFantasia: $("#nomeFantasia").val(),
          cnpj: $("#cnpj").val(),
          inscricaoEstadual: $("#inscricaoEstadual").val(),
          inscricaoMunicipal: $("#inscricaoMunicipal").val(),
          nomeContato: $("#nomeContato").val(),
          telefoneContato: $("#telefoneContato").val(),
          emailContato: $("#emailContato").val(),
          //bairro: $("#bairro").val(),
          produtos: [],
          anexos: []
        };
  
        // Adiciona Produtos ao JSON
        for (let i = 1; i < productIndex; i++) {
          if($(`#descricaoProduto${i}`).val()){
              const productData = {
                  indice: i,
                  descricaoProduto: $(`#descricaoProduto${i}`).val(),
                  unidadeMedida: $(`#unidadeMedida${i}`).val(),
                  qtdeEstoque: $(`#qtdeEstoque${i}`).val(),
                  valorUnitario: $(`#valorUnitario${i}`).val(),
                  valorTotal: $(`#valorTotal${i}`).val(),
              };
  
              jsonData.produtos.push(productData);
          }
        }

        //Adiciona Anexos ao JSON
        for (let i = 1; i < anexoIndex; i++) {
            if(FLUIGC.sessionStorage.getItem('anexo ' + i)){
                const anexoData = {
                    indice: i,
                    nomeArquivo: FLUIGC.sessionStorage.getItem('anexo ' + i),
                    blobArquivo: FLUIGC.sessionStorage.getItem('anexo ' + i + ' Content'),
                };

                jsonData.anexos.push(anexoData);
            }
          }
  
        console.log(JSON.stringify(jsonData, null, 2));
        myModal.remove(); //remove Modal de loading
      });
  
});