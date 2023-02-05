package hd.com.xposeddemo.utils;

import android.database.Cursor;

import android.util.Log;

import hd.com.xposeddemo.bean.FriendInfo;

import org.apache.mina.util.Base64;


/**

* @author：牵手生活

* @date：2017/3/26

* @description：

*/
public class Rcontactlvbuff {
    // private static final int bAh = "alias".hashCode();

    // private static final int bAi = "conRemark".hashCode();

    // private static final int bAj = "domainList".hashCode();

    // private static final int bAk = "pyInitial".hashCode();

    // private static final int bAl = "quanPin".hashCode();

    // private static final int bAm = "showHead".hashCode();

    // private static final int bAn = "weiboFlag".hashCode();

    // private static final int bAo = "weiboNickname".hashCode();

    // private static final int bAp = "conRemarkPYFull".hashCode();

    // private static final int bAq = "conRemarkPYShort".hashCode();

    // private static final int bAr = "verifyFlag".hashCode();

    // private static final int bAs = "encryptUsername".hashCode();

    // private static final int bAt = "chatroomFlag".hashCode();

    // private static final int bAu = "deleteFlag".hashCode();

    // private static final int bAv = "contactLabelIds".hashCode();

    // public static final String[] brH = new String[]{"CREATE INDEX IF NOT EXISTS deleteflag_index ON Contact(deleteFlag)"};

    // private static final int brQ = "rowid".hashCode();

    // private static final int bvK = "lvbuff".hashCode();

    // private static final int byd = "username".hashCode();

    // private static final int byy = "nickname".hashCode();
    public String bAA;
    public int bAB;
    public int bAC;
    public String bAD;
    public String bAE;
    public int bAF;
    public int bAG;
    public String bAH;
    private String bAI; //省份
    private String bAJ; //省市
    public String bAK;
    public int bAL;
    public String bAM;
    public String bAN;
    public String bAO;
    public int bAP;
    public int bAQ;
    public String bAR;
    public String bAS;
    public String bAT;
    public String bAU;
    public String bAV;
    public String bAW;
    public String bAX;
    private boolean bAa = false;
    private boolean bAb = false;
    private boolean bAc = false;
    private boolean bAd = false;
    private boolean bAe = false;
    private boolean bAf = false;
    private boolean bAg = false;
    public int bAw;
    public int bAx; //手机号码
    public String bAy;
    public long bAz;
    public int bbt;
    public String bhc;
    private boolean bsz = false;
    private boolean bvo = false;
    private boolean bxO = false;
    private boolean byu = false;
    private boolean bzS = false;
    private boolean bzT = false;
    private boolean bzU = false;
    private boolean bzV = false;
    private boolean bzW = false;
    private boolean bzX = false;
    private boolean bzY = false;
    private boolean bzZ = false;
    private String field_alias;
    public int field_chatroomFlag;
    public String field_conRemark;
    public String field_conRemarkPYFull;
    public String field_conRemarkPYShort;
    public String field_contactLabelIds;
    public int field_deleteFlag;
    public String field_domainList;
    public String field_encryptUsername;
    public byte[] field_lvbuff; //==========
    public String field_nickname;
    private String field_pyInitial;
    private String field_quanPin;
    public int field_showHead;
    public int field_type;
    public String field_username;
    public int field_verifyFlag;
    public int field_weiboFlag;
    public String field_weiboNickname;
    public int uin;
    public long muj = -1; //rowid

    public void setUsername(String str) {
        this.field_username = str;

        this.bxO = true;
    }

    public final String getUsername() {
        return this.field_username;
    }

    public void bO(String str) {
        this.field_alias = str;

        this.bzS = true;
    }

    public String pF() {
        return this.field_alias;
    }

    public void bP(String str) {
        this.field_conRemark = str;

        this.bzT = true;
    }

    public void bQ(String str) {
        this.field_domainList = str;

        this.bzU = true;
    }

