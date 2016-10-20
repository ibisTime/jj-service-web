/**
 * @Title FileUploadUtil.java 
 * @Package com.xnjr.app.util 
 * @Description 
 * @author xieyj  
 * @date 2016年3月10日 下午5:58:41 
 * @version V1.0   
 */
package com.xnjr.home.front.util;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.multipart.MultipartFile;

/** 
 * @author: xieyj 
 * @since: 2016年3月10日 下午5:58:41 
 * @history:
 */
public class FileUploadUtil {

    public void handleFile(MultipartFile file, HttpServletRequest request,
            HttpServletResponse response) throws IOException {
        String fileUrl = null;
        response.setContentType("text/plain; charset=UTF-8");
        PrintWriter out = response.getWriter();
        if (file.isEmpty()) {
            out.print("{\"status\":\"0\",\"msg\":\"请选择文件\"}");
            out.flush();
            return;
        }
        // 文件保存路径
        String filePath = request.getSession().getServletContext()
            .getRealPath("/")
                + "upload/"
                + String.valueOf((Math.random() + 1) * 1000000).substring(1, 7)
                + file.getOriginalFilename();
        // 转存文件
        try {
            file.transferTo(new File(filePath));
            fileUrl = UploadUtil.uploadFile(filePath);
            deleteFile(filePath);
        } catch (IOException e) {
            out.print("{\"status\":\"0\",\"msg\":\"文件上传失败\"}");
            out.flush();
            return;
        }
        out.print("{\"status\":\"1\",\"url\":\"" + fileUrl + "\"}");
        out.flush();
    }

    /**
     * 删除单个文件
     * @param   path 被删除文件的文件名
     * @return 单个文件删除成功返回true，否则返回false
     */
    public boolean deleteFile(String path) {
        boolean flag = false;
        File file = new File(path);
        // 路径为文件且不为空则进行删除
        if (file.isFile() && file.exists()) {
            file.delete();
            flag = true;
        }
        return flag;
    }

}
