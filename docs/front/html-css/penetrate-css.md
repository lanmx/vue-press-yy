## 1、angular穿透样式

在class 'log-card' div内生效。在外面套一层class，只对div内生效，不会影响整个组件或者全局的样式。

```css
.log-card ::ng-deep.ant-table-tbody > tr > td {
  padding: 10px 8px !important;
}
```

单独用::ng-deep使样式变为全局

```css
::ng-deep.ant-table-tbody > tr > td {
  padding: 10px 8px !important;
}
```

结合:host 使用只对本组件生效

```css
:host ::ng-deep .ant-table-tbody > tr > td {
  padding: 10px 8px !important;
}
```