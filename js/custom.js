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
        if($('#product-table tr.product').length<10){
            
            var varToAddOne=parseInt($('#product-table tr.product:last').children()[0].children["0"].value)+1;
            
            $("#product-table").append('<tr class="product"><td><input type="text" value="" disabled></td><td><input type="text" value="Product"></td><td><input type="number" value="0"></td><td><input type="number" value="0"></td><td><input type="number" value="0" disabled></td></tr>');
            $('#product-table tr.product:last').children()[0].children["0"].value=varToAddOne;
            
//            CALCULATING Function triggering!!
            calculate();
            
        }
    });
    
    $("#row-less").click(function(){
        if($('#product-table tr.product').length>1){
           $('#product-table tr.product:last').remove();
            calculateMinus();
        }
    });
    
//CALCULATIONS
function calculate(){
    $('#product-table tr.product input').change(function(){
        var sumOfAll=0;
        $('#product-table tr.product').each(function(index, obj){
            var sum=parseInt(obj.children[2].children[0].value)*parseInt(obj.children[3].children[0].value)
            obj.children[4].children[0].value=sum;
            sumOfAll+=sum;
        }) 
        var taxOfAll=sumOfAll*0.2;
        var allOfAll=sumOfAll+taxOfAll;
        $('#subtotal').text(sumOfAll);
        $('#sales-tax').text(taxOfAll);
        $('#totalsum').text(allOfAll);
        
    })
}
function calculateMinus(){
    
        var sumOfAll=0;
        $('#product-table tr.product').each(function(index, obj){
            var sum=parseInt(obj.children[2].children[0].value)*parseInt(obj.children[3].children[0].value)
            obj.children[4].children[0].value=sum;
            sumOfAll+=sum;
        }) 
        var taxOfAll=sumOfAll*0.2;
        var allOfAll=sumOfAll+taxOfAll;
        $('#subtotal').text(sumOfAll);
        $('#sales-tax').text(taxOfAll);
        $('#totalsum').text(allOfAll);
    
}
    

    
calculate()

    
    
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