// http://svg.dabbles.info/

class MentorPathBuilder {
    #VIEW_MODES = {
        VIZ   : 0,
        EDIT  : 1
    };

    constructor(mode ,height, width) {
        this.paper = Snap(800,1000);
        this.paper.attr({'id': 'thesvg2'})
        
    }

    unparse(obj, level=0, index=0){

        console.log("level is "+level)
        if(obj) {
            console.log(obj)
            paper.text(50+200*index, 50+50*level, obj.name + " " + obj.content)
            ++level
            for(sub_obj_index in obj.childrens) {
                unparse(obj.childrens[sub_obj_index], level, sub_obj_index)
            }
        }
    }

    move = function(dx,dy) {
        this.attr({
                    transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy]
                });
        this.updateJoiLine(this.attr('id'))
    }
    start = function() {
        this.data('origTransform', this.transform().local );
    }
    
    createbox(paper, id){
        var box = paper.rect(0, 0, 200, 100).attr({stroke: '#123456', 'strokeWidth': 5, 'fill': '#FFFFFF'});
        // var text = paper.text(15,15, "Hello Folk")
        var group = paper.g(box)//, text)
        group.attr({id : id})
        return group.drag(  move,
                            start,
                        function(){
                            console.log("Move stopped");
                        })
    }

    createJoinLine(id_obj1, id_obj2){
        var obj1 = document.getElementById(id_obj1);
        var obj2 = document.getElementById(id_obj2);
    
        var obj1_info = obj1.getBoundingClientRect()
        var obj2_info = obj2.getBoundingClientRect()
    
        // console.log(path_obj[0] +' , '+ path_obj[1] +':'+(obj1_info.x, obj1_info.y, obj2_info.x, obj2_info.y))
        // console.log(Snap.angle(obj1_info.x, obj1_info.y, obj2_info.x, obj2_info.y))
    
        let ang = Snap.angle(obj1_info.x, obj1_info.y, obj2_info.x, obj2_info.y)
        let out = ""
        if (ang >= 140 && ang <= 220){
            out = "M"+(obj1_info.x+obj1_info.width)+" "+(obj1_info.y+obj1_info.height/2)
        }else if (ang <= 40 && ang >= 310){
            out = "M"+(obj1_info.x)+" "+(obj1_info.y+obj1_info.height/2)
        }else {
            out = "M"+(obj1_info.x+obj1_info.width/2)+" "+(obj1_info.y+obj1_info.height)
        }
    
        
        out += "T"+(obj2_info.x)+" "+(obj1_info.y+20)+" "+(obj2_info.x+obj2_info.width/2)+" "+(obj2_info.y)
        console.log(out)
        // console.log(obj1.getBoundingClientRect().width, obj1.getBoundingClientRect().x)
        // var demo_path = paper.path("M10 10L90 90").attr({
        //     stroke: "red",
        //     strokeWidth: 10
        // });
        var line_path = paper.path(out).attr({
                                        id : id_obj1+'-'+id_obj2,
                                        class : 'join-line',
                                        stroke: "green",
                                        strokeWidth: 2,
                                        strokeLinecap: "round",
                                        fill: "none"
                                    });
        paper.prepend(line_path)
        // return ''
    }
    
    updateJoiLine(id){
        paper.selectAll(".join-line").forEach(x => {
            // console.log(x.attr('id'), id)
            let path_obj = x.attr('id').split('-')
            // console.log(path_obj.indexOf(id) >= 0)
            if(path_obj.indexOf(id) >= 0){
                var obj1 = document.getElementById(path_obj[0]);
                var obj2 = document.getElementById(path_obj[1]);
    
                var obj1_info = obj1.getBoundingClientRect()
                var obj2_info = obj2.getBoundingClientRect()
    
                console.log(path_obj[0] +' , '+ path_obj[1] +':'+(obj1_info.x, obj1_info.y, obj2_info.x, obj2_info.y))
                console.log(Snap.angle(obj1_info.x, obj1_info.y, obj2_info.x, obj2_info.y))
    
                let ang = Snap.angle(obj1_info.x, obj1_info.y, obj2_info.x, obj2_info.y)
                let out = ""
                if (ang >= 140 && ang <= 220){
                    out = "M"+(obj1_info.x+obj1_info.width)+" "+(obj1_info.y+obj1_info.height/2)
                    out += "T"+(obj2_info.x)+" "+(obj1_info.y+obj1_info.height/2)+" "+(obj2_info.x+obj2_info.width/2)+" "+(obj2_info.y)
                }else if (ang <= 40 || ang >= 310){
                    out = "M"+(obj1_info.x)+" "+(obj1_info.y+obj1_info.height/2)
                    out += "T"+(obj2_info.x+obj2_info.width)+" "+(obj1_info.y+((obj2_info.y-obj1_info.y)/3))+" "+(obj2_info.x+obj2_info.width/2)+" "+(obj2_info.y)
                }else {
                    out = "M"+(obj1_info.x+obj1_info.width/2)+" "+(obj1_info.y+obj1_info.height)
                    out += "L"+(obj2_info.x+obj2_info.width/2)+" "+(obj2_info.y)
                }
    
                // var out = "M"+(obj1_info.x+obj1_info.width/2)+" "+(obj1_info.y+obj1_info.height)
                // out += "T"+(obj2_info.x)+" "+(obj1_info.y+20)+" "+(obj2_info.x+obj2_info.width/2)+" "+(obj2_info.y)
                // console.log(out)
                x.attr({'d' : out})
            }
        });
    }

    add_case(){
        console.log(Snap(this.node).data("parent_id"))
        // var g = document.getElementById(m_case)
    
        let parent_id = Snap(this.node).data("parent_id")
        
        let parent_box = paper.select('#'+parent_id)
        var t_x = parseInt(parent_box.transform().global.replace('t', '').split(',')[0],10)
        var t_y = parseInt(parent_box.transform().global.replace('t', '').split(',')[1],10)+500
    
        createbox(paper, 'carre'+box_increment).transform('t'+t_x+','+t_y)
        createJoinLine(parent_id, 'carre'+box_increment)
        box_increment++
        // // console.log(g)
        // console.log(paper.select('#'+m_case)[0].attr('transform').global)
        // return function(event){
        //     var carre = createbox(paper).attr({id :'carre'+box_increment})
        //     carre.transform('t500,320');
        // }
    }
    
    show_button_add_box(){
        let x_t = this.matrix.e
        let y_t = this.matrix.f
        let id = this.node.id
    
        console.log(Snap(this.node))
        // let box_g =  t.path[1]
        // console.log(this.node.id)
        // console.log(box_g.attributes.transform.f)
        // console.log(evt.timeStamp)
        window.setTimeout(function() {
            let add_button = paper.select("#addBoxButton")
            if(add_button){
                add_button.remove()
            }
            add_button = paper.rect(x_t+200, y_t, 10, 10)
            add_button.data("parent_id", id)
            add_button.attr({"id" : "addBoxButton"})
            add_button.click(add_case);
            // console.log("2000!")
        }, 2000);
    }

    getlocalmousecoord(svg, evt) {
        var pt = svg.createSVGPoint();
        pt.x = evt.clientX;
        pt.y = evt.clientY;
        var localpoint = pt.matrixTransform(svg.getScreenCTM().inverse());
        localpoint.x = Math.round(localpoint.x);
        localpoint.y = Math.round(localpoint.y);
        return localpoint;
    }
    
    in_box(point, box_group){
        var width = parseInt(box_group[0].attr('width'), 10)
        var height = parseInt(box_group[0].attr('height'), 10)
        var t_x = parseInt(box_group.transform().global.replace('t', '').split(',')[0],10)
        var t_y = parseInt(box_group.transform().global.replace('t', '').split(',')[1],10)
        // console.log(point.x, point.y, width, height, t_x, t_y)
        return (point.x >= t_x &&
                point.y >= t_y &&
                point.x <= t_x+width &&
                point.y <= t_y+height)
    }
    
    createtext(localpoint, svg) {
        var g = paper.selectAll('g')
        // console.log(g)
        let box
        g.forEach(x => {
            console.log(localpoint)
            // console.log(x[0].attr('width'))
            // console.log(in_box(localpoint, x))
            if (in_box(localpoint, x) && !x.select('.foreign')){
                console.log('detecté quand meme'+ x)
                var myforeign = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject')
                var textdiv = document.createElement("div");
                var textnode = document.createTextNode("Add Card Description");
                textdiv.appendChild(textnode);
                
                textdiv.setAttribute("contentEditable", "true");
                textdiv.setAttribute("width", "100%");
                textdiv.setAttribute("height", "100px");
                myforeign.setAttribute("width", "200");
                myforeign.setAttribute("height", "100");
                myforeign.classList.add("foreign"); //to make div fit text
                textdiv.classList.add("insideforeign"); //to make div fit text
                // textdiv.addEventListener("mousedown", elementMousedown, false);
    
                // myforeign.setAttributeNS(null, "transform", "translate(" + localpoint.x + " " + localpoint.y + ")");
                // svg.appendChild(myforeign);
                // textdiv.setAttribute("display", "block");
                textdiv.setAttribute("align", "center");
                // textdiv.setAttribute("padding", "5");
                myforeign.appendChild(textdiv);
                x.append(myforeign)
            }
    
            if (in_box(localpoint, x)){
                // console.log(document.querySelector('#'+x.attr('id')+' .foreign div'))
                var element = document.querySelector('#'+x.attr('id')+' .foreign div')
                // var element = x.select('.foreign div');
                // console.log(element)
                element.focus()
                // element.addEventListener('change', (event) => {
                //     console.log('yeaaah!')
                //     this.contentEditable = "false"
                // });
    
                // var event = new Event('change');
                // element.dispatchEvent(event);
            }
        });
    }
    
    elementMousedown(evt) {
        mousedownonelement = true;
    }
    
}

