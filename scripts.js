document.addEventListener('DOMContentLoaded', () => {
    const datetimeEl = document.getElementById('datetime');
    const patientForm = document.getElementById('patient-form');
    const patientRecords = document.getElementById('patient-records');
    const patientCount = document.getElementById('patient-count');
    const searchInput = document.getElementById('search');

    let patients = JSON.parse(localStorage.getItem('patients')) || [];

    function updateDateTime() {
        const now = new Date();
        datetimeEl.textContent = now.toLocaleString();
    }

    function renderPatients() {
        const today = new Date().toISOString().split('T')[0];
        const todayPatients = patients.filter(patient => patient.date === today);
        patientRecords.innerHTML = todayPatients.map(patient => `<li>${patient.name} <button class="delete-btn">Delete</button></li>`).join('');
        patientCount.textContent = todayPatients.length;

        // Add event listeners to delete buttons
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                patients.splice(index, 1); // Remove the patient from the array
                localStorage.setItem('patients', JSON.stringify(patients)); // Update local storage
                renderPatients(); // Render the updated patient list
            });
        });
    }

    patientForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(patientForm);
        const newPatient = {
            name: formData.get('name'),
            age: formData.get('age'),
            dob: formData.get('dob'),
            fatherName: formData.get('father-name'),
            address: formData.get('address'),
            appointmentTime: formData.get('appointment-time'),
            doctorName: formData.get('doctor-name'),
            roomNumber: formData.get('room-number'),
            date: new Date().toISOString().split('T')[0]
        };
        patients.push(newPatient);
        localStorage.setItem('patients', JSON.stringify(patients));
        renderPatients();
        patientForm.reset();
    });

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filteredPatients = patients.filter(patient => patient.name.toLowerCase().includes(query));
        patientRecords.innerHTML = filteredPatients.map(patient => `<li>${patient.name}</li>`).join('');
    });

    updateDateTime();
    setInterval(updateDateTime, 1000);
    renderPatients();
});
