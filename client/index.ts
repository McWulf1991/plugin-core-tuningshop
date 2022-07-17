import * as alt from 'alt-client';
import * as native from 'natives';
import { WebViewController } from '../../../client/extensions/view2';
import ViewModel from '../../../client/models/viewModel';
import { CinematicCam } from '../../../client/utility/cinematic';
import { isAnyMenuOpen } from '../../../client/utility/menus';
import { Vector3 } from '../../../shared/interfaces/vector';
import { Tuningshop_View_Events } from '../shared/events';
import { iTuningshopSync } from '../shared/interfaces';

let syncData: iTuningshopSync;

// You should change this to match your Vue Template's ComponentName.
const PAGE_NAME = 'TuningShop';

class InternalFunctions implements ViewModel {
    static async open(_syncData: iTuningshopSync) {
        // Check if any other menu is open before opening this.
        if (isAnyMenuOpen()) {
            return;
        }

        // Data to sync in the interface
        syncData = _syncData;

        // Must always be called first if you want to hide HUD.
        await WebViewController.setOverlaysVisible(false);

        // This is where we bind our received events from the WebView to
        // the functions in our WebView.
        const view = await WebViewController.get();
        view.on(`${PAGE_NAME}:Ready`, InternalFunctions.ready);
        view.on(`${PAGE_NAME}:Close`, InternalFunctions.close);
        view.on(`${PAGE_NAME}:Update`, InternalFunctions.update);
        view.on(`${PAGE_NAME}:Purchase`, InternalFunctions.purchase);
        view.on(`${PAGE_NAME}:NextCam`, () => {
            CinematicCam.next(false);
        });

        // This is where we open the page and show the cursor.
        WebViewController.openPages([PAGE_NAME]);
        WebViewController.focus();
        WebViewController.showCursor(true);

        // Turn off game controls, hide the hud.
        alt.toggleGameControls(false);

        // Let the rest of the script know this menu is open.
        alt.Player.local.isMenuOpen = true;

        const points = InternalFunctions.generateCameraPoints();

        // Clear Cinematic Camera
        CinematicCam.destroy();

        // Add Camera Ponts to Cinematic Cam List
        for (let i = 0; i < points.length; i++) {
            CinematicCam.addNode({
                pos: points[i],
                fov: 90,
                easeTime: 250,
                positionToTrack: alt.Player.local.vehicle.pos,
            });
        }

        CinematicCam.next(false);
    }

    static async close() {
        alt.toggleGameControls(true);
        WebViewController.setOverlaysVisible(true);

        // Turn off bound events.
        // If we do not turn them off we get duplicate event behavior.
        // Also will cause a memory leak if you do not turn them off.
        const view = await WebViewController.get();
        view.off(`${PAGE_NAME}:Ready`, InternalFunctions.ready);
        view.off(`${PAGE_NAME}:Close`, InternalFunctions.close);
        view.off(`${PAGE_NAME}:Update`, InternalFunctions.update);
        view.off(`${PAGE_NAME}:Purchase`, InternalFunctions.purchase);

        // Close the page.
        WebViewController.closePages([PAGE_NAME]);

        // Turn on game controls, show the hud.
        WebViewController.unfocus();
        WebViewController.showCursor(false);

        // Let the rest of the script know this menu is closed.
        alt.Player.local.isMenuOpen = false;

        alt.emitServer(Tuningshop_View_Events.CLOSE);

        CinematicCam.destroy();
    }

    /**
     * You should call this from the WebView.
     * What this will let you do is define local data in the client.
     *
     * Then when the WebView is ready to receieve that data we can send it.
     * The flow is:
     *
     * Send From WebView -> Get the Data Here -> Send to the WebView
     *
     * @static
     * @memberof TemplateView
     */
    static async ready() {
        const view = await WebViewController.get();
        view.emit(`${PAGE_NAME}:Ready`, syncData);
    }

    static async purchase(
        wheelcamber: number,
        wheelheight: number,
        wheelrimradius: number,
        wheeltrackwidth: number,
        wheeltyreradius: number,
        wheeltyrewidth: number,
        engine: number,
        brakes: number,
        transmission: number,
        suspension: number,
        armour: number,
        turbo: number,
        xenon: number,
    ) {
        InternalFunctions.update(wheelcamber, wheelheight, wheelrimradius, wheeltrackwidth, wheeltyreradius, wheeltyrewidth, engine, brakes, transmission, suspension, armour, turbo, xenon);
        alt.emitServer(Tuningshop_View_Events.PURCHASE, wheelcamber, wheelheight, wheelrimradius, wheeltrackwidth, wheeltyreradius, wheeltyrewidth, engine, brakes, transmission, suspension, armour, turbo, xenon);
        InternalFunctions.close();
    }

