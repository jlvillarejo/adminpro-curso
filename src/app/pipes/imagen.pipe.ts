import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/img';

    if (!img) {
      url = url + '/usuarios/xxx';
      return url;
    }

    if (img.indexOf('https') >= 0) {
      // console.log('Google');
      return img;
    }

    switch (tipo) {
      case 'usuario':
        url = url + '/usuarios/' + img;
        break;
      case 'medico':
        url = url + '/medicos/' + img;
        break;
      case 'hospital':
        url = url + '/hospitales/' + img;
        break;
      default:
        console.log('El tipo de imagen no existe: usuario, medico u hospital')
        url += url + '/usuarios/xxx';
        break;
    }

    console.log('usr:', url);
    return url;
  }

}
