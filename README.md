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

## 3.　テクスチャアトラスを利用した歩行アニメーション
テクスチャアトラスとは? 複数の画像を1つの画像にまとめたものをアトラス画像といいます。そうすることで、画像ロード時に読み込むファイル数が減り、ロード時間が短くなります。
```
//スプライトフレームを格納する配列
var texture = cc.textureCache.addImage(res.player_sheet);
//スプライトフレームを作成
var frame1 = new cc.SpriteFrame.createWithTexture(texture, cc.rect(0, 0, 96, 96));
var frame2 = new cc.SpriteFrame.createWithTexture(texture, cc.rect(96, 0, 96, 96));
//スプライトフレームを配列に登録
var animationframe = [];
animationframe.push(frame1);
animationframe.push(frame2);
//スプライトフレームの配列を連続再生するアニメーションの定義
var animation = new cc.Animation(animationframe, 0.08);
//永久ループのアクションを定義
var action = new cc.RepeatForever(new cc.animate(animation));
//実行
this.runAction(action);
```
## 4.　plist（スプライトシート＋切り出し用のXML）を用いたアニメーション

直接画像ファイルから読み込む場合は画像ファイルのパスを引数で渡すだけなのですが、TxturePackerなど作成したスプライトシート(plist)を取り込む場合は手順が変わります。
```
// スプライトシートをスプライトフレームキャッシュに登録
cc.spriteFrameCache.addSpriteFrames(res.player_plist, res.player_sheet);

// スプライトフレームを取得 player01,player02はplistの中で定義されいいる
var frame1 = cc.spriteFrameCache.getSpriteFrame("player01");
var frame2 = cc.spriteFrameCache.getSpriteFrame("player02");

//スプライトフレームを配列に登録
var animationframe = [];
animationframe.push(frame1);
animationframe.push(frame2);
//スプライトフレームの配列を連続再生するアニメーションの定義
var animation = new cc.Animation(animationframe, 0.08);
//永久ループのアクションを定義
var action = new cc.RepeatForever(new cc.animate(animation));
//実行
this.initWithFile(res.player_sheet);
this.runAction(action);
```
