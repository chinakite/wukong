var datasetTbl;

var operDataKey;

var DATASET_MGR = {
    newDataInfo: function(){
        operDataKey = '';
        $('#dataKey').val('');
        $('#dataInfoModal').modal('show');
    },
    editDataInfo: function(dataKey){
        operDataKey = dataKey;
        $('#dataKey').val(dataKey);
        $('#dataInfoModal').modal('show');
    },
    viewData: function(dataKey){
        $('#dataKeyInput').val(dataKey);
        $('#dataKeyTitle').text(dataKey);
        dataKey = Base64.encode(dataKey);
        $.get(
            "/__man__/data/"+dataKey,
            {},
            function(data) {
                DATASET_MGR.initViewerState(data);
                $('#dataModal').modal('show');
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
    editOrCancelData: function(){
        var editing = $('#editDataBtn').data('editing');
        if(editing) {
            var data = $('#dataEditor').val();
            data = JSON.parse(data);
            DATASET_MGR.initViewerState(data);
        }else{
            var data = $('#currentData').data('curData');
            $('#dataViewer').hide();
            $('#dataEditor').val(JSON.stringify(data, null, 4)).show();
            $('#editDataBtn').data('editing', true).text('Cancel');
            $('#saveDataBtn').show();
        }
    },
    saveDataInfo : function() {
        var dataKey = $('#dataKey').val();
        if(operDataKey && operDataKey != '') {
            $.post(
                '/__man__/data',
                {
                    "oldDataKey": operDataKey,
                    "dataKey": dataKey
                },
                function(){

                }
            );
        }else{
            $.post(
                '/__man__/data',
                {
                    "dataKey": dataKey
                },
                function(){

                }
            );
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
                    text: 'Data is saved successfully.',
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
                                var optHtml = '<a class="btn btn-xs btn-info" title="Edit" onclick="DATASET_MGR.editDataInfo(\'' + full.dataKey + '\')"><i class="fa fa-edit"></i></a>'
                                            + '<a class="btn btn-xs btn-info" title="Data" onclick="DATASET_MGR.viewData(\'' + full.dataKey + '\')"><i class="fa fa-cube"></i></a>'
                                            + '<a class="btn btn-xs btn-danger" title="Remove" onclick="DATASET_MGR.removeData(\'' + full.dataKey + '\')"><i class="fa fa-trash-o"></i></a>'
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
