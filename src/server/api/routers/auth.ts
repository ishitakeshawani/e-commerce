import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { prisma } from '../../db';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

function isError(value: unknown): value is Error {
  return value instanceof Error;
}

export const authRouter = createTRPCRouter({
  signup: publicProcedure
    .input(z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    }))
    .mutation(async ({ input }) => {
      const { name, email, password } = input;

      try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
          throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
          data: { name, email, password: hashedPassword },
        });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 2 * 60 * 1000);

        await prisma.oTP.create({
          data: { otp, expiresAt, userId: user.id },
        });

        const transporter = nodemailer.createTransport({
          host: 'smtp.mailersend.net',
          port: 587,
          auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
          },
        });

        await transporter.sendMail({
          from: process.env.EMAIL_USERNAME,
          to: email,
          subject: 'Your OTP Code from e-commerce-gules-tau.vercel.app',
          text: `Hello ${name}, your OTP code is ${otp}. It will expire in 2 minutes.`,
        });

        return { message: 'User created, OTP sent to email' };

      } catch (error) {
        if (isError(error)) {
          throw new Error(`Failed to signup: ${error.message}`);
        } else {
          throw new Error('An unexpected error occurred during signup.');
        }
      }
    }),

  verifyOtp: publicProcedure
    .input(z.object({
      email: z.string().email(),
      otp: z.string(),
    }))
    .mutation(async ({ input }) => {
      const { email, otp } = input;

      try {
        const user = await prisma.user.findUnique({ where: { email } });
        let userData = {}
        if (!user) {
          throw new Error('User not found');
        }else{
          userData = {
            name:user.name,
            email:user.email
          }
        }

        const validOtp = await prisma.oTP.findFirst({
          where: {
            userId: user.id,
            otp,
            expiresAt: { gte: new Date() },
          },
        });

        if (!validOtp) {
          throw new Error('Invalid or expired OTP');
        }

        await prisma.oTP.deleteMany({ where: { userId: user.id } });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
          expiresIn: '1h',
        });

        await prisma.user.update({
          where: { id: user.id },
          data: { isEmailVerified: true },
        });


        return { message: 'OTP verified successfully', user:userData, token };

      } catch (error) {
        if (isError(error)) {
          throw new Error(`Failed to verify OTP: ${error.message}`);
        } else {
          throw new Error('An unexpected error occurred during OTP verification.');
        }
      }
    }),

  login: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string(),
    }))
    .mutation(async ({ input }) => {
      const { email, password } = input;

      try {
        const user = await prisma.user.findUnique({ where: { email } });
        let userData = {}
        if (!user) {
          throw new Error('Invalid email or password');
        }else{
          userData = {
            name:user.name,
            email:user.email
          }
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid email or password');
        }

        if (!user.isEmailVerified) {
          throw new Error('Please verify your email before logging in.');
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
          expiresIn: '1h',
        });

        return { message: 'Login successful', token, user:userData };

      } catch (error) {
        if (isError(error)) {
          throw new Error(`Failed to login: ${error.message}`);
        } else {
          throw new Error('An unexpected error occurred during login.');
        }
      }
    }),
});
