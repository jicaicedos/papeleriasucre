var refPapeleriaSucreBD
var formAdicionarProducto
var keyProductoModificar
var refStorage

// ===========================================================================
function modificarProducto() {

	formAdicionarProducto = document.getElementById("form-modificar-producto")

	formAdicionarProducto.addEventListener("submit", modificarProductoEnFirebase, false)

	refPapeleriaSucreBD = firebase.database().ref().child("papeleriabd")

	// Permisos en Storage
	// Tener en cuenta que para la seguridad se deben autenticar ya sea por una cuenta de Google,  Facebook,  Twitter o similares
	// request.auth!=null
	cargarImagen()
}

function modificarProductoEnFirebase(event) {

	event.preventDefault()

	// Creamos referencia al elemento que deseamos actualizar
	var storageRef = firebase.storage().ref()

	// Obtenemos los datos ingresados por el usuario en la interfaz
	// los almacenamos en variables const solo para actualizar cuando se obtiene imagen en "firebase.storage"
	const nombreP 		= $("#nombreProducto").val()
	const marcaP 		= $("#marcaProducto").val()
	const tipoP 		= $("#tipoProducto").val()
	const descripcionP 	= $("#descripcionProducto").val()
	const medidasP 		= $("#medidasProducto").val()
	const cantidadP 	= $("#cantidadProducto").val()
	const precioP 		= $("#precioProducto").val()

	// Si el usuario eligió una nueva imagen para el producto entonces se actualizará su URL
	// de lo contrario se almacenará la misma ruta de la imagen ya cargada con anterioridad
	var imagenObjetoButton = $("#file-es")[0].files[0]

	// Obtenemos el nombre de la imagen
	var nombreImagen = ''
	let nombreImagenButton = ''	// Nombre de la imagen obtenida del boton de la interfaz
	let nombreImagenActual = ''	// Nombre de la imagen actual del producto 

	// Se evalúa si se va o no a modificar imagen del producto
	// Se realiza actualización de datos del producto y se actualiza también la imagen del producto
	if( imagenObjetoButton != null ) 
	{
		// Obtenemos el nombre de la imagen cargada por el botón
		nombreImagen = imagenObjetoButton.name  
		// Obtenemos el nombre de la imagen actual del producto
		nombreImagenActual = obtenerNombreImagen($("#imagenProducto").attr("src")) 

		// Obtenemos la dirección o URL de la ubicación de la imagen subida en Firebase (storage)
		storageRef.child('imagenes/' + nombreImagen).getDownloadURL().then(function(url) {	
			// 
			// Paso 1: Se modifica el producto seleccionado
			// 
			refPapeleriaSucreBD.child(keyProductoModificar).update({
				nombre: nombreP,
				marca: marcaP,
				tipo: tipoP,
				descripcion: descripcionP,
				medidas: medidasP,
				cantidad: cantidadP,
				precio: precioP,
				imagen: url
			});		
			
			// 
			// Paso 2: Eliminar la imagen del producto del "storage" o almacenamiento de firestore
			// 			
			eliminarImagenProductoStorage(nombreImagenActual)

			alertify.alert("Papelería Sucre","El producto fue modificado correctamente!")

			// Colocamos no cargados, para volver a cargar desde la base de datos
			localStorage.setItem("cargados", "no")			

		}).catch(function(error){		
			alert('Error: No se logró obtener la ubicación de la imagen del producto')
		});

	} 
	else // Se realiza la actualización de datos pero no se actualiza imagen del producto
	{
		nombreImagen = $("#imagenProducto").attr("src")  // Obtenemos el nombre la imagen obtenido del "storage"		

		refPapeleriaSucreBD.child(keyProductoModificar).update({
			nombre: nombreP,
			marca: marcaP,
			tipo: tipoP,
			descripcion: descripcionP,
			medidas: medidasP,
			cantidad: cantidadP,
			precio: precioP,
			imagen: nombreImagen
		});		
	
		alertify.alert("Papelería Sucre","El producto fue modificado correctamente!")

		// Colocamos no cargados, para volver a cargar desde la base de datos
		localStorage.setItem("cargados", "no")				
	}

	// Limpiamos los datos ingresados por el usuario en el formulario de "Adicionar producto"
	formAdicionarProducto.reset()
	$("#btnModificarProducto").hide()
	$("#imagenProducto").attr("src","")

	// Después de realizar la modificación volver a la página de "consultar.html"
	// window.location.replace("../consultar.html")

}

// Función para obtener el nombre de la imagen a borrar en Storage
function obtenerNombreImagen(str) {
	var nombre = str.split("?")[0]
	nombre = nombre.split("%2F")[1]
	return nombre
}


function eliminarImagenProductoStorage( imagen ) {

		console.log("Nombre imagen a eliminar de storage: "+imagen)

		// Obtenemos referencia a Storage de Firebase, donde se encuentre la imagen a borrar
		refStorage = firebase.storage().ref().child('imagenes/' + imagen)

		// Se elimina la imagen de Storage en Firebase
		refStorage.delete().then( () => console.log("Producto eliminado de storage") )
			.catch( (e) => console.log("No se pudo eliminar la imagen del storage") )

	// Colocamos no cargados, para volver a cargar desde la base de datos
	localStorage.setItem("cargados", "no")			
}

// ===========================================================================
function cargarProductoModificar(event) {

	var keyProducto = this.getAttribute("keyProducto")

	localStorage.setItem('nombre',datos[keyProducto].nombre)
	localStorage.setItem('marca',datos[keyProducto].marca)
	localStorage.setItem('tipo',datos[keyProducto].tipo)
	localStorage.setItem('descripcion',datos[keyProducto].descripcion)
	localStorage.setItem('medidas',datos[keyProducto].medidas)
	localStorage.setItem('cantidad',datos[keyProducto].cantidad)
	localStorage.setItem('precio',datos[keyProducto].precio)
	localStorage.setItem('imagen',datos[keyProducto].imagen)	
	localStorage.setItem('keyProducto',keyProducto)

	window.location.replace("../modificar.html")

}

// ===========================================================================
// 	Llenar los datos obtenidos en la página de consultar productos y llenamos
// 	cada campo en el formulario para modificar datos
function llenarFormulario() {
	$("#nombreProducto").val(localStorage.getItem('nombre'))
	$("#marcaProducto").val(localStorage.getItem('marca'))
	$("#tipoProducto").val(localStorage.getItem('tipo'))
	$("#descripcionProducto").val(localStorage.getItem('descripcion'))
	$("#medidasProducto").val(localStorage.getItem('medidas'))
	$("#cantidadProducto").val(localStorage.getItem('cantidad'))
	$("#precioProducto").val(localStorage.getItem('precio'))	
	$("#imagenProducto").attr("src",localStorage.getItem('imagen'))

	// Obtenemos la llave o clave del producto a Modificar
	keyProductoModificar = localStorage.getItem('keyProducto')

	borrarDatosFormularioModificar()
}

function borrarDatosFormularioModificar() {
	localStorage.clear()	
}
