import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSiteComponent } from './create-site.component';

describe('CreateSiteComponent', () => {
  let component: CreateSiteComponent;
  let fixture: ComponentFixture<CreateSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
