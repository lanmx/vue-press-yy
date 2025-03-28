## 利用数组差集实现穿梭框权限分配

```js
// 获取角色权限列表
    const openPermissModel = async (text) => {
      permissvisible.value = true;
      // 用户角色详情
      userdetail.value = {
        id: text.id,
        name: text.name,
      };
      let params = text.id;
      try {
        const Data = await rolepermisslist({ id: params });
        // 角色权限id集合
        let id = Data.result.map(item => item.id);
        // 通过角色权限id集合，找到每个用户已分配和未分配的权限，chosen值为true已分配，chosen为false未分配
        permissList.value = permissList.value.map((item) => {
          return {
            key: item.key.toString(),
            title: item.title,
            description: "",
            chosen: id.includes(Number(item.key)),
          };
        });
        assList = JSON.parse(JSON.stringify(permissList.value));
      } catch (e) {
        message.error("获取角色权限列表失败！");
      }
      await getMock();
    };
// 分配权限
const addPermiss = async () => {
      buttonloading.value = true
      // 原有已分配的权限oldList
      let oldList = assList.filter(item => item.chosen).map((item) => item.key);
      // 原有未分配的权限minus
      let minus = assList.filter(item => oldList.indexOf(item.key) == -1).map(item => item.key)

      // 过滤原有的集合，为新增参数集合add，用于调用新增接口
      let add = Key.value.map(item => item).filter(item => oldList.indexOf(String(item)) == -1)
      
      // 这是相对于变化数据的未分配权限集合minusArr
      let minusArr = assList.filter(item => Key.value.indexOf(item.key) == -1 ).map(item => item.key)

      // minusArr过滤掉原有未分配的集合存在的参数，为减少的参数del，则调用删除接口
      let del = minusArr.filter(item => minus.indexOf(item) == -1)
      
      if(add.length > 0 || del.length > 0) {
        // 存在添加参数add ,调用添加接口
        if(add.length > 0) {
          let params = {
            role_id: (<{ id: number }>userdetail.value).id,
            permission_id: add
          }
          try {
            await createrolepermiss(params);
            message.success("添加权限成功！")
            buttonloading.value = false
            permissvisible.value = false
          } catch(e) {
            message.error("添加权限失败！")
          }
        }
        // 存在删除的参数，并且和原来的不相同，调用删除接口
        if(del.length > 0 && Key.value !== oldList) {
          let params = {
            id: (<{ id: number }>userdetail.value).id,
            permission_id: del.join(",")
          }
          try {
            await delpolper(params);
            message.success("删除权限成功！")
            buttonloading.value = false
            permissvisible.value = false
          } catch(e) {
            message.error("删除权限失败！")
          }
        }
      } else {
        message.info("请给用户勾选并分配权限")
        buttonloading.value = false
      }
    };
```

实现效果：

![image-20211103100239233](@alias/image-20211103100239233.png)


<ClientOnly>
  <Valine></Valine>
</ClientOnly>