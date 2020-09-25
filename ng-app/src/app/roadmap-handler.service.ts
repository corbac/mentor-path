import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoadmapHandlerService {

  constructor() { }

  updateCasePosition(data : any, pos : any, case_id : any){
    // console.info(data);
    
    if (data['children'].length > 0){
      data['children'].forEach(element => {
        if(element['title'] != case_id) {
          element = this.updateCasePosition(element, pos, case_id)
          console.log(element)
          return element
          
        } else {
          element['config']['x'] = pos['x']
          element['config']['y'] = pos['y']
          
          return data
        }
      });
    }
    return data
  }

  addChildrenCase(data : any, case_id : any, child_case_config : any){
    if (data['children'].length > 0){
      data['children'].forEach(element => {
        console.log('loop for element :' + element.title)
        if(element['title'] != case_id) {
          element = this.addChildrenCase(element, case_id, child_case_config)
          return element
        } else {
          element['children'].push(child_case_config);
          return data
        }
      });
    }
    return data
  }

  removeChildrenCase(data : any, case_id : any){
    if (data['children'].length > 0){
      data['children'].forEach((element : any, i : number) => {
        console.log('loop for element :' + element.title)
        if(element['title'] != case_id) {
          element = this.removeChildrenCase(element, case_id)
          console.info(element);
          return element
        } else {

          data['children'].splice(i,1)
          console.info(data);
          return data
        }
      });
    }
    return data
  }
  



}

  