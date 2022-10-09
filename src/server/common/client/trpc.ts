import { createReactQueryHooks } from "@trpc/react";

import type { AppRouter } from "@/src/server/router/index";

export const trpc = createReactQueryHooks<AppRouter>();
