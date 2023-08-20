import PostThread from "@/components/forms/PostThread";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser, fetchUsers } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Image from "next/image";
import UserCard from "@/components/cards/UserCard";
import { fetchCommunities } from "@/lib/actions/community.actions";
import CommunityCard from "@/components/cards/CommunityCard";

const Page = async () => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  // fetch all communities

  const results = await fetchCommunities({
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });

  
  return (
    <section>
      <h1 className="head-text mb-10">Communities</h1>

      <div className="mt-14 flex flex-col gap-9">
  {results.communities.length === 0 ? (
    <p className="no-result">No Users</p>
  ) : (
    <div className="flex flex-wrap">
      {results.communities.map((community) => (
        <CommunityCard
          key={community.id}
          id={community.id}
          name={community.name}
          username={community.username}
          imgUrl={community.image}
          bio={community.bio}
          members={community.members}
        />
      ))}
    </div>
  )}
</div>

    </section>
  );
};

export default Page;
