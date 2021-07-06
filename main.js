console.log("JavaScript Charged");


const myP1 = document.querySelector('#p1');
function indexGateau(){

    let myRequest = new XMLHttpRequest();
    myRequest.open('GET', 'http://localhost/PhpGateau/index.php?controller=gateau&task=indexApi');
    myRequest.onload = () => {
        var reponse = JSON.parse(myRequest.responseText);
        
        myP1.innerHTML = "---------------INDEXAPI------------ <br>" ;
        reponse.forEach(gateau => {
          stock = myP1.innerHTML;
          myP1.innerHTML = stock + "name : " + gateau.name + " | gout : " + gateau.gout + "<br>";
        });
      };
    myRequest.send();
} 


// const myP2 = document.querySelector('#p2');
// function showGateau(arg1){

//     let myRequest = new XMLHttpRequest();
//     myRequest.open('POST', 'http://localhost/PhpGateau/index.php?controller=gateau&task=showApi', true);
//     myRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//     myRequest.onload = () => {
        
//         let reponse = JSON.parse(myRequest.responseText);
//         myP2.innerHTML = "---------------SHOWAPI------------" + "<br>"  
//         + "GATEAUX" + "<br>"
//         +  "name : " + reponse.gateau.name + " | gout : " + reponse.gateau.gout + "<br>" + "<br>"
//         + "RECETTE" + "<br>";
//         reponse.recipes.forEach(recipe => {
//           stock = myP2.innerHTML;
//           myP2.innerHTML = stock + " - name : " + recipe.name + " | desc : " + recipe.desc + "<br> <br>";
//         })
//       };
//     myRequest.send(arg1);
// }

// function suppGateau(arg1){

//   let myRequest = new XMLHttpRequest();
//   myRequest.open('POST', 'http://localhost/PhpGateau/index.php?controller=gateau&task=supprApi', true);
//   myRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//   myRequest.onload = () => {

//     };
//   myRequest.send(arg1);
// }

// function addGateau(arg1){
  
//   let myRequest = new XMLHttpRequest();
//   myRequest.open('POST', 'http://localhost/PhpGateau/index.php?controller=gateau&task=addApi', true);
//   myRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//   myRequest.onload = () => {

//     };
//   myRequest.send(arg1);
// }


const divGateaux = document.querySelector('.gateaux');
const divRecettes = document.querySelector('.recettes');

const boutonStart = document.querySelector('.start');

boutonStart.addEventListener('click', event =>{
    afficheTousLesGateaux();
})

function afficheTousLesGateaux(){
  let maRequete = new XMLHttpRequest();   
  maRequete.open('GET', 'http://localhost/PhpGateau/index.php?controller=gateau&task=indexApi' )
  maRequete.onload =  () => {
          let data = JSON.parse(maRequete.responseText)
          faireDesCardsGateaux(data);
  }
        maRequete.send();
}

function afficheUnGateau(sonId){
    let maRequete = new XMLHttpRequest();
    maRequete.open('GET', `http://localhost/PhpGateau/index.php?controller=gateau&task=showApi&id=${sonId}` )
    maRequete.onload =  () => {
            let data = JSON.parse(maRequete.responseText)
            let gateau = data.gateau   //objet
            let recettes = data.recipes   //tableau d'objets recette
            faireCardGateauEtCardsRecettes(gateau, recettes)
    }
          maRequete.send();
}

function faireDesCardsGateaux(tableauGateau){
    let cards = "";
    tableauGateau.forEach(element => {

        card = `<div class="col-4 p-3">
        <div class="card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${element.name}</h5>
            <p class="card-text">${element.gout}</p>
            <button value="${element.id}" class="btn btn-primary showGateau">voir le gateau</button>
            </div>
        </div>
    </div>`
        cards += card
        divGateaux.innerHTML = cards
        divRecettes.innerHTML = "";
    });
        document.querySelectorAll('.showGateau').forEach(bouton =>{
        bouton.addEventListener('click', event =>{
            afficheUnGateau(bouton.value);
        })
    })
}

function faireCardGateauEtCardsRecettes(gateau, recettes) {
  cardGateau = `<div class="col-4 p-3">
  <div class="card" style="width: 18rem;">
      <div class="card-body">
      <h5 class="card-title">${gateau.name}</h5>
      <p class="card-text">${gateau.gout}</p>
      </div>
           <button class="btn btn-success retourGateaux">Retour aux Gateaux</button></div> </div>`;

  divGateaux.innerHTML = cardGateau;
  cardsRecettes = "";

  recettes.forEach(recette => {
      cardRecette = `<div class="col-4 p-3" data-recette="${recette.id}">
      <div class="card" style="width: 18rem;">
          <div class="card-body">
          <h5 class="card-title">${recette.name}</h5>
          <p class="card-text">${recette.desc}</p>
          </div>
               <button value="${recette.id}" class="btn btn-danger delRecipe">del la recipe</button></div> </div>`;

      cardsRecettes += cardRecette;
  })

  divRecettes.innerHTML = cardsRecettes;

  document.querySelector('.retourGateaux').addEventListener('click', event => {
      afficheTousLesGateaux();

  })
  
  document.querySelector('.delRecipe').addEventListener('click', event => {
    
    supprimerUneRecette(document.querySelector('.delRecipe').value);

  })
} 
function supprimerUneRecette(sonId){
  let maRequete = new XMLHttpRequest();
  maRequete.open('POST', `http://localhost/PhpGateau/index.php?controller=recipe&task=suppApi` )
  maRequete.onload =  () => {

    let divRecette = document.querySelector(`div[data-recette="${sonId}"]`)
        divRecette.remove()
  }
  maRequete.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  param= "id="+sonId;
  maRequete.send(param);
} 
//form
const formStart = document.querySelector('.formstart');
const formName = document.querySelector('.formname')

formStart.addEventListener('click', event =>{

  console.log(formName.value)

})
 