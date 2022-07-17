import * as alt from 'alt-server';
import { PolygonShape } from '../../../../server/extensions/extColshape';
import VehicleFuncs from '../../../../server/extensions/vehicleFuncs';
import { sha256Random } from '../../../../server/utility/encryption';
import { VehicleEvents } from '../../../../server/events/vehicleEvents';
import { ATHENA_EVENTS_VEHICLE } from '../../../../shared/enums/athenaEvents';
import { Tuningshop_View_Events } from '../../shared/events';
import { ITuningShop, iTuningshopSync } from '../../shared/interfaces';
import { TUNING_SHOPS } from './shops';
import { ServerBlipController } from '../../../../server/systems/blip';
import { Athena } from '../../../../server/api/athena';
import { TUNINGSHOP_LOCALE } from '../../shared/locales';

const shops: Array<ITuningShop> = [];
const inShop = {};

class InternalFunctions {
    /**
     * Update the vehicle tuning based on data.
     * @param vehicle - The vehicle to update.
     */
    static updateTuning(vehicle: alt.Vehicle) {
        if (vehicle.data?.tuning) return;
        vehicle.setStreamSyncedMeta("wheelModCamber", { camber: vehicle.data.tuning.wheelcamber })
        vehicle.setStreamSyncedMeta("wheelModHeight", { height: vehicle.data.tuning.wheelheight })
        vehicle.setStreamSyncedMeta("wheelModRimRadius", { rimradius: vehicle.data.tuning.wheelrimradius })
        vehicle.setStreamSyncedMeta("wheelModTrackWidth", { trackwidth: vehicle.data.tuning.wheeltrackwidth })
        vehicle.setStreamSyncedMeta("wheelModTyreRadius", { tyreradius: vehicle.data.tuning.wheeltyreradius })
        vehicle.setStreamSyncedMeta("wheelModTyreWidth", { tyrewidth: vehicle.data.tuning.wheeltyrewidth })
        /*vehicle.setStreamSyncedMeta("vehicleModEngine", { engine: vehicle.data.tuning.engine })
        vehicle.setStreamSyncedMeta("vehicleModBrakes", { brakes: vehicle.data.tuning.brakes })
        vehicle.setStreamSyncedMeta("vehicleModTransmission", { transmission: vehicle.data.tuning.transmission })
        vehicle.setStreamSyncedMeta("vehicleModSuspension", { suspension: vehicle.data.tuning.suspension })
        vehicle.setStreamSyncedMeta("vehicleModArmour", { armour: vehicle.data.tuning.armour })
        vehicle.setStreamSyncedMeta("vehicleModTurbo", { turbo: vehicle.data.tuning.turbo })
        vehicle.setStreamSyncedMeta("vehicleModXenon", { xenon: vehicle.data.tuning.xenon })
        vehicle.getMod(11)
        vehicle.getMod(12)
        vehicle.getMod(13)
        vehicle.getMod(15)
        vehicle.getMod(16)
        vehicle.getMod(18)
        vehicle.getMod(22)*/
        vehicle.setMod(11, vehicle.data.tuning.engine)
        vehicle.setMod(12, vehicle.data.tuning.brakes)
        vehicle.setMod(13, vehicle.data.tuning.transmission)
        vehicle.setMod(15, vehicle.data.tuning.suspension)
        vehicle.setMod(16, vehicle.data.tuning.armour)
        vehicle.setMod(18, vehicle.data.tuning.turbo)
        vehicle.setMod(22, vehicle.data.tuning.xenon)
    }

