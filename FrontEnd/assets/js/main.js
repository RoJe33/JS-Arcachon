async function testWork(){
    const response = await fetch("http://localhost:5678/api/works");
    const projects = await response.json();
    return projects;
}
let arrayTest = testWork();

let listProjects = document.getElementById("listProjects");

arrayTest.then(function(result) {
    result.forEach(element => {
        // console.log(element.title);
        let div = listProjects.appendChild(document.createElement("div"));
        // div.classList.add('w-1/2')
        let image = div.appendChild(document.createElement('img'));
        image.src = element.imageUrl
        image.classList.add('max-h-96', 'object-contain')
        let p = div.appendChild(document.createElement("p"));
        p.classList.add('text-center')
        p.textContent = element.title;
    });
})
 
 // arrayTest.forEach(function(item) {
//     console.log(item.title);
// });

