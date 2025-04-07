document.getElementById("studyPlanForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Form submission ko prevent karo

    let examDate = new Date(document.getElementById("examDate").value);
    let subjects = Array.from(document.getElementById("subjectSelect").selectedOptions).map(option => option.value);

    let today = new Date();
    let daysLeft = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24)); // Days until exam

    let studyPlan = "<h2>📅 Your Study Plan</h2>";
    if (daysLeft > 0) {
        let dailyTopics = Math.ceil(subjects.length / daysLeft);
        studyPlan += <p>You have <b>${daysLeft} days</b> left. Study <b>${dailyTopics} subjects</b> per day.</p>;
        
        studyPlan += "<ul>";
        for (let i = 0; i < daysLeft; i++) {
            studyPlan += <li>📖 Day ${i + 1}: Study ${subjects.slice(i * dailyTopics, (i + 1) * dailyTopics).join(", ")}</li>;
        }
        studyPlan += "</ul>";
    } else {
        studyPlan += "<p>🚨 Exam date has already passed! Choose a future date.</p>";
    }

    document.getElementById("studyPlanOutput").innerHTML = studyPlan;
})