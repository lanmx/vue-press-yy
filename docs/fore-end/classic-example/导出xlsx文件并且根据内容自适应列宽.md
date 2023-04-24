# 导出xlsx文件并且根据内容自适应列宽

## 一、实现逻辑

```ts
  /**
   * 前端导出EXCEL功能,导出文件已实现列宽自适应功能
   * @param table {any} 需要导出的对象数组
   * @param title {Array} 列头 {field: 'name', name: '标题'}
   * @param excludeColumn {Array<string>} 需要排除导出的列,传列字段
   * @param expFileName 自定义文件名
   * @param isdownload true下载附件，false则不下载附件，只是生成字节流作为参数传递给后端
   */
   exportData(table: any, title: any, excludeColumn: Array<string>, expFileName: string, isdownload: boolean) {
    if (table.length === 0) {
      this.message.error(`没有数据，无需导出！`);
      return;
    }
    try {
      // 排除标题包含的列
      if (excludeColumn.length > 0) {
        table.forEach((v) => {
          excludeColumn.forEach(col => {
            delete v[col];
          });
        });
      }
      const wb = { SheetNames: [`sheet1`], Sheets: {} };
      const ws = XLSX.utils.json_to_sheet(table);
      console.log(ws,"ws");
      const exportTitle = title.filter(item => !excludeColumn.includes(item.en))
      exportTitle.forEach(item => {
        for(const row in ws) {
          if(ws[row]['v']=== item.en) {
            ws[row]['v'] = item.title
          }
        }
      });
      // 导出列宽根据内容长度自适应
      ws["!cols"] = adaptCeilWidth(exportTitle, table, ws)
      console.log(ws,"Sheet");
      wb.Sheets[wb.SheetNames.join()] = ws;
      const wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary'
      });
      // 如果是下载文件，则下载文件
      if(isdownload) {
        saveAs(new Blob([s2ab(wbout)],{ type: 'application/octet-stream' }), expFileName);
        this.message.success('下载文件成功！');
      } else {
        // 如果是传参，则把Blob文件对象转换为base64
        this.getBase64(s2ab(wbout)).then((binary: string) => {
          if(binary) {
            binary = binary.replace('data:application/octet-stream;base64,','')
          }
          this.byteStream = {
            "FileType":"bytes",
            "FileName": `${expFileName}.xlsx`,
            "Bytes": binary
          }
          this.isDel = false
        })
      }
      this.message.success('下载文件成功！');
    } catch (e) {
      this.message.error(`下载文件失败！原因：${e}`);
    }
    /**
     * 前端导出EXCEL方法-转换为二进制流
     * @param s XLSX.write() 后生成的数据
     */
     function s2ab(s) {
      if (typeof ArrayBuffer !== 'undefined') {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) {
          view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
      } else {
        const buf = new Array(s.length);
        for (let i = 0; i < s.length; i++) {
          buf[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
      }
    }
    /**
     * 前端导出EXCEL方法 - 生成下载
     * @param obj 文件对象
     * @param fileName 文件名
     */
    function saveAs(obj, fileName) {
      const links = document.createElement('a');
      links.download = `${fileName}.xlsx`;
      links.href = URL.createObjectURL(obj);
      links.style.visibility = 'hidden';
      document.body.appendChild(links);
      links.click();
      document.body.removeChild(links);
    }
    
    // 二进制流转换为base64
    function getBase64(data) {
      const blob = new Blob([data]);
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      );
  	}

    /**获取最大列宽 */
    function getCellWidth(value) {
      if(value == null || value == undefined) {
        return 10
      } else if(/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
        const chineseLength = value.match(/[\u4e00-\u9fa5]/g).length;
        const otherLength = value.length - chineseLength
        return (chineseLength * 2.1 + otherLength * 1.1).toFixed(2)
      } else {
        return (value.toString().length * 1.1).toFixed(2)
      }
    }

    // 自定义导出xlsx列宽
    function adaptCeilWidth(exportTitle, table, ws) {
      let colWidths = []
      _.forEach(exportTitle, (item) => {
        colWidths.push([])
      })
      // 最多列宽为13个
      const letter = ['A','B','C','D','E','F','G','H','I','J','K','L','M']
      // 定义每列index
      let index = 0;
      // 定义每列数量，每循环一个数据+1
      let num = 1;
      // 获取表格循环次数，这里要多两层循环，判断每列循环到最后没有值的情况
      let total = exportTitle.length * (table.length + 2)
      for(let i=0; i<total; i++) {
        if(ws[letter[index] + num]) {
          colWidths[index].push(getCellWidth(ws[letter[index] + num]['v']))
          num++
        } else {
          // 判断每列循环到最后没有值的情况
          num = 1  // 重置每列第一个数据
          index++  // 切换到下一列，继续循环
        }
      }
      // 获取最大列宽长度
      const maxWidths = colWidths.map(item => {
        return item.length > 0 ? { wch: Math.max(...item) }  : { wch: 10 }
      })
      return maxWidths
    }
  }
```



## 二、下载xlsx模板（仅仅下载功能）

```ts
  /**
   * 下载EXCEL模板
   * @param head <Array> 列标题,一维数组
   * @param fileName 下载文件名
   * @param sheetName sheet表名
   */
  exportTemplate(head: Array<string>, fileName: string, sheetName: string) {
    try {
      const data = []
      const row = {}
      _.forEach(head, (h) => {
        row[h] = ''
      })
      data.push(row)
      const ws = XLSX.utils.json_to_sheet(data)
      // 新建book
      const wb = XLSX.utils.book_new()
      // 生成xlsx文件(book,sheet数据,sheet命名)
      XLSX.utils.book_append_sheet(wb, ws, sheetName)
      // 写文件(book,xlsx文件名称)
      XLSX.writeFile(wb, `${fileName}.xlsx`)
      this.message.success('下载模板成功！')
    } catch (e) {
      this.message.error(`下载模板出错！原因：${e}`)
    }
  }
```

## 三、小坑：导出数据顺序和标题顺序不一致

按照想要的顺序重组数组，即可解决导出列顺序乱的问题；
原因：对象是无序的。但是首次定义的对象顺序是一定的，所以就要重新组装。有些地方的导出顺序不乱，可能是因为返回的对象顺序就是对的。

```ts
/** 导出 */
  export(table,title) {
    const exportTable = table.filter(item => item['checked'])
    if(exportTable&&exportTable.length===0) {
      return this.message.info('请勾选导出数据！')
    }
    // 重新按照顺序组装导出数组
    const newTable = []
    _.forEach(exportTable, (item) => {
      const data = {
        index: item.index,
        vc_product_state: item.vc_product_state,
        vc_contract_name: item.vc_contract_name,
        vc_business_type: item.vc_business_type,
        vc_audit_type: item.vc_audit_type,
        vc_audit_status: item.vc_audit_status,
        vc_client_name: item.vc_client_name,
        vc_client_type: item.vc_client_type,
        vc_thg_code: item.vc_thg_code,
        l_fh_id: item.l_fh_id,
        vc_current_handler: item.vc_current_handler,
        vc_current_pronode: item.vc_current_pronode,
        l_initiate_date: item.l_initiate_date,
      }
      newTable.push(data)
    })
    const fileName = '合同审核' + moment().format('YYYYMMDD') 
    this.exportData(newTable, title, [], fileName);
  }
```

