





class WechatByteBufferUtil {

    constructor(params) {
        this.mqn = null; //ByteBuffer
        this.mqo = null;  // Boolean
    }


    be(bArr) {
        const z = (bArr == null) || (bArr.length == 0) ? true
            : bArr[0] != 123 ? true
                : bArr[bArr.length + -1] != 125 ? true : false;

        if (z) {
            this.mqn = null;

            return -1;
        }

        this.mqn = ByteBuffer.wrap(bArr);

        this.mqn.position(1);

        this.mqo = false;

        return 0;
    }


}