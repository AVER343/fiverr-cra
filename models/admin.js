const mongoose=require('mongoose')
const jwt =require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const AdminSchema=mongoose.Schema({
    email:{
        type : String,
        required:true,
        unique:true,
        trim:true
    },
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

AdminSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.email
    delete userObject._id
    return userObject
}

AdminSchema.methods.generateAuthToken = async function () {
   try{ 
        const user = this
        const token = jwt.sign({ _id: user._id.toString() }, `SECRET_KEY`)
        user.tokens = user.tokens.concat({ token })
        await user.save()
        return token
    }
    catch(e)
    {
        throw new Error('USER NOT FOUND')
    }
}

AdminSchema.statics.findByCredentials = async (email, password) => {
    const user = await Admin.findOne({ email })
    if (!user) {
        throw new Error('Unable to login')
    }
  
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}
AdminSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})



const Admin = mongoose.model('Admin',AdminSchema)
module.exports= Admin