    public void bR(String str) {
        this.field_nickname = str;

        this.byu = true;
    }

    public void bS(String str) {
        this.field_pyInitial = str;

        this.bzV = true;
    }

    public String pG() {
        return this.field_pyInitial;
    }

    public void bT(String str) {
        this.field_quanPin = str;

        this.bzW = true;
    }

    public String pH() {
        return this.field_quanPin;
    }

    public void cM(int i) {
        this.field_showHead = i;

        this.bzX = true;
    }

    public void setType(int i) {
        this.field_type = i;

        this.bsz = true;
    }

    public void cN(int i) {
        this.field_weiboFlag = i;

        this.bzY = true;
    }

    public void bU(String str) {
        this.field_weiboNickname = str;

        this.bzZ = true;
    }

    public void bV(String str) {
        this.field_conRemarkPYFull = str;

        this.bAa = true;
    }

    public void bW(String str) {
        this.field_conRemarkPYShort = str;

        this.bAb = true;
    }

    public void u(byte[] bArr) {
        this.field_lvbuff = bArr;

        this.bvo = true;
    }

    public void cO(int i) {
        this.field_verifyFlag = i;

        this.bAc = true;
    }

    public void bX(String str) {
        this.field_encryptUsername = str;

        this.bAd = true;
    }

    public void cP(int i) {
        this.field_chatroomFlag = i;

        this.bAe = true;
    }

    public void cQ(int i) {
        this.field_deleteFlag = i;

        this.bAf = true;
    }

    public void bY(String str) {
        this.field_contactLabelIds = str;

        this.bAg = true;
    }

    public void b_byRcontract(FriendInfo friendInfo) {
        this.field_username = friendInfo.getUsername();

        this.bxO = true;

        this.field_alias = friendInfo.getAlias();

        this.field_conRemark = friendInfo.getConRemark();

        this.field_domainList = friendInfo.getDomainList();

        this.field_nickname = friendInfo.getNickName();

        this.field_pyInitial = friendInfo.getPyInitial();

        this.field_quanPin = friendInfo.getQuanPin();

        this.field_showHead = friendInfo.getShowHead();

        this.field_type = friendInfo.getType();

        this.field_weiboFlag = friendInfo.getWeiboFlag();

        this.field_weiboNickname = friendInfo.getWeiboNickname();

        this.field_conRemarkPYFull = friendInfo.getConRemarkPYFull();

        this.field_conRemarkPYShort = friendInfo.getConRemarkPYShort();

        this.field_lvbuff = Base64.decodeBase64(friendInfo.getLvbuff().getBytes()); //

        this.field_verifyFlag = friendInfo.getVerifyFlag();

        this.field_encryptUsername = friendInfo.getEncryptUsername();

        this.field_chatroomFlag = friendInfo.getChatroomFlag();

        this.field_deleteFlag = friendInfo.getDeleteFlag();

        this.field_contactLabelIds = friendInfo.getContactLabelIds();

        this.muj = friendInfo.getRowid();

        pI();
    }

