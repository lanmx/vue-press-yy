有些表格需要合并相同字段，分组显示

```js
/**
 * 合并表格逻辑处理
 * @param table 表格数据
 * @param objKey 合并唯一的字段key
 * @returns 处理好的数据
 */
  tableFiter(table,objKey) {
  // 转成数组父子的格式
  let list = [];
  _.forEach(_.groupBy(table, objKey), (item, key) => {
    list.push({ key, child: [...item] });
  })
  return list;
}
```

![image-20230207144159990](@alias/image-20230207144159990.png)

HTML

```html
<tbody>
    <ng-container *ngFor="let data of tableData">
        <tr *ngFor="let item of data['child'];let j = index;">
            <td *ngIf="j === 0" [attr.rowspan]="j === 0 ? data['child'].length : 1" style="text-align: center;">{{item.vc_user}}</td>
            <td>{{item.vc_fund_code}}</td>
            <td>{{item.vc_fund_name}}</td>
            <td>{{item.l_quantity}}</td>
            <td>{{item.l_no}}</td>
            <td>{{item.l_report_year}}</td>
            <td *ngIf="j === 0" [attr.rowspan]="j === 0 ? data['child'].length : 1"  style="text-align: center;"
                [ngClass]="{'bn-orange': item.vc_state === '1','bn-green': item.vc_state === '2'}" (click)="sendModal(item)">
                <button nz-button nzType="primary"><img class="bn-img" src="assets/images/trustee_email/button.png" alt="">发送</button>
            </td>
        </tr>
    </ng-container>
</tbody>
```

