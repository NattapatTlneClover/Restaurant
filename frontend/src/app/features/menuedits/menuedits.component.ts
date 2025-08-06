import { Component } from '@angular/core';
import { NavbarAdminComponent } from "../../components/navbar-admin/navbar-admin.component";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "../../components/footer/footer.component";
import { FoodsComponent } from "../../components/foods/foods.component";
import { FoodeditComponent } from "../../components/foodedit/foodedit.component";

@Component({
  selector: 'app-menuedits',
  standalone: true,
  imports: [NavbarAdminComponent, RouterModule, FooterComponent, FoodeditComponent],
  templateUrl: './menuedits.component.html',
  styleUrl: './menuedits.component.css'
})
export class MenueditsComponent {

}
