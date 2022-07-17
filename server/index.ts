import * as alt from 'alt-server';
import { PluginSystem } from '../../../server/systems/plugins';
import { TuningShopView } from './src/view';

const PLUGIN_NAME = 'Tuning Shop Plugin';
const AUTHORS = ['DustCore1991'];

PluginSystem.registerPlugin(PLUGIN_NAME, () => {
    TuningShopView.init();
    alt.log(`~lg~CORE ==> ${PLUGIN_NAME} was Loaded. (~w~Authors: ${AUTHORS.join(', ')}~lg~)`);
});
