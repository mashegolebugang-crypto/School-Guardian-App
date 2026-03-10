import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../utils/prisma'
import { User } from '@prisma/client' // ✅ Import User type from Prisma

// Type for returned user without password
type AuthUser = Omit<User, 'passwordHash'>

// Type for login response
type LoginResponse = { user: AuthUser; token: string }

// Custom Error class for HTTP-friendly errors
class ApiError extends Error {
  status: number
  constructor(message: string, status = 400) {
    super(message)
    this.status = status
  }
}

// Helper to ensure JWT secret exists
const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error('JWT_SECRET environment variable not set')
  return secret
}

// REGISTER FUNCTION
export const register = async (
  fullName: string,
  email: string,
  password: string,
  role: 'teacher' | 'admin' = 'teacher'
): Promise<AuthUser> => {
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) throw new ApiError('User already exists', 409)

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        passwordHash: hashedPassword,
        role,
      },
    })

    const { passwordHash, ...result } = user // ✅ Works now
    return result
  } catch (err) {
    throw err instanceof ApiError ? err : new ApiError('Failed to register user')
  }
}

// LOGIN FUNCTION
export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) throw new ApiError('Invalid credentials', 401)

    const isValid = await bcrypt.compare(password, user.passwordHash)
    if (!isValid) throw new ApiError('Invalid credentials', 401)

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      getJwtSecret(),
      { expiresIn: '7d' }
    )

    const { passwordHash, ...userWithoutPassword } = user
    return { user: userWithoutPassword, token }
  } catch (err) {
    throw err instanceof ApiError ? err : new ApiError('Login failed', 500)
  }
}