import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization    

    if (!token) {
        return res.status(400).json({ message: 'Token não fornecido' })
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET)
        req.user = decoded
        
        next()
    } catch (error) {
        res.status(401).json({ message: 'Token Inválido' })
    }
}

export const isAdmin = (req, res, next) => {    
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({
            message: 'Acesso negado. Apenas administradores podem executar essa ação.'
        })
    }

    next()
}