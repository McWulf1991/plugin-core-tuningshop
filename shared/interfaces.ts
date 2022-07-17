import { Vector3 } from '../../../shared/interfaces/vector';

export interface iTuningshopSync {
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
}

export interface ITuningShop {
    uid: string;
    cost: number;
    vertices: Array<Vector3>;
}
