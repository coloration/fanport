这里的组件专供，`~/content` 使用，如果需要使用 `~/component` 内的组件，参考 `~/component/content/Accordion.ts` 


在 markdown 中使用

``` md

::accordion{title="标题名称"}

content
::

```

嵌套使用 


``` md
::accordion{title="标题名称"}
  <!-- 嵌套需要多一对 :: -->
  :::note
    note content
  :::
::
```