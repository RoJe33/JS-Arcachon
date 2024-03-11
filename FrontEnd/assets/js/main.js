async function testWork(){ //fonction de récup de l'api
    const response = await fetch("http://localhost:5678/api/works");
    return await response.json();
}

async function categories(){ //fonction de récup de l'api
    const response = await fetch("http://localhost:5678/api/categories");
    return await response.json();
}
let fetchdJson = testWork();
let fetchdCategories = categories();
let listProjects = document.getElementById("listProjects");
let login = document.getElementById("login");
let myButtons = document.getElementById("myButtons");
let myProjects = document.getElementById("myProjects");
let panelModify = document.getElementById("panelModify");
let panelApi = document.getElementById("panel-data-api");
let childPanelApi = document.getElementById("child-panel-api");
let X = document.getElementById("X");
let panelProjects = document.getElementById("panelProjects");
let addProject = document.getElementById("addProject");
let addProjectPanel = document.getElementById("addProjectPanel");
let childAddPanel = document.getElementById("child-add-panel");
let closeAdd = document.getElementById("closeAdd");
let returnPanel = document.getElementById("returnPanel");
let uploadPhoto = document.getElementById("uploadPhoto");
let buttonFile = document.getElementById("buttonFile");
let category = document.getElementById("category");
let previewImage = document.getElementById("previewImage");
let addForm = document.getElementById("addForm");
let innerPreview = previewImage.innerHTML;


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
    displayData()
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
    filterJson(3);
});

displayData();

localStorage.getItem("token") ? login.textContent = "logout" : '';

if(localStorage.getItem("token")){
    myButtons.classList.add("hidden")
    panelModify.classList.remove("hidden")
}

function showPanelApi(){
    panelApi.classList.remove("hidden");
    setTimeout(()=> {
        panelApi.classList.add("opacity-100");
        panelApi.classList.remove("opacity-0");
    })
}
function hidePanelApi(){
    panelApi.classList.remove("opacity-100");
    panelApi.classList.add("opacity-0");
    setTimeout(()=> {
        panelApi.classList.add("hidden");
    }, 500)
}
function displayDataPanel(){ 
    panelProjects.textContent = '';
    fetchdJson.then(function(result) {
        result.forEach(element => {
            let div = panelProjects.appendChild(document.createElement("div"));
            div.classList.add('relative')
            let thrash = div.appendChild(document.createElement('div'));
            thrash.classList.add('fixed','ml-8','mt-1', 'z-10', 'bg-black','h-5', 'w-5', 'flex', 'justify-center', 'items-center', 'cursor-pointer');
            thrash.innerHTML = "<i class=\"fa-solid fa-trash text-white\"></i>";
            let image = div.appendChild(document.createElement('img'));
            image.src = element.imageUrl;
            image.classList.add('object-contain', 'max-h-20');
            let p = div.appendChild(document.createElement("p"));
            p.classList.add('text-sm', 'py-2');
            p.textContent = "éditer";
        });
    })
}

panelModify.addEventListener('click', function(event){
    showPanelApi();
    displayDataPanel();
})

childPanelApi.addEventListener('click', function(event){
    event.stopPropagation   ;
})

panelApi.addEventListener('click',function(event){
    if(event.target === panelApi){
        hidePanelApi();
    }
})
X.addEventListener('click',function(event){
        hidePanelApi();
})

function showAddPanel(){
    addProjectPanel.classList.remove("hidden");
    addProjectPanel.classList.add("opacity-100");
    addProjectPanel.classList.remove("opacity-0");
    panelApi.classList.remove("opacity-100");
    panelApi.classList.add("opacity-0");
    setTimeout(()=> {
        panelApi.classList.add("hidden");
    }, 500)
}
function hideAddPanel(){
    addForm.reset();
    previewImage.innerHTML = innerPreview;
    //marche pas lorsque que je reclick sur le bouton
    addProjectPanel.classList.remove("opacity-100");
    addProjectPanel.classList.add("opacity-0");
    setTimeout(()=> {
        addProjectPanel.classList.add("hidden");
    }, 500)
}

addProject.addEventListener('click', function(event){
    showAddPanel();
})
closeAdd.addEventListener('click', function(event){
    hideAddPanel();
})
childAddPanel.addEventListener('click', function(event){
    event.stopPropagation   ;
})

addProjectPanel.addEventListener('click',function(event){
    if(event.target === addProjectPanel){
        hideAddPanel();
    }
})

returnPanel.addEventListener('click', function(event){
    panelApi.classList.remove("hidden");
    panelApi.classList.add("opacity-100");
    panelApi.classList.remove("opacity-0");
    addProjectPanel.classList.remove("opacity-100");
    addProjectPanel.classList.add("opacity-0");
    setTimeout(()=> {
        addProjectPanel.classList.add("hidden");
    }, 500)
})

buttonFile.addEventListener('click', function(event){
    uploadPhoto.click();
})

function displayCat(){ // Affichage des datas raw de l'api
    fetchdCategories.then(function(result) {
        result.forEach(element => {
            let option = category.appendChild(document.createElement("option"));
            option.value = element.id;
            option.textContent = element.name;
            option.classList.add("pl-2")
        });
    })
}

displayCat();

function uploadImage(){
    let file = uploadPhoto.files[0];
    if(file){
        let reader = new FileReader();
        reader.onload = function (e) {
            console.log(file)
            let imageDataUrl = e.target.result;
            previewImage.innerHTML = `<div class="justify-center flex"><img src="${imageDataUrl}" alt="Uploaded Image" class="max-h-40 max-w-80 items-center"></div>`
        }
        reader.readAsDataURL(file);
    }
}

uploadPhoto.addEventListener('change', function(event){
    uploadImage();
})

addForm.onsubmit = async (e) => {
    e.preventDefault();

    let fileInput = uploadPhoto.files[0];
    let formTest = new FormData(addForm);
    formTest.append("image", fileInput, "test.png")
    console.log(formTest)

    let response = await fetch("http://localhost:5678/api/works", {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: formTest
    })
    console.log(response)

    let result = await response.json();

    console.log(result.message);
}