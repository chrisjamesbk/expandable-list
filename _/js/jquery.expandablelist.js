(function($) {
    
    /*
        // required html structure
        <div class="list-container">
            <ul>
                <li>List Item 1</li>
                <li>List Item 2</li>
                <li>List Item 3</li>
                ...
                <li>List Item n</li>
            </ul>
            // the plugin inserts <div class="expand-list"> here
        </div>
        
        // use the plugin on the parent div, e.g.
        $('div.list-container').expandableList( opts );
    */

    var defaults = {
        showItems: 10,
        showMoreItems: 10,
        expandText: 'More'
    };

    $.fn.expandableList = function(opts) {

        var opts = $.extend( {}, defaults, opts );

        this.each(function() {
            var $this = $(this);

            var $ul = $this.find('ul');
            var $li = $this.find('ul li');
            var listCount = $li.length;

            if (listCount > opts.showItems) {
                // hide items on load
                $li.filter(':gt(' + (opts.showItems-1) + ')').hide();
                // append 'Expand List' button after list
                $ul.after('<div class="expand-list"><a href="#">' + opts.expandText + '</a></div>');
                // click event
                $this.on('click', '.expand-list > a', function(e){
                    e.preventDefault();
                    // show next showMoreItems hidden items
                    $li.filter(':hidden:lt(' + opts.showMoreItems + ')').show();
                    // if no more hidden items, remove .expand-list
                    if ($li.filter(':hidden').length < 1) {
                        $this.find('.expand-list').remove();
                    }
                });
            }            
        });

    }

})(jQuery);