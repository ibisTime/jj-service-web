package com.xnjr.home.front.util;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.codec.binary.Base64;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.SftpException;
import com.xnjr.home.front.exception.BizException;

/** 
 * SFTP远程连接服务器，上传文件工具类
 * @author: haiqingzheng 
 * @since: 2015年10月20日 下午1:52:17 
 * @history:
 */
public class UploadUtil {

    /** 
     * @param args 
     * @create: 2015年10月20日 下午1:52:17 haiqingzheng
     * @history: 
     */
    public static void main(String[] args) {
        System.out
            .println(uploadPicture("data:image/png;base64,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"));
    }

    /**
     * 文件上传
     * @param filePath 文件本地路径
     * @return 
     * @create: 2016年1月25日 下午4:00:59 haiqingzheng
     * @history:
     */
    public static String uploadFile(String filePath) {

        String path = null;

        String urlPrefix = ConfigProperties.Config.URL_PREFIX;
        String host = ConfigProperties.Config.HOST;
        int port = Integer.valueOf(ConfigProperties.Config.PORT);
        String username = ConfigProperties.Config.USERNAME;
        String password = ConfigProperties.Config.PASSWORD;
        String filePreDir = ConfigProperties.Config.PRE_DIR;

        ChannelSftp sftp = null;
        Channel channel = null;
        Session sshSession = null;

        try {
            // SFTP远程连接服务器
            JSch jsch = new JSch();
            jsch.getSession(username, host, port);
            sshSession = jsch.getSession(username, host, port);
            sshSession.setPassword(password);
            Properties sshConfig = new Properties();
            sshConfig.put("StrictHostKeyChecking", "no");
            sshSession.setConfig(sshConfig);
            sshSession.connect();
            channel = sshSession.openChannel("sftp");
            channel.connect();
            sftp = (ChannelSftp) channel;

            BufferedInputStream fis = new BufferedInputStream(
                new FileInputStream(filePath));

            // 创建时间目录和随机文件名
            SimpleDateFormat dateformat = new SimpleDateFormat("yyyyMMddHH");
            String date = dateformat.format(new Date());
            String dir = filePreDir + date;

            // 通过文件路径解析文件名
            String fileName = "";
            int index = filePath.lastIndexOf("/");
            if (index != -1 && index > 0) {
                fileName = filePath.substring(index + 1, filePath.length());
            } else {
                throw new BizException("XN000000", "文件路径格式不正确");
            }

            String dstString = dir + "/" + fileName;

            // 判断目录是否存在，不存在则创建新目录
            try {
                sftp.ls(dir);
            } catch (SftpException e) {
                sftp.mkdir(dir);
            }
            sftp.put(fis, dstString);
            path = urlPrefix + date + "/" + fileName;

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            closeChannel(sftp);
            closeChannel(channel);
            closeSession(sshSession);
        }

        return path;
    }

    /**
     * 图片上传
     * @param base64String
     * @return 
     * @create: 2016年1月25日 下午4:00:52 haiqingzheng
     * @history:
     */
    public static String uploadPicture(String base64String) {
        // 参数检测
        Pattern pattern = Pattern.compile("data:image/(.+?);base64");
        Matcher matcher = pattern.matcher(base64String);
        if (!matcher.find()) {
            System.out.println("请传入正确的base64编码格式的图片");
            return null;
        }
        // 取得图片后缀名
        String suffix = matcher.group(1);

        String path = null;

        String urlPrefix = ConfigProperties.Config.URL_PREFIX;
        String host = ConfigProperties.Config.HOST;
        int port = Integer.valueOf(ConfigProperties.Config.PORT);
        String username = ConfigProperties.Config.USERNAME;
        String password = ConfigProperties.Config.PASSWORD;
        String filePreDir = ConfigProperties.Config.PRE_DIR;

        ChannelSftp sftp = null;
        Channel channel = null;
        Session sshSession = null;

        try {
            // SFTP远程连接图片服务器
            JSch jsch = new JSch();
            jsch.getSession(username, host, port);
            sshSession = jsch.getSession(username, host, port);
            sshSession.setPassword(password);
            Properties sshConfig = new Properties();
            sshConfig.put("StrictHostKeyChecking", "no");
            sshSession.setConfig(sshConfig);
            sshSession.connect();
            channel = sshSession.openChannel("sftp");
            channel.connect();
            sftp = (ChannelSftp) channel;

            // 将base64编码的图片转化成二进制流
            String header = "data:image/" + suffix + ";base64,";
            base64String = base64String.substring(header.length());
            byte[] decoderBytes = Base64.decodeBase64(base64String);
            ByteArrayInputStream fis = new ByteArrayInputStream(decoderBytes);

            // 创建时间目录和随机文件名
            SimpleDateFormat dateformat = new SimpleDateFormat("yyyyMMddHH");
            String date = dateformat.format(new Date());
            String dir = filePreDir + date;
            String picName = generate()
                    + "."
                    + ("jpeg".equalsIgnoreCase(suffix) ? "jpg" : suffix
                        .toLowerCase());
            String dstString = dir + "/" + picName;

            // 判断目录是否存在，不存在则创建新目录
            try {
                sftp.ls(dir);
            } catch (SftpException e) {
                sftp.mkdir(dir);
            }
            sftp.put(fis, dstString);
            path = urlPrefix + date + "/" + picName;

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            closeChannel(sftp);
            closeChannel(channel);
            closeSession(sshSession);
        }

        return path;
    }

    private static void closeChannel(Channel channel) {
        if (channel != null) {
            if (channel.isConnected()) {
                channel.disconnect();
            }
        }
    }

    private static void closeSession(Session session) {
        if (session != null) {
            if (session.isConnected()) {
                session.disconnect();
            }
        }
    }

    /**
     * 根据当前时间生成一个随机数
     * @return 
     * @create: 2015年10月22日 上午10:57:25 haiqingzheng
     * @history:
     */
    public static String generate() {
        int random = Math.abs(new Random().nextInt()) % 100000000;
        String today = dateToStr(new Date(), "yyyyMMDDhhmmss")
                + String.valueOf(random);
        return today;
    }

    /** 
     * Date按格式pattern转String
     * @param date
     * @param pattern
     * @return 
     * @create: 2015-4-18 下午11:02:34 miyb
     * @history: 
     */
    public static String dateToStr(Date date, String pattern) {
        String str = null;
        SimpleDateFormat formater = new SimpleDateFormat(pattern);
        try {
            str = formater.format(date);
        } catch (Exception e) {
        }
        return str;
    }
}
