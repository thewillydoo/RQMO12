import { Scene, Cameras } from "phaser";
import { MyPlayer } from "../components/MyPlayer";

export class City extends Scene {
    constructor() {
        super("City");
        this.playerSpawn = { x: 32 * 51, y: 32 * 30 };
    }

    init(data) {
        if (data.playerSpawn) {
            this.playerSpawn = {
                x: data.playerSpawn.x,
                y: data.playerSpawn.y + 32,
            };
        }
    }

    create() {
        this.allowMovement = true;
        this.currentDirection = "down";
        this.playerSpeed = 200;

        // Create city map layers from tileset
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        const map = this.make.tilemap({
            key: "city",
            tileWidth: 32,
            tileHeight: 32,
        });
        const exteriors = map.addTilesetImage("exteriors_32", "exteriors_32");
        map.createLayer("Ground", exteriors, 0, 0);
        const buildingsLayer = map.createLayer("Buildings", exteriors, 0, 0);
        buildingsLayer.setCollisionByExclusion([-1]);
        map.createLayer("BelowPlayer", exteriors, 0, 0);

        // Add player sprite before AbovePlayer layer
        this.player = new MyPlayer(
            this,
            this.playerSpawn.x,
            this.playerSpawn.y,
            "down"
        );
        this.physics.add.collider(this.player, buildingsLayer);

        // Bind door objects to next scene handler
        this.physics.add.collider(
            this.player,
            this.physics.add.staticGroup(map.createFromObjects("Doors")),
            this.handleEnterDoor,
            null,
            this
        );

        map.createLayer("AbovePlayer", exteriors, 0, 0);

        // Set world bounds and collision
        this.physics.world.setBounds(
            0,
            0,
            map.widthInPixels,
            map.heightInPixels
        );
        this.cameras.main.setBounds(
            0,
            0,
            map.widthInPixels,
            map.heightInPixels
        );
        this.cameras.main.startFollow(this.player);

        // Enable keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.allowMovement) {
            this.player.update(this.cursors);
        }
    }

    // Doctor types should be stored as Object names in the "Doors" layer of City map
    handleEnterDoor(_, door) {
        this.allowMovement = false;
        const doctorType = door.name;
        const doorPosition = { x: door.x, y: door.y };
        this.cameras.main.fadeOut(250, 0, 0, 0);
        this.cameras.main.once(Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () =>
            this.scene.start("Hospital", {
                doctorType,
                doorPosition,
            })
        );
    }
}

