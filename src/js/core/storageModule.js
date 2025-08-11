export default class StorageManager {
  getData(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {
      console.group("Error occured at StorageManager:getData()");
      console.log("key = ", key);
      console.log("message : ", error);
      console.groupEnd();
    }
  }

  setData(key, dataObject) {
    try {
      localStorage.setItem(key, JSON.stringify(dataObject));
    } catch (error) {
      console.group("Error occured at StorageManager:setData()");
      console.log("key = ", key);
      console.log("dataObject = ", key);
      console.log("message : ", error);
      console.groupEnd();
    }
  }

  clearAllStorage() {
    try {
      localStorage.clear();
    } catch (error) {
      console.group("Error occured at StorageManager:clearAllStorage()");
      console.log("message : ", error);
      console.groupEnd();
    }
  }
}
