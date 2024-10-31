```ts
export function initMapSDK() {
  
  // let scriptDOM: HTMLScriptElement | null = document.getElementById('BaiduMapSDK') as any
  // if (scriptDOM) return Promise.resolve(globalThis.BMapGL as any)
  // const ak = 'aZ57hXo1g0Xo4KGKHM9Pc1hfGGVmfWaD'
  // scriptDOM = document.createElement('script')
  // scriptDOM.src = `https://api.map.baidu.com/api?v=1.0&&type=webgl&ak=${ak}`

  // document.body.appendChild(scriptDOM)

  return Promise.resolve(globalThis.BMapGL as any)
}

initMapSDK()
.then((BMapGL) => {
    const map = new BMapGL.Map('map-renderer'); // 创建Map实例
    console.log(globalThis.LatLng)
    var convertor = new BMapGL.Convertor();
        var pointArr: any[] = [];
        pointArr.push(new BMapGL.Point(12.634505, 51.460304));
        convertor.translate(pointArr, 1, 5, (data) => {
            if(data.status === 0) {
                var marker = new BMapGL.Marker(data.points[0]);
                map.centerAndZoom(data.points[0], 10); // 初始化地图,设置中心点坐标和地图级别
                map.addOverlay(marker);
                map.setCenter(data.points[0]);
                map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
            }
        })
    // map.centerAndZoom(new BMapGL.Point(51.460304, 12.634505), 12); // 初始化地图,设置中心点坐标和地图级别
    // var mk = new BMapGL.Marker(r.point);
    // var geolocation = new BMapGL.Geolocation();
    // geolocation.getCurrentPosition(function(r){
    //     if(this.getStatus() == globalThis.BMAP_STATUS_SUCCESS){
    //         var mk = new BMapGL.Marker(r.point);
    //         map.addOverlay(mk);
    //         map.panTo(r.point);
    //         // alert('您的位置：'+r.point.lng+','+r.point.lat);
    //     }
    //     else {
    //         alert('failed'+this.getStatus());
    //     } 
    // })  
```

跳转baidu map

``` html
<a class="link" href="bdapp://map/navi?query=Germany Kemberg">前往肖贝格</a>
```