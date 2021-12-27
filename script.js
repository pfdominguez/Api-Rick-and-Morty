let intentos = 0;
let email;
let clave;
let finalAns;
let dontKeepAsking;
let currentUser;
let currentDate;

function loggeame() {

    initVars();

    email = $('#email').val();
    clave = $('#clave').val();

    if (!validacion(clave)) {
        intentos++;
    } else {

        checkBD();

        if (!finalAns) {
            alert("Contraseña o usuarios incorrectos.");
            intentos++;
        } else {
            $('#userNameLogged').text("Usuario:  " + email);
            $('#userNameLogged').show();
            $('#exit').show();
            habilitarApp();
        }
    }

    if (intentos == 3) {
        bloquearForm();
    }

}

function initVars() {
    finalAns = false;
    dontKeepAsking = false;
    currentUser = "";
}

function habilitarApp() {
    $('#form').hide();
    $('#app').show();
    $('#diaYhora').show();
    intentos = 0;
}

function bloquearForm() {
    $('#form').hide();
    $('#bloqueo').show();
    alert("Se ha bloqueado la cuenta por multiples intentos erróneos.");
}

function checkBD() {
    var ajaxRes;
    $.ajax({
        type: "GET",
        url: "https://jsonplaceholder.typicode.com/users",
        async: false,
        success: function(responseAPI) {
            ajaxRes = responseAPI;
        }
    });

    ajaxRes.find(chequearMatches);
}

function chequearMatches(person) {
    if (!dontKeepAsking) {
        if (person.email == email && person.id == clave) {
            finalAns = true;
            dontKeepAsking = true;
        } else {
            finalAns = false;
        }
    }
}


$(function() {
    $("#input_busqueda").keyup(function(e) {
        if (e.which == 13) {
            getPersonaje(e.target.value);
        }
    });
});


function validacion(val) {
    var expresionRegular = /^\d{1,2}$/;

    if (!expresionRegular.test(val)) {
        alert("Clave inválida , debe ingresar un numero entre 0 y 99");
        return false;
    } else {
        return true;
    }
}


function getPersonaje(id) {
    $.ajax({
        type: "GET",
        url: `https://rickandmortyapi.com/api/character/${id}`,
        success: function(responseAPI) {
            $("#card").append(generarCard(responseAPI));
        },
        error: function() {
            alert('No existen registros para tal id, por favor intente nuevamente.');
            limpioCard();
        }
    })
}


function generarCard(responseAPI) {
    $('#id').text(responseAPI.id);
    $('#name').text(responseAPI.name);
    $('#status').text(responseAPI.status);
    $('#species').text(responseAPI.species);

    if (responseAPI.type.length < 1) {
        $('#type').text("-");
    } else {
        $('#type').text(responseAPI.type);
    }

    $('#gender').text(responseAPI.gender);

    $('#image').attr("src", responseAPI.image);
    $('#image').hide();
}

$("#name").on("click", function() {
    $(".myImg").fadeIn("slow");
});


function limpioCard() {
    $('#id').text("");
    $('#name').text("");
    $('#status').text("");
    $('#species').text("");
    $('#type').text("");
    $('#gender').text("");
    $('#image').attr("src", "");
}


$("#exit").on("click", function() {
    $('#app').hide();
    $('#form').show();
    $('#exit').hide();
    $('#userNameLogged').hide();
    $('#email').val("");
    $('#email').focus();
    $('#clave').val("");
    $('#diaYhora').hide();
});


$(function() {
    function Clock() {
        var theDate = new Date();
        var currentDate = theDate.getDate() + "/" + (theDate.getMonth() + 1) + "/" + theDate.getFullYear() + " " +
            theDate.getHours() + ":" + theDate.getMinutes() + ":" + theDate.getSeconds();
        $('#diaYhora').text(currentDate);
    }
    setInterval(Clock, 1000);
});