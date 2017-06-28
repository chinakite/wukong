var DASHBOARD = {
    countMappings : function() {
        $.get(
            '/__man__/mappings/count',
            {},
            function(data) {
                $('#mappingsCount').text(data);
            }
        );
    },
    countDatas : function() {
        $.get(
            '/__man__/dataset/count',
            {},
            function(data) {
                $('#datasetCount').text(data);
            }
        );
    },
    countTemplates : function() {
        $.get(
            '/__man__/templates/count',
            {},
            function(data) {
                $('#templatesCount').text(data);
            }
        );
    }
};

;(function(document, window){
    $(document).ready(function(){
        DASHBOARD.countMappings();
        DASHBOARD.countDatas();
        DASHBOARD.countTemplates();
    });
})(document, window);
