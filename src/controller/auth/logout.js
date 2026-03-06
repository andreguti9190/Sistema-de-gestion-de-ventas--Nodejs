function logout(req, res) {
    const cookie = req.cookies.AccessToken
    if(!cookie) return res.status(401).json({error:true,msg:"you dont have been logged"})
    return res.clearCookie("AccessToken").status(200).json({msg:"User have been logouted"})
}

export default logout;