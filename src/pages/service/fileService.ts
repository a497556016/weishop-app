import { MsgService } from './msgService';
import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { ActionSheetController } from "ionic-angular";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

@Injectable()
export class FileService {
    constructor(
        private camera: Camera,
        private imagePicker: ImagePicker,
        private actionSheetCtrl: ActionSheetController,
        private msgService: MsgService,
        private transfer: FileTransfer,
        private file: File
    ) {

    }

    private static upload_url: string = 'http://127.0.0.1:8080/**';

    private options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: this.camera.PictureSourceType.CAMERA,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        allowEdit: false,
        correctOrientation: true
    }

    // 调用相册时传入的参数
    private imagePickerOpt = {
        maximumImagesCount: 1,//选择一张图片
        width: 800,
        height: 800,
        quality: 80
    };

    private uploadCallback = {
        success: (data) => { },
        error: (err) => { }
    }

    showPicActionSheet(uploadCallback?: any) {
        if (uploadCallback) {
            this.uploadCallback = uploadCallback;
        }
        this.useASComponent();
    }

    // 使用ionic中的ActionSheet组件
    private useASComponent() {
        let actionSheet = this.actionSheetCtrl.create({
            title: '选择',
            buttons: [
                {
                    text: '拍照',
                    handler: () => {
                        this.openCamera();
                    }
                },
                {
                    text: '从手机相册选择',
                    handler: () => {
                        this.openImgPicker();
                    }
                },
                {
                    text: '取消',
                    role: 'cancel',
                    handler: () => {

                    }
                }
            ]
        });
        actionSheet.present();
    }

    openCamera() {
        this.camera.getPicture(this.options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            //let base64Image = 'data:image/jpeg;base64,' + imageData;
            this.msgService.show('拍照成功了' + imageData)
            this.upload(imageData, null);
        }, (err) => {
            // Handle error
            this.msgService.show(err)
        });
    }

    openImgPicker() {
        let tempPath = '';
        this.imagePicker.getPictures(this.imagePickerOpt).then((results) => {
            for (var i = 0; i < results.length; i++) {
                this.msgService.show('Image URI: ' + results[i]);
                tempPath = results[i];
            }
            this.upload(tempPath, null);
        }, (err) => {
            this.msgService.show(err)
        });
    }

    upload(path: string, url: string) {
        let options: FileUploadOptions = {
            fileKey: 'image',
            //fileName: 'name.jpg',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' //不加入 发生错误！！
            },
            params: {}
        }

        let fileTransfer: FileTransferObject = this.transfer.create();
        
        fileTransfer.upload(path, url || FileService.upload_url, options)
            .then((data) => {
                // success
                this.msgService.show('上传成功：' + data.response)
                let res = JSON.parse(data.response);
                if (this.uploadCallback.success) {
                    this.uploadCallback.success(res);
                }
            }, (err) => {
                // error
                this.msgService.show('上传失败：' + JSON.stringify(err));
                if (this.uploadCallback.error) {
                    this.uploadCallback.error(err);
                }
            })

    }
}
