(function () {
    var initDataSource = JSON.parse(JSON.stringify(Module));

    init();

    function init() {
        var boxs = createBoxs();
        updateWorkPanel(boxs);
        bindEvent();
    }

    function createBoxs() {
        return initDataSource.map(function (value, index, array) {
            var $box = '<div class="box cursor_point" identity="' + value.Id + '"  name="' + value.Name + '" draggable = "true">' + value.Name + '</div>';
            return $box;
        })
    }

    function bindEvent() {
        var draged = null;
        var EventHandler = {
            Sort: function () {
                var boxs = $(".box");
                var length = boxs.length;
                for (var i = 0; i < length - 1; i++) {
                    for (var j = i; j < length; j++) {
                        if ($(boxs[j]).attr("name") > $(boxs[j + 1]).attr("name")) {
                            $(boxs[j]).before($(boxs[j + 1]));
                        }
                    }
                }
            },
            NoRepeat: function () {
                var hashFlag = {};
                var isRemoved = true;
                $(".box").each(function (index, value, array) {
                    var ann = setInterval(function () {
                        if (isRemoved) {
                            isRemoved = false;
                            var name = $(value).attr("name");
                            if (!hashFlag[name]) {
                                hashFlag[name] = true;
                                isRemoved = true;
                                clearInterval(ann);
                            } else {
                                $(value).addClass('removed-box')
                                    .one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function (e) {
                                        $(this).remove();
                                        isRemoved = true;
                                        clearInterval(ann);
                                    });
                            }
                        }
                    }, 200)

                })
            },
            Refresh: function () {
                updateWorkPanel(result);
            }
        }

        $(".tool").on({
            click: function () {
                var self = $(this), operator = self.attr("name");
                EventHandler[operator]();
            }
        })

        $(".box").on({
            dragstart: function (e) {
                draged = e.target;
                draged.style.background = "red";
            },
            drag: function (e) {
                e.preventDefault();
            },
            dragend: function (e) {
                e.preventDefault();
                var $target = $(e.target);
            },
            dragenter: function (e) {
                e.preventDefault();
                if (e.target.className = "box") {
                    e.target.style.background = "#34585F";
                }
            },
            dragover: function (e) {
                e.preventDefault();
            },
            dragleave: function (e) {
                e.preventDefault();
                if (e.target.className = "box") {
                    e.target.style.background = "rgba(68, 6, 83, 1)";
                }
            },
            drop: function (e) {
                e.preventDefault();
                var $target = $(e.target);
                if (e.target.className = "box") {
                    e.target.style.background = "rgba(68, 6, 83, 1)";
                    draged.style.background = "rgba(68, 6, 83, 1)";
                    $(draged).remove();
                    $target.before($(draged));
                }
            }
        })
    }

    function updateWorkPanel(boxs) {
        $(".workpanel_conent").empty().append(boxs.join(" "));
    }
})()