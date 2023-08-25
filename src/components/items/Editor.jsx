import React, {useState} from "react";
import {CKEditor} from 'ckeditor4-react';
import Button from "@/components/items/Button";

export default function Editor({onEditorChange}) {

    const [editorInstance, setEditorInstance] = useState(null);

    const onEditorReady = (event) => {
        setEditorInstance(event.editor);

        // Ajoutez un écouteur pour suivre les changements dans l'éditeur
        event.editor.on("change", function() {
            if (onEditorChange) {
                onEditorChange(event.editor.getData());
            }
        });
    };

    return <CKEditor onInstanceReady={onEditorReady}
                     config={
                         {
                             toolbar: [
                                 {
                                     name: 'document',
                                     items: ['Save', 'NewPage', 'Preview', 'Print', '-', 'Templates']
                                 },
                                 {
                                     name: 'clipboard',
                                     items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']
                                 },
                                 {name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll']},
                                 {
                                     name: 'forms',
                                     items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton',
                                         'HiddenField']
                                 },
                                 '/',
                                 {
                                     name: 'basicstyles',
                                     items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-',
                                         'RemoveFormat']
                                 },
                                 {
                                     name: 'paragraph',
                                     items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote',
                                         'CreateDiv', '-',
                                         'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-',
                                         'BidiLtr', 'BidiRtl', 'Language']
                                 },
                                 {name: 'links', items: ['Link', 'Unlink', 'Anchor']},
                                 {
                                     name: 'insert',
                                     items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak',
                                         'Iframe']
                                 },
                                 '/',
                                 {name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize']},
                                 {name: 'colors', items: ['TextColor', 'BGColor', 'CopyFormatting', 'RemoveFormat']},
                                 {name: 'tools', items: ['Maximize', 'ShowBlocks']},
                                 {name: 'about', items: ['About']},
                             ],
                             extraPlugins: 'justify,font,colorbutton,panelbutton,panel,floatpanel,button,floatingspace,liststyle,indentlist,indentblock,indent,indentblock',
                             removePlugins: 'elementspath',
                         }}
    />
}