    public void b(Cursor cursor) {
        this.field_username = cursor.getString(cursor.getColumnIndex("username"));

        this.bxO = true;

        this.field_alias = cursor.getString(cursor.getColumnIndex("alias"));

        this.field_conRemark = cursor.getString(cursor.getColumnIndex(
                    "conRemark"));

        this.field_domainList = cursor.getString(cursor.getColumnIndex(
                    "domainList"));

        this.field_nickname = cursor.getString(cursor.getColumnIndex("nickname"));

        this.field_pyInitial = cursor.getString(cursor.getColumnIndex(
                    "pyInitial"));

        this.field_quanPin = cursor.getString(cursor.getColumnIndex("quanPin"));

        this.field_showHead = cursor.getInt(cursor.getColumnIndex("showHead"));

        this.field_type = cursor.getInt(cursor.getColumnIndex("type"));

        this.field_weiboFlag = cursor.getInt(cursor.getColumnIndex("weiboFlag"));

        this.field_weiboNickname = cursor.getString(cursor.getColumnIndex(
                    "weiboNickname"));

        this.field_conRemarkPYFull = cursor.getString(cursor.getColumnIndex(
                    "conRemarkPYFull"));

        this.field_conRemarkPYShort = cursor.getString(cursor.getColumnIndex(
                    "conRemarkPYShort"));

        this.field_lvbuff = cursor.getBlob(cursor.getColumnIndex("lvbuff"));

        String s = new String(Base64.encodeBase64(field_lvbuff));

        Log.i("TAG", s);

        //new String(Base64.encodeBase64(blob_lvbuff))
        this.field_verifyFlag = cursor.getInt(cursor.getColumnIndex(
                    "verifyFlag"));

        this.field_encryptUsername = cursor.getString(cursor.getColumnIndex(
                    "encryptUsername"));

        this.field_chatroomFlag = cursor.getInt(cursor.getColumnIndex(
                    "chatroomFlag"));

        this.field_deleteFlag = cursor.getInt(cursor.getColumnIndex(
                    "deleteFlag"));

        this.field_contactLabelIds = cursor.getString(cursor.getColumnIndex(
                    "contactLabelIds"));

        this.muj = cursor.getLong(cursor.getColumnIndex("rowid"));

        pI();
    }

    public void cR(int i) {
        this.bAw = i;

        this.bvo = true;
    }

    public void cS(int i) {
        this.bAx = i;

        this.bvo = true;
    }

    public void bZ(String str) {
        this.bAy = str;

        this.bvo = true;
    }

    public void t(long j) {
        this.bAz = j;

        this.bvo = true;
    }

    public void cT(int i) {
        this.uin = i;

        this.bvo = true;
    }

    public void ca(String str) {
        this.bAA = str;

        this.bvo = true;
    }

    public void cb(String str) {
        this.bhc = str;

        this.bvo = true;
    }

    public void cU(int i) {
        this.bAB = i;

        this.bvo = true;
    }

    public void cV(int i) {
        this.bAC = i;

        this.bvo = true;
    }

    public void cc(String str) {
        this.bAD = str;

        this.bvo = true;
    }

    public void cd(String str) {
        this.bAE = str;

        this.bvo = true;
    }

    public void cW(int i) {
        this.bAF = i;

        this.bvo = true;
    }

    public void cX(int i) {
        this.bAG = i;

        this.bvo = true;
    }

    public void ce(String str) {
        this.bAH = str;

        this.bvo = true;
    }

    public String getProvince() {
        return this.bAI;
    }

    public void cf(String str) {
        this.bAI = str;

        this.bvo = true;
    }

    public String getCity() {
        return this.bAJ;
    }

    public void cg(String str) {
        this.bAJ = str;

        this.bvo = true;
    }

    public void ch(String str) {
        this.bAK = str;

        this.bvo = true;
    }

    public void cY(int i) {
        this.bAL = i;

        this.bvo = true;
    }

    public void setSource(int i) {
        this.bbt = i;

        this.bvo = true;
    }

    public void ci(String str) {
        this.bAM = str;

        this.bvo = true;
    }

    public void cj(String str) {
        this.bAN = str;

        this.bvo = true;
    }

    public void ck(String str) {
        this.bAO = str;

        this.bvo = true;
    }

    public void cZ(int i) {
        this.bAP = i;

        this.bvo = true;
    }

    public void da(int i) {
        this.bAQ = i;

        this.bvo = true;
    }

    public void cl(String str) {
        this.bAR = str;

        this.bvo = true;
    }

    public void cm(String str) {
        this.bAS = str;

        this.bvo = true;
    }

    public void cn(String str) {
        this.bAT = str;

        this.bvo = true;
    }

