## nextTick

nextTick在页面DOM已加载完成再执行；

```js
// 添加角色弹窗打开
    const roleModalShow = () => {
      rolevisible.value = true;
      // nextTick在页面Dom已挂载完成后再执行，onload是dom和资源（例如图片）显示后再执行
      nextTick(() => {
        formRef.value.resetFields();
      });
    };
```

nextTick中的回调函数，在下一次DOM更新循环结束后，执行回调，可以用于获取更新后的DOM；

Vue中的数据更新是异步的，使用nextTick可以数据更新完再处理；


<Valine></Valine>