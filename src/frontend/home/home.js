const months = new Map([
    [0, 'January'],
    [1, 'February'],
    [2, 'March',],
    [3, 'April'],
    [4, 'May'],
    [5, 'June'],
    [6, 'July'],
    [7, 'August'],
    [8, 'September'],
    [9, 'October'],
    [10, 'November'],
    [11, 'December' ]
]);

const days = new Map([
    [0, 'Sun'],
    [1, 'Mon'],
    [2, 'Tue'],
    [3, 'Wed'],
    [4, 'Th'],
    [5, 'Fri'],
    [6, 'Sat']
]);
// I need to take track of month and year as global variables
const d = new Date();
const firstYear = 2022;
const monthTable = document.querySelector(".weekdays__wrapper");
const datesOfMonth = document.querySelectorAll(".date");
let currMonth = new Date().getMonth();
let currYear = new Date().getFullYear();

/**
 * Increase the global month variable
 */
function increaseMonth()  {
    if(currMonth < 11){
        currMonth = currMonth + 1;
    } else{
        currMonth = 0;
    }

}

/**
 * Decrease the global month variable
 */
function decreaseMonth()  {
   if(currMonth > 0){
    currMonth = currMonth - 1;
   } else {
    currMonth = 11;
   }
}

/**
 * 
 * @param {Number} year The current year we want to render the calendar for 
 * @param {Number} monthNum the current month we want to render
 */
function renderCalendar(year, monthNum) {
    const firstDay = new Date(year, monthNum, 1);
    const lastDay = new Date(year, monthNum + 1, 0);
    const month = months.get(monthNum);
    document.querySelector("#month__name").innerText = month;
    let dateNum = 1;
    let dayNum = firstDay.getDay();
    let rowElement ='';
    for(let i = 0; i < dayNum; i++){
        rowElement += '<td class="empty"></td>';
    }
    while(dateNum <= lastDay.getDate()){
        rowElement += `<td class="date"><a>${dateNum}</a></td>`
        const currDay = new Date(year, monthNum, dateNum++);
        let day = currDay.getDay();
        if(currDay.getDate() == lastDay.getDate()){
            for(let i = currDay.getDay(); i < 7; i++){
                rowElement += '<td class="empty"></td>';
            }
            day = 6;
        }   
        if(day == 6){
            let datesRowHTML = document.createElement("tr");
            datesRowHTML.classList.add("dates__row");
            datesRowHTML.innerHTML = rowElement;
            monthTable.append(datesRowHTML);
            rowElement ='';
        }
        
    }
}

document.addEventListener("DOMContentLoaded", renderCalendar(currYear, currMonth));

document.querySelector("#right-arrow").addEventListener("click", function() {
    increaseMonth();
    const monthRows = monthTable.querySelectorAll(".dates__row");
    monthRows.forEach(function(row) {
        row.remove()
    })
    renderCalendar(currYear, currMonth)
});
document.querySelector("#left-arrow").addEventListener("click", function() {
    decreaseMonth();
    const monthRows = monthTable.querySelectorAll(".dates__row");
    monthRows.forEach(function(row) {
        row.remove()
    })
    renderCalendar(currYear, currMonth)
});

datesOfMonth.forEach(function(date){
    date.addEventListener("click", function() {
        
    })
})