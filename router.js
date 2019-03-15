var express=require('express')
var router=express.Router()
var fs=require('fs')


var path='./data.json'
//The default path is in views
router.get('/',function(req,res){
	fs.readFile('./data.json','utf8',function(err,data){
		if(err) throw err
		res.render('index.html',{
			Students:JSON.parse(data).Students
		
		}) 


	})
	    //set engine before use render
})

router.get('/students',function(req,res){
	res.redirect('/')
})

router.get('/students/new',function(req,res){

	res.render('new.html')
})

router.post('/students/new',function(req,res){
	var student=parseInteger(req.body)

	fs.readFile(path,'utf8',function(err,data){
		if(err) throw err

		var students= JSON.parse(data).Students

		student.id=students[students.length-1].id+1

		students.push(student)
		var ret=JSON.stringify({
			Students:students
		})
		//console.log(ret)
		fs.writeFile(path,ret,function(err){
			if(err) throw err
			res.redirect('/')
			})
		
		}) 
	
})


router.get('/students/delete',function(req,res){
		var id=parseInt(req.query.id)
		fs.readFile(path,'utf8',function(err,data){
			if(err) throw err
			var students= JSON.parse(data).Students
			var index=students.findIndex(function(element){
				return element.id==id
			})

			students.splice(index,1)

			var ret=JSON.stringify({
				Students:students
			})
			//console.log(ret)
			fs.writeFile(path,ret,function(err){
				if(err) throw err
				res.redirect('/')
				})
			
			}) 

})

router.get('/students/edit',function(req,res){
	var id=parseInt(req.query.id)
		fs.readFile(path,'utf8',function(err,data){
			if(err) throw err
			var students= JSON.parse(data).Students
			var student=students.find(function(element){
				return element.id==id
			})

			res.render('edit.html',{
				student:student
			})
		})

})

router.post('/students/edit',function(req,res){

	var student=parseInteger(req.body)

	
	fs.readFile(path,'utf8',function(err,data){
		if(err) throw err
		var students= JSON.parse(data).Students
		var index=students.findIndex(function(element){
		return element.id==student.id
		})

		students.splice(index,1,student)

		var ret=JSON.stringify({
			Students:students
			})

		fs.writeFile(path,ret,function(err){
		if(err) throw err
			res.redirect('/')
			})
				
	}) 
})

function parseInteger(student){
	student.id=parseInt(student.id)
	student.age=parseInt(student.age)
	student.gender=parseInt(student.gender)
	return student
}
module.exports=router
