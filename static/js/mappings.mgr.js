var mappingTbl;

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
                mappingTbl.api().clear().draw();
                initMappingTbl();
            }
        );
    },
    mock : function(url, method) {
        var key = url + " " + method;
        key = Base64.encode(key);
        $.get(
            "/__man__/mapping/"+key,
            {},
            function(data) {
                if(data.type == 'swagger') {
                    var params = data.parameters;
                    if(params) {
                        var paramHtml = nunjucks.render("../static/partial/mapping/request.parameter.vm", {params: params});
                        $('#paramsTbl tbody').html(paramHtml);
                    }else{
                        $('#paramsTbl tbody').empty();
                    }
                }else{
                    $('#paramsTbl tbody').empty();
                }

                $('#mockUrl').val(url);
                $('#mockMethod').val(method);
                $('#requestTitle').html('<div class="label label-success">' + method + '</div><span id="requestTitleUrl">'+ url +'</span>');
                $('#requestModal').modal('show');
            }
        );
    },
    mockData : function() {
        var url = $.trim($('#mockUrl').val());
        var method = $.trim($('#mockMethod').val());

        if(method == 'POST') {
            $.post(
                url,
                {},
                function(data) {
                    $('#responseContent').html(jsonHighlight(JSON.stringify(data, null, 2)));
                    $('.nav-tabs #response-tab').tab('show');
                }
            );
        }else if(method == 'GET'){
            $.get(
                url,
                {},
                function(data) {
                    $('#responseContent').html(jsonHighlight(JSON.stringify(data, null, 2)));
                    $('.nav-tabs #response-tab').tab('show');
                }
            );
        }
    }
};

function initMappingTbl() {
    $.get(
        "/__man__/mappings",
        {},
        function(data) {
            mappingTbl = $('#mappingTbl').dataTable({
                data : data,
                paging : true,
                destroy : true,
                columnDefs : [
                    {
                        "targets": 0,
                        "render": function ( data, type, full, meta ) {
                            return full.url;
                        }
                    },
                    {
                        "targets": 1,
                        "render": function ( data, type, full, meta ) {
                            return full.method;
                        }
                    },
                    {
                        "targets": 2,
                        "render": function ( data, type, full, meta ) {
                            return full.type;
                        }
                    },
                    {
                        "targets": 3,
                        "render": function ( data, type, full, meta ) {
                            return full.dataKey;
                        }
                    },
                    {
                        "targets": 4,
                        "render": function ( data, type, full, meta ) {
                            return full.count;
                        }
                    },
                    {
                        "targets": 5,
                        "searchable": false,
                        "orderable": false,
                        "render": function ( data, type, full, meta ) {
                            var optHtml = '<a class="btn btn-xs btn-info" title="Edit" onclick="MAPPING_MGR.editMapping(\'' + full.url + '\', \'' + full.method + '\')"><i class="fa fa-edit"></i></a>'
                                        + '<a class="btn btn-xs btn-warning" title="Mock" onclick="MAPPING_MGR.mock(\'' + full.url + '\', \'' + full.method + '\')"><i class="fa fa-eye-slash"></i></a>'
                                        ;
                            return optHtml;
                        }
                    }
                ]
            });
        }
    )
}

function initMockParamTbl(){
    $('#paramsTbl').DataTable( {
        "dom": '<"tbl-toolbar-right">rtip'
    });

    $("div.tbl-toolbar-right").html('<b>Custom tool bar! Text/images etc.</b>');
}

;(function(document, window){
    $(document).ready(function(){
        initMappingTbl();

        initMockParamTbl();
    });
})(document, window);