    public void co(String str) {
        this.bAU = str;

        this.bvo = true;
    }

    public void cp(String str) {
        this.bAV = str;

        this.bvo = true;
    }

    public void cq(String str) {
        this.bAW = str;

        this.bvo = true;
    }

    public void cr(String str) {
        this.bAX = str;

        this.bvo = true;
    }

    public final void pI() {
        try {
            if ((this.field_lvbuff != null) && (this.field_lvbuff.length != 0)) {
                WechatByteBufferUtil wechatByteBufferUtilVar = new WechatByteBufferUtil();

                int be = wechatByteBufferUtilVar.be(this.field_lvbuff);

                if (be != 0) {
                    // v.e("MicroMsg.SDK.BaseContact", "parse LVBuffer error:" + be);
                    Log.e("BaseContact", "parse LVBuffer error:" + be);

                    return;
                }

                this.bAw = wechatByteBufferUtilVar.getInt();

                this.bAx = wechatByteBufferUtilVar.getInt();

                this.bAy = wechatByteBufferUtilVar.getString();

                this.bAz = wechatByteBufferUtilVar.getLong();

                this.uin = wechatByteBufferUtilVar.getInt();

                this.bAA = wechatByteBufferUtilVar.getString();

                this.bhc = wechatByteBufferUtilVar.getString();

                this.bAB = wechatByteBufferUtilVar.getInt();

                this.bAC = wechatByteBufferUtilVar.getInt();

                this.bAD = wechatByteBufferUtilVar.getString();

                this.bAE = wechatByteBufferUtilVar.getString();

                this.bAF = wechatByteBufferUtilVar.getInt();

                this.bAG = wechatByteBufferUtilVar.getInt();

                this.bAH = wechatByteBufferUtilVar.getString();

                this.bAI = wechatByteBufferUtilVar.getString();

                this.bAJ = wechatByteBufferUtilVar.getString();

                this.bAK = wechatByteBufferUtilVar.getString();

                this.bAL = wechatByteBufferUtilVar.getInt();

                this.bbt = wechatByteBufferUtilVar.getInt();

                this.bAM = wechatByteBufferUtilVar.getString();

                this.field_verifyFlag = wechatByteBufferUtilVar.getInt();

                this.bAN = wechatByteBufferUtilVar.getString();

                if (!wechatByteBufferUtilVar.bmL()) {
                    this.bAO = wechatByteBufferUtilVar.getString();
                }

                if (!wechatByteBufferUtilVar.bmL()) {
                    this.bAP = wechatByteBufferUtilVar.getInt();
                }

                if (!wechatByteBufferUtilVar.bmL()) {
                    this.bAQ = wechatByteBufferUtilVar.getInt();
                }

                if (!wechatByteBufferUtilVar.bmL()) {
                    this.bAR = wechatByteBufferUtilVar.getString();
                }

                if (!wechatByteBufferUtilVar.bmL()) {
                    this.bAS = wechatByteBufferUtilVar.getString();
                }

                if (!wechatByteBufferUtilVar.bmL()) {
                    this.bAT = wechatByteBufferUtilVar.getString();
                }

                if (!wechatByteBufferUtilVar.bmL()) {
                    this.bAU = wechatByteBufferUtilVar.getString();
                }

                if (!wechatByteBufferUtilVar.bmL()) {
                    this.bAV = wechatByteBufferUtilVar.getString();
                }

                if (!wechatByteBufferUtilVar.bmL()) {
                    this.bAW = wechatByteBufferUtilVar.getString();
                }

                if (!wechatByteBufferUtilVar.bmL()) {
                    this.bAX = wechatByteBufferUtilVar.getString();
                }
            }
        } catch (Exception e) {
            // v.e("MicroMsg.SDK.BaseContact", "get value failed");

            //Log.e("BaseContact","get value failed" );
            System.out.println("get value failed");
        }
    }
}
