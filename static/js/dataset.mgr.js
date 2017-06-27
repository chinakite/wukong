var datasetTbl;

var DATASET_MGR = {
    viewData: function(dataKey){
        $('#dataKeyInput').val(dataKey);
        $('#dataKeyTitle').text(dataKey);
        dataKey = Base64.encode(dataKey);
        $.get(
            "/__man__/data/"+dataKey,
            {},
            function(data) {
                $('#currentData').data('curData', data);
                $('#dataViewer').empty().jsonView(JSON.stringify(data));
                $('#dataModal').modal('show');
            }
        );
    },
    editOrCancelData: function(){
        var editing = $('#editDataBtn').data('editing');
        if(editing) {
            var data = $('#dataEditor').val();
            $('#currentData').data('curData', JSON.parse(data));
            $('#dataEditor').hide();
            $('#dataViewer').empty().jsonView(data).show();
            $('#editDataBtn').data('editing', false).text('Edit');
            $('#saveDataBtn').hide();
        }else{
            var data = $('#currentData').data('curData');
            $('#dataViewer').hide();
            $('#dataEditor').val(JSON.stringify(data, null, 4)).show();
            $('#editDataBtn').data('editing', true).text('Cancel');
            $('#saveDataBtn').show();
        }
    },
    saveData : function() {
        var data = $('#dataEditor').val();
        data = JSON.parse(data);
        var dataKey = $('#dataKeyInput').val();
        dataKey = Base64.encode(dataKey);
        $.post(
            "/__man__/data/" + dataKey,
            data,
            function(data) {
                new PNotify({
                    title: 'Success',
                    text: 'Mapping info is saved successfully.',
                    type: 'success',
                    styling: 'bootstrap3',
                    delay: 1500,
                    stack: {"dir1": "down", "dir2": "left", "push": "bottom", "spacing1": 25, "spacing2": 25, "context": $("body"), "modal": false}
                });
                $('#dataModal').modal('hide');
                datasetTbl.api().clear().draw();
                DATASET_MGR.initDataSetTbl();
            }
        );
    },
    initDataSetTbl : function() {
        $.get(
            "/__man__/dataset",
            {},
            function(data) {
                datasetTbl = $('#datasetTbl').dataTable({
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
                                var optHtml = '<a class="btn btn-xs btn-info" title="Edit" onclick="DATASET_MGR.viewData(\'' + full.dataKey + '\')"><i class="fa fa-edit"></i></a>'
                                            + '<a class="btn btn-xs btn-danger" title="Mock" onclick="DATASET_MGR.removeData(\'' + full.dataKey + '\')"><i class="fa fa-trash-o"></i></a>'
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
        DATASET_MGR.initDataSetTbl();
    });
})(document, window);
