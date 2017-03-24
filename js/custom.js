'use strict';

$(function(){
    /*Efekt smooth scroll*/
    $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
    
    if ($(window).scrollTop() >= 71) {
			$('#main-nav').addClass('scroll')
			
	}
	
	$(window).scroll(function () {
		if ($(window).scrollTop() >= 71) {
			$('#main-nav').addClass('scroll');
			$('#main-nav').css({'transition': 'all 0.3s' });
		}
		else {
			$('#main-nav').removeClass('scroll')
		}
	});
    
//    Invoice number and date
    var invoiceNumber= $('#invoice-number');
    var invoiceDate= $('#invoice-date');
    
    var date=new Date();
    var today= date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    var number= "number/"+(date.getMonth()+1)+"/"+date.getFullYear();
    
    invoiceDate.val(today);
    invoiceNumber.val(number);
    
    var pdf = new jsPDF('p', 'pt', 'letter');
    
//    Adding and removing row
    $("#row-more").click(function(){
        if($('#product-table tr.product').length<9){
            $("#product-table").append('<tr class="product"><td><input type="text" value="test"></td><td><input type="text" value="test"></td><td><input type="text" value="test"></td><td><input type="text" value="test"></td><td><input type="text" value="test"></td></tr>');
        }
    });
    
    $("#row-less").click(function(){
        if($('#product-table tr.product').length>1){
            // $('#product-table tr:last').remove();
            $('#product-table tr.product:last').remove();
        }
    });
//PDF TEST GENERATOR
    $('#generate-PDF').click(function(){
        var doc = new jsPDF('p', 'pt');
        doc.setFontSize(22);
        doc.text(275, 20, 'Invoice');
        
        var columnsOfficial=[];
        var columns=$('#product-table tr:first').children();
        columns.each(function(){
            columnsOfficial.push($(this).html()); 
        })
        
        var dataOfficial=[];
        var data=$('#product-table tr.product');
        data.each(function(index, row){
            var dataOfficialInsideArray=[];
            for(var i=0;i<row.children.length;i++){
                dataOfficialInsideArray.push(row.children[i].children["0"].value)
            }
            dataOfficial.push(dataOfficialInsideArray);
       })
      
        doc.autoTable(columnsOfficial, dataOfficial);
        doc.output('datauri');
    })
    
    
    
})