

import { Component, OnInit,Input,Output, SimpleChange } from '@angular/core';
import { ServiceService } from '../../../service.service';
import { NgZone } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {
  public modelgroupid:any;
  public delflag = false;
  public searchmodelname:any;
  public listOfData: any;

  public addmodelflag = false;
  public modelname: any;
 
 
  public modelflag: any;
  public modelid: any;
  public ismodelflag: any;
  public modelgroupname:any;
  public removeflag:any;
  public treetitle:any;
  public removegroupmodelid:any
  public treeflag=false
  public nodes = [
    {
      title: '数据模型',
      key: '4cb9f035-52c0-478f-86df-c4239a59561c',
      value:'4cb9f035-52c0-478f-86df-c4239a59561c',
      isLeaf: false,
      parentid: '4cb9f035-52c0-478f-86df-c4239a59561c',
    },
  ];
  constructor(
    public service: ServiceService,
    public zone: NgZone,
    private route: ActivatedRoute,
    public router:Router,
    private message: NzMessageService
  ) {}

  async ngOnInit() {
   
   
    this.route.params.subscribe(async data=>{
      
      this.modelgroupid=data['modelid']
      this.modelgroupname=data['modelgroupname']
      this.listOfData = await this.service.getModel(this.modelgroupid);
      console.log(this.listOfData);
      
    });
  }
 async ngOnChanges(changes:{[propKey:string]: SimpleChange}){
    if(this.modelgroupid!=undefined){
      this.listOfData = await this.service.getDevice(this.modelgroupid);
    }
    
  }  
  async delsure() {
     if (this.ismodelflag == '删除模型') {
     let data=JSON.parse(JSON.stringify(await this.service.delModel(this.modelid,this.modelname,this.modelgroupid)))
    
    //  console.log(data);
     if(data['msg']=='success'){
      this.listOfData = await this.service.getModel(this.modelgroupid);
      //  alert('删除模型成功')
     }else{
      this.message.create('error', `删除模型失败`);
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
      if (this.searchmodelname == this.listOfData[i].model_name) {
        temp.push(this.listOfData[i]);
      }
    }
    this.listOfData = temp;
  }
  addmodel() {
    this.addmodelflag = true;
    this.modelflag = '添加模型';
    this.modelname=""
    
    
  }
  async sureaddmodel() {
    if (this.modelflag == '添加模型') {
      if(this.modelname!=''){
        let data=JSON.parse(JSON.stringify(await this.service.postModel(this.modelname,this.modelgroupid)))
        if(data['msg']=='success'){
          this.listOfData = await this.service.getModel(this.modelgroupid);
        }else{
          this.message.create('error', `添加模型失败`);
        }
        this.addmodelflag = false;
      }
    } else if (this.modelflag == '编辑模型') {
      if(this.modelname!=""){
        let data=JSON.parse(JSON.stringify(await this.service.putModel(this.modelid,this.modelname,this.modelgroupid)))
        if(data['msg']=='success'){
          this.listOfData=await this.service.getModel(this.modelgroupid)
        }else{
          this.message.create('error', `编辑模型失败`);
        }
        this.addmodelflag = false;
      }
    }
  }
  cancleaddmodel() {
    this.addmodelflag = false;
  }
  editmodel(data: any) {
    console.log(data);
    
    this.modelflag = '编辑模型';
    this.addmodelflag = true;
    this.modelid = data.model_id;
    
    this.modelname = data.model_name;
   
  }
  delmodel(data: any) {
    this.ismodelflag = '删除模型';
    this.delflag = true;
    this.modelid = data.model_id;
    this.modelname = data.model_name;
  }
  // 查看设备详情
  async getdevicecon(value:any){

    this.modelid=value.device_id;
    let data=await this.service.getDeviceCon(this.modelid)
    
  }
  async getAttr(value:any){
    this.modelid=value.model_id;
    this.router.navigate(['/attr', { modelid: this.modelid,pmodelid:this.modelgroupid,pmodelname:this.modelgroupname }]);
  }
  removemodel(data:any){
    this.removeflag=true;
    this.modelid=data.model_id;
    this.modelname=data.model_name;
   this.treetitle=this.modelgroupname
   this.removegroupmodelid=data.group_id;
   
  }
 
  removedevice(data:any){
    this.removeflag=true;
    this.modelid=data.model_id;
    this.modelname=data.model_name;
   this.treetitle=this.modelgroupname
  }
  cancleremovedevice(){
    this.removeflag=false;
  }
  async sureremovedevice(){
    // if(this.modelgroupid!=this.removegroupmodelid){
      let data=JSON.parse(JSON.stringify(await this.service.putModel(this.modelid,this.modelname,this.removegroupmodelid)))
      if(data['msg']=='success'){
        this.listOfData = await this.service.getModel(this.modelgroupid);
        this.removeflag=false
      }else{
        this.message.create('error', `移动模型失败`);
      }
      
    // }
  }
  tree(){
    this.treeflag=true
  }
  hiddentree(){
    this.treeflag=false
  }
  nzEvent(event: NzFormatEmitEvent): void {
    const node = event.node;
    this.removegroupmodelid=node?.key;
    if (node && node.getChildren().length === 0 && node.isExpanded) {
        this.loadNode().then((data) => {
          this.zone.run(() => {
            node.addChildren(data);
          });
        });
    }
  }
  async loadNode(): Promise<NzTreeNodeOptions[]> {
    let data = JSON.parse(
      JSON.stringify(await this.service.getModelGroup(this.removegroupmodelid))
    );
    return new Promise(async (resolve) => {
        let arr: any[] | PromiseLike<NzTreeNodeOptions[]> = [];
        if (data.length != 0) {
          for (let i = 0; i < data.length; i++) {
            arr.push(data[i]);
          }
          arr = this.service.formatGroupData(arr, "");
        }
        resolve(arr);
    });
  }
  getDeviceGroup(node:any){
    this.treeflag=false
    this.removegroupmodelid=node.key;
    this.treetitle=node.title
  }
}