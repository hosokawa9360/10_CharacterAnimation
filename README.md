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

## 5.　羽ばたきアニメーションをしながら、旋回飛行をするコウモリの実装
新規ﾌｧｲﾙ（EnemyBat.js）を追加し、index.htmlに記述する
```
<script type="text/javascript" src="cocos2d-js-v3.11.js" charset="UTF-8"></script>
<script type="text/javascript" src="src/resource.js" charset="UTF-8"></script>
<script type="text/javascript" src="src/EnemyBat.js" charset="UTF-8"></script>
<script type="text/javascript" src="src/app.js" charset="UTF-8"></script>
```
横2*縦2で構成されたスプライトシートからフレームを切り出して、アニメーションフレームに登録する処理
```
var animationframe = [];
//スプライトフレームを格納する配列
var texture = cc.textureCache.addImage(res.bat_frames);
for (i = 0; i < 2; i++) {
  for (j = 0; j < 2; j++) {
    //スプライトフレームを作成
    var frame = new cc.SpriteFrame.createWithTexture(texture, cc.rect(160 * j, 96 * i, 160, 96));
    //スプライトフレームを配列に登録
    animationframe.push(frame);
  }
}
//スプライトフレームの配列を連続再生するアニメーションの定義
var animation = new cc.Animation(animationframe, 0.08);
//永久ループのアクションを定義
var action = new cc.RepeatForever(new cc.animate(animation));
```

こうもりの八の字旋回運動の例、パラメータ設定を試行錯誤してください。

```
this.scheduleUpdate();

},

update: function(dt) {
this.FrameCount++;
//4フレームに1回　こうもりの移動計算する
if (this.FrameCount % 4 == 0) {
  //プレイヤーの位置をこうもりの位置の差を計算
  var offset_x = player.getPosition().x - this.getPosition().x;
  var offset_y = player.getPosition().y - this.getPosition().y;
  //offset_x = offset_x*Math.sin(offset_x);
  //蝙蝠のｘ移動速度をプレイヤとこうもりの間の距離の0.05倍にする
  var velocity_x = lerp(this.velocity.x, offset_x, 0.005);
  var velocity_y = this.velocity.y;
  //フォバリング高度より上なら下降させる。　降下下限高度より下にいたら、上昇させる
  if (this.getPosition().y > HoverHeight) velocity_y += -0.035;
  if (this.getPosition().y < RiseHeight) velocity_y += 0.05;
  //プレイヤーの位置よりできるだけ下にならないように
  if (this.getPosition().y < player.y + 20) velocity_y += 0.05;
  //8の字旋回軌道をsin計算で適当に補正
  velocity_y += 0.075 * Math.sin(this.FrameCount * 0.015) * Math.sin(this.FrameCount * 0.04);
  console.log(velocity_x, velocity_y);

  this.velocity.x = velocity_x;
  this.velocity.y = velocity_y;

  //  console.log(MoveDirection, this.velocity.x, offset.x);
  if (this.velocity.x <= 0)
    this.setFlippedX(true);
  if (this.velocity.x > 0)
    this.setFlippedX(false);

  this.setPosition(this.getPosition().x + this.velocity.x, this.getPosition().y + this.velocity.y);
}

}
```
線形補間の関数　よく使うので覚えておいてください。

```
});
//始点、終点、の間で 0～1.0の割合の位置を返す関数
function lerp(fStart, fEnd, fPercent) {
return fStart + ((fEnd - fStart) * fPercent);
}

```
