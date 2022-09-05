import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameMapContainerComponent } from './game-map-container.component';

describe('GameMapContainerComponent', () => {
  let component: GameMapContainerComponent;
  let fixture: ComponentFixture<GameMapContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameMapContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameMapContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
