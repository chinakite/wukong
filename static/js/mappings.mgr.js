var mappingTbl;
var editor;

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
                        for(let i=0; i<params.length; i++) {
                            params[i]['___type___'] = 'swagger';
                        }
                        var paramHtml = nunjucks.render("../static/partial/mapping/request.keyvalue.vm", {params: params, withType: true});
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

        var reqParam = buildReqParameters();
        var headers = buildReqHeaders();

        if(method == 'POST') {
            $.ajax({
                type: "POST",
                url: url,
                data: reqParam,
                headers: headers,
                success: function(data) {
                    $('#responseContent').html(jsonHighlight(JSON.stringify(data, null, 2)));
                    $('.nav-tabs #response-tab').tab('show');
                }
            });
        }else if(method == 'GET'){
            $.ajax({
                type: "GET",
                url: url,
                data: reqParam,
                headers: headers,
                success: function(data) {
                    $('#responseContent').html(jsonHighlight(JSON.stringify(data, null, 2)));
                    $('.nav-tabs #response-tab').tab('show');
                }
            });
        }
    },
    editCookie : function() {
        $('#cookiesModal').modal('show');
        $.get(
            "/__man__/cookies",
            {},
            function(data) {
                if(data && data.length > 0) {
                    console.log(data);
                    var emptyRowHtml = nunjucks.render("../static/partial/mapping/cookies.keyvalue.vm", {params: data, withType: false});
                    $('#cookieTbl tbody').empty().append(emptyRowHtml);
                }else{
                    var emptyRowHtml = nunjucks.render("../static/partial/mapping/empty.request.keyvalue.vm", {withType: false});
                    $('#cookieTbl tbody').empty().append(emptyRowHtml);
                }
                $('#cookiesModal').modal('show');
            }
        );
    },
    saveCookie : function() {
        var cookies = buildCookies();
        $.post(
            "/__man__/cookies",
            cookies,
            function(data) {
                alert('保存Cookie成功');
                $('#cookiesModal').modal('hide');
            }
        );
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
                select: {
                    style:    'os',
                    selector: 'td:first-child'
                },
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
};

function initMockParamTbl(){
    $('#paramsTbl').DataTable( {
        "dom": '<"tbl-toolbar-right">rt',
        "ordering": false
    });
};

function initHeaderTbl(){
    var emptyRowHtml = nunjucks.render("../static/partial/mapping/empty.request.keyvalue.vm", {withType: false});
    $('#headerTbl tbody').append(emptyRowHtml);

    $('#headerTbl').DataTable( {
        "dom": '<"tbl-toolbar-right">rt',
        "ordering": false
    });
};

function initCookieTbl(){
    $('#cookieTbl').DataTable( {
        "dom": '<"tbl-toolbar-right">rt',
        "ordering": false
    });
};

function addEmptyRow(btnObj, withType) {
    var curRow = $(btnObj).parentsUntil('tbody', "tr");
    var emptyRowHtml = nunjucks.render("../static/partial/mapping/empty.request.keyvalue.vm", {"withType": withType});
    curRow.after(emptyRowHtml);
};

function removeCurRow(btnObj) {
    var curRow = $(btnObj).parentsUntil('tbody', "tr");
    curRow.remove();
};

function toggleBodyContent(event) {
    var radioBtn = $(event.target);
    var radioValue = radioBtn.val();

    if(radioValue == 0) {
        $('#xwwwBody').show();
        $('#rawType').hide();
        $('#xwwwBody').siblings().hide();
    }else if(radioValue == 1) {
        $('#formDataBody').show();
        $('#rawType').hide();
        $('#formDataBody').siblings().hide();
    }else if(radioValue == 2) {
        $('#rawBody').show();
        $('#rawType').show();
        $('#rawBody').siblings().hide();
    }else if(radioValue == 3) {
        $('#binaryBody').show();
        $('#rawType').hide();
        $('#binaryBody').siblings().hide();
    }
};

function buildReqParameters() {
    var reqParamEles = $('#paramsTbl input[rel=reqParam]');
    var reqParam = {};
    if(reqParamEles.length > 0) {
        for(var i=0; i<reqParamEles.length; i++) {
            var reqParamEle = $(reqParamEles[i]);
            var eleId = reqParamEle.attr('id');
            var paramName;
            if(eleId) {
                paramName = eleId.substring(2, eleId.length);
            }else{
                paramName = reqParamEle.parentsUntil('tr').prev().find('input[rel=reqParamKey]').val();;
            }
            var paramValue = reqParamEle.val();
            if(paramName) {
                reqParam[paramName] = paramValue;
            }
        }
    }
    return reqParam;
}

function buildReqHeaders() {
    var reqParamEles = $('#headerTbl input[rel=reqParam]');
    var reqHeader = {};
    if(reqParamEles.length > 0) {
        for(var i=0; i<reqParamEles.length; i++) {
            var reqParamEle = $(reqParamEles[i]);
            var eleId = reqParamEle.attr('id');
            var paramName;
            if(eleId) {
                paramName = eleId.substring(2, eleId.length);
            }else{
                paramName = reqParamEle.parentsUntil('tr').prev().find('input[rel=reqParamKey]').val();;
            }
            var paramValue = reqParamEle.val();
            if(paramName) {
                reqHeader[paramName] = paramValue;
            }
        }
    }
    return reqHeader;
}

function buildCookies() {
    var reqParamEles = $('#cookieTbl input[rel=reqParam]');
    var cookies = {};
    if(reqParamEles.length > 0) {
        for(var i=0; i<reqParamEles.length; i++) {
            var reqParamEle = $(reqParamEles[i]);
            var paramName = reqParamEle.parentsUntil('tr').prev().find('input[rel=reqParamKey]').val();
            var paramValue = reqParamEle.val();
            if(paramName) {
                cookies[paramName] = paramValue;
            }
        }
    }
    return cookies;
}

;(function(document, window){
    $(document).ready(function(){
        initMappingTbl();

        initMockParamTbl();
        initHeaderTbl();
        initCookieTbl();

        $("input[name=postType]").on("ifChecked", toggleBodyContent);
    });
})(document, window);
