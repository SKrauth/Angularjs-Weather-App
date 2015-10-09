$( document ).ready(function(){
    var fixedTable = $("#fixed-table");
    var navHomeY = fixedTable.position();
    console.log(navHomeY);
    var isFixed = false;
    var $w = $(window);
    
    $w.scroll(function(){
        var scrollTop = $w.scrollTop();
        var shouldBeFixed = scrollTop > navHomeY;
        if (shouldBeFixed && !isFixed){
            fixedTable.css({
                position: "fixed",
                top: 0,
                left: fixedTable.offset().left,
                width: fixedTable.width()
            });
            isFixed = true;
        }
        else if (!shouldBeFixed && isFixed){
            fixedTable.css({
                position: "static"
            });
            isFixed = false;
        }
    });

});