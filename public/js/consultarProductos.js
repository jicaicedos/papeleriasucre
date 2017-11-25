var refPapeleriaSucreBD


refPapeleriaSucreBD = firebase.database().ref().child("papeleriabd")

refPapeleriaSucreBD.on("value", function(snap) {

	var datos = snap.val()
	var registrosProductos

	for(var key in datos) {

		registrosProductos += 	"<tr>" +
									"<td>" + datos[key].nombre + "</td>" +
									"<td>" + datos[key].precio + "</td>" +
								"</tr>"
	}
	$("#table-productos").html(registrosProductos)

});	
