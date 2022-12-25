import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CardService } from 'src/app/services/card.service';

import { WorkDeckComponent } from './work-deck.component';
import { HttpClient } from '@angular/common/http';

describe('WorkDeckComponent', () => {
  let component: WorkDeckComponent;
  let fixture: ComponentFixture<WorkDeckComponent>;

  beforeEach(async () => {
    let component: WorkDeckComponent;
    let fixture: ComponentFixture<WorkDeckComponent>;
    let service: CardService;
    let httpMock: HttpTestingController;
    let httpClient: HttpClient;
    await TestBed.configureTestingModule({
      declarations: [WorkDeckComponent],
      imports: [HttpClientTestingModule],
      providers: [CardService]
    });
    service = TestBed.inject(CardService);
    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);

  });

  it('should create', () => {
    expect(CardService).toBeTruthy();
  });
});
