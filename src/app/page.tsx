import { getUserDetails } from "@/libs/github";
import { GITHUB_USER_NAME } from "@/constant";
import { Metadata } from "next";
import UserCard from "@/components/UserCard";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "GitView",
    description: "A GitHub profile viewer",
    openGraph: {
      title: "GitView",
      description: "A GitHub profile viewer",
      type: "website",
      siteName: "GitView",
    },
  };
}

export default async function Home() {
  const user = await getUserDetails(GITHUB_USER_NAME);

  return (
    <div className="flex-grow min-h-[80vh] py-10 md:py-20 px-5 md:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <UserCard user={user} />
      </div>
    </div>
  );
}
