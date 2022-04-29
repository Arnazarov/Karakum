import User from '../models-schemas/userModel.js'
import createToken from '../utils/createJWToken.js'

// @desc    Authenticate user
// @route   POST /api/users/login
// @access  Public
export const authenticateUser = async (req, res, next) => {

    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({email});

        if(user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: createToken(user._id)
            })
        } else {
            res.status(401);
            next(new Error('Invalid username or password'))
        }

    } catch(err) {
        console.log(err);
    }
}