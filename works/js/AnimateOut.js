function begin_fly() {
    var $items = $(".item");
    var $texts = $(".item").find("div");
    $items.css({
        "top": 0,
        "left": 0
    });

    $texts.css({
        "opacity": 0,
        "font-size": 0
    });

    $items.each(function (index, value, array) {
        var $box = $(this);
        var $text = $box.find("div");
        var delayTime = Math.random() * 1000 * (index / 2);

        var left_distance = parseInt(Math.random() * -1000 + 500);
        left_distance = left_distance < 0 ? Math.min(left_distance, -250) : Math.max(left_distance, 250)

        var top_distance = parseInt(Math.random() * -1000 + 500);
        top_distance = top_distance < 0 ? Math.min(top_distance, -250) : Math.max(top_distance, 250)

        $text.delay(delayTime).animate(
            {
                opacity: '1',
                fontSize: '500%'
            }, 5000, begin_fly)

        $box.delay(delayTime).animate(
            {
                left: left_distance + 'px',
                top: top_distance + 'px',
            }, 5000, begin_fly);


    })
}
window.onload = function () {
    begin_fly();
}
