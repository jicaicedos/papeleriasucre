var refPapeleriaSucreBD
var refPapeleriaSucreStorage


refPapeleriaSucreBD = firebase.database().ref().child("papeleriabd")

// Creamos referencia al Storage del Proyecto Papeleria Sucre
// refPapeleriaSucreStorage = firebase.storage().ref().child("papeleriasucre")
// storageRef = firebase.storage().ref()



refPapeleriaSucreBD.on("value", function(snap) {

	var datos = snap.val()
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
								"</tr>"
	}

	$("#table-productos").html(registrosProductos)

});	
