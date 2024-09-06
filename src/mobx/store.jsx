import { observable, makeAutoObservable } from "mobx";
import { json } from "react-router-dom";



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

    setIdFacNam(newIdFacNam) {
        this.idFacNam.replace(newIdFacNam);
    }

    // выбираем чат
    verticalActive = observable.box(Object.keys(this.idFacNam[0])[0])


}



class MessageStore {
    messages = {};

    constructor() {
        makeAutoObservable(this);
    }

    // Добавление сообщения в диалог
    addMessage(dialogId, message) {
        if (!this.messages[dialogId]) {
            this.messages[dialogId] = []; // Инициализация массива, если он не существует
        }

        // Проверка, является ли message массивом
        if (Array.isArray(message)) {
            this.messages[dialogId].push(...message); // Добавление всех сообщений из массива
        } else {
            this.messages[dialogId].push(message); // Добавление одного сообщения
        }
    }


    // Получение сообщений для определенного диалога
    getMessages(dialogId) {
        return this.messages[dialogId] || []; // Возвращает пустой массив, если диалог не найден
    }

    // Удаление сообщения (например, по id)
    removeMessage(dialogId, messageId) {
        if (this.messages[dialogId]) {
            this.messages[dialogId] = this.messages[dialogId].filter(
                (msg) => msg.id !== messageId
            );
        }
    }
}



class CompanyStore {

    companies = JSON.parse(localStorage.getItem('companies'));

    activeCompanyId = localStorage.getItem('activeCompanyId');

    uID = JSON.parse(localStorage.getItem('uID'))

    constructor() {
        makeAutoObservable(this);
    }

    // Метод для установки нового массива компаний
    setCompanies(newCompanies) {
        this.companies = newCompanies;
        localStorage.setItem('companies', JSON.stringify(newCompanies))
    }

    // задать активную компанию
    setActiveCompanyId(company_id) {
        this.activeCompanyId = company_id;
        localStorage.setItem('activeCompanyId', company_id)
    }
    //  вернуть актувную компанию
    getActiveCompany() {
        return this.companies.find(company => company.company_id == this.activeCompanyId);
    }

    setUid(newId) {
        this.uID = newId
        localStorage.setItem('uId', JSON.stringify(newId))
    }

    getUid() {
        return this.uID
    }


}

class LocalStorageStore {

    // localStorageData = JSON.parse(localStorage.getItem("idFacNam2"));
    // idFacNam2 = { "company": [{ "000": { name: "изделие", factory: "выберите" } }] }
    idFacNam2 = JSON.parse(localStorage.getItem("idFacNam2")) || {};

    constructor() {
        makeAutoObservable(this);
    }

    setIdFacNam2(dialogId, factoryName, itemName) {

        const companyId = companyStore.activeCompanyId
        // Проверяем наличие ключа companyId
        if (this.idFacNam2[companyId]) {
            const companyArray = this.idFacNam2[companyId];

            // Ищем индекс существующего объекта с таким же dialogId
            const existingIndex = companyArray.findIndex(item => {
                Object.keys(item) == dialogId
            });

            if (existingIndex !== -1) {
                // Если объект найден, перемещаем его на первую позицию
                const existingObject = companyArray.splice(existingIndex, 1)[0];
                companyArray.unshift(existingObject);
            } else {
                // Если объект не найден, создаем новый объект и добавляем его на первую позицию
                const newObject = { [dialogId]: { name: itemName, factory: factoryName } };
                companyArray.unshift(newObject);
            }
        } else {
            // Если ключ companyId отсутствует, создаем его с новым объектом
            const newObject = { [dialogId]: { name: itemName, factory: factoryName } };
            this.idFacNam2[companyId] = [newObject];
        }

        localStorage.setItem('idFacNam2', JSON.stringify(this.idFacNam2))

    }
}

export const companyStore = new CompanyStore();
export const messageStore = new MessageStore();
export const myStore = new MyStore();
export const localStorageStore = new LocalStorageStore();