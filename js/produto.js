$(document).ready(function () {
    let productIndex = 1;

    // Function to add product fields dynamically
    function addProductFields() {
      const productFields = `
      <h3 class="product" data-index="${productIndex}">Produto ${productIndex}</h3>
      <div class="product row" data-index="${productIndex}">
          <img style="margin-top: 30px" src="./src/fluigicon-trash.png" class="deleteProduct col-xs-1" data-index="${productIndex}" width="50" height="60">
          <section class="col-xs-10">
            <label for="descricaoProduto${productIndex}">Descrição do Produto:</label>
            <input type="text" class="form-control col-xs-2" name="descricaoProduto${productIndex}" id="descricaoProduto${productIndex}" required><br>
            <div class="row">
              <div class="form-group col-xs-3">
                <label for="unidadeMedida${productIndex}">Unidade de Medida:</label>
                <input type="text" class="form-control" name="unidadeMedida${productIndex}" id="unidadeMedida${productIndex}" required><br>
              </div>
              <div class="form-group col-xs-3">
                <label for="qtdeEstoque${productIndex}">Quantidade em Estoque:</label>
                <input type="number" class="form-control" name="qtdeEstoque${productIndex}" id="qtdeEstoque${productIndex}" required><br>
              </div>
              <div class="form-group col-xs-3">
                <label for="valorUnitario${productIndex}">Valor Unitário:</label>
                <input type="number" class="form-control" name="valorUnitario${productIndex}" id="valorUnitario${productIndex}" required><br>
              </div>
              <div class="form-group col-xs-3">
                <label for="valorTotal${productIndex}">Valor Total:</label>
                <input style="background-color: gray; color: white;" type="text" class="form-control" name="valorTotal${productIndex}" id="valorTotal${productIndex}" disabled><br>.
              </div>
            </div>
          </section>
        </div>
      `;

      $('#produtosContainer').append(productFields);
      productIndex++;

      $(`.deleteProduct[data-index="${productIndex - 1}"]`).on('click', function () {
        $(`.product[data-index="${$(this).data('index')}"]`).remove();
      });

      for (let i = 1; i < productIndex; i++) {
      $(`#qtdeEstoque${i}, #valorUnitario${i}`).on("input", function() {
  
        var valorInput1 = $(`#qtdeEstoque${i}`).val() || 0;
        var valorInput2 = $(`#valorUnitario${i}`).val() || 0;
  
        var resultado = parseFloat(valorInput1) * parseFloat(valorInput2);
    
        $(`#valorTotal${i}`).val(resultado);
      });
      }

    }

    // Event listener to add product fields when the button is clicked
    $('#addProduct').on('click', function () {
      addProductFields();
    });

  });