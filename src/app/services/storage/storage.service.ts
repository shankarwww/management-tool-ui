import { Injectable } from '@angular/core';

type StorageType = 'local' | 'session';

@Injectable({ providedIn: 'root' })
export class StorageService {
    private _set(storage: StorageType, key: string, value: any) {
        this._storage(storage).setItem(
            key,
            JSON.stringify({
                data: value,
                time: new Date(),
            })
        );
    }

    private _get(storage: StorageType, key: string): any {
        const result = JSON.parse(this._storage(storage).getItem(key)!);
        return result ? result.data : null;
    }
    private _del(storage: StorageType, key: string) {
        this._storage(storage).removeItem(key);
    }
    private _storage(which: StorageType): Storage {
        return which === 'local' ? localStorage : sessionStorage;
    }

    public set(key: string, value: any) {
        this._set('session', key, value);
    }

    public get(key: string): any {
        return this._get('session', key);
    }

    public del(key: string) {
        this._del('session', key);
    }

    public setPersistent(key: string, value: any) {
        this._set('local', key, value);
    }

    public getPersistent(key: string): any {
        return this._get('local', key);
    }

    public delPersistent(key: string) {
        this._del('local', key);
    }
}
