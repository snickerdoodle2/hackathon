class StorageService {
    private static instance: StorageService;
    private key: string;

    private constructor(key: string) {
        this.key = key;
    }

    public static getInstance(key: string): StorageService {
        if (!StorageService.instance) {
            StorageService.instance = new StorageService(key);
        }
        return StorageService.instance;
    }

    public setItem(value: string): void {
        localStorage.setItem(this.key, value);
    }

    public getItem(): string | null {
        return localStorage.getItem(this.key);
    }

    public removeItem(): void {
        localStorage.removeItem(this.key);
    }
}

export default StorageService;
