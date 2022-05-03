import { Component, OnInit, Input } from '@angular/core';
import { Meal } from '../meal';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MealService } from '../meal.service'; 

@Component({
  selector: 'app-edit-meals',
  templateUrl: './edit-meals.component.html',
  styleUrls: ['./edit-meals.component.css']
})
export class EditMealsComponent implements OnInit {

  @Input() meal?: Meal;

  

  constructor(
    private route: ActivatedRoute,
    private mealService: MealService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getMeal();
  }

  save(): void {
    if (this.meal) {
      this.mealService.updateMeal(this.meal)
        .subscribe(() => this.goBack());
    }
  }

  



  // get meal by id
  getMeal(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.mealService.getMeal(id)
      .subscribe(meal => this.meal = meal);
  }
  // return to previous page
  goBack(): void {
    this.location.back();
  }
}
