// Dummy Progress Data
let progress = 70;
document.querySelector(".progress-fill").style.width = progress + "%";
document.querySelector(".progress-fill").innerText = progress + "%";

// Add Logout Functionality
document.querySelector(".sidebar ul li:last-child a").addEventListener("click", function() {
    alert("Logged out successfully!");
    window.location.href = "index.html";
});