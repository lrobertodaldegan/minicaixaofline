import AsyncStorage from '@react-native-async-storage/async-storage';

export const Service = {
    get: async (key) => {
        try{
            const val = await AsyncStorage.getItem(key);
    
            return val !== null ? JSON.parse(val) : null;
        } catch(e) {
            console.log(`Houve um erro ao tentar buscar um item: ${key} :: ${val}: ${e}`);
        }
    },
    save: async (key, val) => {
        try{
            await AsyncStorage.setItem(key, JSON.stringify(val));
        } catch(e) {
            console.log(`Houve um erro ao tentar salvar um item: ${key} :: ${val}: ${e}`);
        }
    },
    delete: async (key) => {
        try{
            await AsyncStorage.removeItem(key);
        } catch(e) {
            console.log(`Houve um erro ao tentar excluir um item: ${key} :: ${e}`);
        }
    }
}