
// FUNCION QUE SE ACTIVA AL PRESIONAR EL BOTON TRAS INGRESAR UN NUMERO
$(document).ready(function(){
    $('#btn').click(() => {
        
        // COMPROBACION DEL INGRESO EXCLUSIVO DE NUMEROS EN EL INPUT
        const regExp = /[0-9]+$/gi
        const valor = document.querySelector("#input")
        const regNumero = regExp.test(valor.value)
        if (regNumero == false) {
        return alert('Escriba solo numeros por favor')} 

        // SE GUARDA EL NUMERO INGRESADO POR EL USUARIO EN UNA VARIABLE
        let inputValue = document.getElementById("input").value; 
        
        // API SUPER HERO
        $.ajax({
            url: `https://www.superheroapi.com/api.php/2973630296293444/${inputValue}`,
            type: "GET",
            dataType: "JSON",
            success(data){

                // SE IMPRIMEN EN EL DOM LA IMAGEN Y LA INFO DEL HEROE
                pintarElementos(data);

                // SE IMPRIME EN EL DOM EL GRAFICO CON LAS ESTADISTCAS DEL HEROE
                var grafico = {
                    title: {
                        text: `Estadisticas de poder para ${data.name}`},
                    data: [{
                        showInLegend: "true",
                        legendText: "{tipo}",
                        type: "pie",
                        dataPoints: [
                            {y: `${data.powerstats.power}`, label: `Power (${data.powerstats.power})`, tipo:"Power" },
                            {y: `${data.powerstats.combat}`, label: `Combat (${data.powerstats.combat})`, tipo:"Combat" },
                            {y: `${data.powerstats.intelligence}`, label: `Intelligence (${data.powerstats.intelligence})`, tipo:"Intelligence" },
                            {y: `${data.powerstats.strength}`, label: `Strength (${data.powerstats.strength})`, tipo:"Strength" },
                            {y: `${data.powerstats.speed}`, label: `Speed (${data.powerstats.speed})`, tipo:"Speed" },
                            {y: `${data.powerstats.durability}`, label: `Durability (${data.powerstats.durability})`, tipo:"Durability" }
                        ]
                    }]
                };
                $("#infoGrafico").CanvasJSChart(grafico);
            },

            // MENSAJE EN CONSOLA EN CASO DE ERROR AL ACCEDER A LOS DATOS DE LA API
            error(e){
                console.log(e)
            }
        })
    })
})

    // MAQUETA DE LA SECCION INFO DE HEROE PARA LA IMPRESION EN EL DOM
    const pintarElementos = (data) => {
        $("#infoHeroe").html("");
    
        $("#infoHeroe").append(`
            <h2>SuperHero Encontrado</h2>

            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">

                    <div class="col-md-4">
                        <img id="imagen" src="${data.image.url}" class="img-fluid rounded-start" alt="...">
                    </div>

                    <div class="col-md-8">
                    <div class="card-body">
                    <h4 class="card-title">Nombre: ${data.name}</h4>

                    <p class="card-text"><b>Grupo-Afiliación: </b>${data.connections["group-affiliation"]}</p>

                        <div class="ms-2 fst-italic">
                            <p class="card-text"><b>Publicado por: </b>${data.biography.publisher}</p>
                                <hr>
                            <p class="card-text"><b>Ocupación: </b>${data.work.occupation}</p>
                                <hr>
                            <p class="card-text"><b>Primera aparición: </b>${data.biography["first-appearance"]}</p>
                                <hr>
                            <p class="card-text"><b>Altura: </b>${data.appearance.height[0]} - ${data.appearance.height[1]}</p>
                                <hr>
                            <p class="card-text"><b>Peso: </b>${data.appearance.weight[0]} - ${data.appearance.weight[1]}</p>
                                <hr>
                            <p class="card-text"><b>Familiares: </b>${data.connections.relatives}</p>
                        </div>

                
                    </div>
                    </div>
                </div>
            </div>
        `)
    }
