import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextHtmlComponent } from './text-html.component';

describe('TextHtmlComponent', () => {
  let component: TextHtmlComponent;
  let fixture: ComponentFixture<TextHtmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextHtmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
