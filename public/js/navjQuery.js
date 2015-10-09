//This is currently commented out of index.html. It is supposed to make the hourly table become fixed when it reaches the top of the page. There are currently problems with .offset() because it doesn't like the fact that I'm manipulating an object that doesn't exist on page load.

$( document ).ready(function(){
    var fixedTable = $("#fixed-table");
    var navHomeY = fixedTable.offset().top;
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