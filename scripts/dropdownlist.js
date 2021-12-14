const ddlUFs			= document.getElementById('ddlUFs');
const ddlCidades	= document.getElementById('ddlCidades');

let ufsCidades		= '';

fetch('./dados/uf-cidades.json')
	.then((response) => response.json())
	.then(function(data) {

  	ufsCidades = data.estados;
  	ufsCidades.map(function(ufsCidades) {
			popularDropDownList(ddlUFs, ufsCidades.nome, ufsCidades.sigla);
  	})

		ddlUFs.prop('selectedIndex', 0);

	})
	.catch(function(erro) {
  	console.log(erro);
	});

ddlUFs.addEventListener('change', function() {

	let valor = this.value;

  let options = document.querySelectorAll('#ddlCidades option');
  options.forEach(itens => itens.remove());

	let mensagemDropDownList = valor == 0 ? 'SELECIONE O ESTADO ACIMA' : 'SELECIONE A CIDADE';

	ddlCidades.remove(0);
	popularDropDownList(ddlCidades, mensagemDropDownList, 0);

	let cidades = ufsCidades.filter(sigla => (sigla.sigla == valor));
	cidades = cidades[0].cidades;

	cidades.forEach(function (cidade, index) {
		popularDropDownList(ddlCidades, cidade, index);
	});

});

function popularDropDownList(elemento, texto, valor) {

	let option = document.createElement('option');
	option.text = texto;
	option.value = valor;
	elemento.appendChild(option);

}
