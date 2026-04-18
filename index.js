function appSetup() {
    const input = document.querySelector("#state-input");
    const submitButton = document.querySelector("#fetch-alerts");
    const displaySection = document.querySelector("#alerts-display");
    const errorMessage = document.querySelector("#error-message");

    if(!input || !submitButton || !displaySection || !errorMessage) {
        return;
    }
    async function getWeatherAlerts() {
        try {
            displaySection.innerHTML = "";
            errorMessage.textContent = "";
            errorMessage.classList.add("hidden");
            const state = input.value.trim().toUpperCase();

            const response = await fetch(`https://api.weather.gov/alerts/active?area=${state}`);
            
            const data = await response.json();
            const alerts = data.features;

            const summaryMessage = document.createElement("p");
            summaryMessage.textContent = `Weather Alerts: ${alerts.length}`;
            displaySection.appendChild(summaryMessage);

            alerts.forEach(alert => {
                const alertMessage = document.createElement("p");
                alertMessage.textContent = alert.properties.headline;
                displaySection.appendChild(alertMessage);
            });
                
            input.value = "";
        } catch (error) {errorMessage.textContent = "Error fetching weather alerts. Please try again.";
            errorMessage.classList.remove("hidden");
        }
    }
    submitButton.addEventListener("click", getWeatherAlerts);

    document.addEventListener("DOMContentLoaded",appSetup);
}