var http = require("http")
var cheerio =require("cheerio")
var url ="http://www.imooc.com/learn/348"

function filterData(html){
	var $ =cheerio.load(html)
	var chapters =$('.chapter')

	var courseData =[]

	chapters.each(function(item){
		var chapter =$(this)
		var chapterTitle =chapter.find('.strong').text()
		var videos =chapter.find('.video').children('li')
		var chapterData ={
			chapterTitle:chapterTitle,
			videos:[]
		}
		videos.each(function(video){
			var video =$(this).find('.studyvideo')
			var title =video.text()
			var id =video.attr('href').split('video/')[1]
			chapterData.videos.push({
				title:title,
				id:id
			})
		})
		courseData.push(chapterData)
	})
	return courseData

}

function printData(courseData){
	courseData.forEach(function(item){
		var chapterTitle =item.chapterTitle
		console.log(chapterTitle +"\n")

		var videos =item.videos
		videos.forEach(function(video){
			var title =video.title
			var id=video.id

			console.log(id +" " + title +"\n");
		})
	})

}

http.get(url,function(res){
	var html =""
	res.on('data',function(data){
		html+=data
	})
	res.on('end',function(){
		//console.log(html);
		var courseData =filterData(html)
		printData(courseData)
	})
}).on('error',function(){
	console.log('获取失败');
})