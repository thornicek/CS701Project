import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MealService } from '../meal.service'; 
import {MatFormFieldModule} from '@angular/material/form-field';

interface GoalCategory {
  code: string;
  description: string;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {


  title = 'Meal Plan Calculator';

  constructor(
    private mealService: MealService,
    ) {
   }

  ngOnInit() {
  
  }

}
