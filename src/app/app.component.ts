import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularTodo';
  list: Array<string> = [];

  ngOnInit() {
    localStorage.getItem("Todolist")?.split(',').forEach(item => this.add(item));
  }
  

  public saveData(): void {
    localStorage.setItem("Todolist", this.list.toString());
  }

  public add(item: string): void {
    if (!item) return;
    this.list.push(item);
    this.saveData();
  }

  public remove(item: string): void {
    (this.list.indexOf(item, 0) > -1) ? this.list.splice(this.list.indexOf(item, 0), 1) : console.error("Item nebyl nalezen.");
    this.saveData();

  }

}
