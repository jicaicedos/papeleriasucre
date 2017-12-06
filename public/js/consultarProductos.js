var refPapeleriaSucreBD
var refPapeleriaSucreStorage


refPapeleriaSucreBD = firebase.database().ref().child("papeleriabd")

// Creamos referencia al Storage del Proyecto Papeleria Sucre
refPapeleriaSucreStorage = firebase.storage().ref().child("papeleriasucre")


refPapeleriaSucreBD.on("value", function(snap) {

	var datos = snap.val()
	var registrosProductos

	for(var key in datos) {

		// obtenemos el nombre de la imagen del producto de la papleria
		var imagen = refPapeleriaSucreStorage.child(datos[key].imagen)

		registrosProductos += 	"<tr>" +
									"<td>" + datos[key].nombre + "</td>" +
									"<td>" + datos[key].tipo + "</td>" +
									"<td>" + datos[key].descripcion + "</td>" +
									"<td>" + datos[key].medidas + "</td>" +
									"<td>" + datos[key].cantidad + "</td>" +
									"<td>" + datos[key].precio + "</td>" +
									"<td>" + imagen + "</td>" +
									"<td>" + datos[key].precio + "</td>" +
								"</tr>"
	}
	$("#table-productos").html(registrosProductos)

});	
