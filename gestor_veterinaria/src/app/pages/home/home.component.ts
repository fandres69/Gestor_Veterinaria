import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DataMasterService } from '../control-panel/services/data-master.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'
  ]
})
export class HomeComponent implements OnInit {

  private userId:string='';
  constructor(private router:Router, private fb:FormBuilder, private auth:AuthService, private dataM:DataMasterService) { }
  public img!:string;

  ngOnInit(): void {
    this.loadImgPerfil();
    this.router.navigate(['/home']);
    this.userId!=this.auth.userRes.id;
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

  loadImgPerfil(){
    const documento=localStorage.getItem('x-vetspa')||'0';
    this.dataM.getUserImage(documento).subscribe(resp=>{
      this.img=resp;
    });
  }



}
