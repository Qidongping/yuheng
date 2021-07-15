import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {ServiceService} from '../../../service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-shadow',
  templateUrl: './shadow.component.html',
  styleUrls: ['./shadow.component.css']
})
export class ShadowComponent implements OnInit {
  public deviceid:any;
  public modulenameArr=[];
  public modulename:any;
  public listOfData:any;
  public groupid:any;
  public getDevice:any;
  public modelid:any;
  public modelname:any;
  public linklist:any[]=[]
  public link:any[]=[];
  public rw:any={}
  public pdevicename:any;
  public pdeviceid:any;
  constructor(private route: ActivatedRoute,public service:ServiceService,public router:Router) { }

  async ngOnInit() {
    this.route.params.subscribe(async data=>{
      this.deviceid=data['deviceid']
      this.modulenameArr=data['modulename'].split(',')
      this.groupid=data['groupid']
      this.pdeviceid=data['pdeviceid']
      this.pdevicename=data['pdevicename']
    })
    this.getDevice=JSON.parse(JSON.stringify(await this.service.getModule(this.deviceid)))
  }
  async getLink(data:any,i:any){
    this.linklist=[]
    this.modelid=data.model_id;
    this.modulename=data.module_name
    let attrs=JSON.parse(JSON.stringify(await this.service.getAttr(this.modelid)))
    let temp:any[]=[];
    for(let i=0;i<attrs.length;i++){
      temp.push(attrs[i].attr_name)
      this.rw[attrs[i].attr_name]=attrs[i].rw
    }
      let demo=JSON.parse(JSON.stringify(await this.service.getDeviceShadow(this.deviceid,this.modulename,temp)))
      for(let i in demo){
        demo[i]['Value']=Number(demo[i]['Value']).toFixed(2)
        this.linklist.push({attr_name:i,time:demo[i]['Time'],value:demo[i]['Value']})
      }
      this.getDevice[i].linklist=this.linklist
      console.log(this.getDevice);
  }
  fnToDevice(){
    this.router.navigate(['/device', { pid: this.pdeviceid,pname:this.pdevicename}]);
  }
  fnToModule(){
    this.router.navigate(['/module', { deviceid: this.deviceid,devicename:this.pdevicename,groupid:this.pdeviceid,pname:this.pdevicename }]);

  }
}
