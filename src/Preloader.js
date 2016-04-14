FDOP.Preloader = function(game){
	FDOP.GAME_WIDTH = 1366;
	FDOP.GAME_HEIGHT = 768; 
};
FDOP.Preloader.prototype = {
	preload: function(){

		this.stage.backgroundColor = '#B4D9E7';
		this.preloadBar = this.add.sprite((FDOP.GAME_WIDTH-311)/2, (FDOP.GAME_HEIGHT-27)/2, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
	
        this.load.image('layer1', 'assets/layer1.png');
    	this.load.image('layer2', 'assets/layer2.png');
    	this.load.image('layer4', 'assets/layer4.png');
        this.load.image('layerr', 'assets/layerr.png');
    	this.load.image('tree', 'assets/tree.png');
		this.load.image('main_menu','assets/main_menu.png');
        this.load.spritesheet('player', 'assets/playernew.png',308,462);
		this.load.spritesheet('wizard','assets/wizard.png',163,185);
        this.load.image('dialog', 'assets/dialog_cloud.png');
		this.load.image('house', 'assets/house.png');
		this.load.image('inf', 'assets/inf.png');
		this.load.audio('dart', 'sounds/dart.mp3');
		this.load.audio('sound1', 'sounds/one.mp3');
		this.load.audio('sound2', 'sounds/two.mp3');		
		this.load.audio('sound3', 'sounds/three.mp3');	
    	this.load.audio('sound4', 'sounds/four.mp3');
    	this.load.audio('sound5', 'sounds/five.mp3');    
		this.load.audio('sound6', 'sounds/six.mp3');	
		
		
	},
	create: function(){
		this.state.start('Game');
	}
};