import { Component, OnInit } from '@angular/core';
import { ProviderService } from './services/provider.service';
import { ITaskList, ITask } from './models/models';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public taskLists:ITaskList[] = [];
  public tasks:ITask[]=[];
  public name: any = '';

  constructor(private provider: ProviderService) { }

  ngOnInit() {
    this.provider.getTaskLists().then(res => {
      this.taskLists=res;
    });
  }

  getTaskOfList(taskList: ITaskList){
    this.provider.getTasks(taskList.id).then(res=>{
      this.tasks = res;
    })
  }

  createTaskList() {
    if (this.name !== '') {
      this.provider.createTaskList(this.name).then(res => {
        this.name = '';
        this.taskLists.push(res);
        alert(res.name + ' is created');
      });
    }
  }

  deleteTaskList(t: ITaskList) {
    this.provider.deleteTaskList(t.id).then(res => {
      this.provider.getTaskLists().then(r => {
        this.taskLists = r;
      });
    });
  }

  updateTaskList(t: ITaskList) {
    this.provider.updateTaskList(t).then(res => {
      alert(t.name + ' is updated');
    });
  }


}
