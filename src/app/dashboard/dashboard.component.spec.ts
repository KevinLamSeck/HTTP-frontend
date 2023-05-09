import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Member } from '../user/models/member';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const mockMember: Member = new Member({
    id: 1,
    lastName: "Sultama",
    firstName: "Nia",
    email: "nia.sultama@example.com",
    phoneNumber: "+1 (555) 123-4567",
    role: "CONCEPTOR",
    login: "nia.sultama555",
    password: "JZJBDx8v4Tni80IicP0p",
  });


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    component.currentUser = mockMember;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
