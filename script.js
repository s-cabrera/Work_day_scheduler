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

//localStorage.clear();
// ----------- Variables -----------------//
var timeblockEl = $('#container');

var headers = ["6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
    "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM",
    "6 PM", "7 PM", "8 PM", "9 PM", "10 PM"
];

var text;

refresh();
renderTimeblock();

function refresh(){
    console.log(localStorage);
    text = Array(headers.length);
    var loadedtext = JSON.parse(localStorage.getItem('text'));
    if (loadedtext != null){
        text = loadedtext;
    }
    console.log(`log: ${text}`);
}

//Display and update the current date and time
var updateTime = function() {
    $('#currentDay').text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
}
setInterval(updateTime, 1000);

function renderTimeblock(){
    headers.forEach((element, index) => {
        //Make new elements for the page 
        var li = $('<li>');
        var h4 = $('<h4>');
        var event = $(`<input type="text" class="form-control" >`);
        var submit = $('<input type="submit" value="Save">');

        //Style them
        li.attr('class', `list-group-item d-inline-flex`);
        event.attr('class', `events ${colorCoded(element)}`);
        submit.attr('class', 'btn btn-info saveBtn');

        if(event.hasClass('past')){
            //event.addClass('disabled');
            event.attr("disabled", 'disabled');
            //submit.addClass('disabled');
            submit.attr("disabled", 'disabled');
        }
        //Add text to the headers
        h4.text(element);
        event.attr('value', text[index]);


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

    //localStorage.clear();
    localStorage.setItem('text', JSON.stringify(text));
    console.log(localStorage);
});

function colorCoded(timeblockTime){
    //Current time
    var current = moment().format("h");
    var currentAMPM = moment().format("A");
    var inputNum = parseInt(timeblockTime);
    var inputAMPM = timeblockTime.slice(-2);

    if((inputNum == current) && (inputAMPM == currentAMPM)){
        //Present
        return 'present';
    }
    else if(((inputNum < current) && (inputAMPM == currentAMPM )) || (inputAMPM == "AM" && currentAMPM == "PM") || (current == 12 && inputAMPM == "PM")){
        //Past

        if((current == 12) && (inputAMPM == "PM")){
            //Check for 12PM the time that breaks the normal rules
            return "future";
        }
        return 'past';
    }
    else if((inputNum > current) && (inputAMPM == currentAMPM)){
        if((inputNum == 12) && (currentAMPM == "PM")){
                //12PM is the exception to rules
            return "past";
        }
        //Future
        return 'future';
    }
}


