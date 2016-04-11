$.widget( "mptt.mpttAjax", {
    options: {
        restUrl: "/checklist/checklist_list/",
    },
    createItemOnServer: function(contentElem) {
        var parentPk = $(contentElem.parents("ul")[0]).attr("pk");
        var text = contentElem.text();
        var thisWidget = this;
        var liElem = this.getLi(contentElem);
        if(text==""){
            liElem.remove();
            return;
        }
        var itemOrder = this.getLi(contentElem).attr("item-order");
        if(parentPk=="-1"){
            parentPk=null;
        }
        $.post(this.options.restUrl, {parent:parentPk, content:text, item_order: itemOrder}, function(result){
            liElem.attr("pk", result.id)});
    },

    ajaxReq: function(type, pk, data){
        $.ajax({
          url : this.options.restUrl+pk+"/",
          data : JSON.stringify(data),
          type : type,
          contentType : 'application/json',
          processData: false,
          dataType: 'json'
        });
    },

    getItemUpdateUrl: function(itemPk){
        return this.options.restUrl+itemPk+"/";
    },

    updateItem: function(itemPk, data){
        $.ajax({
          url : this.getItemUpdateUrl(itemPk),
          data : JSON.stringify(data),
          type : 'PATCH',
          contentType : 'application/json',
          processData: false,
          dataType: 'json'
        });
    },

    updateParent: function(itemPk, parentPk){
        this.updateItem(itemPk, {"parent": parentPk});
    },
    setParentAsNull: function(itemPk){
        this.updateParent(itemPk, null);
    },
});
