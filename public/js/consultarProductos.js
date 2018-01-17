var refPapeleriaSucreBD
var refPapeleriaSucreStorage
var datos

refPapeleriaSucreBD = firebase.database().ref().child("papeleriabd")

// Creamos referencia al Storage del Proyecto Papeleria Sucre
// refPapeleriaSucreStorage = firebase.storage().ref().child("papeleriasucre")
// storageRef = firebase.storage().ref()



refPapeleriaSucreBD.on("value", function(snap) {

	datos = snap.val()
	// Productos cargados de la base de datos
	var registrosProductos
	

	for(var key in datos) {

		registrosProductos += 	"<tr>" +
									"<td>" + datos[key].nombre + "</td>" +
									"<td>" + datos[key].marca + "</td>" +
									"<td class='ocultarColumna'>" + datos[key].tipo + "</td>" +
									"<td class='ocultarColumna'>" + datos[key].descripcion + "</td>" +
									"<td class='ocultarColumna'>" + datos[key].medidas + "</td>" +
									"<td>" + datos[key].cantidad + "</td>" +
									"<td>" + datos[key].precio + "</td>" +
									"<td class='ocultarColumna'><img src='" + datos[key].imagen + "' alt='' width='30' height='auto' /></td>" +
									"<td> <button class='btnModificar icon-pencil btn-warning' keyProducto='" + key + "'></button></td>" +
									"<td> <button class='btnEliminar icon-bin btn-danger' keyProducto='" + key + "'></button></td>" +
								"</tr>"
	}

	$("#table-productos").html(registrosProductos)

	// Se agrega el "escuchador de eventos" para el boton eliminar
	if (datos) {
		var productos = document.getElementsByClassName("btnEliminar")
		
		for(var i=0; i < productos.length; i++ ) {
			productos[i].addEventListener("click", eliminarProducto, false)			
		}
	}

	// Se agrega el "escuchador de eventos" para el boton modificar con el evento para cargar el producto 
	// que se desea cambiar o modificar sus datos
	if (datos) {
		var productos = document.getElementsByClassName("btnModificar")
		
		for(var i=0; i < productos.length; i++ ) {
			productos[i].addEventListener("click", cargarProductoModificar, false)			
		}
	}

});

// ===========================================================================
// Eliminar producto de la papelería

function eliminarProducto() {
	
	var keyProducto = this.getAttribute("keyProducto")

	// var confirmar = confirm("¿Está seguro(a) de eliminar el producto? " + datos[keyProducto].nombre)
	alertify.confirm("Papelería Sucre", "¿Está seguro(a) de eliminar el producto? " + datos[keyProducto].nombre, function() {
		refProducto = refPapeleriaSucreBD.child(keyProducto)
		refProducto.remove()
		alertify.success("Producto eliminado")
	}, function() {
		alertify.error("No se elimina el producto")
	});
}

