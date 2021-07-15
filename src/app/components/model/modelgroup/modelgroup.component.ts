import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { ServiceService } from '../../../service.service';
import {
  NzContextMenuService,
  NzDropdownMenuComponent,
} from 'ng-zorro-antd/dropdown';
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd/tree';
import { NgZone } from '@angular/core';
import { Router} from '@angular/router' 
@Component({
  selector: 'app-modelgroup',
  templateUrl: './modelgroup.component.html',
  styleUrls: ['./modelgroup.component.css']
})
export class ModelgroupComponent implements OnInit {
  @Output('addModelGroup') addModelGroup = new EventEmitter();
  @Input() addflag = false;
  @Output('delModelGroup') delModelGroup=new EventEmitter();
  @Input()  delflag = false;
  @Input() issure=false;
  @Output('issureChange') issureChange=new EventEmitter();
  public modelgrouplist: any;
  public activatedNode?: NzTreeNode;
  public parentid: any;
  public groupid: any;
  public groupname: any;
  public node: any;
  public flag: any;
  public parentname: any;
  public modelpid='4cb9f035-52c0-478f-86df-c4239a59561c'
  public devicepid='4cb9f035-52c0-478f-86df-c4239a59561c'
  public nodes = [
    {
      title: '数据模型',
      key: '数据模型',
      isLeaf: false,
      parentid: '4cb9f035-52c0-478f-86df-c4239a59561c',
      ancestors:'数据模型',
      id:this.modelpid,
    },
    {
      title: '设备管理',
      key: '设备管理',
      isLeaf: false,
      parentid: '4cb9f035-52c0-478f-86df-c4239a59561c',
      ancestors:'设备管理',
      id:this.devicepid
    },
   
  ];
  public nodearr = [];
  public groupData: any;
  public listOfData: any;
  public modelgroupid: any;
  public searchmodelname: any;
  public history: any;
  public addmodelflag = false;
  public modelname: any;
  public protocolname: any;
  public modelpsd: any;
  public modelflag: any;
  public modelid: any;
  public ismodelflag: any;
  public title:any;
  constructor(
    public service: ServiceService,
    private nzContextMenuService: NzContextMenuService,
    public zone: NgZone,
    public router:Router
  ) {}

