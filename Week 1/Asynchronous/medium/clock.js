function formatTime(date) {
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let hour24 = date.getHours();
    let hour12 = hour24%12 || 12;
    let ampm = hour24>=12 ? "PM" : "AM";

    let time12,time24;

    time12 = `${String(hour12).padStart(2,'0')}:${String(mm).padStart(2,'0')}:${String(ss).padStart(2,'0')} ${ampm}`;
    time24 = `${String(hour24).padStart(2,'0')}:${String(mm).padStart(2,'0')}:${String(ss).padStart(2,'0')}`;


    return {time12,time24};
    


}

function updateTime() {
    const time = new Date();
  
    const { time12, time24} = formatTime(time);
    
    console.clear(); // Clear the console before each update
    console.log(`12-hour format: ${time12}`);
    console.log(`24-hour format: ${time24}`);
}

// Update the time every second
setInterval(updateTime, 1000);

// Initial call to display the time immediately
updateTime();
