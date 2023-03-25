##  vue中v-if和v-for不建议同时使用的坑

在官方文档中明确指出v-for和v-if不建议一起使用。

原因：v-for比v-if优先级高，所以使用的话，每次v-for都会执行v-if,造成不必要的计算，影响性能，尤其是当之需要渲染很小一部分的时候。

可以选择使用computed过滤掉列表中不需要显示的项目。

<ClientOnly>
  <Valine></Valine>
</ClientOnly>