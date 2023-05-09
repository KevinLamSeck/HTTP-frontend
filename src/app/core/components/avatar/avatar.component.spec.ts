import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { Member } from 'src/app/user/models/member';
import { AvatarComponent } from './avatar.component';


describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvatarComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, MatSnackBarModule, MatMenuModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    component.memberData = new Member({
      id: 1234,
      email: 'johndoe@example.com',
      lastName: 'Doe',
      firstName: 'John',
      phoneNumber: '+1 555-555-5555',
      login: 'johndoe',
      password: 'password123',
      role: 'CONCEPTOR'
    });;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
