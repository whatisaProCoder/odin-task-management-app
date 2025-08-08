export default function createWelcomePage() {
    const content = document.querySelector(".content");
    content.innerHTML = /* html */ `
        <div class="welcome-page">
            <div class="text">Welcome to <span>Polymath</span></div> 
            <div class="subtext">An intuitive task management application.</div>
            <div class="user-prompt">Start by adding a project and task!</span>
        </div>
    `;
}