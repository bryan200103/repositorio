const Base_Url = "https://api.github.com/users"
const UserName = 'bryan200103'
const REPOSITORIES_PER_PAGE = 100;

document.addEventListener("DOMContentLoaded",()=>{
    getProfile();
    getProyect();
})

function getProfile(){
    fetch(`${Base_Url}/${UserName}`)
    .then((res)=>res.json())
    .then((data)=>{
        document.getElementById("github-profile").src = data.avatar_url;

        document.querySelectorAll(".github-profile-name").forEach((elem)=>{
            elem.textContent= data.name;
        });
        document.getElementById("bio-git").textContent=data.bio;
        document.getElementById("username-git").textContent=data.login;
    });
}

function getProyect(){
    fetch(`${Base_Url}/${UserName}/repos?per_page=${REPOSITORIES_PER_PAGE}`)
    .then((res)=>res.json())
    .then((data)=>{
        const contenedorP = document.getElementById("contenedorproy");

        data.forEach((repo)=>{
            const repoArt = document.createElement("article")
            repoArt.classList.add("proyectos")

            repoArt.innerHTML = `
             <header class="headerPro">
                <span class="proyec-name"> ${repo.name} </span>
                <span class="proyec-descrip">${
                    repo.description ?? "sin descripcion"}
                </span>
             </header>
             
             <ul class="temaproyect">
                    ${repo.topics
                        .map((topic)=>{
                           return ` <li class="temaproyect" ${getTopic(topic)}>
                                <span>${topic}</span>
                           </li>
                            `;
                        })
                    .join("")}
             </ul>

             <section class="project-git">
              <a href="https://github.com/bryan200103/${
                repo.name
              }" target="_blank">
                <button class="btnG btn-primary">Ir al repositorio</button>
              </a>
            </section>
        `;
            
            


            contenedorP.append(repoArt);
        });
    });
    
}

function getTopic(topic) {
  if (topic == "HTML") {
    return "topic-html";
  }

  if (topic == "netcore") {
    return "topic-netcore";
  }

  if (topic == "css") {
    return "topic-css";
  }

  return "topic-default";
}