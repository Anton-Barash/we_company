import { localStorageStore } from "../mobx/store";
import { action } from "mobx";
import { myStore } from '../mobx/store';
/**
 * Переходит в чат, устанавливая ID диалога, название фабрики и название элемента в локальное хранилище,
 * а затем активирует указанную вкладку.
 *
 * @param {string} dialogId - ID диалога, к которому нужно перейти.
 * @param {string} factoryName - Название фабрики, связанной с диалогом.
 * @param {string} itemName - Название элемента, связанного с диалогом.
 * @param {function} setFillActive - Функция для установки активной вкладки.
 */
export const goToChat = (dialogId, factoryName, itemName, setFillActive) => {
    console.log("dialogId", dialogId, "factoryName", factoryName, "itemName", itemName);
    const verticalActive = myStore.verticalActive;
    dialogId = typeof dialogId === 'number' ? dialogId.toString() : dialogId;
    localStorageStore.setIdFacNam2(dialogId, factoryName, itemName);
    setFillActive('tab2');
    action(() => verticalActive.set(dialogId))()
};
