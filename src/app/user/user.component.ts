import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from '../services/core.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user = null;
  constructor(private core: CoreService,
    private routerState: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    const id = this.routerState.snapshot.paramMap.get('id');
    if (!id) return;
    this.core.user(id).subscribe(data => {
      this.user = data;
    });
  }

  back() {
    this.router.navigate(['/']);
  }

}
