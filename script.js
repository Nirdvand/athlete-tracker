// Load saved data from localStorage
let userData = JSON.parse(localStorage.getItem('athletePlanner')) || {
    schedule: {
        days: {
            Monday: {
                school: { startTime: '08:45', endTime: '15:15' },
                hasClubTraining: true,
                clubTime: { startTime: '16:00', endTime: '17:30' },
                hasSchoolTraining: false,
                schoolTime: { startTime: '', endTime: '' }
            },
            Tuesday: {
                school: { startTime: '08:45', endTime: '15:15' },
                hasClubTraining: false,
                clubTime: { startTime: '', endTime: '' },
                hasSchoolTraining: true,
                schoolTime: { startTime: '15:30', endTime: '17:00' }
            },
            Wednesday: {
                school: { startTime: '08:45', endTime: '15:15' },
                hasClubTraining: true,
                clubTime: { startTime: '16:00', endTime: '17:30' },
                hasSchoolTraining: false,
                schoolTime: { startTime: '', endTime: '' }
            },
            Thursday: {
                school: { startTime: '08:45', endTime: '15:15' },
                hasClubTraining: false,
                clubTime: { startTime: '', endTime: '' },
                hasSchoolTraining: true,
                schoolTime: { startTime: '15:30', endTime: '17:00' }
            },
            Friday: {
                school: { startTime: '08:45', endTime: '15:15' },
                hasClubTraining: false,
                clubTime: { startTime: '', endTime: '' },
                hasSchoolTraining: false,
                schoolTime: { startTime: '', endTime: '' }
            },
            Saturday: {
                hasGame: false,
                gameTime: { startTime: '', endTime: '' }
            },
            Sunday: {
                hasGame: false,
                gameTime: { startTime: '', endTime: '' }
            }
        }
    },
    currentSchedule: 'both',
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
    userData.currentSchedule = type;
    updateScheduleDisplay();
    saveData();
    
    document.querySelectorAll('.button-group button').forEach(button => {
        button.classList.remove('active');
    });
    event.target.classList.add('active');
}

function showCustomizeSchedule() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    let daysHTML = Object.entries(userData.schedule.days).map(([day, schedule]) => {
        const isWeekend = day === 'Saturday' || day === 'Sunday';
        
        return `
            <div class="day-schedule">
                <h4>${day}</h4>
                ${!isWeekend ? `
                    <div class="form-group">
                        <label>School Times:</label>
                        <div class="time-inputs">
                            <input type="time" id="${day}-school-start" value="${schedule.school.startTime}">
                            <span>to</span>
                            <input type="time" id="${day}-school-end" value="${schedule.school.endTime}">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="checkbox-group">
                            <label>
                                <input type="checkbox" id="${day}-club-check" 
                                    ${schedule.hasClubTraining ? 'checked' : ''}>
                                Club Training
                            </label>
                        </div>
                        <div class="time-inputs" id="${day}-club-times" 
                            ${!schedule.hasClubTraining ? 'style="display:none;"' : ''}>
                            <input type="time" id="${day}-club-start" 
                                value="${schedule.clubTime.startTime}">
                            <span>to</span>
                            <input type="time" id="${day}-club-end" 
                                value="${schedule.clubTime.endTime}">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="checkbox-group">
                            <label>
                                <input type="checkbox" id="${day}-school-team-check" 
                                    ${schedule.hasSchoolTraining ? 'checked' : ''}>
                                School Team Training
