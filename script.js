document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('prediction-form');
    const submitBtn = document.getElementById('predict-btn');
    const spinner = document.getElementById('btn-spinner');
    const btnText = submitBtn.querySelector('span');

    const resultContainer = document.getElementById('result-container');
    const riskBadge = document.getElementById('risk-badge');
    const probBar = document.getElementById('prob-bar');
    const probText = document.getElementById('prob-text');
    const resultMessage = document.getElementById('result-message');
    
    const errorBox = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Reset UI State
        errorBox.classList.add('hidden');
        resultContainer.classList.add('hidden');
        resultContainer.className = 'result-box hidden'; // Remove theme classes
        probBar.style.width = '0%';
        
        // Setup Loading State
        submitBtn.disabled = true;
        btnText.textContent = 'Analyzing...';
        spinner.style.display = 'block';

        // Gather Data
        const formData = new FormData(form);
        const requestData = {};
        
        for (let [key, value] of formData.entries()) {
            requestData[key] = Number(value);
        }

        try {
            // Note: Update URL if hosted elsewhere
            const response = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch prediction');
            }

            // Process Data
            displayResult(data.prediction, data.probability);

        } catch (error) {
            console.error('Error:', error);
            errorText.textContent = error.message || 'Unable to connect to the server. Is the backend running?';
            errorBox.classList.remove('hidden');
        } finally {
            // Revert Loading State
            submitBtn.disabled = false;
            btnText.textContent = 'Analyze Risk Profile';
            spinner.style.display = 'none';
        }
    });

    function displayResult(prediction, probability) {
        // Show result box
        resultContainer.classList.remove('hidden');

        // Convert prob to percentage
        const perc = (probability * 100).toFixed(1);
        
        // Animate progress bar (delay slightly for animation effect)
        setTimeout(() => {
            probBar.style.width = `${perc}%`;
            probText.textContent = `${perc}%`;
        }, 50);

        if (probability >= 0.70) {
            // High Risk (Heart Disease Present / Very Likely)
            resultContainer.classList.add('theme-high');
            riskBadge.textContent = 'HIGH RISK';
            resultMessage.innerHTML = `<strong>Attention:</strong> The model indicates a high probability of heart disease markers. Please consult a healthcare professional or cardiologist for a comprehensive clinical diagnosis immediately.`;
        } else if (probability >= 0.40) {
            // Moderate Risk
            resultContainer.classList.add('theme-mod');
            riskBadge.textContent = 'MODERATE RISK';
            resultMessage.innerHTML = `<strong>Advisory:</strong> The model indicates a moderate probability of heart disease markers. Consider scheduling a check-up with your doctor to discuss preventative measures and lifestyle adjustments.`;
        } else {
            // Low Risk
            resultContainer.classList.add('theme-low');
            riskBadge.textContent = 'LOW RISK';
            resultMessage.innerHTML = `<strong>Good News:</strong> The model indicates a low probability of heart disease markers. Continue maintaining a healthy lifestyle, diet, and regular medical check-ups.`;
        }
        
        // Scroll to result
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});
