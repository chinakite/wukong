var globalLibsTbl;
var customizeLibsTbl;

var LIBRARY_MGR = {
    viewGlobalLib: function(name){
        $('#libFileTitle').text(name);
        name = Base64.encode(name);
        $.get(
            "/__man__/globallib/"+name,
            {},
            function(data) {
                var arr = data.split("\n");
                var str = '';
                for(var i=0; i<arr.length; i++) {
                    str = str + "<span>" + arr[i] + "</span>";
                }
                $('#dataViewer pre').html(str);
                $('#libFileModal').modal('show');
            }
        );
    },
    viewCustomizeLib: function(name) {
        $('#libFileTitle').text(name);
        name = Base64.encode(name);
        $.get(
            "/__man__/mylib/"+name,
            {},
            function(data) {
                var arr = data.split("\n");
                var str = '';
                for(var i=0; i<arr.length; i++) {
                    str = str + "<span>" + arr[i] + "</span>";
                }
                $('#dataViewer pre').html(str);
                $('#libFileModal').modal('show');
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
                                var optHtml = '<a class="btn btn-xs btn-info" title="Edit" onclick="LIBRARY_MGR.viewGlobalLib(\'' + full.name + '\')"><i class="fa fa-edit"></i></a>'
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
                                var optHtml = '<a class="btn btn-xs btn-info" title="Edit" onclick="LIBRARY_MGR.viewCustomizeLib(\'' + full.name + '\')"><i class="fa fa-edit"></i></a>'
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
