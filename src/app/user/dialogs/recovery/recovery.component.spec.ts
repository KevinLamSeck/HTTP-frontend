import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { RecoveryComponent } from './recovery.component';

describe('RecoveryComponent', () => {
  let component: RecoveryComponent;
  let fixture: ComponentFixture<RecoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecoveryComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule,
      ],
      providers: [
        { provide: MatDialog, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            message: `Delete student ?`,
            buttonText: {
              ok: 'Delete',
              cancel: 'Cancel',
            },
          },
        },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(RecoveryComponent);
        component = fixture.componentInstance;
      });
  });

  it('should create RecoveryComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have ngOnInit method', () => {
    expect(component.ngOnInit).toBeTruthy();
  });

  it('should have onNoClick method', () => {
    expect(component.onNoClick).toBeTruthy();
  });

  it('should have onSubmit method', () => {
    expect(component.onSubmit).toBeTruthy();
  });

  it('should', async () => {
    spyOn(component, 'onNoClick');

    let button = fixture.debugElement.nativeElement.querySelector('#no-button');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.onNoClick).toHaveBeenCalled();
    });
  });

  it('should', fakeAsync(() => {
    spyOn(component, 'onNoClick');

    let button = fixture.debugElement.nativeElement.querySelector('#no-button');
    button.click();
    tick();
    expect(component.onNoClick).toHaveBeenCalled();
  }));
});
