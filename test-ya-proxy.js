var fetch = require("node-fetch");

fetch(
  "https://downloader.disk.yandex.ru/disk/1bded529e86d0803001c106effd44795b51eaa4ab9ebbb207c97617c9e6d5866/60fd64e2/ONE_DISPl0yHs0zY8DbTJyeZscMkhgBpJhzrC6y7mCYO5TvAQ9fZo3V7oll2GWJixZ3Px5VL28_nKJA6KPHdjA%3D%3D?uid=349870489&filename=4572b055-b941-4b85-8e9a-a6ec92a743fb.txt&disposition=attachment&hash=&limit=0&content_type=text%2Fplain&owner_uid=349870489&fsize=525&hid=3df68111ba0014a10d61eaef011a3dc5&media_type=document&tknv=v2&etag=d7450be1d7dcd8879fa25af0551388db"
).then(
  function (x) {
    //console.log(x);
    return x.buffer().then(
      function (buffer) {
        var b64 = buffer.toString('base64');
        
        var res = { base64data: b64, type: x.headers['content-type'] };
        console.log('???', b64, x.headers.get('content-type'));
        return res;
      },
      function (x) {
        console.log("222", x);
      }
    );
  },
  function (err) {
    console.log(err);
  }
);
