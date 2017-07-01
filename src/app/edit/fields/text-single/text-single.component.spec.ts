import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSingleComponent } from './text-single.component';

describe('TextSingleComponent', () => {
  let component: TextSingleComponent;
  let fixture: ComponentFixture<TextSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
