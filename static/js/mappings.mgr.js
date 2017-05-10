var MAPPING_MGR = {
    editMapping : function(url, method) {
        var key = url + " " + method;
        key = Base64.encode(key);
        $.get(
            "/__man__/mapping/"+key,
            {},
            function(data) {
                $('#inputUrl').val(url);
                $('#inputMethod').val(method);
                $('#inputType').val(data.type);
                $('#inputDataKey').val(data.dataKey);
                $('#inputCount').val(data.count);
                $('#mappingInfoModal').modal('show');
            }
        );
    },
    saveMapping : function() {
        var url = $('#inputUrl').val();
        var method = $('#inputMethod').val();

        var key = url + " " + method;
        key = Base64.encode(key);
        $.post(
            "/__man__/mapping/"+key,
            {
                type : $('#inputType').val(),
                dataKey : $('#inputDataKey').val(),
                count : $('#inputCount').val()
            },
            function(data) {
                new PNotify({
                    title: 'Success',
                    text: 'Mapping info is saved successfully.',
                    type: 'success',
                    styling: 'bootstrap3',
                    delay: 1500,
                    stack: {"dir1": "down", "dir2": "left", "push": "bottom", "spacing1": 25, "spacing2": 25, "context": $("body"), "modal": false}
                });
                $('#mappingInfoModal').modal('hide');
                $('#mappingTbl').dataTable().destory();
                initMappingTbl();
            }
        );
    }
};

function initMappingTbl() {
    $.get(
        "/__man__/mappings",
        {},
        function(data) {
            var html = nunjucks.render('../static/nm/mapping/mapping-row.nm', {"mappings": data});
            $('#mappingTbl tbody').html(html);
            $('#mappingTbl').dataTable({
                paging : true,
                columnDefs : [ {
                    "targets": 5,
                    "searchable": false,
                    "orderable": false
                } ]
            });
            console.log("after datatables");
        }
    )
}

;(function(document, window){
    $(document).ready(function(){
        initMappingTbl();
    });
})(document, window);
