import { TestBed } from '@angular/core/testing';

import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ModuleService } from './module.service';
import { ModuleType } from 'src/app/course/types/module-type';

describe('ModuleService', () => {
  let moduleService: ModuleService;
  let httpTestingController: HttpTestingController;

  const mockModule: ModuleType = {
    id: 152,
    name: 'Nom du module',
    objective: 'Résumé',
    selected: false,
    medias: [
      {
        title: 'Super media',
        summary: 'Résumé',
        duration: 125,
        url: "url",
        typeMedia: {
          id: 1,
          title: 'Video',
        }
      }
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
    moduleService = TestBed.inject(ModuleService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(moduleService).toBeTruthy();
  });

  it('should have findAll method', () => {
    expect(moduleService.findAll).toBeTruthy();
  });

  it('should have findByCreator method', () => {
    expect(moduleService.findByCreator).toBeTruthy();
  });

  it('should have add method', () => {
    expect(moduleService.add).toBeTruthy();
  });

  it('should have findOne method', () => {
    expect(moduleService.findOne).toBeTruthy();
  });

  it('should have update method', () => {
    expect(moduleService.update).toBeTruthy();
  });

  it('should have delete method', () => {
    expect(moduleService.delete).toBeTruthy();
  });

  it('should retrieve a module by its id', () => {
    // On compare
    moduleService.findOne(1).subscribe((module: ModuleType) => {
      expect(module).toEqual(mockModule);
    });

    // On attend la request HTTP vers l'endpoint avec id 152
    const testRequest = httpTestingController.expectOne(
      `${moduleService.endpoint}/1`
    );

    // Verifier que c'est bien une methode GET
    expect(testRequest.request.method).toEqual('GET');

    // Si on a une réponse à notre request,
    // on retourne la reponse json par le mock média
    testRequest.flush(mockModule);

    // Verifier qu'il n'y a plus de request en attente
    httpTestingController.verify();
  });

  it('should delete a module', () => {
    moduleService.delete(1).subscribe((response: HttpResponse<any>) => {
      expect(response.status).toEqual(200);
    })

    const testRequest = httpTestingController.expectOne(
      `${moduleService.endpoint}/1`
    );

    expect(testRequest.request.method).toEqual('DELETE');

    testRequest.flush(null, { status: 204, statusText: 'No Content' });

    httpTestingController.verify();
  });

  it('should update a module', () => {
    moduleService.update(mockModule).subscribe((response: HttpResponse<any>) => {
      expect(response.status).toEqual(200);
    });

    const testRequest = httpTestingController.expectOne(
      `${moduleService.endpoint}`
    );

    expect(testRequest.request.method).toEqual('PUT');

    testRequest.flush(mockModule);

    httpTestingController.verify();
  })


});


