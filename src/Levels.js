Mania.Levels = function(game){
    this.unlock=[];
};
Mania.Levels.prototype = {
	create: function(){
        
        a = this.add.sprite(0, 0,'layer1');
    	b = this.add.sprite(0, 0,'layer2');
        c = this.add.sprite(0,20,'layerr');
        c.scale.setTo(0.45,0.5);
    
        lwindow= this.add.sprite(Mania.GAME_WIDTH/2, Mania.GAME_HEIGHT/2,'lwindow');
        lwindow.anchor.setTo(0.5,0.5);
        lwindow.scale.setTo(1.1,1);
        
        levels= this.add.sprite(Mania.GAME_WIDTH/2, Mania.GAME_HEIGHT-lwindow.width/2-100,'levels');
        levels.anchor.setTo(0.5,0.5);
        levels.scale.setTo(0.58,0.58);
        
        left_btn= this.add.button(Mania.GAME_WIDTH/2+lwindow.width/2-40, Mania.GAME_HEIGHT/2,'right_btn',this.clickDisabled,this);
        left_btn.anchor.setTo(0.5,0.5);
        left_btn.scale.setTo(0.54,0.54);
        left_btn.alpha=0.8;
		left_btn.events.onInputOver.add(this.over, this);
		left_btn.events.onInputOut.add(this.out, this);
        
        right_btn= this.add.button(Mania.GAME_WIDTH/2-lwindow.width/2+40, Mania.GAME_HEIGHT/2,'left_btn',this.clickDisabled,this);
        right_btn.anchor.setTo(0.5,0.5);
        right_btn.scale.setTo(0.54,0.54);
        right_btn.alpha=0.8;
		right_btn.events.onInputOver.add(this.over, this);
		right_btn.events.onInputOut.add(this.out, this);
        
        close_btn= this.add.button(Mania.GAME_WIDTH/2+lwindow.width/2-75, Mania.GAME_HEIGHT/2-245,'close_btn',this.backtoMenu,this);
        close_btn.anchor.setTo(0.5,0.5);
        close_btn.scale.setTo(0.45,0.45);
        close_btn.alpha=0.8;
        close_btn.events.onInputOver.add(this.over, this);
		close_btn.events.onInputOut.add(this.out, this);
        
        for (var i=0;i<3;++i)
        {
        this.unlock[i]= this.add.button(Mania.GAME_WIDTH/2-90+200*i, Mania.GAME_HEIGHT/2-85,'unlock',this.clickDisabled,this);
        this.unlock[i].anchor.setTo(0.5,0.5);
        this.unlock[i].scale.setTo(0.45,0.45);
        this.unlock[i].alpha=0.8;
        this.unlock[i].events.onInputOver.add(this.over, this);
    	this.unlock[i].events.onInputOut.add(this.out, this);
        }
        
        for (var i=0;i<4;++i)
        {
        this.unlock[i+3]= this.add.button(Mania.GAME_WIDTH/2-290+200*i, Mania.GAME_HEIGHT/2+95,'unlock',this.clickDisabled,this);
        this.unlock[i+3].anchor.setTo(0.5,0.5);
        this.unlock[i+3].scale.setTo(0.45,0.45);
        this.unlock[i+3].alpha=0.8;
        this.unlock[i+3].events.onInputOver.add(this.over, this);
    	this.unlock[i+3].events.onInputOut.add(this.out, this);
        }
        
        level1= this.add.button(Mania.GAME_WIDTH/2-290, Mania.GAME_HEIGHT/2-85,'level1',this.startGame,this);
        level1.alpha=0.8;
        level1.anchor.setTo(0.5,0.5);
        level1.scale.setTo(0.465,0.46);
        level1.events.onInputOver.add(this.over, this);
		level1.events.onInputOut.add(this.out, this);
        
    	platforms = this.add.group();
        platforms.enableBody = true;
        var ground = platforms.create(0, Mania.GAME_HEIGHT - 92, 'layer4');
        ground.body.immovable = true;
        
        this.choice_snd = this.add.audio('sound3');
        this.disabled_snd = this.add.audio('sound4');
        
	},
    
    over: function(btn) {
		btn.alpha = 1.0;
	},
	
	out: function(btn) {
		btn.alpha=0.8;
	},
    
    clickDisabled: function() {
		this.disabled_snd.play();
	},
	
    backtoMenu: function() {
        this.choice_snd.play()
        this.shutdown();
        this.state.start('MainMenu',true,false)
        
    },
    
	startGame: function() {
        this.choice_snd.play();
        this.shutdown();
		this.state.start('Game',true,false);
	},
    
    shutdown: function() {
        a=b=c=null;
        lwindow=null;
        levels=null;
        left_btn=null;
        right_btn=null;
        close_btn=null;
        ground=null;
        platforms=null;
        this.unlock=[];
    }
        
};