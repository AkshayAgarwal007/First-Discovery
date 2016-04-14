FDOP.Game = function(game){
    this.ground=[];
    this.c=[];
    this.playDartSound=false;
    this.playerInfo=false;
    this.playerLock=false;
    this.moveRight=true;
    this.wizardRight=false;
    this.interactOver=false;
    this.turn=0;
    this.decision=null;
    this.wizardDialog=['Hey!\nYoung Man','I would want to\nbe your friend'];
    this.playerDialog = ['Thanks, I\'m\ncool alone','Yeah Sure!\nMee too..',];
    this.userInputTake=false;
    this.follow=false;
    
};

FDOP.Game.prototype = {
	create: function(){
    
        this.game.world.setBounds(0, 0, 3500, this.game.height);
    
        for (i=0;i<3;i++) {
        this.add.sprite(i* FDOP.GAME_WIDTH, 0,'layer1');
        this.add.sprite(i* FDOP.GAME_WIDTH, 0,'layer2');
        this.c[i] = this.add.sprite(i* FDOP.GAME_WIDTH,20,'layerr');
        this.c[i].scale.setTo(0.45,0.5);
        }
    
        tree1 = this.add.sprite(1500,FDOP.GAME_HEIGHT-92-320,'tree');
    	tree2 = this.add.sprite(1350,FDOP.GAME_HEIGHT-92-260,'tree');
    	tree1.scale.setTo(0.65,0.65);
    	tree2.scale.setTo(0.65,0.62);
    
    	platforms = this.add.group();
        platforms.enableBody = true;
        for (i=0;i<3;i++) {
        this.ground[i] = platforms.create(i* FDOP.GAME_WIDTH, FDOP.GAME_HEIGHT - 100, 'layer4');
        this.ground[i].body.immovable = true;
        this.ground[i].scale.setTo(1,1.2);  
        }   
        
        house1 = this.add.sprite(FDOP.GAME_WIDTH-500,FDOP.GAME_HEIGHT-395,'house');
        house1.scale.setTo(0.55,0.55);
        house2 = this.add.sprite(FDOP.GAME_WIDTH+1000,FDOP.GAME_HEIGHT-395,'house');
        house2.scale.setTo(0.55,0.55);
        
        player1 = this.add.sprite(1170,FDOP.GAME_HEIGHT-250,'wizard');
    	this.physics.arcade.enable(player1);
        player1.body.gravity.y = 300;
        player1.body.collideWorldBounds = false;
    	player1.body.velocity.x=0;
        player1.scale.setTo(0.65,0.65);
        player1.animations.add('idle',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],8,true);
        player1.scale.x*=-1;
        player1.body.velocity.x=0;
        
        player = this.add.sprite(250,FDOP.GAME_HEIGHT-200,'player');
    	this.physics.arcade.enable(player);
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
    	player.body.velocity.x=0;
        player.scale.setTo(0.22,0.22);
        player.animations.add('idle',[0,1],8,true);
        player.animations.add('run', [2,3,4,5,6],8,true);
        
        sound1 = this.add.audio('sound1');
        sound2 = this.add.audio('sound2');
        sound3 = this.add.audio('sound3');
        sound4 = this.add.audio('sound4');
        sound5 = this.add.audio('sound5');
        sound6 = this.add.audio('sound6');
        
        cursors = this.input.keyboard.createCursorKeys();
        this.game.camera.follow(player);
        
        this.dart_snd = this.add.audio('dart');
        this.input.keyboard.addCallbacks(this,null, null,this.onKeyUp);

        
        },
        
        update: function(){
            
            this.game.physics.arcade.collide(player,platforms);
            this.game.physics.arcade.collide(player1,platforms);
            
            player1.animations.play('idle');
            player.body.velocity.x = 0;
            player1.body.velocity.x = 0;
        
            if (cursors.left.isDown && this.playerLock==false)
            {
                player.body.velocity.x = -150;
                player.animations.play('run');
                if(this.playDartSound==false)
                    {
                        if (this.moveRight==true)
                        {   player.scale.x*=-1;
                            this.moveRight=false;
                        }
                        
                    this.dart_snd.play('',0,1,true);
                    this.dart_snd.onLoop.add(this.playSound,this);
                    
                    }
                    
                this.playDartSound=true;
                
                if (this.follow==true && player.position.x+140<player1.position.x)
                {
                    player1.body.velocity.x=-150;
                    
                    if (this.wizardRight==true)
                    {
                        player1.scale.x*=-1;
                        this.wizardRight=false;
                    }
                }
            }
                
        
            else if (cursors.right.isDown && this.playerLock==false)
            {
                player.body.velocity.x = 150;
                player.animations.play('run');
                if(this.playDartSound==false)
                    {
                    
                    if (this.moveRight==false)
                    {   player.scale.x*=-1;
                        this.moveRight=true;
                    }
                        
                    this.dart_snd.play('',0,1,true);
                    this.dart_snd.onLoop.add(this.playSound,this);
                    }
                this.playDartSound=true;
                
                if (this.follow==true && player.position.x-140>player1.position.x)
                {
                    player1.body.velocity.x=+150;
                    
                    if (this.wizardRight==false)
                    {
                        player1.scale.x*=-1;
                        this.wizardRight=true;
                    }
                }
            }
        
            else
            {
                player.animations.play('idle');
                this.dart_snd.stop();
                this.playDartSound=false;
        }
        
        if (this.interactOver==false)
        this.wizardInteraction();
    },
    
    
        onKeyUp: function() {
            console.log(this.userInputTake);
            if (this.playerInfo==true &&  this.interactOver==false) {

            switch (event.keyCode) {
                    case 105:
                        if(this.playerLock==false) { 
                        this.playerLock=true;
                        info.destroy();
                        playerText.destroy();
                        if(this.moveRight==false)
                        {
                            player.scale.x*=-1;
                            this.moveRight=true;
                        }
                        this.startInteraction();
                    }
                        
                    case 110:
                    if (this.userInputTake==true) {
                        console.log("jjkk");
                        this.userInputTake=false;
                        this.decision = 0;
                        this.endInteraction();
                        
                    }
                    
                    case 121:
                    if (this.userInputTake==true) { 
                        this.decision=1;
                        this.userInputTake=false;
                        this.endInteraction();
                    }
                    }
                    
                }
        },
        
        startInteraction: function() {
            playerDialog = this.add.sprite(player1.position.x-50,player1.position.y-95,'dialog');
            txt = this.wizardDialog[this.turn];
            playerText = this.add.text(player1.position.x-25,player1.position.y-85,txt, { fontSize: '45px', fill: '#000' });
            this.add.tween(playerDialog).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            this.add.tween(playerText).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);         
            
            if(this.turn==0) {
            sound1.play();
            this.game.time.events.add(Phaser.Timer.SECOND * 2, this.interactionChange, this);
            playerDialog.scale.setTo(0.31,0.38); 
                }
            else if(this.turn==1) {
            sound2.play();
            this.game.time.events.add(Phaser.Timer.SECOND * 2, this.userInputWait, this);
            playerDialog.scale.setTo(0.35,0.38); 
            }
            
        },
        
        interactionChange: function() {
            this.turn=1;
            playerDialog.destroy();
            playerText.destroy();
            this.startInteraction();
        },
        
        userInputWait: function() {
            this.turn=2;
            playerDialog.destroy();
            playerText.destroy();
            this.userInputTake=true;
            sound6.play();
            txt = "Press 'Y' to say 'Yes' / 'N' to say 'No'";
            actionText = this.add.text(this.game.camera.width/2,this.game.camera.height/2-300,txt, { fontSize: '45px', fill: '#000' });
            actionText.anchor.setTo(0.5,0.5);
            actionText.fixedToCamera=true;
        },
        
    
        endInteraction: function() {
            actionText.destroy();
            playerDialog = this.add.sprite(player.position.x,player.position.y-105,'dialog');
            playerDialog.scale.setTo(0.31,0.38);
            txt = this.playerDialog[this.decision];
            playerText = this.add.text(player.position.x+30,player.position.y-95,txt, { fontSize: '45px', fill: '#000' });
            if (this.decision==0)
            sound3.play();
            else {
            sound4.play();
            this.follow=true;
                }
            this.game.time.events.add(Phaser.Timer.SECOND * 3, this.interactDestroy, this);
            this.add.tween(playerDialog).to( { alpha: 0 }, 3000, Phaser.Easing.Linear.None, true);
            this.add.tween(playerText).to( { alpha: 0 }, 3000, Phaser.Easing.Linear.None, true);   
            
        },
        
        interactDestroy: function() {
            playerDialog.destroy();
            playerText.destroy();
            this.playerLock=false;
            this.interactOver=true;
            
        },
        
        wizardInteraction: function() {
            if (player.position.x>player1.position.x-200 && player.position.x<player1.position.x-160)
            {   if(this.playerInfo==false) {
                sound5.play();
                info = this.add.sprite(player1.position.x-90,player1.position.y-60,'inf');
                info.scale.setTo(0.52,0.52);
                txt = "Press 'I' to interact";
                playerText = this.add.text(this.game.camera.width/2,this.game.camera.height/2-300,txt, { fontSize: '45px', fill: '#000' });
                playerText.anchor.setTo(0.5,0.5);
                playerText.fixedToCamera=true;
                this.playerInfo=true;
                }
                
            }
            
            else if (this.playerInfo==true){
                if(this.playerInfo==true)
                info.destroy();
                playerText.destroy();
                this.playerInfo=false;
                sound5.stop();
            }
        },
    
        
        playSound: function() {
            this.dart_snd.play('',0,1,true);
            
        }
        
        
    };