    static async update(
        wheelcamber: number,
        wheelheight: number,
        wheelrimradius: number,
        wheeltrackwidth: number,
        wheeltyreradius: number,
        wheeltyrewidth: number,
        engine: number,
        brakes: number,
        transmission: number,
        suspension: number,
        armour: number,
        turbo: number,
        xenon: number,
    ) {
        if (!alt.Player.local.vehicle) {
            return;
        }

        if (wheelcamber) {
            alt.on("streamSyncedMetaChange", (entity, key, value, oldValue) => {
                if (key !== "wheelModWheelCamber") return;
                if (!(entity instanceof alt.Vehicle)) return;
                modWheels(entity, value);
            });

            function modWheels(vehicle, data) {
                for (let i = 0; i <= vehicle.wheelsCount; i++) {
                    vehicle.setWheelCamber(i, data.camber);
                }

                vehicle.setWheelCamber(0, wheelcamber);
                vehicle.setWheelCamber(1, wheelcamber);
                vehicle.setWheelCamber(2, wheelcamber);
                vehicle.setWheelCamber(3, wheelcamber);
            }
        }

        if (wheelheight) {
            alt.on("streamSyncedMetaChange", (entity, key, value, oldValue) => {
                if (key !== "wheelModWheelHeight") return;
                if (!(entity instanceof alt.Vehicle)) return;
                modWheels(entity, value);
            });

            function modWheels(vehicle, data) {
                for (let i = 0; i <= vehicle.wheelsCount; i++) {
                    vehicle.setWheelHeight(i, data.height);
                }

                vehicle.setWheelHeight(0, wheelheight);
                vehicle.setWheelHeight(1, wheelheight);
                vehicle.setWheelHeight(2, wheelheight);
                vehicle.setWheelHeight(3, wheelheight);
            }
        }

        if (wheelrimradius) {
            alt.on("streamSyncedMetaChange", (entity, key, value, oldValue) => {
                if (key !== "wheelModWheelRimRadius") return;
                if (!(entity instanceof alt.Vehicle)) return;
                modWheels(entity, value);
            });

            function modWheels(vehicle, data) {
                for (let i = 0; i <= vehicle.wheelsCount; i++) {
                    vehicle.setWheelRimRadius(i, data.rimradius);
                }

                vehicle.setWheelRimRadius(0, wheelrimradius);
                vehicle.setWheelRimRadius(1, wheelrimradius);
                vehicle.setWheelRimRadius(2, wheelrimradius);
                vehicle.setWheelRimRadius(3, wheelrimradius);
            }
        }

        if (wheeltrackwidth) {
            alt.on("streamSyncedMetaChange", (entity, key, value, oldValue) => {
                if (key !== "wheelModWheelTrackWidth") return;
                if (!(entity instanceof alt.Vehicle)) return;
                modWheels(entity, value);
            });

            function modWheels(vehicle, data) {
                for (let i = 0; i <= vehicle.wheelsCount; i++) {
                    vehicle.setWheelTrackWidth(i, data.trackwidth);
                }

                vehicle.setWheelTrackWidth(0, wheeltrackwidth);
                vehicle.setWheelTrackWidth(1, wheeltrackwidth);
                vehicle.setWheelTrackWidth(2, wheeltrackwidth);
                vehicle.setWheelTrackWidth(3, wheeltrackwidth);
            }
        }

        if (wheeltyreradius) {
            alt.on("streamSyncedMetaChange", (entity, key, value, oldValue) => {
                if (key !== "wheelModWheelTyreRadius") return;
                if (!(entity instanceof alt.Vehicle)) return;
                modWheels(entity, value);
            });

            function modWheels(vehicle, data) {
                for (let i = 0; i <= vehicle.wheelsCount; i++) {
                    vehicle.setWheelTyreRadius(i, data.tyreradius);
                }

                vehicle.setWheelTyreRadius(0, wheeltyreradius);
                vehicle.setWheelTyreRadius(1, wheeltyreradius);
                vehicle.setWheelTyreRadius(2, wheeltyreradius);
                vehicle.setWheelTyreRadius(3, wheeltyreradius);
            }
        }

        if (wheeltyrewidth) {
            alt.on("streamSyncedMetaChange", (entity, key, value, oldValue) => {
                if (key !== "wheelModWheelTyreWidth") return;
                if (!(entity instanceof alt.Vehicle)) return;
                modWheels(entity, value);
            });

            function modWheels(vehicle, data) {
                for (let i = 0; i <= vehicle.wheelsCount; i++) {
                    vehicle.setWheelTyreWidth(i, data.tyrewidth);
                }

                vehicle.setWheelTyreWidth(0, wheeltyrewidth);
                vehicle.setWheelTyreWidth(1, wheeltyrewidth);
                vehicle.setWheelTyreWidth(2, wheeltyrewidth);
                vehicle.setWheelTyreWidth(3, wheeltyrewidth);
            }
        }

        /*if (engine) {
            function vehicleMod(vehicle, data) {
                for (let i = 0; i <= vehicle.vehicleMod; i++) {
                    Athena.vehicle.funcs.setMod(vehicle, i, data.engine);
                }

                vehicle.setMod(11, engine);
            }
        }

        if (brakes) {
            function vehicleMod(vehicle, data) {
                for (let i = 0; i <= vehicle.vehicleMod; i++) {
                    Athena.vehicle.funcs.setMod(vehicle, i, data.brakes);
                }

                vehicle.setMod(12, engine);
            }
        }

        if (transmission) {
            function vehicleMod(vehicle, data) {
                for (let i = 0; i <= vehicle.vehicleMod; i++) {
                    Athena.vehicle.funcs.setMod(vehicle, i, data.transmission);
                }

                vehicle.setMod(13, engine);
            }
        }

        if (suspension) {
            function vehicleMod(vehicle, data) {
                for (let i = 0; i <= vehicle.vehicleMod; i++) {
                    Athena.vehicle.funcs.setMod(vehicle, i, data.suspension);
                }

                vehicle.setMod(15, engine);
            }
        }

        if (armour) {
            function vehicleMod(vehicle, data) {
                for (let i = 0; i <= vehicle.vehicleMod; i++) {
                    Athena.vehicle.funcs.setMod(vehicle, i, data.armour);
                }

                vehicle.setMod(16, engine);
            }
        }

        if (turbo) {
            function vehicleMod(vehicle, data) {
                for (let i = 0; i <= vehicle.vehicleMod; i++) {
                    Athena.vehicle.funcs.setMod(vehicle, i, data.turbo);
                }

                vehicle.setMod(18, engine);
            }
        }

        if (xenon) {
            function vehicleMod(vehicle, data) {
                for (let i = 0; i <= vehicle.vehicleMod; i++) {
                    Athena.vehicle.funcs.setMod(vehicle, i, data.xenon);
                }

                vehicle.setMod(22, engine);
            }
        }*/

        alt.emitServer(Tuningshop_View_Events.PREVIEW_TUNING, wheelcamber, wheelheight, wheelrimradius, wheeltrackwidth, wheeltyreradius, wheeltyrewidth, engine, brakes, transmission, suspension, armour, turbo, xenon);
    }

