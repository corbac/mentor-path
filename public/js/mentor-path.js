json_sample = '{"name" : "first", "content" : "hello", "childrens" : [{"name" : "two-one", "content" : "world", "childrens":[]}, {"name" : "two-two", "content" : "univers", "childrens":[]} ]}'
var myjs = JSON.parse(json_sample);
// console.log(myjs.name)
// console.log(myjs.childrens)
// console.log(myjs.childrens[myjs.childrens.length-1])

var paper = Snap(800,1000);
// var t1 = paper.line(50, 50, 100, 100);
// t1.attr({
//     fill: "#bada55",
//     stroke: "#000",
//     strokeWidth: 5
// });
// var t2 = paper.line(10, 10, 10, 10);
// var bigCircle = paper.circle(150, 150, 100);
// var t1 = paper.text(50, 50, ["snap", "hello miami", "yoyo", "beach"]);

function createbox(paper){
    var box = paper.rect(0, 0, 200, 100).attr({stroke: '#123456', 'strokeWidth': 5, 'fill': '#FFFFFF'});
    var text = paper.text(15,15, "Hello Folk")
    return paper.g(box, text)
}

createbox(paper).transform('t50,50');

function unparse(obj, level=0, index=0){

    console.log("level is "+level)
    if(obj) {
        console.log(obj)
        paper.text(50+200*index, 50+50*level, obj.name + " " + obj.content)
        ++level
        for(sub_obj_index in obj.childrens) {
            unparse(obj.childrens[sub_obj_index], level, sub_obj_index)
        }
    }
};

// unparse(myjs);


// var rect_test_2 = paper.rect(10, 100, 100, 50);
// paper.path("M60 60L60 100").attr({
//                             stroke: "red",
//                             strokeWidth: 10
//                         })

var x;
var y;
var pressed = false;


// rect_test.drag();

// function mouse_pessed(event) {
//     pressed = true;
// };
// function mouse_unpessed(event) {
//     pressed = false;
// };

// function mouse_moving(event) {
//     if(pressed) {
//         x = event.pageX
//         y = event.pageX
//         console.log(x)
//         console.log(y)
//     }
// };

// $(document).mouseup(mouse_unpessed);
// $(document).mousedown(mouse_pessed);
// $(document).mousemove(mouse_moving);

