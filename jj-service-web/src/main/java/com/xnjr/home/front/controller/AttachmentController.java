package com.xnjr.home.front.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.xnjr.home.front.exception.BizException;
import com.xnjr.home.front.util.FileUploadUtil;

@Controller
public class AttachmentController {

    @RequestMapping(value = "/upload/file", method = RequestMethod.POST)
    public void uploadFile(@RequestParam("file") MultipartFile file,
            HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        if (file.isEmpty()) {
            throw new BizException("A010001", "文件不能为空");
        } else if (!file.getContentType().equals("application/pdf")) {
            throw new BizException("A010001", "文件格式错误");
        } else if (file.getSize() > 10 * 1024 * 1024) {
            throw new BizException("A010001", "文件过大");
        } else {
            FileUploadUtil uploadUtil = new FileUploadUtil();
            uploadUtil.handleFile(file, request, response);
        }
    }
}
