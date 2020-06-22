import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  constructor() { }

  // Función para subir un archivo.events
  //   Parámetros:
  //      * file --> Archivo
  //      * tipo --> usuarios, medicos, hospitales
  //      * id --> id del registro a modificar.
  uploadFile(file: File, tipo: string, id: string) {

    return new Promise((resolve, reject) => {

      let formData = new FormData();  // payload que queremos mandar a subir
      let xhr = new XMLHttpRequest(); // petición Ajax

      formData.append('imagen', file, file.name);

      xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {
          // El proceso de subida ha finalizado
          if (xhr.status === 200) {
            // El proceso ha finalizado correctamente
            console.log('imagen subida');
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Falló la subida de archivo');
            reject(JSON.parse(xhr.response));
          }
        }
      };

      const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;
      xhr.open('PUT', url, true);
      xhr.send(formData);
    });

  }

}
