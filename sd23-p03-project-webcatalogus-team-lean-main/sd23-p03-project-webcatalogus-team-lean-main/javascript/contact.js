document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Display the message box
    document.getElementById("messageBox").classList.remove("hidden");

    // Optional: You can add additional logic here, like clearing the form fields
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
});