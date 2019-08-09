<template>
    <div class="ww-grid">
        <!-- wwManager:start -->
        <div class="ww-grid-tab" :class="{'editing-layout': c_editingLayout}">
            <div class="end-edit" @click="endEditLayout($event)">
                <span class="wwi wwi-cross"></span>
            </div>
            <div class="options">
                <span class="fas fa-th-large"></span>
            </div>
        </div>
        <!-- wwManager:end -->
        <wwObject class="ww-grid-bg" :ww-object="wwObject.data.background" ww-category="background" ww-inside-ww-object="ww-grid"></wwObject>
        <div class="ww-grid-row" v-for="(row, rowIndex) in wwObject.data.config.rows.value" :key="rowIndex" :style="getRowStyle(rowIndex)" @click="c_editingLayout && $event.stopPropagation()">
            <!-- wwManager:start -->
            <div class="ww-row-controls" :class="{'show': c_editingLayout}">
                <i class="wwi wwi-edit-other"></i>
                <wwValueUnitSelector class="value-unit-selector" :value="row._mh.v" :unit="row._mh.u" :allowedUnits="['px', '%']" @changeValue="setRowHeightValue(rowIndex, $event)" @changeUnit="setRowHeightUnit(rowIndex, $event)"></wwValueUnitSelector>
                <img class="align-icon" @click="row._jc = 'flex-start'" :class="{'selected': row._jc == 'flex-start'}" src="https://cdn.weweb.app/public/images/justify-content/flex-start.png" />
                <img class="align-icon" @click="row._jc = 'center'" :class="{'selected': row._jc == 'center'}" src="https://cdn.weweb.app/public/images/justify-content/center.png" />
                <img class="align-icon" @click="row._jc = 'flex-end'" :class="{'selected': row._jc == 'flex-end'}" src="https://cdn.weweb.app/public/images/justify-content/flex-end.png" />
                <img class="align-icon" @click="row._jc = 'space-between'" :class="{'selected': row._jc == 'space-between'}" src="https://cdn.weweb.app/public/images/justify-content/space-between.png" />
            </div>
            <div class="ww-row-margin-top" :class="{'show': c_editingLayout}" v-if="rowIndex > 0" :style="{'top': - getRowMarginTop(rowIndex) + 'px'}">
                <wwValueUnitSelector class="value-unit-selector" :value="row._mt.v" :unit="row._mt.u" :allowedUnits="['px', '%']" @changeValue="setRowMarginValue(rowIndex, $event)" @changeUnit="setRowMarginUnit(rowIndex, $event)"></wwValueUnitSelector>
            </div>
            <!-- wwManager:end -->
            <div class="ww-grid-column" v-for="colIndex in row._c" :key="colIndex" :style="getColumnStyle(colIndex)" :data-col-index="colIndex">
                <!-- wwManager:start -->
                <div class="ww-column-overlay" :class="{'show': c_editingLayout}" :style="{'background-color': getColumnColor(wwObject.data.config.columns[colIndex]._i).light, 'border-color': getColumnColor(wwObject.data.config.columns[colIndex]._i).strong}"></div>

                <div class="ww-column-controls" :class="{'show': c_editingLayout}">
                    <wwValueUnitSelector class="value-unit-selector" :value="wwObject.data.config.columns[colIndex]._w.get({original: true}).v" :unit="wwObject.data.config.columns[colIndex]._w.get({original: true}).u" :allowedUnits="['px', '%', 'r']" @changeValue="setColumnWidthValue(colIndex, $event)" @changeUnit="setColumnWidthUnit(colIndex, $event)"></wwValueUnitSelector>
                    <div class="options">
                        <i class="wwi wwi-edit-other"></i>

                        <div class="options-bg"></div>
                        <div class="option option-0">
                            <i class="wwi wwi-delete" @click="deleteColumn(rowIndex, colIndex)"></i>
                            <div class="tooltip">Delete</div>
                        </div>
                        <div class="option option-1">
                            <i class="wwi wwi-chevron-down" @click="moveColumn(rowIndex, colIndex, 'down')"></i>
                            <div class="tooltip">Move down</div>
                        </div>
                        <div class="option option-2">
                            <i class="wwi wwi-add" @click="addColumn(rowIndex, colIndex, 'after')"></i>
                            <div class="tooltip">Add after</div>
                        </div>
                        <div class="option option-3">
                            <i class="wwi wwi-chevron-right" @click="moveColumn(rowIndex, colIndex, 'right')"></i>
                            <div class="tooltip">Move right</div>
                        </div>
                        <div class="option option-4">
                            <i class="wwi wwi-chevron-left" @click="moveColumn(rowIndex, colIndex, 'left')"></i>
                            <div class="tooltip">Move left</div>
                        </div>
                        <div class="option option-5">
                            <i class="wwi wwi-add" @click="addColumn(rowIndex, colIndex, 'before')"></i>
                            <div class="tooltip">Add before</div>
                        </div>
                        <div class="option option-6">
                            <i class="wwi wwi-chevron-up" @click="moveColumn(rowIndex, colIndex, 'up')"></i>
                            <div class="tooltip">Move up</div>
                        </div>
                    </div>
                </div>
                <!-- wwManager:end -->
                <wwObject class="ww-grid-container" :ww-object="wwObject.data.config.columns[colIndex]._c" ww-inside-ww-object="ww-grid"></wwObject>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: "__COMPONENT_NAME__",
    props: {
        wwObjectCtrl: Object,
        wwAttrs: Object
    },
    data() {
        return {
            editingLayout: false,
            /* wwManager:start */
            overlayColors: [
                {
                    name: 'red',
                    strong: '#CE003B',
                    light: '#E02A4D'
                },
                {
                    name: 'pink',
                    strong: '#CF2D7D',
                    light: '#EA588D'
                },
                {
                    name: 'yellow',
                    strong: '#DC9E04',
                    light: '#FDC806'
                },
                {
                    name: 'orange',
                    strong: '#EA5E1C',
                    light: '#EF811A'
                },
                {
                    name: 'green',
                    strong: '#19947C',
                    light: '#49B9B2'
                },
                {
                    name: 'blue',
                    strong: '#1763A9',
                    light: '#2E85C2'
                }
            ],
            /* wwManager:end */
        };
    },
    computed: {
        wwObject() {
            return this.wwObjectCtrl.get();
        },
        /* wwManager:start */
        c_editingLayout() {
            return this.wwObjectCtrl.getSectionCtrl().getEditMode() == 'CONTENT' && this.editingLayout;
        }
        /* wwManager:end */
    },
    watch: {
    },
    methods: {
        init() {
            /* wwManager:start */
            this.$nextTick(this.editLayout)
            /* wwManager:end */
        },

        getRowStyle(rowIndex) {
            const style = {};

            style.justifyContent = this.wwObject.data.config.rows.value[rowIndex]._jc;

            const mh = this.wwObject.data.config.rows.value[rowIndex]._mh;
            if (mh.u == '%') {
                if (window.CSS && window.CSS.supports && window.CSS.supports('--fake-var', 0)) {
                    style.minHeight = 'calc(var(--vh, 1vh) * ' + mh.v + ')'
                }
                else {
                    style.minHeight = mh.v + 'vh'
                }
            }
            else {
                style.minHeight = mh.value;
            }

            const mt = this.wwObject.data.config.rows.value[rowIndex]._mt;
            if (mt.u == '%') {
                if (window.CSS && window.CSS.supports && window.CSS.supports('--fake-var', 0)) {
                    style.marginTop = 'calc(var(--vh, 1vh) * ' + mt.v + ')'
                }
                else {
                    style.marginTop = mt.v + 'vh'
                }
            }
            else {
                style.marginTop = mt.value;
            }

            return style;
        },
        getColumnStyle(colIndex) {
            const style = {};

            const widthVU = this.wwObject.data.config.columns[colIndex]._w.get({ original: true });
            if (widthVU.u == 'r') {
                style.flexGrow = widthVU.v;
            }
            else {
                style.flexBasis = widthVU.value;
                style.flexGrow = 0;
            }

            style.marginLeft = this.wwObject.data.config.columns[colIndex]._o.value;
            style.marginRight = this.wwObject.data.config.columns[colIndex]._po.value;

            return style;
        },

        /* wwManager:start */
        /*=============================================m_ÔÔ_m=============================================\
          UTILS
        \================================================================================================*/
        getNewColumn() {
            return {
                _w: new wwLib.wwTypes.ResponsiveDevice(new wwLib.wwTypes.ValueUnit('1r')),
                _o: new wwLib.wwTypes.ResponsiveDevice(new wwLib.wwTypes.ValueUnit('0px')),
                _po: new wwLib.wwTypes.ResponsiveDevice(new wwLib.wwTypes.ValueUnit('0px')),
                _c: wwLib.wwObject.getDefault({ type: 'ww-container' }),
                _i: this.getMaxColumnIndex() + 1
            }
        },
        correctConfig() {
            const config = this.wwObject.data.config;

            config.columns = config.columns || [this.getNewColumn()];

            for (let column of config.columns) {
                if (!column._c) {
                    column._c = wwLib.wwObject.getDefault({ type: 'ww-container' });
                }
                if (!column._w) {
                    column._w = new wwLib.wwTypes.ResponsiveDevice(new wwLib.wwTypes.ValueUnit('1r'));
                }
                if (!column._o) {
                    column._o = new wwLib.wwTypes.ResponsiveDevice(new wwLib.wwTypes.ValueUnit('0px'));
                }
                if (!column._po) {
                    column._po = new wwLib.wwTypes.ResponsiveDevice(new wwLib.wwTypes.ValueUnit('0px'));
                }
                if (typeof (column._i) !== Number) {
                    column._i = this.getMaxColumnIndex() + 1;
                }
            }

            config.rows = config.rows || new wwLib.wwTypes.ResponsiveDevice([
                {
                    _c: [0],
                    _mt: new wwLib.wwTypes.ValueUnit('0px'),
                    _mh: new wwLib.wwTypes.ValueUnit('0px'),
                    _jc: 'flex-start'
                }
            ]);

            if (!this.wwObject.data.background) {
                this.wwObject.data.background = wwLib.wwObject.getDefault({ type: 'ww-color' });
            }

            this.wwObjectCtrl.update(this.wwObject);

            console.log(this.wwObject.data.config);
        },
        getColumnColor(index) {
            return this.overlayColors[index % this.overlayColors.length];
        },
        preventClick(event) {
            event.preventDefault();
            event.stopPropagation();
        },
        getMaxColumnIndex() {
            try {
                let maxIndex = -1;
                for (let column of this.wwObject.data.config.columns) {
                    if (column._i > maxIndex) {
                        maxIndex = column._i;
                    }
                }
                return maxIndex;
            } catch (error) {
                return -1;
            }
        },

        /*=============================================m_ÔÔ_m=============================================\
          EDIT UNIQUE COLUMN
        \================================================================================================*/
        setColumnWidthValue(colIndex, value) {
            this.wwObject.data.config.columns[colIndex]._w.value = value + this.wwObject.data.config.columns[colIndex]._w.get({ original: true }).u;
            this.wwObjectCtrl.update(this.wwObject);
        },

        setColumnWidthUnit(colIndex, unit) {

            const currentWidth = Math.round(this.$el.querySelector('[data-col-index="' + colIndex + '"]').getBoundingClientRect().width);

            //Convert value to keep same column width if px or %.
            //Set value to 1 if rel
            if (unit == 'px') {
                this.wwObject.data.config.columns[colIndex]._w.value = currentWidth + unit;
            }
            else if (unit == '%') {
                const W = this.$el.getBoundingClientRect().width;
                this.wwObject.data.config.columns[colIndex]._w.value = (Math.round(currentWidth * 100 / W * 100) / 100) + unit;
            }
            else {
                this.wwObject.data.config.columns[colIndex]._w.value = 1 + unit;
            }

            this.wwObjectCtrl.update(this.wwObject);
        },

        async deleteColumn(rowIndex, colIndex) {
            console.log('DELETE');

            let rows = this.wwObject.data.config.rows.value;
            if (rows.length > rowIndex) {
                let columns = rows[rowIndex]._c;
                if (columns.indexOf(colIndex) !== -1) {

                    //Check if last column 
                    if (columns.length == 1 && rows.length == 1) {
                        //Do nothing ! Last column.
                    }
                    else {

                        let confirm = await wwLib.wwModals.open({
                            title: {
                                en: 'Delete column ?',
                                fr: 'Supprimer la colonne ?'
                            },
                            text: {
                                en: 'The contents of this column will be lost.',
                                fr: 'Le contenu de cette colonne sera perdu.',
                            },
                            buttons: [
                                {
                                    text: {
                                        en: 'Cancel',
                                        fr: 'Anuller'
                                    },
                                    color: 'grey',
                                    value: false,
                                    escape: true
                                },
                                {
                                    text: {
                                        en: 'Delete',
                                        fr: 'Supprimer'
                                    },
                                    color: 'red',
                                    value: true,
                                    enter: true
                                }
                            ]
                        });

                        if (confirm) {
                            columns.splice(columns.indexOf(colIndex), 1);
                        }
                    }
                }
            }
            this.wwObjectCtrl.update(this.wwObject);
        },

        moveColumn(rowIndex, colIndex, option) {
            console.log('moveColumn', option);

            let rows = this.wwObject.data.config.rows.value;
            if (rows.length > rowIndex) {
                let columns = rows[rowIndex]._c;
                if (columns.indexOf(colIndex) !== -1) {

                    let indexColumnToMove = columns.indexOf(colIndex);

                    if (option == 'left') {
                        if (columns.indexOf(colIndex) > 0) {
                            columns.splice(indexColumnToMove, 1);
                            columns.splice(indexColumnToMove - 1, 0, colIndex);
                        }
                    }
                    else if (option == 'right') {
                        if (columns.indexOf(colIndex) < columns.length - 1) {
                            columns.splice(indexColumnToMove, 1);
                            columns.splice(indexColumnToMove + 1, 0, colIndex);
                        }
                    }
                    else if (option == 'down') {
                        columns.splice(indexColumnToMove, 1);

                        if (rowIndex == rows.length - 1) {
                            rows.push({
                                _c: [],
                                _mt: new wwLib.wwTypes.ValueUnit('0px'),
                                _mh: new wwLib.wwTypes.ValueUnit('0px'),
                                _jc: 'flex-start'
                            });
                        }

                        rows[rowIndex + 1]._c.unshift(colIndex);


                        if (rows[rowIndex]._c.length == 0) {
                            rows.splice(rowIndex, 1);
                        }
                    }
                    else if (option == 'up') {
                        columns.splice(indexColumnToMove, 1);

                        if (rowIndex == 0) {
                            rows.unshift({
                                _c: [],
                                _mt: new wwLib.wwTypes.ValueUnit('0px'),
                                _mh: new wwLib.wwTypes.ValueUnit('0px'),
                                _jc: 'flex-start'
                            });
                            rowIndex++;
                        }

                        rows[rowIndex - 1]._c.unshift(colIndex);

                        if (rows[rowIndex]._c.length == 0) {
                            rows.splice(rowIndex, 1);
                        }
                    }
                }
            }
            this.wwObjectCtrl.update(this.wwObject);
        },

        addColumn(rowIndex, colIndex, option) {
            console.log('addColumn', option);
            const newColumn = this.getNewColumn();

            let rows = this.wwObject.data.config.rows.value;
            if (rows.length > rowIndex) {
                let columns = rows[rowIndex]._c;
                if (columns.indexOf(colIndex) !== -1) {

                    this.wwObject.data.config.columns.push(newColumn);

                    if (option == 'before') {
                        columns.splice(columns.indexOf(colIndex), 0, this.wwObject.data.config.columns.length - 1);
                    }
                    else {
                        columns.splice(columns.indexOf(colIndex) + 1, 0, this.wwObject.data.config.columns.length - 1);
                    }
                }
            }

            this.wwObjectCtrl.update(this.wwObject);
        },

        /*=============================================m_ÔÔ_m=============================================\
          EDIT UNIQUE ROW
        \================================================================================================*/
        setRowHeightValue(rowIndex, value) {
            this.wwObject.data.config.rows.value[rowIndex]._mh.value = value + this.wwObject.data.config.rows.value[rowIndex]._mh.u;
            this.wwObjectCtrl.update(this.wwObject);
        },

        setRowHeightUnit(rowIndex, unit) {
            const currentHeight = wwLib.getFrontWindow().innerHeight;
            const rowHeight = this.wwObject.data.config.rows.value[rowIndex]._mh;
            let newHeight = 0;

            if (unit != rowHeight.u) {
                if (rowHeight.u == '%') {
                    newHeight = Math.round(rowHeight.v * currentHeight / 100);
                }
                else {
                    newHeight = Math.round(rowHeight.v * 100 / currentHeight);
                }

                rowHeight.value = newHeight + unit;
                this.wwObjectCtrl.update(this.wwObject);

            }
        },

        setRowMarginValue(rowIndex, value) {
            this.wwObject.data.config.rows.value[rowIndex]._mt.value = value + this.wwObject.data.config.rows.value[rowIndex]._mt.u;
            this.wwObjectCtrl.update(this.wwObject);
        },

        setRowMarginUnit(rowIndex, unit) {
            const currentHeight = wwLib.getFrontWindow().innerHeight;
            const rowMargin = this.wwObject.data.config.rows.value[rowIndex]._mt;
            let newHeight = 0;

            if (unit != rowMargin.u) {
                if (rowMargin.u == '%') {
                    newHeight = Math.round(rowMargin.v * currentHeight / 100);
                }
                else {
                    newHeight = Math.round(rowMargin.v * 100 / currentHeight);
                }

                rowMargin.value = newHeight + unit;
                this.wwObjectCtrl.update(this.wwObject);

            }
        },
        getRowMarginTop(rowIndex) {
            const mt = this.wwObject.data.config.rows.value[rowIndex]._mt;
            if (mt.u == '%') {
                return ((mt.v / 2) * wwLib.getFrontWindow().innerHeight / 100);
            }
            else {
                return (mt.v / 2);
            }
        },

        /*=============================================m_ÔÔ_m=============================================\
          EDIT
        \================================================================================================*/

        async edit() {
            wwLib.wwObjectHover.setLock(this);


            let editList = {
                LAYOUT: {
                    separator: {
                        en: 'Configuration',
                        fr: 'Configuration'
                    },
                    title: {
                        en: 'Layout',
                        fr: 'Disposition'
                    },
                    desc: {
                        en: 'Edit columns sizes and positions',
                        fr: 'Modifier la taille et la position des colonnes'
                    },
                    icon: 'fas fa-th-large',
                    shortcut: 'c',
                    next: 'WWGRID_LAYOUT'
                }
            }

            wwLib.wwPopups.addStory('WWGRID_EDIT', {
                title: {
                    en: 'Edit Grid',
                    fr: 'Editer la grille'
                },
                type: 'wwPopupEditWwObject',
                buttons: null,
                storyData: {
                    list: editList
                }
            })

            wwLib.wwPopups.addStory('WWGRID_LAYOUT', {
                title: {
                    en: 'Edit container',
                    fr: 'Editer leconteneur'
                },
                type: 'wwPopupForm',
                storyData: {
                    fields: [
                        {
                            label: {
                                en: 'Vertical align :',
                                fr: 'Alignement vertical'
                            },
                            desc: {
                                en: 'Choose if content must stick to the top, the middle or the bottom of the container',
                                fr: 'Choisir si le contenu doit être en haut, au milieu ou en bas du conteneur.'
                            },
                            type: 'select',
                            key: 'alignItems',
                            valueData: 'wwObject.style.alignItems',
                            options: {
                                wwObject: {},
                                values: [
                                    {
                                        value: 'flex-start',
                                        default: true,
                                        text: {
                                            en: 'Top',
                                            fr: 'Haut'
                                        }
                                    },
                                    {
                                        value: 'center',
                                        text: {
                                            en: 'Middle',
                                            fr: 'Milieu'
                                        }
                                    },
                                    {
                                        value: 'flex-end',
                                        text: {
                                            en: 'Bottom',
                                            fr: 'Bas'
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                },
                buttons: {
                    OK: {
                        text: {
                            en: 'Ok',
                            fr: 'Ok'
                        }
                    }
                }
            });

            let options = {
                firstPage: 'WWGRID_EDIT',
                data: {
                    wwObject: this.wwObject
                }
            }

            try {
                const result = await wwLib.wwPopups.open(options);

                console.log(result.alignItems);
                /*=============================================m_ÔÔ_m=============================================\
                  STYLE
                \================================================================================================*/
                if (typeof (result.alignItems) != 'undefined') {
                    //this.wwObject.style = this.wwObject.style || {};
                    this.wwObject.data._s.alignItems = result.alignItems;
                }

                // console.log(this.wwObject);

                this.wwObjectCtrl.update(this.wwObject);

                this.wwObjectCtrl.globalEdit(result);
            } catch (error) {
                console.log(error);
            }

            wwLib.wwObjectHover.removeLock();
        },
        editLayout() {
            wwLib.wwObjectHover.setLock(this, true);
            this.editingLayout = true;
        },
        endEditLayout(event) {
            wwLib.wwObjectHover.removeLock(this);
            this.preventClick(event);
            this.editingLayout = false;
        },

        beforeSave() {
            this.editingLayout = false;
        }
        /* wwManager:end */
    },
    created() {
        /* wwManager:start */
        this.correctConfig();
        /* wwManager:end */
    },
    mounted() {
        this.init();
        this.$emit('ww-loaded', this);
    },
    /* wwManager:start */
    beforeDestroy() {
        wwLib.getFrontWindow().removeEventListener('click', this.endEditLayout);
        wwLib.getManagerWindow().removeEventListener('click', this.endEditLayout);
        wwLib.getFrontWindow().removeEventListener('touch', this.endEditLayout);
        wwLib.getManagerWindow().removeEventListener('touch', this.endEditLayout);
    }
    /* wwManager:end */
};
</script>

<style scoped lang="scss">
/* wwManager:start */
@import "./trig.scss";
/* wwManager:end */

.ww-grid {
    display: flex;
    position: relative;
    flex-direction: column;
    //min-height: 20px;

    .ww-grid-bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .ww-grid-row {
        display: flex;
        position: relative;

        /* wwManager:start */
        .ww-row-controls {
            position: absolute;
            display: flex;
            left: 0;
            top: 50%;
            transform: translate(0, -50%) scaleX(0);
            transform-origin: 0 50%;
            z-index: 54;

            border-radius: 0 20px 20px 0;
            background-color: #d02e7c;
            color: white;
            height: 30px;
            // width: 30px;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            pointer-events: none;
            cursor: pointer;
            transition: transform 0.3s ease;
            padding: 0 5px;

            & > * {
                margin: 0 3px;
            }

            .align-icon {
                transform: scale(0);
                width: 0;
                margin: 0;
                transition: all 0.3s ease;
                opacity: 0.6;
                &:hover,
                &.selected {
                    opacity: 1;
                }
            }

            &:hover {
                z-index: 55;

                .align-icon {
                    margin: 0 3px;
                    width: 25px;
                    transform: scale(1);
                }
            }

            &.show {
                pointer-events: all;
                transform: translate(0, -50%);
            }
        }

        .ww-row-margin-top {
            position: absolute;
            top: 0;
            left: 5px;
            transform: translate(0, -50%);
            opacity: 0;
            pointer-events: 0;
            z-index: 54;

            &.show {
                opacity: 1;
                pointer-events: all;
            }

            &:hover {
                z-index: 55;
            }
        }
        /* wwManager:end */

        .ww-grid-column {
            flex: 1 1 0;
            display: flex;
            position: relative;

            .ww-grid-container {
                width: 100%;
            }

            /* wwManager:start */
            .ww-column-overlay {
                z-index: 52;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                pointer-events: none;
                opacity: 0;
                border: 2px solid;
                transition: all 0.3s ease;

                &.show {
                    pointer-events: all;
                    opacity: 0.5;
                }
            }

            .ww-column-controls {
                z-index: 54;
                opacity: 0;
                transition: all 0.3s ease;
                pointer-events: none;

                &:hover {
                    z-index: 55;
                }

                &.show {
                    pointer-events: all;
                    opacity: 1;
                }

                .value-unit-selector {
                    position: absolute;
                    left: 50%;
                    top: 0;
                    transform: translate(-50%, 3px) scale(0.9);
                    transition: all 0.2s ease;
                }

                .options {
                    position: absolute;
                    left: 50%;
                    top: 45px;
                    transform: translate(-50%, 0);

                    & > i {
                        z-index: 2;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        color: white;
                        background-color: #e02a4d;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 27px;
                        height: 27px;
                        font-size: 20px;
                        box-shadow: 0px 0px 11px -3px #636363;
                        border-radius: 100%;
                        cursor: pointer;
                    }

                    .options-bg {
                        position: absolute;
                        opacity: 0.5;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        border-radius: 100%;
                        width: 110px;
                        height: 110px;
                        pointer-events: none;
                    }

                    $optionsCount: 7;
                    .option {
                        opacity: 0;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        z-index: 1;

                        i {
                            z-index: 1;
                            position: absolute;
                            top: 0;
                            left: 0;
                            transform: translate(-50%, -50%);
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            width: 23px;
                            height: 23px;
                            border-radius: 100%;
                            color: #e02a4d;
                            background-color: white;
                            box-shadow: 0px 0px 11px -3px #636363;
                            font-size: 16px;
                            cursor: pointer;
                            transition: all 0.4s ease;

                            &:hover {
                                color: white;
                                background-color: #e02a4d;
                            }

                            &.move-down::before {
                                transform: rotate(90deg);
                            }
                        }

                        .tooltip {
                            position: absolute;
                            top: 0;
                            left: 50%;
                            transform: translate(0, -50%);
                            white-space: nowrap;
                            background-color: #2e86c2;
                            color: white;
                            padding: 3px 5px;
                            font-size: 11px;
                            pointer-events: none;
                            transition: 0.2s ease;
                            opacity: 0;
                            z-index: 60;
                        }

                        &:hover {
                            .tooltip {
                                opacity: 1;
                                transform: translate(15px, -50%);
                            }
                        }
                    }

                    &:hover {
                        .options-bg {
                            pointer-events: all;
                        }
                        .option {
                            @for $i from 0 through $optionsCount - 1 {
                                &.option-#{$i} {
                                    $angle: (2 * $pi / $optionsCount * $i);
                                    // $angle: (-2 * $pi / $optionsCount * $i) +
                                    //     $pi;
                                    transform: translate(
                                        $optionsCount * 5px * sin($angle),
                                        $optionsCount * -5px * cos($angle)
                                    );
                                    opacity: 1;
                                    z-index: 3;

                                    $td: 0.03s * $i;
                                    $tf: cubic-bezier(0.2, 0.435, 0.32, 1.47);

                                    transition: opacity 0.3s ease $td,
                                        transform 0.3s $tf $td,
                                        z-index 0.3s linear $td;
                                }
                            }
                        }
                    }
                }
            }
            /* wwManager:end */
        }
    }
}
/* wwManager:start */
.ww-grid-tab {
    display: none;
    position: absolute;
    top: 10px;
    right: 0;
    border-radius: 20px 0 0 20px;
    background-color: #d02e7c;
    z-index: 53;
    color: white;
    height: 40px;
    width: 45px;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    pointer-events: all;
    cursor: pointer;
    transition: width 0.3s ease;

    .options {
    }

    .end-edit {
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.3s ease;
        transform: scale(0) rotate(180deg);
        width: 0;
    }

    &.editing-layout {
        width: 80px;

        .end-edit {
            margin-right: 15px;
            transform: scale(1);
            width: 20px;
        }
    }
}
.ww-editing .ww-grid-tab {
    display: flex;
}

/* wwManager:end */
</style>

<style>
/* wwManager:start */
.ww-grid-hover {
    background-color: #2ec6ba30;
    background: repeating-linear-gradient(
        -45deg,
        #2ec6ba30,
        #2ec6ba30 10px,
        #2ec6ba50 10px,
        #2ec6ba50 11px
    );
    border-width: 5px !important;
}
/* wwManager:end */
</style>