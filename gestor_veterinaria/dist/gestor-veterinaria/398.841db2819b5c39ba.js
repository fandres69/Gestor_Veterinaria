"use strict";(self.webpackChunkGestor_veterinaria=self.webpackChunkGestor_veterinaria||[]).push([[398],{1398:(it,F,c)=>{c.r(F),c.d(F,{DataMasterManagerModule:()=>ot});var u=c(9808),y=c(1083),t=c(5e3);let x=(()=>{class n{constructor(){}ngOnInit(){}}return n.\u0275fac=function(o){return new(o||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-panel-data-master"]],decls:101,vars:0,consts:[[1,"container"],[1,"text-center"],[1,"row"],[1,"col-2"],["id","nav-tab","role","tablist",1,"nav","nav-tabs"],["id","nav-cuidad-tab","data-bs-toggle","tab","data-bs-target","#nav-cuidad","type","button","role","tab","aria-controls","nav-cuidad","aria-selected","true",1,"nav-link","active"],[1,"material-icons","bi","md-48"],["id","nav-tipoDoc-tab","data-bs-toggle","tab","data-bs-target","#nav-tipoDoc","type","button","role","tab","aria-controls","nav-tipoDoc","aria-selected","false",1,"nav-link"],["id","nav-tabContent",1,"tab-content"],["id","nav-cuidad","role","tabpanel","aria-labelledby","nav-cuidad-tab",1,"tab-pane","fade","show","active"],[1,"row","m-1"],["routerLink","./cCiudad",1,"btn","btn-outline-dark"],[1,"col-1"],[1,"material-icons","bi"],[1,"col","text-center"],[1,"float-md-start"],["routerLink","./fCiudad",1,"btn","btn-outline-dark"],["routerLink","./uCiudad",1,"btn","btn-outline-dark"],["routerLink","./dCiudad",1,"btn","btn-outline-dark"],["id","nav-tipoDoc","role","tabpanel","aria-labelledby","nav-tipoDoc-tab",1,"tab-pane","fade"],[1,""],["routerLink","./cTipoDoc",1,"btn","btn-outline-dark"],["routerLink","./fTipoDoc",1,"btn","btn-outline-dark"],["routerLink","./uTipoDoc",1,"btn","btn-outline-dark"],["routerLink","./dTipoDoc",1,"btn","btn-outline-dark"],[1,"col"]],template:function(o,e){1&o&&(t.TgZ(0,"div",0)(1,"h1",1),t._uU(2,"Administraci\xf3n Otros"),t.qZA(),t._UZ(3,"hr"),t.TgZ(4,"div",2)(5,"div",3)(6,"nav")(7,"div",4)(8,"button",5)(9,"span",6),t._uU(10,"location_on"),t.qZA()(),t.TgZ(11,"button",7)(12,"span",6),t._uU(13,"format_list_bulleted"),t.qZA()()()(),t.TgZ(14,"div",8)(15,"div",9)(16,"div")(17,"div",10)(18,"button",11)(19,"div",2)(20,"div",12)(21,"span",13),t._uU(22,"add"),t.qZA()(),t.TgZ(23,"div",14)(24,"span",15),t._uU(25,"Agregar"),t._UZ(26,"br"),t._uU(27,"ciudad"),t.qZA()()()()(),t.TgZ(28,"div",10)(29,"button",16)(30,"div",2)(31,"div",12)(32,"span",13),t._uU(33,"search"),t.qZA()(),t.TgZ(34,"div",14)(35,"span",15),t._uU(36,"Buscar"),t._UZ(37,"br"),t._uU(38,"ciudad"),t.qZA()()()()(),t.TgZ(39,"div",10)(40,"button",17)(41,"div",2)(42,"div",12)(43,"span",13),t._uU(44,"update"),t.qZA()(),t.TgZ(45,"div",14)(46,"span",15),t._uU(47,"Actualizar"),t._UZ(48,"br"),t._uU(49,"ciudad"),t.qZA()()()()(),t.TgZ(50,"div",10)(51,"button",18)(52,"div",2)(53,"div",12)(54,"span",13),t._uU(55,"remove"),t.qZA()(),t.TgZ(56,"div",14)(57,"span",15),t._uU(58,"Eliminar"),t._UZ(59,"br"),t._uU(60,"ciudad"),t.qZA()()()()()()(),t.TgZ(61,"div",19)(62,"div",20)(63,"div",10)(64,"button",21)(65,"div",2)(66,"div",12)(67,"span",13),t._uU(68,"add"),t.qZA()(),t.TgZ(69,"div",14)(70,"span",15),t._uU(71,"Agregar tipo identificaci\xf3n"),t.qZA()()()()(),t.TgZ(72,"div",10)(73,"button",22)(74,"div",2)(75,"div",12)(76,"span",13),t._uU(77,"search"),t.qZA()(),t.TgZ(78,"div",14)(79,"span",15),t._uU(80,"Buscar tipo identificaci\xf3n"),t.qZA()()()()(),t.TgZ(81,"div",10)(82,"button",23)(83,"div",2)(84,"div",12)(85,"span",13),t._uU(86,"update"),t.qZA()(),t.TgZ(87,"div",14)(88,"span",15),t._uU(89,"Actualizar tipo identificaci\xf3n"),t.qZA()()()()(),t.TgZ(90,"div",10)(91,"button",24)(92,"div",2)(93,"div",12)(94,"span",13),t._uU(95,"remove"),t.qZA()(),t.TgZ(96,"div",14)(97,"span",15),t._uU(98,"Eliminar tipo identificaci\xf3n"),t.qZA()()()()()()()()(),t.TgZ(99,"div",25),t._UZ(100,"router-outlet"),t.qZA()()())},directives:[y.rH,y.lC],encapsulation:2}),n})();var s=c(4775),a=c(3075),q=c(5226),p=c.n(q),I=c(520),h=(()=>{return(n=h||(h={})).createCiudad="/dataMaster/newCity",n.findCiudad="/dataMaster/city",n.UpdCiudad="/dataMaster/updateCity",n.delCiudad="/dataMaster/deleteCity",n.searchCiudad="/dataMaster/cities",n.getAllCiudades="/dataMaster/allCities",n.createTypeDocument="/dataMaster/newTypeDoc",n.updTypeDocument="/dataMaster/updateTypeDoc",n.delTypeDocument="/dataMaster/deleteTypeDoc",n.searchTypeDocument="/dataMaster/searchTypeDoc",h;var n})(),J=c(9019),m=c(4004),_=c(262),C=c(9646);let v=(()=>{class n{constructor(o){this.http=o,this.baseUrl=J.N.ApiUrl,this.header=(new I.WM).set("content-type","application/json;charset=utf-8").set("Accept","*/*").set("Access-Control-Allow-Origin","*").set("x-token",localStorage.getItem("x-token")||"")}CreateCiudad(o){return this.http.post(`${this.baseUrl}${h.createCiudad}`,o,{headers:this.header}).pipe((0,m.U)(i=>i),(0,_.K)(i=>(0,C.of)(i)))}searchCiudades(o){return this.http.get(`${this.baseUrl}${h.searchCiudad}/${o}`,{headers:this.header}).pipe((0,m.U)(i=>i),(0,_.K)(i=>(0,C.of)(i)))}delCiudad(o){return this.http.post(`${this.baseUrl}${h.delCiudad}`,o,{headers:this.header}).pipe((0,m.U)(i=>i),(0,_.K)(i=>(0,C.of)(i)))}updCiudad(o){return this.http.post(`${this.baseUrl}${h.UpdCiudad}`,o,{headers:this.header}).pipe((0,m.U)(i=>i),(0,_.K)(i=>(0,C.of)(i)))}createTipoDocumento(o){return this.http.post(`${this.baseUrl}${h.createTypeDocument}`,o,{headers:this.header}).pipe((0,m.U)(i=>i),(0,_.K)(i=>(0,C.of)(i)))}searchTipoDocumento(o){return this.http.get(`${this.baseUrl}${h.searchTypeDocument}/${o}`,{headers:this.header}).pipe((0,m.U)(i=>i),(0,_.K)(i=>(0,C.of)(i)))}updTypeDocument(o){return this.http.post(`${this.baseUrl}${h.updTypeDocument}`,o,{headers:this.header}).pipe((0,m.U)(i=>i),(0,_.K)(i=>(0,C.of)(i)))}delTypeDocument(o){return this.http.post(`${this.baseUrl}${h.delTypeDocument}`,o,{headers:this.header}).pipe((0,m.U)(i=>i),(0,_.K)(i=>(0,C.of)(i)))}}return n.\u0275fac=function(o){return new(o||n)(t.LFG(I.eN))},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})(),k=(()=>{class n{constructor(o,e){this.fb=o,this.masterD=e,this.miForm=this.fb.group({codigo:["",a.kI.required,a.kI.minLength(1),a.kI.maxLength(100)],Ciudad:["",a.kI.required,a.kI.minLength(1),a.kI.maxLength(200)],codigoDto:["",a.kI.required,a.kI.minLength(1),a.kI.maxLength(100)],Departamento:["",a.kI.required,a.kI.minLength(1),a.kI.maxLength(150)]})}ngOnInit(){}crearCiudad(){var o,e,i,d;const l={codigo:null===(o=this.miForm.get("codigo"))||void 0===o?void 0:o.value,Ciudad:null===(e=this.miForm.get("Ciudad"))||void 0===e?void 0:e.value,codigoDto:null===(i=this.miForm.get("codigoDto"))||void 0===i?void 0:i.value,Departamento:null===(d=this.miForm.get("Departamento"))||void 0===d?void 0:d.value};this.masterD.CreateCiudad(l).subscribe(D=>{if(D.error){const A=D.error.errors[0].msg||"",et="Campo: "+D.error.errors[0].param||0;p().fire({icon:"error",title:"Oops... "+et,text:A})}else D.OK&&p().fire({icon:"success",title:"Operaci\xf3n correcta",text:D.statusDescription}).then(A=>{this.miForm.reset()})})}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(a.qu),t.Y36(v))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-ciudades"]],decls:26,vars:1,consts:[[1,"container"],[1,"container","form-control","form-floating"],["action","",3,"formGroup"],[1,"form-floating","m-3"],["type","text","id","floatingInput","placeholder","C\xf3digo de ciudad","formControlName","codigo",1,"form-control"],["for","floatingInput"],["type","text","id","floatingInput","placeholder","Ciudad","formControlName","Ciudad",1,"form-control"],["type","text","id","floatingInput","placeholder","C\xf3digo de departamento","formControlName","codigoDto",1,"form-control"],["type","text","id","floatingInput","placeholder","name@example.com","formControlName","Departamento",1,"form-control"],[1,"form-floating","m-5","p-1"],[1,"float-md-end"],[1,"btn","btn-outline-primary",3,"click"]],template:function(o,e){1&o&&(t.TgZ(0,"div",0)(1,"h1"),t._uU(2,"Creaci\xf3n de ciudades"),t.qZA(),t._UZ(3,"hr"),t.TgZ(4,"div",1)(5,"form",2)(6,"div",3),t._UZ(7,"input",4),t.TgZ(8,"label",5),t._uU(9,"C\xf3digo de ciudad"),t.qZA()(),t.TgZ(10,"div",3),t._UZ(11,"input",6),t.TgZ(12,"label",5),t._uU(13,"Ciudad"),t.qZA()(),t.TgZ(14,"div",3),t._UZ(15,"input",7),t.TgZ(16,"label",5),t._uU(17,"C\xf3digo de departamento"),t.qZA()(),t.TgZ(18,"div",3),t._UZ(19,"input",8),t.TgZ(20,"label",5),t._uU(21,"Departamento"),t.qZA()(),t.TgZ(22,"div",9)(23,"div",10)(24,"button",11),t.NdJ("click",function(){return e.crearCiudad()}),t._uU(25,"Guardar"),t.qZA()()()()()()),2&o&&(t.xp6(5),t.Q6J("formGroup",e.miForm))},directives:[a._Y,a.JL,a.sg,a.Fj,a.JJ,a.u],encapsulation:2}),n})();var Z=c(8372),f=c(7322),T=c(7531),g=c(3092),b=c(508),U=c(7423);function N(n,r){if(1&n){const o=t.EpF();t.TgZ(0,"mat-option",8),t.NdJ("click",function(){const d=t.CHM(o).$implicit;return t.oxw().selectForQuery(d)}),t._uU(1),t.qZA()}if(2&n){const o=r.$implicit;t.Q6J("value",o.Ciudad),t.xp6(1),t.hij(" ",o.Ciudad," ")}}function L(n,r){if(1&n&&(t.TgZ(0,"div",9)(1,"div",10),t._UZ(2,"div",11),t.TgZ(3,"div",12)(4,"form",13)(5,"div",14),t._UZ(6,"input",15),t.TgZ(7,"label",16),t._uU(8,"C\xf3digo de ciudad"),t.qZA()(),t.TgZ(9,"div",14),t._UZ(10,"input",17),t.TgZ(11,"label",16),t._uU(12,"Ciudad"),t.qZA()(),t.TgZ(13,"div",14),t._UZ(14,"input",18),t.TgZ(15,"label",16),t._uU(16,"C\xf3digo de departamento"),t.qZA()(),t.TgZ(17,"div",14),t._UZ(18,"input",19),t.TgZ(19,"label",16),t._uU(20,"Departamento"),t.qZA()()()(),t._UZ(21,"div",11),t.qZA()()),2&n){const o=t.oxw();t.xp6(6),t.Q6J("value",o.selCiudad.codigo)("readonly",!0),t.xp6(4),t.Q6J("value",o.selCiudad.Ciudad)("readonly",!0),t.xp6(4),t.Q6J("value",o.selCiudad.codigoDto)("readonly",!0),t.xp6(4),t.Q6J("value",o.selCiudad.Departamento)("readonly",!0)}}function M(n,r){if(1&n){const o=t.EpF();t.TgZ(0,"mat-option",8),t.NdJ("click",function(){const d=t.CHM(o).$implicit;return t.oxw().selectForUpdate(d)}),t._uU(1),t.qZA()}if(2&n){const o=r.$implicit;t.Q6J("value",o.Ciudad),t.xp6(1),t.hij(" ",o.Ciudad," ")}}function w(n,r){if(1&n){const o=t.EpF();t.TgZ(0,"div",9)(1,"div",10),t._UZ(2,"div",11),t.TgZ(3,"div",12)(4,"form",13)(5,"div",14),t._UZ(6,"input",15),t.TgZ(7,"label",16),t._uU(8,"C\xf3digo de ciudad"),t.qZA()(),t.TgZ(9,"div",14),t._UZ(10,"input",17),t.TgZ(11,"label",16),t._uU(12,"Ciudad"),t.qZA()(),t.TgZ(13,"div",14),t._UZ(14,"input",18),t.TgZ(15,"label",16),t._uU(16,"C\xf3digo de departamento"),t.qZA()(),t.TgZ(17,"div",14),t._UZ(18,"input",19),t.TgZ(19,"label",16),t._uU(20,"Departamento"),t.qZA()(),t.TgZ(21,"div",20)(22,"div",21)(23,"button",22),t.NdJ("click",function(){return t.CHM(o),t.oxw().updateCiudad()}),t._uU(24,"Actualizar"),t.qZA()()()()(),t._UZ(25,"div",11),t.qZA()()}if(2&n){const o=t.oxw();t.xp6(4),t.Q6J("formGroup",o.miForm)}}function Y(n,r){if(1&n){const o=t.EpF();t.TgZ(0,"mat-option",8),t.NdJ("click",function(){const d=t.CHM(o).$implicit;return t.oxw().selectForDelete(d)}),t._uU(1),t.qZA()}if(2&n){const o=r.$implicit;t.Q6J("value",o.Ciudad),t.xp6(1),t.hij(" ",o.Ciudad," ")}}function S(n,r){if(1&n){const o=t.EpF();t.TgZ(0,"div",9)(1,"div",10),t._UZ(2,"div",11),t.TgZ(3,"div",12)(4,"form",13)(5,"div",14),t._UZ(6,"input",15),t.TgZ(7,"label",16),t._uU(8,"C\xf3digo de ciudad"),t.qZA()(),t.TgZ(9,"div",14),t._UZ(10,"input",17),t.TgZ(11,"label",16),t._uU(12,"Ciudad"),t.qZA()(),t.TgZ(13,"div",14),t._UZ(14,"input",18),t.TgZ(15,"label",16),t._uU(16,"C\xf3digo de departamento"),t.qZA()(),t.TgZ(17,"div",14),t._UZ(18,"input",19),t.TgZ(19,"label",16),t._uU(20,"Departamento"),t.qZA()(),t.TgZ(21,"div",20)(22,"div",21)(23,"button",22),t.NdJ("click",function(){return t.CHM(o),t.oxw().deleteCiudad()}),t._uU(24,"Eliminar"),t.qZA()()()()(),t._UZ(25,"div",11),t.qZA()()}if(2&n){const o=t.oxw();t.xp6(6),t.Q6J("value",o.selCiudad.codigo),t.xp6(4),t.Q6J("value",o.selCiudad.Ciudad),t.xp6(4),t.Q6J("value",o.selCiudad.codigoDto),t.xp6(4),t.Q6J("value",o.selCiudad.Departamento)}}function X(n,r){if(1&n){const o=t.EpF();t.TgZ(0,"mat-option",8),t.NdJ("click",function(){const d=t.CHM(o).$implicit;return t.oxw().selectForQuery(d)}),t._uU(1),t.qZA()}if(2&n){const o=r.$implicit;t.Q6J("value",o.tipoDocumento),t.xp6(1),t.hij(" ",o.tipoDocumento," ")}}function E(n,r){if(1&n&&(t.TgZ(0,"div",9)(1,"div",10),t._UZ(2,"div",11),t.TgZ(3,"div",12)(4,"form",13)(5,"div",14),t._UZ(6,"input",15),t.TgZ(7,"label",16),t._uU(8,"C\xf3digo tipo documento"),t.qZA()(),t.TgZ(9,"div",14),t._UZ(10,"input",17),t.TgZ(11,"label",16),t._uU(12,"Tipo documento"),t.qZA()()()(),t._UZ(13,"div",11),t.qZA()()),2&n){const o=t.oxw();t.xp6(6),t.Q6J("value",o.selTipoDocumento.idtipoDocumento)("readonly",!0),t.xp6(4),t.Q6J("value",o.selTipoDocumento.tipoDocumento)("readonly",!0)}}function K(n,r){if(1&n){const o=t.EpF();t.TgZ(0,"mat-option",8),t.NdJ("click",function(){const d=t.CHM(o).$implicit;return t.oxw().selectForUpdate(d)}),t._uU(1),t.qZA()}if(2&n){const o=r.$implicit;t.Q6J("value",o.tipoDocumento),t.xp6(1),t.hij(" ",o.tipoDocumento," ")}}function V(n,r){if(1&n){const o=t.EpF();t.TgZ(0,"div",9)(1,"div",10),t._UZ(2,"div",11),t.TgZ(3,"div",12)(4,"form",13)(5,"div",14),t._UZ(6,"input",15),t.TgZ(7,"label",16),t._uU(8,"C\xf3digo tipo documento"),t.qZA()(),t.TgZ(9,"div",14),t._UZ(10,"input",17),t.TgZ(11,"label",16),t._uU(12,"Tipo documento"),t.qZA()(),t.TgZ(13,"div",18)(14,"div",19)(15,"button",20),t.NdJ("click",function(){return t.CHM(o),t.oxw().updateTipoDocumentos()}),t._uU(16,"Actualizar"),t.qZA()()()()(),t._UZ(17,"div",11),t.qZA()()}if(2&n){const o=t.oxw();t.xp6(4),t.Q6J("formGroup",o.miForm)}}function H(n,r){if(1&n){const o=t.EpF();t.TgZ(0,"mat-option",8),t.NdJ("click",function(){const d=t.CHM(o).$implicit;return t.oxw().selectForUpdate(d)}),t._uU(1),t.qZA()}if(2&n){const o=r.$implicit;t.Q6J("value",o.tipoDocumento),t.xp6(1),t.hij(" ",o.tipoDocumento," ")}}function G(n,r){if(1&n){const o=t.EpF();t.TgZ(0,"div",9)(1,"div",10),t._UZ(2,"div",11),t.TgZ(3,"div",12)(4,"form",13)(5,"div",14),t._UZ(6,"input",15),t.TgZ(7,"label",16),t._uU(8,"C\xf3digo tipo documento"),t.qZA()(),t.TgZ(9,"div",14),t._UZ(10,"input",17),t.TgZ(11,"label",16),t._uU(12,"Tipo documento"),t.qZA()(),t.TgZ(13,"div",18)(14,"div",19)(15,"button",20),t.NdJ("click",function(){return t.CHM(o),t.oxw().deleteTipoDocumentos()}),t._uU(16,"Eliminar"),t.qZA()()()()(),t._UZ(17,"div",11),t.qZA()()}if(2&n){const o=t.oxw();t.xp6(4),t.Q6J("formGroup",o.miForm)}}const P=[{path:"",component:x,canActivate:[s.z],canLoad:[s.z],children:[{path:"cCiudad",component:k,canActivate:[s.z],canLoad:[s.z]},{path:"fCiudad",component:(()=>{class n{constructor(o,e){this.fb=o,this.masterD=e,this.myControl=new a.NI,this.criterio="",this.ciudades=[{Ciudad:"",codigo:"",codigoDto:"",Departamento:""}],this.forQuery=!1,this.forLoad=!1}ngOnInit(){this.filteredOptions=this.myControl.valueChanges.pipe((0,m.U)(o=>this._filter(o)))}selectForQuery(o){this.forQuery=!0,localStorage.setItem("qCiudad",JSON.stringify(o))}loadInfo(){this.forQuery?(this.selCiudad=JSON.parse(localStorage.getItem("qCiudad")||""),this.forLoad=!0):p().fire({text:"No has seleccionado una ciudad aun",icon:"warning"})}limpiarInfo(){this.selCiudad={Ciudad:"",codigo:"",codigoDto:"",Departamento:""},this.forLoad=!1,this.forQuery=!1,localStorage.removeItem("qCiudad")}_filter(o){(0,Z.b)(200),""!=this.criterio&&this.masterD.searchCiudades(this.criterio).subscribe(i=>{i.error&&(this.ciudades=[]),this.ciudades=i.ciudades});const e=o.toLowerCase();return 0===this.ciudades.length?[{Ciudad:"No hay coincidencias",codigo:"",codigoDto:"",Departamento:""}]:this.ciudades.filter(i=>i.Ciudad.toLowerCase().includes(e))||{Ciudad:"No hay coincidencias",codigo:"",codigoDto:"",Departamento:""}}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(a.qu),t.Y36(v))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-find-ciudad"]],decls:16,vars:7,consts:[[1,"container"],[1,"example-form","form-floating","p-2","m-2"],[1,""],["type","text","placeholder","","aria-label","Buscar Ciudad","matInput","",3,"formControl","matAutocomplete","ngModel","ngModelChange","focus"],["auto","matAutocomplete"],[3,"value","click",4,"ngFor","ngForOf"],["mat-stroked-button","","color","primary",1,"m-2",3,"click"],["class","m-3 w-100",4,"ngIf"],[3,"value","click"],[1,"m-3","w-100"],[1,"row"],[1,"col-2"],[1,"col-6"],["action",""],[1,"form-floating","m-3"],["type","text","id","floatingInput","placeholder","C\xf3digo de ciudad",1,"form-control",3,"value","readonly"],["for","floatingInput"],["type","text","id","floatingInput","placeholder","Ciudad",1,"form-control",3,"value","readonly"],["type","text","id","floatingInput","placeholder","C\xf3digo de departamento",1,"form-control",3,"value","readonly"],["type","text","id","floatingInput","placeholder","name@example.com",1,"form-control",3,"value","readonly"]],template:function(o,e){if(1&o&&(t.TgZ(0,"div",0)(1,"h1"),t._uU(2,"B\xfasqueda de ciudades"),t.qZA(),t._UZ(3,"hr"),t.TgZ(4,"form",1)(5,"mat-form-field",2)(6,"mat-label"),t._uU(7,"Buscar Ciudad"),t.qZA(),t.TgZ(8,"input",3),t.NdJ("ngModelChange",function(d){return e.criterio=d})("focus",function(){return e.limpiarInfo()}),t.qZA(),t.TgZ(9,"mat-autocomplete",null,4),t.YNc(11,N,2,2,"mat-option",5),t.ALo(12,"async"),t.qZA()(),t.TgZ(13,"button",6),t.NdJ("click",function(){return e.loadInfo()}),t._uU(14,"Visualizar"),t.qZA()(),t.YNc(15,L,22,8,"div",7),t.qZA()),2&o){const i=t.MAs(10);t.xp6(8),t.Q6J("formControl",e.myControl)("matAutocomplete",i)("ngModel",e.criterio),t.xp6(3),t.Q6J("ngForOf",t.lcZ(12,5,e.filteredOptions)),t.xp6(4),t.Q6J("ngIf",e.forLoad)}},directives:[a._Y,a.JL,a.F,f.KE,f.hX,T.Nt,a.Fj,g.ZL,a.JJ,a.oH,g.XC,u.sg,b.ey,U.lW,u.O5],pipes:[u.Ov],encapsulation:2}),n})(),canActivate:[s.z],canLoad:[s.z]},{path:"uCiudad",component:(()=>{class n{constructor(o,e){this.fb=o,this.masterD=e,this.myControl=new a.NI,this.criterio="",this.ciudades=[{Ciudad:"",codigo:"",codigoDto:"",Departamento:""}],this.forDelete=!1,this.forLoad=!1,this.miForm=this.fb.group({codigo:[""],Ciudad:[""],codigoDto:[""],Departamento:[""]})}ngOnInit(){this.filteredOptions=this.myControl.valueChanges.pipe((0,m.U)(o=>this._filter(o)))}updateCiudad(){var o,e,i;const d={codigo:this.selCiudad.codigo,codigoDto:null===(o=this.miForm.get("codigoDto"))||void 0===o?void 0:o.value,Departamento:null===(e=this.miForm.get("Departamento"))||void 0===e?void 0:e.value,Ciudad:null===(i=this.miForm.get("Ciudad"))||void 0===i?void 0:i.value};this.masterD.updCiudad(d).subscribe(l=>{if(l.error){const D=l.error.errors[0].msg||"",A="Campo: "+l.error.errors[0].param||0;p().fire({icon:"error",title:"Oops... "+A,text:D})}else l.OK&&p().fire({icon:"success",title:"Operaci\xf3n correcta",text:l.statusDescription}).then(D=>{this.limpiarInfo(),this.criterio="",this.ciudades=[{Ciudad:"",codigo:"",codigoDto:"",Departamento:""}]})})}selectForUpdate(o){this.forDelete=!0,localStorage.setItem("delCiudad",JSON.stringify(o))}loadInfo(){var o,e,i,d;this.forDelete?(this.selCiudad=JSON.parse(localStorage.getItem("delCiudad")||""),null===(o=this.miForm.get("codigo"))||void 0===o||o.setValue(this.selCiudad.codigo),null===(e=this.miForm.get("Ciudad"))||void 0===e||e.setValue(this.selCiudad.Ciudad),null===(i=this.miForm.get("codigoDto"))||void 0===i||i.setValue(this.selCiudad.codigoDto),null===(d=this.miForm.get("Departamento"))||void 0===d||d.setValue(this.selCiudad.Departamento),this.forLoad=!0):p().fire({text:"No has seleccionado una ciudad aun",icon:"warning"})}limpiarInfo(){this.selCiudad={Ciudad:"",codigo:"",codigoDto:"",Departamento:""},this.forLoad=!1,this.forDelete=!1,localStorage.removeItem("delCiudad")}_filter(o){(0,Z.b)(200),""!=this.criterio&&this.masterD.searchCiudades(this.criterio).subscribe(i=>{i.error&&(this.ciudades=[]),this.ciudades=i.ciudades});const e=o.toLowerCase();return 0===this.ciudades.length?[{Ciudad:"No hay coincidencias",codigo:"",codigoDto:"",Departamento:""}]:this.ciudades.filter(i=>i.Ciudad.toLowerCase().includes(e))||{Ciudad:"No hay coincidencias",codigo:"",codigoDto:"",Departamento:""}}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(a.qu),t.Y36(v))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-upd-ciudad"]],decls:16,vars:7,consts:[[1,"container"],[1,"example-form","form-floating","p-2","m-2"],[1,""],["type","text","placeholder","","aria-label","Buscar Ciudad","matInput","",3,"formControl","matAutocomplete","ngModel","ngModelChange","focus"],["auto","matAutocomplete"],[3,"value","click",4,"ngFor","ngForOf"],["mat-stroked-button","","color","primary",1,"m-2",3,"click"],["class","m-3 w-100",4,"ngIf"],[3,"value","click"],[1,"m-3","w-100"],[1,"row"],[1,"col-2"],[1,"col-6"],["action","",3,"formGroup"],[1,"form-floating","m-3"],["type","text","id","floatingInput","placeholder","C\xf3digo de ciudad","formControlName","codigo",1,"form-control"],["for","floatingInput"],["type","text","id","floatingInput","placeholder","Ciudad","formControlName","Ciudad",1,"form-control"],["type","text","id","floatingInput","placeholder","C\xf3digo de departamento","formControlName","codigoDto",1,"form-control"],["type","text","id","floatingInput","placeholder","name@example.com","formControlName","Departamento",1,"form-control"],[1,"form-floating","m-5","p-1"],[1,"float-md-end"],[1,"btn","btn-outline-success",3,"click"]],template:function(o,e){if(1&o&&(t.TgZ(0,"div",0)(1,"h1"),t._uU(2,"Actualizaci\xf3n de ciudades"),t.qZA(),t._UZ(3,"hr"),t.TgZ(4,"form",1)(5,"mat-form-field",2)(6,"mat-label"),t._uU(7,"Buscar Ciudad"),t.qZA(),t.TgZ(8,"input",3),t.NdJ("ngModelChange",function(d){return e.criterio=d})("focus",function(){return e.limpiarInfo()}),t.qZA(),t.TgZ(9,"mat-autocomplete",null,4),t.YNc(11,M,2,2,"mat-option",5),t.ALo(12,"async"),t.qZA()(),t.TgZ(13,"button",6),t.NdJ("click",function(){return e.loadInfo()}),t._uU(14,"Visualizar"),t.qZA()(),t.YNc(15,w,26,1,"div",7),t.qZA()),2&o){const i=t.MAs(10);t.xp6(8),t.Q6J("formControl",e.myControl)("matAutocomplete",i)("ngModel",e.criterio),t.xp6(3),t.Q6J("ngForOf",t.lcZ(12,5,e.filteredOptions)),t.xp6(4),t.Q6J("ngIf",e.forLoad)}},directives:[a._Y,a.JL,a.F,f.KE,f.hX,T.Nt,a.Fj,g.ZL,a.JJ,a.oH,g.XC,u.sg,b.ey,U.lW,u.O5,a.sg,a.u],pipes:[u.Ov],encapsulation:2}),n})(),canActivate:[s.z],canLoad:[s.z]},{path:"dCiudad",component:(()=>{class n{constructor(o,e){this.fb=o,this.masterD=e,this.myControl=new a.NI,this.criterio="",this.ciudades=[{Ciudad:"",codigo:"",codigoDto:"",Departamento:""}],this.forDelete=!1,this.forLoad=!1,this.miForm=this.fb.group({codigo:["",a.kI.required,a.kI.minLength(1),a.kI.maxLength(100)],Ciudad:["",a.kI.required,a.kI.minLength(1),a.kI.maxLength(200)],codigoDto:["",a.kI.required,a.kI.minLength(1),a.kI.maxLength(100)],Departamento:["",a.kI.required,a.kI.minLength(1),a.kI.maxLength(150)]})}ngOnInit(){this.filteredOptions=this.myControl.valueChanges.pipe((0,m.U)(o=>this._filter(o)))}deleteCiudad(){this.masterD.delCiudad({codigo:this.selCiudad.codigo}).subscribe(e=>{if(e.error){const i=e.error.errors[0].msg||"",d="Campo: "+e.error.errors[0].param||0;p().fire({icon:"error",title:"Oops... "+d,text:i})}else e.OK&&p().fire({icon:"success",title:"Operaci\xf3n correcta",text:e.statusDescription}).then(i=>{this.limpiarInfo(),this.criterio="",this.ciudades=[{Ciudad:"",codigo:"",codigoDto:"",Departamento:""}]})})}selectForDelete(o){this.forDelete=!0,localStorage.setItem("delCiudad",JSON.stringify(o))}loadInfo(){this.forDelete?(this.selCiudad=JSON.parse(localStorage.getItem("delCiudad")||""),this.forLoad=!0):p().fire({text:"No has seleccionado una ciudad aun",icon:"warning"})}limpiarInfo(){this.selCiudad={Ciudad:"",codigo:"",codigoDto:"",Departamento:""},this.forLoad=!1,this.forDelete=!1,localStorage.removeItem("delCiudad")}_filter(o){(0,Z.b)(200),""!=this.criterio&&this.masterD.searchCiudades(this.criterio).subscribe(i=>{i.error&&(this.ciudades=[]),this.ciudades=i.ciudades});const e=o.toLowerCase();return 0===this.ciudades.length?[{Ciudad:"No hay coincidencias",codigo:"",codigoDto:"",Departamento:""}]:this.ciudades.filter(i=>i.Ciudad.toLowerCase().includes(e))||{Ciudad:"No hay coincidencias",codigo:"",codigoDto:"",Departamento:""}}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(a.qu),t.Y36(v))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-del-ciudad"]],decls:16,vars:7,consts:[[1,"container"],[1,"example-form","form-floating","p-2","m-2"],[1,""],["type","text","placeholder","","aria-label","Buscar Ciudad","matInput","",3,"formControl","matAutocomplete","ngModel","ngModelChange","focus"],["auto","matAutocomplete"],[3,"value","click",4,"ngFor","ngForOf"],["mat-stroked-button","","color","primary",1,"m-2",3,"click"],["class","m-3 w-100",4,"ngIf"],[3,"value","click"],[1,"m-3","w-100"],[1,"row"],[1,"col-2"],[1,"col-6"],["action",""],[1,"form-floating","m-3"],["type","text","id","floatingInput","placeholder","C\xf3digo de ciudad",1,"form-control",3,"value"],["for","floatingInput"],["type","text","id","floatingInput","placeholder","Ciudad",1,"form-control",3,"value"],["type","text","id","floatingInput","placeholder","C\xf3digo de departamento",1,"form-control",3,"value"],["type","text","id","floatingInput","placeholder","name@example.com",1,"form-control",3,"value"],[1,"form-floating","m-5","p-1"],[1,"float-md-end"],[1,"btn","btn-outline-danger",3,"click"]],template:function(o,e){if(1&o&&(t.TgZ(0,"div",0)(1,"h1"),t._uU(2,"Eliminaci\xf3n de ciudades"),t.qZA(),t._UZ(3,"hr"),t.TgZ(4,"form",1)(5,"mat-form-field",2)(6,"mat-label"),t._uU(7,"Buscar Ciudad"),t.qZA(),t.TgZ(8,"input",3),t.NdJ("ngModelChange",function(d){return e.criterio=d})("focus",function(){return e.limpiarInfo()}),t.qZA(),t.TgZ(9,"mat-autocomplete",null,4),t.YNc(11,Y,2,2,"mat-option",5),t.ALo(12,"async"),t.qZA()(),t.TgZ(13,"button",6),t.NdJ("click",function(){return e.loadInfo()}),t._uU(14,"Visualizar"),t.qZA()(),t.YNc(15,S,26,4,"div",7),t.qZA()),2&o){const i=t.MAs(10);t.xp6(8),t.Q6J("formControl",e.myControl)("matAutocomplete",i)("ngModel",e.criterio),t.xp6(3),t.Q6J("ngForOf",t.lcZ(12,5,e.filteredOptions)),t.xp6(4),t.Q6J("ngIf",e.forLoad)}},directives:[a._Y,a.JL,a.F,f.KE,f.hX,T.Nt,a.Fj,g.ZL,a.JJ,a.oH,g.XC,u.sg,b.ey,U.lW,u.O5],pipes:[u.Ov],encapsulation:2}),n})(),canActivate:[s.z],canLoad:[s.z]},{path:"cTipoDoc",component:(()=>{class n{constructor(o,e){this.fb=o,this.masterD=e,this.miForm=this.fb.group({tipoDocumento:["",a.kI.required,a.kI.minLength(1),a.kI.maxLength(100)]})}ngOnInit(){}crearTipoDocumento(){var o;const e={tipoDocumento:null===(o=this.miForm.get("tipoDocumento"))||void 0===o?void 0:o.value};this.masterD.createTipoDocumento(e).subscribe(i=>{if(i.error){const d=i.error.errors[0].msg||"",l="Campo: "+i.error.errors[0].param||0;p().fire({icon:"error",title:"Oops... "+l,text:d})}else i.OK&&p().fire({icon:"success",title:"Operaci\xf3n correcta",text:i.statusDescription}).then(d=>{this.miForm.reset()})})}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(a.qu),t.Y36(v))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-tipo-documentos"]],decls:14,vars:1,consts:[[1,"container"],[1,"container","form-control","form-floating"],["action","",3,"formGroup"],[1,"form-floating","m-3"],["type","text","id","floatingInput","placeholder","Tipo documento","formControlName","tipoDocumento",1,"form-control"],["for","floatingInput"],[1,"form-floating","m-5","p-1"],[1,"float-md-end"],[1,"btn","btn-outline-primary",3,"click"]],template:function(o,e){1&o&&(t.TgZ(0,"div",0)(1,"h1"),t._uU(2,"Creaci\xf3n de ciudades"),t.qZA(),t._UZ(3,"hr"),t.TgZ(4,"div",1)(5,"form",2)(6,"div",3),t._UZ(7,"input",4),t.TgZ(8,"label",5),t._uU(9,"Tipo documento"),t.qZA()(),t.TgZ(10,"div",6)(11,"div",7)(12,"button",8),t.NdJ("click",function(){return e.crearTipoDocumento()}),t._uU(13,"Guardar"),t.qZA()()()()()()),2&o&&(t.xp6(5),t.Q6J("formGroup",e.miForm))},directives:[a._Y,a.JL,a.sg,a.Fj,a.JJ,a.u],encapsulation:2}),n})(),canActivate:[s.z],canLoad:[s.z]},{path:"fTipoDoc",component:(()=>{class n{constructor(o,e){this.fb=o,this.masterD=e,this.myControl=new a.NI,this.criterio="",this.tipoDocumento=[{idtipoDocumento:0,tipoDocumento:""}],this.forQuery=!1,this.forLoad=!1}ngOnInit(){this.filteredOptions=this.myControl.valueChanges.pipe((0,m.U)(o=>this._filter(o)))}selectForQuery(o){this.forQuery=!0,localStorage.setItem("qTipoDoc",JSON.stringify(o))}loadInfo(){this.forQuery?(this.selTipoDocumento=JSON.parse(localStorage.getItem("qTipoDoc")||""),this.forLoad=!0):p().fire({text:"No has seleccionado una tipo de documento aun",icon:"warning"})}limpiarInfo(){this.selTipoDocumento={idtipoDocumento:0,tipoDocumento:""},this.forLoad=!1,this.forQuery=!1,localStorage.removeItem("qTipoDoc")}_filter(o){(0,Z.b)(150),""!=this.criterio&&this.masterD.searchTipoDocumento(this.criterio).subscribe(i=>{i.error&&(this.tipoDocumento=[]),this.tipoDocumento=i.tipoDocumento});const e=o.toLowerCase();return 0===this.tipoDocumento.length?[{idtipoDocumento:0,tipoDocumento:"No hay coincidencias"}]:this.tipoDocumento.filter(i=>i.tipoDocumento.toLowerCase().includes(e))||{idtipoDocumento:0,tipoDocumento:"No hay coincidencias"}}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(a.qu),t.Y36(v))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-find-tip-documento"]],decls:16,vars:7,consts:[[1,"container"],[1,"example-form","form-floating","p-2","m-2"],[1,""],["type","text","placeholder","","aria-label","Buscar tipo de documento","matInput","",3,"formControl","matAutocomplete","ngModel","ngModelChange","focus"],["auto","matAutocomplete"],[3,"value","click",4,"ngFor","ngForOf"],["mat-stroked-button","","color","primary",1,"m-2",3,"click"],["class","m-3 w-100",4,"ngIf"],[3,"value","click"],[1,"m-3","w-100"],[1,"row"],[1,"col-2"],[1,"col-6"],["action",""],[1,"form-floating","m-3"],["type","text","id","floatingInput","placeholder","C\xf3digo tipo documento",1,"form-control",3,"value","readonly"],["for","floatingInput"],["type","text","id","floatingInput","placeholder","tipo documento",1,"form-control",3,"value","readonly"]],template:function(o,e){if(1&o&&(t.TgZ(0,"div",0)(1,"h1"),t._uU(2,"B\xfasqueda de tipo de documento"),t.qZA(),t._UZ(3,"hr"),t.TgZ(4,"form",1)(5,"mat-form-field",2)(6,"mat-label"),t._uU(7,"Buscar tipo de documento"),t.qZA(),t.TgZ(8,"input",3),t.NdJ("ngModelChange",function(d){return e.criterio=d})("focus",function(){return e.limpiarInfo()}),t.qZA(),t.TgZ(9,"mat-autocomplete",null,4),t.YNc(11,X,2,2,"mat-option",5),t.ALo(12,"async"),t.qZA()(),t.TgZ(13,"button",6),t.NdJ("click",function(){return e.loadInfo()}),t._uU(14,"Visualizar"),t.qZA()(),t.YNc(15,E,14,4,"div",7),t.qZA()),2&o){const i=t.MAs(10);t.xp6(8),t.Q6J("formControl",e.myControl)("matAutocomplete",i)("ngModel",e.criterio),t.xp6(3),t.Q6J("ngForOf",t.lcZ(12,5,e.filteredOptions)),t.xp6(4),t.Q6J("ngIf",e.forLoad)}},directives:[a._Y,a.JL,a.F,f.KE,f.hX,T.Nt,a.Fj,g.ZL,a.JJ,a.oH,g.XC,u.sg,b.ey,U.lW,u.O5],pipes:[u.Ov],encapsulation:2}),n})(),canActivate:[s.z],canLoad:[s.z]},{path:"uTipoDoc",component:(()=>{class n{constructor(o,e){this.fb=o,this.masterD=e,this.myControl=new a.NI,this.criterio="",this.tipoDocumento=[{idtipoDocumento:0,tipoDocumento:""}],this.forDelete=!1,this.forLoad=!1,this.miForm=this.fb.group({idtipoDocumento:[""],tipoDocumento:[""]})}ngOnInit(){this.filteredOptions=this.myControl.valueChanges.pipe((0,m.U)(o=>this._filter(o)))}updateTipoDocumentos(){var o;const e={idtipoDocumento:this.selTipoDoc.idtipoDocumento,tipoDocumento:null===(o=this.miForm.get("tipoDocumento"))||void 0===o?void 0:o.value};this.masterD.updTypeDocument(e).subscribe(i=>{if(i.error){const d=i.error.errors[0].msg||"",l="Campo: "+i.error.errors[0].param||0;p().fire({icon:"error",title:"Oops... "+l,text:d})}else i.OK&&p().fire({icon:"success",title:"Operaci\xf3n correcta",text:i.statusDescription}).then(d=>{this.limpiarInfo(),this.criterio="",this.tipoDocumento=[{idtipoDocumento:0,tipoDocumento:""}]})})}selectForUpdate(o){this.forDelete=!0,localStorage.setItem("updTypeDoc",JSON.stringify(o))}loadInfo(){var o,e;this.forDelete?(this.selTipoDoc=JSON.parse(localStorage.getItem("updTypeDoc")||""),null===(o=this.miForm.get("idtipoDocumento"))||void 0===o||o.setValue(this.selTipoDoc.idtipoDocumento),null===(e=this.miForm.get("tipoDocumento"))||void 0===e||e.setValue(this.selTipoDoc.tipoDocumento),this.forLoad=!0):p().fire({text:"No has seleccionado una tipo de documento aun",icon:"warning"})}limpiarInfo(){this.selTipoDoc={idtipoDocumento:0,tipoDocumento:""},this.forLoad=!1,this.forDelete=!1,localStorage.removeItem("updTypeDoc")}_filter(o){(0,Z.b)(150),""!=this.criterio&&this.masterD.searchTipoDocumento(this.criterio).subscribe(i=>{i.error&&(this.tipoDocumento=[]),this.tipoDocumento=i.tipoDocumento});const e=o.toLowerCase();return 0===this.tipoDocumento.length?[{idtipoDocumento:0,tipoDocumento:"No hay coincidencias"}]:this.tipoDocumento.filter(i=>i.tipoDocumento.toLowerCase().includes(e))||{idtipoDocumento:0,tipoDocumento:"No hay coincidencias"}}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(a.qu),t.Y36(v))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-upd-tip-documento"]],decls:16,vars:7,consts:[[1,"container"],[1,"example-form","form-floating","p-2","m-2"],[1,""],["type","text","placeholder","","aria-label","Buscar tipo de documento","matInput","",3,"formControl","matAutocomplete","ngModel","ngModelChange","focus"],["auto","matAutocomplete"],[3,"value","click",4,"ngFor","ngForOf"],["mat-stroked-button","","color","primary",1,"m-2",3,"click"],["class","m-3 w-100",4,"ngIf"],[3,"value","click"],[1,"m-3","w-100"],[1,"row"],[1,"col-2"],[1,"col-6"],["action","",3,"formGroup"],[1,"form-floating","m-3"],["type","text","id","floatingInput","placeholder","C\xf3digo tipo documento","formControlName","idtipoDocumento",1,"form-control"],["for","floatingInput"],["type","text","id","floatingInput","placeholder","Tipo documento","formControlName","tipoDocumento",1,"form-control"],[1,"form-floating","m-5","p-1"],[1,"float-md-end"],[1,"btn","btn-outline-success",3,"click"]],template:function(o,e){if(1&o&&(t.TgZ(0,"div",0)(1,"h1"),t._uU(2,"Actualizaci\xf3n tipo de documento"),t.qZA(),t._UZ(3,"hr"),t.TgZ(4,"form",1)(5,"mat-form-field",2)(6,"mat-label"),t._uU(7,"Buscar tipo de documento"),t.qZA(),t.TgZ(8,"input",3),t.NdJ("ngModelChange",function(d){return e.criterio=d})("focus",function(){return e.limpiarInfo()}),t.qZA(),t.TgZ(9,"mat-autocomplete",null,4),t.YNc(11,K,2,2,"mat-option",5),t.ALo(12,"async"),t.qZA()(),t.TgZ(13,"button",6),t.NdJ("click",function(){return e.loadInfo()}),t._uU(14,"Visualizar"),t.qZA()(),t.YNc(15,V,18,1,"div",7),t.qZA()),2&o){const i=t.MAs(10);t.xp6(8),t.Q6J("formControl",e.myControl)("matAutocomplete",i)("ngModel",e.criterio),t.xp6(3),t.Q6J("ngForOf",t.lcZ(12,5,e.filteredOptions)),t.xp6(4),t.Q6J("ngIf",e.forLoad)}},directives:[a._Y,a.JL,a.F,f.KE,f.hX,T.Nt,a.Fj,g.ZL,a.JJ,a.oH,g.XC,u.sg,b.ey,U.lW,u.O5,a.sg,a.u],pipes:[u.Ov],encapsulation:2}),n})(),canActivate:[s.z],canLoad:[s.z]},{path:"dTipoDoc",component:(()=>{class n{constructor(o,e){this.fb=o,this.masterD=e,this.myControl=new a.NI,this.criterio="",this.tipoDocumento=[{idtipoDocumento:0,tipoDocumento:""}],this.forDelete=!1,this.forLoad=!1,this.miForm=this.fb.group({idtipoDocumento:[""],tipoDocumento:[""]})}ngOnInit(){this.filteredOptions=this.myControl.valueChanges.pipe((0,m.U)(o=>this._filter(o)))}deleteTipoDocumentos(){var o;const e={idtipoDocumento:this.selTipoDoc.idtipoDocumento,tipoDocumento:null===(o=this.miForm.get("tipoDocumento"))||void 0===o?void 0:o.value};this.masterD.delTypeDocument(e).subscribe(i=>{if(i.error){const d=i.error.errors[0].msg||"",l="Campo: "+i.error.errors[0].param||0;p().fire({icon:"error",title:"Oops... "+l,text:d})}else i.OK&&p().fire({icon:"success",title:"Operaci\xf3n correcta",text:i.statusDescription}).then(d=>{this.limpiarInfo(),this.criterio="",this.tipoDocumento=[{idtipoDocumento:0,tipoDocumento:""}]})})}selectForUpdate(o){this.forDelete=!0,localStorage.setItem("updTypeDoc",JSON.stringify(o))}loadInfo(){var o,e;this.forDelete?(this.selTipoDoc=JSON.parse(localStorage.getItem("updTypeDoc")||""),null===(o=this.miForm.get("idtipoDocumento"))||void 0===o||o.setValue(this.selTipoDoc.idtipoDocumento),null===(e=this.miForm.get("tipoDocumento"))||void 0===e||e.setValue(this.selTipoDoc.tipoDocumento),this.forLoad=!0):p().fire({text:"No has seleccionado una tipo de documento aun",icon:"warning"})}limpiarInfo(){this.selTipoDoc={idtipoDocumento:0,tipoDocumento:""},this.forLoad=!1,this.forDelete=!1,localStorage.removeItem("updTypeDoc")}_filter(o){(0,Z.b)(150),""!=this.criterio&&this.masterD.searchTipoDocumento(this.criterio).subscribe(i=>{i.error&&(this.tipoDocumento=[]),this.tipoDocumento=i.tipoDocumento});const e=o.toLowerCase();return 0===this.tipoDocumento.length?[{idtipoDocumento:0,tipoDocumento:"No hay coincidencias"}]:this.tipoDocumento.filter(i=>i.tipoDocumento.toLowerCase().includes(e))||{idtipoDocumento:0,tipoDocumento:"No hay coincidencias"}}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(a.qu),t.Y36(v))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-del-tip-documento"]],decls:16,vars:7,consts:[[1,"container"],[1,"example-form","form-floating","p-2","m-2"],[1,""],["type","text","placeholder","","aria-label","Buscar tipo de documento","matInput","",3,"formControl","matAutocomplete","ngModel","ngModelChange","focus"],["auto","matAutocomplete"],[3,"value","click",4,"ngFor","ngForOf"],["mat-stroked-button","","color","primary",1,"m-2",3,"click"],["class","m-3 w-100",4,"ngIf"],[3,"value","click"],[1,"m-3","w-100"],[1,"row"],[1,"col-2"],[1,"col-6"],["action","",3,"formGroup"],[1,"form-floating","m-3"],["type","text","id","floatingInput","placeholder","C\xf3digo tipo documento","formControlName","idtipoDocumento",1,"form-control"],["for","floatingInput"],["type","text","id","floatingInput","placeholder","Tipo documento","formControlName","tipoDocumento",1,"form-control"],[1,"form-floating","m-5","p-1"],[1,"float-md-end"],[1,"btn","btn-outline-danger",3,"click"]],template:function(o,e){if(1&o&&(t.TgZ(0,"div",0)(1,"h1"),t._uU(2,"Eliminaci\xf3n tipo de documento"),t.qZA(),t._UZ(3,"hr"),t.TgZ(4,"form",1)(5,"mat-form-field",2)(6,"mat-label"),t._uU(7,"Buscar tipo de documento"),t.qZA(),t.TgZ(8,"input",3),t.NdJ("ngModelChange",function(d){return e.criterio=d})("focus",function(){return e.limpiarInfo()}),t.qZA(),t.TgZ(9,"mat-autocomplete",null,4),t.YNc(11,H,2,2,"mat-option",5),t.ALo(12,"async"),t.qZA()(),t.TgZ(13,"button",6),t.NdJ("click",function(){return e.loadInfo()}),t._uU(14,"Visualizar"),t.qZA()(),t.YNc(15,G,18,1,"div",7),t.qZA()),2&o){const i=t.MAs(10);t.xp6(8),t.Q6J("formControl",e.myControl)("matAutocomplete",i)("ngModel",e.criterio),t.xp6(3),t.Q6J("ngForOf",t.lcZ(12,5,e.filteredOptions)),t.xp6(4),t.Q6J("ngIf",e.forLoad)}},directives:[a._Y,a.JL,a.F,f.KE,f.hX,T.Nt,a.Fj,g.ZL,a.JJ,a.oH,g.XC,u.sg,b.ey,U.lW,u.O5,a.sg,a.u],pipes:[u.Ov],encapsulation:2}),n})(),canActivate:[s.z],canLoad:[s.z]}]}];let R=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[y.Bz.forChild(P)],y.Bz]}),n})();var tt=c(7547);let ot=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[u.ez,R,a.UX,tt.q,a.u5]]}),n})()}}]);