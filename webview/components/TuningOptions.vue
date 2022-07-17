<template>
    <div class="wrapper stack mt-2">
        <div class="stack mb-2 mr-2 mt-2">
            <Module :name="locale.ENGINE">
                <span class="subtitle-2 pb-4">{{ locale.ENGINE_DESC }}</span>
                <div class="stack pt-6">
                    <RangeInputSlider
                        :minIndex="0"
                        :maxIndex="4"
                        :indexValue="engine"
                        :increment="1"
                        @input="(e) => setEngine(e)"
                        @change="outputEngine"
                        class="fill-full-width"
                    />
                </div>
            </Module>
            <br />
            <Module :name="locale.BRAKES">
                <span class="subtitle-2 pb-4">{{ locale.BRAKES_DESC }}</span>
                <div class="stack pt-6">
                    <RangeInputSlider
                        :minIndex="0"
                        :maxIndex="3"
                        :indexValue="brakes"
                        :increment="1"
                        @input="(e) => setBrakes(e)"
                        @change="outputBrakes"
                        class="fill-full-width"
                    />
                </div>
            </Module>
            <br />
            <Module :name="locale.TRANSMISSION">
                <span class="subtitle-2 pb-4">{{ locale.TRANSMISSION_DESC }}</span>
                <div class="stack pt-6">
                    <RangeInputSlider
                        :minIndex="0"
                        :maxIndex="3"
                        :indexValue="transmission"
                        :increment="1"
                        @input="(e) => setTransmission(e)"
                        @change="outputTransmission"
                        class="fill-full-width"
                    />
                </div>
            </Module>
            <br />
            <Module :name="locale.SUSPENSION">
                <span class="subtitle-2 pb-4">{{ locale.SUSPENSION_DESC }}</span>
                <div class="stack pt-6">
                    <RangeInputSlider
                        :minIndex="0"
                        :maxIndex="4"
                        :indexValue="suspension"
                        :increment="1"
                        @input="(e) => setSuspension(e)"
                        @change="outputSuspension"
                        class="fill-full-width"
                    />
                </div>
            </Module>
            <br />
            <Module :name="locale.ARMOUR">
                <span class="subtitle-2 pb-4">{{ locale.ARMOUR_DESC }}</span>
                <div class="stack pt-6">
                    <RangeInputSlider
                        :minIndex="0"
                        :maxIndex="5"
                        :indexValue="armour"
                        :increment="1"
                        @input="(e) => setArmour(e)"
                        @change="outputArmour"
                        class="fill-full-width"
                    />
                </div>
            </Module>
            <br />
            <Module :name="locale.TURBO">
                <span class="subtitle-2 pb-4">{{ locale.TURBO_DESC }}</span>
                <div class="stack pt-6">
                    <RangeInputSlider
                        :minIndex="0"
                        :maxIndex="1"
                        :indexValue="turbo"
                        :increment="1"
                        @input="(e) => setTurbo(e)"
                        @change="outputTurbo"
                        class="fill-full-width"
                    />
                </div>
            </Module>
            <br />
            <Module :name="locale.XENON">
                <span class="subtitle-2 pb-4">{{ locale.XENON_DESC }}</span>
                <div class="stack pt-6">
                    <RangeInputSlider
                        :minIndex="0"
                        :maxIndex="1"
                        :indexValue="xenon"
                        :increment="1"
                        @input="(e) => setXenon(e)"
                        @change="outputXenon"
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
    VEHICLE_TUNE_ENGINE,
    VEHICLE_TUNE_BRAKES,
    VEHICLE_TUNE_TRANSMISSION,
    VEHICLE_TUNE_SUSPENSION,
    VEHICLE_TUNE_ARMOUR,
    VEHICLE_TUNE_TURBO,
    VEHICLE_TUNE_XENON,
} from '../../shared/const';

