<template>
    <div class="ww-grid" @click="checkEndEditLayout($event)">
        <!-- wwManager:start -->
        <div class="ww-grid-tab" :class="{'editing-layout': c_editingLayout}">
            <!-- <div class="end-edit" @click="endEditLayout($event)">
                <span class="wwi wwi-cross"></span>
            </div>-->
            <div class="options">
                <span class="fas fa-th-large"></span>
            </div>
        </div>
        <!-- wwManager:end -->
        <!-- <wwObject class="ww-grid-bg" :ww-object="wwObject.data.background" ww-category="background" ww-inside-ww-object="ww-grid"></wwObject> -->
        <div class="ww-grid-row" v-for="(row, rowIndex) in wwObject.data.config.rows.value" :key="rowIndex" :style="getRowStyle(rowIndex)">
            <!-- wwManager:start -->
            <wwContextMenu tag="div" class="ww-row-controls" :class="{'show': editingRows}" :options="getRowOptions(rowIndex)">
                <span>Row {{(rowIndex + 1)}}</span>
                <div class="hover-invisible"></div>
                <!-- <div class="options">
                    <span class="label">Height :</span>
                    <wwValueUnitSelector class="value-unit-selector" :value="row._mh.v" :unit="row._mh.u" :allowedUnits="['px', '%']" @changeValue="setRowHeightValue(rowIndex, $event)" @changeUnit="setRowHeightUnit(rowIndex, $event)"></wwValueUnitSelector>

                    <span class="label">Align :</span>

                    <div class="align">
                        <img class="align-icon selected" :src="'https://cdn.weweb.app/public/images/justify-content/' +row._jc+ '.png'" />

                        <div class="align-icons">
                            <div class="hover-invisible"></div>
                            <img class="align-icon" @click="row._jc = 'flex-start'" :class="{'selected': row._jc == 'flex-start'}" src="https://cdn.weweb.app/public/images/justify-content/flex-start.png" />
                            <img class="align-icon" @click="row._jc = 'center'" :class="{'selected': row._jc == 'center'}" src="https://cdn.weweb.app/public/images/justify-content/center.png" />
                            <img class="align-icon" @click="row._jc = 'flex-end'" :class="{'selected': row._jc == 'flex-end'}" src="https://cdn.weweb.app/public/images/justify-content/flex-end.png" />
                            <img class="align-icon" @click="row._jc = 'space-between'" :class="{'selected': row._jc == 'space-between'}" src="https://cdn.weweb.app/public/images/justify-content/space-between.png" />
                        </div>
                    </div>
                </div>-->
            </wwContextMenu>

            <div class="ww-row-margin-top" :class="{'show': editingRows, 'force-show': dragMarginTopOptions.rowIndex == rowIndex}" v-if="rowIndex > 0">
                <div class="hover" :style="{'top': - (getRowMarginTop(rowIndex)/2) + 'px', 'height': getRowMarginTop(rowIndex) + 'px'}"></div>
                <div class="hover-invisible"></div>
                <div class="handle" :class="{'percent':row._mt.u == '%'}" @click="preventClick($event)" @mousedown="startDragMarginTop(rowIndex, $event)" @touchstart="startDragMarginTop(rowIndex, $event)">
                    <div class="zone"></div>
                    <i class="fas fa-arrows-alt-v"></i>
                </div>

                <wwValueUnitSelector class="value-unit-selector" :value="row._mt.v" :unit="row._mt.u" :allowedUnits="['px', '%']" @changeValue="setRowMarginValue(rowIndex, $event)" @changeUnit="setRowMarginUnit(rowIndex, $event)"></wwValueUnitSelector>
            </div>

            <div class="ww-row-margin-top" :class="{'show': editingColumns}" v-if="rowIndex > 0" :style="{'top': - (getRowMarginTop(rowIndex)/2) + 'px', 'height': getRowMarginTop(rowIndex) + 'px'}"></div>

            <!-- wwManager:end -->
            <div class="ww-grid-column" v-for="(colIndex, index) in row._c" :key="colIndex" :style="getColumnStyle(colIndex, index == row._c.length - 1)" :data-col-index="colIndex">
                <!-- wwManager:start -->
                <div class="ww-column-overlay" :class="{'show': c_editingLayout}" :style="{'background-color': getColumnColor(wwObject.data.config.columns[colIndex]._i).light, 'border-color': getColumnColor(wwObject.data.config.columns[colIndex]._i).strong}"></div>

                <div class="ww-column-controls" :class="{'show': editingColumns && !c_showColumnMargins}">
                    <wwContextMenu tag="div" class="options" :options="getColumnOptions(colIndex)">
                        <span>{{wwObject.data.config.columns[colIndex]._i}}</span>
                    </wwContextMenu>

                    <!-- <div class="options-bg"></div>
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
                    </div>-->
                    <wwValueUnitSelector v-show="getRowHeightPx(rowIndex) >= 100" class="value-unit-selector" :value="wwObject.data.config.columns[colIndex]._w.get({original: true}).v" :unit="wwObject.data.config.columns[colIndex]._w.get({original: true}).u" :allowedUnits="['px', '%', 'u', 'auto']" @changeValue="setColumnWidthValue(colIndex, $event)" @changeUnit="setColumnWidthUnit(colIndex, $event)"></wwValueUnitSelector>
                </div>

                <div class="ww-column-margin-left" :class="{'show': editingColumns, 'force-show': dragColMarginOptions.colIndex == colIndex || c_showColumnMargins}" @mouseenter="setShowColumnMargins(true)" @mouseleave="setShowColumnMargins(false)">
                    <div class="hover" :style="{'left': - (getColumnMarginLeft(colIndex)/2) + 'px', 'width': getColumnMarginLeft(colIndex) + 'px'}"></div>
                    <div class="preview" :style="{'left': - (getColumnMarginLeft(colIndex)/2) + 'px', 'width': getColumnMarginLeft(colIndex) + 'px'}"></div>
                    <!-- <div class="hover-invisible"></div> -->
                    <div class="handle" :style="{'left': - (getColumnMarginLeft(colIndex)/2) + 'px'}" :class="{'percent':wwObject.data.config.columns[colIndex]._o.get({ original: true }).u == '%'}" @click="preventClick($event)" @mousedown="startDragColumnMargin(colIndex,rowIndex, $event, 'left')" @touchstart="startDragColumnMargin(colIndex,rowIndex, $event, 'left')">
                        <div class="zone"></div>
                        <i class="fas fa-arrows-alt-h"></i>
                    </div>

                    <wwValueUnitSelector :style="{'left': - (getColumnMarginLeft(colIndex)/2) + 'px'}" class="value-unit-selector" :class="{'show': c_showColumnMargins}" :value="wwObject.data.config.columns[colIndex]._o.get({ original: true }).v" :unit="wwObject.data.config.columns[colIndex]._o.get({ original: true }).u" :allowedUnits="['px', '%']" @changeValue="setColMarginLeftValue(colIndex, $event)" @changeUnit="setColMarginLeftUnit(colIndex, $event)"></wwValueUnitSelector>
                </div>

                <div class="ww-column-margin-right" v-if="index == row._c.length - 1" :class="{'show': editingColumns, 'force-show': dragColMarginOptions.colIndex == colIndex || c_showColumnMargins}" @mouseenter="setShowColumnMargins(true)" @mouseleave="setShowColumnMargins(false)">
                    <div class="hover" :style="{'left': (getColumnMarginRight(colIndex)/2) + 'px', 'width': getColumnMarginRight(colIndex) + 'px'}"></div>
                    <div class="preview" :style="{'left': (getColumnMarginRight(colIndex)/2) + 'px', 'width': getColumnMarginRight(colIndex) + 'px'}"></div>
                    <!-- <div class="hover-invisible"></div> -->
                    <div class="handle" :style="{'left': (getColumnMarginRight(colIndex)/2) + 'px'}" :class="{'percent':wwObject.data.config.columns[colIndex]._po.get({ original: true }).u == '%'}" @click="preventClick($event)" @mousedown="startDragColumnMargin(colIndex,rowIndex, $event, 'right')" @touchstart="startDragColumnMargin(colIndex,rowIndex, $event, 'right')">
                        <div class="zone"></div>
                        <i class="fas fa-arrows-alt-h"></i>
                    </div>

                    <wwValueUnitSelector :style="{'left': (getColumnMarginRight(colIndex)/2) + 'px'}" class="value-unit-selector" :class="{'show': c_showColumnMargins}" :value="wwObject.data.config.columns[colIndex]._po.get({ original: true }).v" :unit="wwObject.data.config.columns[colIndex]._po.get({ original: true }).u" :allowedUnits="['px', '%']" @changeValue="setColMarginRightValue(colIndex, $event)" @changeUnit="setColMarginRightUnit(colIndex, $event)"></wwValueUnitSelector>
                </div>
                <!-- wwManager:end -->
                <wwObject class="ww-grid-container" :ww-object="wwObject.data.config.columns[colIndex]._c" ww-inside-ww-object="ww-grid"></wwObject>
            </div>
        </div>
    </div>
