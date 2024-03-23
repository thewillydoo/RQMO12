import { Scene } from "phaser";

export class Preloader extends Scene {
    constructor() {
<<<<<<< HEAD
        super('Preloader');
    }

    init() {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');
=======
        super("Preloader");
    }

    init() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
        const progressBarWidth = this.scale.width * 0.5;
>>>>>>> main

        // A simple progress bar. This is the outline of the bar.
        this.add
            .rectangle(centerX, centerY, progressBarWidth, 32)
            .setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
<<<<<<< HEAD
        const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);
=======
        const bar = this.add.rectangle(
            centerX - progressBarWidth / 2,
            centerY,
            4,
            28,
            0xffffff
        );
>>>>>>> main

        // Update the loading bar
        this.load.on("progress", (progress) => {
            bar.width = progressBarWidth * progress;
        });
    }

    preload() {
<<<<<<< HEAD
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');
=======
        // Load city
        this.load.tilemapTiledJSON("city", "./assets/city.json");
        this.load.image("exteriors_32", "./assets/exteriors_32.png");
>>>>>>> main

        // Load player
        this.load.spritesheet("adam-run", "./assets/Adam_run_16x16.png", {
            frameWidth: 16,
            frameHeight: 32,
        });
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.
        this.createPlayerRunAnimations();

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
<<<<<<< HEAD
        this.scene.start('Maze');
=======
        this.scene.start("MainMenu");
    }

    createPlayerRunAnimations() {
        this.anims.create({
            key: "run-right",
            frames: this.anims.generateFrameNumbers("adam-run", {
                start: 0,
                end: 5,
            }),
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: "run-up",
            frames: this.anims.generateFrameNumbers("adam-run", {
                start: 6,
                end: 11,
            }),
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: "run-left",
            frames: this.anims.generateFrameNumbers("adam-run", {
                start: 12,
                end: 17,
            }),
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: "run-down",
            frames: this.anims.generateFrameNumbers("adam-run", {
                start: 18,
                end: 23,
            }),
            frameRate: 12,
            repeat: -1,
        });
>>>>>>> main
    }
}

