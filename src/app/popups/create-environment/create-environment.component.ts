import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomErrorStateMatcher } from 'src/app/error/error.state.matcher';
import { EnvironmentModel } from 'src/app/models/environment.model';
import { SubscriberModel } from 'src/app/models/subscriber.model';
import { ApplicationService } from 'src/app/services/application.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
    selector: 'app-create-environment',
    templateUrl: './create-environment.component.html',
    styleUrls: ['./create-environment.component.scss'],
})
export class CreateEnvironmentComponent implements OnInit {
    form!: FormGroup;

    matcher = new CustomErrorStateMatcher();

    isSuccess = false;
    message = '';

    constructor(
        private dialogRef: MatDialogRef<CreateEnvironmentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { model: SubscriberModel; title: string; editAllowed: boolean; buttonTitle: string },
        private fb: FormBuilder,
        private service: ApplicationService,
        private storageService: StorageService
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.form = this.fb.group({
            environmentId: ['', [Validators.required]],
            url: ['', [Validators.required]],
            publicKey: ['', [Validators.required]],
        });
    }

    createEnvironment() {
        this.message = '';
        const userModel = this.storageService.getPersistent('user_details');

        const model: EnvironmentModel = this.form.getRawValue();
        model.subscriberId = this.data.model.subscriberId;
        model.createdBy = userModel.userId;
        model.environmentSeq = 1;

        console.log('Going to create environment with data', model);

        this.service.createEnvironment(model).subscribe((result) => {
            if (result) {
                console.log('Environment creation done with id', result);
                this.isSuccess = true;
                this.message = 'Environment created successfully';
            } else {
                console.log('Environment creation failed');
                this.message = 'Environment creation failed';
            }
        });
    }

    close() {
        this.dialogRef.close();
    }
}
