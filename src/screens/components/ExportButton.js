import React from 'react';
import {
    Text,
    View,
    Dimensions, 
    TouchableHighlight, 
    PermissionsAndroid,
    StyleSheet
} from 'react-native';
import Share from 'react-native-share';

import { ExportDataService } from '../../service/ExportDataService';

var RNFS = require('react-native-fs');

export default function ExportButton({nomeEvento, informacao}) {
    const checkPermissions = async () => {
        let hasWritePermission = await PermissionsAndroid
                                            .check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        let hasReadPermission = await PermissionsAndroid
                                            .check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        return hasWritePermission && hasReadPermission;
    }

    const requestPermissions = async () => {
        console.log('Pedindo permissão');
        const writeGranted = await PermissionsAndroid.request(
                                            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, 
                                            {
                                                title: "Precissamos de permissão para criar um arquivo",
                                                buttonNeutral: "Vou pensar",
                                                buttonNegative: "Cancelar",
                                                buttonPositive: "OK"
                                            });
        const readGranted = await PermissionsAndroid.request(
                                            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, 
                                            {
                                                title: "Precissamos de permissão para ler um arquivo",
                                                buttonNeutral: "Vou pensar",
                                                buttonNegative: "Cancelar",
                                                buttonPositive: "OK"
                                            });
        return writeGranted === PermissionsAndroid.RESULTS.GRANTED
                    && readGranted === PermissionsAndroid.RESULTS.GRANTED;
    }

    const handleClick = async () => {
        try{
            const hasPermissions = await checkPermissions();

            if(!hasPermissions) {
                const permissionsGranteds = await requestPermissions();

                if (permissionsGranteds)
                    await exportAndShare();
                else
                    console.log("As permissões em arquivos foram negadas");

            } else {
                await exportAndShare();
            }
        }catch(e){
            console.log('Houve um erro inesperado ao exportar arquivo!');
            console.log(e);
        }
    }

    const exportAndShare = async () => {
        const fileName = `${RNFS.ExternalStorageDirectoryPath}/${nomeEvento}_vendas.xlsx`;
        
        const exportResult = await ExportDataService.exportDataToExcel(nomeEvento, informacao, fileName);

        try{
            if(exportResult && exportResult.status === true){
                const type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

                await Share.open({
                    title: `Vendas ${nomeEvento}`,
                    url: `data:${type};base64,${exportResult.content}`,
                    saveToFiles: true,
                    useInternalStorage: true,
                });

            }
        } catch (e) {
            console.log('Houve um erro no compartilhamento do arquivo de vendas do evento!');
            console.log(e);
        }
    }

    return (
        <View style={style.btnWrap}>
            <TouchableHighlight
                underlayColor='#fafafa'
                onPress={() => handleClick()}
                style={style.btn}
            >
                <Text style={style.btnText}>
                    Compartilhar
                </Text>
            </TouchableHighlight>
        </View>
    );
}

const style = StyleSheet.create({
    btnWrap: {
        width: Dimensions.get('screen').width,
        alignItems: 'center',
    },
    btn: {
        width: Dimensions.get('screen').width / 1.5,
        height: 50,
        marginVertical: 10,
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    btnText: {
        textAlign: 'center',
        color: '#f02b2b',
        fontWeight: 'bold',
        fontSize: 16
    }
});