    static previewTuning(
        player: alt.Player,
        wheelcamber: number = 0.01,
        wheelheight: number = 0.01,
        wheelrimradius: number = 0.01,
        wheeltrackwidth: number = 0.01,
        wheeltyreradius: number = 0.01,
        wheeltyrewidth: number = 0.01,
        engine: number = 0,
        brakes: number = 0,
        transmission: number = 0,
        suspension: number = 0,
        armour: number = 0,
        turbo: number = 0,
        xenon: number = 0,
    ) {
        if (!inShop[player.id]) {
            return;
        }

        if (!player.vehicle) {
            return;
        }

        if (wheelcamber >= 0) {
            player.vehicle.setStreamSyncedMeta("wheelModCamber", { camber: wheelcamber })
        }

        if (wheelheight >= 0) {
            player.vehicle.setStreamSyncedMeta("wheelModHeight", { height: wheelheight })
        }

        if (wheelrimradius >= 0) {
            player.vehicle.setStreamSyncedMeta("wheelModRimRadius", { rimradius: wheelrimradius })
        }

        if (wheeltrackwidth >= 0) {
            player.vehicle.setStreamSyncedMeta("wheelModTrackWidth", { trackwidth: wheeltrackwidth })
        }

        if (wheeltyreradius >= 0) {
            player.vehicle.setStreamSyncedMeta("wheelModTyreRadius", { tyreradius: wheeltyreradius })
        }

        if (wheeltyrewidth >= 0) {
            player.vehicle.setStreamSyncedMeta("wheelModTyreWidth", { tyrewidth: wheeltyrewidth })
        }

        if (engine >= 0) {
            //player.vehicle.setStreamSyncedMeta("vehicleModEngine", { engine: engine })
            player.vehicle.setMod(11, engine)
        }

        if (brakes >= 0) {
            //player.vehicle.setStreamSyncedMeta("vehicleModBrakes", { brakes: brakes })
            player.vehicle.setMod(12, brakes)
        }

        if (transmission >= 0) {
            //player.vehicle.setStreamSyncedMeta("vehicleModTransmission", { transmission: transmission })
            player.vehicle.setMod(13, transmission)
        }

        if (suspension >= 0) {
            //player.vehicle.setStreamSyncedMeta("vehicleModSuspension", { suspension: suspension })
            player.vehicle.setMod(15, suspension)
        }

        if (armour >= 0) {
            //player.vehicle.setStreamSyncedMeta("vehicleModArmour", { armour: armour })
            player.vehicle.setMod(16, armour)
        }

        if (turbo >= 0) {
            //player.vehicle.setStreamSyncedMeta("vehicleModTurbo", { turbo: turbo })
            player.vehicle.setMod(18, turbo)
        }

        if (xenon >= 0) {
            //player.vehicle.setStreamSyncedMeta("vehicleModXenon", { xenon: xenon })
            player.vehicle.setMod(22, xenon)
        }
    }
}

export class TuningShopView {
    static init() {
        for (let i = 0; i < TUNING_SHOPS.length; i++) {
            TuningShopView.register(TUNING_SHOPS[i]);
        }

        alt.onClient(Tuningshop_View_Events.PREVIEW_TUNING, InternalFunctions.previewTuning);
        alt.onClient(Tuningshop_View_Events.OPEN, TuningShopView.open);
        alt.onClient(Tuningshop_View_Events.PURCHASE, TuningShopView.purchase);
        alt.onClient(Tuningshop_View_Events.CLOSE, TuningShopView.close);
        VehicleEvents.on(ATHENA_EVENTS_VEHICLE.SPAWNED, InternalFunctions.updateTuning);
    }

    /**
     * Update the vehicle's tuning and remove the player from the inShop array.
     * Restores the previous tuning that was applied to the vehicle.
     * @param player - alt.Player - The player who is opening the tuning shop.
     * @returns Nothing.
     */
    static close(player: alt.Player) {
        if (!player.vehicle) {
            return;
        }

        InternalFunctions.updateTuning(player.vehicle);
        delete inShop[player.id];
    }

