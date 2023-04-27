import { Component } from '@angular/core';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  properties!: Property[];
  constructor(private appService: AppServiceService) { }

  ngOnInit(): void {

    this.appService.getAllProperties().subscribe(data => {

      console.log(data);
      this.properties = data;
    })


  }

}

interface Property{
  id: number;
  address: string;
  type: string;
  description: string;
  taxAmount: number;
  taxStatus: boolean;
  propertyOwner: PropertyOwner;


}

interface PropertyOwner{

  id: number;
  firstName: string;
  lastName: string;

}
