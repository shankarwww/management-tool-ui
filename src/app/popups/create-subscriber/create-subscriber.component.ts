import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomErrorStateMatcher } from 'src/app/error/error.state.matcher';
import { EnvironmentTypeModel } from 'src/app/models/environment-type.model';
import { SubscriberModel } from 'src/app/models/subscriber.model';
import { ApplicationService } from 'src/app/services/application.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
    selector: 'app-create-subscriber',
    templateUrl: './create-subscriber.component.html',
    styleUrls: ['./create-subscriber.component.scss'],
})
export class CreateSubscriptionComponent implements OnInit {
    subscriberForm!: FormGroup;
    environmentTypes: EnvironmentTypeModel[] = [];

    matcher = new CustomErrorStateMatcher();

    isSuccess = false;
    message = '';

    constructor(
        private dialogRef: MatDialogRef<CreateSubscriptionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { model: SubscriberModel; title: string; editAllowed: boolean; buttonTitle: string },
        private fb: FormBuilder,
        private service: ApplicationService,
        private storageService: StorageService
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.getEnvironments();
    }

    initForm() {
        this.subscriberForm = this.fb.group({
            subscriberId: [this.data.model.subscriberId, [Validators.required]],
            type: [this.data.model.type, [Validators.required]],
            description: [this.data.model.description, [Validators.required]],
        });
    }

    private getEnvironments() {
        this.service.getEnvironmentType().subscribe((data) => {
            this.environmentTypes = data;
        });
    }

    get adminsArray() {
        return this.subscriberForm.get('admins') as FormArray;
    }

    createSubscription() {
        this.message = '';
        const userModel = this.storageService.getPersistent('user_details');

        const model: SubscriberModel = this.subscriberForm.getRawValue();
        model.userId = userModel.userId;
        console.log('Going to create subscriber with data', model);

        this.service.createSubscription(model).subscribe((result) => {
            if (result) {
                console.log('subscriber creation done with id', result);
                this.isSuccess = true;
                this.message = 'subscription created successfully';
            } else {
                console.log('subscriber creation failed');
                this.message = 'subscription creation failed';
            }
        });
    }

    close() {
        this.dialogRef.close(true);
    }
}
