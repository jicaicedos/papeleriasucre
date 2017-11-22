window.onload = iniciarPapeleriaSucre

var formAdicionarProducto;
var refPapeleriaSucreBD;

function iniciarPapeleriaSucre() {

	formAdicionarProducto = document.getElementById("form-ingresar-producto")

	formAdicionarProducto.addEventListener("submit", enviarDatosProductoAFirebase, false)

	refPapeleriaSucreBD = firebase.database().ref().child("papeleriabd")
}

function enviarDatosProductoAFirebase(event) {
	event.preventDefault()

	refPapeleriaSucreBD.push({
		nombre: event.target.nombreProducto.value,
		precio: event.target.precioProducto.value
	});

}

