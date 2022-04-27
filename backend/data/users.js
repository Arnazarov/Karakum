import bcrypt from "bcryptjs"

const users = [{
        name: 'Admin',
        email: 'admin@karakum.com',
        password: bcrypt.hashSync('256587', 10),
        isAdmin: true
    },
    {
        name: 'Omar Hayyam',
        email: 'hayyam@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Ibn Sina',
        email: 'sina@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    }
]

export default users;