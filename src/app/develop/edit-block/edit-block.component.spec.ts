import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBlockComponent } from './edit-block.component';

describe('EditBlockComponent', () => {
  let component: EditBlockComponent;
  let fixture: ComponentFixture<EditBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
