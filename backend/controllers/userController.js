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
        console.error(err);
    }
}

// @desc    Register a user
// @route   POST /api/users
// @access  Public
export const registerUser = async (req, res, next) => {

    try {
        const { name, email, password } = req.body;
    
        const userExists = await User.findOne({email})

        if (userExists) {
            res.status(400)
            next(new Error('User already exists'))
        }

        const user = await User.create({
            name,
            email, 
            password
        })

        if (user) {
            res.status(201);
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: createToken(user._id)
            })
        } else {
            res.status(400)
            next(new Error('Invalid user data'))
        }
    } catch(err) {
        res.status(401)
        next(new Error('User validation failed'))
    }
    
}


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            })
        } else {
            res.status(401);
            res.json({
                message:'User not found :('
            })
        }

    } catch(err) {
        res.status(401);
        console.error(err);
    }
}

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email; 

            if(req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: createToken(updatedUser._id)
            })

        } else {
            res.status(404);
            res.json({
                message:'User not found :('
            })
        }

    } catch(err) {
        res.status(401);
        console.error(err);
    }
}

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
       
    } catch(err) {
        console.error(err);
    }
}

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            await user.remove();
            res.json({message: 'User deleted!'})
        }else {
            res.status(404)
            next(new Error('User not found :('))
        }
       
    } catch(err) {
        console.error(err);
    }
}

// @desc    Get user by Id
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        
        if (user) {
            res.json(user);
        } else {
            res.status(404)
            next(new Error('User not found :('))
        }
       
    } catch(err) {
        console.error(err);
    }
}

// @desc    Update user 
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        const {name, email, isAdmin} = req.body

        if (user) {
            user.name = name || user.name;
            user.email = email || user.email;
            
            if (isAdmin) user.isAdmin = isAdmin;

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin
            })

        } else {
            res.status(404);
            res.json({
                message:'User not found :('
            })
        }

    } catch(err) {
        res.status(401);
        console.error(err);
    }
}
