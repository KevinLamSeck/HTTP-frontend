import { HttpClient, HttpResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { SharedModule } from "src/app/shared/shared.module";

import { CourseService } from "./course.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { Member } from "src/app/user/models/member";
import { CourseType } from "../types/course-type";
import { RouterTestingModule } from "@angular/router/testing";
import { CourseListType } from "../types/course-list-type";

describe("CourseService", () => {
  let service: CourseService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, HttpClientTestingModule, RouterTestingModule],
      providers: [HttpClient],
    });
    service = TestBed.inject(CourseService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

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

  const mockCourse: CourseType = {
    id: 11,
    title: "Apprendre le Java avec Spring Boot",
    objective:
      "Reussir a passer un diplome certifiant une conaissance approdondis de l'environement Java Spring boot",

    modules: [
      {
        id: 1,
        name: "Spring introduction",
        objective: "Apprendre les bases de spring",
        selected: false,
        medias: [],
      },
    ],
    creator: mockMember,
  };

  const mockCourseAdd: CourseType = {
    title: "Apprendre le Java avec Spring Boot",
    objective:
      "Reussir a passer un diplome certifiant une conaissance approdondis de l'environement Java Spring boot",

    modules: [
      {
        id: 1,
        name: "Spring introduction",
        objective: "Apprendre les bases de spring",
        selected: false,
        medias: [],
      },
    ],
    creator: mockMember,
  };

  const mockMediasList: CourseType[] = [mockCourse, mockCourseAdd];

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should have findFullCourses method", () => {
    expect(service.findFullCourses).toBeTruthy();
  });

  it("should have add method", () => {
    expect(service.add).toBeTruthy();
  });

  it("should have update method", () => {
    expect(service.update).toBeTruthy();
  });

  it("should have copyCourse method", () => {
    expect(service.copyCourse).toBeTruthy();
  });

  it("should have remove method", () => {
    expect(service.remove).toBeTruthy();
  });

  it("should add a new course", () => {
    service.add(mockCourseAdd).subscribe((course: CourseType) => {
      expect(course).toEqual(mockCourseAdd);
    });

    const testRequest = httpTestingController.expectOne(`${service.endPoint}`);
    expect(testRequest.request.method).toEqual("POST");

    testRequest.flush(mockCourseAdd);

    httpTestingController.verify();
  });

  it("should update a course", () => {
    service.update(mockCourse).subscribe((response: any) => {
      //console.log(response);
      expect(response.title).toEqual(mockCourse.title);
    });

    const testRequest = httpTestingController.expectOne(
      `${service.endPoint}/update`
    );

    expect(testRequest.request.method).toEqual("POST");

    testRequest.flush(mockCourse);

    httpTestingController.verify();
  });

  it("should copy a course", () => {
    let mockCopyCourse = { isSelected: false, ...mockCourse };
    service.copyCourse(mockCopyCourse).subscribe((course: CourseType) => {
      expect(course.title).toEqual(mockCopyCourse.title);
    });

    const testRequest = httpTestingController.expectOne(`${service.endPoint}`);
    expect(testRequest.request.method).toEqual("POST");

    testRequest.flush(mockCourseAdd);

    httpTestingController.verify();
  });

  it("should delete a course", () => {
    service.remove(1).subscribe((response: HttpResponse<any>) => {
      expect(response.status).toEqual(204);
    });

    const testRequest = httpTestingController.expectOne(
      `${service.endPoint}/1`
    );

    expect(testRequest.request.method).toEqual("DELETE");

    testRequest.flush(null, { status: 204, statusText: "No Content" });

    httpTestingController.verify();
  });
});
