(function () {

 	window.BuildMosaic = BuildMosaic;

	var canv;
	var c;
	var img;
	var allUrls;
	var terms;
	var imageData;

	//http://api.bing.net/json.aspx?AppId=7BC9D98DDD14366A4640BA0C6B93F0541CFCCA72&Version=2.2&Market=en-US&Query=fish&Sources=image&Image.Count=50&JsonType=raw 

	function BuildMosaic(canvas, imgSrc, searchTerms)
	{
		canv = document.getElementById(canvas);
		c = canv.getContext('2d');
		
		img = new Image();
		img.src = imgSrc;

		terms = searchTerms;

		img.onload = function()
		{
			width = img.width;
			height = img.height;
			$("#" + canvas).attr( { width: width, height: height } );
			imageData = c.getImageData(0, 0, width, height);
			c.drawImage(img, 0, 0);
		}

		GetImages();
	}

	function GetImages()
	{
		allUrls = new Array();

		$("#output").html("");
		
		for (i = 0; i < 1000; i += 50)
		{
			requestStr = "http://api.bing.net/json.aspx?AppId=7BC9D98DDD14366A4640BA0C6B93F0541CFCCA72&Version=2.2&Sources=Image&Image.Count=50&Market=en-US&Adult=Off&Image.Offset=" + i + "&JsonType=callback&JsonCallback=?&Query=" + terms;

			$.ajax({
				type: "GET",
				url: requestStr,
				dataType: "jsonp",
				success: function (msg) {
					$.each(msg.SearchResponse.Image.Results, function(index, value) {
						allUrls.push(value.Thumbnail.Url);
						$("#output").append("<img src='" + value.Thumbnail.Url + "' /><br />");
					});
				},
				error: function (msg) {
					alert("FAILURE");
				}
			});
		}
	}
}());
