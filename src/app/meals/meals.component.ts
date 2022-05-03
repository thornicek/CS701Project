import { Component, OnInit } from '@angular/core';
// import the meal interface
import { Meal } from '../meal';
// import mock meals
import { MealService } from '../meal.service';
import { PLANNED } from '../mock-meals';
// import Drag and Drop
import {CdkDragDrop, moveItemInArray,copyArrayItem} from '@angular/cdk/drag-drop';
import { Location } from '@angular/common';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {
  
  sum;

 // Save data to local storage 
 saveData(){
   localStorage.setItem('totalCalories', this.sum);
 }

// retreive data from local storage 
getData(){
  return localStorage.getItem('totalCalories');
}



// remove data from local storage
removeData(){
  localStorage.removeItem('totalCalories');
}
  event;
  // Drag and Drop
  drop(event) {
    
    var calories = event.previousContainer.data[event.previousIndex]['calories'];
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if (event.container.id === 'planned') {
        copyArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
          this.getTotal(calories);
         
         
      } else {
        this.planned.splice(event.previousIndex, 1);
        this.getTotal(calories);
        // this.getNegativeTotal(calories);
      }
      
    
  }

 // helper function to calculate the total calories in a Meal Plan
getTotal(calories){
   this.sum = this.planned.reduce((sum, current) => sum + current.calories, 0);
   this.saveData();
   return this.sum;
}

// reset drag positions
// reset(){
//   this.removeData(); 
//    this.event._dragRef.reset();
  
// }
  
  // initialize array for the target drop location
  planned = PLANNED;

  // expose Meals array for binding
  meals: Meal[] = [];

  getMeals(): void {
    this.mealService.getMeals()
    .subscribe(meals => this.meals = meals);
  }

  goBack(): void {
    this.location.back();
  }

  delete(meal: Meal): void {
    this.meals = this.meals.filter(m => m !== meal);
    this.mealService.deleteMeal(meal.id).subscribe();
  }
  


 ngOnInit(): void {
  this.getMeals();
}

  constructor(
    private mealService: MealService,
    private location: Location) { }

 

}