    /**
     * Register a Vehicle Tuning Shop
     * @static
     * @param {ITuningShop} shop
     * @return {*}  {string}
     * @memberof PaintShopView
     */
    static register(shop: ITuningShop): string {
        if (!shop.uid) {
            shop.uid = sha256Random(JSON.stringify(shop));
        }

        const index = shops.findIndex((x) => x.uid === shop.uid);
        if (index >= 0) {
            console.error(new Error(`Shop with ${shop.uid} is a duplicate.`));
            return null;
        }

        ServerBlipController.append({
            text: TUNINGSHOP_LOCALE.TUNINGSHOP_LABEL,
            color: 46,
            sprite: 100,
            scale: 0.6,
            shortRange: true,
            pos: shop.vertices[0],
            uid: `tuning-shop-${shop.uid}`,
        });

        const polygon = new PolygonShape(
            shop.vertices[0].z - 2.5,
            shop.vertices[0].z + 2.5,
            shop.vertices,
            true,
            false,
        );
        polygon.addEnterCallback(TuningShopView.enter);
        polygon.addLeaveCallback(TuningShopView.leave);
        return shop.uid;
    }

    /**
     * When the player enters the polygon, they will be able to open the tuning shop.
     * This function is triggered when a player has entered the PolygonShape.
     * @param {PolygonShape} polygon - PolygonShape
     * @param player - alt.Player
     * @returns Nothing.
     */
    static enter(polygon: PolygonShape, player: alt.Player) {
        if (!(player instanceof alt.Player)) {
            return;
        }

        if (!player.vehicle) {
            Athena.player.emit.notification(player, TUNINGSHOP_LOCALE.MUST_BE_IN_A_VEHICLE);
            return;
        }

        if (!player.vehicle.data || player.vehicle.isTemporary) {
            Athena.player.emit.notification(player, TUNINGSHOP_LOCALE.CANNOT_BE_MODIFIED);
            return;
        }

        if (player.vehicle.driver.id !== player.id) {
            return;
        }

        if (!player.vehicle.modKit) {
            player.vehicle.modKit = 1;
        }

        inShop[player.id] = true;

        Athena.player.emit.sound2D(player, 'shop_enter', 0.5);
        Athena.player.emit.interactionAdd(player, {
            keyPress: 'E',
            description: TUNINGSHOP_LOCALE.OPEN_MENU,
            uid: polygon.uid,
        });
        Athena.player.emit.interactionTemporary(player, Tuningshop_View_Events.OPEN);
    }

    /**
     * When a player leaves the shop, the shop will be removed from the player's interaction list.
     * Removes all temporary interactions that were created in the PolygonShape.
     * @param {PolygonShape} polygon - The polygon that the player is leaving.
     * @param player - alt.Player - The player that is leaving the shop.
     * @returns Nothing.
     */
    static leave(polygon: PolygonShape, player: alt.Player) {
        if (!(player instanceof alt.Player)) {
            return;
        }

        inShop[player.id] = false;
        delete inShop[player.id];
        Athena.player.emit.interactionRemove(player, polygon.uid);
        Athena.player.emit.interactionTemporary(player, null);
    }

    /**
     * Opens the tuning shop for the player
     * @param player - alt.Player
     * @returns The `alt.emitClient` function returns a `Promise` object.
     */
    static open(player: alt.Player) {
        if (!player.vehicle || player.vehicle.driver !== player) {
            return;
        }

        if (!player.vehicle.data || player.vehicle.isTemporary) {
            return;
        }

        if (!VehicleFuncs.hasOwnership(player, player.vehicle)) {
            return;
        }

        if (!inShop[player.id]) {
            return;
        }

        const syncData: iTuningshopSync = {
            wheelcamber: 0,
            wheelheight: 0,
            wheelrimradius: 0,
            wheeltrackwidth: 0,
            wheeltyreradius: 0,
            wheeltyrewidth: 0,
            engine: 0,
            brakes: 0,
            transmission: 0,
            suspension: 0,
            armour: 0,
            turbo: 0,
            xenon: 0,
        };

        alt.emitClient(player, Tuningshop_View_Events.OPEN, syncData);
    }

