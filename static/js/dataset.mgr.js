var DATASET_MGR = {
    viewData: function(dataKey){
        dataKey = Base64.encode(dataKey);
        $.get(
            "/__man__/data/"+dataKey,
            {},
            function(data) {
                $('#dataViewer').empty().jsonView(JSON.stringify(data));
                $('#dataModal').modal('show');
            }
        );
    },

    initDataSetTbl : function() {
        $.get(
            "/__man__/dataset",
            {},
            function(data) {
                mappingTbl = $('#datasetTbl').dataTable({
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
