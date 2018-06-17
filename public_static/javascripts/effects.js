
$(document).ready(function() {

	// for webcam support
	$('#example').photobooth().on("image", function(event, dataUrl) {
		//$("#hiddenImg").html('<img src="' + dataUrl + '" >');
		qrCodeDecoder(dataUrl);
		//console.log(event);
		//console.log(dataUrl);
		//console.log($('#example').data( "photobooth" ));
	});

	$('#button').click(function() {
		$('.trigger').trigger('click');
	});
	
	qrcode.callback = showInfo;

});

// decode the img
function qrCodeDecoder(dataUrl) {
	qrcode.decode(dataUrl);
}

// show info from qr code
function showInfo(data) {
	if( data.length > 4 ){
		$("#qrContent p").text("Error decoding QR Code");
	}
	else{
	$.post('/auth/check_qr_code', {qr_code : data}, function (res) {
		if(res == "Success"){
			$("#qrContent p").text("승인 완료");
		}
		else{
			$("#qrContent p").text("인증 실패");
		}	
	  });
	}
}
