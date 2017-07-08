import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextMultiComponent } from './text-multi.component';

describe('TextMultiComponent', () => {
  let component: TextMultiComponent;
  let fixture: ComponentFixture<TextMultiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextMultiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
