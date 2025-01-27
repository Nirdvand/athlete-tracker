
// Load saved data from localStorage
let userData = JSON.parse(localStorage.getItem('athletePlanner')) || {
    schedule: {
        Monday: {
            school: { start: '08:45', end: '15:15' },
            clubTraining: { active: true, start: '16:00', end: '17:30' },
            schoolTraining: { active: false, start: '', end: '' }
        },
        Tuesday: {
            school: { start: '08:45', end: '15:15' },
            clubTraining: { active: false, start: '', end: '' },
            schoolTraining: { active: true, start: '15:30', end: '17:00' }
        },
        Wednesday: {
            school: { start: '08:45', end: '15:15' },
            clubTraining: { active: true, start: '16:00', end: '17:30' },
            schoolTraining: { active: false, start: '', end: '' }
        },
        Thursday: {
            school: { start: '08:45', end: '15:15' },
            clubTraining: { active: false, start: '', end: '' },
            schoolTraining: { active: true, start: '15:30', end: '17:00' }
        },
        Friday: {
            school: { start: '08:45', end: '15:15' },
            clubTraining: { active: false, start: '', end: '' },
            schoolTraining: { active: false, start: '', end: '' }
        }
    },
    currentView: 'both',
    energy: {
        study: '8',
        sports: '9',
        overall: '8'
    }
};

function saveData() {
    localStorage.setItem('athletePlanner', JSON.stringify(userData));
}

function setSchedule(type) {
    userData.currentView = type;
    updateScheduleDisplay();
    saveData();
    
    document.querySelectorAll('.button-group button').forEach(button => {
        button.classList.remove('active');
    });
    event.target.classList.add('active');
}

function showCustomizeSchedule() {
    const modal = document.getElementById('customizeModal');
    let content = '';
    
    for (const [day, schedule] of Object.entries(userData.schedule)) {
        content += `
            <div class="day-schedule">
                <h3>${day}</h3>
                <div class="time-group">
                    <label>School Hours:</label>
                    <input type="time" value="${schedule.school.start}" 
                        onchange="updateTime('${day}', 'school', 'start', this.value)">
                    <input type="time" value="${schedule.school.end}"
                        onchange="updateTime('${day}', 'school', 'end', this.value)">
                </div>
                <div class="time-group">
                    <label>
                        <input type="checkbox" ${schedule.clubTraining.active ? 'checked' : ''}
                            onchange="toggleTraining('${day}', 'club', this.checked)">
                        Club Training
                    </label>
                    <br>
                    <input type="time" value="${schedule.clubTraining.start}"
                        onchange="updateTime('${day}', 'clubTraining', 'start', this.value)"
                        ${!schedule.clubTraining.active ? 'disabled' : ''}>
                    <input type="time" value="${schedule.clubTraining.end}"
                        onchange="updateTime('${day}', 'clubTraining', 'end', this.value)"
                        ${!schedule.clubTraining.active ? 'disabled' : ''}>
                </div>
                <div class="time-group">
                    <label>
                        <input type="checkbox" ${schedule.schoolTraining.active ? 'checked' : ''}
                            onchange="toggleTraining('${day}', 'school', this.checked)">
                        School Training
                    </label>
                    <br>
                    <input type="time" value="${schedule.schoolTraining.start}"
                        onchange="updateTime('${day}', 'schoolTraining', 'start', this.value)"
                        ${!schedule.schoolTraining.active ? 'disabled' : ''}>
                    <input type="time" value="${schedule.schoolTraining.end}"
                        onchange="updateTime('${day}', 'schoolTraining', 'end', this.value)"
                        ${!schedule.schoolTraining.active ? 'disabled' : ''}>
                </div>
            </div>
        `;
    }
    
    modal.querySelector('.modal-content').innerHTML = content + `
        <button onclick="closeCustomize()" class="customize-btn">Done</button>
    `;
    modal.style.display = 'flex';
}

function updateTime(day, type, timeType, value) {
    userData.schedule[day][type][timeType] = value;
    saveData();
    updateScheduleDisplay();
}

function toggleTraining(day, type, active) {
    userData.schedule[day][type + 'Training'].active = active;
    saveData();
    updateScheduleDisplay();
    showCustomizeSchedule(); // Refresh modal
}

function closeCustomize() {
    document.getElementById('customizeModal').style.display = 'none';
}

function updateScheduleDisplay() {
    const scheduleDiv = document.getElementById('schedule');
    let html = '';
    
    for (const [day, schedule] of Object.entries(userData.schedule)) {
        html += `
            <div class="schedule-item">
                <strong>${day}</strong>
                <div>School: ${schedule.school.start} - ${schedule.school.end}</div>
                ${schedule.clubTraining.active && (userData.currentView === 'both' || userData.currentView === 'club') ?
                    `<div style="color: #34a853">Club Training: ${schedule.clubTraining.start} - ${schedule.clubTraining.end}</div>` : ''}
                ${schedule.schoolTraining.active && (userData.currentView === 'both' || userData.currentView === 'school') ?
                    `<div style="color: #34a853">School Training: ${schedule.schoolTraining.start} - ${schedule.schoolTraining.end}</div>` : ''}
            </div>
        `;
    }
    
    scheduleDiv.innerHTML = html;
}

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

// Initialize display
document.addEventListener('DOMContentLoaded', () => {
    updateScheduleDisplay();
    document.getElementById('
