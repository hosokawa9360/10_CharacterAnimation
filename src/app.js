var size;
//1:地面　2:ブロック　3:プレイヤ　4:ゾンビ 5:こうもり
var level = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 5, 0, 0, 0, 2, 2, 2],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 2, 2, 0, 0, 0, 0],
  [0, 3, 0, 0, 0, 0, 0, 0, 4, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
var tileSize = 96;
var playerPosition; //マップ内のプレイやの位置(ｘ、ｙ)を保持する
var playerSprite; //プレイヤーのスプライト

var gameScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var background = new backgroundLayer();
     this.addChild(background);
    var level = new levelLayer();
    this.addChild(level);
    var player = new playerLayer();
    this.addChild(player);
  }
});


var backgroundLayer = cc.Layer.extend({
  ctor: function() {
    this._super();

    var backgroundSprite = cc.Sprite.create(res.background_png);
    var size = backgroundSprite.getContentSize();
    //console.log(size);
    this.addChild(backgroundSprite);
    var winSize = cc.director.getWinSize();
    //console.log(winSize.width,winSize.height);
    backgroundSprite.setPosition(winSize.width / 2, winSize.height / 2);
    //背景画像を画面の大きさに合わせるためのScaling処理
    backgroundSprite.setScale(winSize.width / size.width, winSize.height / size.height);
  }

});

var levelLayer = cc.Layer.extend({
  ctor: function() {
    this._super();
    var size = cc.director.getWinSize();
    for (i = 0; i < 7; i++) {　　　　　　
      for (j = 0; j < 10; j++) {
        switch (level[i][j]) {
          case 1:
            var groundSprite = cc.Sprite.create(res.ground_png);
            groundSprite.setPosition(tileSize / 2 + tileSize * j, 96 * (7 - i) - tileSize / 2);
            this.addChild(groundSprite);
            break;
          case 2:
            var blockSprite = cc.Sprite.create(res.block_png);
            blockSprite.setPosition(tileSize / 2 + tileSize * j, 96 * (7 - i) - tileSize / 2);
            this.addChild(blockSprite);
            break;
        }
      }
    }
  }
});


var player;
var playerLayer = cc.Layer.extend({
    ctor: function() {
    this._super();
      player = new Player();
      this.addChild(player);
      //cc.eventManager.addListener(listener, this);

  }

});


var Player = cc.Sprite.extend({
  ctor: function() {
    this._super();
    this.initWithFile(res.player01_png);
    this.workingFlag = false;
    this.xspeed = 0;
    this.yspeed = 0;
  //  thisPlayerArray = new Array(res.player01_png, res.player02_png);
    for (i = 0; i < 7; i++) {　　　　　　
      for (j = 0; j < 10; j++) {
        if (level[i][j] == 3) {
          this.setPosition(tileSize / 2 + tileSize * j, 96 * (7 - i) - tileSize / 2);
          playerPosition = {
            x: j,
            y: i
          };
        }
      }
    }
    this.schedule(this.working,0.08);

  },

  working :function(event){
    this.workingFlag = (this.workingFlag==true)?false:true;
    if(this.workingFlag )   this.initWithFile(res.player01_png);
    else   this.initWithFile(res.player02_png);
  }

});
