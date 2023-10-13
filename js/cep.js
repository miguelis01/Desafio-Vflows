$(document).ready(function () {

$("#cep").on("input", function() {

var cep = $("#cep").val();

if(cep.length == 8){
var apiUrl = 'https://viacep.com.br/ws/' + cep + '/json/';

// Make a GET request to the ViaCEP API
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // Handle the response data
    $("#endereco").val(data.logradouro);
    $("#bairro").val(data.bairro);
    $("#numero").val(data.numero);
    $("#complemento").val(data.complemento);
    $("#municipio").val(data.localidade);
    $("#estado").val(data.uf);

  })
  .catch(erro => {
    console.error('Erro:', erro);
  });
}
})
});