    static generateCameraPoints(): Array<Vector3> {
        const cameraPoints = [];
        const zPos = alt.Player.local.pos.z;

        const [_, min, max] = native.getModelDimensions(alt.Player.local.vehicle.model);
        const offsetCalculations = [];
        const additional = 0.5;

        // Top Left
        offsetCalculations.push({
            x: min.x - additional,
            y: max.y + additional,
            z: zPos,
        });

        // Top Middle
        offsetCalculations.push({
            x: 0,
            y: max.y + additional,
            z: zPos,
        });

        // Top Right
        offsetCalculations.push({
            x: max.x + additional,
            y: max.y + additional,
            z: zPos,
        });

        // Middle Right
        offsetCalculations.push({
            x: max.x + additional,
            y: 0,
            z: zPos,
        });

        // Back Right
        offsetCalculations.push({
            x: max.x + additional,
            y: min.y - additional,
            z: zPos,
        });

        // Middle Center
        offsetCalculations.push({
            x: 0,
            y: min.y - additional,
            z: zPos,
        });

        // Bottom Left
        offsetCalculations.push({
            x: min.x - additional,
            y: min.y - additional,
            z: zPos,
        });

        // Middle Left
        offsetCalculations.push({
            x: min.x - additional,
            y: 0,
            z: zPos,
        });

        for (let i = 0; i < offsetCalculations.length; i++) {
            const calc = native.getOffsetFromEntityInWorldCoords(
                alt.Player.local.vehicle.scriptID,
                offsetCalculations[i].x,
                offsetCalculations[i].y,
                1,
            );

            cameraPoints.push(calc);
        }

        return cameraPoints;
    }
}

alt.onServer(Tuningshop_View_Events.OPEN, InternalFunctions.open);
