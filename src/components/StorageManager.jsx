// StorageManager.js
const StorageManager = {
  saveData: (data) => {
    localStorage.setItem("scheduleData", JSON.stringify(data));
  },
  loadData: () => {
    const data = localStorage.getItem("scheduleData");
    return data ? JSON.parse(data) : null;
  },
};

export default StorageManager;
