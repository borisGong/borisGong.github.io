function BindEvent() {
    $(window).on("scroll", function (e) {
        var self = this;
        var position = GetPageScroll(); 
        $(".intro-header").css("opacity",10/position.Y);
        var dd = position.Y/10; 
        $("body").css("background-color","rgba(211,211,211,"+position.Y+")")
    })

    function GetPageScroll() {
        var x, y; if (window.pageYOffset) {    // all except IE    
            y = window.pageYOffset;
            x = window.pageXOffset;
        } else if (document.documentElement && document.documentElement.scrollTop) {    // IE 6 Strict    
            y = document.documentElement.scrollTop;
            x = document.documentElement.scrollLeft;
        } else if (document.body) {    // all other IE    
            y = document.body.scrollTop;
            x = document.body.scrollLeft;
        }
        return { X: x, Y: y };
    }
}
window.onload = function () {
    BindEvent();
}