const mongoose=require('mongoose')

const StudentsSchema=mongoose.Schema({
    Name:String,
    Status:String,
    Major:String
})


module.exports=mongoose.model('Students',StudentsSchema)
