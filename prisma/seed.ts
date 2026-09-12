import bcrypt from "bcrypt";
import { PrismaClient, Status } from "../app/generated/prisma";

const prisma = new PrismaClient();

type SeedIssue = {
  title: string;
  description: string;
  status: Status;
  assignedToUserId?: string | null;
};

async function createIssueIfMissing(issue: SeedIssue) {
  const existingIssue = await prisma.issue.findFirst({
    where: { title: issue.title },
  });

  if (existingIssue) return existingIssue;

  return prisma.issue.create({ data: issue });
}

async function main() {
  const hashedPassword = await bcrypt.hash("Password123!", 10);

  // upsert users
  const alice = await prisma.user.upsert({
    where: { email: "alice@example.com" },
    update: {},
    create: {
      name: "Alice Chen",
      email: "alice@example.com",
      hashedPassword,
      image: "https://api.dicebear.com/9.x/initials/svg?seed=Alice%20Chen",
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: "bob@example.com" },
    update: {},
    create: {
      name: "Bob Smith",
      email: "bob@example.com",
      hashedPassword,
      image: "https://api.dicebear.com/9.x/initials/svg?seed=Bob%20Smith",
    },
  });

  const maya = await prisma.user.upsert({
    where: { email: "maya@example.com" },
    update: {},
    create: {
      name: "Maya Patel",
      email: "maya@example.com",
      hashedPassword,
      image: "https://api.dicebear.com/9.x/initials/svg?seed=Maya%20Patel",
    },
  });

  // add issues.
  await Promise.all([
    createIssueIfMissing({
      title: "Login page returns 500",
      description:
        "Users see an internal server error after submitting credentials.",
      status: Status.OPEN,
      assignedToUserId: alice.id,
    }),
    createIssueIfMissing({
      title: "Dashboard chart labels overlap",
      description: "Long status labels are cramped on smaller screens.",
      status: Status.IN_PROGRESS,
      assignedToUserId: bob.id,
    }),
    createIssueIfMissing({
      title: "Issue details page needs loading feedback",
      description:
        "The issue details route should show a skeleton while the record loads.",
      status: Status.OPEN,
      assignedToUserId: maya.id,
    }),
    createIssueIfMissing({
      title: "Add empty state to issue list",
      description:
        "Show a helpful message when filters return no matching issues.",
      status: Status.CLOSED,
    }),
    createIssueIfMissing({
      title: "Assignee selector should recover from network errors",
      description:
        "The assignee dropdown currently stays disabled after a failed users request.",
      status: Status.IN_PROGRESS,
      assignedToUserId: alice.id,
    }),
  ]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
