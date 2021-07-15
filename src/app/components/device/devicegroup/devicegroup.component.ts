import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { ServiceService } from '../../../service.service';
import {
  NzContextMenuService,
  NzDropdownMenuComponent,
} from 'ng-zorro-antd/dropdown';
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd/tree';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-devicegroup',
  templateUrl: './devicegroup.component.html',
  styleUrls: ['./devicegroup.component.css'],
})
export class DevicegroupComponent implements OnInit {
  @Output('addDeviceGroup') addDeviceGroup = new EventEmitter();
  @Input() addflag = false;
  @Output('delDeviceGroup') delDeviceGroup = new EventEmitter();
  @Input() delflag = false;
  @Input() issure=false;
  @Output('issureChange') issureChange=new EventEmitter();
  public devicegrouplist: any;
  public activatedNode?: NzTreeNode;
  public parentid: any;
  public groupid: any;
  public groupname: any;
  public node: any;
  public flag: any;
  public parentname: any;
  public nodes = [
    {
      title: '设备管理',
      key: '4cb9f035-52c0-478f-86df-c4239a59561c',
      isLeaf: false,
      parentid: '4cb9f035-52c0-478f-86df-c4239a59561c',
    },
  ];
  public listOfData: any;
  public devicegroupid: any;
  public searchdevicename: any;
  public history: any;
  public adddeviceflag = false;
  public devicename: any;
  public protocolname: any;
  public protocolList: any;
  public devicepsd: any;
  public deviceflag: any;
  public deviceid: any;
  public isdeviceflag: any;
  constructor(
    public service: ServiceService,
    private nzContextMenuService: NzContextMenuService,
    public zone: NgZone,
    public router: Router
  ) {}

  async ngOnInit() {
    this.devicegrouplist = await this.service.getDeviceGroup(
      '4cb9f035-52c0-478f-86df-c4239a59561c'
    );
    this.protocolList = await this.service.getArgumentsList();
  }
  ngOnChanges() {
    if (this.issure === true) {
      if (this.node != undefined) {
        if (this.flag == '添加分组') {
        
          this.node.clearChildren();
          this.loadNode().then((data) => {
            let test = JSON.parse(JSON.stringify(data));
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
  async getDevice(node: any) {
    this.devicegroupid = node.key;
    this.router.navigate(['/device', { pid: this.devicegroupid,pname:node.title}]);
  }
  async nzEvent(event: NzFormatEmitEvent) {
    if (event.node != null) {
      this.groupid = event.node.key;
    }
    this.node = event.node;
    this.parentname = this.node.origin.title;
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
  async loadNode(): Promise<NzTreeNodeOptions[]> {
    return new Promise(async (resolve) => {
      let data = JSON.parse(
        JSON.stringify(await this.service.getDeviceGroup(this.groupid))
      );
      let arr: any[] | PromiseLike<NzTreeNodeOptions[]> = [];
      if (data.length != 0) {
        for (let i = 0; i < data.length; i++) {
          arr.push(data[i]);
        }
        arr = this.service.formatGroupData(arr, this.parentname);
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
    this.groupid = node.origin.key;
    this.parentid = node.origin.parentid;
    this.node = node;
  }

  addDropdown() {
    this.addflag = true;
    this.flag = '添加分组';
    this.groupname = '';
    this.issure=false
    this.issureChange.emit(this.issure)
    console.log(this.parentid);

    this.addDeviceGroup.emit([
      this.addflag,
      this.parentid,
      this.flag,
      this.groupid,
      this.groupname,
      '设备管理',
      this.issure
    ]);
  }
  hiddenadd() {
    this.addflag = false;
  }
  
  editDropdown() {
    this.flag = '编辑分组';
  
    this.issure=false
    if(this.groupname!='设备管理'){
      this.addflag = true;
    }
    this.issureChange.emit(this.issure)
    this.addDeviceGroup.emit([
      this.addflag,
      this.parentid,
      this.flag,
      this.groupid,
      this.groupname,
      '设备管理',
      this.issure
    ]);
  }
  delDropdown() {
    this.flag = '删除分组';
    
    if(this.groupname!='设备管理'){
      this.delflag = true;
    }
    this.issure=false
    this.issureChange.emit(this.issure)
    this.isdeviceflag = '删除分组';
    this.delDeviceGroup.emit([
      this.delflag,
      this.groupid,
      this.parentid,
      this.groupname,
      '设备管理',
      this.issure
    ]);
  }
  hiddendel() {
    this.delflag = false;
  }
 
}
