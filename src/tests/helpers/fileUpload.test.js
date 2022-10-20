import "setimmediate";
import {Cloudinary} from "@cloudinary/url-gen";
import cloudinary from 'cloudinary';
import { fileUpload } from "../../helpers/fileUpload";
//jest.useFakeTimers('legacy')
//jest.useRealTimers();
jest.setTimeout(100000)


const cld = new Cloudinary({
    cloud:{
        cloudName: 'api-node-cloud'
    }
    
})

describe('Pruebas en fileUpload', ()=>{


    /*test('Debe de cargar un archivo y retornar una URL', async(done) => { 
        
        const resp = await fetch('https://m.media-amazon.com/images/I/31SBcAEA2yL._AC_.jpg')
        const blob = await resp.blob();

        const file = new File([blob], 'foto.jpg');
        const url = await fileUpload(file);

        expect(typeof url).toBe('string');
        //borrar imagenes por id

        const segments = url.split('/');
        const imageName = segments[segments.length-1];
        const [id,] = imageName.split('.');
    
    })*/

    
    test('Debe de retornar un error', async() => { 
        
        const file = new File([], 'foto.jpg');
        const url = await fileUpload(file);

        expect(url).toBe(null)
    })
})