    /**
     * It takes in a player, the camber, height, rimradius, trackwidth, tyreradius, tyrewidth, engine, brakes, transmission, suspension, 
     * armour, turbo, xenon and updates the vehicle's
     * camber, height, rimradius, trackwidth, tyreradius, tyrewidth, engine, brakes, transmission, suspension, 
     * armour, turbo and xenon
     * @param player - alt.Player - The player who is purchasing the vehicle.
     * @param {number} wheelcamber - The camber of the vehicle.
     * @param {number} wheelheight - The height of the vehicle.
     * @param {number} wheelrimradius - The rimradius of the vehicle.
     * @param {number} wheeltrackwidth - The trackwidth of the vehicle.
     * @param {number} wheeltyreradius - The tyreradius of the vehicle.
     * @param {number} wheeltyrewidth - The tyrewidth of the vehicle.
     * @param {number} engine - The engine of the vehicle.
     * @param {number} brakes - The brakes of the vehicle.
     * @param {number} transmission - The transmission of the vehicle.
     * @param {number} suspension - The suspension of the vehicle.
     * @param {number} armour - The armour of the vehicle.
     * @param {number} turbo - The turbo of the vehicle.
     * @param {number} xenon - The xenon of the vehicle.
     * @returns Nothing.
     */
    static purchase(
        player: alt.Player,
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
        if (!player.vehicle || player.vehicle.driver !== player) {
            return;
        }

        if (!inShop[player.id]) {
            return;
        }

        if (player.vehicle.isTemporary) {
            return;
        }

        if (!player.vehicle.modKit) {
            player.vehicle.modKit = 1;
        }

        if (!VehicleFuncs.hasOwnership(player, player.vehicle)) {
            return;
        }

        if (wheelcamber !== undefined && wheelcamber !== null) {
            player.vehicle.setStreamSyncedMeta("wheelModWheelCamber", { camber: wheelcamber })
        }

        if (wheelheight !== undefined && wheelheight !== null) {
            player.vehicle.setStreamSyncedMeta("wheelModWheelHeight", { height: wheelheight })
        }

        if (wheelrimradius !== undefined && wheelrimradius !== null) {
            player.vehicle.setStreamSyncedMeta("wheelModWheelRimRadius", { rimradius: wheelrimradius })
        }

        if (wheeltrackwidth !== undefined && wheeltrackwidth !== null) {
            player.vehicle.setStreamSyncedMeta("wheelModWheelTrackWidth", { trackwidth: wheeltrackwidth })
        }

        if (wheeltyreradius !== undefined && wheeltyreradius !== null) {
            player.vehicle.setStreamSyncedMeta("wheelModWheelTyreRadius", { tyreradius: wheeltyreradius })
        }

        if (wheeltyrewidth !== undefined && wheeltyrewidth !== null) {
            player.vehicle.setStreamSyncedMeta("wheelModWheelTyreWidth", { tyrewidth: wheeltyrewidth });
        }

        if (engine !== undefined && engine !== null) {
            //player.vehicle.setStreamSyncedMeta("vehicleModEngine", { engine: engine });
            player.vehicle.setMod(11, engine);
        }

        if (brakes !== undefined && brakes !== null) {
            //player.vehicle.setStreamSyncedMeta("vehicleModBrakes", { brakes: brakes });
            player.vehicle.setMod(12, brakes);
        }

        if (transmission !== undefined && transmission !== null) {
            //player.vehicle.setStreamSyncedMeta("vehicleModTransmission", { transmission: transmission });
            player.vehicle.setMod(13, transmission);
        }

        if (suspension !== undefined && suspension !== null) {
            //player.vehicle.setStreamSyncedMeta("vehicleModSuspension", { suspension: suspension });
            player.vehicle.setMod(15, suspension);
        }

        if (armour !== undefined && armour !== null) {
            //player.vehicle.setStreamSyncedMeta("vehicleModArmour", { armour: armour });
            player.vehicle.setMod(16, armour);
        }

        if (turbo !== undefined && turbo !== null) {
            //player.vehicle.setStreamSyncedMeta("vehicleModTurbo", { turbo: turbo });
            player.vehicle.setMod(18, turbo);
        }

        if (xenon !== undefined && xenon !== null) {
            //player.vehicle.setStreamSyncedMeta("vehicleModXenon", { xenon: xenon });
            player.vehicle.setMod(22, xenon);
        }

        InternalFunctions.updateTuning(player.vehicle);
        VehicleFuncs.save(player.vehicle, player.vehicle.data);
    }
}
