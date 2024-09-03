import { observable, makeAutoObservable } from "mobx";



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
    companies = [
        { company_name: null, company_id: null }
    ];

    activeCompanyId = null;

    constructor() {
        makeAutoObservable(this);
    }

    // Метод для установки нового массива компаний
    setCompanies(newCompanies) {
        this.companies = newCompanies;
    }

    // задать активную компанию
    setActiveCompanyId(company_id) {
        this.activeCompanyId = company_id;
    }
    //  вернуть актувную компанию
    get activeCompany() {
        return this.companies.find(company => company.company_id === this.activeCompanyId);
    }
}


export const companyStore = new CompanyStore();
export const messageStore = new MessageStore();
export const myStore = new MyStore();