/*

	Función que coloca la estructura HTML del menu de navegación del sitio de la Papelería Sucre
	Menu
		- Adicionar
		- Consultar
		- Vender

*/ 

function cargarNav() {
	$("nav").html("" +
		"<a class='navbar-brand' href='index.html'>" + 
			"<img src='img/psucre_logo.png' width='30' height='30' class='d-inline-block align-top' alt=''>" + 
				"Papelería Sucre" + 
			"<span class='sr-only'>(current)</span>" +
		"</a>" + 
		"<button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>" + 
		"<span class='navbar-toggler-icon'></span>" + 
		"</button>" + 
		"<div class='collapse navbar-collapse' id='navbarNav'>" + 
			"<ul class='navbar-nav'>" + 
				"<li class='nav-item'>" + 
					"<a class='nav-link' href='adicionar.html'>Adicionar</a>" + 
				"</li>" + 
				"<li class='nav-item'>" + 
					"<a class='nav-link' href='consultar.html'>Consultar</a>" + 
				"</li>" + 
				"<li class='nav-item'>" + 
					"<a class='nav-link' href='#'>Vender</a>" + 
				"</li>" + 
				"<li class='nav-item'>" + 
					"<a class='nav-link' href='#'>Reportes</a>" + 
				"</li>" + 
			"</ul>" + 
		"</div>"	
	)
}

/*

	Función que coloca la estructura HTML para el "footer" compuesto por tres secciones
	- Logo e información del sitio de la Papelería Sucre
	- Menu inferior del sitio
	- Redes sociales y quienes somos

*/

function cargarFooter() {
	$("footer").html(""+
		"<div class='row'>" +
        	"<div class='col-md-4 footer-brand animated fadeInLeft'>" +
        		"<img src='img/psucre_logo.png' width='60' height='60' class='d-inline-block align-top' alt='' />" +
        		"<p></p>" +
        		"<p>© Sistema de gestión para la Papelería Sucre</p>" +
                "<p>Todos los derechos reservados</p>" +
            "</div>" +
        	"<div class='col-md-4 footer-nav animated fadeInUp'>" +
            	"<h4>Menu —</h4>" +
            	"<div class='col-md-6'>" +
                    "<ul class='pages'>" +
                        "<li><a href='adicionar.html'>Adicionar</a></li>" +
                        "<li><a href='consultar.html'>Consultar</a></li>" +
                        "<li><a href='#'>Vender</a></li>" +
                    "</ul>" +
                "</div>" +
            	"<div class='col-md-6'>" +
                "</div>" +
            "</div>" +
        	"<div class='col-md-4 footer-nav footer-social'>" +
            	"<div class='col-md-6  animated fadeInDown'>" +
	            	"<h4>Síguenos en</h4>" +
	            	"<ul>" +
	                	"<li><a href='#'>Facebook</a></li>" +
	                "</ul>" +
                "</div>" +
            	"<div class='col-md-6'>" +
                    "<ul class='list'>" +
                        "<li><a href='#'>Quiénes somos</a></li>" +
                        "<li><a href='#'>Contáctanos</a></li>" +
                    "</ul>" +
                "</div>" +
            "</div>" +
        "</div>"
	)
}

