package com.xnjr.home.front.res;

import java.util.List;

/**
 * 
 * @author joe.chen
 * 
 */
public class Page<T> {

    // 当前页数
    private int pageNO;

    // 开始条数
    private int start;

    // 一页显示条数
    private int pageSize;

    // 总条数
    private long totalCount;

    // 总页数
    private long totalPage;

    // 返回列表
    private List<T> list;

    public int getPageNO() {
        return pageNO;
    }

    public void setPageNO(int pageNO) {
        this.pageNO = pageNO;
    }

    public int getStart() {
        return start;
    }

    public void setStart(int start) {
        this.start = start;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public long getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(long totalCount) {
        this.totalCount = totalCount;
    }

    public long getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(long totalPage) {
        this.totalPage = totalPage;
    }

    public List<T> getList() {
        return list;
    }

    public void setList(List<T> list) {
        this.list = list;
    }
}
