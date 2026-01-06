// made by Gemini 3.0 Pro

$(document).ready(function() {
    const missionList = [
        { text: "Upgrade X⁰" },
        { text: "unlock X" },
        { text: "Make fv 1e6" },
        { text: "Differentiate on the f'(x) tab" }
    ];

    let currentIdx = game_data.tutorial.mission_idx;
    function refreshMission() {
        if (currentIdx < missionList.length) {
            const mission = missionList[currentIdx];

            $('#mission-name').fadeOut(200, function() {
                $(this).text(mission.text).fadeIn(200);
            });

            const progressPercent = ((currentIdx) / missionList.length) * 100;
            $('#mission-bar').css('width', progressPercent + '%');
            $('#progress-text').text(`MISSION ${currentIdx + 1} / ${missionList.length}`);
        } else {

            $('#mission-name').text("first tutorial completed!");
            $('#mission-widget').delay(3000).fadeOut(300);
            $('#mission-bar').css({'width': '100%', 'background-color': '#a3be8c'});
            $('#progress-text').text("COMPLETED");
        }
    }

    window.nextMission = function() {
        if (currentIdx < missionList.length) {
            currentIdx++;
            refreshMission();
        }
    };
    if(game_data.tutorial.mission_idx===3) {
        $('#mission-widget').delay(1000).fadeIn(500); // 1초 뒤 스르륵 등장
        refreshMission();
    }
    $('#mission-close').on('click', function() {
        $('#mission-widget').fadeOut(300);
    });
});