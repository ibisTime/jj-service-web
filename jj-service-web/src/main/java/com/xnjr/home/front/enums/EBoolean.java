package com.xnjr.home.front.enums;

public enum EBoolean {
    YES("1", "是"), NO("0", "否");

    EBoolean(String code, String value) {
        this.code = code;
        this.value = value;
    }

    private String code;

    private String value;

    public String getCode() {
        return code;
    }

    public String getValue() {
        return value;
    }
}
