## service结构

```typescript
import { Injectable } from '@angular/core';
import { HttpUtil } from '../../../until/httpUtil';

@Injectable()
export class ComplianceHomeService {
    constructor(
        private httpUtil: HttpUtil
    ) { }

    // 合规首页菜单列表
    getMenuList(params, callback) {
        return this.httpUtil.post('tmp/complicanceHome/getMenuList', params, callback);
    }

    // 便捷中心列表
    convenceList(params, callback) {
        return this.httpUtil.post('tmp/complicanceHome/convenceList', params, callback);
    }

    // 添加便捷网址
    addConvence(params, callback) {
        return this.httpUtil.post('tmp/complicanceHome/addConvence', params, callback);
    }
    
    // 搜索
    searchList(params, callback) {
        return this.httpUtil.post('tmp/complicanceHome/searchList', params, callback);
    }

    // 上传图片
    uploadFile(params, callback) {
        return this.httpUtil.post(`common/uploadFile`, params, callback, false, true);
    }

    // 获取图片
    downloadFile(id, fileName) {
        return this.httpUtil.get(`common/downloadFile/${fileName}?id=${id}`);
    }
}

```



## module结构

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';

import { SharedModule } from '../../share/shared.module';

// 服务
import { ComplianceHomeService } from './services/compliance_home.services';
import { ShareFunctionService } from '../../share/services/share_function';

// 组件
import { complianceHomePage } from './pages/compliance_home/complianceHome.component';
import { drawerMsgPage } from './pages/drawer_msg/drawerMsg.component'

export const routes: Routes = [
  {
    path: 'home',
    component: complianceHomePage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    NgZorroAntdModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    TableModule,
    MultiSelectModule
  ],
  declarations: [
    complianceHomePage,
    drawerMsgPage
  ],
  entryComponents: [
    complianceHomePage
  ],
  exports: [
    complianceHomePage,
    drawerMsgPage
  ],
  providers: [
    ComplianceHomeService,
    ShareFunctionService
  ]
})

export class ComplianceHomeModule {}

```

<ClientOnly>
  <Valine></Valine>
</ClientOnly>