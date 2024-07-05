import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            Equipment: {
                equipmentName: '',
                equipmentNum: '',
                type: '',
                softwareOs: '',
                softwareVersion: '',
                supplier: '',
                status: '',
                usage: '',
                laboratoryId: '',
                thumbnailUrl: '',
                createtime: '',
                updatetime: ''
            },
        }
    },
    getters: {
        // 可以在这里添加你的getters
    },
    mutations: {
        setEquipment(state, data) {
            state.Equipment.equipmentName = data.equipmentName;
            state.Equipment.equipmentNum = data.equipmentNum;
            state.Equipment.type = data.type;
            state.Equipment.softwareOs = data.softwareOs;
            state.Equipment.softwareVersion = data.softwareVersion;
            state.Equipment.supplier = data.supplier;
            state.Equipment.status = data.status;
            state.Equipment.usage = data.usage;
            state.Equipment.laboratoryId = data.laboratoryId;
            state.Equipment.thumbnailUrl = data.thumbnailUrl;
            state.Equipment.createtime = data.createtime;
            state.Equipment.updatetime = data.updatetime;
        }
    },
    modules: {
        // 可以在这里添加你的模块
    }
});
export default store;