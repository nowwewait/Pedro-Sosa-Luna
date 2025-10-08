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