  async ngOnInit() {
    this.modelgrouplist = await this.service.getModelGroup(
      '4cb9f035-52c0-478f-86df-c4239a59561c'
    );
  }
  ngOnChanges() {
    if(this.addflag==false){
    if (this.node != undefined) {
      if (this.flag == '添加分组') {
        this.node.clearChildren();
        this.loadNode().then((data) => {
          let test = JSON.parse(JSON.stringify(data));
          console.log(test);

          this.node.addChildren(test);
        });
      } else if (this.flag == '编辑分组') {
        this.groupid = this.parentid;
        if (this.node != undefined) {
          this.node.parentNode.clearChildren();
          this.loadNode().then((data) => {
            let test = JSON.parse(JSON.stringify(data));
            this.node.parentNode.addChildren(test);
          });
        }
      }else if(this.flag=='删除分组'){
        this.groupid = this.parentid;
        if (this.node != undefined) {
          this.node.parentNode.clearChildren();
          this.loadNode().then((data) => {
            let test = JSON.parse(JSON.stringify(data));
            this.node.parentNode.addChildren(test);
          });
        }
      }
    }
    }
  }
  async getModel(node: any) {
    this.title=node.origin.ancestors;
    if(this.title=='数据模型'){
      this.modelgroupid = node.origin.id;
      this.router.navigate(['/model',{modelid:this.modelgroupid,modelgroupname:node.title}])
    }else if(this.title=='设备管理'){
      this.router.navigate(['/device', { pid: node.origin.id,pname:node.title}]);
    }
  }
  async nzEvent(event: NzFormatEmitEvent) {
    if (event.node != null) {
      this.groupid = event.node.origin.id;
      this.title=event.node.origin.ancestors
    }
    this.node = event.node;
    this.parentname=this.node.origin.title
    if(this.title=='数据模型'){
      if (event.eventName === 'expand') {
        if (this.node?.getChildren().length === 0 && this.node?.isExpanded) {
          this.loadNode().then((data) => {
            this.zone.run(() => {
              this.node.addChildren(data);
            });
          });
        }
      }
    }else if(this.title=='设备管理'){
      if (event.eventName === 'expand') {
        if (this.node?.getChildren().length === 0 && this.node?.isExpanded) {
          this.loadNode().then((data) => {
            this.zone.run(() => {
              this.node.addChildren(data);
            });
          });
        }
      }
    }
    
  }
  async loadNode(): Promise<NzTreeNodeOptions[]> {
    return new Promise(async (resolve) => {
      let data:any;
      if(this.title=='数据模型'){
        data = JSON.parse(
          JSON.stringify(await this.service.getModelGroup(this.groupid))
        );
      }else if(this.title=='设备管理'){
        data = JSON.parse(
          JSON.stringify(await this.service.getDeviceGroup(this.groupid))
        );
      }
      let arr: any[] | PromiseLike<NzTreeNodeOptions[]> = [];
      if (data.length != 0) {
        for (let i = 0; i < data.length; i++) {
          arr.push(data[i]);
        }
        arr = this.service.formatGroupData(arr,this.title);
        resolve(arr);
      }
      resolve([]);
    });
  }
  openFolder(data: NzTreeNode | NzFormatEmitEvent): void {
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      const node = data.node;
      if (node) {
        node.isExpanded = !node.isExpanded;
      }
    }
  }

  activeNode(data: NzFormatEmitEvent): void {
    this.activatedNode = data.node!;
  }

  async contextMenu(
    $event: MouseEvent,
    menu: NzDropdownMenuComponent,
    node: any
  ) {
    this.nzContextMenuService.create($event, menu);
    this.groupname = node.origin.title;
    this.groupid = node.origin.id;
    this.parentid = node.origin.parentid;
    this.node = node;
    this.title=node.origin.ancestors;
  }

  addDropdown() {
    this.addflag = true;
    this.flag = '添加分组';
    this.groupname=""
    if(this.title=='数据模型'){
      this.addModelGroup.emit([
        this.addflag,
        this.parentid,
        this.flag,
        this.groupid,
        this.groupname,
        '数据模型'
      ]);
    }else if(this.title=='设备管理'){
      this.addModelGroup.emit([
        this.addflag,
        this.parentid,
        this.flag,
        this.groupid,
        this.groupname,
        '设备管理'
      ]);
    }
   
  }
  hiddenadd() {
    this.addflag = false;
  }
  
  editDropdown() {
    this.flag = '编辑分组';
    if(this.title=='数据模型'){
      if(this.groupname!='数据模型'){
        this.addflag = true;
      }
      this.addModelGroup.emit([
        this.addflag,
        this.parentid,
        this.flag,
        this.groupid,
        this.groupname,
        '数据模型'
      ]);
    }else if(this.title=='设备管理'){
      if(this.groupname!='设备管理'){
        this.addflag = true;
      }
      this.addModelGroup.emit([
        this.addflag,
        this.parentid,
        this.flag,
        this.groupid,
        this.groupname,
        '设备管理'
      ]);
    }
    
  }
  delDropdown() {
    this.flag = '删除分组';
    if(this.title=='数据模型'){
      if(this.groupname!='数据模型'){
        this.delflag = true;
        this.ismodelflag = '删除分组';
      }
      this.delModelGroup.emit([this.delflag,this.groupid,this.parentid,this.groupname,'数据模型'])
    }else if(this.title=='设备管理'){
      if(this.groupname!='设备管理'){
        this.delflag = true;
        this.ismodelflag = '删除分组';
      }
      this.delModelGroup.emit([this.delflag,this.groupid,this.parentid,this.groupname,'设备管理'])
    }
  }
 
  hiddendel() {
    this.delflag = true;
  }

}

