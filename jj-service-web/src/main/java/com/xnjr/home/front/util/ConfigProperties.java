package com.xnjr.home.front.util;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;

public class ConfigProperties {
    private static Properties props;

    static {
        props = new Properties();
        try {
            props.load(Thread.currentThread().getContextClassLoader()
                .getResourceAsStream("config.properties"));
        } catch (FileNotFoundException e) {
            throw new RuntimeException("找不到config.properties文件", e);
        } catch (IOException e) {
            throw new RuntimeException("读取config.properties文件出错", e);
        }
    }

    public static final class Config {

        public static String ACCOUNT_URL = props.getProperty("ACCOUNT_URL");

        public static String URL_PREFIX = props.getProperty("URL_PREFIX");

        public static String HOST = props.getProperty("HOST");

        public static String PORT = props.getProperty("PORT");

        public static String USERNAME = props.getProperty("USERNAME");

        public static String PASSWORD = props.getProperty("PASSWORD");

        public static String PRE_DIR = props.getProperty("PRE_DIR");

    }
}
