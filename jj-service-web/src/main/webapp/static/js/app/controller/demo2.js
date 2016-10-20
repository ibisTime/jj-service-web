define([
    'app/ui/slidebar'
], function(SlideBar) {
    var slideBar1 = new SlideBar({
        items: [3, 5, 10, 20, 30, 40]
    }, 'selectday1');

    var slideBar2 = new SlideBar({
        items: ['是', '否', '选项五个字']
    }, 'selectday2');
});