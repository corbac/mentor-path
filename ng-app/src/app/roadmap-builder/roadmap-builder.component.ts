import { Component, OnInit } from '@angular/core';
// import 'snapsvg'; // Seems to not be a good way to do 
// import '@types/snapsvg'

import 'snapsvg-cjs'
import { ActivatedRouteSnapshot } from '@angular/router';
declare var Snap: any;

@Component({
  selector: 'app-roadmap-builder',
  templateUrl: './roadmap-builder.component.html',
  styleUrls: ['./roadmap-builder.component.css']
})
export class RoadmapBuilderComponent implements OnInit {

  height : number;
  width : number;

  paper : any;
  
  box_increment : number = 4


  constructor() {
        this.height = 800;
        this.width = 1000;
        
  }
 
  ngOnInit(): void {
    console.log(this.height,this.width);
    this.paper = Snap(this.height,this.width);
    this.paper.attr({'id': 'thesvg'});
    const c : any = this.paper.circle(50, 50, 100);

    var carre1 : any = this.createbox(this.paper, 'carre1');
    var carre2 : any = this.createbox(this.paper, 'carre2');
    var carre3 : any = this.createbox(this.paper, 'carre3');
    carre1.transform('t50,50');
    carre2.transform('t270,120');
    carre3.transform('t300,320');

    this.createJoinLine("carre1", "carre2")
    this.createJoinLine("carre1", "carre3")
    this.createJoinLine("carre2", "carre3")

    carre2.mouseover((evt) => this.show_button_add_box(evt, carre2))
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

  createbox(paper : any, id : string){
      var box = this.paper.rect(0, 0, 200, 100).attr({stroke: '#123456', 'strokeWidth': 5, 'fill': '#FFFFFF'});
      // var text = this.paper.text(15,15, "Hello Folk")
      var group = this.paper.g(box)//, text)
      group.attr({id : id})
      return group.drag(  this.move,
                          this.start,
                          function(){
                            console.log("Move stopped");
                          }
                        )
  }

  createJoinLine(id_obj1, id_obj2){
    var obj1 = document.getElementById(id_obj1);
    // console.log(obj1)
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
    // console.log(out)
    // console.log(obj1.getBoundingClientRect().width, obj1.getBoundingClientRect().x)
    // var demo_path = this.paper.path("M10 10L90 90").attr({
    //     stroke: "red",
    //     strokeWidth: 10
    // });
    var line_path = this.paper.path(out).attr({
                                    id : id_obj1+'-'+id_obj2,
                                    class : 'join-line',
                                    stroke: "green",
                                    strokeWidth: 2,
                                    strokeLinecap: "round",
                                    fill: "none"
                                });
    this.paper.prepend(line_path)
    // return ''
  }

  updateJoiLine(id){
      this.paper.selectAll(".join-line").forEach(x => {
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

  add_case(evt : any, el : any){
      console.info(this)
      console.log('> add_case, parent_id:' + el.data("parent_id"))
      // var g = document.getElementById(m_case)

      let parent_id = el.data("parent_id")
      
      let parent_box = this.paper.select('#'+parent_id)
      var t_x = parseInt(parent_box.transform().global.replace('t', '').split(',')[0],10)
      var t_y = parseInt(parent_box.transform().global.replace('t', '').split(',')[1],10)+500

      this.createbox(this.paper, 'carre'+this.box_increment).transform('t'+t_x+','+t_y)
      this.createJoinLine(parent_id, 'carre'+this.box_increment)
      this.box_increment++
      // // console.log(g)
      // console.log(this.paper.select('#'+m_case)[0].attr('transform').global)
      // return function(event){
      //     var carre = createbox(this.paper).attr({id :'carre'+box_increment})
      //     carre.transform('t500,320');
      // }
  }
  
  show_button_add_box(evt : any, el : any){
    // console.log(this)
    let x_t = el.matrix.e
    let y_t = el.matrix.f
    let id = el.node.id

    let context : RoadmapBuilderComponent = this 

    // console.log(Snap(evt.node))
    // let box_g =  t.path[1]
    // console.log(this.node.id)
    // console.log(box_g.attributes.transform.f)
    // console.log(evt.timeStamp)
    window.setTimeout(function() {
        // console.log(context)
        let add_button = context.paper.select("#addBoxButton")
        if(add_button){
            add_button.remove()
        }
        add_button = context.paper.rect(x_t+200, y_t, 10, 10)
        add_button.data("parent_id", id)
        // console.info(add_button.data("parent_id"))
        add_button.attr({"id" : "addBoxButton"})
        add_button.click((evt) => context.add_case(evt, add_button));
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
      var g = this.paper.selectAll('g')
      // console.log(g)
      let box
      g.forEach(x => {
          console.log(localpoint)
          // console.log(x[0].attr('width'))
          // console.log(in_box(localpoint, x))
          if (this.in_box(localpoint, x) && !x.select('.foreign')){
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

          if (this.in_box(localpoint, x)){
              // console.log(document.querySelector('#'+x.attr('id')+' .foreign div'))
              var element : any = document.querySelector('#'+x.attr('id')+' .foreign div')
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

  // elementMousedown(evt) {
  //     mousedownonelement = true;
  // }

}