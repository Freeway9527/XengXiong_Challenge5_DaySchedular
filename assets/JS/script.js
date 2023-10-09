$(document).ready(function() {
  // Display current day at the top of the calendar
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

  // Update time block colors based on the current hour
  function updateTimeBlockColors() {
    var currentHour = dayjs().hour();
  
    $(".time-block").each(function() {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);
  
      // Remove all classes initially to ensure no conflicting classes
      $(this).removeClass("past present future");
  
      if (blockHour < currentHour) {
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }

  updateTimeBlockColors();

  // Event listener for save button click
  $(".saveBtn").on("click", function() {
    var eventText = $(this).siblings("textarea").val();
    var eventHour = $(this).parent().attr("id").split("-")[1];
    localStorage.setItem("Event Hour-" + eventHour, eventText);
  });

  // Load saved events from local storage
  $(".time-block").each(function() {
    var eventHour = $(this).attr("id").split("-")[1];
    var savedEvent = localStorage.getItem("Event Hour-" + eventHour);

    if (savedEvent) {
      $(this).children("textarea").val(savedEvent);
    }
  });
});
