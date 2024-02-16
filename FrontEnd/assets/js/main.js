async function testWork(){ //fonction de récup de l'api
    const response = await fetch("http://localhost:5678/api/works");
    return await response.json();
}
let fetchdJson = testWork();
let listProjects = document.getElementById("listProjects");

function changeButtons(but1){ // fonction de changement de couleur des boutons
    all.classList.contains('text-white') ? (all.classList.remove('bg-teal-700', 'text-white'), all.classList.add('text-teal-700')) : "";  
    obj.classList.contains('text-white') ? (obj.classList.remove('bg-teal-700', 'text-white'), obj.classList.add('text-teal-700')) : "";  
    appart.classList.contains('text-white') ? (appart.classList.remove('bg-teal-700', 'text-white'), appart.classList.add('text-teal-700')) : "";  
    hotel.classList.contains('text-white') ? (hotel.classList.remove('bg-teal-700', 'text-white'), hotel.classList.add('text-teal-700')) : "";  
    but1.classList.add('bg-teal-700', 'text-white');
}

function displayData(){ // Affichage des datas raw de l'api
    listProjects.textContent = '';
    fetchdJson.then(function(result) {
        result.forEach(element => {
            let div = listProjects.appendChild(document.createElement("div"));
            let image = div.appendChild(document.createElement('img'));
            image.src = element.imageUrl;
            image.classList.add('h-96', 'object-contain');
            let p = div.appendChild(document.createElement("p"));
            p.classList.add('text-sm', 'py-2');
            p.textContent = element.title;
        });
    })
}

function filterJson(number){ // affichage des datas filtrés par une option
    listProjects.textContent = '';
    fetchdJson.then(function(result){
        result.forEach(element =>{
            if(element.categoryId ==number){
                let div = listProjects.appendChild(document.createElement("div"));
                let image = div.appendChild(document.createElement('img'));
                image.src = element.imageUrl;
                image.classList.add('h-96', 'object-contain');
                let p = div.appendChild(document.createElement("p"));
                p.classList.add('text-sm', 'py-2');
                p.textContent = element.title;
            }
        })
    })
}
// Intéractions des boutons lors du clic
all.addEventListener('click',function(event){
    changeButtons(all);
    data()
});
obj.addEventListener('click',function(event){
    changeButtons(obj);
    filterJson(1)
});
appart.addEventListener('click',function(event){
    changeButtons(appart);
    filterJson(2)
});
hotel.addEventListener('click',function(event){
    changeButtons(hotel);
    filterJson(3)
});

displayData();