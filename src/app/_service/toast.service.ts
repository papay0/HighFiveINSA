import { Injectable } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

@Injectable()
export class ToastService {
    autoHide: number = 0;

    show(message: string): void {
        let config = new MdSnackBarConfig();
        config.duration = 4 * 1000;
        this.snackBar.open(message, 'OK', config);
    }

    constructor(
        private snackBar: MdSnackBar
    ) {}
}
