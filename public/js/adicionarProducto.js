var refPapeleriaSucreBD
var formAdicionarProducto


/*
	Se inicializa la aplicación para adicionar un nuevo producto a la Papelería Sucre

	@refPapeleriaSucreBD Variable que almacena la referencia a la base de datos "papeleriabd" desde Firebase

*/
function adicionarProducto() {

	formAdicionarProducto = document.getElementById("form-ingresar-producto")

	formAdicionarProducto.addEventListener("submit", enviarDatosProductoAFirebase, false)

	refPapeleriaSucreBD = firebase.database().ref().child("papeleriabd")
}

/* 
	Se encarga de enviar los datos o atributos del producto a la base de datos hospedada en Firebase
	para lo cual usa e método push({objeto}), al cual se le envía el objeto con todos los valores 
	digitados por el usuario y posteriormente almacenados en la base de datos "papeleriabd"

	@event  Se usa para evitar que se recargue los datos y se almacenen repetidamente con .preventDefault()
			Este parámetro es quien contiene todo lo relacionado con los datos ingresados por el usuario en
			el formulario. 
			Haciendo uso del parámetro name="" en la etiqueta <input type="text" name="<nombres-variables>"></input>

*/
function enviarDatosProductoAFirebase(event) {

	event.preventDefault()

	refPapeleriaSucreBD.push({
		nombre: event.target.nombreProducto.value,
		precio: event.target.precioProducto.value
	});

	formAdicionarProducto.reset()

}
