import { Component, OnInit} from '@angular/core';
import { ServiceService } from '../../../service.service';
import { NgZone } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {

  public groupname: any;
  public delflag = false;
  public listOfData:any[]=[]
  public searchmodulename: any;
  public addlinkflag = false;
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
  public attrList:any;

  public pdeviceid:any;
  public pdevicename:any;
 
  nodes = [
    {
      title: '设备管理',
      key: '4cb9f035-52c0-478f-86df-c4239a59561c',
      value:'4cb9f035-52c0-478f-86df-c4239a59561c',
      isLeaf: false,
      parentid: '4cb9f035-52c0-478f-86df-c4239a59561c',
    },
  ];
//  
public attrname=""
public condition=""
public value="";//触发值
public triggereddevicegroupid:any;
public triggereddeviceid=""
public triggeredmodulename=""
public triggeredattrname=""
public triggeredattrvalue=""
public triggeredmodulelist:any;
public triggeredmodelid:any;
public triggeredarrtlist:any;
public triggereddevicename:any;
  constructor(
    public service: ServiceService,
    public zone: NgZone,
    private route: ActivatedRoute,
    public router:Router,
    private message: NzMessageService
  ) {}

  async ngOnInit() {
    let temp:any[]=[]
    let demo:any[]=[]
    this.route.params.subscribe(async data=>{
      if(data['deviceid']!=undefined&&data['modulename']!=undefined&&data['modelid']!=undefined){
        this.deviceid=data['deviceid']
        this.modulename=data['modulename']
        this.modelid=data['modelid']
        this.pdeviceid=data['pdeviceid']
        this.pdevicename=data['pdevicename']
        this.attrList=await this.service.getAttr(this.modelid)
        for(let i=0;i<this.attrList.length;i++){
          temp.push(JSON.parse(JSON.stringify(await this.service.getAttrLinkList(this.deviceid,this.modulename,this.attrList[i].attr_name))))
        }
        for(let i=0;i<temp.length;i++){
          for(let j=0;j<temp[i].length;j++){
            demo.push(temp[i][j])
          }
        }
        this.listOfData=JSON.parse(JSON.stringify(demo))
      }
    });
  }
  nzEvent(event: NzFormatEmitEvent): void {
    const node = event.node;
    this.triggereddevicegroupid=node?.origin.key
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
      JSON.stringify(await this.service.getDeviceGroup(this.triggereddevicegroupid))
    );
    let devicedata=JSON.parse(JSON.stringify(await this.service.getDevice(this.triggereddevicegroupid)))
    
    return new Promise(async (resolve) => {
        let arr: any[] | PromiseLike<NzTreeNodeOptions[]> = [];
        if (data.length != 0) {
          for (let i = 0; i < data.length; i++) {
            arr.push(data[i]);
          }
          arr = this.service.formatGroupData(arr, this.parentname);
        }
        if(devicedata.length!=0){
          let temp=[]
          for(let i=0;i<devicedata.length;i++){
            temp.push(devicedata[i])
          }
          temp=this.service.formatDeviceData(temp)
          for(let i=0;i<temp.length;i++){
            arr.push(temp[i])
          }  
        }
        resolve(arr);
    });
  }
 async getModel(node:any){

    this.triggereddeviceid=node.origin.key;
    this.treeflag=false
    this.treetitle=node.origin.title
    this.triggereddevicename=node.origin.title;
    this.triggeredmodulelist=JSON.parse(JSON.stringify(await this.service.getModule(this.triggereddeviceid)))
  }
  async change(value:any){
    for(let i=0;i<this.triggeredmodulelist.length;i++){
      if(this.triggeredmodulelist[i].module_name==this.triggeredmodulename){
        this.triggeredmodelid=this.triggeredmodulelist[i].model_id;
      }
    }
    this.triggeredarrtlist=JSON.parse(JSON.stringify(await this.service.getAttr(this.triggeredmodelid)))
    
  }  
  async delsure() {
    console.log(this.condition);
    let temp:any[]=[]
    let demo:any[]=[]
     let data=JSON.parse(JSON.stringify(await this.service.delLink(this.deviceid,this.modulename,this.attrname,this.condition,this.value,this.triggereddeviceid,this.triggeredmodulename,this.triggeredattrname,this.triggeredattrvalue,this.triggereddevicename)))
     if(data['msg']=='success'){
       for(let i=0;i<this.attrList.length;i++){
        temp.push(JSON.parse(JSON.stringify(await this.service.getAttrLinkList(this.deviceid,this.modulename,this.attrList[i].attr_name))))
      }
      for(let i=0;i<temp.length;i++){
        for(let j=0;j<temp[i].length;j++){
          demo.push(temp[i][j])
        }
      }
      this.listOfData=JSON.parse(JSON.stringify(demo))
     }else{
      this.message.create('error', `删除联动失败`);
     }
    this.delflag = false;
  }
  hiddendel() {
    this.delflag = false;
  }
  async search() {
    this.listOfData=JSON.parse(JSON.stringify(await this.service.getAttrLinkList(this.deviceid,this.modulename,this.searchmodulename)))
    console.log(this.listOfData);
    
  }
  addlink() {
    this.addlinkflag = true;
    this.moduleflag = '添加模块';
    this.treetitle='';
    this.attrname='';
    this.condition='';
    this.value='';
    this.triggeredmodulename='';
    this.triggeredattrname='';
    this.triggeredattrvalue='';
    


  }
  async sureaddlink() {
    let temp:any[]=[]
    let demo:any[]=[]
    if(this.attrname!=''&&this.condition!=''&&this.value!=''&&this.treetitle!=''&&this.triggeredmodulename!=''&&this.triggeredattrname!=''&&this.triggeredattrvalue!=''){
      let data=JSON.parse(JSON.stringify(await this.service.addLink(this.deviceid,this.modulename,this.attrname,this.condition,this.value,this.triggereddeviceid,this.modulename,this.triggeredattrname,this.triggeredattrvalue,this.triggereddevicename)))
      if(data['msg']=='success'){
      
        // this.listOfData=JSON.parse(JSON.stringify(await this.service.getAttrLinkList(this.deviceid,this.modulename,this.attrname)))
        for(let i=0;i<this.attrList.length;i++){
          temp.push(JSON.parse(JSON.stringify(await this.service.getAttrLinkList(this.deviceid,this.modulename,this.attrList[i].attr_name))))
        }
        for(let i=0;i<temp.length;i++){
          for(let j=0;j<temp[i].length;j++){
            demo.push(temp[i][j])
          }
        }
        this.listOfData=JSON.parse(JSON.stringify(demo))
        console.log(this.listOfData);
        
        console.log(this.listOfData);
        
      }else{
        this.message.create('error', `添加联动失败`);
      }
      this.addlinkflag = false;
    }
  
  }
  cancleaddlink() {
    this.addlinkflag = false;
  }
  dellink(data: any) {
    this.isdeviceflag = '删除模块';
    this.delflag = true;
    this.attrname=data.from_attr_name;
    this.value=data.from_value;
    this.condition=data.condition
    this.triggeredattrname=data.to_attr_name;
    this.triggereddeviceid=data.to_device_id;
    this.triggeredmodulename=data.to_module_name;
    this.triggeredattrvalue=data.to_value;
    this.triggereddevicename=data.to_device_name
  }
  fnToDevice(){
    this.router.navigate(['/device', { pid: this.pdeviceid,pname:this.pdevicename}]);
  }
  fnToModule(){
    this.router.navigate(['/module', { deviceid: this.deviceid,devicename:this.pdevicename,groupid:this.pdeviceid,pname:this.pdevicename }]);

  }
}

