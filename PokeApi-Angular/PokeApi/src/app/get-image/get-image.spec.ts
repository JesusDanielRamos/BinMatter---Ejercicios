import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetImage } from './get-image';

describe('GetImage', () => {
  let component: GetImage;
  let fixture: ComponentFixture<GetImage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetImage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetImage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
