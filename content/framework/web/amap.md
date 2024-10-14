
```html
<link rel="stylesheet" href="http://cache.amap.com/lbs/static/main1119.css"/>
<script src="http://cache.amap.com/lbs/static/es5.min.js"></script>
<script src="http://webapi.amap.com/maps?v=1.4.6&key=d6592128525b822d5d75435bc63a6473"></script>
<script type="text/javascript" src="http://cache.amap.com/lbs/static/addToolbar.js"></script>
```

``` js
var map = new AMap.Map('container', {
  resizeEnable: true,
  gridMapForeign:true,
  zoom:11,
  mapStyle:'amap://styles/dark',
  center: [-0.153289,51.512492]
});
```