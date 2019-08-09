import wwObject from './wwObjectGrid.vue'

const name = "__NAME__";
const version = '__VERSION__';

const addComponent = function () {
    if (window.vm) {

        wwLib.wwObject.register({
            /* wwManager:start */
            cmsOptions: {
                wwObjectHover: {
                    pluses: false,
                    hoverClass: 'ww-grid-hover'
                },
                wwObjectMenu: {
                    items: [
                        {
                            if: 'wwLayout',
                            name: 'ADD_BEFORE',
                            text: {
                                en: 'Before',
                                fr: 'Avant'
                            },
                            icon: 'wwi wwi-add',
                            action: 'wwLayout:addBefore'
                        },
                        {
                            if: 'wwLayout',
                            name: 'ADD_AFTER',
                            text: {
                                en: 'After',
                                fr: 'Après'
                            },
                            icon: 'wwi wwi-add',
                            action: 'wwLayout:addAfter'
                        },

                        {
                            name: 'OPTIONS',
                            main: true,
                            text: {
                                en: 'Options',
                                fr: 'Options'
                            },
                            icon: 'wwi wwi-edit-other',
                            action: 'edit'
                        },

                        {
                            name: 'LAYOUT',
                            text: {
                                en: 'Layout',
                                fr: 'Disposition'
                            },
                            icon: 'fas fa-th-large',
                            action: 'editLayout'
                        },

                    ]
                }
            },
            /* wwManager:end */
            content: {
                type: name,
                data: {
                    config: {
                        rows: new wwLib.wwTypes.ResponsiveDevice([
                            {
                                _c: [0, 1, 2],
                                _mt: new wwLib.wwTypes.ValueUnit('0px'),
                                _mh: new wwLib.wwTypes.ValueUnit('0px'),
                                _jc: 'flex-start'
                            }
                        ]),
                        columns: [
                            {
                                _w: new wwLib.wwTypes.ResponsiveDevice(new wwLib.wwTypes.ValueUnit('1r')),
                                _o: new wwLib.wwTypes.ResponsiveDevice(new wwLib.wwTypes.ValueUnit('0px')),
                                _po: new wwLib.wwTypes.ResponsiveDevice(new wwLib.wwTypes.ValueUnit('0px')),
                                _c: null,
                                _i: 0
                            },
                            {
                                _w: new wwLib.wwTypes.ResponsiveDevice(new wwLib.wwTypes.ValueUnit('1r')),
                                _o: new wwLib.wwTypes.ResponsiveDevice(new wwLib.wwTypes.ValueUnit('0px')),
                                _po: new wwLib.wwTypes.ResponsiveDevice(new wwLib.wwTypes.ValueUnit('0px')),
                                _c: null,
                                _i: 1
                            },
                            {
                                _w: new wwLib.wwTypes.ResponsiveDevice(new wwLib.wwTypes.ValueUnit('1r')),
                                _o: new wwLib.wwTypes.ResponsiveDevice(new wwLib.wwTypes.ValueUnit('0px')),
                                _po: new wwLib.wwTypes.ResponsiveDevice(new wwLib.wwTypes.ValueUnit('0px')),
                                _c: null,
                                _i: 2
                            }
                        ]
                    },
                    background: null
                    /*
                    style: {
                        alignItems: null,
                        height: null
                    }
                    */
                }
            },
            upsales: {
                wwAnalytics: {
                    click: false
                }
            }
        });

        window.vm.addComponent({
            name: name,
            version: version,
            content: wwObject
        });

        return true;
    }
    return false;
}

if (!addComponent()) {
    const iniInterval = setInterval(function () {
        if (addComponent()) {
            clearInterval(iniInterval);
        }
    }, 10);
}