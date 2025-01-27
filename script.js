// Load saved data from localStorage
let userData = JSON.parse(localStorage.getItem('athletePlanner')) || {
    schedule: {
        school: {
            startTime: '8:45',
            endTime: '15:15'
        },
        training: {
            clubDays: ['Monday', 'Wednesday'],
            clubTimes: '16:00-17:30',
            schoolTeamDays: ['Tuesday', 'Thursday'],
            schoolTeamTimes: '15:30-17:00'
        }
    },
    energy: {
        study: '8',
        sports: '9',
        overall: '8'
    },
    currentSchedule: 'both'
};

// Save data function
function saveData() {
    localStorage.setItem('athletePlanner', JSON.stringify(userData));
}

// Update schedule display
function setSchedule(type) {
    userData.currentSchedule = type;
    updateScheduleDisplay();
    saveData();
    
    // Update button styles
    document.querySelectorAll('.button-group button').forEach(button => {
        button.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Add customization modal
function showCustomizeSchedule() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Customize Your Schedule</h3>
            <div class="form-group">
                <label>School Start Time:</label>
                <input type="time" id="schoolStart" value="${userData.schedule.school.startTime}">
            </div>
            <div class="form-group">
                <label>School End Time:</label>
                <input type="time" id="schoolEnd" value="${userData.schedule.school.endTime}">
            </div>
            <div class="form-group">
                <label>Club Training Time:</label>
                <input type="time" id="clubTime" value="${userData.schedule.training.clubTimes.split('-')[0]}">
            </div>
            <div class="form-group">
                <label>School Team Training Time:</label>
                <input type="time" id="schoolTeamTime" value="${userData.schedule.training.schoolTeamTimes.split('-')[0]}">
            </div>
            <button onclick="saveCustomSchedule()">Save Changes</button>
            <button onclick="closeModal()">Cancel</button>
        </div>
    `;
    document.body.appendChild(modal);
}

function saveCustomSchedule() {
    const schoolStart = document.getElementById('schoolStart').value;
    const schoolEnd = document.getElementById('schoolEnd').value;
    const clubTime = document.getElementById('clubTime').value;
    const schoolTeamTime = document.getElementById('schoolTeamTime').value;

    userData.schedule.school.startTime = schoolStart;
    userData.schedule.school.endTime = schoolEnd;
    userData.schedule.training.clubTimes = `${clubTime}-${addHours(clubTime, 1.5)}`;
    userData.schedule.training.schoolTeamTimes = `${schoolTeamTime}-${addHours(schoolTeamTime, 1.5)}`;

    saveData();
    updateScheduleDisplay();
    closeModal();
}

function addHours(time, hours) {
    const [h, m] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(h));
    date.setMinutes(parseInt(m));
    date.setHours(date.getHours() + hours);
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function closeModal() {
    document.querySelector('.modal').remove();
}

function updateScheduleDisplay() {
    const scheduleDiv = document.getElementById('schedule');
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    
    scheduleDiv.innerHTML = days.map(day => {
        const hasClubTraining = userData.schedule.training.clubDays.includes(day);
        const hasSchoolTraining = userData.schedule.training.schoolTeamDays.includes(day);
        const showTraining = 
            userData.currentSchedule === 'both' ? (hasClubTraining || hasSchoolTraining) :
            userData.currentSchedule === 'club' ? hasClubTraining :
            userData.currentSchedule === 'school' ? hasSchoolTraining : false;

        return `
            <div class="schedule-item">
                <strong>${day}</strong>
                <div>School: ${userData.schedule.school.startTime} - ${userData.schedule.school.endTime}</div>
                ${showTraining ? `
                    <div style="color: green">
                        Training: ${hasClubTraining ? userData.schedule.training.clubTimes : userData.schedule.training.schoolTeamTimes}
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

// Energy tracking with saving
function logEnergy() {
    const study = prompt('Rate your study focus today (0-10):', userData.energy.study);
    const sports = prompt('Rate your sports performance today (0-10):', userData.energy.sports);
    const overall = prompt('Rate your overall energy today (0-10):', userData.energy.overall);
    
    if (study && sports && overall) {
        userData.energy = { study, sports, overall };
        document.getElementById('studyEnergy').textContent = study + '/10';
        document.getElementById('sportsEnergy').textContent = sports + '/10';
        document.getElementById('overallEnergy').textContent = overall + '/10';
        saveData();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateScheduleDisplay();
    
    // Load saved energy levels
    document.getElementById('studyEnergy').textContent = userData.energy.study + '/10';
    document.getElementById('sportsEnergy').textContent = userData.energy.sports + '/10';
    document.getElementById('overallEnergy').textContent = userData.energy.overall + '/10';
});
