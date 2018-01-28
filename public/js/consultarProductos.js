var refPapeleriaSucreBD
var refPapeleriaSucreStorage
var datos
var productos

// Productos cargados de la base de datos
var registrosProductos

var fila
var complemento

refPapeleriaSucreBD = firebase.database().ref().child("papeleriabd")

refPapeleriaSucreBD.on("value", function(snap) {

	datos = snap.val()
	registrosProductos = ""

	// Se evalua si existen datos para cargar
	if ( snap != null && localStorage.getItem("cargados") == "no" ) {
		localStorage.setItem("existenDatos", "si")

		for(var key in datos) {
			registrosProductos += 	"<tr>" +
										"<td>" + datos[key].nombre + "</td>" +
										"<td class='split-busqueda'>" + datos[key].marca + "</td>" +
										"<td class='ocultarColumna'>" + datos[key].tipo + "</td>" +
										"<td class='ocultarColumna'>" + datos[key].descripcion + "</td>" +
										"<td class='ocultarColumna'>" + datos[key].medidas + "</td>" +
										"<td>" + datos[key].cantidad + "</td>" +
										"<td>" + datos[key].precio + "</td>" +
										"<td class='ocultarColumna'><img src='" + datos[key].imagen + "' alt='' width='30' height='auto' /></td>" +
										"<td> <button class='btnModificar icon-pencil2 btn-warning' keyProducto='" + key + "'></button></td>" +
										"<td> <button class='btnEliminar icon-bin btn-danger' keyProducto='" + key + "'></button></td>" +
									"</tr>"
		}

		localStorage.setItem("registros", registrosProductos)
		localStorage.setItem("cargados", "si")



		$("#table-productos").html(registrosProductos)

		// Se agrega el "escuchador de eventos" para el boton eliminar
		if (datos) {
			productos = document.getElementsByClassName("btnEliminar")
			
			for(var i=0; i < productos.length; i++ ) {
				productos[i].addEventListener("click", eliminarProducto, false)			
			}
		}

		// Se agrega el "escuchador de eventos" para el boton modificar con el evento para cargar el producto 
		// que se desea cambiar o modificar sus datos
		if (datos) {
			productos = document.getElementsByClassName("btnModificar")
			
			for(var i=0; i < productos.length; i++ ) {
				productos[i].addEventListener("click", cargarProductoModificar, false)			
			}
		}

	}
	else {
		localStorage.setItem("existenDatos", "no")	
		$("#table-productos").html(localStorage.getItem("registros"))

		productos = document.getElementsByClassName("btnEliminar")


		for(var i=0; i < productos.length; i++ ) {
 			
			productos[i].addEventListener("click", eliminarProducto, false)			
		}

		// Se agrega el "escuchador de eventos" para el boton modificar con el evento para cargar el producto 
		// que se desea cambiar o modificar sus datos
		productos = document.getElementsByClassName("btnModificar")
			
		for(var i=0; i < productos.length; i++ ) {
			productos[i].addEventListener("click", cargarProductoModificar, false)			
		}
	}

});

// ===========================================================================
// 
// Eliminar producto de la papelería
// 
function eliminarProducto() {
	
	
	var keyProducto = this.getAttribute("keyProducto")

	alertify.confirm("Papelería Sucre", "¿Está seguro(a) de eliminar el producto? " + datos[keyProducto].nombre, function() {


		// 
		// Paso 1: Eliminar la imagen del producto del "storage" o almacenamiento de firestore
		// 
		// Obtenemos el nombre de la imagen a borrar de Storage
		let nombreImagen = obtenerNombreImagen(datos[keyProducto].imagen)	

		// Obtenemos referencia a Storage de Firebase, donde se encuentre la imagen a borrar
		refStorage = firebase.storage().ref().child('imagenes/' + nombreImagen)

		// Se elimina la imagen de Storage en Firebase
		refStorage.delete().then( () => console.log("Producto eliminado de storage") )
			.catch( (e) => console.log("No se pudo eliminar la imagen del storage") )


		// 
		// Paso 2: Eliminar el producto de la base de datos
		// 
		refProducto = refPapeleriaSucreBD.child(keyProducto)
		refProducto.remove()

	}, () => alertify.error("No se elimina el producto") 
	);

}

// Función para obtener el nombre de la imagen a borrar en Storage
function obtenerNombreImagen(str) {
	var nombre = str.split("?")[0]
	nombre = nombre.split("%2F")[1]
	return nombre
}

// =======================================================================================
// 
//  Función para filtrar resultados
// 
function filtrar() {
	
    $(document).ready(function () {
        (function ($) {
            $('#filtrar').keyup(function () {
            	resaltarTexto()
                var rex = new RegExp($(this).val(), 'i');
                $('.buscar tr').hide();
                $('.buscar tr').filter(function () {
                    return rex.test($(this).text());
                }).show();
            })
        }(jQuery));
        
    });      
}


// ==========================================================================================
// 
// Función para resaltar texto del criterio de la búsqueda
// 
function resaltarTexto() {

	if( $("#filtrar").val()=="" ) {
		textoBuscado = document.getElementById("table-productos")
		textoBuscado.innerHTML = localStorage.getItem("registros")
	}
	else {

		var texto = $("#filtrar").val()
		// console.log(texto)

		textoBuscado = document.getElementById("table-productos")
		textoBuscado.innerHTML = ""
		// var innerHTML = textoBuscado.innerHTML

		var innerHTML = localStorage.getItem("registros")

		var filas = innerHTML.split("<tr><td>")
		var resultado

		
		for(var i=1; i < filas.length; i++ ) {
			// console.log("Numero filas: " + filas.length)

			fila = filas[i].split(`</td><td class="split-busqueda">`)[0]
			// console.log("fila: " + fila)	

			complemento = filas[i].split(`</td><td class="split-busqueda">`)[1]
			// console.log("complemento: " + complemento)	

			var index = fila.indexOf(texto)
			if ( index >= 0 ) {
				fila = "<tr><td>" + fila.substring(0,index) + 
							"<span class='highlight'>" + 
								fila.substring(index,index+texto.length) + 
							"</span>" + 
							fila.substring(index + texto.length) +
							"</td>"
				textoBuscado.innerHTML += fila + `</td><td class="split-busqueda">` + complemento	
			}
		}	
	}

}
