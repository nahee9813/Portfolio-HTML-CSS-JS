import { projects } from "./Project-data.js";

const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get("id");


const project = projects.find((p) => p.id === parseInt(projectId));

if (project) {
    
    let logoTechnoHTML = '';
    project.technologiesUsed.forEach((tech) => {
        logoTechnoHTML += `<i class="fa-brands fa-${tech}"></i>`;
    })

    let descriptionHTML = '';
    for (const key in project.projectObjective) {
        if (project.projectObjective.hasOwnProperty(key)) {
            descriptionHTML += `<li>${project.projectObjective[key]}</li>`;
        }}

    const projectHTML = `
    <div class="grid-project">
        <nav class="project-nav">
            <a href="Portfolio.html#projects">go back <i class="fa-solid fa-arrow-right"></i> </a>
            <p>current project</p>
            <h3>${project.projectName}</h3>
        </nav>

        <div class="left-section">
        <div class="about-project">
            <h1>${project.projectName}</h1>

            <div class="description">
                <h2>Description</h2>
                <p> ${project.projectDescription}</p>
            </div>
        </div>

        <div class="project-details">
            <h2>Project Details</h2>
            <ul>
                <li><strong>Role:</strong> ${project.projectDetails.Role}</li>
                <li><strong>Duration:</strong> ${project.projectDetails.Duration}</li>
                <li><strong>Team Size:</strong> ${project.projectDetails.TeamSize}</li>
                <li><strong>Status:</strong> ${project.projectDetails.status}</li>
            </ul>
        </div>

        <div class="techno-used">
                <h2>Technologies Used</h2>
                <div class="logo-techno">
                    ${logoTechnoHTML}
                </div>
            </div>

     </div>

     <div class="right-section">
        <div class="project-image">
            <img src="project-image/${project.projectImg}" alt="Project Image">
        </div>
        
        <div class="objective">
            <h2>Objective</h2>
            <ul>
                ${descriptionHTML}
            </ul>
     </div>
     </div>
    </div>
    `;
    document.querySelector(".js-project-container").innerHTML = projectHTML;
} else {
    document.querySelector(".js-project-container").innerHTML = "<p>Project not found.</p>";
}
