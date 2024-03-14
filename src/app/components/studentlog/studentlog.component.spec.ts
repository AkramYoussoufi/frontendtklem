import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentlogComponent } from './studentlog.component';

describe('StudentlogComponent', () => {
  let component: StudentlogComponent;
  let fixture: ComponentFixture<StudentlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentlogComponent]
    });
    fixture = TestBed.createComponent(StudentlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
