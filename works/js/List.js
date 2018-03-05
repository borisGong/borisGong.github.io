window.onload = function(){
    var module = [
        {
            Name: 'Swim with rui',
            IsFinish: true
        },
        {
            Name: 'Play basketball at ligong universite',
            IsFinish: false
        },
        {
            Name: "Go to the library",
            IsFinish: false
        },
        {
            Name: "Write a Blog",
            IsFinish: false
        },
        {
            Name: "Delicious food with friends",
            IsFinish: false
        }
        ,
        {
            Name: "Delicious food with friends",
            IsFinish: false
        }
        ,
        {
            Name: "Delicious food with friends",
            IsFinish: false
        }
        ,
        {
            Name: "Delicious food with friends",
            IsFinish: false
        }

    ]

    var rowList = module.map(function (value, index, array) {
        if (value.IsFinish) {
            return "";
        }

        var text = '<div class="text">' + value.Name + '</div>';
        var finish_btn = '<div class="button finish_btn"></div>';

        return '<div class="row">' + text + finish_btn + '</div>';
    })

    $(".row_container").append($(rowList.join(" ")));



    $(".finish_btn").on("click", function () {
        var self = $(this) ,item = self.closest(".row");
        item.addClass("finish_btn_click").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
            item.remove();
        });
    })
}