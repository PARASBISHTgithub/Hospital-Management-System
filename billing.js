document.addEventListener("DOMContentLoaded", function() {
    function validateForm() {
        var patientName = document.getElementById("patient-name").value;
        var treatmentCost = parseFloat(document.getElementById("treatment-cost").value);
        var paymentMethod = document.getElementById("payment-method").value;

        if (patientName.trim() === "") {
            alert("Please enter the patient's name.");
            return false;
        }

        if (isNaN(treatmentCost) || treatmentCost <= 0) {
            alert("Please enter a valid treatment cost.");
            return false;
        }

        // Update the total bill amount
        var todayTotalBillAmountElement = document.getElementById("today-total-bill-amount");
        var currentTotalAmount = parseFloat(todayTotalBillAmountElement.innerText.replace('₹', '')) || 0;
        var newTotalAmount = currentTotalAmount + treatmentCost;
        todayTotalBillAmountElement.innerText = "₹" + newTotalAmount.toFixed(2);

        // Update the patient details
        var patientDetailsContainer = document.getElementById("patient-details");
        var newPatientDetail = document.createElement("li");
        newPatientDetail.innerText = patientName + " - " + paymentMethod;
        patientDetailsContainer.querySelector("ul").appendChild(newPatientDetail);

        return true;
    }

    // Form submission event listener
    var billingForm = document.getElementById("billing-form");
    billingForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        validateForm(); // Call the validateForm function
    });
});
