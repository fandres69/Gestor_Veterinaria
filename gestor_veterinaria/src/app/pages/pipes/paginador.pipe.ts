import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'paginatorPipe'
})
export class PaginadorPipe implements PipeTransform {

  transform(array:any [], page_size:number|string,page_number:number): any [] {
   
    const topes=['all','ALL','todo','TODO','max','MAX'];
    let all=false;
    if(!array.length){return [];}
    topes.forEach(element => {
      if(page_size===element){
       all=true
      }
      
    });
    const p_Size=(all)?array.length:parseInt(page_size.toString())||10;
    let p_Number=page_number||1;
    p_Number--;
    return array.slice(p_Number*p_Size,(p_Number+1)*p_Size);
  }

}
