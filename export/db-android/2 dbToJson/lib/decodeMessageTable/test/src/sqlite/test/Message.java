package sqlite.test;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Message implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String msgId;
	private String msgSvrId;
	private String type;
	private String status;
	private String isSend;
	private String isShowTimer;
	private String createTime;
	private String talker;
	private Object content;
	private String imgPath;
	private Object reserved;
	private Object lvbuffer;
	private String transContent;
	private String transBrandWording;
	private String talkerId;
	private String bizClientMsgId;
	private String bizChatId;
	private String bizChatUserId;
	private String msgSeq;
	private String flag;
	private List<String> hasXml = new ArrayList<String>();
	
	

	public List<String> getHasXml() {
		return hasXml;
	}
//	public void setHasXml(List<String> hasXml) {
//		this.hasXml = hasXml;
//	}
	public String getMsgId() {
		return msgId;
	}
	public void setMsgId(String msgId) {
		this.msgId = msgId;
	}
	public String getMsgSvrId() {
		return msgSvrId;
	}
	public void setMsgSvrId(String msgSvrId) {
		this.msgSvrId = msgSvrId;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getIsSend() {
		return isSend;
	}
	public void setIsSend(String isSend) {
		this.isSend = isSend;
	}
	public String getIsShowTimer() {
		return isShowTimer;
	}
	public void setIsShowTimer(String isShowTimer) {
		this.isShowTimer = isShowTimer;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getTalker() {
		return talker;
	}
	public void setTalker(String talker) {
		this.talker = talker;
	}
	public Object getContent() {
		return content;
	}
	public void setContent(Object content) {
		this.content = content;
	}
	public String getImgPath() {
		return imgPath;
	}
	public void setImgPath(String imgPath) {
		this.imgPath = imgPath;
	}
	public Object getReserved() {
		return reserved;
	}
	public void setReserved(Object reserved) {
		this.reserved = reserved;
	}
	public Object getLvbuffer() {
		return lvbuffer;
	}
	public void setLvbuffer(Object lvbuffer) {
		this.lvbuffer = lvbuffer;
	}
	public String getTransContent() {
		return transContent;
	}
	public void setTransContent(String transContent) {
		this.transContent = transContent;
	}
	public String getTransBrandWording() {
		return transBrandWording;
	}
	public void setTransBrandWording(String transBrandWording) {
		this.transBrandWording = transBrandWording;
	}
	public String getTalkerId() {
		return talkerId;
	}
	public void setTalkerId(String talkerId) {
		this.talkerId = talkerId;
	}
	public String getBizClientMsgId() {
		return bizClientMsgId;
	}
	public void setBizClientMsgId(String bizClientMsgId) {
		this.bizClientMsgId = bizClientMsgId;
	}
	public String getBizChatId() {
		return bizChatId;
	}
	public void setBizChatId(String bizChatId) {
		this.bizChatId = bizChatId;
	}
	public String getBizChatUserId() {
		return bizChatUserId;
	}
	public void setBizChatUserId(String bizChatUserId) {
		this.bizChatUserId = bizChatUserId;
	}
	public String getMsgSeq() {
		return msgSeq;
	}
	public void setMsgSeq(String msgSeq) {
		this.msgSeq = msgSeq;
	}
	public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
	}
}