const ComponentName = 'TuningOptions';
export default defineComponent({
    name: ComponentName,
    data() {
        return {
            update: 1,
            engine: 0,
            brakes: 0,
            transmission: 0,
            suspension: 0,
            armour: 0,
            turbo: 0,
            xenon: 0,
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
        getEngine(): Array<{ value: number }> {
            const engine: Array<{ value: number }> = [];

            Object.keys(VEHICLE_TUNE_ENGINE).forEach((index) => {
                engine.push({ value: VEHICLE_TUNE_ENGINE[index] });
            });

            return engine;
        },
        getBrakes(): Array<{ value: number }> {
            const brakes: Array<{ value: number }> = [];

            Object.keys(VEHICLE_TUNE_BRAKES).forEach((index) => {
                brakes.push({ value: VEHICLE_TUNE_BRAKES[index] });
            });

            return brakes;
        },
        getTransmission(): Array<{ value: number }> {
            const transmission: Array<{ value: number }> = [];

            Object.keys(VEHICLE_TUNE_TRANSMISSION).forEach((index) => {
                transmission.push({ value: VEHICLE_TUNE_TRANSMISSION[index] });
            });

            return transmission;
        },
        getSuspension(): Array<{ value: number }> {
            const suspension: Array<{ value: number }> = [];

            Object.keys(VEHICLE_TUNE_SUSPENSION).forEach((index) => {
                suspension.push({ value: VEHICLE_TUNE_SUSPENSION[index] });
            });

            return suspension;
        },
        getArmour(): Array<{ value: number }> {
            const armour: Array<{ value: number }> = [];

            Object.keys(VEHICLE_TUNE_ARMOUR).forEach((index) => {
                armour.push({ value: VEHICLE_TUNE_ARMOUR[index] });
            });

            return armour;
        },
        getTurbo(): Array<{ value: number }> {
            const turbo: Array<{ value: number }> = [];

            Object.keys(VEHICLE_TUNE_TURBO).forEach((index) => {
                turbo.push({ value: VEHICLE_TUNE_TURBO[index] });
            });

            return turbo;
        },
        getXenon(): Array<{ value: number }> {
            const xenon: Array<{ value: number }> = [];

            Object.keys(VEHICLE_TUNE_XENON).forEach((index) => {
                xenon.push({ value: VEHICLE_TUNE_XENON[index] });
            });

            return xenon;
        },
    },
    methods: {
        setEngine(e: Event) {
            const result = e.target['value'];
            this.engine = parseInt(result);

            this.$emit('update-engine', this.engine);
        },
        setBrakes(e: Event) {
            const result = e.target['value'];
            this.brakes = parseInt(result);

            this.$emit('update-brakes', this.brakes);
        },
        setTransmission(e: Event) {
            const result = e.target['value'];
            this.transmission = parseInt(result);

            this.$emit('update-transmission', this.transmission);
        },
        setSuspension(e: Event) {
            const result = e.target['value'];
            this.suspension = parseInt(result);

            this.$emit('update-suspension', this.suspension);
        },
        setArmour(e: Event) {
            const result = e.target['value'];
            this.armour = parseInt(result);

            this.$emit('update-armour', this.armour);
        },
        setTurbo(e: Event) {
            const result = e.target['value'];
            this.turbo = parseInt(result);

            this.$emit('update-turbo', this.turbo);
        },
        setXenon(e: Event) {
            const result = e.target['value'];
            this.xenon = parseInt(result);

            this.$emit('update-xenon', this.xenon);
        },
        outputEngine(value: number) {
            if (value === undefined) {
                return;
            }

            this.$emit('set-engine', { value }, true);
        },
        outputBrakes(value: number) {
            if (value === undefined) {
                return;
            }

            this.$emit('set-brakes', { value }, true);
        },
        outputTransmission(value: number) {
            if (value === undefined) {
                return;
            }

            this.$emit('set-transmission', { value }, true);
        },
        outputSuspension(value: number) {
            if (value === undefined) {
                return;
            }

            this.$emit('set-suspension', { value }, true);
        },
        outputArmour(value: number) {
            if (value === undefined) {
                return;
            }

            this.$emit('set-armour', { value }, true);
        },
        outputTurbo(value: number) {
            if (value === undefined) {
                return;
            }

            this.$emit('set-turbo', { value }, true);
        },
        outputXenon(value: number) {
            if (value === undefined) {
                return;
            }

            this.$emit('set-xenon', { value }, true);
        },
    },
    watch: {
        data(syncData: iTuningshopSync) {
            this.engine = syncData.engine;
            this.brakes = syncData.brakes;
            this.transmission = syncData.transmission;
            this.suspension = syncData.suspension;
            this.armour = syncData.armour;
            this.turbo = syncData.turbo;
            this.xenon = syncData.xenon;

            this.$nextTick(() => {
                /*this.$emit('set-engine', syncData.engine, true);
                this.$emit('set-brakes', syncData.brakes, true);
                this.$emit('set-transmission', syncData.transmission, true);
                this.$emit('set-suspension', syncData.suspension, true);
                this.$emit('set-armour', syncData.armour, true);
                this.$emit('set-turbo', syncData.turbo, true);
                this.$emit('set-xenon', syncData.xenon, true);*/
                this.$emit('update-engine', this.engine);
                this.$emit('update-brakes', this.brakes);
                this.$emit('update-transmission', this.transmission);
                this.$emit('update-suspension', this.suspension);
                this.$emit('update-armour', this.armour);
                this.$emit('update-turbo', this.turbo);
                this.$emit('update-xenon', this.xenon);
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

.engine {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    align-content: center;
}

.brakes {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    align-content: center;
}

.transmission {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    align-content: center;
}

.suspension {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    align-content: center;
}

.armour {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    align-content: center;
}

.turbo {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    align-content: center;
}

.xenon {
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
