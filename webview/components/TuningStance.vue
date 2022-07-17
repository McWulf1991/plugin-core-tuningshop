<template>
    <div class="wrapper stack mt-2">
        <div class="stack mb-2 mr-2 mt-2">
            <Module :name="locale.CAMBER">
                <span class="subtitle-2 pb-4">{{ locale.CAMBER_DESC }}</span>
                <div class="stack pt-6">
                    <RangeInputSlider
                        :minIndex="-2.0"
                        :maxIndex="2.0"
                        :indexValue="wheelcamber"
                        :increment="0.01"
                        @input="(e) => setWheelCamber(e)"
                        @change="outputWheelCamber"
                        class="fill-full-width"
                    />
                </div>
            </Module>
            <br />
            <Module :name="locale.HEIGHT">
                <span class="subtitle-2 pb-4">{{ locale.HEIGHT_DESC }}</span>
                <div class="stack pt-6">
                    <RangeInputSlider
                        :minIndex="-2.0"
                        :maxIndex="2.0"
                        :indexValue="wheelheight"
                        :increment="0.01"
                        @input="(e) => setWheelHeight(e)"
                        @change="outputWheelHeight"
                        class="fill-full-width"
                    />
                </div>
            </Module>
            <br />
            <Module :name="locale.RIMRADIUS">
                <span class="subtitle-2 pb-4">{{ locale.RIMRADIUS_DESC }}</span>
                <div class="stack pt-6">
                    <RangeInputSlider
                        :minIndex="-2.0"
                        :maxIndex="2.0"
                        :indexValue="wheelrimradius"
                        :increment="0.01"
                        @input="(e) => setWheelRimRadius(e)"
                        @change="outputWheelRimRadius"
                        class="fill-full-width"
                    />
                </div>
            </Module>
            <br />
            <Module :name="locale.TRACKWIDTH">
                <span class="subtitle-2 pb-4">{{ locale.TRACKWIDTH_DESC }}</span>
                <div class="stack pt-6">
                    <RangeInputSlider
                        :minIndex="-2.0"
                        :maxIndex="2.0"
                        :indexValue="wheeltrackwidth"
                        :increment="0.01"
                        @input="(e) => setWheelTrackWidth(e)"
                        @change="outputWheelTrackWidth"
                        class="fill-full-width"
                    />
                </div>
            </Module>
            <br />
            <Module :name="locale.TYRERADIUS">
                <span class="subtitle-2 pb-4">{{ locale.TYRERADIUS_DESC }}</span>
                <div class="stack pt-6">
                    <RangeInputSlider
                        :minIndex="-2.0"
                        :maxIndex="2.0"
                        :indexValue="wheeltyreradius"
                        :increment="0.01"
                        @input="(e) => setWheelTyreRadius(e)"
                        @change="outputWheelTyreRadius"
                        class="fill-full-width"
                    />
                </div>
            </Module>
            <br />
            <Module :name="locale.TYREWIDTH">
                <span class="subtitle-2 pb-4">{{ locale.TYREWIDTH_DESC }}</span>
                <div class="stack pt-6">
                    <RangeInputSlider
                        :minIndex="-2.0"
                        :maxIndex="2.0"
                        :indexValue="wheeltyrewidth"
                        :increment="0.01"
                        @input="(e) => setWheelTyreWidth(e)"
                        @change="outputWheelTyreWidth"
                        class="fill-full-width"
                    />
                </div>
            </Module>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';
import { iTuningshopSync } from '../../shared/interfaces';
import {
    VEHICLE_TUNE_CAMBER,
    VEHICLE_TUNE_HEIGHT,
    VEHICLE_TUNE_RIMRADIUS,
    VEHICLE_TUNE_TRACKWIDTH,
    VEHICLE_TUNE_TYRERADIUS,
    VEHICLE_TUNE_TYREWIDTH,
} from '../../shared/const';
import { Double } from 'bson';

