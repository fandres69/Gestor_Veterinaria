import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'
  ]
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.clear();
    Swal.fire({
      title: 'Sesión cerrada!',
      text: 'Feliz dia.',
      imageUrl: '../../../assets/logout.jpeg',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'logout image',
    })
    .then(res=>{
      this.router.navigate(['/auth']);
    });
  }

}
