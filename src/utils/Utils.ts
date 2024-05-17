export class Utils {
    static saveToLocalStorate(key: string, data: any) {
        localStorage.setItem(key, JSON.stringify(data))
    }
    static getFromLocalStorate(key: string): any {
        const data = JSON.parse(localStorage.getItem(key) || '')
        return data
    }
}
