import {Component} from './components';

export async function loadUsermodeForm(componentList: Component[]) {
    // @ts-ignore because Formbuilder is defined by Jstris itself
    const fb = new Formbuilder({selector: '.components-main', bootstrapData: componentList});
    fb.on('save', function (payload) {
        // @ts-ignore
        $('#modeData').val(payload);
        // @ts-ignore
        $('#modeForm').submit();
    })

    // @ts-ignore
    $('#pubSection').hide();
}
