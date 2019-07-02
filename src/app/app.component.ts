import { Component, OnInit, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiService } from './shared/api.service';
import { UserModel } from './models/user-model';
import { trigger, transition, animate, state, style } from '@angular/animations';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('scrollAnimation', [

      state('show', style({
        opacity: 1,
        transform: "translateX(0)"
      })

      ),
      state('hide', style({
        opacity: 0,
        transform: "translateX(-100%)"
      })
      ),
      transition('show => hide', animate('1s 1000ms linear')),
      transition('hide => show', animate('1s 1000ms linear'))
    ]),

    trigger('scrollAnimation2', [

      state('show2', style({
        opacity: 1,
        transform: "translatex(0)"
      })

      ),
      state('hide2', style({
        opacity: 0,
        transform: "translatex(100%)"
      })
      ),
      transition('show2 => hide2', animate('1s 1000ms linear')),
      transition('hide2 => show2', animate('1s 1000ms linear'))
    ]),

  ]
})

export class AppComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    // this.elementRef.nativeElement.ownerDocument.body.style.backgroundImage='http://4usky.com/download/164294538.html';
  }

  state ='hide';
  state2='hide2';
  userModelInput = new UserModel();
  userModel: UserModel[] = null;
  title = 'apiDemoNode';
  deleteId = null;
  showModal: boolean = false;
  showModalUpdate: boolean = false;
  updateUserId = null;

  constructor(private apiService: apiService,
    private elementRef: ElementRef) {
      const firebaseConfig = {
        
      };
      firebase.initializeApp(firebaseConfig);
  
  }
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const compPostion = this.elementRef.nativeElement.offsetTop;
    const scrollPostion = window.pageYOffset;

    if (scrollPostion >= compPostion) {
      this.state = 'show'
      this.state2='show2'
    }
    else {
      this.state = 'hide';
      this.state2='hide2';
    }
  }
  ngOnInit(): void {

    this.getAllUsers();
  }

  addUser() {
    this.apiService.login();
    this.apiService.addUser(this.userModelInput).subscribe(result => {

      if (result['messageType'] = '"success"') {
        alert(result['message']);
        this.getAllUsers();
        this.userModelInput.name = null;
        this.userModelInput.password = null;
      }

    })
  }

  getAllUsers() {
    this.apiService.getAllUsers().subscribe(result => {
      if (result.length == 0) {
        this.userModel = null;
      } else {
        this.userModel = result;
      }

    })
  }
  confirmDelete(event) {
    this.showModal = true;
    this.deleteId = event._id;
  }
  updateUserModal(event) {
    this.showModalUpdate = true;
    this.userModelInput.name = event.name;
    this.userModelInput.password = event.password;
    this.updateUserId = event._id;
  }
  deleteUser() {
    this.apiService.deleteSelectedUser(this.deleteId).subscribe(result => {
      if (result['messageType'] == "success") {
        this.getAllUsers();
      }

      this.showModal = false
    })
  }
  hide() {
    this.showModal = false;
    this.showModalUpdate = false;
    this.userModelInput.name = null;
    this.userModelInput.password = null;

  }
  updateUser() {
    this.apiService.updateSelectedUser(this.updateUserId, this.userModelInput.name, this.userModelInput.password).subscribe(result => {
      if (result['messageType'] == "success") {
        this.getAllUsers();
        this.userModelInput.name = null;
        this.userModelInput.password = null;
        alert(result['message'])
      }

      this.showModalUpdate = false
    })
  }

}
