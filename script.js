// Schedule data
const schedule = {
    school: {
        startTime: '8:30',
        endTime: '15:30'
    },
    training: {
        clubDays: ['Monday', 'Wednesday'],
        clubTimes: '16:30-18:00',
        schoolTeamDays: ['Tuesday', 'Thursday'],
        schoolTeamTimes: '15:45-17:15'
    }
};

// Current schedule type
let currentSchedule = 'both';

// Update schedule display
function setSchedule(type) {
    currentSchedule = type;
    updateScheduleDisplay();
    
    // Update button styles
    document.querySelectorAll('.button-group button').forEach(button => {
        button.classList.remove('active');
    });
    event.target.classList.add('active');
}

function updateScheduleDisplay() {
    const scheduleDiv = document.getElementById('schedule');
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    
    scheduleDiv.innerHTML = days.map(day => {
        const hasClubTraining = schedule.training.clubDays.includes(day);
        const hasSchoolTraining = schedule.training.schoolTeamDays.includes(day);
        const showTraining = 
            currentSchedule === 'both' ? (hasClubTraining || hasSchoolTraining) :
            currentSchedule === 'club' ? hasClubTraining :
            currentSchedule === 'school' ? hasSchoolTraining : false;

        return `
            <div class="schedule-item">
                <strong>${day}</strong>
                <div>School: ${schedule.school.startTime} - ${schedule.school.endTime}</div>
                ${showTraining ? `
                    <div style="color: green">
                        Training: ${hasClubTraining ? schedule.training.clubTimes : schedule.training.schoolTeamTimes}
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

// Grade tracking
function addGrade(subject) {
    const grade = prompt('Enter new grade (e.g., A, B+, etc.):');
    if (grade) {
        document.getElementById(subject + 'Grade').textContent = grade;
    }
}

// Energy tracking
function logEnergy() {
    const study = prompt('Rate your study focus today (0-10):', '8');
    const sports = prompt('Rate your sports performance today (0-10):', '9');
    const overall = prompt('Rate your overall energy today (0-10):', '8');
    
    if (study && sports && overall) {
        document.getElementById('studyEnergy').textContent = study + '/10';
        document.getElementById('sportsEnergy').textContent = sports + '/10';
        document.getElementById('overallEnergy').textContent = overall + '/10';
    }
}

// Initialize schedule on page load
document.addEventListener('DOMContentLoaded', () => {
    updateScheduleDisplay();
});
