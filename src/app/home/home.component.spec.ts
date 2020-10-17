import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';

import { HomeComponent } from './home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, RouterTestingModule.withRoutes([]), HttpClientModule, MatTableModule, MatInputModule],
      declarations: [HomeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display no data', () => {
    component.dataSource.data = [];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.no-data').textContent).toContain('No Data');
  });

  it('should have count 2 in table', () => {
    component.dataSource.data = [{
      id: 1, title: 'Something', userId: 1
    }];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const rows = compiled.querySelectorAll('tr');
    expect(rows.length).toBe(2);
  });

  it('should have matching data i.e. id, title in table first row [ not header ]', () => {
    component.dataSource.data = [{
      id: 1, title: 'Something', userId: 1
    }];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const rows = compiled.querySelectorAll('tr');
    expect(rows[1].cells[0].textContent).toContain(1);
    expect(rows[1].cells[1].textContent).toContain('Something');
  });

  it("should display no row when filter value does not match", () => {
    component.dataSource.data = [{
      id: 1, title: 'Something', userId: 1
    }];
    const value = 'No match';
    component.applyFilter(value);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const rows = compiled.querySelectorAll('tr');
    expect(rows[1].classList).toContain('no-data-row');
  });
  
});
