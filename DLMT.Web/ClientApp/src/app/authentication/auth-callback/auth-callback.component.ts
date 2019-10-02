import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/common/message-service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit, OnDestroy {
  
  private messageServiceSub: any;
  constructor(
    private messageService: MessageService,
    private authService: AuthService, 
    private router: Router) { }

  ngOnInit() {
    this.messageServiceSub = this.messageService.getMessage().subscribe(
      x=>{
        if (x && x.data.user && x.data.isAuthenticated){
          this.router.navigateByUrl("/dashboard");
        }
        else{
          this.router.navigateByUrl("/unauthorize");
        }
      },
      err=>{
        this.router.navigateByUrl("/error")
      }
    )
    this.authService.completeAuthentication();
  }
  ngOnDestroy(): void {
    if (this.messageServiceSub){
      this.messageServiceSub.unsubscribe();
    }
  }
}
