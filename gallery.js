$(function () {
    function kr_gallery(elem, images, options) { // In that options you can sent mulitiple values
        var images = images || []
        var options = options || {};
        var current_position = options["current_position"] || 0
        var last_image = images[images.length - 1]
        var prefix = elem.match(/#(.*)/)[1]
        var classname = prefix + '_kingston'
        var timer = null
        var interval = options["interval"] || 1000

            function createHtml() {
                value = current_image();
                createli();
                creatButton();
            }


            function createli() {
                if (value != undefined) {
                    $(elem).html("<ul><li class=" + classname + ">" + value + "</li></ul>").children(':first').hide().focus().fadeIn(1000);;
                }
            }

            function creatButton() {
                $(elem).after("<button id=" + prefix + "_first>First</button><button id=" + prefix + "_last>Last</button><button id=" + prefix + "_pre>Previous</button><button id=" + prefix + "_next>Next</button><button id=" + prefix + "_play>Play</button><button id=" + prefix + "_stop>Stop</button>");
            }

            function init() {
                createHtml();
            }
        init();

        function next_image() {
            return images[current_position + 1]
        }

        function current_image() {
            return images[current_position]
        }

        function last_i() {
            return last_image
        }

        function previous_image() {
            return images[current_position - 1]
        }
        $("#" + prefix + "_next").click(function () {
            stop();
            nextOper();
        });


        $("#" + prefix + "_stop").click(function () {
            stop();
        });

        function stop() {
            clearInterval(timer);
            timer = null
        }

        function firstOper() {
            value = first_image();
            current_position = 0
            createli();
        }

        function nextOper() {
            value = next_image();
            (value == undefined) ? firstOper() : current_position++;
            createli();
        }

        function lastOper() {

            value = last_i();
            current_position = images.length - 1
            createli();
        }
        $("#" + prefix + "_last").click(function () {
            stop();
            lastOper();
        });
        $("#" + prefix + "_first").click(function () {
            stop();
            firstOper();
        });

        $("#" + prefix + "_play").click(function () {
            if (timer !== null) return;
            timer = setInterval(function () {
                nextOper();
            }, interval);
        });

        $("#" + prefix + "_pre").click(function () {
            stop();
            value = previous_image();
           (value == undefined)? lastOper() : current_position--;createli();
        });

        function first_image() {
            return images[0]
        }

        function append_images(newarr) {
            images = images.concat(newarr)
            last_image = images[images.length - 1]
            value = current_image();
            createli();
        }


        return {
            current: current_image,
            previous: previous_image,
            last_i: last_i,
            next: next_image,
            first: first_image,
            append_images: append_images
        };
    }
    var gallery;
    gallery = kr_gallery("#gallery");
    console.log(gallery);
    console.log(gallery.next());
    console.log(gallery.first());
    console.log(gallery.last_i());
    gallery.append_images(['three', 'four']);

    var gallery;
    gallery = kr_gallery("#gallery2", ['One', 'Two', 'Three']);
    console.log(gallery);
    console.log(gallery.next());
    console.log(gallery.first());
    console.log(gallery.last_i());
});
