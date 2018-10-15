import { AsyncStorage } from "react-native";

/**
 * 系统本地存储
 */
const Storage = {
    /**
     * 从本地存储获取
     * @param key
     * @param async, default true
     * @returns {Promise.<*>}
     */
    async get(key, async = true) {
        if (async) {
            return AsyncStorage.getItem(key);
        } else {
            return await AsyncStorage.getItem(key);
        }
    },
    /**
     * 从本地存储获取JSON
     * @param key
     * @param async, default true
     * @returns {Promise.<*>}
     */
    async getJson(key, async = true) {
        if (async) {
            return AsyncStorage.getItem(key).then(
                result => (result ? JSON.parse(result) : null)
            );
        } else {
            const value = await AsyncStorage.getItem(key);
            return JSON.parse(value);
        }
    },
    /**
     * 设置到本地存储
     * @param key
     * @param value 只能是String
     * @returns {Promise.<*>}
     */
    set(key, value) {
        return AsyncStorage.setItem(key, value);
    },
    /**
     * 设置JSON到本地存储
     * @param key
     * @param value
     * @returns {Promise.<*>}
     */
    setJson(key, value) {
        return AsyncStorage.setItem(key, JSON.stringify(value));
    },
    /**
     * 从本地存储删除
     * @param key
     */
    remove(key) {
        return AsyncStorage.removeItem(key);
    },

    async batchGet(keys, async = true) {
        if (async) {
            return AsyncStorage.multiGet(keys).then(result => {
                return result.reduce((acc, item) => {
                    const key = item[0];
                    acc[key] = item[1];
                    return acc;
                }, {});
            });
        } else {
            return await AsyncStorage.multiGet(keys);
        }
    }
};

export default Storage;
