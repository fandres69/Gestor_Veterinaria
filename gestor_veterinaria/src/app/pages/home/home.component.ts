import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'
  ]
})
export class HomeComponent implements OnInit {

  miForm:FormGroup=this.fb.group({
    butOne:[''],
    butTwo:['']
  })

  constructor(private router:Router, private fb:FormBuilder) { }


  ngOnInit(): void {
    this.router.navigate(['/home']);
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
