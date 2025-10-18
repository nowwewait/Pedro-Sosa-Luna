// Your existing code
let footer = document.querySelector('footer');
let thisYear = new Date().getFullYear();

let copyright = document.createElement('p');
copyright.innerHTML = `© Pedro Sosa ${thisYear}`;
footer.appendChild(copyright);

// NEW CODE: Message Form functionality
const messageForm = document.querySelector('form[name="leave_message"]');

messageForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page refresh
    
    // Get form values
    const usersName = event.target.usersName.value;
    const usersEmail = event.target.usersEmail.value;
    const usersMessage = event.target.usersMessage.value;
    
    console.log('Name:', usersName, 'Email:', usersEmail, 'Message:', usersMessage);
    
    // Display message in list
    const messageSection = document.getElementById('messages');
    const messageList = messageSection.querySelector('ul');
    const newMessage = document.createElement('li');
    
    // Create the message content with email link
    newMessage.innerHTML = `
        <a href="mailto:${usersEmail}">${usersName}</a>
        <span>: ${usersMessage}</span>
    `;
    
    // Create remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'remove';
    removeButton.type = 'button';
    
    // Add click event to remove button
    removeButton.addEventListener('click', function() {
        const entry = this.parentNode;
        entry.remove();
    });
    
    // Add remove button to the message
    newMessage.appendChild(removeButton);
    
    // Add the message to the list
    messageList.appendChild(newMessage);
    
    // Clear the form
    event.target.reset();
});

// ASSIGNMENT CODE: Fetch GitHub Repositories
async function getGitHubRepos() {
    try {
        console.log("Starting to fetch GitHub repos...");
        const response = await fetch('https://api.github.com/users/Nowwewait/repos');
        
        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }
        
        const repos = await response.json();
        console.log("GitHub repos received:", repos);
        
        // Get the projects list from your HTML
        const projectsList = document.getElementById('projects-list');
        
        // Clear any existing content
        projectsList.innerHTML = '';
        
        // Add each repo to the projects list
        repos.forEach(repo => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>${repo.name}</strong>: ${repo.description || 'No description'}
            `;
            projectsList.appendChild(listItem);
        });
        
        console.log("GitHub repos displayed on page!");
        
    } catch (error) {
        console.error('Error loading GitHub repositories:', error);
        const projectsList = document.getElementById('projects-list');
        projectsList.innerHTML = '<li>Failed to load projects</li>';
    }
}

// Call the function when the page loads
getGitHubRepos();