const ComponentName = 'TuningStance';
export default defineComponent({
    name: ComponentName,
    data() {
        return {
            update: 1,
            wheelcamber: 0.0,
            wheelheight: 0.0,
            whelrimradius: 0.0,
            wheeltrackwidth: 0.0,
            wheeltyreradius: 0.0,
            wheeltyrewidth: 0.0,
        };
    },
    props: {
        data: {
            type: Number,
        },
        locale: {
            type: Number,
            required: true,
        },
    },
    components: {
        Button: defineAsyncComponent(() => import('@components/Button.vue')),
        Icon: defineAsyncComponent(() => import('@components/Icon.vue')),
        RangeInput: defineAsyncComponent(() => import('@components/RangeInput.vue')),
        RangeInputSlider: defineAsyncComponent(() => import('@components/RangeInputSlider.vue')),
        SimpleInput: defineAsyncComponent(() => import('@components/SimpleInput.vue')),
        ColorSlider: defineAsyncComponent(() => import('@components/ColorSlider.vue')),
        Module: defineAsyncComponent(() => import('@components/Module.vue')),
    },
    computed: {
        getWheelCamber(): Array<{ value: number }> {
            const wheelcamber: Array<{ value: number }> = [];

            Object.keys(VEHICLE_TUNE_CAMBER).forEach((index) => {
                wheelcamber.push({ value: VEHICLE_TUNE_CAMBER[index] });
            });

            return wheelcamber;
        },
        getWheelHeight(): Array<{ value: number }> {
            const wheelheight: Array<{ value: number }> = [];

            Object.keys(VEHICLE_TUNE_HEIGHT).forEach((index) => {
                wheelheight.push({ value: VEHICLE_TUNE_HEIGHT[index] });
            });

            return wheelheight;
        },
        getWheelRimRadius(): Array<{ value: number }> {
            const wheelrimradius: Array<{ value: number }> = [];

            Object.keys(VEHICLE_TUNE_RIMRADIUS).forEach((index) => {
                wheelrimradius.push({ value: VEHICLE_TUNE_RIMRADIUS[index] });
            });

            return wheelrimradius;
        },
        getWheelTrackWidth(): Array<{ value: number }> {
            const wheeltrackwidth: Array<{ value: number }> = [];

            Object.keys(VEHICLE_TUNE_TRACKWIDTH).forEach((index) => {
                wheeltrackwidth.push({ value: VEHICLE_TUNE_TRACKWIDTH[index] });
            });

            return wheeltrackwidth;
        },
        getWheelTyreRadius(): Array<{ value: number }> {
            const wheeltyreradius: Array<{ value: number }> = [];

            Object.keys(VEHICLE_TUNE_TYRERADIUS).forEach((index) => {
                wheeltyreradius.push({ value: VEHICLE_TUNE_TYRERADIUS[index] });
            });

            return wheeltyreradius;
        },
        getWheelTyreWidth(): Array<{ value: number }> {
            const wheeltyrewidth: Array<{ value: number }> = [];

            Object.keys(VEHICLE_TUNE_TYREWIDTH).forEach((index) => {
                wheeltyrewidth.push({ value: VEHICLE_TUNE_TYREWIDTH[index] });
            });

            return wheeltyrewidth;
        },
    },
    methods: {
        setWheelCamber(e: Event) {
            const result = e.target['value'];
            this.wheelcamber = parseFloat(result);

            this.$emit('update-wheelcamber', this.wheelcamber);
        },

        setWheelHeight(e: Event) {
            const result = e.target['value'];
            this.wheelheight = parseFloat(result);

            this.$emit('update-wheelheight', this.wheelheight);
        },

        setWheelRimRadius(e: Event) {
            const result = e.target['value'];
            this.wheelrimradius = parseFloat(result);

            this.$emit('update-wheelrimradius', this.wheelrimradius);
        },

        setWheelTrackWidth(e: Event) {
            const result = e.target['value'];
            this.wheeltrackwidth = parseFloat(result);

            this.$emit('update-wheeltrackwidth', this.wheeltrackwidth);
        },

        setWheelTyreRadius(e: Event) {
            const result = e.target['value'];
            this.wheeltyreradius = parseFloat(result);

            this.$emit('update-wheeltyreradius', this.wheeltyreradius);
        },

        setWheelTyreWidth(e: Event) {
            const result = e.target['value'];
            this.wheeltyrewidth = parseFloat(result);

            this.$emit('update-wheeltyrewidth', this.wheeltyrewidth);
        },

        /*setWheelCamber(value: number, isNew = true) {
            if (isNew) {
                this.wheelcamber = value;
            }

            this.$emit('update-wheelcamber', this.wheelcamber);
        },

        setWheelHeight(value: number, isNew = true) {
            if (isNew) {
                this.wheelheight = value;
            }

            this.$emit('update-wheelheight', this.wheelheight);
        },

        setWheelRimRadius(value: number, isNew = true) {
            if (isNew) {
                this.wheelrimradius = value;
            }

            this.$emit('update-wheelrimradius', this.wheelrimradius);
        },

        setWheelTrackWidth(value: number, isNew = true) {
            if (isNew) {
                this.wheeltrackwidth = value;
            }

            this.$emit('update-wheeltrackwidth', this.wheeltrackwidth);
        },

        setWheelTyreRadius(value: number, isNew = true) {
            if (isNew) {
                this.wheeltyreradius = value;
            }

            this.$emit('update-wheeltyreradius', this.wheeltyreradius);
        },

        setWheelTyreWidth(value: number, isNew = true) {
            if (isNew) {
                this.wheeltyrewidth = value;
            }

            this.$emit('update-wheeltyrewidth', this.wheeltyrewidth);
        },*/

        outputWheelCamber(value: number) {
            if (value === undefined) {
                return;
            }

            this.$emit('set-wheelcamber', { value }, true);
        },

        outputWheelHeight(value: number) {
            if (value === undefined) {
                return;
            }

            this.$emit('set-wheelheight', { value }, true);
        },

        outputWheelRimRadius(value: number) {
            if (value === undefined) {
                return;
            }

            this.$emit('set-wheelrimradius', { value }, true);
        },

        outputWheelTrackWidth(value: number) {
            if (value === undefined) {
                return;
            }

            this.$emit('set-wheeltrackwidth', { value }, true);
        },

        outputWheelTyreRadius(value: number) {
            if (value === undefined) {
                return;
            }

            this.$emit('set-wheeltyreradius', { value }, true);
        },

        outputWheelTyreWidth(value: number) {
            if (value === undefined) {
                return;
            }

            this.$emit('set-wheeltyrewidth', { value }, true);
        },
    },
    watch: {
        data(syncData: iTuningshopSync) {
            this.wheelcamber = syncData.wheelcamber;
            this.wheelheight = syncData.wheelheight;
            this.wheelrimradius = syncData.wheelrimradius;
            this.wheeltrackwidth = syncData.wheeltrackwidth;
            this.wheeltyreradius = syncData.wheeltyreradius;
            this.wheeltyrewidth = syncData.wheeltyrewidth;

            this.$nextTick(() => {
                /*this.$emit('set-wheelcamber', syncData.wheelcamber, true);
                this.$emit('set-wheelheight', syncData.wheelheight, true);
                this.$emit('set-wheelrimradius', syncData.wheelrimradius, true);
                this.$emit('set-wheeltrackwidth', syncData.wheeltrackwidth, true);
                this.$emit('set-wheeltyreradius', syncData.wheeltyreradius, true);
                this.$emit('set-wheeltyrewidth', syncData.wheeltyrewidth, true);*/
                this.$emit('update-wheelcamber', this.wheelcamber);
                this.$emit('update-wheelheight', this.wheelheight);
                this.$emit('update-wheelrimradius', this.wheelrimradius);
                this.$emit('update-wheeltrackwidth', this.wheeltrackwidth);
                this.$emit('update-wheeltyreradius', this.wheeltyreradius);
                this.$emit('update-wheeltyrewidth', this.wheeltyrewidth);
            });
        },
    },
});
</script>

<style scoped>
.wrapper {
    overflow-y: scroll;
    min-height: calc(100vh - 125px);
    max-height: calc(100vh - 125px);
}

.wheelcamber {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    align-content: center;
}

.wheelheight {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    align-content: center;
}

.wheelrimradius {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    align-content: center;
}

.wheeltrackwidth {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    align-content: center;
}

.wheeltyreradius {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    align-content: center;
}

.wheeltyrewidth {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    align-content: center;
}

input[type='color']::-webkit-color-swatch {
    padding: 4px;
    border: none;
    border-radius: 3px;
}

input[type='color']::-webkit-color-swatch-wrapper {
    padding: 4px;
    border: none;
    border-radius: 3px;
}

input[type='color'] {
    height: 35px;
    width: 100px;
    border-radius: 6px;
    overflow: hidden;
    background: none;
    border: 2px solid rgba(255, 255, 255, 0.2);
    box-sizing: border-box;
}

input[type='color']:hover {
    cursor: pointer;
}
</style>
