# xlsx表格导入导出功能

## 一、下载导入模板xlsx

```js
// 下载导入模板
downloadTemplate() {
  // 模板表头
  const head = ['托管人名称','产品代码','产品名称','份额数量']
  this.exportTemplate(head, '招募说明书发送托管人导入模板', 'sheet')
}
/**
 * 下载模板
 * @param head <Array> 列标题,一维数组
 * @param fileName 下载文件名
 * @param sheetName sheet表名
 */
exportTemplate(head, fileName, sheetName) {
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



## 二、前端导出EXCEL生成字节流和下载功能

```js
// 下载当前导出的xlsx表格
download() {
  this.exportData(this.currentList, this.exportHead, ['objKey'], this.fileName, true)
}

/**
 * 前端导出EXCEL生成字节流 和下载功能
 * @param table {any} 需要导出的对象数组
 * @param title {any} 列头 {field: 'name', name: '标题'}
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
    if (excludeColumn.length > 0) {
      table.forEach((v) => {
        excludeColumn.forEach(col => {
          delete v[col];
        });
      });
    }
    const wb = { SheetNames: [`sheet1`], Sheets: {} };
    const ws = XLSX.utils.json_to_sheet(table);
    _.forEach(title, (item) => {
      for(const row in ws) {
        if(ws[row]['v']=== item.field) {
          ws[row]['v'] = item.name
        }
      }
    })
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
        console.log(this.byteStream,"this.byteStream");
      })
    }
  } catch (e) {
    this.message.error(isdownload ? `下载文件失败！原因：${e}` : `生成文件失败！原因：${e}`);
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
}

// 二进制流转换为base64
getBase64(data) {
  const blob = new Blob([data]);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
```

## 三、导入EXCEL表格

```js
 // 导入产品清单
  beforeUpload = (file: UploadFile): boolean => {
    // 文件类型过滤
    console.log(file,"file");
    if (!(file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel')) {
      this.modal.error({
        nzTitle: '提示信息',
        nzContent: `上传文件格式不正确！(支持,<b>.xls、.xlsx、.csv</b>)`
      });
      return false;
    }
    // 清空文件
    this.fileList = [];
    this.value = '';
    this.value = file['name'];  // 获取文件名称
    this.fileList = this.fileList.concat(file);
    this.uploadFile();
    return false;
  }

  // 导入产品清单
  uploadFile() {
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(this.fileList[0] as any);
    const that = this;
    that.uploading = true
    fileReader.onload = function (ev) {
      let data;
      let workbook;
      let table = [];
      try {
        data = ev.target['result'];
        workbook = XLSX.read(data, {
          type: 'binary'
        });
        console.log(workbook)
      } catch (e) {
        console.log('文件类型不正确');
        return;
      }
      let fromTo = '';
      console.log(workbook);
      for (const sheet in workbook.Sheets) {
        if (workbook.Sheets.hasOwnProperty(sheet)) {
          fromTo = workbook.Sheets[sheet]['!ref'];
          console.log(fromTo);
          table = table.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
            header: 1
          }));
          break; // 只取第一张表，拿到第一个表的数据后直接跳出
        }
      }
      console.log(table);
      if(table) {
        that.addTable(table)
        that.none = false
      }
      that.uploading = false
    };
  }
  
  /**
   * 导入xlsx数据处理
   * @param table 
   */
  async addTable(table) {
    // 获取表头
    let head = table.shift()
    // 判断导入数据必填字段
    const isExist = ['产品代码','产品名称','份额数量','托管人名称']
    let field = ''
    for(const em of isExist) {
      if(!head.includes(em)) {
        field = field + `【${em}】` + ','
      }
    }
    if(field) {
      field = field.substring(0,field.lastIndexOf(','))
      this.message.error(`导入失败！原因：缺少${field}字段！`)
    } else {
      let tableList = []
      // 转换二维数组维对象数组
      _.forEach(table, (row) => {
        let rowObj = {}
        _.forEach(row, (item, i) => {
          rowObj[head[i]] = item.toString()
        })
        tableList.push(rowObj)
      })
      // 过滤字段
      let filterList = []
      for(const r of tableList) {
        let row = {}
        for(const field in r) {
          const target = this.tableHead.filter(e => e.name === field)
          if(target && target.length) {
            const Head = target[0]
            row[Head.field] = r[field]
          }
        }
        filterList.push(row)
      }
      console.log(filterList, tableList,"tableList");
      // 导入数据前先删除招募说明书数据
      await this.editProspectus(filterList, '3')
      // 导入招募说明书数据
      this.editProspectus(filterList, '1')
    }
  }
```

