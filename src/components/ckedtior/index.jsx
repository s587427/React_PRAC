import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import MyClassicEditor from './MyClassicEditor.jsx'

class Myckedtior extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editor: null,
        }
    }
    render() {
        return (
            <div className="App">
                <h2>Using CKEditor 5 build in React</h2>
                <CKEditor
                    editor={MyClassicEditor} // 編輯器種類
                    data="<p>Hello from CKEditor 5!</p>" // 類似input內容
                    onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                        this.setState({ editor: editor })
                    }}
                    onChange={(event, editor) => { // 資料改變
                        const data = editor.getData();
                        console.log({ event, editor, data }, 'onChange');
                    }}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />
                <button onClick={() => console.log(this.state.editor.getData())}>Save</button>
            </div>

        );
    }
}

export default Myckedtior