</template>


<script>
import { setTimeout, clearTimeout } from 'timers';
export default {
    name: "__COMPONENT_NAME__",
    props: {
        wwObjectCtrl: Object,
        wwAttrs: Object
    },
    data() {
        return {
            editingRows: false,
            editingColumns: false,
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
            dragMarginTopOptions: {
                dragging: false,
                rowIndex: null,
                originalValue: null,
                originalPos: null
            },
            dragColMarginOptions: {
                dragging: false,
                pos: null,
                colIndex: null,
                originalValue: null,
                originalPos: null
            },
            showColumnMargins: false,
            showColumnMarginsTimeout: null,


            /* wwManager:end */
        };
    },
    computed: {
        wwObject() {
            return this.wwObjectCtrl.get();
        },
        /* wwManager:start */
        c_editingLayout() {
            return this.wwObjectCtrl.getSectionCtrl().getEditMode() == 'CONTENT' && (this.editingRows || this.editingColumns);
        },
        c_showColumnMargins() {
            return this.showColumnMargins || this.dragColMarginOptions.dragging;
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
            else if (mh.u == 'auto') {
                style.minHeight = '10px'
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

        getColumnStyle(colIndex, last) {
            const style = {};

            const widthVU = this.wwObject.data.config.columns[colIndex]._w.get({ original: true });
            if (widthVU.u == 'u') {
                style.flexGrow = widthVU.v;
            }
            else if (widthVU.u == 'auto') {
                style.minWidth = '10px';
                style.flexBasis = 'auto';
                style.flexGrow = 0;
            }
            else {
                style.flexBasis = widthVU.value;
                style.flexGrow = 0;
            }

            style.marginLeft = this.wwObject.data.config.columns[colIndex]._o.value;
            style.marginRight = last ? this.wwObject.data.config.columns[colIndex]._po.value : '';

            return style;
        },

        checkEndEditLayout(event) {
            /* wwManager:start */
            if (this.dragMarginTopOptions.rowIndex != null || this.dragColMarginOptions.colIndex != null) {
                return this.preventClick(event);
            }
            if (!wwLib.wwObjectMenu.list.length) {
                this.endEditLayout();
            }
            /* wwManager:end */
        },

        /* wwManager:start */
        /*=============================================m_ÔÔ_m=============================================\
          UTILS
        \================================================================================================*/
        getNewColumn() {
            return {
                _w: new wwLib.wwTypes.ResponsiveDevice(new wwLib.wwTypes.ValueUnit('1u')),
                _o: new wwLib.wwTypes.ResponsiveDevice(new wwLib.wwTypes.ValueUnit('0px')),
                _po: new wwLib.wwTypes.ResponsiveDevice(new wwLib.wwTypes.ValueUnit('0px')),
                _c: wwLib.wwObject.getDefault({ type: 'ww-container' }),
                _i: this.getMaxColumnIndex() + 1
            }
        },
        getNewRow(includeColumn) {
            return {
                _c: includeColumn ? [0] : [],
                _mt: new wwLib.wwTypes.ValueUnit('0px'),
                _mh: new wwLib.wwTypes.ValueUnit('100px'),
                _jc: 'center'
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
                this.getNewRow(true)
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
        getRowIndex(colIndex) {
            for (let row of this.wwObject.data.config.rows.value) {
                if (row._c.indexOf(colIndex) !== -1) {
                    return this.wwObject.data.config.rows.value.indexOf(row);
                }
            }

            return null;
        },

        /*=============================================m_ÔÔ_m=============================================\
          EDIT UNIQUE COLUMN
        \================================================================================================*/
        setColumnWidthValue(colIndex, value) {
            if (this.wwObject.data.config.columns[colIndex]._w.get({ original: true }).u == 'auto') {
                return;
            }
            this.wwObject.data.config.columns[colIndex]._w.value = value + this.wwObject.data.config.columns[colIndex]._w.get({ original: true }).u;
            this.wwObjectCtrl.update(this.wwObject);
        },

        setColumnWidthUnit(colIndex, unit) {

            if (unit == 'auto') {
                this.wwObject.data.config.columns[colIndex]._w.value = '0auto'
                this.wwObjectCtrl.update(this.wwObject);
                return;
            }

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

        async deleteColumn(colIndex) {
            let rowIndex = this.getRowIndex(colIndex);

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

        moveColumn(colIndex, option) {
            let rowIndex = this.getRowIndex(colIndex);

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
                            rows.push(this.getNewRow());
                        }

                        rows[rowIndex + 1]._c.unshift(colIndex);


                        if (rows[rowIndex]._c.length == 0) {
                            rows.splice(rowIndex, 1);
                        }
                    }
                    else if (option == 'up') {
                        columns.splice(indexColumnToMove, 1);

                        if (rowIndex == 0) {
                            rows.unshift(this.getNewRow());
                            rowIndex++;
                        }

                        rows[rowIndex - 1]._c.push(colIndex);

                        if (rows[rowIndex]._c.length == 0) {
                            rows.splice(rowIndex, 1);
                        }
                    }
                }
            }
            this.wwObjectCtrl.update(this.wwObject);
        },

        addColumn(colIndex, option) {
            let rowIndex = this.getRowIndex(colIndex);

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

        setColMarginLeftValue(colIndex, value) {
            this.wwObject.data.config.columns[colIndex]._o.value = value + this.wwObject.data.config.columns[colIndex]._o.get({ original: true }).u;
            this.wwObjectCtrl.update(this.wwObject);
        },

        setColMarginLeftUnit(colIndex, unit) {
            const el = this.$el.querySelector('[data-col-index="' + colIndex + '"]');
            const style = el.currentStyle || window.getComputedStyle(el);
            const currentMarginLeft = Math.round(parseFloat(style.marginLeft.replace('px', '')));

            //Convert value to keep same column width if px or %.
            //Set value to 1 if rel
            if (unit == 'px') {
                this.wwObject.data.config.columns[colIndex]._o.value = currentMarginLeft + unit;
            }
            else {
                const W = this.$el.getBoundingClientRect().width;
                this.wwObject.data.config.columns[colIndex]._o.value = (Math.round(currentMarginLeft * 100 / W * 100) / 100) + unit;
            }

            this.wwObjectCtrl.update(this.wwObject);
        },

        getColumnMarginLeft(colIndex) {
            const o = this.wwObject.data.config.columns[colIndex]._o.get({ original: true });
            if (o.u == '%') {
                return (o.v * this.$el.getBoundingClientRect().width / 100);
            }
            else {
                return o.v;
            }
        },

        setColMarginRightValue(colIndex, value) {
            this.wwObject.data.config.columns[colIndex]._po.value = value + this.wwObject.data.config.columns[colIndex]._po.get({ original: true }).u;
            this.wwObjectCtrl.update(this.wwObject);
        },

        setColMarginRightUnit(colIndex, unit) {
            const el = this.$el.querySelector('[data-col-index="' + colIndex + '"]');
            const style = el.currentStyle || window.getComputedStyle(el);
            const currentMarginRight = Math.round(parseFloat(style.marginRight.replace('px', '')));

            //Convert value to keep same column width if px or %.
            //Set value to 1 if rel
            if (unit == 'px') {
                this.wwObject.data.config.columns[colIndex]._po.value = currentMarginRight + unit;
            }
            else {
                const W = this.$el.getBoundingClientRect().width;
                this.wwObject.data.config.columns[colIndex]._po.value = (Math.round(currentMarginRight * 100 / W * 100) / 100) + unit;
            }

            this.wwObjectCtrl.update(this.wwObject);
        },

        getColumnMarginRight(colIndex) {
            const po = this.wwObject.data.config.columns[colIndex]._po.get({ original: true });
            if (po.u == '%') {
                return (po.v * this.$el.getBoundingClientRect().width / 100);
            }
            else {
                return po.v;
            }
        },

        setShowColumnMargins(show) {
            //Hide directly + with timeout
            if (!show) {
                this.showColumnMargins = show;
            }
            clearTimeout(this.showColumnMarginsTimeout);
            this.showColumnMarginsTimeout = setTimeout(() => { this.showColumnMargins = show; }, 300)
        },

        getColumnOptions(colIndex) {

            const context = this;

            let buttons = [
                {
                    icon: 'wwi-copy',
                    tooltip: {
                        en: 'Copy',
                        fr: 'Copier'
                    },
                    action() {
                        context.copyColumn(colIndex);
                    }
                },
                {
                    icon: 'wwi-paste',
                    tooltip: {
                        en: 'Paste style',
                        fr: 'Coller le style'
                    },
                    action() {
                        context.pasteColumn(colIndex);
                    }
                }
            ]

            return {
                firstPage: 'MENU',
                story: {
                    MENU: {
                        name: {  //Nom du popup, si vide le popup s'appelle 'Menu'
                            en: 'Column ' + this.wwObject.data.config.columns[colIndex]._i,
                            fr: 'Colonne ' + this.wwObject.data.config.columns[colIndex]._i
                        },
                        items: [  //Liste des options dans le popup
                            {
                                text: {
                                    en: '',
                                    fr: ''
                                },
                                input: {
                                    type: 'wwValueUnitSelector',
                                    value: this.wwObject.data.config.columns[colIndex]._w.get({ original: true }),
                                    allowedUnits: ['px', '%', 'u', 'auto'],
                                    changeValue: (event) => {
                                        this.setColumnWidthValue(colIndex, event);

                                        //Should return new value
                                        return this.wwObject.data.config.columns[colIndex]._w.get({ original: true });
                                    },
                                    changeUnit: (event) => {
                                        this.setColumnWidthUnit(colIndex, event);

                                        //Should return new value
                                        return this.wwObject.data.config.columns[colIndex]._w.get({ original: true });
                                    }
                                },
                                icon: 'fas fa-arrows-alt-h',
                                action: 'ww-select-image'
                            },
                            {
                                text: {
                                    en: 'Move',
                                    fr: 'Déplacer'
                                },
                                icon: 'fas fa-arrows-alt',
                                action: 'wwObjectMenu:MOVE'
                            },
                            {
                                text: {
                                    en: 'Add',
                                    fr: 'Ajouter'
                                },
                                icon: 'wwi wwi-add',
                                action: 'wwObjectMenu:ADD'
                            },
                            {
                                text: {
                                    en: 'Delete',
                                    fr: 'Supprimer'
                                },
                                icon: 'wwi wwi-delete',
                                action: {
                                    fn: 'deleteColumn',
                                    args: [colIndex]
                                }
                            }
                        ]
                    },
                    MOVE: {
                        name: {  //Nom du popup, si vide le popup s'appelle 'Menu'
                            en: 'Move',
                            fr: 'Déplacer'
                        },
                        items: [  //Liste des options dans le popup
                            {
                                text: {
                                    en: 'Left',
                                    fr: 'Gauche'
                                },
                                icon: 'fas fa-arrow-left',
                                action: {
                                    fn: 'moveColumn',
                                    args: [colIndex, 'left'],
                                    close: false,
                                }
                            },
                            {
                                text: {
                                    en: 'Right',
                                    fr: 'Droite'
                                },
                                icon: 'fas fa-arrow-right',
                                action: {
                                    fn: 'moveColumn',
                                    close: false,
                                    args: [colIndex, 'right']
                                }
                            },
                            {
                                text: {
                                    en: 'Top',
                                    fr: 'Haut'
                                },
                                icon: 'fas fa-arrow-up',
                                action: {
                                    fn: 'moveColumn',
                                    close: false,
                                    args: [colIndex, 'up']
                                }
                            },
                            {
                                text: {
                                    en: 'Bottom',
                                    fr: 'Bas'
                                },
                                icon: 'fas fa-arrow-down',
                                action: {
                                    fn: 'moveColumn',
                                    close: false,
                                    args: [colIndex, 'down']
                                }
                            },
                            {
                                name: "Back",
                                text: {
                                    en: 'Back',
                                    fr: 'Retour'
                                },
                                icon: 'wwi wwi-chevron-left',
                                type: 'back',
                                action: 'wwObjectMenu:back'
                            }
                        ]
                    },
                    ADD: {
                        name: {  //Nom du popup, si vide le popup s'appelle 'Menu'
                            en: 'Add',
                            fr: 'Ajouter'
                        },
                        items: [  //Liste des options dans le popup
                            {
                                text: {
                                    en: 'Before',
                                    fr: 'Avant'
                                },
                                icon: 'wwi wwi-chevron-left',
                                action: {
                                    fn: 'addColumn',
                                    args: [colIndex, 'before']
                                }
                            },
                            {
                                text: {
                                    en: 'After',
                                    fr: 'Après'
                                },
                                icon: 'wwi wwi-chevron-right',
                                action: {
                                    fn: 'addColumn',
                                    args: [colIndex, 'after']
                                }
                            },
                            {
                                name: "Back",
                                text: {
                                    en: 'Back',
                                    fr: 'Retour'
                                },
                                icon: 'wwi wwi-chevron-left',
                                type: 'back',
                                action: 'wwObjectMenu:back'
                            }
                        ]
                    }
                },
                buttons: buttons
            }
        },

        /*=============================================m_ÔÔ_m=============================================\
          COPY / PATE COLUMN
        \================================================================================================*/
        copyColumn(colIndex) {
            const col = this.wwObject.data.config.columns[colIndex];
            const colToCopy = {
                _w: col._w
            }

            wwLib.wwCopy.copyObject('ww-grid-column', colToCopy);
        },
        pasteColumn(colIndex) {
            let copiedData = wwLib.wwCopy.getCopiedObject('ww-grid-column');

            if (copiedData) {
                this.wwObject.data.config.columns[colIndex]._w = copiedData._w;

                this.wwObjectCtrl.update(this.wwObject);
            }
        },


        /*=============================================m_ÔÔ_m=============================================\
          MOVE COLUMN MARGINS
        \================================================================================================*/
        startDragColumnMargin(colIndex, rowIndex, event, pos) {
            this.dragColMarginOptions.dragging = true;
            this.dragColMarginOptions.pos = pos;

            this.dragColMarginOptions.colIndex = colIndex;
            this.dragColMarginOptions.rowIndex = rowIndex;
            const value = this.dragColMarginOptions.pos == 'left' ? this.wwObject.data.config.columns[colIndex]._o.get({ original: true }) : this.wwObject.data.config.columns[colIndex]._po.get({ original: true });
            this.dragColMarginOptions.originalValue = value.u == 'px' ? value.v : Math.floor(value.v * this.$el.getBoundingClientRect().width / 100);
            this.dragColMarginOptions.originalPos = wwLib.wwUtils.getCursorManagerCoords(event).x;

            wwLib.getManagerDocument().body.classList.add('ww-grid-column-margin-move');
            wwLib.getFrontDocument().body.classList.add('ww-grid-column-margin-move');

            wwLib.getManagerWindow().addEventListener('mousemove', this.dragColumnMargin);
            wwLib.getFrontWindow().addEventListener('mousemove', this.dragColumnMargin);
            wwLib.getManagerWindow().addEventListener('touchmove', this.dragColumnMargin);
            wwLib.getFrontWindow().addEventListener('touchmove', this.dragColumnMargin);

            wwLib.getManagerWindow().addEventListener('mouseup', this.endDragColumnMargin);
            wwLib.getFrontWindow().addEventListener('mouseup', this.endDragColumnMargin);
            wwLib.getManagerWindow().addEventListener('touchend', this.endDragColumnMargin);
            wwLib.getFrontWindow().addEventListener('touchend', this.endDragColumnMargin);

            wwLib.getManagerWindow().addEventListener('click', this.preventClick, { capture: true, once: true });
            wwLib.getFrontWindow().addEventListener('click', this.preventClick, { capture: true, once: true });
            wwLib.getManagerWindow().addEventListener('touch', this.preventClick, { capture: true, once: true });
            wwLib.getFrontWindow().addEventListener('touch', this.preventClick, { capture: true, once: true });
            wwLib.$off('wwFocus', this.checkFocus);

        },
        dragColumnMargin(event) {
            const column = this.wwObject.data.config.columns[this.dragColMarginOptions.colIndex];

            //Calculate offsets
            let offsetX = wwLib.wwUtils.getCursorManagerCoords(event).x - this.dragColMarginOptions.originalPos;

            //Get total available height
            const W = this.$el.getBoundingClientRect().width;

            let newMargin = this.dragColMarginOptions.originalValue + offsetX;

            //Ensure margin is never negative
            if (newMargin < 0) {
                newMargin = 0;
            }

            //Convert to % is necessary   
            let unit = this.dragColMarginOptions.pos == 'left' ? column._o.get({ original: true }).u : column._po.get({ original: true }).u;
            newMargin = unit == 'px' ? Math.round(newMargin) : newMargin * 100 / W;

            //If SHIFT round to closest 5
            if (wwLib.wwShortcuts.modifiers.SHIFT) {
                newMargin = Math.round(newMargin / 5) * 5;
            }


            if (wwLib.wwShortcuts.modifiers.CTRL) {
                const cols = this.wwObject.data.config.rows.value[this.dragColMarginOptions.rowIndex]._c;
                for (let colIndex of cols) {
                    this.wwObject.data.config.columns[colIndex]._o.get({ original: true }).set(Math.max(0, newMargin) + unit);
                    if (cols.indexOf(colIndex) == cols.length - 1) {
                        this.wwObject.data.config.columns[colIndex]._po.get({ original: true }).set(Math.max(0, newMargin) + unit);
                    }
                }
            }
            else if (this.dragColMarginOptions.pos == 'left') {
                column._o.get({ original: true }).set(Math.max(0, newMargin) + unit);
            }
            else {
                column._po.get({ original: true }).set(Math.max(0, newMargin) + unit);
            }

        },
        endDragColumnMargin(event) {

            setTimeout(() => {
                this.dragColMarginOptions.colIndex = null;
                this.dragColMarginOptions.dragging = false;
            }, 100);

            wwLib.getManagerWindow().removeEventListener('mousemove', this.dragColumnMargin);
            wwLib.getFrontWindow().removeEventListener('mousemove', this.dragColumnMargin);

            wwLib.getManagerWindow().removeEventListener('mouseup', this.endDragColumnMargin);
            wwLib.getFrontWindow().removeEventListener('mouseup', this.endDragColumnMargin);

            wwLib.getManagerWindow().removeEventListener('touchmove', this.dragColumnMargin);
            wwLib.getFrontWindow().removeEventListener('touchmove', this.dragColumnMargin);

            wwLib.getManagerWindow().removeEventListener('touchend', this.endDragColumnMargin);
            wwLib.getFrontWindow().removeEventListener('touchend', this.endDragColumnMargin);

            setTimeout(() => {
                wwLib.getManagerWindow().removeEventListener('click', this.preventClick, { capture: true, once: true });
                wwLib.getFrontWindow().removeEventListener('click', this.preventClick, { capture: true, once: true });
                wwLib.getManagerWindow().removeEventListener('touch', this.preventClick, { capture: true, once: true });
                wwLib.getFrontWindow().removeEventListener('touch', this.preventClick, { capture: true, once: true });
                wwLib.$on('wwFocus', this.checkFocus);
            }, 100);


            wwLib.getManagerDocument().body.classList.remove('ww-grid-column-margin-move');
            wwLib.getFrontDocument().body.classList.remove('ww-grid-column-margin-move');
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

            if (unit == 'auto') {
                newHeight = '0';
                rowHeight.value = newHeight + unit;
                this.wwObjectCtrl.update(this.wwObject);
            }
            else if (unit != rowHeight.u) {
                if (rowHeight.u == 'auto') {
                    if (unit == '%') {
                        newHeight = 1;
                    }
                    else {
                        newHeight = 10;
                    }
                }
                else if (rowHeight.u == '%') {
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
                return (mt.v * wwLib.getFrontWindow().innerHeight / 100);
            }
            else {
                return mt.v;
            }
        },

        getRowHeightPx(rowIndex) {
            const mh = this.wwObject.data.config.rows.value[rowIndex]._mh;
            if (mh.u == '%') {
                return (mh.v * wwLib.getFrontWindow().innerHeight / 100);
            }
            else {
                return mh.v;
            }
        },

        setRowAlign(rowIndex, align) {
            this.wwObject.data.config.rows.value[rowIndex]._jc = align;
            this.wwObjectCtrl.update(this.wwObject);
        },

        getRowOptions(rowIndex) {
            return {
                firstPage: 'MENU',
                story: {
                    MENU: {
                        name: {  //Nom du popup, si vide le popup s'appelle 'Menu'
                            en: 'Row ' + (rowIndex + 1),
                            fr: 'Ligne ' + (rowIndex + 1)
                        },
                        items: [  //Liste des options dans le popup
                            {
                                text: {
                                    en: '',
                                    fr: ''
                                },
                                input: {
                                    type: 'wwValueUnitSelector',
                                    value: this.wwObject.data.config.rows.value[rowIndex]._mh,
                                    allowedUnits: ['px', '%', 'auto'],
                                    changeValue: (event) => {
                                        this.setRowHeightValue(rowIndex, event);

                                        //Should return new value
                                        return this.wwObject.data.config.rows.value[rowIndex]._mh;
                                    },
                                    changeUnit: (event) => {
                                        this.setRowHeightUnit(rowIndex, event);

                                        //Should return new value
                                        return this.wwObject.data.config.rows.value[rowIndex]._mh;
                                    }
                                },
                                icon: 'fas fa-arrows-alt-v',
                                action: 'ww-select-image'
                            },
                            {
                                text: {
                                    en: 'Align',
                                    fr: 'Disposition'
                                },
                                icon: 'https://cdn.weweb.app/public/images/justify-content/center.png',
                                action: 'wwObjectMenu:ALIGN'
                            }
                        ]
                    },
                    ALIGN: {
                        name: {  //Nom du popup, si vide le popup s'appelle 'Menu'
                            en: 'Align',
                            fr: 'Disposition'
                        },
                        items: [  //Liste des options dans le popup
                            {
                                text: {
                                    en: 'Left',
                                    fr: 'Gauche'
                                },
                                icon: 'https://cdn.weweb.app/public/images/justify-content/flex-start.png',
                                action: {
                                    fn: 'setRowAlign',
                                    args: [rowIndex, 'flex-start'],
                                    close: false,
                                }
                            },
                            {
                                text: {
                                    en: 'Center',
                                    fr: 'Centrer'
                                },
                                icon: 'https://cdn.weweb.app/public/images/justify-content/center.png',
                                action: {
                                    fn: 'setRowAlign',
                                    close: false,
                                    args: [rowIndex, 'center']
                                }
                            },
                            {
                                text: {
                                    en: 'Right',
                                    fr: 'Droite'
                                },
                                icon: 'https://cdn.weweb.app/public/images/justify-content/flex-end.png',
                                action: {
                                    fn: 'setRowAlign',
                                    close: false,
                                    args: [rowIndex, 'flex-end']
                                }
                            },
                            {
                                text: {
                                    en: 'Space',
                                    fr: 'Espace'
                                },
                                icon: 'https://cdn.weweb.app/public/images/justify-content/space-between.png',
                                action: {
                                    fn: 'setRowAlign',
                                    close: false,
                                    args: [rowIndex, 'space-between']
                                }
                            },
                            {
                                name: "Back",
                                text: {
                                    en: 'Back',
                                    fr: 'Retour'
                                },
                                icon: 'wwi wwi-chevron-left',
                                type: 'back',
                                action: 'wwObjectMenu:back'
                            }
                        ]
                    }
                }
            }
        },

        /*=============================================m_ÔÔ_m=============================================\
          MOVE ROW MARGIN
        \================================================================================================*/
        startDragMarginTop(rowIndex, event) {
            this.dragMarginTopOptions.dragging = true;

            this.dragMarginTopOptions.rowIndex = rowIndex;
            this.dragMarginTopOptions.originalValue = this.wwObject.data.config.rows.value[rowIndex]._mt.u == 'px' ? this.wwObject.data.config.rows.value[rowIndex]._mt.v : Math.floor(this.wwObject.data.config.rows.value[rowIndex]._mt.v * wwLib.getFrontWindow().innerHeight / 100);
            this.dragMarginTopOptions.originalPos = wwLib.wwUtils.getCursorManagerCoords(event).y;

            wwLib.getManagerDocument().body.classList.add('ww-grid-row-margin-top-move');
            wwLib.getFrontDocument().body.classList.add('ww-grid-row-margin-top-move');

            wwLib.getManagerWindow().addEventListener('mousemove', this.dragMarginTop);
            wwLib.getFrontWindow().addEventListener('mousemove', this.dragMarginTop);
            wwLib.getManagerWindow().addEventListener('touchmove', this.dragMarginTop);
            wwLib.getFrontWindow().addEventListener('touchmove', this.dragMarginTop);

            wwLib.getManagerWindow().addEventListener('mouseup', this.endDragMarginTop);
            wwLib.getFrontWindow().addEventListener('mouseup', this.endDragMarginTop);
            wwLib.getManagerWindow().addEventListener('touchend', this.endDragMarginTop);
            wwLib.getFrontWindow().addEventListener('touchend', this.endDragMarginTop);
        },
        dragMarginTop(event) {
            //Calculate offsets
            let offsetY = wwLib.wwUtils.getCursorManagerCoords(event).y - this.dragMarginTopOptions.originalPos;

            //Get total available height
            const H = wwLib.getFrontWindow().innerHeight;

            let newMargin = this.dragMarginTopOptions.originalValue + offsetY;

            //Ensure margin is never negative
            if (newMargin < 0) {
                newMargin = 0;
            }

            //Convert to % is necessary   
            newMargin = this.wwObject.data.config.rows.value[this.dragMarginTopOptions.rowIndex]._mt.u == 'px' ? Math.round(newMargin) : newMargin * 100 / H;

            //If SHIFT round to closest 5
            if (wwLib.wwShortcuts.modifiers.SHIFT) {
                newMargin = Math.round(newMargin / 5) * 5;
            }


            this.wwObject.data.config.rows.value[this.dragMarginTopOptions.rowIndex]._mt.set(Math.max(0, newMargin) + this.wwObject.data.config.rows.value[this.dragMarginTopOptions.rowIndex]._mt.u);

        },
        endDragMarginTop(event) {

            setTimeout(() => {
                this.dragMarginTopOptions.rowIndex = null;
                this.dragMarginTopOptions.dragging = false;
            }, 100);

            wwLib.getManagerWindow().removeEventListener('mousemove', this.dragMarginTop);
            wwLib.getFrontWindow().removeEventListener('mousemove', this.dragMarginTop);

            wwLib.getManagerWindow().removeEventListener('mouseup', this.endDragMarginTop);
            wwLib.getFrontWindow().removeEventListener('mouseup', this.endDragMarginTop);

            wwLib.getManagerWindow().removeEventListener('touchmove', this.dragMarginTop);
            wwLib.getFrontWindow().removeEventListener('touchmove', this.dragMarginTop);

            wwLib.getManagerWindow().removeEventListener('touchend', this.endDragMarginTop);
            wwLib.getFrontWindow().removeEventListener('touchend', this.endDragMarginTop);

            wwLib.getManagerDocument().body.classList.remove('ww-grid-row-margin-top-move');
            wwLib.getFrontDocument().body.classList.remove('ww-grid-row-margin-top-move');
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
        editRows() {
            wwLib.wwObjectHover.setLock(this, true);
            this.editingRows = true;
            this.editingColumns = false;
        },
        editColumns() {
            wwLib.wwObjectHover.setLock(this, true);
            this.editingColumns = true;
            this.editingRows = false;
        },
        endEditLayout(event) {
            wwLib.wwObjectHover.removeLock(this);
            if (event) {
                this.preventClick(event);
            }
            this.editingRows = false;
            this.editingColumns = false;
        },

        beforeSave() {
            wwLib.wwObjectHover.removeLock(this);
            this.editingRows = false;
            this.editingColumns = false;
        },

        //Check if grid still has focus, cancel layout edition if not.
        checkFocus(focusId) {
            if (focusId != this.$parent._uid) {
                this.editingRows = false;
                this.editingColumns = false;
            }
        },
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

        /* wwManager:start */
        wwLib.$on('wwFocus', this.checkFocus);
        /* wwManager:end */
    },
    /* wwManager:start */
    beforeDestroy() {
        wwLib.getFrontWindow().removeEventListener('click', this.endEditLayout);
        wwLib.getManagerWindow().removeEventListener('click', this.endEditLayout);
        wwLib.getFrontWindow().removeEventListener('touch', this.endEditLayout);
        wwLib.getManagerWindow().removeEventListener('touch', this.endEditLayout);

        wwLib.$off('wwFocus', this.checkFocus);
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
            top: 0;
            transform: scaleX(0);
            transform-origin: 0 50%;
            z-index: 54;

            border-radius: 0 20px 20px 0;
            background-color: #d02e7c;
            color: white;
            height: 30px;
            justify-content: center;
            align-items: center;
            font-size: 12px;
            pointer-events: none;
            user-select: none;
            transition: transform 0.3s ease;
            padding: 0 5px;

            & > * {
                margin: 0 3px;
            }

            & > .hover-invisible {
                // background-color: blue;
                position: absolute;
                top: 50%;
                left: 0;
                width: 100%;
                height: 200%;
                transform: translateY(-50%);
            }

            .options {
                display: flex;
                align-items: center;
                font-size: 13px;
                transform: scale(0);
                width: 0;
                margin: 0;
                transition: all 0.3s ease;
                white-space: nowrap;

                .label {
                    margin-right: 5px;
                    margin-left: 10px;
                }

                .align {
                    position: relative;
                    display: flex;
                    align-items: center;

                    .align-icon {
                        transition: all 0.3s ease;
                        opacity: 0.6;
                        margin: 0 5px;
                        &:hover,
                        &.selected {
                            opacity: 1;
                        }
                    }

                    .align-icons {
                        opacity: 0;
                        pointer-events: none;
                        position: absolute;
                        left: 0;
                        top: 100%;
                        display: flex;
                        flex-direction: column;
                        background-color: #d02e7c;
                        border-radius: 0 0 7px 7px;
                        transition: opacity 0.3s ease;

                        .hover-invisible {
                            // background-color: blue;
                            position: absolute;
                            top: 0;
                            left: 50%;
                            width: 200%;
                            height: 100%;
                            transform: translateX(-50%);
                        }

                        .align-icon {
                            position: relative;
                            cursor: pointer;
                        }
                    }

                    &:hover {
                        .align-icons {
                            opacity: 1;
                            pointer-events: all;
                        }
                    }
                }
            }

            &:hover {
                z-index: 55;

                .options {
                    margin: 0 3px;
                    width: 220px;
                    transform: scale(1);
                }
            }

            &.show {
                pointer-events: all;
                transform: scale(1);
            }
        }

        .ww-row-margin-top {
            display: none;
            pointer-events: none;
            position: absolute;
            top: 0;
            left: 0;
            transform: translate(0, -50%);
            opacity: 0;
            pointer-events: 0;
            width: 100%;
            z-index: 54;
            transition: opacity 0.3s ease;

            .handle {
                width: 15px;
                height: 15px;
                cursor: ns-resize;
                z-index: 1;
                font-size: 11px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #cd3c6e;
                background-color: #ffd8e3;
                position: absolute;
                right: 5px;
                top: 100%;
                transform: translateY(-50%);

                &.percent {
                    color: #3a85b9;
                    background-color: #afdefb;
                }

                .zone {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    border-radius: 100%;
                    width: 25px;
                    height: 25px;
                    transform: translate(-50%, -50%);
                }
            }

            .value-unit-selector {
                position: absolute;
                top: 100%;
                right: 25px;
                transform: translateY(-50%);
            }

            .hover {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                transform: translateY(-50%);
                min-height: 20px;
            }

            &.force-show,
            &:hover {
                opacity: 1;

                .hover-invisible {
                    position: absolute;
                    top: 50%;
                    left: 0;
                    height: calc(100% + 20px);
                    width: 100px;
                    transform: translateY(-50%);
                }
            }

            &.show {
                display: block;
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

                    .options {
                        pointer-events: all;
                    }
                }

                .options {
                    position: absolute;
                    left: 50%;
                    top: 2px;
                    transform: translate(-50%, 0);
                    user-select: none;
                    pointer-events: none;

                    & > span {
                        z-index: 2;
                        // position: absolute;
                        // top: 50%;
                        // left: 50%;
                        // transform: translate(-50%, -50%);
                        color: white;
                        background-color: #e02a4d;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 27px;
                        height: 27px;
                        font-size: 17px;
                        box-shadow: 0px 0px 11px -3px #636363;
                        border-radius: 100%;
                        cursor: pointer;
                    }

                    // .options-bg {
                    //     position: absolute;
                    //     opacity: 0.5;
                    //     top: 50%;
                    //     left: 50%;
                    //     transform: translate(-50%, -50%);
                    //     border-radius: 100%;
                    //     width: 110px;
                    //     height: 110px;
                    //     pointer-events: none;
                    // }

                    // $optionsCount: 7;
                    // .option {
                    //     opacity: 0;
                    //     position: absolute;
                    //     top: 50%;
                    //     left: 50%;
                    //     transform: translate(-50%, -50%);
                    //     z-index: 1;

                    //     i {
                    //         z-index: 1;
                    //         position: absolute;
                    //         top: 0;
                    //         left: 0;
                    //         transform: translate(-50%, -50%);
                    //         display: flex;
                    //         justify-content: center;
                    //         align-items: center;
                    //         width: 23px;
                    //         height: 23px;
                    //         border-radius: 100%;
                    //         color: #e02a4d;
                    //         background-color: white;
                    //         box-shadow: 0px 0px 11px -3px #636363;
                    //         font-size: 16px;
                    //         cursor: pointer;
                    //         transition: all 0.4s ease;

                    //         &:hover {
                    //             color: white;
                    //             background-color: #e02a4d;
                    //         }

                    //         &.move-down::before {
                    //             transform: rotate(90deg);
                    //         }
                    //     }

                    //     .tooltip {
                    //         position: absolute;
                    //         top: 0;
                    //         left: 50%;
                    //         transform: translate(0, -50%);
                    //         white-space: nowrap;
                    //         background-color: #2e86c2;
                    //         color: white;
                    //         padding: 3px 5px;
                    //         font-size: 11px;
                    //         pointer-events: none;
                    //         transition: 0.2s ease;
                    //         opacity: 0;
                    //         z-index: 60;
                    //     }

                    //     &:hover {
                    //         .tooltip {
                    //             opacity: 1;
                    //             transform: translate(15px, -50%);
                    //         }
                    //     }
                    // }

                    // &:hover {
                    //     .options-bg {
                    //         pointer-events: all;
                    //     }
                    //     .option {
                    //         @for $i from 0 through $optionsCount - 1 {
                    //             &.option-#{$i} {
                    //                 $angle: (2 * $pi / $optionsCount * $i);
                    //                 // $angle: (-2 * $pi / $optionsCount * $i) +
                    //                 //     $pi;
                    //                 transform: translate(
                    //                     $optionsCount * 5px * sin($angle),
                    //                     $optionsCount * -5px * cos($angle)
                    //                 );
                    //                 opacity: 1;
                    //                 z-index: 3;

                    //                 $td: 0.03s * $i;
                    //                 $tf: cubic-bezier(0.2, 0.435, 0.32, 1.47);

                    //                 transition: opacity 0.3s ease $td,
                    //                     transform 0.3s $tf $td,
                    //                     z-index 0.3s linear $td;
                    //             }
                    //         }
                    //     }
                    // }
                }

                .value-unit-selector {
                    position: absolute;
                    left: 50%;
                    top: 27px;
                    transform: translate(-50%, 3px) scale(0.9);
                    transition: all 0.2s ease;

                    &:hover {
                        z-index: 2;
                    }
                }
            }

            .ww-column-margin-left,
            .ww-column-margin-right {
                display: none;
                pointer-events: none;
                position: absolute;
                top: 0;
                left: 0;
                transform: translate(-50%, 0);
                opacity: 0;
                pointer-events: 0;
                height: 100%;
                z-index: 53;
                transition: opacity 0.3s ease;

                .handle {
                    width: 15px;
                    height: 15px;
                    cursor: ew-resize;
                    z-index: 1;
                    font-size: 11px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #cd3c6e;
                    background-color: #ffd8e3;
                    position: absolute;
                    top: 26px;
                    left: 50%;
                    transform: translateX(-50%);

                    &.percent {
                        color: #3a85b9;
                        background-color: #afdefb;
                    }

                    .zone {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        border-radius: 100%;
                        width: 25px;
                        height: 25px;
                        transform: translate(-50%, -50%);
                    }
                }

                .value-unit-selector {
                    opacity: 0;
                    position: absolute;
                    top: 2px;
                    left: 50%;
                    transform: translateX(-50%);
                    pointer-events: none;
                    transition: opacity 0.3s ease;

                    &:hover {
                        z-index: 1;
                    }

                    &.show {
                        opacity: 1;
                        pointer-events: all;
                    }
                }

                .hover,
                .preview {
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    transform: translateX(-50%);
                    min-width: 20px;
                }

                .preview {
                    min-width: 0;
                    background-color: #3a85b9;
                    opacity: 0.15;
                }

                &.force-show,
                &:hover {
                    opacity: 1;
                    z-index: 54;

                    .hover-invisible {
                        background-color: red;
                        position: absolute;
                        top: 50%;
                        left: 0;
                        height: calc(100% + 20px);
                        width: 100px;
                        transform: translateY(-50%);
                    }
                }

                &.show {
                    display: block;
                    pointer-events: all;
                }

                &:hover {
                    z-index: 55;
                }
            }

            .ww-column-margin-right {
                right: 0;
                left: auto;
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
    transition: transform 0.3s ease;
    transform: scale(1);
    transform-origin: 100% 0;

    &.editing-layout {
        transform: scale(0);
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

.ww-grid-row-margin-top-move {
    user-select: none;
    cursor: ns-resize !important;
}

.ww-grid-column-margin-move {
    user-select: none;
    cursor: ew-resize !important;
}
/* wwManager:end */
</style>