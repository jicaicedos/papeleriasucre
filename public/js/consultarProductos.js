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
									"<td>" + datos[key].tipo + "</td>" +
									"<td>" + datos[key].descripcion + "</td>" +
									"<td>" + datos[key].medidas + "</td>" +
									"<td>" + datos[key].cantidad + "</td>" +
									"<td>" + datos[key].precio + "</td>" +
									"<td><img src='" + datos[key].imagen + "' alt='' width='40' height='auto' /></td>" +
								"</tr>"
	}

	$("#table-productos").html(registrosProductos)

});	
