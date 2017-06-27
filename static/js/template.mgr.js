var templateTbl;

var TEMPLATE_MGR = {
    viewTemplate: function(dataKey){
        $('#dataKeyInput').val(dataKey);
        $('#dataKeyTitle').text(dataKey);
        dataKey = Base64.encode(dataKey);
        $.get(
            "/__man__/template/"+dataKey,
            {},
            function(data) {
                TEMPLATE_MGR.initViewerState(data);
                $('#templateModal').modal('show');
            }
        );
    },
    initViewerState: function(data) {
        $('#editDataBtn').data('editing', false).text('Edit');
        $('#currentData').data('curData', data);
        $('#dataViewer').empty().jsonView(JSON.stringify(data)).show();
        $('#dataEditor').hide();
        $('#saveDataBtn').hide();
    },
    editOrCancelTemplate: function(){
        var editing = $('#editDataBtn').data('editing');
        if(editing) {
            var data = $('#dataEditor').val();
            data = JSON.parse(data);
            TEMPLATE_MGR.initViewerState(data);
        }else{
            var data = $('#currentData').data('curData');
            $('#dataViewer').hide();
            $('#dataEditor').val(JSON.stringify(data, null, 4)).show();
            $('#editDataBtn').data('editing', true).text('Cancel');
            $('#saveDataBtn').show();
        }
    },
    saveTemplate : function() {
        var data = $('#dataEditor').val();
        data = JSON.parse(data);
        var dataKey = $('#dataKeyInput').val();
        dataKey = Base64.encode(dataKey);
        $.post(
            "/__man__/template/" + dataKey,
            data,
            function(data) {
                new PNotify({
                    title: 'Success',
                    text: 'Template is saved successfully.',
                    type: 'success',
                    styling: 'bootstrap3',
                    delay: 1500,
                    stack: {"dir1": "down", "dir2": "left", "push": "bottom", "spacing1": 25, "spacing2": 25, "context": $("body"), "modal": false}
                });
                $('#templateModal').modal('hide');
                templateTbl.api().clear().draw();
                TEMPLATE_MGR.initTemplateTbl();
            }
        );
    },
    initTemplateTbl : function() {
        $.get(
            "/__man__/templates",
            {},
            function(data) {
                templateTbl = $('#templateTbl').dataTable({
                    data : data,
                    paging : true,
                    destroy : true,
                    select: {
                        style:    'os',
                        selector: 'td:first-child'
                    },
                    columnDefs : [
                        {
                            "targets": 0,
                            "render": function ( data, type, full, meta ) {
                                return full.dataKey;
                            }
                        },
                        {
                            "targets": 1,
                            "searchable": false,
                            "orderable": false,
                            "render": function ( data, type, full, meta ) {
                                var optHtml = '<a class="btn btn-xs btn-info" title="Edit" onclick="TEMPLATE_MGR.viewTemplate(\'' + full.dataKey + '\')"><i class="fa fa-edit"></i></a>'
                                            + '<a class="btn btn-xs btn-danger" title="Remove" onclick="TEMPLATE_MGR.removetemplate(\'' + full.dataKey + '\')"><i class="fa fa-trash-o"></i></a>'
                                            ;
                                return optHtml;
                            }
                        }
                    ]
                });
            }
        )
    }
}

;(function(document, window){
    $(document).ready(function(){
        TEMPLATE_MGR.initTemplateTbl();
    });
})(document, window);
