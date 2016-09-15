# 10_CharacterAnimation

## 1.　schedule関数を利用しての歩行アニメーション
```
this.schedule(this.working,0.08);

},

working :function(event){
  this.workingFlag = (this.workingFlag==true)?false:true;

  if(this.workingFlag )   this.initWithFile(res.player01_png);
  else   this.initWithFile(res.player02_png);
}
```
