import java.io.FileInputStream;
import java.io.ObjectInputStream;
import java.security.MessageDigest;
import java.util.HashMap;
import java.io.File;

class IMEI {
    public static void main(String[] args) {
        try {
            ObjectInputStream in = new ObjectInputStream(new FileInputStream(args[0]));
            Object DL = in.readObject();
            HashMap hashWithOutFormat = (HashMap) DL;

           // CompatibleInfo.cfg 有可能0字节
           String imei = "1234567890ABCDEF"; // 默认字符串
           File fCompatibleInfo = new File(args[1]);
           // 取手机的IMEI
           if(fCompatibleInfo.length() > 0) {
            FileInputStream fisCompatibleInfo = new FileInputStream(fCompatibleInfo);
            ObjectInputStream in1 = new ObjectInputStream(fisCompatibleInfo);
            Object DJ = in1.readObject();            
            HashMap hashWithOutFormat1 = (HashMap) DJ;
            imei = String.valueOf(hashWithOutFormat1.get(Integer.valueOf(258)));
            in1.close();
           }
           System.out.println("The IMEI is : " + imei);

           String uin = String.valueOf(hashWithOutFormat.get(Integer.valueOf(1)));
           System.out.println("The uin is : " + uin);
           imei = imei + uin; //合并到一个字符串
           imei = encode(imei); // hash
           System.out.println("The Key is : " + imei.substring(0, 7));
           in.close();           
        } catch (Exception e) {
            e.printStackTrace();
        }
 }

 public static String encode(String content)
  {
   try {
    MessageDigest digest = MessageDigest.getInstance("MD5");
    digest.update(content.getBytes());
    return getEncode32(digest);
    }
   catch (Exception e)
   {
    e.printStackTrace();
   }
   return null;
  }
  private static String getEncode32(MessageDigest digest)
  {
   StringBuilder builder = new StringBuilder();
   for (byte b : digest.digest())
   {
    builder.append(Integer.toHexString((b >> 4) & 0xf));
    builder.append(Integer.toHexString(b & 0xf));
   }
    return builder.toString(); 
  }
}