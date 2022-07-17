<template>
    <div class="tuning-shop-wrapper pl-2">
        <div class="stack">
            <div class="split split-full space-between mt-2">
                <Button class="mr-2 fill-full-width" :color="pageIndex === 0 ? 'orange' : 'blue'" @click="setPage(0)">
                    {{ locale.STANCE }}
                </Button>
                <Button class="mr-2 fill-full-width" :color="pageIndex === 1 ? 'orange' : 'blue'" @click="setPage(1)">
                    {{ locale.OPTIONS }}
                </Button>
            </div>
            <div class="page-filler">
                <component
                    :is="pages[pageIndex]"
                    class="fade-in"
                    :key="pageIndex"
                    v-bind:locale="locale"
                    v-bind:data="data"
                    @set-wheelcamber="setWheelCamber"
                    @set-wheelheight="setWheelHeight"
                    @set-wheelrimradius="setWheelRimRadius"
                    @set-wheeltrackwidth="setWheelTrackWidth"
                    @set-wheeltyreradius="setWheelTyreRadius"
                    @set-wheeltyrewidth="setWheelTyreWidth"
                    @set-engine="setEngine"
                    @set-brakes="setBrakes"
                    @set-transmission="setTransmission"
                    @set-suspension="setSuspension"
                    @set-armour="setArmour"
                    @set-turbo="setTurbo"
                    @set-xenon="setXenon"
                    @update-wheelcamber="updateCamber"
                    @update-wheelheight="updateHeight"
                    @update-wheelrimradius="updateRimRadius"
                    @update-wheeltrackwidth="updateTrackWidth"
                    @update-wheeltyreradius="updateTyreRadius"
                    @update-wheeltyrewidth="updateTyreWidth"
                    @update-engine="updateEngine"
                    @update-brakes="updateBrakes"
                    @update-transmission="updateTransmission"
                    @update-suspension="updateSuspension"
                    @update-armour="updateArmour"
                    @update-turbo="updateTurbo"
                    @update-xenon="updateXenon"
                ></component>
            </div>
            <div class="split">
                <Button color="red" class="mt-4 mr-2 fill-full-width" @click="exit">
                    {{ locale.EXIT }}
                </Button>
                <Button color="yellow" class="mt-4 mr-2 fill-full-width" @click="nextCam">
                    {{ locale.CAMERA }}
                </Button>
                <Button color="green" class="mt-4 mr-2 fill-full-width" @click="purchase">
                    {{ locale.BUY }}
                </Button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';
import { iTuningshopSync } from '../shared/interfaces';
import { TUNINGSHOP_LOCALE } from '../shared/locales';

const ComponentName = 'TuningShop';
export default defineComponent({
    name: ComponentName,
    components: {
        // Global Components
        Button: defineAsyncComponent(() => import('@components/Button.vue')),
        Frame: defineAsyncComponent(() => import('@components/Frame.vue')),
        Icon: defineAsyncComponent(() => import('@components/Icon.vue')),
        Input: defineAsyncComponent(() => import('@components/Input.vue')),
        Modal: defineAsyncComponent(() => import('@components/Modal.vue')),
        Module: defineAsyncComponent(() => import('@components/Module.vue')),
        RangeInput: defineAsyncComponent(() => import('@components/RangeInput.vue')),
        RangeInputSlider: defineAsyncComponent(() => import('@components/RangeInputSlider.vue')),
        SimpleInput: defineAsyncComponent(() => import('@components/SimpleInput.vue')),
        Toolbar: defineAsyncComponent(() => import('@components/Toolbar.vue')),
        // Local Components
        TuningStance: defineAsyncComponent(() => import('./components/TuningStance.vue')),
        TuningOptions: defineAsyncComponent(() => import('./components/TuningOptions.vue')),
    },
    data() {
        return {
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
            pageIndex: 0,
            pages: ['TuningStance', 'TuningOptions', 'TuningLights'],
            locale: TUNINGSHOP_LOCALE,
            data: {
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
            },
        };
    },
    mounted() {
        if ('alt' in window) {
            alt.on(`${ComponentName}:Ready`, this.syncData);
            alt.emit(`${ComponentName}:Ready`);
        }
    },
    unmounted() {
        if ('alt' in window) {
            alt.off(`${ComponentName}:Ready`, this.syncData);
        }
    },
    methods: {
        syncData(syncData: iTuningshopSync) {
            this.data = syncData;
        },

        setPage(index: number) {
            this.pageIndex = index;
        },

        updateCamber(wheelcamber: number) {
            this.wheelcamber = wheelcamber;

            this.update();
        },

        updateHeight(wheelheight: number) {
            this.wheelheight = wheelheight;

            this.update();
        },

        updateRimRadius(wheelrimradius: number) {
            this.wheelrimradius = wheelrimradius;

            this.update();
        },

        updateTrackWidth(wheeltrackwidth: number) {
            this.wheeltrackwidth = wheeltrackwidth;

            this.update();
        },

        updateTyreRadius(wheeltyreradius: number) {
            this.wheeltyreradius = wheeltyreradius;

            this.update();
        },

        updateTyreWidth(wheeltyrewidth: number) {
            this.wheeltyrewidth = wheeltyrewidth;

            this.update();
        },

        updateEngine(engine: number) {
            this.engine = engine;

            this.update();
        },

        updateBrakes(brakes: number) {
            this.brakes = brakes;

            this.update();
        },

        updateTransmission(transmission: number) {
            this.transmission = transmission;

            this.update();
        },

        updateSuspension(suspension: number) {
            this.suspension = suspension;

            this.update();
        },

        updateArmour(armour: number) {
            this.armour = armour;

            this.update();
        },

        updateTurbo(turbo: number) {
            this.turbo = turbo;

            this.update();
        },

        updateXenon(xenon: number) {
            this.xenon = xenon;

            this.update();
        },

        update() {
            if ('alt' in window) {
                alt.emit(
                    `${ComponentName}:Update`,
                    this.wheelcamber,
                    this.wheelheight,
                    this.wheelrimradius,
                    this.wheeltrackwidth,
                    this.wheeltyreradius,
                    this.wheeltyrewidth,
                    this.engine,
                    this.brakes,
                    this.transmission,
                    this.suspension,
                    this.armour,
                    this.turbo,
                    this.xenon,
                );
            }
        },
        nextCam() {
            if ('alt' in window) {
                alt.emit(`${ComponentName}:NextCam`);
            }
        },
        purchase() {
            if ('alt' in window) {
                alt.emit(
                    `${ComponentName}:Purchase`,
                    this.wheelcamber,
                    this.wheelheight,
                    this.wheelrimradius,
                    this.wheeltrackwidth,
                    this.wheeltyreradius,
                    this.wheeltyrewidth,
                    this.engine,
                    this.brakes,
                    this.transmission,
                    this.suspension,
                    this.armour,
                    this.turbo,
                    this.xenon,
                );
            }
        },
        exit() {
            if ('alt' in window) {
                alt.emit(`${ComponentName}:Close`);
            }
        },
    },
});
</script>

<style scoped>
.tuning-shop-wrapper {
    position: fixed;
    left: 0vh !important;
    top: 0vh;
    background: rgba(12, 12, 12, 1) !important;
    min-height: 100vh;
    max-height: 100vh;
    min-width: 250px;
    max-width: 250px;
    overflow: hidden;
}

.page-filler {
    overflow: hidden;
    min-height: calc(100vh - 114px);
    max-height: calc(100vh - 114px);
}
</style>
