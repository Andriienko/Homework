/*
//--------------API-------------------------

function API() {
    this.data = null;

    this.getAll = function () {
        $.ajax({
            url: 'Home/GetAll',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                //var data = response;
                this.data = response;
                // console.log(response);
                // console.log(this.data);
                $('#txthere').empty();
                $.each(this.data,
                (function (index, value) {
                    $('#txthere').append("<p id='" + value.MessageId + "'>" + value.Content + "</p>");
                }));
            }
        });
    }

    this.create = function (item) {
    var data = {
        Content: item
    };
    $.ajax({
        url: 'Home/Create',
        type: 'POST',
        data: { ob: data },
        success: function (response) {
            this.getAll;
        }
    });
    }
    
    this.remove = function (selectedNode) {
    var data = $(selectedNode).attr('id');
    //var nex = $('#' + data).next().attr('id');
    //var n = $('#' + nex);
    $.ajax({
        url: 'Home/Delete',
        type: 'POST',
        data: { id: data },
        success: function (response) {
            // console.log(response);
            $('#txthere').empty();
            this.getAll();
            //console.log(selectedNode);
            //console.log(n);
            //highlight(n);

            //console.log(selectedNode);
            //// $('#hl').addClass('highlight');
            //$('#txt').val($(selectedNode).text());
        }
    });
    };
    this.update = function (selectedNode) {
    var data = {
        MessageId: $(selectedNode).attr('id'),
        Content: $('#txt').val()
    };
    $.ajax({
        url: 'Home/Edit',
        type: 'POST',
        data: { ob: data },
        success: function (response) {
            console.log(response);
            this.getAll();
        }
    });
    };
};
// ---------------UI-----------------------------------
function UI() {
    this.selectedNode=null;
    this.nextNode=null;
    this.api = new API();
};

//UI.prototype.api = this.api;
UI.prototype.highlight = function (node) {
    if (this.selectedNode)
        $(this.selectedNode).removeClass('highlight');
    this.selectedNode = node;
    this.nextNode = $(this.selectedNode).next();
    $(this.selectedNode).addClass('highlight');
};
UI.prototype.handler = function (event) {
    var target = event.target;
    $('#txt').val($(target).text());
    UI.highlight(target);
};
UI.prototype.addHandler = function () {
    var content = $('#txt').val();
    var api = new API();
    api.create(content);
    // this.rendering();
    $('#txt').val("");
};
UI.prototype.saveHandler = function () {
    this.api.update(this.selectedNode);
    // this.rendering();
    $('#txt').val("");
};
UI.prototype.upHandler = function () {
    var previous = $(this.selectedNode).prev();
    this.highlight(previous);
    $('#txt').val($(this.selectedNode).text());
};
UI.prototype.downHandler = function () {
    var next = $(this.selectedNode).next();
    this.highlight(next);
    $('#txt').val($(this.selectedNode).text());
};
UI.prototype.deleteHandler = function () {
    var data = $(this.selectedNode).attr('id');
    var nex = $('#' + data).next().attr('id');
    var n = $('#' + nex);
    this.api.remove(this.selectedNode);
    // this.rendering();
    this.highlight(n);
    $('#txt').val($(selectedNode).text());
};
UI.prototype.rendering = function () {
    $('#txthere').empty();
    console.log(this.api.data);
    $.each(this.api.data,
    (function (index, value) {
        $('#txthere').append("<p id='" + value.MessageId + "'>" + value.Content + "</p>");
    }));
};
*/
$(document).ready(function () {
/*
   
    //--------------------------------------------------
    //Events
    //var api = new API();
    //api.getAll();
   // console.log(api.data);
    var ui = new UI();
    ui.api.getAll();
   // ui.api.create($('#txthere').val());
   // console.log(ui.api.data);
   // ui.rendering();
    $('#submit').on('click', ui.addHandler);
    $('#delete').on('click', ui.deleteHandler);
    $('#save').on('click', ui.saveHandler);
    $('#up').on('click', ui.upHandler);
    $('#down').on('click', ui.downHandler);
    $('#txthere').on('click', ui.handler);
    //--------------------------------------------------
*/
    getAll();
    var selectedNode;
    var nextNode;
    
   // Click event on button Add
    $('#submit').on('click', function () {
        create();
        $('#txt').val("");
    });

   $('#high').on('click', function() {
        var id = $(selectedNode).attr('id');
        console.log(id);
        $('#' + id).addClass('highlight');
    });

    // Click event on delete button
    $('#delete').on('click', function () {
       remove();
      });

    // Click event on Save button
    $('#save').on('click', function () {
        update();
        $('#txt').val("");
    });

    // Click event on Up button
    $('#up').on('click', function () {
        var previous = $(selectedNode).prev();
        if (previous.length == 0)
            return;
        highlight(previous);
        $('#txt').val($(selectedNode).text());
    });

    // Click event on Down button
    $('#down').on('click', function () {
        var next = $(selectedNode).next();
        if (next.length == 0)
            return;
        highlight(next);
        $('#txt').val($(selectedNode).text());
    });

    // Creation item in Database
    function create() {
        var data = {
            Content: $('#txt').val()
        };
        $.ajax({
            url: 'Home/Create',
            type: 'POST',
            data: { ob: data },
            success: function (response) {
                getAll();
            }
        });
    };

    // Get all items from Database
    function getAll() {
        $.ajax({
            url: 'Home/GetAll',
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                var data = response;
               $('#txthere').empty();
                $.each(data,
                (function(index, value) {
                    $('#txthere').append("<li id='" + value.MessageId + "'>" + value.Content + "</li>");
                }));
            }
        });
    };

    // Removing item from DB by id
    function remove() {
        var data = $(selectedNode).attr('id');
        var nex = $('#'+data).next().attr('id');
        var n = $('#' + nex);
        $.ajax({
            url: 'Home/Delete',
            type: 'POST',
            data: { id: data },
            success: function (response) {
               $('#txthere').empty();
                getAll();
                highlight(n);
                $('#txt').val($(selectedNode).text());
            }
        });
    };

    //
    function update() {
        var data = {
            MessageId: $(selectedNode).attr('id'),
            Content: $('#txt').val()
        };
        $.ajax({
            url: 'Home/Edit',
            type: 'POST',
            data: { ob: data },
            success: function (response) {
                console.log(response);
                getAll();
            }
        });
    };

    // Handler for click event on elements list
    function handler(event) {
        var target = event.target;
        $('#txt').val($(target).text());
        highlight(target);
    };

    // Highlighting selected item
    
    function highlight(node) {
        if (selectedNode)
            $(selectedNode).removeClass('highlight');
        selectedNode = node;
        nextNode = $(selectedNode).next();
        $(selectedNode).addClass('highlight');
    }


    $('#txthere').on('click', handler);
    
});