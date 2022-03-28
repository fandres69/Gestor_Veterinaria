import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'
  ]
})
export class HomeComponent implements OnInit {

  private userId:string='';
  constructor(private router:Router, private fb:FormBuilder, private auth:AuthService) { }


  ngOnInit(): void {
    this.router.navigate(['/home']);
    this.userId!=this.auth.userRes.id;
    console.log(this.userId);
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
