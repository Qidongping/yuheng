import { Component, OnInit,Input,Output, SimpleChange } from '@angular/core';
import { ServiceService } from '../../../service.service';
import { NgZone } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {
 public getDeviceID:any;
  public groupname: any;
  public delflag = false;
  public listOfData: any;
  public searchmodulename: any;
  public addmoduleflag = false;
  public modelPID:any;
  public moduleflag: any;
  public isdeviceflag: any;
  public deviceid:any;
  public modulename:any;
  public modelid:any;
  public moduleid:any;
  public parentname:any;
  public devicename:any;
  public treeflag=false;
  public treetitle=""

  public arrtname:any;
  public attrid:any;
  public groupid:any;
  public pname:any;
  expandKeys = ['0-0'];
  value?: string;
  nodes = [
    {
      title: '数据模型',
      key: '4cb9f035-52c0-478f-86df-c4239a59561c',
      value:'4cb9f035-52c0-478f-86df-c4239a59561c',
      isLeaf: false,
      parentid: '4cb9f035-52c0-478f-86df-c4239a59561c',
    },
  ];

 public oldmodelid:any;
 public oldmodelname:any;
  constructor(
    public service: ServiceService,
    public zone: NgZone,
    private route: ActivatedRoute,
    public router:Router,
    private message: NzMessageService
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async data=>{
      
      if(data['deviceid']!=undefined&&data['devicename']!=undefined){
        this.deviceid=data['deviceid']
        this.devicename=data['devicename']
        this.groupid=data['groupid']
        console.log(this.groupid);
        this.pname=data['pname']
        this.listOfData = await this.service.getModule(this.deviceid);
      }else{
        this.listOfData=[]
      }
    });
  }
  nzEvent(event: NzFormatEmitEvent): void {
    const node = event.node;
    this.modelid=node?.origin.key;
    this.modelPID=node?.origin.parentid;
    if (node && node.getChildren().length === 0 && node.isExpanded) {
        this.loadNode().then((data) => {
          this.zone.run(() => {
            node.addChildren(data);
          });
        });
    }
  }
 
  tree(){
    this.treeflag=true
  }
  hiddentree(){
    this.treeflag=false
  }
  async loadNode(): Promise<NzTreeNodeOptions[]> {
    let data = JSON.parse(
      JSON.stringify(await this.service.getModelGroup(this.modelid))
    );
    let modeldata=JSON.parse(JSON.stringify(await this.service.getModel(this.modelid)))
    return new Promise(async (resolve) => {
        let arr: any[] | PromiseLike<NzTreeNodeOptions[]> = [];
        if (data.length != 0) {
          for (let i = 0; i < data.length; i++) {
            arr.push(data[i]);
          }
          arr = this.service.formatGroupData(arr, this.parentname);
        }
        if(modeldata.length!=0){
          let temp=[]
          for(let i=0;i<modeldata.length;i++){
            temp.push(modeldata[i])

          }
          temp=this.service.formatData(temp)
          for(let i=0;i<temp.length;i++){
            arr.push(temp[i])
          }
          
        }
        resolve(arr);
    });
  }
 
  getModel(node:any){
 
    this.modelid=node.origin.key;
    this.treeflag=false
    this.treetitle=node.origin.title
    
  }
 async ngOnChanges(changes:{[propKey:string]: SimpleChange}){
    if(this.deviceid!=undefined){
      this.listOfData = await this.service.getDevice(this.deviceid);
    }
    
  }  
  async delsure() {
     if (this.isdeviceflag == '删除模块') {
     let data=JSON.parse(JSON.stringify(await this.service.delModule(this.modulename,this.deviceid,this.modelid)))    
     if(data['msg']=='success'){
       this.listOfData=await this.service.getModule(this.deviceid)
     
     }else{
      this.message.create('error', `删除模块失败`);
     }
     
    }
    this.delflag = false;
  }
 
 
  hiddendel() {
    this.delflag = false;
  }
  search() {
    let temp = [];
    for (let i = 0; i < this.listOfData.length; i++) {
      if (this.searchmodulename == this.listOfData[i].module_name) {
        temp.push(this.listOfData[i]);
      }
    }
    this.listOfData = temp;
  }
  addmodule() {
    this.addmoduleflag = true;
    this.moduleflag = '添加模块';
    this.modulename=""
    this.modelid=""
    this.treetitle=""
  }
  async sureaddmodule() {
    if (this.moduleflag == '添加模块') {
      if(this.modulename!=""&&this.treetitle!=""){
        let data=JSON.parse(JSON.stringify(await this.service.postModule(this.modulename,this.deviceid,this.modelid)))
        if(data['msg']=='success'){
          this.listOfData = await this.service.getModule(this.deviceid);
        }else{
          this.message.create('error', `添加模块失败`);
        }
        this.addmoduleflag = false;
      }
    } else if (this.moduleflag == '编辑模块') {
      if(this.modulename!=""&&this.treetitle!=""){
        let data=JSON.parse(JSON.stringify(await this.service.putModule(this.modulename,this.deviceid,this.modelid)))
        if(data['msg']=='success'){

          await this.service.delModule(this.oldmodelname,this.deviceid,this.oldmodelid)
          await this.service.postModule(this.modulename,this.deviceid,this.modelid)
          this.listOfData = await this.service.getModule(this.deviceid);
        }else{
          this.message.create('error', `编辑模块失败`);
        }
        this.addmoduleflag = false;
      }
    }
  }
  cancleadddevice() {
    this.addmoduleflag = false;
  }
  async editmodule(data: any) {
    this.moduleflag = '编辑模块';
    this.addmoduleflag = true;
    this.deviceid = data.device_id;
    this.modelid=data.model_id;
    this.modulename=data.module_name;
    this.oldmodelid=data.model_id;
    this.oldmodelname=data.module_name;
    this.treetitle= await this.getModelName(this.modelid)
    
  }
  delmodel(data: any) {
    this.isdeviceflag = '删除模块';
    this.delflag = true;
    this.deviceid = data.device_id;
    this.modelid=data.model_id;
    this.modulename = data.module_name;
    
  }
  // 查看设备详情
  async getdevicecon(value:any){

    this.deviceid=value.device_id;
    let data=await this.service.getDeviceCon(this.deviceid)
    
  }
  async getModule(value:any){
    this.deviceid=value.device_id;
    this.router.navigate(['/module', { deviceid: this.deviceid }]);
  }
   async getModelName(modelid:any){
    let data=JSON.parse(JSON.stringify( await this.service.getModelCon(modelid)))
    let name=data.model_name
    return name
  }
  devicelink(data:any){
    this.moduleflag='设备联动'
    console.log(data);
    
    this.router.navigate(['/link', { deviceid:data.device_id,modulename:data.module_name,modelid:data.model_id,pdeviceid:this.groupid,pdevicename:this.pname}]);
  }
  getShdow(){
    // 
    console.log(this.listOfData);
    let temp=[];
    for(let i=0;i<this.listOfData.length;i++){
      temp.push(this.listOfData[i].module_name)
    }

    this.router.navigate(['/shadow',{deviceid:this.deviceid,modulename:temp,groupid:this.groupid,pdeviceid:this.groupid,pdevicename:this.pname}])
  }
  fnToDevice(){
    this.router.navigate(['/device',{ pid: this.groupid,pname:this.pname}])
  }
}
