$(document).ready(function() {

    //for changing intro header
	var wordCount = 1;
    setInterval(function() {
        var words = ["developer", "creator", "life-long learner", "thinker", "dreamer"];
        $("#description").text(words[wordCount]);
        wordCount++;
        if (wordCount === words.length) {
            wordCount = 0;
        }
    }, 1000);

    //for scroll to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 56) {
            $("#return-to-top").fadeIn(400);
        } else {
            $("#return-to-top").fadeOut(400);
        }
    });
    $("#return-to-top").click(function() {
        $("body,html").animate({
            scrollTop: 0
        }, 500);
    });



});