/*
GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with timeblocks for standard business hours
WHEN I view the timeblocks for that day
THEN each timeblock is color coded to indicate whether it is in the past, present, or future
WHEN I click into a timeblock
THEN I can enter an event
WHEN I click the save button for that timeblock
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist
*/


// ----------- Variables -----------------//
var timeblockEl = $('#container');

var headers = ["6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
    "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM",
    "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"
];

var text = ["", "", "", "", "", "",
"", "", "", "", "", "",
"", "", "", "", "", ""
];

renderTimeblock();

//Display and update the current date and time
var updateTime = function() {
    $('#currentDay').text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
}
setInterval(updateTime, 1000);

/*
      <li class="list-group-item d-inline-flex">
        <h4>8 AM</h4>
        <p>Cras justo odio</p>
        <input class="btn btn-info" type="submit" value="Save">
      </li>
*/

function renderTimeblock(){
    //console.log("Rendered Timeblock \r\n Times: ");
    headers.forEach(element => {
        //Make new elements for the page 
        var li = $('<li>');
        var h4 = $('<h4>');
        var event = $(`<input type="text" class="form-control" >`);
        var submit = $('<input type="submit" value="Save">');

        //Style them
        li.attr('class', `list-group-item d-inline-flex ${colorCoded(element)}`);
        event.attr('class', `events ${colorCoded(element)}`);
        submit.attr('class', 'btn btn-info saveBtn');

        //Add text to the headers
        h4.text(element);
        //event.placeholder = element;


        li.append(h4);
        li.append(event);
        li.append(submit);
        timeblockEl.append(li);

    });

    buttons = $('.saveBtn');
}

buttons.click(function(){
    console.log($(this).prev().val());
    text[$(this).parent().index()] = $(this).prev().val();
    console.log(`In text array: ${text[$(this).parent().index()]}`);

});

function colorCoded(timeblockTime){
    //Current time
    var current = moment().format("h");
    var currentAMPM = moment().format("A");
    var inputNum = parseInt(timeblockTime);
    var inputAMPM = timeblockTime.slice(-2);
    // var inputNumPlusOne = inputNum + 1;
    // if(inputNumPlusOne > 12){
    //     inputNumPlusOne = 1;
    //     if(inputAMPM == "AM"){inputAMPM = "PM";}
    //     else if(inputAMPM == "PM"){inputAMPM = "AM";}
    // }

    // console.log(`Current time: ${current} ${currentAMPM}`);
    // console.log(`Timeblock Time: ${timeblockTime}`);
    // console.log(`Input: ${inputNum} ${inputAMPM}`);

    //12PM is the exception to rules

    if((inputNum == current) && (inputAMPM == currentAMPM)){
        //Present
        return 'present';
    }
    else if(((inputNum < current) && (inputAMPM == currentAMPM )) || (inputAMPM == "AM" && currentAMPM == "PM")){
        //Past
        return 'past';
    }
    else if((inputNum > current) && (inputAMPM == currentAMPM)){
        if((inputNum == 12) && (currentAMPM == "PM")){
            return "past";
        }
        //Future
        return 'future';
    }
}


