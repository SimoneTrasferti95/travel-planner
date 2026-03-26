// Questo file serve per avere un solo client Prisma riutilizzabile.

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();