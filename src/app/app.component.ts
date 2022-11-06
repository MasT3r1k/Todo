import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { setCookies, getCookies, deleteCookies } from './cookie';

interface Item {
  text: string;
}

interface Category {
  name: string;
  items: Array<string>;
  titleFocused?: boolean;
  options?: Array<Item>;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {



  categories: Array<Category> = [];

  ngOnInit() {
    this.loadCategories()
   }

  public loadCategories()
  {
    try {
      getCookies<Array<Category>>("Todolist")?.forEach(category => {
        this.create(category.name, category.items);
      })
    } catch(e) {
      console.log(e);
    }
  }

  public saveData(): void {
    setCookies<Array<Category>>("Todolist", this.categories);
  }

  

  public create(category: string, items?: Array<string>): void { // create category
    this.categories.push({ name: category, items: items || []});
    this.saveData();
  }

  public add(id: number, text: string): void { // add item to category
    if (id === undefined && !text) return;

    setTimeout(() => { /* Wait to save value of textarea into this.categories */
      if (this.categories[id].items[0] == "") return; // Bypass to generate infinity items
      this.categories[id].items.unshift(text);
      this.saveData();
    }, 1)
  }

  public renameCategory(i: number, event: any) {
    this.categories[i].name = event.target.value;
    this.saveData();
  }

  public editValue(i: number, item: number, event: any) {
    console.log(item)
    this.categories[i].items[item] = event.target.value;
    console.log(this.categories[i].items)

    this.saveData();
  }




  public remove(category: number, item?: number): void {
    if (!item) this.categories.splice(category, 1);
    if (item) this.categories[category].items.splice(item - 1, 1);
    this.saveData()
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }


}
