import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagenPipe'
})
export class ImagenPipePipe implements PipeTransform {

  transform(img: string): string {
    if(img===''){
      let defaultRuta:string='assets/userIco.png';
      return defaultRuta;
    }
    let ruta:string=`assets/${img}`;
    return ruta;
    
  }

}
