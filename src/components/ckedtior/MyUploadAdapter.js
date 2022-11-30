
class MyUploadAdapter {
    constructor(loader) {
        this.loader = loader
    }

    // 開始上傳的部分
    upload() {
        this.controller = new AbortController();
        const signal = this.controller.signal;
        let data = new FormData()

        return this.loader.file
            .then(file => new Promise((resolve, reject) => {
                console.log({ file })
                data.append('upload', file)
                fetch('/api/testupload2', {
                    method: 'post',
                    body: data,
                    signal
                })
                    .then(res => res.json())
                    .then(json => resolve(json))
                    .catch(error => reject(error))
            }))
    }

    // 中止上傳 允許編輯器中止上傳過程。例如，當圖像在上傳完成或編輯器實例被銷毀之前被用戶從內容中刪除時，這是必要的。
    abort() {
        // Reject the promise returned from the upload() method.
        if (this.controller) {
            this.controller.abort()
        }
    }
}

export default function MyCustomUploadAdapterPlugin(editor) {
    console.log('我被調用', editor)
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        // Configure the URL to the upload script in your back-end here!
        return new MyUploadAdapter(loader);
    };
}