import { observable } from "mobx";


// ситория чатов фабрика-имя
let arr = [];

try {
    const localStorageData = localStorage.getItem("idFacNam");
    if (localStorageData) {
        arr = JSON.parse(localStorageData);
    }
} catch (error) {
    console.error("Ошибка при парсинге строки JSON: ", error);
    arr = [];
}


class MyStore {

    idFacNam = observable.array(
        arr.length > 0 ? arr : [{ "000": { name: "изделие", factory: "выберите" } }]
    );

}





export const myStore = new MyStore();