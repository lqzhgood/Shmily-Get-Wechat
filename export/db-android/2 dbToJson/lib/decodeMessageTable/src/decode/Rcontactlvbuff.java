package decode;

public class Rcontactlvbuff {
	
	private int uin;

	private String bAA;

	private int bAB;

	private int bAC;

	private String bAD;

	private String bAE;

	private int bAF;

	private int bAG;

	private String bAH;

	private String bAI; // ʡ��

	private String bAJ; // ʡ��

	private String bAK;

	private int bAL;

	private String bAM;

	private String bAN;

	private String bAO;

	private int bAP;

	private int bAQ;

	private String bAR;

	private String bAS;

	private String bAT;

	private String bAU;

	private String bAV;

	private String bAW;

	private String bAX;

	private int bAw;

	private int bAx; // �ֻ�����

	private String bAy;

	private long bAz;

	private int bbt;

	private String bhc;

	private int field_verifyFlag;
	
	private byte[] field_lvbuff;

	public final void pI() {

		try {

			if (this.field_lvbuff != null && this.field_lvbuff.length != 0) {

				WechatByteBufferUtil wechatByteBufferUtilVar = new WechatByteBufferUtil();

				int be = wechatByteBufferUtilVar.be(this.field_lvbuff);

				if (be != 0) {

					System.out.print("---------------------------errro");

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
			
			System.out.println("get value failed");

		}

	}
	

	public int getUin() {
		return uin;
	}

	public void setUin(int uin) {
		this.uin = uin;
	}

	public String getbAA() {
		return bAA;
	}

	public void setbAA(String bAA) {
		this.bAA = bAA;
	}

	public int getbAB() {
		return bAB;
	}

	public void setbAB(int bAB) {
		this.bAB = bAB;
	}

	public int getbAC() {
		return bAC;
	}

	public void setbAC(int bAC) {
		this.bAC = bAC;
	}

	public String getbAD() {
		return bAD;
	}

	public void setbAD(String bAD) {
		this.bAD = bAD;
	}

	public String getbAE() {
		return bAE;
	}

	public void setbAE(String bAE) {
		this.bAE = bAE;
	}

	public int getbAF() {
		return bAF;
	}

	public void setbAF(int bAF) {
		this.bAF = bAF;
	}

	public int getbAG() {
		return bAG;
	}

	public void setbAG(int bAG) {
		this.bAG = bAG;
	}

	public String getbAH() {
		return bAH;
	}

	public void setbAH(String bAH) {
		this.bAH = bAH;
	}

	public String getbAI() {
		return bAI;
	}

	public void setbAI(String bAI) {
		this.bAI = bAI;
	}

	public String getbAJ() {
		return bAJ;
	}

	public void setbAJ(String bAJ) {
		this.bAJ = bAJ;
	}

	public String getbAK() {
		return bAK;
	}

	public void setbAK(String bAK) {
		this.bAK = bAK;
	}

	public int getbAL() {
		return bAL;
	}

	public void setbAL(int bAL) {
		this.bAL = bAL;
	}

	public String getbAM() {
		return bAM;
	}

	public void setbAM(String bAM) {
		this.bAM = bAM;
	}

	public String getbAN() {
		return bAN;
	}

	public void setbAN(String bAN) {
		this.bAN = bAN;
	}

	public String getbAO() {
		return bAO;
	}

	public void setbAO(String bAO) {
		this.bAO = bAO;
	}

	public int getbAP() {
		return bAP;
	}

	public void setbAP(int bAP) {
		this.bAP = bAP;
	}

	public int getbAQ() {
		return bAQ;
	}

	public void setbAQ(int bAQ) {
		this.bAQ = bAQ;
	}

	public String getbAR() {
		return bAR;
	}

	public void setbAR(String bAR) {
		this.bAR = bAR;
	}

	public String getbAS() {
		return bAS;
	}

	public void setbAS(String bAS) {
		this.bAS = bAS;
	}

	public String getbAT() {
		return bAT;
	}

	public void setbAT(String bAT) {
		this.bAT = bAT;
	}

	public String getbAU() {
		return bAU;
	}

	public void setbAU(String bAU) {
		this.bAU = bAU;
	}

	public String getbAV() {
		return bAV;
	}

	public void setbAV(String bAV) {
		this.bAV = bAV;
	}

	public String getbAW() {
		return bAW;
	}

	public void setbAW(String bAW) {
		this.bAW = bAW;
	}

	public String getbAX() {
		return bAX;
	}

	public void setbAX(String bAX) {
		this.bAX = bAX;
	}

	public int getbAw() {
		return bAw;
	}

	public void setbAw(int bAw) {
		this.bAw = bAw;
	}

	public int getbAx() {
		return bAx;
	}

	public void setbAx(int bAx) {
		this.bAx = bAx;
	}

	public String getbAy() {
		return bAy;
	}

	public void setbAy(String bAy) {
		this.bAy = bAy;
	}

	public long getbAz() {
		return bAz;
	}

	public void setbAz(long bAz) {
		this.bAz = bAz;
	}

	public int getBbt() {
		return bbt;
	}

	public void setBbt(int bbt) {
		this.bbt = bbt;
	}

	public String getBhc() {
		return bhc;
	}

	public void setBhc(String bhc) {
		this.bhc = bhc;
	}

	public int getField_verifyFlag() {
		return field_verifyFlag;
	}

	public void setField_verifyFlag(int field_verifyFlag) {
		this.field_verifyFlag = field_verifyFlag;
	}

	public byte[] getField_lvbuff() {
		return field_lvbuff;
	}

	public void setField_lvbuff(byte[] field_lvbuff) {
		this.field_lvbuff = field_lvbuff;
	}
	
	

}