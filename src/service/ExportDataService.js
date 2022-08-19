var RNFS = require('react-native-fs');

import XLSX from 'xlsx';

export const ExportDataService = {
    exportDataToExcel: async (nomeEvento, data, fileName) => {
        let result = {
            status: false,
            content: null
        };

        if(data) {
            let wb = XLSX.utils.book_new();
            
            let ws = XLSX.utils.json_to_sheet(data)    
            
            XLSX.utils.book_append_sheet(wb,ws,"Users")
            
            const b64 = XLSX.write(wb, {type:'base64', bookType:"xlsx"});

            if(b64){
                result.status = true;
                result.content = b64;
            }


            // try{
            //     await RNFS.writeFile(fileName, wbout, 'ascii');

            //     console.log(`Arquivo criado em ${fileName}!`);
            //     console.log(`Ok! Informações do evento ${nomeEvento} exportadas com sucesso!`);

            //     result.status = true;
            // } catch(e) {
            //     console.log(`Houve um erro ao tentar exportar informações do evento ${nomeEvento}!`, e);
            // }
        }

        return result;
    }
}
