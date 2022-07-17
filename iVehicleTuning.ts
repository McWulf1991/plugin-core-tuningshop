import IVehicleHandling from './iVehicleHandling';
import IVehicleMod from './iVehicleMod';
import { IVehicleNeon, NumberPlateStyle, RGBA, WindowTint } from 'alt-server';

export default interface IVehicleTuning {
    modkit: number;
    mods: Array<IVehicleMod>;
    handling: Partial<IVehicleHandling>;

    primaryColor: number | RGBA;
    primaryFinish: number;
    secondaryColor: number | RGBA;
    secondaryFinish: number;
    customTires: boolean;
    darkness: number;
    dashboardColor: number;
    headlightColor: number;
    interiorColor: number;
    lightsMultiplier: number;
    livery: number;
    neon: Partial<IVehicleNeon>;
    neonEnabled: boolean;
    neonColor: RGBA;
    numberPlateIndex: NumberPlateStyle;
    pearlColor: number;
    roofLivery: number;
    roofState: boolean;
    tireSmokeColor: RGBA;
    wheelColor: number;
    windowTint: WindowTint;
    driftModeEnabled: boolean;
    wheelcamber: number;
    wheelheight: number;
    wheelrimradius: number;
    wheeltrackwidth: number;
    wheeltyreradius: number;
    wheeltyrewidth: number;
    engine: number;
    brakes: number;
    transmission: number;
    suspension: number;
    armour: number;
    turbo: number;
    xenon: number;
    spoiler: number,
    frontbumper: number,
    rearbumper: number,
    sideskirt: number,
    exhaust: number,
    frame: number,
    grill: number,
    hood: number,
    roof: number,
}
