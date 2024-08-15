import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { prisma } from '../../db';

function isError(value: unknown): value is Error {
  return value instanceof Error;
}

interface Category {
  id: number;
  name: string;
  description: string;
}

export const categoryRouter = createTRPCRouter({
  getCategories: publicProcedure
    .input(z.object({
      page: z.number().min(1).default(1),
      pageSize: z.number().min(1).default(6),
    }))
    .query(async ({ input }) => {
      const { page, pageSize } = input;
      const skip = (page - 1) * pageSize;
      
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const [categories, total]: [Category[], number] = await Promise.all([
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          prisma.category.findMany({
            skip,
            take: pageSize,
          }),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          prisma.category.count(),
        ]);

        return {
          categories,
          total,
          totalPages: Math.ceil(total / pageSize),
        };
      } catch (error) {
        if (isError(error)) {
          throw new Error(`Failed to fetch categories: ${error.message}`);
        } else {
          throw new Error('An unexpected error occurred while fetching categories.');
        }
      }
    }),

  selectCategory: publicProcedure
    .input(z.object({
      userId: z.string(),
      categoryId: z.number(),
    }))
    .mutation(async ({ input }) => {
      const { userId, categoryId } = input;

      try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        const category = await prisma.category.findUnique({ where: { id: categoryId } });
  
        if (!user) {
          throw new Error('User not found');
        }
  
        if (!category) {
          throw new Error('Category not found');
        }
        await prisma.user.update({
          where: { id: userId },
          data: {
            selectedCategories: {
              connect: { id: categoryId },
            },
          },
        });

        return { success: true };
      } catch (error) {
        if (isError(error)) {
          throw new Error(`Failed to select category: ${error.message}`);
        } else {
          throw new Error('An unexpected error occurred while selecting the category.');
        }
      }
    }),

  getUserCategories: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      try {
        const user = await prisma.user.findUnique({
          where: { id: input },
          include: { selectedCategories: true },
        });

        if (!user) {
          throw new Error('User not found');
        }

        return user.selectedCategories;
      } catch (error) {
        if (isError(error)) {
          throw new Error(`Failed to fetch user categories: ${error.message}`);
        } else {
          throw new Error('An unexpected error occurred while fetching user categories.');
        }
      }
    }),
});
