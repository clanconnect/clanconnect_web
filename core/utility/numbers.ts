import { toWords  } from 'number-to-words';

export class Numbers {
    convertToWords(value:number){
        try{
        return (toWords(value));
        }catch(err){
            alert(`covertToWords Error :: ${JSON.stringify(err)}`)
        }
    }

}