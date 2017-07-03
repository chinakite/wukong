var globalLibsTbl;
var customizeLibsTbl;

var LIBRARY_MGR = {
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
    initGlobalLibsTbl : function() {
        $.get(
            "/__man__/globallibs",
            {},
            function(data) {
                globalLibsTbl = $('#globalLibsTbl').dataTable({
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
                                return full.name;
                            }
                        },
                        {
                            "targets": 1,
                            "searchable": false,
                            "orderable": false,
                            "render": function ( data, type, full, meta ) {
                                var optHtml = '<a class="btn btn-xs btn-info" title="Edit" onclick="DATASET_MGR.viewData(\'' + full.name + '\')"><i class="fa fa-edit"></i></a>'
                                            + '<a class="btn btn-xs btn-danger" title="Remove" onclick="DATASET_MGR.removeData(\'' + full.name + '\')"><i class="fa fa-trash-o"></i></a>'
                                            ;
                                return optHtml;
                            }
                        }
                    ]
                });
            }
        )
    },
    initCustomizeLibsTbl : function() {
        $.get(
            "/__man__/mylibs",
            {},
            function(data) {
                customizeLibsTbl = $('#customizeLibsTbl').dataTable({
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
                                return full.name;
                            }
                        },
                        {
                            "targets": 1,
                            "searchable": false,
                            "orderable": false,
                            "render": function ( data, type, full, meta ) {
                                var optHtml = '<a class="btn btn-xs btn-info" title="Edit" onclick="DATASET_MGR.viewData(\'' + full.name + '\')"><i class="fa fa-edit"></i></a>'
                                            + '<a class="btn btn-xs btn-danger" title="Remove" onclick="DATASET_MGR.removeData(\'' + full.name + '\')"><i class="fa fa-trash-o"></i></a>'
                                            ;
                                return optHtml;
                            }
                        }
                    ]
                });
            }
        )
    },
    bindTabEvent : function() {
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var target = $(e.target).attr("href");
            if(target == '#tab_customize' && !customizeLibsTbl) {
                LIBRARY_MGR.initCustomizeLibsTbl();
            }
        });
    }
}

;(function(document, window){
    $(document).ready(function(){
        LIBRARY_MGR.initGlobalLibsTbl();
        LIBRARY_MGR.bindTabEvent();
    });
})(document, window);
