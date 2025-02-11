import jwt from 'jsonwebtoken'

const isLoggedIn = async (req,res,next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(404).json({
                message:'User not Logged In',
                success:false,
            })
        }
        const decode =  await jwt.verify(token,process.env.SECRET_KEY)
        if(!decode){
            return res.status(404).json({
                message:'Invalid token',
                success:false,
            })
        }
        req.id = decode.userId;
        next()
    } catch (error) {
        console.log(error)
    }
}

export default isLoggedIn