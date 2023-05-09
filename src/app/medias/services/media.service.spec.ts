import { TestBed } from '@angular/core/testing';

import { HttpResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MediaType } from 'src/app/course/types/media-type';
import { Member } from 'src/app/user/models/member';
import { MediaService } from './media.service';

describe('MediaService', () => {
  let mediaService: MediaService;
  let httpTestingController: HttpTestingController;

  const mockMember: Member = new Member({
    id: 1,
    lastName: 'Sultama',
    firstName: 'Nia',
    email: 'nia.sultama@example.com',
    phoneNumber: '+1 (555) 123-4567',
    role: 'CONCEPTOR',
    login: 'nia.sultama555',
    password: 'JZJBDx8v4Tni80IicP0p',
  });

  const mockMedia: MediaType = {
    id: 152,
    title: 'Nia Sultana - Some Feelings Never Go Away',
    summary: "Music video for 'Some Feelings Never Go Away' by Nia Sultana",
    duration: 50.0,
    url: 'https://www.youtube.com/watch?v=hNg6TJPpfvs',
    typeMedia: {
      id: 1,
      title: 'Video',
    },
    creator: mockMember,
  };

  const mockMediaAdd: MediaType = {
    id: 2,
    title: 'Amarie Noelle - Unusual',
    summary: "Music video for 'Unusual' by Amarie Noelle",
    duration: 50.0,
    url: 'https://www.youtube.com/watch?v=mZNypwze5fY',
    typeMedia: {
      id: 1,
      title: 'Video',
    },
    creator: mockMember,
  };

  const mockMediasList: MediaType[] = [mockMedia, mockMediaAdd];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    mediaService = TestBed.inject(MediaService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(mediaService).toBeDefined();
  });

  it('should have findAll method', () => {
    expect(mediaService.findAll).toBeTruthy();
  });

  it('should have findByCreator method', () => {
    expect(mediaService.findByCreator).toBeTruthy();
  });

  it('should have findOne method', () => {
    expect(mediaService.findOne).toBeTruthy();
  });

  it('should have add method', () => {
    expect(mediaService.add).toBeTruthy();
  });

  it('should have update method', () => {
    expect(mediaService.update).toBeTruthy();
  });

  it('should have remove method', () => {
    expect(mediaService.remove).toBeTruthy();
  });

  it('should retrieve a media by id', () => {
    // On compare
    mediaService.findOne(1).subscribe((media: MediaType) => {
      expect(media).toEqual(mockMedia);
    });

    // On attend la request HTTP vers l'endpoint avec id 1
    const testRequest = httpTestingController.expectOne(
      `${mediaService.endpoint}/1`
    );

    // Verifier que c'est bien une methode GET
    expect(testRequest.request.method).toEqual('GET');

    // Si on a une réponse à notre request,
    // on retourne la reponse json par le mock média
    testRequest.flush(mockMedia);

    // Verifier qu'il n'y a plus de request en attente
    httpTestingController.verify();
  });

  it('should add a new media', () => {
    mediaService.add(mockMediaAdd).subscribe((media: MediaType) => {
      expect(media).toEqual(mockMediaAdd);
    });

    const testRequest = httpTestingController.expectOne(
      `${mediaService.endpoint}`
    );

    expect(testRequest.request.method).toEqual('POST');

    testRequest.flush(mockMediaAdd);

    httpTestingController.verify();
  });

  it('should delete a media', () => {
    mediaService.remove(1).subscribe((response: HttpResponse<any>) => {
      expect(response.status).toEqual(204);
    })

    const testRequest = httpTestingController.expectOne(
      `${mediaService.endpoint}/1`
    );

    expect(testRequest.request.method).toEqual('DELETE');

    testRequest.flush(null, { status: 204, statusText: 'No Content' });

    httpTestingController.verify();
  })

  it('should update a media', () => {
    mediaService.update(mockMedia).subscribe((response: HttpResponse<any>) => {
      expect(response.status).toEqual(200);
    });

    const testRequest = httpTestingController.expectOne(
      `${mediaService.endpoint}/152`
    );

    expect(testRequest.request.method).toEqual('PUT');

    testRequest.flush(mockMedia);

    httpTestingController.verify();
  })

  it('should find media by creator', () => {
    mediaService.findByCreator(1).subscribe((media: MediaType[]) => {
      expect(media).toEqual(mockMediasList);
    });

    const testRequest = httpTestingController.expectOne(
      `${mediaService.endpoint}/creator/1`
    );

    expect(testRequest.request.method).toEqual('GET');

    testRequest.flush(mockMediasList);

    httpTestingController.verify();
  })

});
