import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollSectionComponent } from './scroll-section.component';

describe('ScrollSectionComponent', () => {
  let component: ScrollSectionComponent;
  let fixture: ComponentFixture<ScrollSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
