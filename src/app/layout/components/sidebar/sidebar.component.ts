import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isSidebarVisible = false;
  activeMenu: string | null = null;

  constructor(
    private commonService:CommonService, 
    private router:Router,
    public localStoreService: LocalStoreService
  ){ }

  ngOnInit(): void {
    this.commonService.sidebarVisible$.subscribe(visible => {
      this.isSidebarVisible = visible;
    });
  }


  // Method to toggle sub-menu
  toggleMenu(menu: string) {
    if(this.activeMenu == menu && (menu == 'transaction' || menu == 'reports' || menu == 'journal' || menu == 'setting')){
      this.activeMenu = ''
    }else{
      this.activeMenu = menu;
    }
  }

  logout() {
    this.router.navigate(['/login']);
    this.localStoreService.removeItem();
  }
}
