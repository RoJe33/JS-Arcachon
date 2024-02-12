async function testWork(){
    const response = await fetch("http://localhost:5678/api/works");
    const projects = await response.json();
    return projects;
}
let arrayTest = testWork();

let listProjects = document.getElementById("listProjects");

function data(){
    listProjects.textContent = '';
    arrayTest.then(function(result) {
        result.forEach(element => {
            let div = listProjects.appendChild(document.createElement("div"));
            let image = div.appendChild(document.createElement('img'));
            image.src = element.imageUrl;
            image.classList.add('h-96', 'object-contain');
            let p = div.appendChild(document.createElement("p"));
            p.classList.add('text-sm');
            p.textContent = element.title;
        });
    })
}
data();
let all = document.getElementById("all");
let obj = document.getElementById("obj");
let appart = document.getElementById("appart");
let hotel = document.getElementById("hotel");

function changeButtons(but1){
    all.classList.contains('text-white') ? (all.classList.remove('bg-teal-700', 'text-white'), all.classList.add('text-teal-700')) : "";  
    obj.classList.contains('text-white') ? (obj.classList.remove('bg-teal-700', 'text-white'), obj.classList.add('text-teal-700')) : "";  
    appart.classList.contains('text-white') ? (appart.classList.remove('bg-teal-700', 'text-white'), appart.classList.add('text-teal-700')) : "";  
    hotel.classList.contains('text-white') ? (hotel.classList.remove('bg-teal-700', 'text-white'), hotel.classList.add('text-teal-700')) : "";  
    but1.classList.add('bg-teal-700', 'text-white');
}

all.addEventListener('click',function(event){
    changeButtons(all);
    data()
});
obj.addEventListener('click',function(event){
    changeButtons(obj);
    dataFilter(1)
});
appart.addEventListener('click',function(event){
    changeButtons(appart);
    dataFilter(2)
});
hotel.addEventListener('click',function(event){
    changeButtons(hotel);
    dataFilter(3)
});

function dataFilter(number){
    listProjects.textContent = '';
    arrayTest.then(function(result){
        result.forEach(element =>{
            if(element.categoryId ==number){
                let div = listProjects.appendChild(document.createElement("div"));
                let image = div.appendChild(document.createElement('img'));
                image.src = element.imageUrl;
                image.classList.add('h-96', 'object-contain');
                let p = div.appendChild(document.createElement("p"));
                p.classList.add('text-sm');
                p.textContent = element.title;
            }
        })
    })
}
