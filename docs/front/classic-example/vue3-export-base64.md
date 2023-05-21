## 1、前端使用XLSX插件导出xlsx文件

**vue3+ts**

```ts
const exportData = (arr: string[][], name: string = '表头') => {
    const tSheet = XLSX.utils.aoa_to_sheet(arr)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, tSheet, 'SheetJS')
    console.log(wb)
    XLSX.writeFile(wb, `${name}`)
}
```

## 2、前端使用XLSX转换xlsx文件为base6

```ts
const exportData = (arr: string[][], name: string = '表头') => {
    const tSheet = XLSX.utils.aoa_to_sheet(arr)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, tSheet, 'SheetJS')
    console.log(wb)
    const base64Str: string = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: false,
        type: 'base64'
    })
    // 测试base64是否可以生成一个文件
    // console.log('write>>', base64Str)
    // const a = document.createElement('a')
    // a.href = `data:application/octet-stream;base64,${base64Str}` 
    // a.download = 'xxx.xlsx'
    // document.body.appendChild(a)
    // a.click()
    base64.value = base64Str
}
```

