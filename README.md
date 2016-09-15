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
## 2.　SpriteFrame　を利用しての歩行アニメーション
```
//スプライトフレームを格納する配列
var animationframe = [];
//スプライトフレームを作成
var frame1 = new cc.SpriteFrame(res.player01_png, cc.rect(0, 0, 96, 96));
var frame2 = new cc.SpriteFrame(res.player02_png, cc.rect(0, 0, 96, 96));
//スプライトフレームを配列に登録
animationframe.push(frame1);
animationframe.push(frame2);
//スプライトフレームの配列を連続再生するアニメーションの定義
var animation = new cc.Animation(animationframe, 0.08);
//永久ループのアクションを定義
var action = new cc.RepeatForever(new cc.animate(animation));
//実行
this.runAction(action);
```
