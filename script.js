$(document).ready(function() {

    var ladate = new Date();     // on defini la veriable  date
    var year = ladate.getFullYear(); //la valeur de cette date est celle de l'année en cours
    year = year+1;  // on incrémente de 1 la valeur de year car l'année demandée est 2018
    console.log(year);


    // Affichage des modeles de la marque selectionnée avec onchange du select

    $('#marques').on('change', function () {
        selectModel();
    });

    $('#models').on('change', function () {
        calc();
    });


    //affichage les models dans un deuxieme menu deroulant

    function selectModel(){
        var vh_make = $("#marques").val();
        $("#models").html("<option>Models</option>");

        $.getJSON('vehicules.json', function(data) {
            $.each(data,  function (index, x) {     // on parcour le json
                if(x.Vehicle_Make === vh_make){     // si valeur select = valeur json
                    $("#models").append('<option value="'+ x.Vehicle_Model +'">' + x.Vehicle_Description + '</option>');
                }
            })
        })
    }

    //function pour les  calculs

    function calc(taxOption, totalOption){

        var vh_model = $("#models").val();
        $("#box").html("");

        $.getJSON('vehicules.json', function(data) {
            $.each(data,  function (index, x) {    // on parcour le json
                if(x.Vehicle_Model === vh_model){  //si le modèle du select match avect celui du json

                    var currentCO2 = x.Vehicle_CO2; // on defini la variable CO2
                    if(currentCO2 === 360){        // si CO2 > 360 alors taxRate =50;
                      var taxRate = 50;
                    }

                    $.getJSON('CO2TAX.json', function(data) {  //on applique un getjson sur le tableau C02TAX
                        var arr = [];                          // on initie un tableau vide
                        $.each(data, function (index, x){      // on parcour CO2TAX
                            arr.push(x);                       // on injecte (push) le contenu dans le tableau arr initié plus haut

                        });

                    switch( year){                            // selon l'année en cours (ici 2018 ou 2019)

                        case 2018:                            //si 2018
                        for( var i in arr[0])  {              //on boucle sur la clé 2018 du tableau
                            if(parseInt(arr[0][i].CO2) === currentCO2){  //si la valeur du tableau co2 = notre variable CO2,(parseInt pour definir la valeur en interger)
                               taxRate = arr[0][i].TAX;                  // on recupere la valeur de la taxe correspondante
                                console.log(taxRate);
                    }
                }

                break;

                        case 2019:                                         // si 2019
                        for( var i in arr[1])  {                          //on boucle sur la clé 2019 du tableau
                            if (parseInt(arr[1][i].CO2) === currentCO2){  //si la valeur du tableau co2 = notre variable CO2
                                taxRate = arr[1][i].TAX;                 // on recupere la valeur de la taxe correspondante
                                console.log(taxRate);

                            }
                        }
                break;

                        default:
                            alert('Taxes non calculables pour cette Année'); // default: cas ou on est ni en 2018 ni en 2019 affichage d'error message
                            break;
                    }

            //on affiche les informations du vehicule selectionné
            $('#box').html('<p>PRICE : '+ x.Vehicle_Price_including_VAT +'</p>'+
                '<p>CO2: '+ currentCO2+'</p>'+
                '<p>TAXRATE: '+ taxRate +'</p>'+
                   //construction des input pour les options
                '<button class="scrollOption">options</button>'+
                '<div class="boxoption">'+
                  '<input id="option1" type="text" placeholder="prix option..." value="0"><br>'+
                  '<input id="option2" type="text" placeholder="prix option..." value="0"><br>'+
                  '<input id="option3" type="text" placeholder="prix option..." value="0"><br>'+
                  '<input id="option4" type="text" placeholder="prix option..." value="0"><br>'+
                  '<input id="option5" type="text" placeholder="prix option..." value="0"><br>'+
                  '<input id="option6" type="text" placeholder="prix option..." value="0"><br>'+
                  '<input id="option7" type="text" placeholder="prix option..." value="0"><br>'+
                  '<input id="option8" type="text" placeholder="prix option..." value="0"><br>'+
                  '<input id="option9" type="text" placeholder="prix option..." value="0"><br>'+
                  '<input id="option10" type="text" placeholder="prix option..." value="0"><br>'+
                '</div>');
            $('.boxoption').hide(); // dans un but estétique on va masquer la visibilité des cases option (ici class boxoption .hide)
            $('.scrollOption').click(function(){ // et les dérouler au click si besoin est (scrollOption.click fonction)
                $('.boxoption').toggle(300);
            });
            //si on renseigne la valeur des options on a 10 possibilités
             $("#option1, #option2, #option3, #option4, #option5, #option6, #option7, #option8, #option9, #option10").on('change', function(){
                 var priceOption1 = $("#option1").val();
                 priceOption1=parseInt(priceOption1);

                 var priceOption2 = $("#option2").val();
                 priceOption2=parseInt(priceOption2);

                 var priceOption3 = $("#option3").val();
                 priceOption3=parseInt(priceOption3);

                 var priceOption4 = $("#option4").val();
                 priceOption4=parseInt(priceOption4);

                 var priceOption5 = $("#option5").val();
                 priceOption5=parseInt(priceOption5);

                 var priceOption6 = $("#option6").val();
                 priceOption6=parseInt(priceOption6);

                 var priceOption7 = $("#option7").val();
                 priceOption7=parseInt(priceOption7);

                 var priceOption8 = $("#option8").val();
                 priceOption8=parseInt(priceOption8);

                 var priceOption9 = $("#option9").val();
                 priceOption9=parseInt(priceOption9);

                 var priceOption10 = $("#option10").val();
                 priceOption10=parseInt(priceOption10);

                 var totalPriceOption =priceOption1 + priceOption2 + priceOption3 + priceOption4 + priceOption5 +
                     priceOption6 + priceOption7 + priceOption8 + priceOption9 + priceOption10;
                 console.log(totalPriceOption);
                 var totalTaxOption = ((totalPriceOption * 0.945) * (taxRate * 0.01)) / (1 - (taxRate * 0.01)); //on multiplie par 0.01 pour mêtre laTR en pourcentage
                 var totalOption = totalTaxOption + totalPriceOption;

                 calcul(totalTaxOption, totalOption); //on rappele la fonction du calcul general
             });

             // fonction du calcul general

            function calcul(totalTaxOption, totalOption) {  // on passe en parametre les resltats du calcul de la taxe et du total de l'option

                if (totalTaxOption === undefined || totalOption === undefined) {  //condition si l'option n'est pas renseigné
                    totalTaxOption = 0;                                        // on initialise la valeur a 0
                    totalOption = 0;
                }

                // calcul taxe prix vehicule
                var pricetax = (((x.Vehicle_Price_including_VAT) * 0.945) - 250) * (taxRate * 0.01) / (1 - (taxRate *
                    0.01));
                // calcul destaxes totales
                var totaltax = pricetax + totalTaxOption;
                // calcul prix total vehicule + taxes (vehicule + option)
                var totalprice = (x.Vehicle_Price_including_VAT) + pricetax + totalOption;

                //affichage des resultats des calculs
                $('#box2').html('<strong>TOTAL TAX: ' + totaltax + '<strong>' +
                    '<br>' +
                    '<strong>TOTAL PRICE WITH TAX: ' + totalprice + '</strong>')
            }
        });


       }
    })
 });
 }

});

