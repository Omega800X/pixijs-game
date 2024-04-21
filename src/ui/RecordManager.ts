export class RecordManager {


    public static storeRecord(key : string, value : string): void {
        localStorage.setItem(key, value);
    }

    public static retrieveRecord(key : string) : string {

        const currentRecord = localStorage.getItem(key);

        return (currentRecord !== null) ? currentRecord : "0";
    }

    public static isRecord(recordKey : string, value : number) : boolean {
        if(parseInt(this.retrieveRecord(recordKey)) < value) {
            return true;
        } else {
            return false;
        }
    }
}