// let t = new MentorPathBuilder(1,200,200)

json_sample = '{"name" : "first", "content" : "hello", "cshildrens" : [{"name" : "two-one", "content" : "world", "childrens":[]}, {"name" : "two-two", "content" : "univers", "childrens":[]} ]}'
var myjs = JSON.parse(json_sample);

var paper = Snap(800,1000);
paper.attr({'id': 'thesvg'})


// // DEMO :

// var carre1 = createbox(paper, 'carre1')

// var carre2 = createbox(paper).attr({id :'carre2'})
// var carre3 = createbox(paper).attr({id :'carre3'})

// carre1.transform('t50,50');
// carre2.transform('t270,120');
// carre3.transform('t300,320');

// // carre2.attr({'height' : 100})

// let box_increment = 4

// createJoinLine("carre1", "carre2")
// createJoinLine("carre1", "carre3")
// createJoinLine("carre2", "carre3")

// carre2.mouseover(show_button_add_box)


// // paper.rect(50, 50, 100, 100).click(add_case("carre3"));


//  //

// $(('#thesvg')).click(function (evt) {
//     var svg = document.getElementById('thesvg');
//     var localpoint = getlocalmousecoord(svg, evt);
//     // if (!mousedownonelement) {
//         console.log('invoked')
//         createtext(localpoint, svg);
//     // } else {
//     //     mousedownonelement = false;
//     // }
// });